export default function GlassCard({
    children,
    className = '',
    variant = 'dark', // 'dark' | 'parchment'
    showAccent = true,
    ...props
}) {
    const baseStyles = 'rounded-[24px] overflow-hidden';

    const variants = {
        dark: {
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(5,13,36,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        },
        parchment: {
            background: 'var(--color-parch)',
            border: '1px solid var(--color-line)',
            backdropFilter: 'none',
            boxShadow: 'inset 0 0 40px rgba(201,164,92,0.05), 0 8px 30px rgba(5,13,36,0.5)',
        },
    };

    const guestVariant = {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(32px)',
        boxShadow: '0 30px 80px rgba(5,13,36,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
    };

    const style = {
        ...variants[variant],
        ...(className.includes('rounded-\\[28px\\]') ? guestVariant : {}),
    };

    return (
        <div
            {...props}
            className={`${baseStyles} ${className}`}
            style={style}
        >
            {showAccent && (
                <div
                    className="h-[3px] w-full"
                    style={{ background: 'linear-gradient(90deg, #c9a45c, #ecd39a 50%, #c9a45c)' }}
                />
            )}
            {children}
        </div>
    );
}
