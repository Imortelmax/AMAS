import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-amas-orange">
            <div className="container mx-auto flex h-30 items-center justify-between px-4">
                <img src="/logo.png" alt="AMAS Logo" className="h-25 w-auto" /> 
                <h1 className="text-2xl font-bold tracking-tight">Association Moto Ancienne Salernoise</h1>
                <img src="/blasonsalernes.webp" alt="Blason Salernes" className="h-20 w-auto" />
            </div>
            <div>
                <ul className='flex justify-center space-x-6 text-xl bg-amber-900'>
                    <li className='p-2'><Link href="/">Acceuil</Link></li>
                    <li className='p-2'><Link href="/agenda">Agenda</Link></li>
                    <li className='p-2'><Link href="/history">Notre histoire</Link></li>
                    <li className='p-2'><Link href="/event">Nos sorties</Link></li>
                    <li className='p-2'><Link href="/realisations">Nos réalisations</Link></li>
                    <li className='p-2'><Link href="/moto">Nos motos</Link></li>
                </ul>
            </div>
        </nav>
    );
}