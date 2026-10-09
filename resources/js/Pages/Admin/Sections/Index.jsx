import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function AdminSections({ topic, sections }) {
    function deleteSection(section) {
        if (!confirm(`Hapus materi "${section.title}"?`)) return;
        router.delete(route('admin.sections.destroy', [topic.id, section.id]), { preserveScroll: true });
    }

    const typeBadge = {
        text:        { label: 'Teks',        bg: 'rgba(143,180,255,0.1)', color: 'rgba(143,180,255,0.8)', border: 'rgba(143,180,255,0.2)' },
        video:       { label: 'Video',       bg: 'rgba(251,146,60,0.1)',  color: '#fb923c',               border: 'rgba(251,146,60,0.2)' },
        interactive: { label: 'Interaktif',  bg: 'rgba(167,139,250,0.1)', color: 'rgba(167,139,250,0.8)', border: 'rgba(167,139,250,0.2)' },
    };

    return (
        <AdminLayout>
            <Head title={`Materi: ${topic.title}`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <Link href={route('admin.topics')} className="text-white/40 hover:text-white/70 text-sm no-underline transition-colors">← Topik</Link>
                    <h1 className="font-cinzel text-2xl font-bold text-white mt-1">
                        Materi — <span className="text-bronze-light">{topic.title}</span>
                    </h1>
                    <p className="text-white/40 text-sm mt-0.5">{sections.length} materi tersedia</p>
                </div>
                <Link
                    href={route('admin.sections.create', topic.id)}
                    id="create-section-btn"
                    className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(236,211,154,0.3)]"
                    style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                >
                    <span>+</span> Tambah Materi
                </Link>
            </div>

            <div className="flex flex-col gap-3">
                {sections.length === 0 && (
                    <div className="text-center py-16 text-white/30">
                        Belum ada materi. <Link href={route('admin.sections.create', topic.id)} className="text-bronze-light no-underline">Tambah sekarang →</Link>
                    </div>
                )}

                {sections.map((section, index) => {
                    const badge = typeBadge[section.type] ?? typeBadge['text'];
                    return (
                        <div
                            key={section.id}
                            className="rounded-[18px] p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                            style={{
                                background: 'rgba(8,20,68,0.6)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center font-cinzel font-bold text-sm flex-shrink-0"
                                style={{ background: 'rgba(201,164,92,0.1)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.2)' }}
                            >
                                {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                    <h3 className="font-bold text-white text-sm">{section.title}</h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}>
                                        {badge.label}
                                    </span>
                                </div>
                                <p className="text-white/30 text-xs line-clamp-1">{section.content.substring(0, 100)}...</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={route('admin.sections.edit', [topic.id, section.id])}
                                    id={`edit-section-${section.id}`}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-all hover:scale-105"
                                    style={{ background: 'rgba(201,164,92,0.12)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.25)' }}
                                >
                                    Edit
                                </Link>
                                <button
                                    id={`delete-section-${section.id}`}
                                    onClick={() => deleteSection(section)}
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
