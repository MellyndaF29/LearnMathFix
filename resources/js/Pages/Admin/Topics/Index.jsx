import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

const difficultyBadge = {
    Mudah:  { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
    Sedang: { bg: 'rgba(251,146,60,0.15)',  color: '#fb923c', border: 'rgba(251,146,60,0.3)' },
    Sulit:  { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
};

export default function AdminTopics({ topics }) {
    function deleteTopic(topic) {
        if (!confirm(`Hapus topik "${topic.title}"? Semua materi dan soal terkait juga akan dihapus.`)) return;
        router.delete(route('admin.topics.destroy', topic.id), { preserveScroll: true });
    }

    function togglePublish(topic) {
        router.put(route('admin.topics.update', topic.id), {
            ...topic,
            is_published: !topic.is_published,
        }, { preserveScroll: true });
    }

    return (
        <AdminLayout>
            <Head title="Kelola Topik" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-cinzel text-2xl font-bold text-white mb-1">Kelola Topik</h1>
                    <p className="text-white/50 text-sm">{topics.length} topik tersedia.</p>
                </div>
                <Link
                    href={route('admin.topics.create')}
                    id="create-topic-btn"
                    className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(236,211,154,0.3)]"
                    style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                >
                    <span>+</span> Tambah Topik
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {topics.length === 0 && (
                    <div className="text-center py-16 text-white/30">
                        Belum ada topik. <Link href={route('admin.topics.create')} className="text-bronze-light no-underline">Tambah sekarang →</Link>
                    </div>
                )}

                {topics.map((topic) => {
                    const badge = difficultyBadge[topic.difficulty] ?? difficultyBadge['Sedang'];
                    return (
                        <div
                            key={topic.id}
                            className="rounded-[20px] p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-opacity-60 transition-all"
                            style={{
                                background: 'rgba(8,20,68,0.6)',
                                border: '1px solid rgba(201,164,92,0.2)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                                style={{ background: `${topic.color ?? '#8fb4ff'}22`, border: `1px solid ${topic.color ?? '#8fb4ff'}44` }}
                            >
                                {topic.icon ?? '📚'}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h2 className="font-cinzel font-bold text-white text-base">{topic.title}</h2>
                                    {!topic.is_published && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            Draft
                                        </span>
                                    )}
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}>
                                        {topic.difficulty}
                                    </span>
                                </div>
                                <p className="text-white/40 text-xs truncate mb-2">{topic.description}</p>
                                <div className="flex items-center gap-4 text-xs text-white/30">
                                    <span>📄 {topic.sections_count} Materi</span>
                                    <span>❓ {topic.questions_count} Soal</span>
                                    <span>📁 {topic.category}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                                <Link
                                    href={route('admin.sections', topic.id)}
                                    id={`manage-sections-${topic.id}`}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-all hover:scale-105"
                                    style={{ background: 'rgba(143,180,255,0.1)', color: 'rgba(143,180,255,0.8)', border: '1px solid rgba(143,180,255,0.2)' }}
                                >
                                    Materi
                                </Link>
                                <Link
                                    href={route('admin.questions', topic.id)}
                                    id={`manage-questions-${topic.id}`}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-all hover:scale-105"
                                    style={{ background: 'rgba(167,139,250,0.1)', color: 'rgba(167,139,250,0.8)', border: '1px solid rgba(167,139,250,0.2)' }}
                                >
                                    Soal
                                </Link>
                                <Link
                                    href={route('admin.topics.edit', topic.id)}
                                    id={`edit-topic-${topic.id}`}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-all hover:scale-105"
                                    style={{ background: 'rgba(201,164,92,0.12)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.25)' }}
                                >
                                    Edit
                                </Link>
                                <button
                                    id={`toggle-publish-${topic.id}`}
                                    onClick={() => togglePublish(topic)}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                                    style={{
                                        background: topic.is_published ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.06)',
                                        color: topic.is_published ? '#34d399' : 'rgba(255,255,255,0.4)',
                                        border: `1px solid ${topic.is_published ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.1)'}`,
                                    }}
                                >
                                    {topic.is_published ? 'Unpublish' : 'Publish'}
                                </button>
                                <button
                                    id={`delete-topic-${topic.id}`}
                                    onClick={() => deleteTopic(topic)}
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
