import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, children }) {
    const { url, props } = usePage();
    const isAdmin = props.auth?.isAdmin ?? false;

    const navItems = [
        { name: 'Beranda',      href: route('dashboard'),     icon: '🏠', match: '/beranda' },
        { name: 'Materi',       href: route('materi.index'),  icon: '📚', match: '/materi' },
        { name: 'Game Jelajah', href: route('game.index'),    icon: '🗺️', match: '/game' },
        { name: 'Pencapaian',   href: route('pencapaian'),    icon: '🏆', match: '/pencapaian' },
        { name: 'Profil',       href: route('profile.edit'),  icon: '👤', match: '/profile' },
    ];

    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            {/* Top Header */}
            <header className="sticky top-0 z-50"
                    style={{
                        background: 'rgba(8,20,68,0.85)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(201,164,92,0.3)',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
                    }}>
                <div className="max-w-[1120px] mx-auto flex items-center justify-between px-5 py-3">
                    {/* Logo */}
                    <Link href="/beranda" className="flex items-center gap-2.5 no-underline group">
                        <img
                            src="/logo.png"
                            alt="LearnMath"
                            className="w-9 h-9 rounded-xl object-cover shadow-[0_0_14px_rgba(201,164,92,0.4)] group-hover:shadow-[0_0_20px_rgba(201,164,92,0.6)] transition-shadow"
                        />
                        <span className="hidden sm:inline font-cinzel font-bold text-xl text-bronze-light tracking-wide">
                            LearnMath
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = url.startsWith(item.match);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all no-underline ${
                                        isActive
                                            ? 'bg-gradient-to-r from-bronze-light to-bronze text-navy-deep shadow-[0_0_10px_rgba(236,211,154,0.3)]'
                                            : 'text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User area */}
                    <div className="flex items-center gap-3">
                        {isAdmin && (
                            <Link
                                href={route('admin.dashboard')}
                                className="hidden sm:inline-block text-xs font-bold px-3 py-1.5 rounded-lg no-underline transition-all"
                                style={{ background: 'rgba(201,164,92,0.12)', color: '#c9a45c', border: '1px solid rgba(201,164,92,0.3)' }}
                            >
                                🛡️ Admin
                            </Link>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-cinzel font-bold text-sm flex-shrink-0"
                                 style={{ background: 'linear-gradient(135deg, #f3dfaa, #c9a45c)', color: '#081436' }}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="hidden sm:inline text-white/50">
                                Halo, <span className="text-white font-bold">{user.name}</span>
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
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex"
                 style={{
                     background: 'rgba(8,20,68,0.95)',
                     backdropFilter: 'blur(20px)',
                     borderTop: '1px solid rgba(201,164,92,0.25)',
                 }}>
                {navItems.map((item) => {
                    const isActive = url.startsWith(item.match);
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
            <main className="flex-1 max-w-[1120px] w-full mx-auto px-5 py-6 pb-24 md:pb-8 relative z-10">
                {children}
            </main>
        </div>
    );
}
