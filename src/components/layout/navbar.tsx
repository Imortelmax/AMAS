"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-amas-orange">
            <div
                className={`container mx-auto flex items-center justify-between px-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-40 py-2 opacity-100'
                }`}
            >
                <img src="/logo.png" alt="AMAS Logo" className="h-25 w-auto" />
                <h1 className="text-4xl font-bold tracking-tight">Amicale Moto Ancienne Salernoise</h1>
                <img src="/blasonsalernes.webp" alt="Blason Salernes" className="h-20 w-auto" />
            </div>
            <div>
                <ul className='flex justify-center p-4 space-x-10 text-2xl bg-navbar-bg'>
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/agenda">Agenda</Link></li>
                    <li><Link href="/history">Notre histoire</Link></li>
                    <li><Link href="/sorties">Nos sorties</Link></li>
                    <li><Link href="/realisations">Nos réalisations</Link></li>
                    <li><Link href="/moto">Nos motos</Link></li>
                </ul>
            </div>
        </nav>
    );
}
