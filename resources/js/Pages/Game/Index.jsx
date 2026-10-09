import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const stageIcons = { 1: '🌲', 2: '🏰', 3: '⛰️', 4: '🧩', 5: '🏛️' };

export default function Game({ auth, stages }) {
    const completedCount = stages.filter(s => s.isCompleted).length;
    const totalStars = stages.reduce((sum, s) => sum + (s.stars || 0), 0);
    const maxStars = stages.length * 3;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Game Jelajah" />

            {/* Page header */}
            <div className="relative overflow-hidden rounded-[24px] px-8 py-7 mb-8"
                 style={{
                     background: 'linear-gradient(135deg, rgba(31,79,191,0.45) 0%, rgba(8,20,68,0.8) 100%)',
                     border: '1px solid rgba(201,164,92,0.25)',
                     backdropFilter: 'blur(20px)',
                 }}>
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none opacity-15"
                     style={{ background: 'radial-gradient(circle, #ecd39a, transparent)' }} />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-bronze-light text-xs font-bold uppercase tracking-widest mb-1">
                            Petualangan Matematika
                        </p>
                        <h1 className="font-cinzel text-2xl font-bold text-white mb-1">Game Jelajah</h1>
                        <p className="text-white/50 text-sm">Selesaikan setiap level untuk membuka yang berikutnya</p>
                    </div>
                    <div className="flex gap-4 sm:text-right">
                        <div className="text-center">
                            <div className="font-cinzel text-2xl font-bold text-bronze-light">{completedCount}/{stages.length}</div>
                            <div className="text-white/40 text-[11px] uppercase tracking-wide">Level Selesai</div>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="text-center">
                            <div className="font-cinzel text-2xl font-bold text-bronze-light">{totalStars}/{maxStars}</div>
                            <div className="text-white/40 text-[11px] uppercase tracking-wide">Bintang</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stages — 5 cards in a clean uniform grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {stages.map((stage) => {
                    const locked = !stage.isUnlocked;
                    const done = stage.isCompleted;

                    return (
                        <div key={stage.stage} className={`rounded-[22px] overflow-hidden flex flex-col transition-all duration-300 ${
                            locked ? 'opacity-60' : 'hover:-translate-y-1'
                        }`}
                             style={{
                                 background: locked
                                     ? 'rgba(8,20,54,0.7)'
                                     : 'linear-gradient(160deg, #16348a, #0a1a44)',
                                 border: done
                                     ? '1px solid rgba(201,164,92,0.45)'
                                     : locked
                                     ? '1px solid rgba(255,255,255,0.07)'
                                     : '1px solid rgba(143,180,255,0.25)',
                                 boxShadow: done
                                     ? '0 8px 32px rgba(201,164,92,0.15)'
                                     : '0 8px 32px rgba(5,13,36,0.4)',
                             }}>

                            {/* Top accent bar */}
                            <div className="h-[3px]"
                                 style={{
                                     background: done
                                         ? 'linear-gradient(90deg, #c9a45c, #ecd39a)'
                                         : locked
                                         ? 'rgba(255,255,255,0.05)'
                                         : 'linear-gradient(90deg, #1f4fbf, #8fb4ff)',
                                 }} />

                            <div className="p-6 flex flex-col flex-1">
                                {/* Header row */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-bronze-light/80 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                                            Level {stage.stage}
                                        </p>
                                        <h3 className="font-cinzel text-base font-bold text-white leading-tight">
                                            {stage.label}
                                        </h3>
                                    </div>
                                    <div className={`text-3xl ${locked ? 'grayscale opacity-40' : ''}`}>
                                        {stageIcons[stage.stage] || '⭐'}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className={`text-sm mb-5 leading-relaxed flex-1 ${locked ? 'text-white/25' : 'text-white/55'}`}>
                                    {stage.description}
                                </p>

                                {/* Stars + status */}
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex gap-1.5">
                                        {[...Array(3)].map((_, i) => (
                                            <span key={i} className={`text-xl ${
                                                i < (stage.stars || 0)
                                                    ? 'text-bronze drop-shadow-[0_0_6px_rgba(201,164,92,0.7)]'
                                                    : 'text-white/12'
                                            }`}>★</span>
                                        ))}
                                    </div>
                                    {done && (
                                        <span className="text-xs font-bold text-correct bg-correct/15 border border-correct/25 px-2.5 py-1 rounded-full">
                                            Selesai ✓
                                        </span>
                                    )}
                                    {locked && (
                                        <span className="text-xs text-white/25 flex items-center gap-1">
                                            🔒 Terkunci
                                        </span>
                                    )}
                                </div>

                                {/* CTA */}
                                {locked ? (
                                    <div className="w-full py-3 text-center text-white/25 text-sm font-semibold border border-white/8 rounded-xl">
                                        Selesaikan level sebelumnya
                                    </div>
                                ) : (
                                    <Link href={route('game.play', stage.stage)}
                                          className="block w-full text-center py-3 rounded-xl font-bold text-sm transition-all no-underline hover:-translate-y-0.5 hover:shadow-lg"
                                          style={done ? {
                                              background: 'linear-gradient(135deg, #ecd39a, #c9a45c)',
                                              color: '#081436',
                                          } : {
                                              background: 'linear-gradient(135deg, #1f4fbf, #0d1f4d)',
                                              color: '#fff',
                                              border: '1px solid rgba(201,164,92,0.25)',
                                          }}>
                                        {done ? 'Main Lagi' : 'Mulai Level'}
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-7 flex flex-wrap justify-center gap-5 text-xs text-white/35">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-royal/60 border border-royal inline-block" />
                    Tersedia
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-bronze inline-block" />
                    Selesai
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white/12 inline-block" />
                    Terkunci
                </span>
            </div>
        </AuthenticatedLayout>
    );
}
