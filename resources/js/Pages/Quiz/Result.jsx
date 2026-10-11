import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Result({
    auth, topic, score, correctAnswers, totalQuestions,
    isPassed, currentLevel, nextLevel, allLevelsPassed, review
}) {
    const starCount = score >= 90 ? 3 : score >= 70 ? 2 : score >= 40 ? 1 : 0;
    const wrongAnswers = totalQuestions - correctAnswers;

    const glass = {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 16px 48px rgba(5,13,36,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
    };

    const levelLabel = { 1: 'Level 1 — Dasar', 2: 'Level 2 — Menengah', 3: 'Level 3 — Mahir' };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Hasil Kuis: ${topic.title}`} />

            <div className="max-w-3xl mx-auto space-y-5">

                {/* Result Summary Card */}
                <div className="rounded-[24px] overflow-hidden" style={glass}>
                    {/* Top accent bar */}
                    <div className="h-1 w-full" style={{
                        background: isPassed
                            ? 'linear-gradient(90deg, #2f9461, #42c280)'
                            : 'linear-gradient(90deg, #d0553a, #e07b5f)'
                    }} />

                    <div className="p-8">
                        {/* Level badge */}
                        <div className="text-center mb-4">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                style={{ background: 'rgba(201,164,92,0.15)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.3)' }}>
                                Kuis {levelLabel[currentLevel] ?? `Level ${currentLevel}`}
                            </span>
                        </div>

                        {/* Status + Title */}
                        <div className="text-center mb-8">
                            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isPassed ? 'text-correct' : 'text-wrong'}`}>
                                {isPassed ? '— Lulus —' : '— Belum Lulus —'}
                            </p>
                            <h1 className="font-cinzel text-2xl font-bold text-white mb-1">
                                {isPassed
                                    ? (allLevelsPassed ? 'Selamat! Semua Level Selesai!' : 'Level Berhasil Dilewati!')
                                    : 'Hampir berhasil!'}
                            </h1>
                            <p className="text-white/40 text-sm">{topic.title}</p>
                        </div>

                        {/* Score + Stars */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
                            {/* Big score */}
                            <div className="text-center">
                                <div className="font-cinzel text-7xl font-bold text-white leading-none mb-1">{score}</div>
                                <div className="text-white/40 text-xs uppercase tracking-widest">Skor</div>
                            </div>

                            <div className="w-px h-16 bg-white/10 hidden sm:block" />

                            {/* Stars */}
                            <div className="text-center">
                                <div className="flex gap-2 text-4xl mb-1 justify-center">
                                    {[...Array(3)].map((_, i) => (
                                        <span key={i} className={i < starCount
                                            ? 'text-bronze drop-shadow-[0_0_8px_rgba(201,164,92,0.8)]'
                                            : 'text-white/10'
                                        }>★</span>
                                    ))}
                                </div>
                                <div className="text-white/40 text-xs uppercase tracking-widest">Bintang</div>
                            </div>

                            <div className="w-px h-16 bg-white/10 hidden sm:block" />

                            {/* Stats */}
                            <div className="flex gap-5 text-center">
                                <div>
                                    <div className="font-cinzel text-2xl font-bold text-correct mb-0.5">{correctAnswers}</div>
                                    <div className="text-white/40 text-xs">Benar</div>
                                </div>
                                <div>
                                    <div className="font-cinzel text-2xl font-bold text-wrong mb-0.5">{wrongAnswers}</div>
                                    <div className="text-white/40 text-xs">Salah</div>
                                </div>
                                <div>
                                    <div className="font-cinzel text-2xl font-bold text-white/60 mb-0.5">{totalQuestions}</div>
                                    <div className="text-white/40 text-xs">Total</div>
                                </div>
                            </div>
                        </div>

                        {/* Level progress indicator */}
                        <div className="flex justify-center gap-3 mb-8">
                            {[1, 2, 3].map(lvl => (
                                <div key={lvl} className="flex flex-col items-center gap-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                                        lvl < currentLevel
                                            ? 'bg-correct border-correct text-white'
                                            : lvl === currentLevel
                                                ? isPassed
                                                    ? 'bg-correct border-correct text-white'
                                                    : 'bg-bronze/20 border-bronze text-bronze-light'
                                                : 'bg-white/5 border-white/15 text-white/30'
                                    }`}>
                                        {lvl < currentLevel || (lvl === currentLevel && isPassed) ? '✓' : lvl}
                                    </div>
                                    <span className="text-[10px] text-white/30 font-semibold">Lvl {lvl}</span>
                                </div>
                            ))}
                        </div>

                        {/* Level 3 Completion Banner */}
                        {isPassed && (allLevelsPassed || currentLevel === 3) && (
                            <div className="mb-8 p-4 rounded-2xl border border-bronze/40 bg-bronze/10 text-center flex items-center justify-center gap-3">
                                <span className="text-2xl">🗺️</span>
                                <div className="text-left">
                                    <p className="text-bronze-light font-bold text-sm">Peta Game Penjelajahan Terbuka!</p>
                                    <p className="text-white/60 text-xs">Kamu telah menyelesaikan Kuis Level 3. Sekarang kamu bisa menjelajahi peta petualangan!</p>
                                </div>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            {!isPassed && (
                                <Link href={route('quiz.show', topic.slug)}
                                      className="text-center py-3 px-8 border border-white/20 text-white/70 font-semibold rounded-xl hover:bg-white/8 transition-colors no-underline text-sm">
                                    Coba Lagi
                                </Link>
                            )}

                            {isPassed && nextLevel && !allLevelsPassed && (
                                <Link href={route('quiz.show', topic.slug)}
                                      className="text-center py-3 px-8 text-white font-bold rounded-xl transition-all hover:shadow-lg no-underline text-sm hover:-translate-y-0.5"
                                      style={{ background: 'linear-gradient(135deg, #1f4fbf, #0d1f4d)', border: '1px solid rgba(201,164,92,0.3)' }}>
                                    Lanjut ke Level {nextLevel} →
                                </Link>
                            )}

                            {(allLevelsPassed || (isPassed && currentLevel === 3)) && (
                                <Link href={route('game.index')}
                                      className="text-center py-3 px-8 text-navy-deep font-bold rounded-xl transition-all hover:shadow-lg no-underline text-sm hover:-translate-y-0.5"
                                      style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', boxShadow: '0 0 20px rgba(201,164,92,0.3)' }}>
                                    🗺️ Jelajahi Peta Game
                                </Link>
                            )}

                            {(allLevelsPassed || (isPassed && !nextLevel)) && (
                                <Link href={route('materi.index')}
                                      className="text-center py-3 px-8 border border-white/20 text-white/80 font-semibold rounded-xl hover:bg-white/10 transition-colors no-underline text-sm">
                                    {allLevelsPassed ? 'Ke Daftar Materi 🎉' : 'Ke Daftar Materi'}
                                </Link>
                            )}

                            <Link href={route('materi.show', topic.slug)}
                                  className="text-center py-3 px-8 border border-white/15 text-white/50 font-semibold rounded-xl hover:bg-white/5 transition-colors no-underline text-sm">
                                Kembali ke Materi
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Review Section */}
                {review && review.length > 0 && (
                    <div className="rounded-[24px] overflow-hidden" style={glass}>
                        <div className="px-8 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <h2 className="font-cinzel text-lg font-bold text-white">Pembahasan Soal</h2>
                            <p className="text-white/40 text-xs mt-0.5">Klik setiap soal untuk melihat pembahasan</p>
                        </div>

                        <div className="divide-y divide-white/8">
                            {review.map((item, index) => (
                                <div key={item.id} className="px-8 py-5">
                                    <div className="flex gap-4">
                                        {/* Status icon */}
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                                            item.isCorrect
                                                ? 'bg-correct/20 text-correct border border-correct/30'
                                                : 'bg-wrong/20 text-wrong border border-wrong/30'
                                        }`}>
                                            {item.isCorrect ? '✓' : '✗'}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {/* Question */}
                                            <p className="text-white/80 font-semibold text-sm mb-3 leading-relaxed">
                                                <span className="text-white/30 mr-1">{index + 1}.</span>
                                                {item.questionText}
                                            </p>

                                            {/* Answer comparison */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                                <div className={`rounded-xl px-4 py-2.5 text-sm ${
                                                    item.isCorrect
                                                        ? 'bg-correct/10 border border-correct/20'
                                                        : 'bg-wrong/10 border border-wrong/20'
                                                }`}>
                                                    <span className="text-white/30 text-xs block mb-0.5">Jawaban kamu</span>
                                                    <span className={`font-semibold ${item.isCorrect ? 'text-correct' : 'text-wrong'}`}>
                                                        {item.userAnswerText}
                                                    </span>
                                                </div>

                                                {!item.isCorrect && (
                                                    <div className="bg-correct/10 border border-correct/20 rounded-xl px-4 py-2.5 text-sm">
                                                        <span className="text-white/30 text-xs block mb-0.5">Jawaban benar</span>
                                                        <span className="font-semibold text-correct">{item.correctAnswerText}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Explanation */}
                                            {item.explanation && (
                                                <div className="flex gap-2.5 bg-white/4 border border-white/8 rounded-xl px-4 py-3">
                                                    <span className="text-bronze text-sm flex-shrink-0 mt-px">💡</span>
                                                    <p className="text-white/50 text-xs leading-relaxed">
                                                        <strong className="text-bronze-light/80">Penjelasan: </strong>
                                                        {item.explanation}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
