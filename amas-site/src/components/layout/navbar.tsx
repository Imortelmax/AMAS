import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-amas-orange">
            <div className="container mx-auto flex h-30 items-center justify-between px-4">
                <img src="/logo.png" alt="AMAS Logo" className="h-25 w-auto" /> 
                <h1 className="text-4xl font-bold tracking-tight">Association Moto Ancienne Salernoise</h1>
                <img src="/blasonsalernes.webp" alt="Blason Salernes" className="h-20 w-auto" />
            </div>
            <div>
                <ul className='flex justify-center p-4 space-x-10 text-2xl bg-navbar-bg'>
                    <li className=''><Link href="/">Accueil</Link></li>
                    <li className=''><Link href="/agenda">Agenda</Link></li>
                    <li className=''><Link href="/history">Notre histoire</Link></li>
                    <li className=''><Link href="/sorties">Nos sorties</Link></li>
                    <li className=''><Link href="/realisations">Nos réalisations</Link></li>
                    <li className=''><Link href="/moto">Nos motos</Link></li>
                    <li className=''><Link href="/account">Mon Compte</Link></li>
                </ul>
            </div>
        </nav>
    );
}