import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

const title = "Layanan";
const description = "Branding, content, social media, performance marketing, dan digital product development.";

export default function LayananPage() {
  return (
    <>
      <Seo title={title} description={description} />
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-text">Layanan</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">Branding, content, social media, performance marketing, dan digital product development.</p>

      <div className="mt-10 rounded-lg border border-border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-flag">Status halaman</p>
        <p className="mt-3 leading-relaxed text-muted">Rincian tiap layanan belum ditulis. Struktur halaman sudah siap, tinggal diisi konten tim.</p>
      </div>

      <p className="mt-8 text-sm text-muted">
        sementara itu, 
        <Link to="/" className="inline-block py-1 font-semibold text-action-text underline underline-offset-4">
          kembali ke beranda
        </Link>
        .
      </p>
    </div>

    </>
  );
}
