import { Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white mt-12 border-t-4 border-primary-600">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">Kemnaker Magang Hub</h3>
            <p className="text-blue-200 text-sm">
              Platform pencarian lowongan magang dari Kementerian Ketenagakerjaan Republik Indonesia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Tautan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://maganghub.kemnaker.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white flex items-center gap-2 transition"
                >
                  <ExternalLink className="h-4 w-4" />
                  Magang Hub Official
                </a>
              </li>
              <li>
                <a
                  href="https://www.kemnaker.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white flex items-center gap-2 transition"
                >
                  <ExternalLink className="h-4 w-4" />
                  Kemnaker Official
                </a>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="font-bold text-lg mb-3">Developer</h3>
            <a
              href="https://github.com/rayblaxe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-800 hover:bg-primary-700 rounded-lg transition"
            >
              <Github className="h-5 w-5" />
              <span>@rayblaxe</span>
            </a>
            <p className="text-blue-200 text-sm mt-3">
              Built with Next.js & shadcn/ui
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-800 mt-8 pt-6 text-center text-sm text-blue-200">
          <p>&copy; 2025 Kemnaker Magang Hub. Data dari Magang Hub Kementerian Ketenagakerjaan RI</p>
        </div>
      </div>
    </footer>
  );
}
