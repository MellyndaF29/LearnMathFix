import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const diffBadge = {
    Mudah:  { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
    Sedang: { bg: 'rgba(251,146,60,0.15)',  color: '#fb923c', border: 'rgba(251,146,60,0.3)' },
    Sulit:  { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
};

const stageMeta = {
    1: {
        title: 'Tahap 1 — Konsep Dasar',
        desc: 'Soal pengenalan materi dan pemahaman dasar awal.',
        color: '#34d399',
        badgeBg: 'rgba(52,211,153,0.12)',
        borderColor: 'rgba(52,211,153,0.3)',
        icon: '🟢',
    },
    2: {
        title: 'Tahap 2 — Latihan Penerapan',
        desc: 'Soal aplikasi rumus, operasi, dan pemecahan langkah.',
        color: '#fbbf24',
        badgeBg: 'rgba(251,191,36,0.12)',
        borderColor: 'rgba(251,191,36,0.3)',
        icon: '🟡',
    },
    3: {
        title: 'Tahap 3 — Soal Tantangan & Mahir',
        desc: 'Soal tingkat lanjut untuk membuka gerbang Game Jelajah.',
        color: '#f87171',
        badgeBg: 'rgba(248,113,113,0.12)',
        borderColor: 'rgba(248,113,113,0.3)',
        icon: '🔴',
    },
};

export default function AdminQuizIndex({ topics, selectedTopic, selectedLevel: initialLevel, questions }) {
    const [currentLevel, setCurrentLevel] = useState(initialLevel || 1);
    const [searchQuery, setSearchQuery] = useState('');

    function handleTopicChange(topicId) {
        router.get(route('admin.quiz'), { topic_id: topicId, level: currentLevel }, { preserveState: true, preserveScroll: true });
    }

    function handleLevelChange(level) {
        setCurrentLevel(level);
        router.get(route('admin.quiz'), { topic_id: selectedTopic?.id, level }, { preserveState: true, preserveScroll: true });
    }

    function deleteQuestion(q) {
        if (!confirm(`Hapus soal "${q.question_text.slice(0, 50)}..."?`)) return;
        router.delete(route('admin.questions.destroy', [selectedTopic.id, q.id]), { preserveScroll: true });
    }

    // Filter questions by level & search query
    const levelQuestions = questions.filter((q) => {
        const matchesLevel = (q.quiz_level ?? 1) === currentLevel;
        const matchesSearch = searchQuery.trim() === '' ||
            q.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            Object.values(q.options ?? {}).some(opt => String(opt).toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesLevel && matchesSearch;
    });

    const activeStageInfo = stageMeta[currentLevel] ?? stageMeta[1];

    return (
        <AdminLayout>
            <Head title="Kelola Soal Kuis 3 Tahap" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                        <span>📝</span> Kelola Soal Kuis 3 Tahap
                    </h1>
                    <p className="text-white/50 text-sm mt-1">
                        Atur dan edit soal kuis berjenjang (Tahap 1, 2, 3) untuk setiap topik pembelajaran.
                    </p>
                </div>
                {selectedTopic && (
                    <Link
                        href={route('admin.questions.create', selectedTopic.id)}
                        className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                    >
                        <span>+</span> Tambah Soal Topik Ini
                    </Link>
                )}
            </div>

            {/* Topics Bar */}
            <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-2.5">
                    Pilih Topik Materi:
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {topics.map((t) => {
                        const isSelected = selectedTopic && selectedTopic.id === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => handleTopicChange(t.id)}
                                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex-shrink-0 border ${
                                    isSelected
                                        ? 'shadow-[0_0_15px_rgba(201,164,92,0.3)]'
                                        : 'hover:bg-white/5'
                                }`}
                                style={{
                                    background: isSelected
                                        ? 'linear-gradient(135deg, rgba(201,164,92,0.22), rgba(8,20,68,0.8))'
                                        : 'rgba(255,255,255,0.04)',
                                    borderColor: isSelected ? '#c9a45c' : 'rgba(255,255,255,0.1)',
                                    color: isSelected ? '#ecd39a' : 'rgba(255,255,255,0.7)',
                                }}
                            >
                                <span className="text-base">{t.icon ?? '📚'}</span>
                                <span className="font-cinzel text-xs font-bold">{t.title}</span>
                                <span
                                    className="text-[10px] px-1.5 py-0.5 rounded-md font-bold"
                                    style={{
                                        background: isSelected ? 'rgba(201,164,92,0.3)' : 'rgba(255,255,255,0.1)',
                                        color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.5)',
                                    }}
                                >
                                    {t.totalCount} Soal
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stage Selector (Tahap 1, 2, 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {[1, 2, 3].map((lvl) => {
                    const meta = stageMeta[lvl];
                    const isSelected = currentLevel === lvl;
                    const count = questions.filter((q) => (q.quiz_level ?? 1) === lvl).length;
                    return (
                        <button
                            key={lvl}
                            onClick={() => handleLevelChange(lvl)}
                            className="p-4 rounded-2xl text-left transition-all border flex flex-col justify-between"
                            style={{
                                background: isSelected ? `linear-gradient(135deg, ${meta.badgeBg}, rgba(8,20,68,0.85))` : 'rgba(8,20,68,0.5)',
                                borderColor: isSelected ? meta.color : 'rgba(255,255,255,0.08)',
                                boxShadow: isSelected ? `0 0 20px ${meta.color}25` : 'none',
                            }}
                        >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="text-base">{meta.icon}</span>
                                    <span className="font-cinzel font-bold text-sm text-white">
                                        Tahap {lvl}
                                    </span>
                                </div>
                                <span
                                    className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                                    style={{
                                        background: isSelected ? meta.badgeBg : 'rgba(255,255,255,0.06)',
                                        color: isSelected ? meta.color : 'rgba(255,255,255,0.5)',
                                        border: `1px solid ${isSelected ? meta.borderColor : 'rgba(255,255,255,0.1)'}`,
                                    }}
                                >
                                    {count} Soal
                                </span>
                            </div>
                            <p className="text-xs text-white/50">{meta.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Stage Active Bar & Search */}
            <div
                className="rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{
                    background: 'rgba(8,20,68,0.7)',
                    border: `1px solid ${activeStageInfo.borderColor}`,
                    backdropFilter: 'blur(20px)',
                }}
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{activeStageInfo.icon}</span>
                    <div>
                        <h2 className="font-cinzel font-bold text-white text-base">
                            {activeStageInfo.title} — <span className="text-bronze-light">{selectedTopic?.title}</span>
                        </h2>
                        <p className="text-xs text-white/50">{levelQuestions.length} soal aktif pada tahap ini.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Cari teks soal atau pilihan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 outline-none w-full sm:w-64"
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
                {levelQuestions.length === 0 && (
                    <div
                        className="rounded-[20px] p-12 text-center"
                        style={{
                            background: 'rgba(8,20,68,0.4)',
                            border: '1px dashed rgba(255,255,255,0.15)',
                        }}
                    >
                        <p className="text-white/40 text-sm mb-3">
                            {searchQuery ? 'Tidak ada soal yang cocok dengan pencarian.' : `Belum ada soal pada Tahap ${currentLevel} untuk topik ini.`}
                        </p>
                        {selectedTopic && (
                            <Link
                                href={route('admin.questions.create', selectedTopic.id)}
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold no-underline text-bronze-light transition-all hover:bg-white/5"
                                style={{ border: '1px solid rgba(201,164,92,0.3)' }}
                            >
                                + Tambah Soal Tahap {currentLevel} Sekarang →
                            </Link>
                        )}
                    </div>
                )}

                {levelQuestions.map((q, index) => {
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
                                            background: activeStageInfo.badgeBg,
                                            color: activeStageInfo.color,
                                            border: `1px solid ${activeStageInfo.borderColor}`,
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
                                                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                                            >
                                                Tahap {q.quiz_level ?? 1}
                                            </span>
                                            {q.order > 0 && (
                                                <span className="text-[10px] text-white/30">
                                                    Urutan #{q.order}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 self-end sm:self-start flex-shrink-0">
                                    <Link
                                        href={route('admin.questions.edit', [selectedTopic.id, q.id])}
                                        id={`edit-question-${q.id}`}
                                        className="text-xs font-bold px-3.5 py-1.5 rounded-xl no-underline transition-all hover:scale-105 flex items-center gap-1.5"
                                        style={{ background: 'rgba(201,164,92,0.15)', color: '#ecd39a', border: '1px solid rgba(201,164,92,0.3)' }}
                                    >
                                        <span>✏️</span> Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteQuestion(q)}
                                        id={`delete-question-${q.id}`}
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
