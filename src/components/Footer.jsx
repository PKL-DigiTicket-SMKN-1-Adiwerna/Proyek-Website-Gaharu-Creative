import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { services } from "../data/services.js";
import CopyrightYear from "./CopyrightYear.jsx";


const waHref = `https://wa.me/${site.waNumber}?text=${encodeURIComponent(
  "Halo Gaharu Creative, saya ingin konsultasi gratis."
)}`;

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-action font-display text-sm font-bold text-on-action"
              >
                G
              </span>
              <span className="font-display text-base font-semibold text-text">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.tagline} Berlokasi di {site.address}.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center rounded-md bg-action px-5 text-sm font-semibold text-on-action transition-colors hover:bg-action-hover"
            >
              Konsultasi gratis
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-text">Layanan</h2>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/layanan#${s.slug}`}
                    className="inline-block py-1.5 text-sm text-muted transition-colors hover:text-action-text"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-text">Kontak</h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-muted">
              <li>
                {site.address}
                {!site.addressVerified && (
                  <span className="block text-xs text-flag">Alamat lengkap belum dikonfirmasi</span>
                )}
              </li>
              <li>{site.hours}</li>
              {site.phone && <li>{site.phone}</li>}
              <li>
                {site.email}
                {!site.emailVerified && (
                  <span className="block text-xs text-flag">Domain belum dikonfirmasi</span>
                )}
              </li>
            </address>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1.5 text-sm text-muted transition-colors hover:text-action-text"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CopyrightYear /> {site.name}. Hak cipta dilindungi.
          </p>
          <p>{site.legal.company}</p>
        </div>
      </div>
    </footer>
  );
}
