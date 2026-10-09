import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Play({ auth, stage, stageLabel, questions, currentStars }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState({});      // { questionId: selectedKey }
    const [results, setResults] = useState({});      // { questionId: 'correct'|'wrong' }
    const [isFinished, setIsFinished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [feedbackState, setFeedbackState] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [answered, setAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const timerRef = useRef(null);

    const question = questions[currentIndex];

    useEffect(() => {
        if (isFinished || !question || answered) return;
        setTimeLeft(20);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [currentIndex, isFinished]);

    const handleTimeout = () => {
        if (answered) return;
        setAnswered(true);
        setFeedbackState('wrong');
        setFeedbackText('Waktu habis!');
        clearInterval(timerRef.current);
        // record as wrong with no answer
        setResults(prev => ({ ...prev, [question.id]: 'wrong' }));
        setTimeout(() => moveToNext(), 1800);
    };

    const handleAnswer = (key) => {
        if (answered) return;
        setAnswered(true);
        clearInterval(timerRef.current);

        const isCorrect = key === question.correctAnswer;
        const newAnswers = { ...answers, [question.id]: key };
        const newResults = { ...results, [question.id]: isCorrect ? 'correct' : 'wrong' };
        setAnswers(newAnswers);
        setResults(newResults);

        if (isCorrect) {
            setScore(s => s + 1);
            setFeedbackState('correct');
            setFeedbackText('Benar!');
        } else {
            setFeedbackState('wrong');
            setFeedbackText(`Salah! Jawaban: ${question.options[question.correctAnswer]}`);
        }

        setTimeout(() => moveToNext(newAnswers), 1600);
    };

    const moveToNext = (latestAnswers) => {
        setFeedbackState(null);
        setFeedbackText('');
        setAnswered(false);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(i => i + 1);
        } else {
            finishGame(latestAnswers || answers);
        }
    };

    const finishGame = (finalAnswers) => {
        setIsFinished(true);
        setIsSubmitting(true);
        router.post(route('game.submit', stage), {
            answers: finalAnswers,
            totalCount: questions.length,
        }, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const finalStars = questions.length > 0 ? (
        (score / questions.length) >= 0.9 ? 3 :
        (score / questions.length) >= 0.7 ? 2 :
        (score / questions.length) >= 0.5 ? 1 : 0
    ) : 0;

    const timerPct = (timeLeft / 20) * 100;
    const progressPct = (currentIndex / questions.length) * 100;

    const glass = {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)',
    };

    // ── FINISH SCREEN ──────────────────────────────────────────────────────────
    if (isFinished) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title={`Selesai: ${stageLabel}`} />

                <div className="max-w-2xl mx-auto space-y-5">
                    {/* Result Card */}
                    <div className="rounded-[24px] overflow-hidden" style={glass}>
                        <div className="h-1"
                             style={{ background: finalStars >= 2 ? 'linear-gradient(90deg,#2f9461,#42c280)' : 'linear-gradient(90deg,#c9a45c,#ecd39a)' }} />

                        <div className="p-8 text-center">
                            <p className="text-bronze-light text-xs font-bold uppercase tracking-widest mb-1">Level {stage} — {stageLabel}</p>
                            <h2 className="font-cinzel text-2xl font-bold text-white mb-6">Stage Selesai!</h2>

                            {/* Stars */}
                            <div className="flex justify-center gap-3 text-5xl mb-4">
                                {[...Array(3)].map((_, i) => (
                                    <span key={i}
                                          className={`transition-all duration-500 ${i < finalStars ? 'text-bronze drop-shadow-[0_0_12px_rgba(201,164,92,0.8)]' : 'text-white/10'}`}
                                          style={{ transitionDelay: `${i * 200}ms` }}>
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* Score stats */}
                            <div className="flex justify-center gap-8 mb-8">
                                <div>
                                    <div className="font-cinzel text-3xl font-bold text-white">{score}</div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">Benar</div>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div>
                                    <div className="font-cinzel text-3xl font-bold text-white/40">{questions.length - score}</div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">Salah</div>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div>
                                    <div className="font-cinzel text-3xl font-bold text-bronze-light">{Math.round((score/questions.length)*100)}%</div>
                                    <div className="text-white/40 text-xs uppercase tracking-widest">Skor</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-center">
                                <button onClick={() => setShowReview(r => !r)}
                                        className="px-6 py-3 border border-white/20 text-white/70 font-semibold rounded-xl hover:bg-white/8 transition-colors text-sm">
                                    {showReview ? 'Sembunyikan' : 'Lihat Pembahasan'}
                                </button>
                                {isSubmitting ? (
                                    <div className="px-6 py-3 text-white/40 text-sm font-semibold">Menyimpan...</div>
                                ) : (
                                    <Link href={route('game.index')}
                                          className="px-6 py-3 text-navy-deep font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline text-sm"
                                          style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                                        Lanjut Perjalanan
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Review Section */}
                    {showReview && (
                        <div className="rounded-[24px] overflow-hidden" style={glass}>
                            <div className="px-7 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <h3 className="font-cinzel text-base font-bold text-white">Pembahasan Soal</h3>
                                <p className="text-white/40 text-xs mt-0.5">Jawaban benar ditandai hijau</p>
                            </div>

                            <div className="divide-y divide-white/8">
                                {questions.map((q, idx) => {
                                    const userKey = answers[q.id];
                                    const isCorrect = results[q.id] === 'correct';
                                    const noAnswer = !userKey;

                                    return (
                                        <div key={q.id} className="px-7 py-5">
                                            <div className="flex gap-4">
                                                {/* Status badge */}
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                                                    isCorrect
                                                        ? 'bg-correct/20 text-correct border border-correct/30'
                                                        : 'bg-wrong/20 text-wrong border border-wrong/30'
                                                }`}>
                                                    {isCorrect ? '✓' : '✗'}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white/80 font-semibold text-sm mb-3 leading-relaxed">
                                                        <span className="text-white/30 mr-1">{idx + 1}.</span>
                                                        {q.questionText}
                                                    </p>

                                                    {/* Options */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                                        {Object.entries(q.options).map(([key, val]) => {
                                                            const isCorrectOpt = key === q.correctAnswer;
                                                            const isUserOpt = key === userKey;
                                                            let cls = 'border-white/10 bg-white/4 text-white/30';
                                                            if (isCorrectOpt) cls = 'border-correct/40 bg-correct/10 text-correct';
                                                            else if (isUserOpt && !isCorrectOpt) cls = 'border-wrong/40 bg-wrong/10 text-wrong';

                                                            return (
                                                                <div key={key}
                                                                     className={`flex items-center gap-2.5 rounded-xl px-3 py-2 border text-sm ${cls}`}>
                                                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                                                                        isCorrectOpt ? 'bg-correct text-white' :
                                                                        isUserOpt ? 'bg-wrong text-white' :
                                                                        'bg-white/10'
                                                                    }`}>{key}</span>
                                                                    <span>{val}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Timeout note */}
                                                    {noAnswer && (
                                                        <p className="text-wrong/70 text-xs font-semibold">Waktu habis — tidak ada jawaban</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </AuthenticatedLayout>
        );
    }

    // ── GAME PLAY SCREEN ───────────────────────────────────────────────────────
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Level ${stage}: ${stageLabel}`} />

            <div className="max-w-2xl mx-auto">
                <div className="rounded-[24px] overflow-hidden relative min-h-[560px] flex flex-col"
                     style={{
                         background: 'linear-gradient(160deg, #0e1e52 0%, #050e26 100%)',
                         border: '1px solid rgba(201,164,92,0.2)',
                         boxShadow: '0 0 60px rgba(31,79,191,0.25)',
                     }}>

                    {/* Header */}
                    <div className="px-5 py-4 flex justify-between items-center"
                         style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}>
                        <Link href={route('game.index')}
                              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                            ←
                        </Link>
                        <div className="text-center">
                            <div className="text-bronze-light font-bold text-xs uppercase tracking-widest">Level {stage}</div>
                            <div className="font-cinzel text-sm text-white">{stageLabel}</div>
                        </div>
                        <div className="bg-black/40 rounded-full px-3 py-1.5 border border-bronze/30 text-sm font-bold text-bronze-light">
                            ★ {score} / {questions.length}
                        </div>
                    </div>

                    {/* Progress (questions done) */}
                    <div className="w-full h-1 bg-white/8">
                        <div className="h-full bg-gradient-to-r from-bronze-deep to-bronze-light transition-all duration-500"
                             style={{ width: `${progressPct}%` }} />
                    </div>

                    {/* Timer bar */}
                    <div className="w-full h-1 bg-white/5">
                        <div className="h-full transition-all duration-1000 ease-linear"
                             style={{ width: `${timerPct}%`, background: timeLeft > 7 ? '#2f9461' : '#d0553a' }} />
                    </div>

                    {/* Question area */}
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6">
                        {/* Timer circle */}
                        <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-lg bg-black/30"
                             style={{ borderColor: timeLeft > 7 ? '#2f9461' : '#d0553a', color: timeLeft > 7 ? 'white' : '#fbe6df' }}>
                            {timeLeft}
                        </div>

                        {/* Question card */}
                        <div className={`w-full text-center p-6 rounded-2xl border transition-all duration-300 ${
                            feedbackState === 'correct' ? 'border-correct bg-correct-bg' :
                            feedbackState === 'wrong'   ? 'border-wrong bg-wrong-bg' :
                            'border-white/15 bg-white/8 backdrop-blur-sm'
                        }`}>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-bronze-light/70">
                                Soal {currentIndex + 1} dari {questions.length}
                            </p>
                            <h3 className={`text-base md:text-lg font-bold font-cinzel leading-snug ${feedbackState ? 'text-ink' : 'text-white'}`}>
                                {question.questionText}
                            </h3>
                            {feedbackState && (
                                <p className={`mt-2 font-bold text-sm ${feedbackState === 'correct' ? 'text-correct' : 'text-wrong'}`}>
                                    {feedbackState === 'correct' ? '✓ ' : '✗ '}{feedbackText}
                                </p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                            {Object.entries(question.options).map(([key, val]) => {
                                const isCorrectKey = key === question.correctAnswer;
                                const isUserKey = answers[question.id] === key;

                                let cls = 'bg-white/8 border-white/12 text-white hover:bg-white/15 hover:border-white/25';
                                if (answered) {
                                    if (isCorrectKey)             cls = 'bg-correct/15 border-correct/40 text-correct';
                                    else if (isUserKey)           cls = 'bg-wrong/15 border-wrong/40 text-wrong';
                                    else                          cls = 'bg-white/4 border-white/8 text-white/30';
                                }

                                return (
                                    <button key={key} onClick={() => handleAnswer(key)} disabled={answered}
                                            className={`flex items-center gap-3 p-4 rounded-xl border text-sm font-bold transition-all ${cls} ${!answered ? 'hover:-translate-y-0.5' : ''}`}>
                                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold ${
                                            answered && isCorrectKey ? 'bg-correct text-white' :
                                            answered && isUserKey    ? 'bg-wrong text-white' :
                                            'bg-white/12'
                                        }`}>{key}</span>
                                        {val}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
