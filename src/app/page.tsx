import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-24 py-8">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#007A55] text-xs font-medium px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#007A55]"></span>
            AGENCY DIGITAL 360° TERINTEGRASI DI INDONESIA
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Gaharu <span className="text-[#007A55]">Creative</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Pengembangan strategi terintegrasi untuk pertumbuhan bisnis melalui solusi visual kreatif dan performa terukur, dirancang khusus untuk enterprise, institusi, dan UMKM di Indonesia.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/kontak" className="primary-btn">
              Konsultasi Gratis →
            </Link>
            <Link href="/layanan" className="secondary-btn">
              Lihat Portofolio
            </Link>
          </div>
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-6 text-xs text-slate-500">
            <span>✓ Layanan Terpadu 360°</span>
            <span>✓ Strategi Berbasis Data</span>
            <span>✓ Hasil Dapat Diukur</span>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video lg:aspect-auto lg:h-[400px] flex items-center justify-center">
          <div className="text-center p-6 text-slate-400">
            <p className="font-semibold text-slate-500">[ Image Hero Banner ]</p>
            <p className="text-xs mt-1">Tim kolaborasi Gaharu Creative sedang berdiskusi</p>
          </div>
        </div>
      </section>

      {/* 2. Partner Digital Section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#007A55]">
              DIGITAL AGENCY
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Beranda — Partner Digital 360° untuk Pertumbuhan Bisnis Anda
            </h2>
            <p className="text-slate-600 text-sm">
              Kolaborasi komprehensif mulai dari strategi branding, konten visual, hingga eksekusi kampanye yang terukur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold">
                🎯
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Partner Digital 360° untuk Pertumbuhan Bisnis Anda
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pendekatan terpadu berbasis data untuk memastikan setiap kampanye digital Anda tidak hanya menarik secara visual, tetapi juga memberikan ROI yang terukur.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold">
                🎨
              </div>
              <h3 className="text-xl font-bold text-slate-800">Visual / Gambar</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Aset visual profesional dengan konsistensi tinggi untuk membangun persepsi brand yang kuat di mata audiens sasaran.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 5 Layanan Utama */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900">5 Layanan Utama</h2>
          <p className="text-slate-600 text-sm">
            Layanan unggulan yang saling terintegrasi untuk mendukung skala bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Branding",
              tag: "BRANDING",
              desc: "Membangun identitas visual dan persona yang memikat, memastikan kredibilitas instan di benak audiens.",
            },
            {
              title: "Content",
              tag: "KREATIF",
              desc: "Produksi multimedia berselera tinggi yang memadukan estetika sinematik dengan narasi persuasif.",
            },
            {
              title: "Social Media",
              tag: "ENGAGEMENT",
              desc: "Aktivasi interaksi harian, kolaborasi KOL, serta manajemen persona media sosial terpadu.",
            },
            {
              title: "Performance Marketing",
              tag: "TERUKUR",
              desc: "Strategi akuisisi berbasis corong presisi (funnel tracking) di Meta, Google, dan TikTok.",
            },
            {
              title: "Digital Product Development",
              tag: "PRODUK",
              desc: "Rekayasa perangkat lunak adaptif, mulai dari landing page konversi tinggi hingga aplikasi SaaS.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#007A55] bg-emerald-50 px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
              <Link href="/layanan" className="text-[#007A55] text-xs font-semibold hover:underline flex items-center gap-1">
                Pelajari Selengkapnya →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Statistik Pencapaian */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">
              Sejak 2020 — Fokus pada hasil yang konsisten
            </h2>
            <p className="text-slate-600 text-sm">
              Pengalaman bertahun-tahun membantu pertumbuhan brand di berbagai sektor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center space-y-2">
              <p className="text-4xl font-extrabold text-[#007A55]">Sejak 2020</p>
              <p className="text-xs text-slate-500">Berdedikasi di industri kreatif</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center space-y-2">
              <p className="text-4xl font-extrabold text-[#007A55]">100+ Klien</p>
              <p className="text-xs text-slate-500">Dipercaya brand enterprise & UMKM</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center space-y-2">
              <p className="text-4xl font-extrabold text-[#007A55]">500+ Proyek</p>
              <p className="text-xs text-slate-500">Selesai dengan standar kualitas tinggi</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Portofolio Unggulan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Portofolio Unggulan</h2>
            <p className="text-slate-600 text-sm mt-1">Beberapa proyek terbaik yang telah kami selesaikan.</p>
          </div>
          <Link href="/portofolio" className="text-[#007A55] text-sm font-semibold hover:underline">
            Lihat Seluruh Portofolio →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm space-y-4 p-4">
              <div className="bg-slate-200 h-48 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                [ Preview Project Image ]
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#007A55] bg-emerald-50 px-2.5 py-1 rounded-full">
                  Case Study
                </span>
                <h3 className="font-bold text-slate-800 text-base">
                  Pengembangan Solusi Digital & Branding Terpadu #{item}
                </h3>
                <p className="text-slate-500 text-xs line-clamp-2">
                  Transformasi identitas merek dan optimalisasi performa platform digital untuk akselerasi bisnis.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimoni Klien */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-100 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div>
            <span className="text-xs font-semibold text-[#007A55] uppercase tracking-wider">TESTIMONI KLIEN</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">Apa Kata Mereka Tentang Kami</h2>
          </div>
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 space-y-4 shadow-sm">
            <div className="text-amber-400 text-sm">★★★★★</div>
            <p className="text-slate-700 text-sm italic leading-relaxed">
              "Gaharu Creative memberikan ekosistem strategi 360° yang sangat membantu brand kami tumbuh pesat. Tim yang responsif dan eksekusi yang sangat rapi."
            </p>
            <div className="text-xs font-semibold text-slate-800">
              — Direktur Utama, Brand Strategic
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#007A55] rounded-3xl p-10 lg:p-16 text-center text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Siap Mengembangkan Bisnis Anda?</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto text-sm leading-relaxed">
            Konsultasikan kebutuhan digital dan strategi brand Anda bersama tim ahli kami tanpa komitmen awal.
          </p>
          <div>
            <Link href="/kontak" className="inline-block bg-white text-[#007A55] hover:bg-slate-100 font-semibold px-8 py-3.5 rounded-full transition shadow-lg text-sm">
              Jadwalkan Diskusi Gratis →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}