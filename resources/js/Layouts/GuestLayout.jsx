import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center py-6 sm:py-12 px-4">

            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20"
                     style={{ background: 'radial-gradient(circle, #1f4fbf, transparent 70%)' }} />
                <div className="absolute bottom-[-15%] right-[-5%] w-[450px] h-[450px] rounded-full opacity-15"
                     style={{ background: 'radial-gradient(circle, #c9a45c, transparent 70%)' }} />
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md my-auto">
                {children}
            </div>
        </div>
    );
}
