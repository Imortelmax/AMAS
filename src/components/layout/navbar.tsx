"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
    { href: "/", label: "Accueil" },
    { href: "/agenda", label: "Agenda" },
    { href: "/history", label: "Notre histoire" },
    { href: "/sorties", label: "Nos sorties" },
    { href: "/realisations", label: "Nos réalisations" },
    { href: "/moto", label: "Nos motos" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-amas-orange">
            {/* Header avec logos — desktop: logo + titre + blason, mobile: logo + burger + blason */}
            <div
                className={`container mx-auto flex items-center justify-between px-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-40 py-2 opacity-100'
                }`}
            >
                <img src="/logo.png" alt="AMAS Logo" className="h-16 md:h-25 w-auto" />

                {/* Titre visible seulement sur desktop */}
                <h1 className="hidden md:block text-4xl font-bold tracking-tight">
                    Amicale Moto Ancienne Salernoise
                </h1>

                {/* Burger visible seulement sur mobile, centré entre les logos */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                    {menuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                <img src="/blasonsalernes.webp" alt="Blason Salernes" className="h-14 md:h-20 w-auto" />
            </div>

            {/* Liens de navigation — desktop: barre horizontale, mobile: dropdown */}
            <div className="bg-navbar-bg">
                {/* Desktop */}
                <ul className='hidden md:flex justify-center p-4 space-x-10 text-2xl'>
                    {links.map((l) => (
                        <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                    ))}
                </ul>

                {/* Mobile dropdown */}
                <ul
                    className={`md:hidden flex flex-col text-xl overflow-hidden transition-all duration-300 ease-in-out ${
                        menuOpen ? 'max-h-96 py-2' : 'max-h-0'
                    }`}
                >
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className="block px-6 py-3 hover:bg-black/10 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
