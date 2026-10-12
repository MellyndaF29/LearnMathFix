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

const labels = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function EditGameQuestion({ question, stage, stages, topics }) {
    const initialOptions = Array.isArray(question.options)
        ? question.options
        : Object.values(question.options || {});

    const initialCorrectAnswer = Array.isArray(question.options)
        ? question.correct_answer
        : (question.options ? question.options[question.correct_answer] : question.correct_answer);

    const initialDifficulty = matchDifficulty(question.difficulty);

    function matchDifficulty(diff) {
        if (!diff) return 'Sedang';
        const d = String(diff).toLowerCase();
        if (d === 'mudah' || d === 'easy') return 'Mudah';
        if (d === 'sulit' || d === 'hard') return 'Sulit';
        return 'Sedang';
    }

    const { data, setData, put, processing, errors } = useForm({
        stage: stage || 1,
        question_text: question.question_text || '',
        options: initialOptions.length > 0 ? initialOptions : ['', '', '', ''],
        correct_answer: initialCorrectAnswer || question.correct_answer || '',
        explanation: question.explanation ?? '',
        difficulty: initialDifficulty,
        order: question.order ?? 0,
    });

    function setOption(index, value) {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    }

    function addOption() {
        if (data.options.length < labels.length) {
            setData('options', [...data.options, '']);
        }
    }

    function removeOption(index) {
        if (data.options.length <= 2) return;
        const removed = data.options[index];
        const newOptions = data.options.filter((_, i) => i !== index);
        setData('options', newOptions);
        if (data.correct_answer === removed || data.correct_answer === labels[index]) {
            setData('correct_answer', '');
        }
    }

    function submit(e) {
        e.preventDefault();
        put(route('admin.game.questions.update', question.id));
    }

    const inputClass = 'rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 w-full transition-all';

    return (
        <AdminLayout>
            <Head title={`Edit Soal Game — Stage ${stage}`} />

            <div className="mb-8">
                <Link
                    href={route('admin.game', { stage: data.stage })}
                    className="text-white/40 hover:text-white/70 text-sm no-underline transition-colors"
                >
                    ← Kembali ke Bank Soal Game
                </Link>
                <h1 className="font-cinzel text-2xl font-bold text-white mt-1 flex items-center gap-2">
                    <span>✏️</span> Edit Soal Game Penjelajahan
                </h1>
                <p className="text-white/50 text-sm mt-0.5">
                    Perbarui teks soal, opsi jawaban, atau kunci untuk game petualangan.
                </p>
            </div>

            <div
                className="rounded-[24px] p-6 sm:p-8 max-w-3xl"
                style={{
                    background: 'rgba(8,20,68,0.65)',
                    border: '1px solid rgba(201,164,92,0.25)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                <form onSubmit={submit} className="flex flex-col gap-6">
                    {/* Stage Selector */}
                    <FormField label="Stage / Peta Game *" error={errors.stage}>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                            {stages.map((stg) => {
                                const isSelected = Number(data.stage) === stg.stage;
                                return (
                                    <button
                                        type="button"
                                        key={stg.stage}
                                        onClick={() => setData('stage', stg.stage)}
                                        className="p-3 rounded-xl text-left border transition-all flex flex-col gap-1"
                                        style={{
                                            background: isSelected ? `${stg.color}25` : 'rgba(255,255,255,0.03)',
                                            borderColor: isSelected ? stg.color : 'rgba(255,255,255,0.08)',
                                            color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.6)',
                                        }}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <span>{stg.icon}</span>
                                            <span className="font-cinzel font-bold text-xs">Stage {stg.stage}</span>
                                        </div>
                                        <span className="text-[11px] truncate font-medium text-white/70">{stg.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </FormField>

                    {/* Question Text */}
                    <FormField label="Teks Pertanyaan Petualangan *" error={errors.question_text}>
                        <textarea
                            id="game-question-text"
                            rows={3}
                            value={data.question_text}
                            onChange={(e) => setData('question_text', e.target.value)}
                            className={inputClass}
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </FormField>

                    {/* Options */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold text-white/70">
                                Pilihan Jawaban (Pilih salah satu sebagai Kunci Jawaban) *
                            </label>
                            <span className="text-xs text-white/40">Minimal 2 pilihan</span>
                        </div>
                        {errors.options && <p className="text-xs text-red-400 mb-2">{errors.options}</p>}
                        {errors.correct_answer && <p className="text-xs text-red-400 mb-2">{errors.correct_answer}</p>}

                        <div className="flex flex-col gap-2.5">
                            {data.options.map((opt, index) => {
                                const label = labels[index] ?? String(index);
                                const isCorrect = (data.correct_answer === opt && opt.trim() !== '') || data.correct_answer === label;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 p-2 rounded-xl transition-all"
                                        style={{
                                            background: isCorrect ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.02)',
                                            border: isCorrect ? '1px solid rgba(52,211,153,0.35)' : '1px solid rgba(255,255,255,0.06)',
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setData('correct_answer', opt || label)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all"
                                            title="Tandai sebagai kunci jawaban benar"
                                            style={{
                                                background: isCorrect ? '#34d399' : 'rgba(255,255,255,0.08)',
                                                color: isCorrect ? '#081436' : 'rgba(255,255,255,0.6)',
                                            }}
                                        >
                                            {isCorrect ? '✓ ' + label : label}
                                        </button>
                                        <input
                                            type="text"
                                            placeholder={`Jawaban Pilihan ${label}`}
                                            value={opt}
                                            onChange={(e) => {
                                                const oldVal = opt;
                                                setOption(index, e.target.value);
                                                if (data.correct_answer === oldVal) {
                                                    setData('correct_answer', e.target.value);
                                                }
                                            }}
                                            className="flex-1 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 transition-all outline-none"
                                            style={inputStyle}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('correct_answer', opt || label)}
                                            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg flex-shrink-0 transition-all"
                                            style={{
                                                background: isCorrect ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)',
                                                color: isCorrect ? '#34d399' : 'rgba(255,255,255,0.4)',
                                                border: `1px solid ${isCorrect ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)'}`,
                                            }}
                                        >
                                            {isCorrect ? '✓ Kunci Benar' : 'Pilih Kunci'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeOption(index)}
                                            disabled={data.options.length <= 2}
                                            className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all disabled:opacity-20"
                                            style={{ background: 'rgba(255,50,50,0.1)', color: '#ff6060', border: '1px solid rgba(255,50,50,0.2)' }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {data.options.length < labels.length && (
                            <button
                                type="button"
                                onClick={addOption}
                                className="mt-2.5 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all"
                                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                            >
                                + Tambah Pilihan Jawaban
                            </button>
                        )}
                    </div>

                    {/* Explanation */}
                    <FormField label="Penjelasan Jawaban (opsional)" error={errors.explanation}>
                        <textarea
                            id="game-question-explanation"
                            rows={2}
                            placeholder="Penjelasan mengapa jawaban tersebut benar..."
                            value={data.explanation}
                            onChange={(e) => setData('explanation', e.target.value)}
                            className={inputClass}
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </FormField>

                    {/* Metadata: Difficulty & Order */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Tingkat Kesulitan *" error={errors.difficulty}>
                            <select
                                value={data.difficulty}
                                onChange={(e) => setData('difficulty', e.target.value)}
                                className={inputClass}
                                style={inputStyle}
                            >
                                <option value="Mudah">Mudah</option>
                                <option value="Sedang">Sedang</option>
                                <option value="Sulit">Sulit</option>
                            </select>
                        </FormField>

                        <FormField label="Urutan Nomor Soal" error={errors.order}>
                            <input
                                type="number"
                                min={0}
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                className={inputClass}
                                style={inputStyle}
                            />
                        </FormField>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-7 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)', color: '#081436' }}
                        >
                            {processing ? 'Menyimpan...' : 'Perbarui Soal Game'}
                        </button>
                        <Link
                            href={route('admin.game', { stage: data.stage })}
                            className="px-5 py-2.5 rounded-xl font-bold text-sm no-underline text-white/50 hover:text-white transition-colors"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
