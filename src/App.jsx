import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import HomePage from "./pages/HomePage.jsx";
import TentangPage from "./pages/TentangPage.jsx";
import LayananPage from "./pages/LayananPage.jsx";
import PortofolioPage from "./pages/PortofolioPage.jsx";
import InsightPage from "./pages/InsightPage.jsx";
import KontakPage from "./pages/KontakPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  const { pathname, hash } = useLocation();

  // Each route starts at the top of the page. Anchor links on the layanan
  // page keep their offset, so hash jumps still work after navigation.
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
    <div className="flex min-h-screen flex-col">
      <a href="#konten" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-action focus:px-4 focus:py-2 focus:text-on-action">
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
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
