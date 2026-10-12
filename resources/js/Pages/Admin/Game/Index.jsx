import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const diffBadge = {
    Mudah:  { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
    Sedang: { bg: 'rgba(251,146,60,0.15)',  color: '#fb923c', border: 'rgba(251,146,60,0.3)' },
    Sulit:  { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
};

export default function AdminGameIndex({ stages, selectedStage, questions, topics }) {
    const [searchQuery, setSearchQuery] = useState('');

    function handleStageChange(stageNum) {
        router.get(route('admin.game'), { stage: stageNum }, { preserveState: true, preserveScroll: true });
    }

    function deleteQuestion(q) {
        if (!confirm(`Hapus soal game "${q.question_text.slice(0, 50)}..."?`)) return;
        router.delete(route('admin.game.questions.destroy', q.id), { preserveScroll: true });
    }

    const currentStageInfo = stages.find((s) => s.stage === selectedStage) || stages[0];

    const filteredQuestions = questions.filter((q) => {
        if (!searchQuery.trim()) return true;
        const qText = q.question_text.toLowerCase();
        const s = searchQuery.toLowerCase();
        const optionsMatch = Object.values(q.options ?? {}).some(opt => String(opt).toLowerCase().includes(s));
        return qText.includes(s) || optionsMatch;
    });

    return (
        <AdminLayout>
            <Head title="Kelola Soal Game Penjelajahan" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        <span>🗺️</span> Kelola Soal Game Penjelajahan
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        Atur dan edit soal petualangan untuk 5 Peta Game Jelajah Matematika.
                    </p>
                </div>
                <Link
                    href={route('admin.game.questions.create', { stage: selectedStage })}
                    className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                >
                    <span>+</span> Tambah Soal Stage {selectedStage}
                </Link>
            </div>

            {/* Stage Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                {stages.map((stg) => {
                    const isSelected = stg.stage === selectedStage;
                    return (
                        <button
                            key={stg.stage}
                            onClick={() => handleStageChange(stg.stage)}
                            className="p-3.5 sm:p-4 rounded-2xl text-left transition-all border flex flex-col justify-between"
                            style={{
                                background: isSelected
                                    ? `linear-gradient(135deg, ${stg.color}25, rgba(8,20,68,0.85))`
                                    : 'rgba(8,20,68,0.5)',
                                borderColor: isSelected ? stg.color : 'rgba(255,255,255,0.08)',
                                boxShadow: isSelected ? `0 0 20px ${stg.color}25` : 'none',
                            }}
                        >
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-2xl">{stg.icon}</span>
                                <span
                                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                    style={{
                                        background: isSelected ? `${stg.color}30` : 'rgba(255,255,255,0.06)',
                                        color: isSelected ? stg.color : 'rgba(255,255,255,0.5)',
                                        border: `1px solid ${isSelected ? stg.color : 'rgba(255,255,255,0.1)'}`,
                                    }}
                                >
                                    {stg.questionsCount ?? 0} Soal
                                </span>
                            </div>
                            <div>
                                <p className="font-cinzel font-bold text-xs sm:text-sm text-white">
                                    Stage {stg.stage}
                                </p>
                                <p className="text-[11px] font-semibold text-bronze-light truncate">
                                    {stg.name}
                                </p>
                                <p className="text-[10px] text-white/40 truncate mt-0.5">
                                    {stg.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Stage Info Banner */}
            <div
                className="rounded-[22px] p-5 sm:p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{
                    background: `linear-gradient(135deg, ${currentStageInfo.color}15, rgba(8,20,68,0.7))`,
                    border: `1px solid ${currentStageInfo.color}40`,
                    backdropFilter: 'blur(20px)',
                }}
            >
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                        style={{
                            background: `${currentStageInfo.color}25`,
                            border: `1px solid ${currentStageInfo.color}40`,
                        }}
                    >
                        {currentStageInfo.icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                                style={{ background: `${currentStageInfo.color}30`, color: currentStageInfo.color }}
                            >
                                Stage {currentStageInfo.stage} Game
                            </span>
                            <span className="text-xs text-white/40">
                                Syarat Buka: Selesaikan Kuis Level 3
                            </span>
                        </div>
                        <h2 className="font-cinzel font-bold text-xl text-white mt-0.5">
                            {currentStageInfo.name} — <span className="text-white/60 font-sans text-sm font-normal">{currentStageInfo.description}</span>
                        </h2>
                    </div>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <input
                        type="text"
                        placeholder="Cari teks soal game..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 outline-none w-full sm:w-60"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="text-xs text-white/40 hover:text-white px-2 py-1 rounded-lg"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>

            {/* Questions List */}
            <div className="flex flex-col gap-4">
                {filteredQuestions.length === 0 && (
                    <div
                        className="rounded-[20px] p-12 text-center"
                        style={{
                            background: 'rgba(8,20,68,0.4)',
                            border: '1px dashed rgba(255,255,255,0.15)',
                        }}
                    >
                        <span className="text-4xl block mb-2">{currentStageInfo.icon}</span>
                        <p className="text-white/40 text-sm mb-3">
                            {searchQuery ? 'Tidak ada soal game yang cocok dengan pencarian.' : `Belum ada soal untuk Stage ${selectedStage} (${currentStageInfo.name}).`}
                        </p>
                        <Link
                            href={route('admin.game.questions.create', { stage: selectedStage })}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold no-underline text-bronze-light transition-all hover:bg-white/5"
                            style={{ border: '1px solid rgba(201,164,92,0.3)' }}
                        >
                            + Tambah Soal Stage {selectedStage} Sekarang →
                        </Link>
                    </div>
                )}

                {filteredQuestions.map((q, index) => {
                    const badge = diffBadge[q.difficulty] ?? diffBadge['Sedang'];
                    return (
                        <div
                            key={q.id}
                            className="rounded-[20px] p-5 sm:p-6 flex flex-col gap-4 transition-all hover:border-opacity-60"
                            style={{
                                background: 'rgba(8,20,68,0.65)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center font-cinzel font-bold text-sm flex-shrink-0"
                                        style={{
                                            background: `${currentStageInfo.color}25`,
                                            color: currentStageInfo.color,
                                            border: `1px solid ${currentStageInfo.color}40`,
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-base font-semibold leading-relaxed mb-1">
                                            {q.question_text}
                                        </p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}
                                            >
                                                {q.difficulty}
                                            </span>
                                            <span
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                style={{ background: 'rgba(236,211,154,0.1)', color: '#ecd39a', border: '1px solid rgba(236,211,154,0.25)' }}
                                            >
                                                🎮 Soal Game
                                            </span>
                                            {q.topic && (
                                                <span className="text-[10px] text-white/40">
                                                    Topik: {q.topic.title}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 self-end sm:self-start flex-shrink-0">
                                    <Link
                                        href={route('admin.game.questions.edit', q.id)}
                                        id={`edit-game-question-${q.id}`}
                                        className="text-xs font-bold px-3.5 py-1.5 rounded-xl no-underline transition-all hover:scale-105 flex items-center gap-1.5"
                                        style={{ background: 'rgba(201,164,92,0.15)', color: '#ecd39a', border: '1px solid rgba(201,164,92,0.3)' }}
                                    >
                                        <span>✏️</span> Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteQuestion(q)}
                                        id={`delete-game-question-${q.id}`}
                                        className="text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all hover:scale-105 flex items-center gap-1.5"
                                        style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }}
                                    >
                                        <span>🗑️</span> Hapus
                                    </button>
                                </div>
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5">
                                {Object.entries(q.options ?? {}).map(([key, opt]) => {
                                    const isCorrect = key === q.correct_answer || String(opt) === String(q.correct_answer);
                                    return (
                                        <div
                                            key={key}
                                            className="px-3.5 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all"
                                            style={{
                                                background: isCorrect ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.03)',
                                                border: isCorrect ? '1px solid rgba(52,211,153,0.4)' : '1px solid rgba(255,255,255,0.06)',
                                                color: isCorrect ? '#34d399' : 'rgba(255,255,255,0.6)',
                                                fontWeight: isCorrect ? 600 : 400,
                                            }}
                                        >
                                            <span
                                                className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] flex-shrink-0"
                                                style={{
                                                    background: isCorrect ? '#34d399' : 'rgba(255,255,255,0.08)',
                                                    color: isCorrect ? '#081436' : 'rgba(255,255,255,0.5)',
                                                }}
                                            >
                                                {key}
                                            </span>
                                            <span className="flex-1 truncate">{opt}</span>
                                            {isCorrect && (
                                                <span className="text-xs font-bold flex-shrink-0">✓ Kunci</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            {q.explanation && (
                                <div
                                    className="p-3 rounded-xl text-xs text-white/60 flex items-start gap-2"
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                                >
                                    <span className="text-bronze-light font-bold flex-shrink-0">💡 Penjelasan:</span>
                                    <span>{q.explanation}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
