import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

const title = "Kontak";
const description = "Hubungi Gaharu Creative lewat WhatsApp atau email.";

export default function KontakPage() {
  return (
    <>
      <Seo title={title} description={description} />
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-text">Kontak</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">Hubungi Gaharu Creative lewat WhatsApp atau email.</p>

      <div className="mt-10 rounded-lg border border-border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-flag">Status halaman</p>
        <p className="mt-3 leading-relaxed text-muted">Formulir kontak belum terhubung ke layanan email. Nomor WhatsApp resmi juga belum dikonfirmasi, jadi form sengaja belum diaktifkan.</p>
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
