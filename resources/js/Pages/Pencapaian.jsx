import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const glass = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(5,13,36,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
};

export default function Pencapaian({ auth, achievements, totalStars, totalXp, userName, userLevel }) {
    const levelTitle = userLevel >= 10 ? 'Ahli Matematika' :
                       userLevel >= 7  ? 'Penyihir Angka' :
                       userLevel >= 5  ? 'Petualang Matematika' :
                       userLevel >= 3  ? 'Pelajar Matematika' : 'Pemula';

    const unlockedCount = achievements.filter(a => a.isUnlocked).length;
    const xp = totalXp ?? 0;

    // Each level spans 50 XP. Level 1 = 0-49, Level 2 = 50-99, etc.
    const currentLevelFloor = (userLevel - 1) * 50;
    const xpIntoLevel = xp - currentLevelFloor;   // how far into current level
    const progressPct = Math.min(100, Math.max(0, (xpIntoLevel / 50) * 100));
    const initial = userName?.charAt(0)?.toUpperCase() || 'U';

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Pencapaian" />

            {/* Hero / User card */}
            <div className="relative overflow-hidden rounded-[24px] p-7 mb-7" style={{
                ...glass,
                background: 'linear-gradient(135deg, rgba(31,79,191,0.35) 0%, rgba(8,20,68,0.7) 100%)',
            }}>
                <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full pointer-events-none opacity-20"
                     style={{ background: 'radial-gradient(circle, #ecd39a, transparent 70%)' }} />

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-cinzel text-3xl font-bold text-navy-deep"
                             style={{ background: 'linear-gradient(135deg, #ecd39a, #c9a45c)' }}>
                            {initial}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-navy-deep border border-bronze/40 text-bronze-light text-[10px] font-bold w-8 h-8 rounded-full flex items-center justify-center">
                            L{userLevel}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="font-cinzel text-xl font-bold text-white mb-0.5">{userName}</h1>
                        <p className="text-bronze-light/80 text-sm font-semibold mb-4">Level {userLevel} — {levelTitle}</p>

                        {/* XP Bar */}
                        <div className="max-w-xs">
                            <div className="flex justify-between text-xs text-white/40 font-semibold mb-1.5">
                                <span>XP ke Level {userLevel + 1}</span>
                                <span>{Math.min(xpIntoLevel, 50)} / 50</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-1000"
                                     style={{
                                         width: `${progressPct}%`,
                                         background: 'linear-gradient(90deg, #1f4fbf, #ecd39a)',
                                     }} />
                            </div>
                            <div className="text-right text-[10px] text-white/25 mt-1">Total XP: {xp}</div>
                        </div>
                    </div>

                    {/* Stars stat */}
                    <div className="text-center px-6 py-4 rounded-2xl" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(201,164,92,0.2)' }}>
                        <div className="font-cinzel text-4xl font-bold text-bronze-light mb-0.5">{totalStars}</div>
                        <div className="text-xs text-white/40 font-semibold uppercase tracking-widest">Bintang</div>
                    </div>
                </div>
            </div>

            {/* Section title */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-cinzel text-base font-bold text-white">Pencapaian</h2>
                <span className="text-white/40 text-xs font-semibold">{unlockedCount} / {achievements.length} terbuka</span>
            </div>

            {/* Achievements grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {achievements.map(a => (
                    <div key={a.id}
                         className={`rounded-[18px] p-5 text-center transition-all duration-300 relative overflow-hidden group ${
                             a.isUnlocked ? 'hover:-translate-y-1' : 'opacity-50'
                         }`}
                         style={{
                             ...glass,
                             border: a.isUnlocked
                                 ? `1px solid ${a.badgeColor}40`
                                 : '1px solid rgba(255,255,255,0.06)',
                             boxShadow: a.isUnlocked
                                 ? `0 8px 32px ${a.badgeColor}15, inset 0 1px 0 rgba(255,255,255,0.08)`
                                 : glass.boxShadow,
                         }}>

                        {/* Glow on hover for unlocked */}
                        {a.isUnlocked && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[18px]"
                                 style={{ background: `radial-gradient(circle at 50% 0%, ${a.badgeColor}20, transparent 70%)` }} />
                        )}

                        {/* Icon */}
                        <div className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-3xl mb-3 relative z-10"
                             style={{
                                 background: a.isUnlocked ? `${a.badgeColor}25` : 'rgba(255,255,255,0.05)',
                                 border: `1px solid ${a.isUnlocked ? a.badgeColor + '40' : 'rgba(255,255,255,0.08)'}`,
                             }}>
                            {a.isUnlocked ? a.icon : '🔒'}
                        </div>

                        <h3 className={`font-cinzel font-bold text-sm mb-1.5 relative z-10 ${a.isUnlocked ? 'text-white' : 'text-white/30'}`}>
                            {a.title}
                        </h3>
                        <p className={`text-xs leading-relaxed relative z-10 ${a.isUnlocked ? 'text-white/55' : 'text-white/20'}`}>
                            {a.description}
                        </p>

                        {a.isUnlocked && a.unlockedAt && (
                            <div className="text-[10px] font-bold uppercase mt-3 relative z-10"
                                 style={{ color: a.badgeColor }}>
                                {new Date(a.unlockedAt).toLocaleDateString('id-ID')}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
