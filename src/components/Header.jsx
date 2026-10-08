import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site.js";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/insight", label: "Insight" },
  { href: "/kontak", label: "Kontak" },
];

const waHref = `https://wa.me/${site.waNumber}?text=${encodeURIComponent(
  "Halo Gaharu Creative, saya ingin konsultasi gratis."
)}`;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape menutup menu, dan body tidak bisa di-scroll di belakang overlay.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-card/90 backdrop-blur-md ${
        isScrolled ? "border-border shadow-sm" : "border-border/60"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, beranda`}>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-action font-display text-sm font-bold text-on-action"
            >
              G
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-text">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent/10 hover:text-text"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-md bg-action px-4 py-2 text-sm font-semibold text-on-action transition-colors hover:bg-action-hover"
            >
              Konsultasi
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-text transition-colors hover:bg-accent/10 lg:hidden"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Panel menu mobile: bukan sekadar nav yang transparan, tapi sheet
          yang menutup layar dan bisa ditutup dengan Escape. */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            tabIndex={-1}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <nav
            id="menu-mobile"
            aria-label="Navigasi mobile"
            className="absolute inset-x-0 top-0 max-h-full overflow-y-auto border-b border-border bg-card px-5 pb-6 pt-2 shadow-xl"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-12 items-center border-b border-border/60 text-base font-medium text-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-5 flex min-h-12 items-center justify-center rounded-md bg-action px-5 text-base font-semibold text-on-action transition-colors hover:bg-action-hover"
            >
              Konsultasi gratis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
