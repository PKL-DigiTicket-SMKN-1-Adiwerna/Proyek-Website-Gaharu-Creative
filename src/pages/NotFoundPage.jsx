import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Halaman tidak ditemukan" description="Halaman yang kamu cari tidak ada di Gaharu Creative." />
      <section className="mx-auto max-w-3xl px-5 py-24 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-action-text">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-muted">
          Alamat yang kamu buka tidak ada. Coba kembali ke beranda atau lihat daftar layanan kami.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="inline-flex min-h-11 items-center rounded-lg bg-action px-5 py-3 font-medium text-on-action transition-colors hover:bg-action-hover">
            Kembali ke beranda
          </Link>
          <Link to="/layanan" className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 py-3 font-medium transition-colors hover:bg-card">
            Lihat layanan
          </Link>
        </div>
      </section>
    </>
  );
}
