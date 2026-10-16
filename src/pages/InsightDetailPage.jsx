import { useParams, Link } from "react-router-dom";
import { posts } from "../data/insights.js";
import { Seo } from "../components/Seo.jsx";

export default function InsightDetailPage() {
  const { slug } = useParams();

  // Mencari artikel berdasarkan slug, jika tidak ada fallback ke artikel pertama atau objek default
  const post = posts?.find((p) => p.slug === slug) || posts?.[0] || {
    title: "Detail Artikel Insight",
    tag: "Insight",
    excerpt: "Artikel strategi digital marketing dari Gaharu Creative.",
    dateLabel: "2026",
    image: "/Beranda-Visual.webp",
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      <Seo title={`${post.title} – Insight Gaharu Creative`} description={post.excerpt} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/insight" className="hover:text-[#007A55] transition-colors">Insight</Link>
            <span>/</span>
            <span className="text-[#007A55] font-bold">{post.tag || "Artikel"}</span>
          </nav>

          <div className="space-y-4">
            <span className="inline-block bg-emerald-100/80 border border-emerald-300 text-[#007A55] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              {post.tag || "Insight"}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-800">Tim Gaharu Creative</span>
              <span>•</span>
              <span>{post.dateLabel || "2026"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Konten Artikel */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 aspect-[16/9]">
          <img
            src={post.image || "/Beranda-Visual.webp"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
          <p className="text-lg font-medium text-slate-800 leading-relaxed">
            {post.excerpt}
          </p>
          <p>
            Strategi pemasaran digital modern menuntut konsistensi antara perencanaan materi, target audiens yang spesifik, serta evaluasi data secara berkala untuk mencapai pertumbuhan bisnis yang berkelanjutan.
          </p>
        </div>

        <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
          <Link
            to="/insight"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-2.5 rounded-full text-xs transition-all"
          >
            ← Kembali ke Insight
          </Link>
          <Link
            to="/kontak"
            className="bg-[#007A55] hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-full text-xs transition-all shadow-sm"
          >
            Konsultasi Strategi →
          </Link>
        </div>
      </section>
    </div>
  );
}