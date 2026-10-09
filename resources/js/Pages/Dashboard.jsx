import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Beranda" />

            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[24px] p-8 mb-8"
                 style={{
                     background: 'linear-gradient(135deg, rgba(31,79,191,0.5) 0%, rgba(8,20,68,0.8) 100%)',
                     border: '1px solid rgba(201,164,92,0.35)',
                     backdropFilter: 'blur(20px)',
                     boxShadow: '0 0 50px rgba(31,79,191,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                 }}>
                {/* Glow blob */}
                <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full pointer-events-none opacity-30"
                     style={{ background: 'radial-gradient(circle, #ecd39a, transparent 70%)' }} />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none"
                     style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(143,180,255,0.08), transparent 60%)' }} />

                <div className="relative z-10">
                    <p className="text-bronze-light font-bold text-xs uppercase tracking-widest mb-2">Selamat datang kembali</p>
                    <h1 className="font-cinzel text-3xl md:text-4xl font-bold mb-3 text-white">
                        {auth.user.name}
                    </h1>
                    <p className="text-sky/80 text-sm max-w-md mb-6 leading-relaxed">
                        Kamu berada di level <strong className="text-bronze-light">{stats.levelTitle}</strong>. Terus semangat!
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 mb-6 flex-wrap">
                        <div className="bg-black/30 border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm">
                            <span className="block font-cinzel text-2xl text-bronze-light font-bold">{stats.totalStars}</span>
                            <span className="text-xs text-sky/70 font-semibold">Bintang</span>
                        </div>
                        <div className="bg-black/30 border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm">
                            <span className="block font-cinzel text-2xl text-bronze-light font-bold">{stats.completedTopics}/{stats.totalTopics}</span>
                            <span className="text-xs text-sky/70 font-semibold">Topik Selesai</span>
                        </div>
                        <div className="bg-black/30 border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm">
                            <span className="block font-cinzel text-2xl text-bronze-light font-bold">{stats.totalXp ?? 0}</span>
                            <span className="text-xs text-sky/70 font-semibold">XP</span>
                        </div>
                    </div>

                    <Link href={route('materi.index')}
                          className="inline-block py-3 px-7 text-navy-deep font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(236,211,154,0.5)]"
                          style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                        Mulai Belajar
                    </Link>
                </div>
            </div>

            {/* Feature Cards — unified glass style */}
            <h2 className="font-cinzel text-base text-white/70 mb-5 font-bold uppercase tracking-wider">
                Fitur Utama
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                    {
                        icon: '📚',
                        title: 'Materi',
                        desc: 'Pelajari konsep matematika dengan penjelasan lengkap dan contoh soal interaktif.',
                        href: route('materi.index'),
                        label: 'Mulai Belajar',
                        accent: 'rgba(143,180,255,0.15)',
                        border: 'rgba(143,180,255,0.25)',
                    },
                    {
                        icon: '📝',
                        title: 'Latihan & Kuis',
                        desc: 'Uji pemahaman kamu lewat kuis singkat. Jawab semua soal untuk lulus!',
                        href: route('materi.index'),
                        label: 'Mulai Kuis',
                        accent: 'rgba(201,164,92,0.12)',
                        border: 'rgba(201,164,92,0.25)',
                    },
                    {
                        icon: '🗺️',
                        title: 'Game Jelajah',
                        desc: 'Selesaikan tantangan matematika dalam petualangan dunia sihir yang seru.',
                        href: route('game.index'),
                        label: 'Mulai Petualangan',
                        accent: 'rgba(47,148,97,0.12)',
                        border: 'rgba(47,148,97,0.25)',
                    },
                ].map((card) => (
                    <div key={card.title}
                         className="relative overflow-hidden rounded-[20px] p-6 flex flex-col group transition-all hover:-translate-y-1"
                         style={{
                             background: `linear-gradient(135deg, ${card.accent}, rgba(8,20,68,0.7))`,
                             border: `1px solid ${card.border}`,
                             backdropFilter: 'blur(20px)',
                             boxShadow: '0 8px 32px rgba(5,13,36,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                         }}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                             style={{ background: `radial-gradient(circle at 50% 0%, ${card.border}, transparent 70%)` }} />

                        <div className="text-4xl mb-4">{card.icon}</div>
                        <h3 className="font-cinzel font-bold text-lg mb-2 text-white">{card.title}</h3>
                        <p className="text-white/60 text-sm mb-5 flex-1 leading-relaxed">{card.desc}</p>
                        <Link href={card.href}
                              className="block w-full text-center py-2.5 text-navy-deep font-bold rounded-xl hover:shadow-md transition-shadow no-underline text-sm"
                              style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                            {card.label}
                        </Link>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
