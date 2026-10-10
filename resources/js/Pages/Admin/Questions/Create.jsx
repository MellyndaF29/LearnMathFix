import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

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

export default function CreateQuestion({ topic }) {
    const { data, setData, post, processing, errors } = useForm({
        question_text: '',
        options: ['', '', '', ''],
        correct_answer: '',
        explanation: '',
        type: 'multiple_choice',
        difficulty: 'Sedang',
        quiz_level: 1,
        order: 0,
    });

    function setOption(index, value) {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    }

    function addOption() {
        setData('options', [...data.options, '']);
    }

    function removeOption(index) {
        const newOptions = data.options.filter((_, i) => i !== index);
        setData('options', newOptions);
        if (data.correct_answer === data.options[index]) {
            setData('correct_answer', '');
        }
    }

    function submit(e) {
        e.preventDefault();
        post(route('admin.questions.store', topic.id));
    }

    const inputClass = 'rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 w-full transition-all';

    return (
        <AdminLayout>
            <Head title={`Tambah Soal — ${topic.title}`} />

            <div className="mb-8">
                <Link href={route('admin.questions', topic.id)} className="text-white/40 hover:text-white/70 text-sm no-underline transition-colors">← Kembali</Link>
                <h1 className="font-cinzel text-2xl font-bold text-white mt-1">
                    Tambah Soal — <span className="text-bronze-light">{topic.title}</span>
                </h1>
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
                    <FormField label="Pertanyaan *" error={errors.question_text}>
                        <textarea
                            id="question-text"
                            rows={3}
                            placeholder="Tulis soal di sini..."
                            value={data.question_text}
                            onChange={e => setData('question_text', e.target.value)}
                            className={inputClass}
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </FormField>

                    <div>
                        <label className="text-sm font-semibold text-white/70 block mb-2">Pilihan Jawaban *</label>
                        {errors.options && <p className="text-xs text-red-400 mb-2">{errors.options}</p>}
                        <div className="flex flex-col gap-2">
                            {data.options.map((opt, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        id={`option-${index}`}
                                        type="text"
                                        placeholder={`Pilihan ${index + 1}`}
                                        value={opt}
                                        onChange={e => setOption(index, e.target.value)}
                                        className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 transition-all"
                                        style={inputStyle}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        disabled={data.options.length <= 2}
                                        className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all disabled:opacity-30"
                                        style={{ background: 'rgba(255,50,50,0.1)', color: '#ff6060', border: '1px solid rgba(255,50,50,0.2)' }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            id="add-option-btn"
                            type="button"
                            onClick={addOption}
                            className="mt-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            + Tambah Pilihan
                        </button>
                    </div>

                    <FormField label="Jawaban Benar *" error={errors.correct_answer}>
                        <select
                            id="correct-answer"
                            value={data.correct_answer}
                            onChange={e => setData('correct_answer', e.target.value)}
                            className={inputClass}
                            style={inputStyle}
                        >
                            <option value="">-- Pilih Jawaban Benar --</option>
                            {data.options.filter(o => o.trim()).map((opt, index) => (
                                <option key={index} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField label="Penjelasan (opsional)" error={errors.explanation}>
                        <textarea
                            id="question-explanation"
                            rows={2}
                            placeholder="Penjelasan mengapa jawaban ini benar..."
                            value={data.explanation}
                            onChange={e => setData('explanation', e.target.value)}
                            className={inputClass}
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <FormField label="Tipe Soal *" error={errors.type}>
                            <select id="question-type" value={data.type} onChange={e => setData('type', e.target.value)} className={inputClass} style={inputStyle}>
                                <option value="multiple_choice">Pilihan Ganda</option>
                                <option value="true_false">Benar/Salah</option>
                            </select>
                        </FormField>

                        <FormField label="Tingkat Kesulitan *" error={errors.difficulty}>
                            <select id="question-difficulty" value={data.difficulty} onChange={e => setData('difficulty', e.target.value)} className={inputClass} style={inputStyle}>
                                <option value="Mudah">Mudah</option>
                                <option value="Sedang">Sedang</option>
                                <option value="Sulit">Sulit</option>
                            </select>
                        </FormField>

                        <FormField label="Level Kuis *" error={errors.quiz_level}>
                            <input
                                id="question-quiz-level"
                                type="number"
                                min={1}
                                max={3}
                                value={data.quiz_level}
                                onChange={e => setData('quiz_level', parseInt(e.target.value) || 1)}
                                className={inputClass}
                                style={inputStyle}
                            />
                        </FormField>

                        <FormField label="Urutan" error={errors.order}>
                            <input
                                id="question-order"
                                type="number"
                                min={0}
                                value={data.order}
                                onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                className={inputClass}
                                style={inputStyle}
                            />
                        </FormField>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            id="submit-create-question"
                            type="submit"
                            disabled={processing}
                            className="px-7 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Soal'}
                        </button>
                        <Link
                            href={route('admin.questions', topic.id)}
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
