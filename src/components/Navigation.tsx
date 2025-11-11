'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Briefcase, BarChart3 } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="bg-gradient-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div>
            <h1 className="text-2xl font-bold">Kemnaker Magang Hub</h1>
            <p className="text-blue-200 text-sm">Lowongan Magang Indonesia</p>
          </div>

          {/* Navigation & Links */}
          <div className="flex items-center gap-6">
            <nav className="flex gap-2">
              <Link
                href="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  pathname === '/'
                    ? 'bg-white/20 font-semibold'
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Lowongan</span>
              </Link>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  pathname === '/dashboard'
                    ? 'bg-white/20 font-semibold'
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </nav>

            {/* GitHub Link */}
            <a
              href="https://github.com/rayblaxe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
              title="View my GitHub profile"
            >
              <Github className="h-5 w-5" />
              <span className="hidden md:inline">rayblaxe</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
