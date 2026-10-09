import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";

/*
 * Tombol WhatsApp mengambang. Warna ikut tahap wireframe: lingkaran abu
 * dengan ikon hitam, bukan hijau brand.
 *
 * Nomor di site.js masih contoh dan ditandai belum diverifikasi, jadi href
 * memakai `aria-describedby` ke catatan kecil di bawahnya. Ganti
 * site.waNumber begitu nomor resmi masuk.
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
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-ink bg-fill text-ink shadow-sm transition-colors hover:bg-line"
    >
      <Icon name="chat" className="h-6 w-6" />
    </a>
  );
}
