import { Link } from "react-router-dom";
import { Container } from "./ui.jsx";
import Logo from "./Logo.jsx";
import Wordmark from "./Wordmark.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 font-sans">
      <Container className="py-12 sm:py-16">
        {/* Layout 4 Kolom Utama */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Kolom 1: Logo, Deskripsi, dan Media Sosial */}
          <div className="space-y-6 lg:col-span-5">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <Wordmark className="h-7 w-auto" />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Gaharu Creative — Agensi Digital 360° yang menghadirkan strategi terintegrasi, transformasi digital, dan pertumbuhan bisnis terukur untuk enterprise, institusi, dan UMKM di seluruh Indonesia.
            </p>

            {/* Ikon Sosial Media (LinkedIn, Instagram, YouTube) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-900">Tautan Cepat</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/" className="transition-colors hover:text-slate-900">Beranda</Link>
              </li>
              <li>
                <Link to="/tentang" className="transition-colors hover:text-slate-900">Tentang Kami</Link>
              </li>
              <li>
                <Link to="/layanan" className="transition-colors hover:text-slate-900">Layanan</Link>
              </li>
              <li>
                <Link to="/portofolio" className="transition-colors hover:text-slate-900">Portofolio</Link>
              </li>
              <li>
                <Link to="/insight" className="transition-colors hover:text-slate-900">Insight / Artikel</Link>
              </li>
              <li>
                <Link to="/kontak" className="transition-colors hover:text-slate-900">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Utama */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-900">Layanan Utama</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>Branding & Creative Strategy</li>
              <li>Web & Custom Software</li>
              <li>Performance Marketing</li>
              <li>Social Media & Content</li>
              <li>SEO & Growth Analytics</li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-lg font-bold text-slate-900">Hubungi Kami</h3>
            <ul className="space-y-3.5 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                {/* Icon Map Pin */}
                <svg className="h-5 w-5 shrink-0 text-[#007A55] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Equity Tower Lt. 22, SCBD Jakarta Selatan, DKI Jakarta 12190</span>
              </li>
              <li className="flex items-center gap-3">
                {/* Icon Mail */}
                <svg className="h-5 w-5 shrink-0 text-[#007A55]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@gaharustudio.co" className="transition-colors hover:text-slate-900">
                  hello@gaharustudio.co
                </a>
              </li>
              <li className="flex items-center gap-3">
                {/* Icon Phone */}
                <svg className="h-5 w-5 shrink-0 text-[#007A55]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+62 896–0517–7985</span>
              </li>
              <li className="flex items-start gap-3">
                {/* Icon Clock */}
                <svg className="h-5 w-5 shrink-0 text-[#007A55] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Senin - Jumat: 09:00 - 18:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bagian Bawah: Copyright dan Tautan Legal */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© 2020–2026 Gaharu Creative. Semua hak dilindungi.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="cursor-pointer transition-colors hover:text-slate-800">Kebijakan Privasi</span>
            <span className="cursor-pointer transition-colors hover:text-slate-800">Syarat &amp; Ketentuan</span>
            <span className="cursor-pointer transition-colors hover:text-slate-800">Peta Situs</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}