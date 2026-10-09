import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    const inputClass = 'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-bronze/70 focus:bg-white/15 transition-all';

    return (
        <GuestLayout>
            <Head title="Lupa Kata Sandi — LearnMath" />

            <div className="glass-dark-guest rounded-[28px] overflow-hidden">
                <div className="accent-bar" />

                <div className="px-10 py-10">
                    {/* Logo + Brand */}
                    <div className="flex flex-col items-center mb-8">
                        <Link href="/" className="flex flex-col items-center gap-3 no-underline group">
                            <img src="/logo.png" alt="LearnMath"
                                 className="w-16 h-16 rounded-2xl object-cover shadow-[0_0_24px_rgba(201,164,92,0.5)] group-hover:shadow-[0_0_32px_rgba(201,164,92,0.7)] transition-shadow" />
                            <h1 className="font-cinzel text-2xl font-bold text-bronze-light tracking-wide">
                                LearnMath
                            </h1>
                        </Link>
                    </div>

                    <p className="text-contrast-medium text-sm text-center mb-8 leading-relaxed">
                        Lupa kata sandi? Tidak masalah. Masukkan email kamu dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
                    </p>

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
                                autoComplete="email"
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

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 text-navy-deep font-bold rounded-xl transition-all disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,164,92,0.4)] active:translate-y-0 text-sm mt-2 bg-gradient-bronze"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="inline-block w-4 h-4 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin" />
                                    Mengirim...
                                </span>
                            ) : 'Kirim Tautan Reset'}
                        </button>
                    </form>

                    {/* Back to login */}
                    <p className="mt-7 text-center text-contrast-subtle text-sm">
                        <Link href={route('login')}
                              className="text-bronze-light/70 hover:text-bronze-light font-semibold transition-colors no-underline">
                            ← Kembali ke Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
