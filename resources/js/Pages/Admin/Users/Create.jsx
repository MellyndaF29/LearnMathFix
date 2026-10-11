import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

function FormField({ label, error, children, hint }) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-white/80">{label}</label>
                {hint && <span className="text-xs text-white/40">{hint}</span>}
            </div>
            {children}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}

const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.14)',
    color: 'white',
    outline: 'none',
};

export default function CreateUser() {
    const [showPassword, setShowPassword] = useState(false);
    const [copied, setCopied] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        is_admin: false,
    });

    function generateRandomPassword() {
        const words = ['Math', 'Bintang', 'Pintar', 'Angka', 'Juara'];
        const word = words[Math.floor(Math.random() * words.length)];
        const num = Math.floor(1000 + Math.random() * 9000);
        const pass = `${word}${num}!`;
        setData('password', pass);
        setShowPassword(true);
    }

    function copyCredentials() {
        const text = `Halo ${data.name || 'Siswa'}! Akun LearnMath kamu sudah aktif:\n\nEmail: ${data.email || '-'}\nPassword: ${data.password || '-'}\nLogin di: ${window.location.origin}/login\n\nSelamat belajar dan berpetualang di LearnMath! 🚀`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }

    function submit(e) {
        e.preventDefault();
        post(route('admin.users.store'));
    }

    const inputClass = 'rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 w-full transition-all focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30';

    return (
        <AdminLayout>
            <Head title="Tambah Pengguna Baru — Admin" />

            <div className="mb-6 sm:mb-8">
                <Link href={route('admin.users')} className="text-white/40 hover:text-white/70 text-sm no-underline transition-colors flex items-center gap-1.5 mb-2">
                    <span>←</span> Kembali ke Daftar Pengguna
                </Link>
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">Tambah Pengguna Baru</h1>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                        Akun Pembeli
                    </span>
                </div>
                <p className="text-white/50 text-sm mt-1">
                    Buat akun langsung aktif untuk pembeli platform LearnMath. Akun tidak perlu verifikasi email dan bisa langsung login.
                </p>
            </div>

            <div
                className="rounded-[24px] p-6 sm:p-8 max-w-xl"
                style={{
                    background: 'rgba(8,20,68,0.65)',
                    border: '1px solid rgba(201,164,92,0.25)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(5,13,36,0.5)',
                }}
            >
                {/* Info Guide */}
                <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                    <span className="text-xl">💡</span>
                    <div className="text-xs text-amber-200/90 leading-relaxed">
                        Ketik nama dan email pembeli, lalu klik <strong>Acak Password</strong> untuk membuat sandi unik otomatis. Setelah akun dibuat, Anda bisa menyalin pesan format WhatsApp untuk langsung dikirim ke pembeli.
                    </div>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-5">
                    <FormField label="Nama Pembeli / Siswa *" error={errors.name}>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Contoh: Rian Pratama"
                            required
                        />
                    </FormField>

                    <FormField label="Email Pengguna *" error={errors.email} hint="Digunakan saat login">
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="nama@email.com"
                            required
                        />
                    </FormField>

                    <FormField label="Kata Sandi *" error={errors.password}>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className={`${inputClass} pr-14`}
                                    style={inputStyle}
                                    placeholder="Minimal 8 karakter"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(s => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white/80 transition-colors select-none"
                                >
                                    {showPassword ? 'Tutup' : 'Lihat'}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={generateRandomPassword}
                                className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 transition-all whitespace-nowrap flex items-center gap-1.5"
                                title="Buat password acak otomatis"
                            >
                                <span>🎲</span> Acak
                            </button>
                        </div>
                    </FormField>

                    {/* Quick copy template for WhatsApp */}
                    {(data.name || data.email || data.password) && (
                        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3">
                            <div className="text-xs text-white/60 truncate">
                                Format WhatsApp: {data.email || '...'} / {data.password ? '••••••••' : '...'}
                            </div>
                            <button
                                type="button"
                                onClick={copyCredentials}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all whitespace-nowrap flex items-center gap-1.5 flex-shrink-0"
                            >
                                <span>{copied ? '✅' : '📋'}</span>
                                {copied ? 'Tersalin!' : 'Salin Pesan WA'}
                            </button>
                        </div>
                    )}

                    {/* Admin role checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer py-1 select-none">
                        <input
                            type="checkbox"
                            checked={data.is_admin}
                            onChange={e => setData('is_admin', e.target.checked)}
                            className="w-4 h-4 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-400"
                        />
                        <div>
                            <span className="text-sm font-semibold text-white/80">Jadikan Akun Admin</span>
                            <p className="text-[11px] text-white/40">Beri hak akses penuh untuk mengelola topik, soal, dan pengguna.</p>
                        </div>
                    </label>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-7 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 shadow-lg flex items-center gap-2"
                            style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                        >
                            <span>💾</span>
                            {processing ? 'Menyimpan...' : 'Simpan & Aktifkan Akun'}
                        </button>
                        <Link
                            href={route('admin.users')}
                            className="px-5 py-3 rounded-xl font-bold text-sm no-underline hover:bg-white/10 transition-colors"
                            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
