import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ auth }) {
    return (
        <GuestLayout>
            <Head title="Selamat Datang — LearnMath" />

            <div className="rounded-[28px] overflow-hidden"
                 style={{
                     background: 'rgba(255,255,255,0.06)',
                     border: '1px solid rgba(255,255,255,0.14)',
                     backdropFilter: 'blur(32px)',
                     boxShadow: '0 30px 80px rgba(5,13,36,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
                 }}>

                {/* Top accent */}
                <div className="h-[3px] w-full"
                     style={{ background: 'linear-gradient(90deg, #c9a45c, #ecd39a 50%, #c9a45c)' }} />

                <div className="px-10 py-10 text-center">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <img src="/logo.png" alt="LearnMath"
                             className="w-16 h-16 rounded-2xl object-cover mb-3 shadow-[0_0_24px_rgba(201,164,92,0.5)]" />
                        <h1 className="font-cinzel text-2xl font-bold text-bronze-light tracking-wide">LearnMath</h1>
                    </div>

                    <h2 className="font-cinzel text-xl font-bold text-white mb-2">Selamat Datang!</h2>
                    <p className="text-white/60 text-sm mb-8 leading-relaxed">
                        Ayo mulai petualangan belajarmu bersama LearnMath!
                    </p>

                    <div className="flex flex-col gap-3">
                        {auth?.user ? (
                            <Link href={route('dashboard')}
                                  className="w-full text-center py-4 text-navy-deep font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,164,92,0.4)] no-underline text-sm"
                                  style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                                Masuk ke Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')}
                                      className="w-full text-center py-4 text-navy-deep font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,164,92,0.4)] no-underline text-sm"
                                      style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                                    Masuk
                                </Link>
                                <p className="text-white/55 text-sm mt-2">
                                    Belum punya akun?{' '}
                                    <Link href={route('register')}
                                          className="text-bronze-light font-semibold hover:text-bronze-light/80 no-underline transition-colors">
                                        Daftar sekarang
                                    </Link>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
