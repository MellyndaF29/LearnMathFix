import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, status, stats, recentActivity }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const profileForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({ password: '' });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    const submitDelete = (e) => {
        e.preventDefault();
        deleteForm.delete(route('profile.destroy'));
    };

    const glassCard = {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(5,13,36,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
    };

    const inputClass = 'w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bronze focus:bg-white/10 transition-colors';
    const labelClass = 'block text-white/80 text-xs font-semibold uppercase tracking-widest mb-2';

    const initial = auth.user.name?.charAt(0)?.toUpperCase() || 'U';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profil Saya" />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Profile Header Card */}
                <div className="rounded-[24px] p-8 relative overflow-hidden" style={glassCard}>
                    <div className="absolute inset-0 pointer-events-none"
                         style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(31,79,191,0.18), transparent 65%)' }} />
                    <div className="relative z-10 flex flex-col items-center text-center gap-5">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-cinzel font-bold text-navy-deep"
                                 style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', boxShadow: '0 0 30px rgba(201,164,92,0.4)' }}>
                                {initial}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-navy-deep border border-bronze/40 text-bronze-light text-[10px] font-bold w-8 h-8 rounded-full flex items-center justify-center">
                                L{stats?.level ?? 1}
                            </div>
                        </div>

                        {/* Name & email */}
                        <div>
                            <h1 className="font-cinzel text-2xl font-bold text-white mb-1">{auth.user.name}</h1>
                            <p className="text-white/50 text-sm mb-1">{auth.user.email}</p>
                            <p className="text-bronze-light/80 text-xs font-semibold">{stats?.levelTitle ?? 'Pemula'}</p>
                        </div>

                        {/* XP bar */}
                        <div className="w-full max-w-xs">
                            <div className="flex justify-between text-[11px] text-white/40 font-semibold mb-1.5">
                                <span>XP ke Level {(stats?.level ?? 1) + 1}</span>
                                <span>{Math.min(stats?.xpIntoLevel ?? 0, 50)} / 50</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-1000"
                                     style={{
                                         width: `${Math.min(100, ((stats?.xpIntoLevel ?? 0) / 50) * 100)}%`,
                                         background: 'linear-gradient(90deg, #1f4fbf, #ecd39a)',
                                     }} />
                            </div>
                        </div>

                        {/* Stats chips */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {[
                                { value: stats?.totalStars ?? 0, label: 'Bintang' },
                                { value: `${stats?.completedTopics ?? 0}/${stats?.totalTopics ?? 0}`, label: 'Topik' },
                                { value: stats?.totalXp ?? 0, label: 'Total XP' },
                            ].map(s => (
                                <div key={s.label} className="bg-black/30 border border-white/10 rounded-xl px-5 py-2.5 text-center">
                                    <span className="block font-cinzel text-xl text-bronze-light font-bold">{s.value}</span>
                                    <span className="text-xs text-white/40">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Edit Profile */}
                    <div className="rounded-[20px] p-7" style={glassCard}>
                        <h2 className="font-cinzel text-base font-bold text-white mb-5">Informasi Profil</h2>
                        {status === 'profile-updated' && (
                            <div className="mb-4 text-sm text-correct bg-correct-bg border border-correct/20 rounded-xl px-4 py-2.5">
                                Profil berhasil diperbarui!
                            </div>
                        )}
                        <form onSubmit={submitProfile} className="space-y-4">
                            <div>
                                <label className={labelClass}>Nama</label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={e => profileForm.setData('name', e.target.value)}
                                    className={inputClass}
                                    placeholder="Nama kamu"
                                />
                                {profileForm.errors.name && <p className="text-wrong text-xs mt-1">{profileForm.errors.name}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Email</label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={e => profileForm.setData('email', e.target.value)}
                                    className={inputClass}
                                    placeholder="email@kamu.com"
                                />
                                {profileForm.errors.email && <p className="text-wrong text-xs mt-1">{profileForm.errors.email}</p>}
                            </div>
                            <button type="submit" disabled={profileForm.processing}
                                    className="w-full py-3 text-navy-deep font-bold rounded-xl transition-all disabled:opacity-60 hover:shadow-md text-sm"
                                    style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                                {profileForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </form>
                    </div>

                    {/* Change Password */}
                    <div className="rounded-[20px] p-7" style={glassCard}>
                        <h2 className="font-cinzel text-base font-bold text-white mb-5">Ubah Kata Sandi</h2>
                        {status === 'password-updated' && (
                            <div className="mb-4 text-sm text-correct bg-correct-bg border border-correct/20 rounded-xl px-4 py-2.5">
                                Kata sandi berhasil diperbarui!
                            </div>
                        )}
                        <form onSubmit={submitPassword} className="space-y-4">
                            <div>
                                <label className={labelClass}>Kata Sandi Saat Ini</label>
                                <input type="password" value={passwordForm.data.current_password}
                                       onChange={e => passwordForm.setData('current_password', e.target.value)}
                                       className={inputClass} placeholder="••••••••" />
                                {passwordForm.errors.current_password && <p className="text-wrong text-xs mt-1">{passwordForm.errors.current_password}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Kata Sandi Baru</label>
                                <input type="password" value={passwordForm.data.password}
                                       onChange={e => passwordForm.setData('password', e.target.value)}
                                       className={inputClass} placeholder="Min. 8 karakter" />
                                {passwordForm.errors.password && <p className="text-wrong text-xs mt-1">{passwordForm.errors.password}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Konfirmasi Kata Sandi</label>
                                <input type="password" value={passwordForm.data.password_confirmation}
                                       onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                       className={inputClass} placeholder="Ulangi kata sandi baru" />
                            </div>
                            <button type="submit" disabled={passwordForm.processing}
                                    className="w-full py-3 text-white font-bold rounded-xl transition-all disabled:opacity-60 hover:opacity-90 text-sm"
                                    style={{ background: 'linear-gradient(135deg, #1f4fbf, #0d1f4d)', border: '1px solid rgba(201,164,92,0.3)' }}>
                                {passwordForm.processing ? 'Menyimpan...' : 'Ubah Kata Sandi'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="rounded-[20px] p-7" style={glassCard}>
                    <h2 className="font-cinzel text-base font-bold text-white mb-5">Menu Cepat</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: 'Beranda', href: route('dashboard'), icon: '🏠' },
                            { label: 'Materi', href: route('materi.index'), icon: '📚' },
                            { label: 'Game', href: route('game.index'), icon: '🗺️' },
                            { label: 'Pencapaian', href: route('pencapaian'), icon: '🏆' },
                        ].map(item => (
                            <Link key={item.label} href={item.href}
                                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-center hover:bg-white/10 transition-colors no-underline border border-white/8"
                                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                                <span className="text-2xl">{item.icon}</span>
                                <span className="text-white/70 text-xs font-semibold">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-[20px] p-7" style={{ ...glassCard, border: '1px solid rgba(208,85,58,0.2)' }}>
                    <h2 className="font-cinzel text-base font-bold text-wrong mb-2">Hapus Akun</h2>
                    <p className="text-white/40 text-sm mb-4">Setelah akun dihapus, semua data akan hilang permanen dan tidak dapat dipulihkan.</p>

                    {!showDeleteConfirm ? (
                        <button onClick={() => setShowDeleteConfirm(true)}
                                className="px-5 py-2.5 border border-wrong/40 text-wrong font-semibold rounded-xl hover:bg-wrong/10 transition-colors text-sm">
                            Hapus Akun Saya
                        </button>
                    ) : (
                        <form onSubmit={submitDelete} className="space-y-3">
                            <input type="password" value={deleteForm.data.password}
                                   onChange={e => deleteForm.setData('password', e.target.value)}
                                   className={inputClass} placeholder="Konfirmasi kata sandi" />
                            {deleteForm.errors.password && <p className="text-wrong text-xs">{deleteForm.errors.password}</p>}
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setShowDeleteConfirm(false)}
                                        className="px-5 py-2.5 border border-white/15 text-white/60 font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm">
                                    Batal
                                </button>
                                <button type="submit" disabled={deleteForm.processing}
                                        className="px-5 py-2.5 bg-wrong text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm disabled:opacity-50">
                                    {deleteForm.processing ? 'Menghapus...' : 'Ya, Hapus Akun'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
