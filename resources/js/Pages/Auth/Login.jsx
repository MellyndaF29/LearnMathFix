import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    const inputClass = 'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-bronze/70 focus:bg-white/15 transition-all';

    return (
        <GuestLayout>
            <Head title="Masuk — LearnMath" />

            <div className="glass-dark-guest rounded-[28px] overflow-hidden">
                <div className="accent-bar" />

                <div className="px-10 py-10">
                    {/* Logo + Brand */}
                    <div className="flex flex-col items-center mb-10">
                        <Link href="/" className="flex flex-col items-center gap-3 no-underline group">
                            <img src="/logo.png" alt="LearnMath"
                                 className="w-16 h-16 rounded-2xl object-cover shadow-[0_0_24px_rgba(201,164,92,0.5)] group-hover:shadow-[0_0_32px_rgba(201,164,92,0.7)] transition-shadow" />
                            <h1 className="font-cinzel text-2xl font-bold text-bronze-light tracking-wide">
                                LearnMath
                            </h1>
                        </Link>
                        <p className="mt-2 text-contrast-subtle text-sm text-center">
                            Masuk untuk melanjutkan perjalananmu
                        </p>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div className="mb-6 text-sm text-correct bg-correct-bg border border-correct/20 rounded-xl px-4 py-3">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-contrast-muted text-xs font-semibold uppercase tracking-widest mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="username"
                                autoFocus
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                                className={inputClass}
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-wrong text-xs">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-contrast-muted text-xs font-semibold uppercase tracking-widest mb-2">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={`${inputClass} pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-sm select-none"
                                >
                                    {showPassword ? 'Sembunyikan' : 'Lihat'}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-wrong text-xs">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                        data.remember
                                            ? 'bg-bronze border-bronze'
                                            : 'bg-white/8 border-white/20 group-hover:border-white/40'
                                    }`}>
                                        {data.remember && (
                                            <span className="text-navy-deep text-[10px] font-bold leading-none">✓</span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-contrast-subtle text-sm group-hover:text-contrast-muted transition-colors">
                                    Ingat saya
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link href={route('password.request')}
                                      className="text-sm text-bronze-light/80 hover:text-bronze-light transition-colors no-underline font-semibold">
                                    Lupa kata sandi?
                                </Link>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 text-navy-deep font-bold rounded-xl transition-all disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,164,92,0.4)] active:translate-y-0 text-sm mt-2 bg-gradient-bronze"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="inline-block w-4 h-4 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin" />
                                    Masuk...
                                </span>
                            ) : 'Masuk'}
                        </button>
                    </form>

                    {/* Register link */}
                    <p className="mt-7 text-center text-contrast-subtle text-sm">
                        Belum punya akun?{' '}
                        <Link href={route('register')}
                              className="text-bronze-light/70 hover:text-bronze-light font-semibold transition-colors no-underline">
                            Daftar sekarang
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
