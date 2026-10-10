import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, topic, sections, completedSections, passedLevels, availableLevels = [] }) {
    const [activeSectionId, setActiveSectionId] = useState(
        sections.length > 0 ? sections[0].id : null
    );
    const activeSection = sections.find(s => s.id === activeSectionId);
    const currentIndex = sections.findIndex(s => s.id === activeSectionId);
    const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
    const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
    const isSectionCompleted = completedSections.includes(activeSectionId);

    const { post, processing } = useForm();

    const markAsComplete = (e) => {
        e.preventDefault();
        post(route('materi.section.complete', { topic: topic.slug, section: activeSectionId }), {
            preserveScroll: true,
            onSuccess: () => {
                if (nextSection) setActiveSectionId(nextSection.id);
            }
        });
    };

    const totalCompleted = completedSections.length;
    const totalSections = sections.length;
    const overallProgress = totalSections > 0 ? (totalCompleted / totalSections) * 100 : 0;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={topic.title} />

            {/* Top bar */}
            <div className="flex items-center justify-between mb-5">
                <Link href={route('materi.index')}
                      className="text-sky/70 text-sm font-semibold hover:text-bronze-light flex items-center gap-1 transition-colors">
                    ← Kembali ke Materi
                </Link>
                <span className="text-xs text-white/40 font-semibold">{totalCompleted}/{totalSections} selesai</span>
            </div>

            <div className="flex flex-col md:flex-row gap-5 min-h-[70vh]">
                {/* Sidebar */}
                <div className="w-full md:w-72 lg:w-80 flex-shrink-0 rounded-[20px] flex flex-col overflow-hidden"
                     style={{
                         background: 'rgba(255,255,255,0.06)',
                         border: '1px solid rgba(255,255,255,0.12)',
                         backdropFilter: 'blur(20px)',
                         boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                     }}>
                    {/* Topic info */}
                    <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-3xl flex-shrink-0">{topic.icon}</div>
                            <div>
                                <h2 className="font-cinzel text-sm font-bold text-white leading-tight">{topic.title}</h2>
                                <p className="text-white/40 text-xs mt-0.5">{topic.description}</p>
                            </div>
                        </div>
                        {/* Progress */}
                        <div className="flex justify-between text-xs text-white/50 font-semibold mb-1.5">
                            <span>Progres</span>
                            <span>{Math.round(overallProgress)}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <div className="h-full transition-all duration-700 rounded-full"
                                 style={{
                                     width: `${overallProgress}%`,
                                     background: overallProgress >= 100 ? '#2f9461' : 'linear-gradient(90deg, #1f4fbf, #ecd39a)',
                                 }} />
                        </div>
                    </div>

                    {/* Section list */}
                    <div className="flex-1 overflow-y-auto py-2">
                        {sections.map((section, index) => {
                            const done = completedSections.includes(section.id);
                            const active = section.id === activeSectionId;
                            return (
                                <button key={section.id} onClick={() => setActiveSectionId(section.id)}
                                        className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-all border-l-4 ${
                                            active
                                                ? 'border-l-bronze bg-bronze/10'
                                                : 'border-l-transparent hover:bg-white/5 hover:border-l-white/20'
                                        }`}>
                                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                        done ? 'bg-correct text-white' :
                                        active ? 'bg-bronze text-navy-deep' :
                                        'bg-white/10 text-white/50'
                                    }`}>
                                        {done ? '✓' : index + 1}
                                    </div>
                                    <span className={`text-sm font-semibold leading-snug ${active ? 'text-bronze-light' : done ? 'text-white/70' : 'text-white/50'}`}>
                                        {section.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quiz CTA */}
                    <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        {overallProgress >= 100 ? (() => {
                            if (!availableLevels || availableLevels.length === 0) {
                                return <div className="text-center text-xs text-white/50 font-semibold p-2">Kuis belum tersedia untuk materi ini.</div>;
                            }

                            const nextLevel = passedLevels.includes(2) ? 3 : passedLevels.includes(1) ? 2 : 1;
                            if (passedLevels.includes(3)) {
                                return <div className="text-center text-sm font-bold text-correct p-2">Semua Kuis Selesai!</div>;
                            }

                            if (!availableLevels.includes(nextLevel)) {
                                return <div className="text-center text-xs text-white/50 font-semibold p-2">Kuis Level {nextLevel} belum tersedia.</div>;
                            }

                            return (
                                <Link href={route('quiz.show', topic.slug)}
                                      className="block w-full text-center py-3 text-white rounded-xl font-bold transition-all no-underline text-sm hover:opacity-90"
                                      style={{ background: 'linear-gradient(135deg, #1f4fbf, #0d1f4d)', border: '1px solid rgba(201,164,92,0.3)' }}>
                                    Mulai Kuis Level {nextLevel}
                                </Link>
                            );
                        })() : (
                            <div className="text-center text-xs text-white/50 font-semibold p-2">
                                Selesaikan semua materi untuk membuka kuis.
                            </div>
                        )}
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 rounded-[20px] flex flex-col overflow-hidden"
                     style={{
                         background: 'rgba(255,255,255,0.06)',
                         border: '1px solid rgba(255,255,255,0.12)',
                         backdropFilter: 'blur(20px)',
                         boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                     }}>
                    {activeSection ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                                <p className="text-bronze-light text-xs font-bold uppercase tracking-widest mb-2">
                                    Bagian {currentIndex + 1} dari {sections.length}
                                </p>
                                <h1 className="font-cinzel text-xl md:text-2xl font-bold text-white mb-5 pb-4"
                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    {activeSection.title}
                                </h1>

                                {/* Content rendered from HTML */}
                                <div className="prose-custom text-white/80 leading-relaxed"
                                     dangerouslySetInnerHTML={{ __html: activeSection.content }} />
                            </div>

                            {/* Bottom nav */}
                            <div className="px-6 py-4 flex items-center justify-between"
                                 style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
                                <button onClick={() => prevSection && setActiveSectionId(prevSection.id)}
                                        disabled={!prevSection}
                                        className="text-white/40 font-semibold disabled:opacity-30 hover:text-white transition-colors text-sm">
                                    ← Sebelumnya
                                </button>

                                {!isSectionCompleted ? (
                                    <form onSubmit={markAsComplete}>
                                        <button type="submit" disabled={processing}
                                                className="px-6 py-2.5 text-navy-deep font-bold rounded-xl text-sm transition-all disabled:opacity-60 hover:shadow-md"
                                                style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                                            {processing ? 'Menyimpan...' : 'Tandai Selesai'}
                                        </button>
                                    </form>
                                ) : (
                                    <button onClick={() => nextSection && setActiveSectionId(nextSection.id)}
                                            disabled={!nextSection}
                                            className="px-6 py-2.5 text-white font-bold rounded-xl text-sm transition-all disabled:opacity-40 hover:opacity-90"
                                            style={{ background: nextSection ? 'linear-gradient(135deg, #1f4fbf, #0d1f4d)' : '#2f9461' }}>
                                        {nextSection ? 'Lanjut' : 'Semua Selesai!'}
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-white/30 text-sm">
                            Pilih materi di samping untuk mulai belajar.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
