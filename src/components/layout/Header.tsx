"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/insight", label: "Insight" },
  { href: "/kontak", label: "Kontak" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header
        className="sticky top-0 z-50 bg-surface/80 backdrop-blur-sm border-b border-line"
        style={{ minHeight: "64px" }}
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4" />
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        isScrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-line shadow-sm"
          : "bg-surface/80 backdrop-blur-sm border-b border-line"
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-semibold text-xl text-brand focus-visible:outline-none"
            aria-label={`${site.name} - Beranda`}
          >
            <svg
              className="h-7 w-7 text-brand"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <rect width="32" height="32" rx="6" fill="currentColor" />
              <path
                d="M8 12h16M8 16h12M8 20h8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="hidden sm:block">{site.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink hover:text-brand transition-colors focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${site.waNumber}?text=Halo%20Gaharu%20Creative%2C%20saya%20ingin%20konsultasi%20gratis.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand-strong transition-colors focus-visible:outline-none"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.673m-5.421 7.403c-.756.275-1.296.422-1.637.438-.202.008-2.178-.13-2.493-.144C3.897 21.226 2.25 18.717 2.013 17.747c-.123-.502-.122-2.496 1.408-5.068 1.191-1.97 2.64-3.345 4.412-3.93.562-.184 1.53-.21 2.686-.131.886.058 1.712.372 2.311.94.6.568.947 1.335 1.074 2.118.08.498.08 2.312-.074 2.43-.099.08-.248.13-.57.13h-.025z" />
              </svg>
              Konsultasi Gratis
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-ink hover:bg-line focus-visible:outline-none"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        <nav
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          aria-label="Menu mobile"
        >
          <div className="py-4 space-y-2 border-t border-line">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-3 text-base font-medium text-ink hover:text-brand rounded-lg focus-visible:outline-none"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${site.waNumber}?text=Halo%20Gaharu%20Creative%2C%20saya%20ingin%20konsultasi%20gratis.`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-2 px-4 py-3 text-center text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand-strong transition-colors focus-visible:outline-none"
              onClick={() => setIsOpen(false)}
            >
              Konsultasi Gratis
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}