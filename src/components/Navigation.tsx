'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Github, Briefcase, BarChart3 } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="bg-gradient-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Title */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image
                src="/icon1.png"
                alt="Kemnaker Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold leading-tight">Kemnaker Magang Hub</h1>
              <p className="text-blue-200 text-xs sm:text-sm">Lowongan Magang Indonesia</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold">Kemnaker</h1>
            </div>
          </Link>

          {/* Navigation & Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="flex gap-1 sm:gap-2">
              <Link
                href="/"
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition ${
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
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition ${
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
              className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
              title="View my GitHub profile"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden md:inline">rayblaxe</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
