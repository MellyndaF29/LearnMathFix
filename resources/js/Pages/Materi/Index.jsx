import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const glass = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(5,13,36,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
};

const difficultyBadge = {
    mudah: 'bg-correct/15 text-correct border border-correct/25',
    sedang: 'bg-bronze/15 text-bronze-light border border-bronze/25',
    susah: 'bg-wrong/15 text-wrong border border-wrong/25',
};

export default function Index({ auth, topics, categories }) {
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredTopics = activeCategory === 'Semua'
        ? topics
        : topics.filter(t => t.category === activeCategory);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Materi Pembelajaran" />

            {/* Page header */}
            <div className="mb-6 rounded-[22px] px-7 py-6" style={glass}>
                <p className="text-bronze-light text-xs font-bold uppercase tracking-widest mb-1">Perpustakaan</p>
                <h1 className="font-cinzel text-2xl font-bold text-white mb-4">Materi Pembelajaran</h1>

                {/* Category filter */}
                <div className="flex gap-2 flex-wrap">
                    {['Semua', ...categories].map(cat => {
                        const count = cat === 'Semua' ? topics.length : topics.filter(t => t.category === cat).length;
                        const isActive = activeCategory === cat;
                        return (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                                        isActive
                                            ? 'text-navy-deep border-bronze'
                                            : 'text-white/50 border-white/15 hover:border-white/30 hover:text-white/80'
                                    }`}
                                    style={isActive ? { background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' } : {}}>
                                {cat} <span className="opacity-60 text-xs">({count})</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Topic grid */}
            {filteredTopics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredTopics.map(topic => {
                        const pct = topic.totalMateri > 0
                            ? Math.min(100, (topic.progress / topic.totalMateri) * 100) : 0;
                        const done = pct >= 100;

                        return (
                            <div key={topic.id}
                                 className="rounded-[20px] p-6 flex flex-col transition-all hover:-translate-y-1 relative group"
                                 style={{
                                     ...glass,
                                     boxShadow: done
                                         ? '0 8px 32px rgba(47,148,97,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'
                                         : glass.boxShadow,
                                     border: done ? '1px solid rgba(47,148,97,0.3)' : glass.border,
                                 }}>

                                {/* Completed badge */}
                                {done && (
                                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-correct flex items-center justify-center text-white text-xs font-bold">
                                        ✓
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto transition-transform group-hover:scale-110"
                                     style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {topic.icon}
                                </div>

                                {/* Title */}
                                <h3 className="font-cinzel font-bold text-center text-sm text-white mb-1 leading-snug">
                                    {topic.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/45 text-center text-xs mb-3 leading-relaxed line-clamp-2">
                                    {topic.description}
                                </p>

                                {/* Difficulty */}
                                <div className="flex justify-center mb-3">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${difficultyBadge[topic.difficulty] || 'bg-white/10 text-white/50'}`}>
                                        {topic.difficulty}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="flex justify-center gap-4 text-xs text-white/40 mb-4 font-semibold">
                                    <span>{topic.totalMateri} Materi</span>
                                    <span>{topic.totalKuis} Kuis</span>
                                </div>

                                {/* Progress */}
                                <div className="w-full bg-white/8 h-1.5 rounded-full mb-4 overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-700"
                                         style={{
                                             width: `${pct}%`,
                                             background: done ? '#2f9461' : 'linear-gradient(90deg, #1f4fbf, #8fb4ff)',
                                         }} />
                                </div>

                                <Link href={route('materi.show', topic.slug)}
                                      className="block w-full text-center py-2.5 text-navy-deep rounded-xl font-bold hover:shadow-md transition-shadow no-underline mt-auto text-sm"
                                      style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                                    {done ? 'Ulangi' : pct > 0 ? 'Lanjut' : 'Mulai'}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 text-white/30">
                    Tidak ada materi untuk kategori ini.
                </div>
            )}
        </AuthenticatedLayout>
    );
}
