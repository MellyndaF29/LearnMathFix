import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════ */
const SPEED       = 0.38;   // % per frame
const CHAR_R      = 2.8;    // % collision radius
const PROXIMITY   = 5.8;    // % to activate crystal
const ENEMY_SPEED = 0.14;
const ENEMY_HIT_R = 5.5;    // % enemy hit radius

/* Crystal positions (% of map container) */
const CRYSTAL_SPOTS = [
    { x: 18, y: 73 }, { x: 36, y: 57 }, { x: 22, y: 38 },
    { x: 46, y: 22 }, { x: 64, y: 32 }, { x: 80, y: 18 },
    { x: 88, y: 48 }, { x: 72, y: 68 }, { x: 55, y: 78 },
];

/* Enemy patrol waypoints */
const ENEMY_INIT = [
    { waypoints: [{ x: 32, y: 43 }, { x: 56, y: 43 }, { x: 56, y: 60 }, { x: 32, y: 60 }], wpIdx: 0, x: 32, y: 43 },
    { waypoints: [{ x: 65, y: 20 }, { x: 83, y: 36 }, { x: 83, y: 20 }], wpIdx: 0, x: 65, y: 20 },
];

/* Tree positions */
const TREES = [
    { x: 4,  y: 10, s: 1.3 }, { x: 14, y: 7,  s: 1.0 }, { x: 30, y: 4,  s: 1.2 },
    { x: 50, y: 7,  s: 0.9 }, { x: 72, y: 4,  s: 1.1 }, { x: 92, y: 8,  s: 1.3 },
    { x: 97, y: 28, s: 0.9 }, { x: 96, y: 60, s: 1.2 }, { x: 90, y: 82, s: 1.0 },
    { x: 68, y: 90, s: 1.3 }, { x: 42, y: 92, s: 0.9 }, { x: 18, y: 90, s: 1.1 },
    { x: 3,  y: 75, s: 1.2 }, { x: 2,  y: 45, s: 0.9 }, { x: 12, y: 22, s: 0.8 },
    { x: 40, y: 70, s: 0.9 }, { x: 58, y: 50, s: 0.8 }, { x: 75, y: 38, s: 0.9 },
    { x: 8,  y: 85, s: 0.8 }, { x: 95, y: 75, s: 1.0 },
];

/* Mushrooms */
const MUSHROOMS = [
    { x: 25, y: 82 }, { x: 48, y: 45 }, { x: 70, y: 78 },
    { x: 85, y: 70 }, { x: 10, y: 40 }, { x: 60, y: 13 },
    { x: 32, y: 92 }, { x: 88, y: 30 },
];

/* Rocks */
const ROCKS = [
    { x: 52, y: 60 }, { x: 28, y: 48 }, { x: 78, y: 55 }, { x: 43, y: 82 },
];

/* SVG winding path */
const PATH_D = 'M 16 78 C 20 65,28 60,34 57 C 40 54,36 42,22 38 C 14 35,42 18,46 22 C 50 26,60 30,64 32 C 70 35,78 20,80 18 C 82 16,90 42,88 48 C 86 54,76 64,72 68 C 68 72,60 76,55 78';

/* ═══════════════════════════════════════════════════════════
   SVG COMPONENTS
═══════════════════════════════════════════════════════════ */

