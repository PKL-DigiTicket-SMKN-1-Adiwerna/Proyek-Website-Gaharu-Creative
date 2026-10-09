import { Link } from "react-router-dom";
import { site, footerServices, footerExtraLinks, links } from "../data/site.js";
import { Container } from "./ui.jsx";
import CopyrightYear from "./CopyrightYear.jsx";

/*
 * Satu komponen footer untuk semua halaman. DESAIN.md 6.3 mencatat footer
 * wireframe berbeda-beda antar halaman; versi seragam ini yang dipakai.
 *
 * Tautan Kebijakan Privasi, Syarat & Ketentuan, dan Karier diminta muncul di
 * footer Portofolio dan Kontak. Halaman tujuannya belum ada, jadi tiga nama
 * itu ditampilkan sebagai teks berlabel, bukan tautan mati.
 */
export default function Footer({ variant = "ringkas" }) {
  const showExtra = variant === "lengkap";

  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-12 text-center sm:py-14">
        <p className="text-base font-bold text-ink">{site.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{site.tagline}</p>

        <div className="mt-8 flex flex-col gap-6 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Layanan</p>
            <ul className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-ink">
              {footerServices.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Kontak</p>
            <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-ink">
              <li>
                <a
                  href={links.mail}
                  className="inline-block py-1 underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.phone}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Jam Operasional</p>
            <p className="mt-2 text-ink">{site.hours}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Media Sosial</p>
            <ul
              data-placeholder="Akun belum diverifikasi"
              className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1 text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-line pt-6">
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1" aria-label="Tautan legal">
              {footerExtraLinks.map((item) => (
                <span key={item.label} className="text-muted" title={item.state}>
                  {item.label}
                  <span className="ml-1 text-xs uppercase tracking-wider">
                    ({item.state})
                  </span>
                </span>
              ))}
            </nav>
            <p className="mt-4 text-sm text-muted">
              <Link to="/" className="underline decoration-line underline-offset-4 hover:decoration-ink">
                {site.name}
              </Link>{" "}
              &copy; <CopyrightYear from={site.founded} />. Semua hak dilindungi.
            </p>
          </div>
        </div>

        {showExtra ? (
          <p className="mt-6 text-xs text-muted">
            Menu: Tentang Kami, Layanan, Portofolio, Artikel, Kontak.
          </p>
        ) : null}
      </Container>
    </footer>
  );
}
