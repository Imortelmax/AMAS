import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-orange-900">
            <div className="container mx-auto flex h-30 items-center justify-between px-4">
                {/* Logo */}
                <img src="/logo.png" alt="AMAS Logo" className="h-25 w-auto" />
                <h1 className="text-xl font-bold tracking-tight">Association Moto Ancienne Salernoise</h1>
                <img src="/blasonsalernes.webp" alt="Blason Salernes" className="h-20 w-auto" />
            </div>
        </nav>
    );
}