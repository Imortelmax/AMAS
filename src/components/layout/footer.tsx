import Link from 'next/link';

export default function Footer() {
    return (
        <nav className="sticky w-full border-b bg-amas-orange">
            <ul className='flex justify-center p-4 space-x-30 text-2xl p-10'>
                <li className=''><Link href="/contact">Nous contacter</Link></li>
                <li className=''><Link href="/bureau">Le bureau</Link></li>
                <li className=''><Link href="/subscription">Nous rejoindre</Link></li>
            </ul>
        </nav>
    );
}