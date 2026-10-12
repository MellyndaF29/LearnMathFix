import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function BeliAkun({ auth }) {
    return (
        <GuestLayout>
            <Head title="Dapatkan Akses — LearnMath" />

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

                <div className="px-5 py-7 sm:px-10 sm:py-10">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-6 sm:mb-8">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 no-underline">
                            <img src="/logo.png" alt="LearnMath"
                                 className="w-14 h-14 rounded-2xl object-cover shadow-[0_0_24px_rgba(201,164,92,0.5)]" />
                            <h1 className="font-cinzel text-2xl font-bold text-bronze-light tracking-wide">LearnMath</h1>
                        </Link>
                    </div>

                    <h2 className="font-cinzel text-xl font-bold text-white text-center mb-2">
                        Cara Mendapatkan Akses
                    </h2>
                    <p className="text-white/50 text-sm text-center mb-8 leading-relaxed">
                        Akses platform LearnMath diberikan langsung oleh admin/owner.<br />
                        Ikuti langkah di bawah untuk mendapatkan akun kamu.
                    </p>

                    {/* Steps */}
                    <div className="space-y-4 mb-8">
                        {[
                            {
                                step: '01',
                                icon: '💬',
                                title: 'Hubungi Admin',
                                desc: 'Kirim pesan ke admin melalui WhatsApp, Instagram, atau kontak yang tersedia.',
                            },
                            {
                                step: '02',
                                icon: '💳',
                                title: 'Lakukan Pembayaran',
                                desc: 'Selesaikan proses pembayaran sesuai paket yang dipilih untuk mendapatkan akses.',
                            },
                            {
                                step: '03',
                                icon: '🔑',
                                title: 'Terima Akun Kamu',
                                desc: 'Admin akan mengirimkan username dan password yang bisa langsung digunakan untuk login.',
                            },
                        ].map(({ step, icon, title, desc }) => (
                            <div key={step} className="flex items-start gap-4 p-4 rounded-2xl"
                                 style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                     style={{ background: 'rgba(201,164,92,0.15)', border: '1px solid rgba(201,164,92,0.3)' }}>
                                    {icon}
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-bronze/70 uppercase tracking-widest mb-0.5">Langkah {step}</div>
                                    <div className="text-sm font-bold text-white mb-0.5">{title}</div>
                                    <div className="text-xs text-white/50 leading-relaxed">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact buttons */}
                    <div className="space-y-3 mb-6">
                        <p className="text-xs text-white/40 text-center font-semibold uppercase tracking-widest mb-3">
                            Hubungi Admin Sekarang
                        </p>
                        <a href="https://wa.me/6282338487551"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 no-underline shadow-lg"
                           style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff' }}>
                            <span className="text-lg">📱</span>
                            <div className="flex flex-col items-center leading-tight">
                                <span>Hubungi via WhatsApp</span>
                                <span className="text-[11px] font-normal opacity-90">+62 823-3848-7551</span>
                            </div>
                        </a>
                        <a href="mailto:mellyndafrdti04@gmail.com"
                           className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 no-underline"
                           style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.12)' }}>
                            <span className="text-lg">✉️</span>
                            <div className="flex flex-col items-center leading-tight">
                                <span>Kirim Email</span>
                                <span className="text-[11px] font-normal text-white/50">mellyndafrdti04@gmail.com</span>
                            </div>
                        </a>
                    </div>

                    <div className="text-center text-xs text-white/30 pt-4"
                         style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {auth?.user ? (
                            <>
                                Sudah login sebagai <strong className="text-white/70">{auth.user.name}</strong>.{' '}
                                <Link href={route('dashboard')} className="text-bronze-light font-semibold hover:text-bronze-light/80 no-underline transition-colors ml-1">
                                    Ke Beranda →
                                </Link>
                            </>
                        ) : (
                            <>
                                Sudah punya akun?{' '}
                                <Link href={route('login')} className="text-bronze-light/70 hover:text-bronze-light font-semibold no-underline transition-colors">
                                    Masuk di sini
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