function WizardSVG({ frame, facingLeft }) {
    const lL  = frame ? 15  : -22;
    const lR  = frame ? -22 : 15;
    const aL  = frame ? -8  : -28;
    const aR  = frame ? -28 : -8;
    return (
        <svg width="52" height="74" viewBox="0 0 52 74"
            style={{ transform: facingLeft ? 'scaleX(-1)' : 'none', overflow: 'visible' }}
            xmlns="http://www.w3.org/2000/svg">
            {/* Shadow */}
            <ellipse cx="26" cy="72" rx="13" ry="4" fill="black" opacity="0.22"/>
            {/* Hat */}
            <polygon points="26,0 10,22 42,22" fill="#1d4ed8"/>
            <rect x="8" y="20" width="36" height="6" rx="3" fill="#2563eb"/>
            <circle cx="26" cy="9"  r="3" fill="#fbbf24"/>
            {/* Stars */}
            <text x="17" y="20" fontSize="5" fill="#fde68a" opacity="0.7">✦</text>
            <text x="31" y="18" fontSize="4" fill="#fde68a" opacity="0.5">✦</text>
            {/* Head */}
            <circle cx="26" cy="36" r="14" fill="#fde68a"/>
            {/* Eyes */}
            <circle cx="21" cy="34" r="2.5" fill="#1e1b4b"/>
            <circle cx="31" cy="34" r="2.5" fill="#1e1b4b"/>
            <circle cx="22" cy="33" r="1"   fill="white"/>
            <circle cx="32" cy="33" r="1"   fill="white"/>
            {/* Nose */}
            <ellipse cx="26" cy="38" rx="1.5" ry="1" fill="#f59e0b"/>
            {/* Mouth */}
            <path d="M 22 41 Q 26 45 30 41" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* Blush */}
            <ellipse cx="17" cy="38" rx="3" ry="2" fill="#f87171" opacity="0.38"/>
            <ellipse cx="35" cy="38" rx="3" ry="2" fill="#f87171" opacity="0.38"/>
            {/* Body */}
            <path d="M 15 50 L 13 72 L 26 68 L 39 72 L 37 50 Q 26 55 15 50Z" fill="#1d4ed8"/>
            <rect x="23" y="51" width="6" height="16" rx="2" fill="#2563eb" opacity="0.5"/>
            <text x="17" y="65" fontSize="7" fill="#fbbf24" opacity="0.6">✦</text>
            <text x="31" y="68" fontSize="5" fill="#fbbf24" opacity="0.5">✦</text>
            {/* Left arm */}
            <g transform={`rotate(${aL} 15 52)`}>
                <line x1="15" y1="52" x2="4" y2="62" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round"/>
            </g>
            {/* Wand */}
            <line x1="4" y1="62" x2="-1" y2="70" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="-1" cy="70" r="4"   fill="#a78bfa"/>
            <circle cx="-1" cy="70" r="7"   fill="#a78bfa" opacity="0.25"/>
            <circle cx="-1" cy="70" r="10"  fill="#a78bfa" opacity="0.1"/>
            {/* Right arm */}
            <g transform={`rotate(${aR} 37 52)`}>
                <line x1="37" y1="52" x2="48" y2="62" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round"/>
            </g>
            {/* Legs */}
            <g transform={`rotate(${lL} 20 68)`}><rect x="16" y="66" width="8" height="9" rx="3" fill="#1e3a8a"/></g>
            <g transform={`rotate(${lR} 32 68)`}><rect x="28" y="66" width="8" height="9" rx="3" fill="#1e3a8a"/></g>
        </svg>
    );
}

function GhostSVG() {
    return (
        <svg width="46" height="54" viewBox="0 0 46 54" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="23" cy="52" rx="12" ry="3.5" fill="black" opacity="0.18"/>
            <path d="M 4 28 Q 4 4 23 4 Q 42 4 42 28 L 42 46 Q 34 38 23 46 Q 12 38 4 46 Z" fill="rgba(240,230,255,0.9)"/>
            <path d="M 4 28 Q 4 4 23 4 Q 42 4 42 28 L 42 46 Q 34 38 23 46 Q 12 38 4 46 Z" fill="#7c3aed" opacity="0.25"/>
            {/* Eyes */}
            <ellipse cx="16" cy="25" rx="5.5" ry="6.5" fill="#dc2626"/>
            <ellipse cx="30" cy="25" rx="5.5" ry="6.5" fill="#dc2626"/>
            <ellipse cx="16" cy="26" rx="2.5" ry="3.5" fill="#1c1917"/>
            <ellipse cx="30" cy="26" rx="2.5" ry="3.5" fill="#1c1917"/>
            <ellipse cx="15" cy="24" rx="1.2" ry="1.5" fill="white" opacity="0.7"/>
            <ellipse cx="29" cy="24" rx="1.2" ry="1.5" fill="white" opacity="0.7"/>
            {/* Glow */}
            <ellipse cx="23" cy="28" rx="19" ry="24" fill="#7c3aed" opacity="0.1"/>
        </svg>
    );
}

function CrystalSVG({ active, collected, index }) {
    const gId = `cg-${index}`;
    const c1  = collected ? '#86efac' : active ? '#fef08a' : '#c7d2fe';
    const c2  = collected ? '#16a34a' : active ? '#b45309' : '#4338ca';
    return (
        <svg width="40" height="54" viewBox="0 0 40 54" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            {/* Outer glow */}
            <ellipse cx="20" cy="27" rx="24" ry="30" fill={active && !collected ? 'rgba(251,191,36,0.35)' : 'transparent'} style={{ filter: 'blur(8px)' }}/>
            {/* Shadow */}
            <ellipse cx="20" cy="52" rx="10" ry="3" fill="black" opacity="0.18"/>
            {/* Main crystal */}
            <polygon points="20,2 38,20 20,52 2,20" fill={`url(#${gId})`} opacity={collected ? 0.5 : 1}/>
            {/* Top facet */}
            <polygon points="20,2 38,20 20,21 2,20" fill="white" opacity="0.32"/>
            {/* Right dark facet */}
            <polygon points="20,21 38,20 20,52" fill="black" opacity="0.12"/>
            {/* Shine lines */}
            {!collected && <line x1="20" y1="4" x2="20" y2="18" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>}
            {/* Number */}
            {!collected && (
                <text x="20" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white" style={{ filter: 'drop-shadow(0 1px 2px black)' }}>
                    {index + 1}
                </text>
            )}
            {collected && <text x="20" y="35" textAnchor="middle" fontSize="16" fill="white">✓</text>}
            <defs>
                <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={c1}/>
                    <stop offset="100%" stopColor={c2}/>
                </linearGradient>
            </defs>
        </svg>
    );
}

