import { servicesData } from "@/content/services";
import Link from "next/link";

export default function LayananPage() {
  return (
    <div className="space-y-20 py-12">
      {/* Hero Layanan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-block bg-emerald-50 text-[#007A55] text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Solusi Digital Terpadu
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
          5 Layanan Utama
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
          Lima layanan yang saling terhubung untuk mendorong pertumbuhan bisnis Anda secara sistematis dan berkelanjutan.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link href="/kontak" className="primary-btn">Konsultasi Gratis →</Link>
          <a href="#daftar-layanan" className="secondary-btn">Lihat Layanan</a>
        </div>
      </section>

      {/* Grid 5 Layanan Utama */}
      <section id="daftar-layanan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.slug}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-[#007A55] bg-emerald-50 px-3 py-1 rounded-full uppercase">
                  {service.subtitle}
                </span>
                <h2 className="text-xl font-bold text-slate-900">{service.badge}</h2>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/layanan/${service.slug}`}
                  className="text-[#007A55] font-semibold text-xs inline-flex items-center gap-1 hover:underline"
                >
                  Lihat Detail Layanan →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Gaharu */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Kenapa Memilih Gaharu</h2>
            <p className="text-slate-600 text-sm">Pendekatan yang memastikan strategi jelas, eksekusi rapi, dan dampak dapat diukur.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Tim Berpengalaman", desc: "Kolaborasi strategi hingga eksekusi dengan alur kerja yang jelas." },
              { title: "Strategi Berbasis Data", desc: "Keputusan dari insight yang terukur untuk tiap tahap bisnis." },
              { title: "Teknologi Terdepan", desc: "Menggunakan tools & framework modern untuk akselerasi." },
              { title: "Hasil Terukur", desc: "Pelaporan transparan untuk melihat dampak dari setiap program." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}