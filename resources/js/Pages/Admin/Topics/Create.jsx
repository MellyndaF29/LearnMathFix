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

export default function CreateTopic() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: '',
        description: '',
        icon: '📚',
        color: '#8fb4ff',
        difficulty: 'Sedang',
        order: 0,
        is_published: false,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.topics.store'));
    }

    const inputClass = 'rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 w-full transition-all focus:ring-2 focus:ring-bronze/40';

    return (
        <AdminLayout>
            <Head title="Tambah Topik" />

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <Link href={route('admin.topics')} className="text-white/40 hover:text-white/70 transition-colors text-sm no-underline">← Kembali</Link>
                </div>
                <h1 className="font-cinzel text-2xl font-bold text-white">Tambah Topik Baru</h1>
            </div>

            <div
                className="rounded-[24px] p-6 sm:p-8 max-w-2xl"
                style={{
                    background: 'rgba(8,20,68,0.6)',
                    border: '1px solid rgba(201,164,92,0.2)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Judul Topik *" error={errors.title}>
                            <input
                                id="topic-title"
                                type="text"
                                placeholder="Contoh: Persamaan Linear"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className={inputClass}
                                style={inputStyle}
                            />
                        </FormField>

                        <FormField label="Kategori *" error={errors.category}>
                            <input
                                id="topic-category"
                                type="text"
                                placeholder="Contoh: Aljabar"
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className={inputClass}
                                style={inputStyle}
                            />
                        </FormField>
                    </div>

                    <FormField label="Deskripsi *" error={errors.description}>
                        <textarea
                            id="topic-description"
                            rows={3}
                            placeholder="Deskripsi singkat tentang topik ini..."
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                        />
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <FormField label="Ikon (emoji)" error={errors.icon}>
                            <input
                                id="topic-icon"
                                type="text"
                                placeholder="📚"
                                value={data.icon}
                                onChange={e => setData('icon', e.target.value)}
                                className={inputClass}
                                style={inputStyle}
                            />
                        </FormField>

                        <FormField label="Warna (hex)" error={errors.color}>
                            <input
                                id="topic-color"
                                type="text"
                                placeholder="#8fb4ff"
                                value={data.color}
                                onChange={e => setData('color', e.target.value)}
                                className={inputClass}
                                style={inputStyle}
                            />
                        </FormField>

                        <FormField label="Urutan" error={errors.order}>
                            <input
                                id="topic-order"
                                type="number"
                                min={0}
                                value={data.order}
                                onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                className={inputClass}
                                style={inputStyle}
                            />
                        </FormField>
                    </div>

                    <FormField label="Tingkat Kesulitan *" error={errors.difficulty}>
                        <select
                            id="topic-difficulty"
                            value={data.difficulty}
                            onChange={e => setData('difficulty', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                        >
                            <option value="Mudah">Mudah</option>
                            <option value="Sedang">Sedang</option>
                            <option value="Sulit">Sulit</option>
                        </select>
                    </FormField>

                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                            id="topic-published"
                            type="checkbox"
                            checked={data.is_published}
                            onChange={e => setData('is_published', e.target.checked)}
                            className="w-4 h-4 accent-yellow-400 rounded"
                        />
                        <span className="text-sm text-white/70">Langsung publikasikan topik ini</span>
                    </label>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            id="submit-create-topic"
                            type="submit"
                            disabled={processing}
                            className="px-7 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Topik'}
                        </button>
                        <Link
                            href={route('admin.topics')}
                            className="px-5 py-2.5 rounded-xl font-bold text-sm no-underline transition-all"
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