function TreeSVG({ s = 1 }) {
    return (
        <svg width={50 * s} height={66 * s} viewBox="0 0 50 66" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible' }}>
            <ellipse cx="25" cy="64" rx="11" ry="3.5" fill="black" opacity="0.18"/>
            <rect x="21" y="46" width="8" height="20" rx="3" fill="#4b2d10"/>
            <polygon points="25,4 3,46 47,46" fill="#15803d"/>
            <polygon points="25,14 5,46 45,46" fill="#16a34a" opacity="0.55"/>
            <polygon points="25,26 8,46 42,46" fill="#22c55e" opacity="0.3"/>
            <polygon points="25,4 22,46 28,46" fill="#4ade80" opacity="0.18"/>
        </svg>
    );
}

function MushroomSVG() {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="17" width="6" height="13" rx="2" fill="#fde68a"/>
            <ellipse cx="15" cy="17" rx="13" ry="10" fill="#dc2626"/>
            <ellipse cx="8"  cy="14" rx="3.5" ry="2.5" fill="white" opacity="0.75"/>
            <ellipse cx="20" cy="11" rx="2.5" ry="2"   fill="white" opacity="0.75"/>
            <ellipse cx="15" cy="8"  rx="2"   ry="1.5" fill="white" opacity="0.5"/>
        </svg>
    );
}

