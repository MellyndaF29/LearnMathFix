import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function StatCard({ icon, label, value, accent }) {
    return (
        <div
            className="relative overflow-hidden rounded-[20px] p-6 flex flex-col gap-3 hover:-translate-y-1 transition-transform"
            style={{
                background: `linear-gradient(135deg, ${accent}22, rgba(8,20,68,0.7))`,
                border: `1px solid ${accent}44`,
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(5,13,36,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}
            >
                {icon}
            </div>
            <div>
                <p className="font-cinzel text-3xl font-bold text-white">{value}</p>
                <p className="text-sm text-white/50 mt-0.5">{label}</p>
            </div>
        </div>
    );
}

export default function AdminDashboard({ stats, recentUsers }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="mb-8">
                <h1 className="font-cinzel text-3xl font-bold text-white mb-1">Dashboard Admin</h1>
                <p className="text-white/50 text-sm">Kelola konten dan pengguna LearnMath dari sini.</p>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
                <StatCard icon="👥" label="Total Pengguna"    value={stats.totalUsers}     accent="#8fb4ff" />
                <StatCard icon="📚" label="Total Topik"       value={stats.totalTopics}    accent="#c9a45c" />
                <StatCard icon="📄" label="Total Materi"      value={stats.totalSections}  accent="#2f9461" />
                <StatCard icon="❓" label="Total Soal"        value={stats.totalQuestions} accent="#a78bfa" />
                <StatCard icon="✅" label="Topik Dipublikasi" value={stats.publishedTopics} accent="#34d399" />
                <StatCard icon="📝" label="Percobaan Kuis"   value={stats.quizAttempts}   accent="#fb923c" />
            </div>

            {/* Quick Access */}
            <h2 className="font-cinzel text-base text-white/70 mb-4 font-bold uppercase tracking-wider">
                Akses Cepat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                    { label: 'Kelola Topik',    href: route('admin.topics'), icon: '📚', desc: 'Tambah, ubah, atau hapus topik materi.' },
                    { label: 'Kelola Pengguna', href: route('admin.users'),  icon: '👥', desc: 'Lihat semua pengguna dan atur hak akses admin.' },
                    { label: 'Kembali ke App',  href: route('dashboard'),    icon: '🏠', desc: 'Buka tampilan pengguna biasa.' },
                ].map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="no-underline rounded-[18px] p-5 flex items-start gap-4 hover:-translate-y-1 transition-all group"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                            <p className="font-bold text-white group-hover:text-bronze-light transition-colors">{item.label}</p>
                            <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Users */}
            <h2 className="font-cinzel text-base text-white/70 mb-4 font-bold uppercase tracking-wider">
                Pengguna Terbaru
            </h2>
            <div
                className="rounded-[20px] overflow-hidden"
                style={{
                    background: 'rgba(8,20,68,0.6)',
                    border: '1px solid rgba(201,164,92,0.2)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Nama</th>
                            <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Email</th>
                            <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Role</th>
                            <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Bergabung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentUsers.map((u, i) => (
                            <tr
                                key={u.id}
                                style={{ borderBottom: i < recentUsers.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                                className="hover:bg-white/3 transition-colors"
                            >
                                <td className="px-5 py-3 font-semibold text-white">{u.name}</td>
                                <td className="px-5 py-3 text-white/50 hidden sm:table-cell">{u.email}</td>
                                <td className="px-5 py-3">
                                    {u.is_admin ? (
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,164,92,0.15)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.3)' }}>Admin</span>
                                    ) : (
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(143,180,255,0.1)', color: 'rgba(143,180,255,0.7)', border: '1px solid rgba(143,180,255,0.2)' }}>Siswa</span>
                                    )}
                                </td>
                                <td className="px-5 py-3 text-white/40 text-xs hidden md:table-cell">
                                    {new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-5 py-3 flex justify-end" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <Link
                        href={route('admin.users')}
                        className="text-xs font-bold no-underline transition-colors"
                        style={{ color: '#c9a45c' }}
                    >
                        Lihat semua pengguna →
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
