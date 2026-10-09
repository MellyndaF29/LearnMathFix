import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const inputClass = 'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-bronze/70 focus:bg-white/15 transition-all';

    return (
        <GuestLayout>
            <Head title="Daftar — LearnMath" />

            <div className="rounded-[28px] overflow-hidden"
                 style={{
                     background: 'rgba(255,255,255,0.06)',
                     border: '1px solid rgba(255,255,255,0.14)',
                     backdropFilter: 'blur(32px)',
                     boxShadow: '0 30px 80px rgba(5,13,36,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
                 }}>

                <div className="h-[3px] w-full"
                     style={{ background: 'linear-gradient(90deg, #c9a45c, #ecd39a 50%, #c9a45c)' }} />

                <div className="px-10 py-8">
                    {/* Logo + Brand */}
                    <div className="flex flex-col items-center mb-8">
                        <Link href="/" className="flex flex-col items-center gap-2 no-underline group">
                            <img src="/logo.png" alt="LearnMath"
                                 className="w-14 h-14 rounded-2xl object-cover shadow-[0_0_20px_rgba(201,164,92,0.5)]" />
                            <h1 className="font-cinzel text-xl font-bold text-bronze-light tracking-wide">LearnMath</h1>
                        </Link>
                        <p className="mt-1.5 text-white/55 text-sm text-center">Buat akun untuk mulai belajar</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-white/75 text-xs font-semibold uppercase tracking-widest mb-2">
                                Nama Lengkap
                            </label>
                            <input id="name" type="text" autoComplete="name" autoFocus
                                   value={data.name} onChange={e => setData('name', e.target.value)}
                                   placeholder="Nama kamu" className={inputClass} required />
                            {errors.name && <p className="mt-1.5 text-wrong text-xs">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-white/75 text-xs font-semibold uppercase tracking-widest mb-2">
                                Email
                            </label>
                            <input id="email" type="email" autoComplete="username"
                                   value={data.email} onChange={e => setData('email', e.target.value)}
                                   placeholder="nama@email.com" className={inputClass} required />
                            {errors.email && <p className="mt-1.5 text-wrong text-xs">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-white/75 text-xs font-semibold uppercase tracking-widest mb-2">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <input id="password" type={showPassword ? 'text' : 'password'}
                                       autoComplete="new-password"
                                       value={data.password} onChange={e => setData('password', e.target.value)}
                                       placeholder="Min. 8 karakter" className={`${inputClass} pr-16`} required />
                                <button type="button" onClick={() => setShowPassword(p => !p)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 text-xs transition-colors">
                                    {showPassword ? 'Sembunyikan' : 'Lihat'}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1.5 text-wrong text-xs">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-white/75 text-xs font-semibold uppercase tracking-widest mb-2">
                                Konfirmasi Kata Sandi
                            </label>
                            <div className="relative">
                                <input id="password_confirmation" type={showConfirm ? 'text' : 'password'}
                                       autoComplete="new-password"
                                       value={data.password_confirmation}
                                       onChange={e => setData('password_confirmation', e.target.value)}
                                       placeholder="Ulangi kata sandi" className={`${inputClass} pr-16`} required />
                                <button type="button" onClick={() => setShowConfirm(p => !p)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 text-xs transition-colors">
                                    {showConfirm ? 'Sembunyikan' : 'Lihat'}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1.5 text-wrong text-xs">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={processing}
                                className="w-full py-4 text-navy-deep font-bold rounded-xl transition-all disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,164,92,0.4)] mt-2 text-sm"
                                style={{ background: 'linear-gradient(135deg, #ecd39a 0%, #c9a45c 100%)' }}>
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="inline-block w-4 h-4 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin" />
                                    Mendaftar...
                                </span>
                            ) : 'Daftar Sekarang'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-white/55 text-sm">
                        Sudah punya akun?{' '}
                        <Link href={route('login')}
                              className="text-bronze-light font-semibold hover:text-bronze-light/80 no-underline transition-colors">
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
