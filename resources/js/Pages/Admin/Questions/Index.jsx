import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const diffBadge = {
    Mudah:  { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
    Sedang: { bg: 'rgba(251,146,60,0.15)',  color: '#fb923c', border: 'rgba(251,146,60,0.3)' },
    Sulit:  { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
};

export default function AdminQuestions({ topic, questions }) {
    const [selectedTab, setSelectedTab] = useState('all'); // 'all', 'level_1', 'level_2', 'level_3', 'game'

    function deleteQuestion(question) {
        if (!confirm(`Hapus soal ini?`)) return;
        router.delete(route('admin.questions.destroy', [topic.id, question.id]), { preserveScroll: true });
    }

    const filteredQuestions = questions.filter((q) => {
        if (selectedTab === 'all') return true;
        if (selectedTab === 'game') return q.type === 'game';
        if (selectedTab === 'level_1') return q.type !== 'game' && (q.quiz_level ?? 1) === 1;
        if (selectedTab === 'level_2') return q.type !== 'game' && (q.quiz_level ?? 1) === 2;
        if (selectedTab === 'level_3') return q.type !== 'game' && (q.quiz_level ?? 1) === 3;
        return true;
    });

    const level1Count = questions.filter((q) => q.type !== 'game' && (q.quiz_level ?? 1) === 1).length;
    const level2Count = questions.filter((q) => q.type !== 'game' && (q.quiz_level ?? 1) === 2).length;
    const level3Count = questions.filter((q) => q.type !== 'game' && (q.quiz_level ?? 1) === 3).length;
    const gameCount = questions.filter((q) => q.type === 'game').length;

    return (
        <AdminLayout>
            <Head title={`Soal: ${topic.title}`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <Link href={route('admin.topics')} className="text-white/40 hover:text-white/70 text-sm no-underline transition-colors">
                        ← Kembali ke Topik
                    </Link>
                    <h1 className="font-cinzel text-2xl font-bold text-white mt-1">
                        Bank Soal — <span className="text-bronze-light">{topic.title}</span>
                    </h1>
                    <p className="text-white/40 text-sm mt-0.5">{questions.length} soal total tersedia</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href={route('admin.quiz', { topic_id: topic.id })}
                        className="no-underline inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all text-white/70 hover:text-white"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                        <span>📝</span> Buka di Kuis 3 Tahap
                    </Link>
                    <Link
                        href={route('admin.questions.create', topic.id)}
                        id="create-question-btn"
                        className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                    >
                        <span>+</span> Tambah Soal
                    </Link>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
                {[
                    { id: 'all', label: 'Semua Soal', count: questions.length, icon: '📋' },
                    { id: 'level_1', label: 'Kuis Tahap 1', count: level1Count, icon: '🟢' },
                    { id: 'level_2', label: 'Kuis Tahap 2', count: level2Count, icon: '🟡' },
                    { id: 'level_3', label: 'Kuis Tahap 3', count: level3Count, icon: '🔴' },
                    { id: 'game', label: 'Game Jelajah', count: gameCount, icon: '🗺️' },
                ].map((tab) => {
                    const isSelected = selectedTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 border"
                            style={{
                                background: isSelected ? 'linear-gradient(135deg, rgba(201,164,92,0.22), rgba(8,20,68,0.8))' : 'rgba(255,255,255,0.04)',
                                borderColor: isSelected ? '#c9a45c' : 'rgba(255,255,255,0.08)',
                                color: isSelected ? '#ecd39a' : 'rgba(255,255,255,0.6)',
                            }}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                            <span
                                className="px-1.5 py-0.5 rounded-md text-[10px]"
                                style={{
                                    background: isSelected ? 'rgba(201,164,92,0.3)' : 'rgba(255,255,255,0.08)',
                                    color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.5)',
                                }}
                            >
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col gap-3">
                {filteredQuestions.length === 0 && (
                    <div className="text-center py-16 text-white/30 rounded-2xl border border-dashed border-white/10">
                        Belum ada soal pada kategori ini.{' '}
                        <Link href={route('admin.questions.create', topic.id)} className="text-bronze-light no-underline">
                            Tambah sekarang →
                        </Link>
                    </div>
                )}

                {filteredQuestions.map((q, index) => {
                    const badge = diffBadge[q.difficulty] ?? diffBadge['Sedang'];
                    const isGame = q.type === 'game';
                    return (
                        <div
                            key={q.id}
                            className="rounded-[18px] p-5 flex flex-col sm:flex-row sm:items-start gap-4 transition-all"
                            style={{
                                background: 'rgba(8,20,68,0.6)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center font-cinzel font-bold text-sm flex-shrink-0"
                                style={{
                                    background: isGame ? 'rgba(245,158,11,0.15)' : 'rgba(167,139,250,0.1)',
                                    color: isGame ? '#f59e0b' : 'rgba(167,139,250,0.8)',
                                    border: isGame ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(167,139,250,0.2)',
                                }}
                            >
                                {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    {isGame ? (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
                                            🎮 Game Jelajah
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>
                                            Kuis Tahap {q.quiz_level ?? 1}
                                        </span>
                                    )}
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}>
                                        {q.difficulty}
                                    </span>
                                </div>

                                <p className="text-white text-sm font-semibold mb-2 line-clamp-2">{q.question_text}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {Object.entries(q.options ?? {}).map(([key, opt]) => {
                                        const isCorrect = key === q.correct_answer || String(opt) === String(q.correct_answer);
                                        return (
                                            <span
                                                key={key}
                                                className="text-[11px] px-2 py-0.5 rounded-lg"
                                                style={{
                                                    background: isCorrect ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',
                                                    color: isCorrect ? '#34d399' : 'rgba(255,255,255,0.4)',
                                                    border: isCorrect ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(255,255,255,0.08)',
                                                    fontWeight: isCorrect ? 700 : 400,
                                                }}
                                            >
                                                {isCorrect ? '✓ ' : ''}{key}: {opt}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Link
                                    href={route('admin.questions.edit', [topic.id, q.id])}
                                    id={`edit-question-${q.id}`}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-all hover:scale-105"
                                    style={{ background: 'rgba(201,164,92,0.12)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.25)' }}
                                >
                                    Edit
                                </Link>
                                <button
                                    id={`delete-question-${q.id}`}
                                    onClick={() => deleteQuestion(q)}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                                    style={{ background: 'rgba(255,50,50,0.1)', color: '#ff6060', border: '1px solid rgba(255,50,50,0.2)' }}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
