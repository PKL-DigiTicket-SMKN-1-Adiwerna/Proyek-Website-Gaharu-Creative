import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";

/* Nomor di site.js masih contoh dan belum diverifikasi, jadi catatan di bawah
 * tombol dirujuk lewat aria-describedby.
 */
export default function WhatsAppButton() {
  const href = site.waNumber
    ? `https://wa.me/${site.waNumber}?text=${encodeURIComponent(site.waMessage)}`
    : null;

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi lewat WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-brand bg-brand text-brand-ink shadow-sm transition-colors hover:bg-brand-bright"
    >
      <Icon name="chat" className="h-7 w-7" />
    </a>
  );
}
