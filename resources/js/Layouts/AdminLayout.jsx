import { Link, usePage } from '@inertiajs/react';

const adminNavItems = [
    { name: 'Dashboard',    href: route('admin.dashboard'), icon: '📊', match: '/admin', exact: true },
    { name: 'Pengguna',     href: route('admin.users'),     icon: '👥', match: '/admin/users' },
    { name: 'Topik',        href: route('admin.topics'),    icon: '📚', match: '/admin/topics' },
    { name: 'Kuis 3 Tahap', href: route('admin.quiz'),      icon: '📝', match: '/admin/kuis' },
    { name: 'Game Jelajah', href: route('admin.game'),      icon: '🗺️', match: '/admin/game' },
];

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const user = props.auth.user;

    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #050d24 0%, #081436 60%, #0a1a45 100%)' }}>
            {/* Header */}
            <header
                className="sticky top-0 z-50"
                style={{
                    background: 'rgba(5,13,36,0.9)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(201,164,92,0.35)',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                }}
            >
                <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5 py-3">
                    {/* Logo + badge */}
                    <div className="flex items-center gap-3">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-2.5 no-underline group">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center font-cinzel font-bold text-sm shadow-[0_0_14px_rgba(201,164,92,0.4)] group-hover:shadow-[0_0_22px_rgba(201,164,92,0.6)] transition-shadow"
                                style={{ background: 'linear-gradient(135deg, #f3dfaa, #c9a45c)', color: '#081436' }}
                            >
                                A
                            </div>
                            <span className="hidden sm:inline font-cinzel font-bold text-xl text-bronze-light tracking-wide">
                                Admin Panel
                            </span>
                        </Link>
                        <span
                            className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(201,164,92,0.15)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.3)' }}
                        >
                            LearnMath
                        </span>
                    </div>

                    {/* Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {adminNavItems.map((item) => {
                            const isActive = item.exact ? url === item.match || url === item.match + '/' : url.startsWith(item.match);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all no-underline flex items-center gap-2 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-bronze-light to-bronze text-navy-deep shadow-[0_0_10px_rgba(236,211,154,0.3)]'
                                            : 'text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User & actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('dashboard')}
                            className="hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-lg transition-all no-underline"
                            style={{ background: 'rgba(143,180,255,0.1)', color: 'rgba(143,180,255,0.8)', border: '1px solid rgba(143,180,255,0.2)' }}
                        >
                            ← Kembali ke App
                        </Link>
                        <div className="flex items-center gap-2 text-sm">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center font-cinzel font-bold text-sm flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #f3dfaa, #c9a45c)', color: '#081436' }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="hidden sm:inline text-white/50 text-xs">
                                <span className="text-white font-bold">{user.name}</span>
                            </span>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="border border-white/15 text-white/50 text-sm font-semibold py-1.5 px-3 rounded-lg hover:bg-white/8 hover:text-white/80 transition-colors"
                        >
                            Keluar
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Nav */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex"
                style={{
                    background: 'rgba(5,13,36,0.97)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(201,164,92,0.25)',
                }}
            >
                {adminNavItems.map((item) => {
                    const isActive = item.exact ? url === item.match || url === item.match + '/' : url.startsWith(item.match);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-bold transition-colors no-underline ${
                                isActive ? 'text-bronze-light' : 'text-white/30 hover:text-white/60'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-[10px]">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-[1200px] w-full mx-auto px-5 py-6 pb-24 md:pb-8 relative z-10">
                {children}
            </main>
        </div>
    );
}
