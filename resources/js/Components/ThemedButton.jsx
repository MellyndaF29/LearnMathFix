export default function ThemedButton({
    variant = 'bronze', // 'bronze' | 'navy' | 'danger'
    className = '',
    disabled,
    processing = false,
    children,
    ...props
}) {
    const baseStyles = 'w-full py-4 text-sm font-bold rounded-xl transition-all disabled:opacity-60 active:translate-y-0';

    const variants = {
        bronze: 'text-navy-deep hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,164,92,0.4)]',
        navy: 'text-white hover:opacity-90',
        danger: 'text-white hover:opacity-90',
    };

    const backgrounds = {
        bronze: 'linear-gradient(135deg, #ecd39a 0%, #c9a45c 100%)',
        navy: 'linear-gradient(135deg, #1f4fbf, #0d1f4d)',
        danger: '#d0553a',
    };

    const borders = {
        bronze: 'none',
        navy: '1px solid rgba(201,164,92,0.3)',
        danger: 'none',
    };

    return (
        <button
            {...props}
            disabled={disabled || processing}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            style={{
                background: backgrounds[variant],
                border: borders[variant],
            }}
        >
            {processing ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-navy-deep/30 border-t-navy-deep rounded-full animate-spin" />
                    {children}
                </span>
            ) : children}
        </button>
    );
}
