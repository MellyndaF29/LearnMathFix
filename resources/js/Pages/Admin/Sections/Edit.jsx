import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const quillModules = {
    toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['clean'],
    ],
};

const quillFormats = ['header', 'bold', 'italic', 'underline', 'list', 'blockquote', 'code-block'];

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

export default function EditSection({ topic, section }) {
    const { data, setData, put, processing, errors } = useForm({
        title: section.title,
        content: section.content,
        type: section.type,
        order: section.order ?? 0,
    });

    function submit(e) {
        e.preventDefault();
        put(route('admin.sections.update', [topic.id, section.id]));
    }

    const inputClass = 'rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 w-full transition-all';

    return (
        <AdminLayout>
            <Head title={`Edit Materi — ${section.title}`} />

            <div className="mb-8">
                <Link href={route('admin.sections', topic.id)} className="text-white/40 hover:text-white/70 text-sm no-underline transition-colors">← Kembali</Link>
                <h1 className="font-cinzel text-2xl font-bold text-white mt-1">Edit Materi</h1>
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
                        <FormField label="Judul Materi *" error={errors.title}>
                            <input id="section-title" type="text" value={data.title} onChange={e => setData('title', e.target.value)} className={inputClass} style={inputStyle} />
                        </FormField>
                        <FormField label="Urutan" error={errors.order}>
                            <input id="section-order" type="number" min={0} value={data.order} onChange={e => setData('order', parseInt(e.target.value) || 0)} className={inputClass} style={inputStyle} />
                        </FormField>
                    </div>

                    <FormField label="Tipe Materi *" error={errors.type}>
                        <select id="section-type" value={data.type} onChange={e => setData('type', e.target.value)} className={inputClass} style={inputStyle}>
                            <option value="text">Teks</option>
                            <option value="video">Video</option>
                            <option value="interactive">Interaktif</option>
                        </select>
                    </FormField>

                    <FormField label="Konten *" error={errors.content}>
                        <div id="section-content-editor" className="quill-wrapper">
                            <ReactQuill
                                theme="snow"
                                value={data.content}
                                onChange={value => setData('content', value)}
                                modules={quillModules}
                                formats={quillFormats}
                            />
                        </div>
                    </FormField>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            id="submit-edit-section"
                            type="submit"
                            disabled={processing}
                            className="px-7 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                        >
                            {processing ? 'Menyimpan...' : 'Perbarui Materi'}
                        </button>
                        <Link
                            href={route('admin.sections', topic.id)}
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
