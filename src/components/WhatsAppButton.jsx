import { useSite, waHref } from "../lib/useSite.js";
import { Icon } from "./Icons.jsx";
import { useT } from "../lib/i18n.js";

/* Tombol mengapung ke WhatsApp resmi perusahaan. Nomor diambil dari panel
 * admin (/public/site) dengan cadangan src/data/site.js.
 */
export default function WhatsAppButton() {
  const t = useT();
  const s = useSite();
  const href = s.waNumber ? waHref(s) : null;

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("Konsultasi lewat WhatsApp")}
      className="float-in fixed bottom-5 right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-brand bg-brand text-brand-ink shadow-sm transition-colors hover:bg-brand-bright"
    >
      <Icon name="chat" className="h-7 w-7" />
    </a>
  );
}
