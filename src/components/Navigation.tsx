'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="bg-gradient-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-3">Lowongan Magang Aktif</h1>
        <p className="text-white/90 mb-4">Data dari Magang Hub Kemnaker</p>
        <nav className="flex gap-3">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg transition ${
              pathname === '/'
                ? 'bg-white/20'
                : 'bg-white/10 hover:bg-white/15'
            }`}
          >
            Daftar Lowongan
          </Link>
          <Link
            href="/dashboard"
            className={`px-4 py-2 rounded-lg transition ${
              pathname === '/dashboard'
                ? 'bg-white/20'
                : 'bg-white/10 hover:bg-white/15'
            }`}
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
