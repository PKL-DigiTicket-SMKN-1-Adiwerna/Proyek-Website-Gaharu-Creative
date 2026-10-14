"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#007A55]">Gaharu<span className="text-slate-800">Creative</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-[#007A55] transition">Beranda</Link>
          <Link href="/tentang" className="hover:text-[#007A55] transition">Tentang</Link>
          <Link href="/layanan" className="hover:text-[#007A55] transition">Layanan</Link>
          <Link href="/portofolio" className="hover:text-[#007A55] transition">Portofolio</Link>
          <Link href="/insight" className="hover:text-[#007A55] transition">Insight</Link>
          <Link href="/kontak" className="hover:text-[#007A55] transition">Kontak</Link>
        </nav>
        <Link href="/kontak" className="primary-btn text-sm">
          Hubungi Kami
        </Link>
      </div>
    </header>
  );
}