function RockSVG() {
    return (
        <svg width="36" height="26" viewBox="0 0 36 26" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="18" cy="24" rx="16" ry="4" fill="black" opacity="0.15"/>
            <path d="M 4 22 Q 2 12 10 6 Q 18 0 26 4 Q 34 8 34 16 Q 32 22 24 24 L 8 24 Z" fill="#6b7280"/>
            <path d="M 10 6 Q 18 0 26 4 Q 34 8 30 14 Q 24 8 16 6 Q 12 5 10 6Z" fill="#9ca3af"/>
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function Play({ auth, stage, stageLabel, questions, completedCheckpoints: initCompleted }) {
    /* ── React state (for UI re-renders) ── */
    const [animFrame,     setAnimFrame]     = useState(0);
    const [facingLeft,    setFacingLeft]    = useState(false);
    const [nearCrystal,   setNearCrystal]   = useState(null);
    const [gamePhase,     setGamePhase]     = useState('playing');
    const [currentQIdx,   setCurrentQIdx]   = useState(null);
    const [completedCPs,  setCompletedCPs]  = useState(initCompleted || []);
    const [answers,       setAnswers]       = useState({});
    const [results,       setResults]       = useState({});
    const [feedbackState, setFeedbackState] = useState(null);
    const [feedbackText,  setFeedbackText]  = useState('');
    const [answered,      setAnswered]      = useState(false);
    const [timeLeft,      setTimeLeft]      = useState(20);
    const [lives,         setLives]         = useState(3);
    const [isSubmitting,  setIsSubmitting]  = useState(false);
    const [hitFlash,      setHitFlash]      = useState(false);
    const [sparkle,       setSparkle]       = useState(null);

    /* ── Physics / game loop refs ── */
    const charXRef        = useRef(14);
    const charYRef        = useRef(80);
    const facingLeftRef   = useRef(false);
    const gamePhaseRef    = useRef('playing');
    const keysRef         = useRef({});
    const rafRef          = useRef(null);
    const animTimerRef    = useRef(0);
    const animFrameRef    = useRef(0);
    const completedCPsRef = useRef(initCompleted || []);
    const livesRef        = useRef(3);
    const invincRef       = useRef(false);
    const timerRef        = useRef(null);
    const nearCrystalRef  = useRef(null);
    const enemyDataRef    = useRef(ENEMY_INIT.map(e => ({ ...e, waypoints: e.waypoints.map(w => ({ ...w })) })));

    /* ── DOM refs (direct style, no re-render) ── */
    const charDivRef      = useRef(null);
    const enemy0Ref       = useRef(null);
    const enemy1Ref       = useRef(null);
    const enemyDivRefs    = [enemy0Ref, enemy1Ref];

    /* ── Computed once ── */
    const crystals = useMemo(() => CRYSTAL_SPOTS.slice(0, questions.length), []);

    /* ── Sync refs to state ── */
    useEffect(() => { completedCPsRef.current = completedCPs; }, [completedCPs]);
    useEffect(() => { gamePhaseRef.current    = gamePhase;    }, [gamePhase]);

    /* ── Keyboard ── */
    useEffect(() => {
        const onDown = (e) => {
            if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault();
            keysRef.current[e.key] = true;

            if ((e.key === 'e' || e.key === 'E' || e.key === ' ') && gamePhaseRef.current === 'playing') {
                const nearby = nearCrystalRef.current;
                if (nearby !== null && !completedCPsRef.current.includes(nearby)) {
                    triggerQuestion(nearby);
                }
            }
        };
        const onUp = (e) => { delete keysRef.current[e.key]; };
        window.addEventListener('keydown', onDown);
        window.addEventListener('keyup',   onUp);
        return () => {
            window.removeEventListener('keydown', onDown);
            window.removeEventListener('keyup',   onUp);
        };
    }, []);

    function triggerQuestion(idx) {
        const nextIdx = completedCPsRef.current.length;
        if (idx !== nextIdx) return;               // must collect in order!
        gamePhaseRef.current = 'question';
        setGamePhase('question');
        setCurrentQIdx(idx);
        setAnswered(false);
        setFeedbackState(null);
        setTimeLeft(20);
    }

    /* ── MAIN GAME LOOP ── */
    useEffect(() => {
        let enemyAnimTimer = 0;

        const loop = () => {
            if (gamePhaseRef.current === 'playing') {

                /* ─ Character movement ─ */
                let dx = 0, dy = 0;
                if (keysRef.current['ArrowUp']    || keysRef.current['w'] || keysRef.current['W']) dy -= SPEED;
                if (keysRef.current['ArrowDown']   || keysRef.current['s'] || keysRef.current['S']) dy += SPEED;
                if (keysRef.current['ArrowLeft']   || keysRef.current['a'] || keysRef.current['A']) dx -= SPEED;
                if (keysRef.current['ArrowRight']  || keysRef.current['d'] || keysRef.current['D']) dx += SPEED;
                if (dx && dy) { dx *= 0.707; dy *= 0.707; }

                if (dx || dy) {
                    charXRef.current = Math.max(CHAR_R, Math.min(100 - CHAR_R, charXRef.current + dx));
                    charYRef.current = Math.max(CHAR_R, Math.min(98  - CHAR_R, charYRef.current + dy));
                    if (charDivRef.current) {
                        charDivRef.current.style.left = `${charXRef.current}%`;
                        charDivRef.current.style.top  = `${charYRef.current}%`;
                    }
                    if (dx < 0 && !facingLeftRef.current) { facingLeftRef.current = true;  setFacingLeft(true);  }
                    else if (dx > 0 &&  facingLeftRef.current) { facingLeftRef.current = false; setFacingLeft(false); }
                }

                /* ─ Walk animation ─ */
                if (++animTimerRef.current >= 7) {
                    animTimerRef.current = 0;
                    animFrameRef.current ^= 1;
                    setAnimFrame(animFrameRef.current);
                }

                /* ─ Enemy movement ─ */
                if (++enemyAnimTimer >= 2) {
                    enemyAnimTimer = 0;
                    enemyDataRef.current.forEach((enemy, i) => {
                        const wp   = enemy.waypoints[enemy.wpIdx];
                        const dx2  = wp.x - enemy.x;
                        const dy2  = wp.y - enemy.y;
                        const dist = Math.hypot(dx2, dy2);
                        if (dist < ENEMY_SPEED * 2.5) {
                            enemy.wpIdx = (enemy.wpIdx + 1) % enemy.waypoints.length;
                        } else {
                            enemy.x += (dx2 / dist) * ENEMY_SPEED;
                            enemy.y += (dy2 / dist) * ENEMY_SPEED;
                        }
                        const ref = enemyDivRefs[i];
                        if (ref?.current) {
                            ref.current.style.left = `${enemy.x}%`;
                            ref.current.style.top  = `${enemy.y}%`;
                        }

                        /* Enemy–player collision */
                        if (!invincRef.current) {
                            const pd = Math.hypot(charXRef.current - enemy.x, charYRef.current - enemy.y);
                            if (pd < ENEMY_HIT_R) {
                                livesRef.current = Math.max(0, livesRef.current - 1);
                                setLives(livesRef.current);
                                setHitFlash(true);
                                setTimeout(() => setHitFlash(false), 500);
                                invincRef.current = true;
                                setTimeout(() => { invincRef.current = false; }, 2000);
                                if (livesRef.current <= 0) {
                                    gamePhaseRef.current = 'gameover';
                                    setGamePhase('gameover');
                                }
                            }
                        }
                    });
                }

                /* ─ Crystal proximity ─ */
                const nextIdx = completedCPsRef.current.length;
                if (nextIdx < crystals.length) {
                    const cp   = crystals[nextIdx];
                    const dist = Math.hypot(charXRef.current - cp.x, charYRef.current - cp.y);
                    if (dist < PROXIMITY && nearCrystalRef.current !== nextIdx) {
                        nearCrystalRef.current = nextIdx;
                        setNearCrystal(nextIdx);
                    } else if (dist >= PROXIMITY && nearCrystalRef.current !== null) {
                        nearCrystalRef.current = null;
                        setNearCrystal(null);
                    }
                } else if (nearCrystalRef.current !== null) {
                    nearCrystalRef.current = null;
                    setNearCrystal(null);
                }

                /* ─ Finish check ─ */
                if (completedCPsRef.current.length >= questions.length && questions.length > 0) {
                    gamePhaseRef.current = 'finishing';
                    setGamePhase('finishing');
                }
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []); /* runs once */

    /* ── Submit on finish ── */
    useEffect(() => {
        if (gamePhase === 'finishing') {
            setIsSubmitting(true);
            router.post(route('game.submit', stage), { answers, totalCount: questions.length },
                { onFinish: () => setIsSubmitting(false) });
        }
    }, [gamePhase]); // eslint-disable-line

    /* ── Timer ── */
    useEffect(() => {
        if (gamePhase !== 'question' || answered) { clearInterval(timerRef.current); return; }
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [gamePhase, answered]); // eslint-disable-line

    /* ── Handlers ── */
    const handleTimeout = () => {
        if (answered) return;
        const q = questions[currentQIdx];
        setAnswered(true);
        setFeedbackState('wrong');
        setFeedbackText('Waktu habis!');
        setAnswers(p => ({ ...p, [q.id]: null }));
        setResults(p => ({ ...p, [q.id]: 'wrong' }));
        setTimeout(() => resumeGame(currentQIdx), 1800);
    };

    const handleAnswer = (key) => {
        if (answered) return;
        clearInterval(timerRef.current);
        setAnswered(true);
        const q       = questions[currentQIdx];
        const correct = key === q.correctAnswer;
        setAnswers(p => ({ ...p, [q.id]: key }));
        setResults(p => ({ ...p, [q.id]: correct ? 'correct' : 'wrong' }));
        setFeedbackState(correct ? 'correct' : 'wrong');
        setFeedbackText(correct ? '💎 Kristal berhasil dikumpulkan!' : `Salah! Jawaban: ${q.options[q.correctAnswer]}`);
        if (correct) {
            const cp = crystals[currentQIdx];
            setSparkle({ x: cp.x, y: cp.y });
            setTimeout(() => setSparkle(null), 900);
        }
        setTimeout(() => resumeGame(currentQIdx), 1800);
    };

    const resumeGame = (idx) => {
        setCompletedCPs(prev => {
            const next = prev.includes(idx) ? prev : [...prev, idx];
            completedCPsRef.current = next;
            return next;
        });
        gamePhaseRef.current = 'playing';
        setGamePhase('playing');
        setCurrentQIdx(null);
        setAnswered(false);
        setFeedbackState(null);
        nearCrystalRef.current = null;
        setNearCrystal(null);
        axios.post(route('game.save', stage), {
            player_x: charXRef.current, player_y: charYRef.current,
            active_checkpoint: idx, completed_checkpoints: completedCPsRef.current,
        }).catch(() => {});
    };

    const nextCrystalToCollect = completedCPs.length;

    /* ════════════════════════════════════════
       RENDER
    ════════════════════════════════════════ */
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Peta ${stage}: ${stageLabel}`}/>
            <div className="max-w-5xl mx-auto">

                {/* ─── HUD ─── */}
                <div className={`px-6 py-4 flex justify-between items-center mb-4 rounded-[24px] border backdrop-blur-md transition-all duration-300 ${hitFlash ? 'bg-red-900/40 border-red-500/60' : 'bg-white/5 border-white/10'}`}>
                    <Link href={route('game.index')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                    </Link>
                    <div className="text-center">
                        <div className="text-bronze-light font-bold text-xs uppercase tracking-widest mb-0.5">Peta {stage}</div>
                        <div className="font-cinzel text-lg font-bold text-white">{stageLabel}</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {[...Array(3)].map((_,i) => (
                                <span key={i} className={`text-xl transition-all duration-500 ${i < lives ? '' : 'grayscale opacity-25 scale-75'}`}>❤️</span>
                            ))}
                        </div>
                        <div className="bg-black/40 rounded-full px-4 py-2 border border-bronze/30 text-sm font-bold text-bronze-light flex items-center gap-2">
                            <span>💎</span> {completedCPs.length}/{questions.length}
                        </div>
                    </div>
                </div>

                {/* ─── GAME MAP ─── */}
                <div
                    className={`relative w-full rounded-[32px] border overflow-hidden select-none transition-all duration-300 ${hitFlash ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)]' : 'border-white/10 shadow-2xl'}`}
                    style={{ paddingBottom: '64%' }}
                >
                    <div className="absolute inset-0">

                        {/* Background */}
                        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 40%,#1a4731 0%,#0d2a16 55%,#051209 100%)' }}/>

                        {/* Grid texture */}
                        <div className="absolute inset-0 opacity-[0.04]" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}/>

                        {/* Ambient glows */}
                        <div className="absolute pointer-events-none" style={{ left:'32%',top:'36%',width:'28%',height:'28%',background:'radial-gradient(circle,rgba(74,222,128,0.07) 0%,transparent 70%)' }}/>
                        <div className="absolute pointer-events-none" style={{ left:'66%',top:'18%',width:'22%',height:'22%',background:'radial-gradient(circle,rgba(167,139,250,0.09) 0%,transparent 70%)' }}/>
                        <div className="absolute pointer-events-none" style={{ left:'8%', top:'60%',width:'20%',height:'20%',background:'radial-gradient(circle,rgba(96,165,250,0.06) 0%,transparent 70%)' }}/>

                        {/* ── WINDING PATH SVG ── */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Outer road shadow */}
                            <path d={PATH_D} fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="7.5" vectorEffect="non-scaling-stroke"/>
                            {/* Road base */}
                            <path d={PATH_D} fill="none" stroke="#c8a96e" strokeWidth="5.5" vectorEffect="non-scaling-stroke" opacity="0.65"/>
                            {/* Road center line */}
                            <path d={PATH_D} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeDasharray="5,7" vectorEffect="non-scaling-stroke"/>
                        </svg>

                        {/* ── TREES ── */}
                        {TREES.map((t, i) => (
                            <div key={i} className="absolute pointer-events-none" style={{ left:`${t.x}%`,top:`${t.y}%`,transform:'translate(-50%,-100%)',zIndex:3 }}>
                                <TreeSVG s={t.s}/>
                            </div>
                        ))}

                        {/* ── MUSHROOMS ── */}
                        {MUSHROOMS.map((m, i) => (
                            <div key={i} className="absolute pointer-events-none" style={{ left:`${m.x}%`,top:`${m.y}%`,transform:'translate(-50%,-100%)',zIndex:2 }}>
                                <MushroomSVG/>
                            </div>
                        ))}

                        {/* ── ROCKS ── */}
                        {ROCKS.map((r, i) => (
                            <div key={i} className="absolute pointer-events-none" style={{ left:`${r.x}%`,top:`${r.y}%`,transform:'translate(-50%,-70%)',zIndex:2 }}>
                                <RockSVG/>
                            </div>
                        ))}

                        {/* ── FIREFLIES ── */}
                        {[...Array(14)].map((_,i) => (
                            <div key={i} className="absolute rounded-full pointer-events-none"
                                style={{
                                    left:`${(i*73+15)%93}%`, top:`${(i*47+20)%83}%`,
                                    width:3, height:3, background:'#fef08a', opacity:0.55,
                                    filter:'blur(1.5px)',
                                    animation:`firefly-${i%3} ${1.4+(i%3)*0.5}s ease-in-out ${i*0.25}s infinite`,
                                }}
                            />
                        ))}

                        {/* ── CRYSTALS ── */}
                        {crystals.map((pos, idx) => {
                            const isCompleted = completedCPs.includes(idx);
                            const isActive    = idx === nextCrystalToCollect;
                            const isNearby    = nearCrystal === idx;
                            return (
                                <div key={idx} className="absolute pointer-events-none" style={{
                                    left:`${pos.x}%`, top:`${pos.y}%`,
                                    transform:'translate(-50%,-90%)',
                                    zIndex:10,
                                    opacity: isCompleted ? 0.3 : isActive ? 1 : 0.28,
                                    animation: isActive && !isCompleted ? 'crystalFloat 2.2s ease-in-out infinite' : 'none',
                                    filter: isNearby ? 'drop-shadow(0 0 14px rgba(251,191,36,1))' : isActive ? 'drop-shadow(0 0 6px rgba(251,191,36,0.5))' : 'none',
                                }}>
                                    <CrystalSVG active={isActive} collected={isCompleted} index={idx}/>
                                    {isNearby && !isCompleted && (
                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-9 bg-amber-500 text-black text-[11px] font-black px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg" style={{ animation:'bounce 0.8s ease-in-out infinite' }}>
                                            E / Spasi
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* ── SPARKLE COLLECT EFFECT ── */}
                        {sparkle && (
                            <div className="absolute pointer-events-none z-40" style={{ left:`${sparkle.x}%`, top:`${sparkle.y}%`, transform:'translate(-50%,-50%)' }}>
                                <div className="w-20 h-20 rounded-full" style={{ background:'radial-gradient(circle,rgba(251,191,36,0.9),transparent)', animation:'sparkleRing 0.9s ease-out forwards' }}/>
                                {[...Array(6)].map((_,i)=>(
                                    <div key={i} className="absolute w-2 h-2 rounded-full bg-amber-400" style={{ left:'50%',top:'50%', animation:`sparkleParticle 0.8s ease-out forwards ${i*0.07}s`, transformOrigin:'center', '--a':`${i*60}deg` }}/>
                                ))}
                            </div>
                        )}

                        {/* ── ENEMIES (Ghosts) ── */}
                        {ENEMY_INIT.map((e, i) => (
                            <div key={i} ref={enemyDivRefs[i]} className="absolute pointer-events-none"
                                style={{ left:`${e.x}%`, top:`${e.y}%`, transform:'translate(-50%,-100%)', zIndex:15, filter:'drop-shadow(0 0 10px rgba(124,58,237,0.7))', animation:`ghostFloat ${2+i*0.4}s ease-in-out ${i*0.7}s infinite` }}>
                                <GhostSVG/>
                                {/* Warning radius ring */}
                                <div className="absolute rounded-full border border-purple-500/15 pointer-events-none"
                                    style={{ width:'90px',height:'90px',left:'50%',top:'50%',transform:'translate(-50%,-50%)' }}/>
                            </div>
                        ))}

                        {/* ── CHARACTER ── */}
                        <div ref={charDivRef} className="absolute z-20 pointer-events-none"
                            style={{ left:`${charXRef.current}%`, top:`${charYRef.current}%`, transform:'translate(-50%,-80%)',
                                filter: hitFlash ? 'brightness(3) saturate(0)' : 'drop-shadow(0 6px 10px rgba(37,99,235,0.5))',
                                transition: hitFlash ? 'none' : 'filter 0.4s',
                            }}>
                            <WizardSVG frame={animFrame} facingLeft={facingLeft}/>
                        </div>

                        {/* ── HIT FLASH OVERLAY ── */}
                        {hitFlash && (
                            <div className="absolute inset-0 bg-red-500/20 pointer-events-none z-50 rounded-[32px]" style={{ animation:'flashOverlay 0.5s ease-out forwards' }}/>
                        )}

                        {/* ── PROGRESS BAR (in-game) ── */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/65 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-3 border border-white/10 shadow-lg z-10 pointer-events-none">
                            <span className="text-xl">💎</span>
                            <div className="w-36 h-2.5 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-700"
                                    style={{ width:`${questions.length ? (completedCPs.length/questions.length)*100 : 0}%`, background:'linear-gradient(to right,#fbbf24,#4ade80)' }}/>
                            </div>
                            <span className="text-white font-bold text-xs">{completedCPs.length}/{questions.length}</span>
                        </div>

                        {/* ── BOTTOM INSTRUCTION BAR ── */}
                        {nextCrystalToCollect < crystals.length && gamePhase === 'playing' && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/65 backdrop-blur-md rounded-2xl px-5 py-2.5 border border-amber-500/35 text-white/80 text-xs font-semibold shadow-lg z-10 pointer-events-none flex items-center gap-3">
                                <span className="text-amber-400 text-base">💎</span>
                                Kumpulkan kristal <span className="text-amber-300 font-black">{nextCrystalToCollect + 1}</span>
                                <span className="w-px h-4 bg-white/20"/>
                                <span className="text-white/50">WASD/↑↓←→ Gerak</span>
                                <span className="text-white/50">E/Spasi Ambil</span>
                                <span className="text-purple-400">⚠ Hindari hantu!</span>
                            </div>
                        )}
                        {completedCPs.length >= questions.length && questions.length > 0 && gamePhase === 'playing' && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/65 backdrop-blur-md rounded-2xl px-5 py-2.5 border border-green-500/50 text-green-300 text-xs font-black shadow-lg z-10 pointer-events-none">
                                🎉 Semua kristal terkumpul!
                            </div>
                        )}

                        {/* ── GAME OVER ── */}
                        {gamePhase === 'gameover' && (
                            <div className="absolute inset-0 bg-black/82 backdrop-blur-sm flex items-center justify-center z-30 rounded-[32px]">
                                <div className="text-center">
                                    <div className="text-7xl mb-5" style={{ animation:'bounce 1s infinite' }}>💀</div>
                                    <h2 className="font-cinzel text-4xl font-bold text-white mb-3">Nyawa Habis!</h2>
                                    <p className="text-white/55 mb-8 text-sm">Terlalu banyak tertangkap hantu...</p>
                                    <button onClick={() => window.location.reload()}
                                        className="px-10 py-4 rounded-2xl font-bold text-navy-deep transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(201,164,92,0.4)]"
                                        style={{ background:'linear-gradient(135deg,#ecd39a,#c9a45c)' }}>
                                        Coba Lagi
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── FINISHING ── */}
                        {gamePhase === 'finishing' && (
                            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-30 rounded-[32px]">
                                <div className="text-center">
                                    <div className="text-7xl mb-5" style={{ animation:'bounce 1s infinite' }}>🏆</div>
                                    <h2 className="font-cinzel text-4xl font-bold text-white mb-3">Semua Kristal Terkumpul!</h2>
                                    <p className="text-white/60 text-sm">{isSubmitting ? 'Menyimpan hasil...' : 'Petualangan selesai!'}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══ QUESTION MODAL ═══ */}
            <AnimatePresence>
                {gamePhase === 'question' && currentQIdx !== null && questions[currentQIdx] && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                            className="absolute inset-0 bg-black/82 backdrop-blur-2xl"/>
                        <motion.div
                            initial={{ scale:0.88, opacity:0, y:40 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0.88, opacity:0, y:40 }}
                            className="relative w-full max-w-xl rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)]"
                            style={{ background:'linear-gradient(160deg,#0f172a,#020617)' }}
                        >
                            {/* Decorative crystal icon header */}
                            <div className="absolute top-0 left-0 right-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(251,191,36,0.6),transparent)' }}/>
                            <div className="px-8 py-6 flex justify-between items-center" style={{ borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
                                <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest text-amber-400">
                                    <span className="text-2xl">💎</span>
                                    Kristal {currentQIdx + 1} dari {questions.length}
                                </div>
                                <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/10">
                                    <span className="text-xs text-white/50 font-bold uppercase tracking-wide">Waktu</span>
                                    <span className={`font-black text-2xl leading-none ${timeLeft > 7 ? 'text-green-400' : 'text-red-400 animate-pulse'}`}>{timeLeft}s</span>
                                </div>
                            </div>

                            {/* Timer bar */}
                            <div className="h-1.5 bg-black/40">
                                <div className="h-full transition-all duration-1000 ease-linear rounded-r-full"
                                    style={{ width:`${(timeLeft/20)*100}%`, background: timeLeft > 7 ? '#22c55e' : '#ef4444' }}/>
                            </div>

                            <div className="p-8">
                                {/* Question */}
                                <div className={`text-center p-7 rounded-3xl border-2 mb-7 transition-all duration-300 ${
                                    feedbackState==='correct' ? 'border-green-500/50 bg-green-500/10' :
                                    feedbackState==='wrong'   ? 'border-red-500/50 bg-red-500/10'     :
                                    'border-white/10 bg-white/5'
                                }`}>
                                    <h3 className={`text-xl font-bold font-cinzel leading-relaxed ${
                                        feedbackState==='correct' ? 'text-green-400' :
                                        feedbackState==='wrong'   ? 'text-red-400'   : 'text-white'
                                    }`}>
                                        {questions[currentQIdx].questionText}
                                    </h3>
                                    {feedbackState && (
                                        <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
                                            className={`mt-4 font-black text-lg flex items-center justify-center gap-2 ${feedbackState==='correct' ? 'text-green-400' : 'text-red-400'}`}>
                                            <span className="text-2xl">{feedbackState==='correct' ? '✅' : '❌'}</span>
                                            {feedbackText}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Options */}
                                <div className="grid grid-cols-1 gap-3">
                                    {Object.entries(questions[currentQIdx].options).map(([key, val]) => {
                                        const q  = questions[currentQIdx];
                                        const iC = key === q.correctAnswer;
                                        const iU = answers[q.id] === key;
                                        let cls  = 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30 cursor-pointer';
                                        if (answered) {
                                            if (iC) cls = 'bg-green-500/20 border-green-500/60 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)] cursor-default';
                                            else if (iU) cls = 'bg-red-500/20 border-red-500/60 text-red-400 cursor-default';
                                            else cls = 'bg-white/5 border-white/5 text-white/25 opacity-40 cursor-default';
                                        }
                                        return (
                                            <button key={key} onClick={() => handleAnswer(key)} disabled={answered}
                                                className={`flex items-center gap-5 p-5 rounded-2xl border-2 text-base font-bold transition-all duration-200 ${cls} ${!answered ? 'hover:-translate-y-0.5 hover:shadow-xl' : ''}`}>
                                                <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-black ${answered && iC ? 'bg-green-500 text-white shadow-lg' : answered && iU ? 'bg-red-500 text-white shadow-lg' : 'bg-white/10 text-white/70 border border-white/20'}`}>
                                                    {key}
                                                </span>
                                                <span className="text-left leading-snug">{val}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Injected keyframe animations */}
            <style>{`
                @keyframes crystalFloat {
                    0%,100% { transform: translate(-50%,-90%) translateY(0px) rotate(0deg); }
                    50%     { transform: translate(-50%,-90%) translateY(-10px) rotate(3deg); }
                }
                @keyframes ghostFloat {
                    0%,100% { transform: translate(-50%,-100%) translateY(0px); }
                    50%     { transform: translate(-50%,-100%) translateY(-8px); }
                }
                @keyframes sparkleRing {
                    0%   { transform: translate(-50%,-50%) scale(0); opacity:1; }
                    100% { transform: translate(-50%,-50%) scale(3); opacity:0; }
                }
                @keyframes sparkleParticle {
                    0%   { transform: translate(-50%,-50%) rotate(var(--a)) translateY(0px); opacity:1; }
                    100% { transform: translate(-50%,-50%) rotate(var(--a)) translateY(-40px); opacity:0; }
                }
                @keyframes flashOverlay {
                    0%   { opacity: 1; }
                    100% { opacity: 0; }
                }
                @keyframes firefly-0 { 0%,100%{opacity:0.6;transform:scale(1)}   50%{opacity:0.9;transform:scale(1.5)} }
                @keyframes firefly-1 { 0%,100%{opacity:0.4;transform:scale(0.8)} 50%{opacity:0.8;transform:scale(1.3)} }
                @keyframes firefly-2 { 0%,100%{opacity:0.7;transform:scale(1.2)} 50%{opacity:0.4;transform:scale(0.9)} }
                @keyframes bounce {
                    0%,100% { transform: translateY(0); }
                    50%     { transform: translateY(-8px); }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
