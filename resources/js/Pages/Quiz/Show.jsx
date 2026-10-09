import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, topic, questions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const question = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const { data, setData, post, processing } = useForm({ answers: {} });

    const selectedKey = data.answers[question?.id];
    const answeredCount = Object.keys(data.answers).length;

    const handleSelect = (questionId, key) => {
        setData('answers', { ...data.answers, [questionId]: key });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('quiz.submit', topic.slug));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Kuis: ${topic.title}`} />

            <div className="max-w-3xl mx-auto">
                {/* Back link */}
                <Link href={route('materi.show', topic.slug)}
                      className="text-sky/70 text-sm font-semibold hover:text-bronze-light flex items-center gap-1 mb-5 transition-colors">
                    ← Kembali ke Materi
                </Link>

                {/* Card */}
                <div className="rounded-[24px] overflow-hidden relative"
                     style={{
                         background: 'rgba(255,255,255,0.07)',
                         border: '1px solid rgba(255,255,255,0.15)',
                         backdropFilter: 'blur(24px)',
                         boxShadow: '0 20px 60px rgba(5,13,36,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
                     }}>

                    {/* Header */}
                    <div className="px-7 py-5 flex justify-between items-center"
                         style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                        <div>
                            <p className="text-xs text-bronze-light font-bold uppercase tracking-widest mb-0.5">Kuis</p>
                            <h2 className="font-cinzel text-lg font-bold text-white">{topic.title}</h2>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-full px-4 py-1.5 text-sm font-bold text-bronze-light">
                            {currentIndex + 1} / {questions.length}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1 bg-white/10">
                        <div className="h-full bg-gradient-to-r from-bronze-deep to-bronze-light transition-all duration-500"
                             style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
                    </div>

                    {questions.length > 0 ? (
                        <form onSubmit={submit}>
                            <div className="p-7 md:p-9">
                                {/* Question */}
                                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Pertanyaan {currentIndex + 1}</p>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-7 leading-relaxed">
                                    {question.questionText}
                                </h3>

                                {/* Options */}
                                <div className="space-y-3">
                                    {Object.entries(question.options).map(([key, value]) => {
                                        const isSelected = selectedKey === key;
                                        return (
                                            <label key={key}
                                                   className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                                                       isSelected
                                                           ? 'border-bronze bg-bronze/15 shadow-[0_0_0_1px_rgba(201,164,92,0.4)]'
                                                           : 'border-white/12 bg-white/5 hover:border-white/25 hover:bg-white/10'
                                                   }`}>
                                                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm transition-colors ${
                                                    isSelected ? 'border-bronze bg-bronze text-navy-deep' : 'border-white/30 text-white/50'
                                                }`}>
                                                    {key}
                                                </div>
                                                <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-bronze-light' : 'text-white/80'}`}>
                                                    {value}
                                                </span>
                                                <input type="radio" name={`q_${question.id}`} value={key}
                                                       checked={isSelected}
                                                       onChange={() => handleSelect(question.id, key)}
                                                       className="hidden" />
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Footer nav */}
                            <div className="px-7 pb-7 flex justify-between items-center gap-4"
                                 style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                                <button type="button"
                                        onClick={() => setCurrentIndex(p => Math.max(0, p - 1))}
                                        disabled={currentIndex === 0}
                                        className="text-white/50 font-semibold disabled:opacity-30 hover:text-white transition-colors text-sm">
                                    ← Sebelumnya
                                </button>

                                {/* Dot progress */}
                                <div className="flex gap-2">
                                    {questions.map((q, i) => (
                                        <button type="button" key={q.id}
                                                onClick={() => setCurrentIndex(i)}
                                                className={`rounded-full transition-all ${
                                                    i === currentIndex ? 'w-6 h-2.5 bg-bronze' :
                                                    data.answers[q.id] ? 'w-2.5 h-2.5 bg-correct' :
                                                    'w-2.5 h-2.5 bg-white/20'
                                                }`} />
                                    ))}
                                </div>

                                {!isLast ? (
                                    <button type="button"
                                            onClick={() => setCurrentIndex(p => Math.min(questions.length - 1, p + 1))}
                                            disabled={!selectedKey}
                                            className="px-5 py-2 text-navy-deep font-bold rounded-xl text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md"
                                            style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                                        Selanjutnya
                                    </button>
                                ) : (
                                    <button type="submit"
                                            disabled={processing || answeredCount < questions.length}
                                            className="px-5 py-2 text-navy-deep font-bold rounded-xl text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md"
                                            style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                                        {processing ? 'Memproses...' : answeredCount < questions.length ? `Jawab ${questions.length - answeredCount} lagi` : 'Selesai Kuis'}
                                    </button>
                                )}
                            </div>
                        </form>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-white/40 py-20">
                            Belum ada soal kuis untuk topik ini.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
