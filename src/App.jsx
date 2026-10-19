import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { initScrollReveal } from "./lib/reveal.js";
import { initParallax } from "./lib/parallax.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CtaBanner from "./components/CtaBanner.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import Diagnosa from "./components/Diagnosa.jsx";
/* Halaman rute lain dimuat terpisah (code splitting) supaya bundel awal kecil.
 * Beranda sengaja tetap dimuat langsung: isinya yang paling besar dan paling
 * sering dibuka, dan kalau dimuat menyusul, isi halaman mendorong footer turun
 * sehingga skor pergeseran tata letak (CLS) jeblok. Komponen kerangka (Header,
 * Footer, band CTA, tombol WhatsApp) juga selalu dimuat langsung. */
import HomePage from "./pages/HomePage.jsx";
const TentangPage = lazy(() => import("./pages/TentangPage.jsx"));
const LayananPage = lazy(() => import("./pages/LayananPage.jsx"));
const LayananDetailPage = lazy(() => import("./pages/LayananDetailPage.jsx"));
const PortofolioPage = lazy(() => import("./pages/PortofolioPage.jsx"));
const PortofolioUmkmPage = lazy(() => import("./pages/PortofolioUmkmPage.jsx"));
const PortofolioKorporatPage = lazy(() => import("./pages/PortofolioKorporatPage.jsx"));
const PortofolioPemerintahPage = lazy(() => import("./pages/PortofolioPemerintahPage.jsx"));
const InsightPage = lazy(() => import("./pages/InsightPage.jsx"));
const InsightDetailPage = lazy(() => import("./pages/InsightDetailPage.jsx"));
const KontakPage = lazy(() => import("./pages/KontakPage.jsx"));
const KebijakanPrivasiPage = lazy(() => import("./pages/KebijakanPrivasiPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

export const ctaByPath = {
  "/": "beranda",
  "/layanan": "layanan",
  "/portofolio": "portofolio",
  "/tentang": "tentang",
  "/insight": "insight",
  "/kontak": "kontak",
};

export const footerVariantByPath = {
  "/portofolio": "lengkap",
  "/kontak": "lengkap",
};

function useCtaForPath(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean.startsWith("/layanan")) {
    /* Halaman detail layanan menutup dirinya dengan band CTA khusus layanan
     * (service.cta), jadi band umum tidak dipasang di sana supaya tidak dobel. */
    return clean === "/layanan" ? ctaByPath["/layanan"] : null;
  }
  if (clean.startsWith("/portofolio")) return ctaByPath["/portofolio"];
  if (clean.startsWith("/insight")) return ctaByPath["/insight"];
  return ctaByPath[clean] || null;
}

export default function App() {
  const { pathname, hash } = useLocation();
  const ctaPage = useCtaForPath(pathname);
  const footerVariant = footerVariantByPath[pathname] || "ringkas";

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  /* Animasi reveal & parallax dipasang sebelum cat pertama supaya konten tidak
   * sempat berkedip tampil lalu tersembunyi lagi. Dijalankan ulang tiap pindah
   * rute karena isi halaman berganti. */
  useLayoutEffect(() => {
    const stopReveal = initScrollReveal(
      document.querySelectorAll("[data-reveal-root]")
    );
    const stopParallax = initParallax(
      document.querySelectorAll("[data-parallax]")
    );
    return () => {
      stopReveal();
      stopParallax();
    };
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      {/* Tautan lompat untuk pengguna keyboard (DESAIN.md bagian 8). */}
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-button focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lewati ke konten
      </a>
      <Header />
      <main id="konten" data-reveal-root className="flex-1">
        <div key={pathname} className="page-enter">
          {/* Isi rute dimuat terpisah, jadi dibungkus Suspense. Ruang cadangan
              setinggi layar dipakai sebagai penahan: tanpa itu, footer yang
              sudah tampil terdorong turun saat isi halaman masuk, dan skor
              pergeseran tata letak (CLS) langsung jeblok. Kosong dan tanpa
              teks supaya tidak ada tulisan berkedip saat pindah halaman. */}
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tentang" element={<TentangPage />} />
            
            {/* Rute Utama & Detail Layanan */}
            <Route path="/layanan" element={<LayananPage />} />
            <Route path="/layanan/:slug" element={<LayananDetailPage />} />

            {/* Rute Portofolio */}
            <Route path="/portofolio" element={<PortofolioPage />} />
            <Route path="/portofolio/umkm-ecommerce-lokal" element={<PortofolioUmkmPage />} />
            <Route path="/portofolio/korporat-gaharu-cloud" element={<PortofolioKorporatPage />} />
            <Route path="/portofolio/pemerintah-literasi-digital" element={<PortofolioPemerintahPage />} />

            {/* Rute Insight */}
            <Route path="/insight" element={<InsightPage />} />
            <Route path="/insight/:slug" element={<InsightDetailPage />} />

            <Route path="/kontak" element={<KontakPage />} />
            <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
        </div>
      </main>
      <div data-reveal-root>
        {ctaPage ? <CtaBanner key={ctaPage} page={ctaPage} /> : null}
        <Footer variant={footerVariant} />
      </div>
      <WhatsAppButton />
      <Diagnosa />
    </div>
  );
}