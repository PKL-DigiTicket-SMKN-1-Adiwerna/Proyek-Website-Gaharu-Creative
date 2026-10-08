import { useEffect, useState } from "react";
import { site } from "../data/site.js";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  // Muncul setelah halaman di-scroll sedikit supaya tidak langsung
  // menutupi konten di layar kecil.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${site.waNumber}?text=${encodeURIComponent(
    "Halo Gaharu Creative, saya ingin konsultasi gratis."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi lewat WhatsApp"
      tabIndex={visible ? undefined : -1}
      aria-hidden={!visible}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-action text-on-action shadow-lg transition-all hover:bg-action-hover ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-2.46 4.1c-.15 0-.4.06-.61.28-.21.22-.8.78-.8 1.91s.82 2.21.93 2.36c.11.15 1.6 2.44 3.88 3.43c.54.23.96.37 1.29.48.54.17 1.04.15 1.43.09.43-.07 1.34-.55 1.53-1.08.19-.53.19-.99.13-1.08-.06-.1-.21-.15-.44-.27-.22-.11-1.33-.66-1.54-.73-.21-.08-.36-.11-.51.11-.15.22-.58.73-.71.88-.13.15-.26.17-.48.06-.22-.11-.95-.35-1.81-1.11-.67-.6-1.12-1.33-1.25-1.56-.13-.22-.02-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.22-.7-1.67-.18-.44-.37-.38-.51-.39h-.43z" />
      </svg>
    </a>
  );
}
