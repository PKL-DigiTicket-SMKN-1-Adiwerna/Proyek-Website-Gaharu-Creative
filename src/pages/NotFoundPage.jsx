import { Seo } from "../components/Seo.jsx";
import { Button, Container } from "../components/ui.jsx";
import { links } from "../data/site.js";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Halaman tidak ditemukan" description="Halaman yang dicari tidak ada di Gaharu Creative." />
      <section className="border-b border-line">
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Kesalahan 404</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Halaman tidak ditemukan
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Alamat yang Anda buka tidak ada di situs ini. Mungkin nama halamannya berubah, atau
              tautannya belum selesai dibuat.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/" kind="primary">
                Kembali ke Beranda
              </Button>
              <Button to={links.portofolio} kind="secondary">
                Lihat Portofolio
              </Button>
            </div>
            <nav className="mt-10 border-t border-line pt-6" aria-label="Sitemap singkat">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">Halaman yang ada</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
                {["Beranda", "Tentang", "Layanan", "Portofolio", "Insight", "Kontak"].map((label) => (
                  <li key={label}>
                    <Button
                      to={label === "Beranda" ? "/" : `/${label.toLowerCase()}`}
                      kind="secondary"
                      className="px-4 py-2 text-xs"
                    >
                      {label}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
}
