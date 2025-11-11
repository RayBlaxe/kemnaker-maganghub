import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MagangHub Finder - Lowongan Magang Lengkap untuk Fresh Graduate",
  description: "Portal lowongan maganghub dari Wong Bekasi untuk Magang Hub KEMNAKER dengan filter peluang dan analisis lengkap",
  keywords: ["magang", "lowongan", "kemnaker", "internship", "indonesia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
