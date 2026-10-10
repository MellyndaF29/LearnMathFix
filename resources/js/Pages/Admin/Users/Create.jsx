import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

function FormField({ label, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white/70">{label}</label>
            {children}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}

const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'white',
    outline: 'none',
};

export default function CreateUser() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.users.store'));
    }

    const inputClass = 'rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 w-full transition-all';

    return (
        <AdminLayout>
            <Head title="Tambah Pengguna" />

            <div className="mb-8">
                <Link href={route('admin.users')} className="text-white/40 hover:text-white/70 text-sm no-underline transition-colors">← Kembali</Link>
                <h1 className="font-cinzel text-2xl font-bold text-white mt-1">Tambah Pengguna</h1>
            </div>

            <div
                className="rounded-[24px] p-6 sm:p-8 max-w-xl"
                style={{
                    background: 'rgba(8,20,68,0.6)',
                    border: '1px solid rgba(201,164,92,0.2)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                <form onSubmit={submit} className="flex flex-col gap-5">
                    <FormField label="Nama *" error={errors.name}>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Nama Lengkap"
                        />
                    </FormField>

                    <FormField label="Email *" error={errors.email}>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="email@example.com"
                        />
                    </FormField>

                    <FormField label="Kata Sandi *" error={errors.password}>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                            placeholder="••••••••"
                        />
                    </FormField>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-7 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Pengguna'}
                        </button>
                        <Link
                            href={route('admin.users')}
                            className="px-5 py-2.5 rounded-xl font-bold text-sm no-underline"
                            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
