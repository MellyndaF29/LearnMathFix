import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function GlassInput(
    { type = 'text', className = '', isFocused = false, showPasswordToggle = false, onTogglePassword, showPassword = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const inputClass = 'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-bronze/70 focus:bg-white/15 transition-all';

    return (
        <div className="relative">
            <input
                {...props}
                type={showPasswordToggle && showPassword ? 'text' : type}
                className={`${inputClass} ${showPasswordToggle ? 'pr-12' : ''} ${className}`}
                ref={localRef}
            />
            {showPasswordToggle && (
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-sm select-none"
                >
                    {showPassword ? 'Sembunyikan' : 'Lihat'}
                </button>
            )}
        </div>
    );
});
