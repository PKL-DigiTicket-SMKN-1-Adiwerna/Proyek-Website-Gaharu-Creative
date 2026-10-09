import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CtaBanner from "./components/CtaBanner.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import HomePage from "./pages/HomePage.jsx";
import TentangPage from "./pages/TentangPage.jsx";
import LayananPage from "./pages/LayananPage.jsx";
import PortofolioPage from "./pages/PortofolioPage.jsx";
import InsightPage from "./pages/InsightPage.jsx";
import KontakPage from "./pages/KontakPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

/*
 * DESAIN.md 3.3: banner CTA penutup ada di atas footer pada semua halaman,
 * dengan judul yang berbeda per halaman. Rute yang memakai halaman placeholder
 * (404) tidak dapat banner, jadi tabel ini juga jadi daftar pengecualian.
 */
export const ctaByPath = {
  "/": "beranda",
  "/layanan": "layanan",
  "/portofolio": "portofolio",
  "/tentang": "tentang",
  "/insight": "insight",
  "/kontak": "kontak",
};

/* Varian footer: Portofolio dan Kontak minta tautan legal ditampilkan. */
export const footerVariantByPath = {
  "/portofolio": "lengkap",
  "/kontak": "lengkap",
};

function useCtaForPath(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return ctaByPath[clean] || null;
}

export default function App() {
  const { pathname, hash } = useLocation();
  const ctaPage = useCtaForPath(pathname);
  const footerVariant = footerVariantByPath[pathname] || "ringkas";

  // Tiap route mulai dari atas. Tautan anchor (#slug) tetap dilompat ke
  // elemennya setelah navigasi selesai.
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

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Lewati ke konten
      </a>
      <Header />
      <main id="konten" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route path="/portofolio" element={<PortofolioPage />} />
          <Route path="/insight" element={<InsightPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {ctaPage ? <CtaBanner key={ctaPage} page={ctaPage} /> : null}
      <Footer variant={footerVariant} />
      <WhatsAppButton />
    </div>
  );
}
