import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

const diffBadge = {
    Mudah:  { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
    Sedang: { bg: 'rgba(251,146,60,0.15)',  color: '#fb923c', border: 'rgba(251,146,60,0.3)' },
    Sulit:  { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
};

export default function AdminQuestions({ topic, questions }) {
    function deleteQuestion(question) {
        if (!confirm(`Hapus soal ini?`)) return;
        router.delete(route('admin.questions.destroy', [topic.id, question.id]), { preserveScroll: true });
    }

    return (
        <AdminLayout>
            <Head title={`Soal: ${topic.title}`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <Link href={route('admin.topics')} className="text-white/40 hover:text-white/70 text-sm no-underline transition-colors">← Topik</Link>
                    <h1 className="font-cinzel text-2xl font-bold text-white mt-1">
                        Soal — <span className="text-bronze-light">{topic.title}</span>
                    </h1>
                    <p className="text-white/40 text-sm mt-0.5">{questions.length} soal tersedia</p>
                </div>
                <Link
                    href={route('admin.questions.create', topic.id)}
                    id="create-question-btn"
                    className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(236,211,154,0.3)]"
                    style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                >
                    <span>+</span> Tambah Soal
                </Link>
            </div>

            <div className="flex flex-col gap-3">
                {questions.length === 0 && (
                    <div className="text-center py-16 text-white/30">
                        Belum ada soal. <Link href={route('admin.questions.create', topic.id)} className="text-bronze-light no-underline">Tambah sekarang →</Link>
                    </div>
                )}

                {questions.map((q, index) => {
                    const badge = diffBadge[q.difficulty] ?? diffBadge['Sedang'];
                    return (
                        <div
                            key={q.id}
                            className="rounded-[18px] p-5 flex flex-col sm:flex-row sm:items-start gap-4"
                            style={{
                                background: 'rgba(8,20,68,0.6)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center font-cinzel font-bold text-sm flex-shrink-0"
                                style={{ background: 'rgba(167,139,250,0.1)', color: 'rgba(167,139,250,0.8)', border: '1px solid rgba(167,139,250,0.2)' }}
                            >
                                {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-semibold mb-2 line-clamp-2">{q.question_text}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {Object.entries(q.options ?? {}).map(([key, opt]) => (
                                        <span
                                            key={key}
                                            className="text-[11px] px-2 py-0.5 rounded-lg"
                                            style={{
                                                background: key === q.correct_answer ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',
                                                color: key === q.correct_answer ? '#34d399' : 'rgba(255,255,255,0.4)',
                                                border: key === q.correct_answer ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(255,255,255,0.08)',
                                                fontWeight: key === q.correct_answer ? 700 : 400,
                                            }}
                                        >
                                            {key === q.correct_answer ? '✓ ' : ''}{key}: {opt}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}>
                                    {q.difficulty}
                                </span>
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
