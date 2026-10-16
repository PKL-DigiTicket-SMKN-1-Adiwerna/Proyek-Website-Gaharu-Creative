import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CtaBanner from "./components/CtaBanner.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import Diagnosa from "./components/Diagnosa.jsx";
import HomePage from "./pages/HomePage.jsx";
import TentangPage from "./pages/TentangPage.jsx";
import LayananPage from "./pages/LayananPage.jsx";
import LayananDetailPage from "./pages/LayananDetailPage.jsx";
import PortofolioPage from "./pages/PortofolioPage.jsx";

// Import Halaman Portofolio Statis
import PortofolioUmkmPage from "./pages/PortofolioUmkmPage.jsx";
import PortofolioKorporatPage from "./pages/PortofolioKorporatPage.jsx";
import PortofolioPemerintahPage from "./pages/PortofolioPemerintahPage.jsx";

import InsightPage from "./pages/InsightPage.jsx";
import InsightDetailPage from "./pages/InsightDetailPage.jsx";
import KontakPage from "./pages/KontakPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

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
  if (clean.startsWith("/layanan")) return ctaByPath["/layanan"];
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

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Header />
      <main id="konten" className="flex-1">
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {ctaPage ? <CtaBanner key={ctaPage} page={ctaPage} /> : null}
      <Footer variant={footerVariant} />
      <WhatsAppButton />
      <Diagnosa />
    </div>
  );
}