import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { IconCircle } from "../components/ui.jsx";
import { links } from "../data/site.js";
import { services, whyChooseUs } from "../data/services.js";

const title = "Jasa Digital Marketing & Agensi Kreatif Terbaik Semarang";
const description =
  "Gaharu Creative menyediakan solusi terpadu: jasa digital marketing, digital branding, kelola sosial media, performance marketing, hingga pembuatan website di Semarang.";

export default function LayananPage() {
  return (
    <div className="bg-white text-slate-800 min-h-screen py-16 font-sans">
      <Seo title={title} description={description} />

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Pill Badge */}
        <div>
          <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            SOLUSI DIGITAL TERPADU
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          5 Layanan Utama
        </h1>

        <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
          Lima layanan yang saling terhubung untuk mendorong pertumbuhan bisnis Anda secara sistematis dan berkelanjutan.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {/* Tombol Konsultasi Gratis Berwarna Putih */}
          <Link
            to={links.konsultasi}
            className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-md hover:scale-105"
          >
            Konsultasi Gratis →
          </Link>
          <Link
            to={links.penawaran}
            className="bg-[#007A55] hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-md hover:scale-105"
          >
            Minta Penawaran
          </Link>
        </div>
      </section>

      {/* Grid Layanan Utama */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-6">
        {/* Baris 1: 3 Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Baris 2: 2 Kartu Lebih Lebar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.slice(3, 5).map((service) => (
            <ServiceCard key={service.slug} service={service} wide />
          ))}
        </div>
      </section>

      {/* Section: Kenapa Memilih Gaharu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 text-center bg-slate-50 py-16 rounded-3xl border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Kenapa Memilih Gaharu
        </h2>
        <p className="max-w-xl mx-auto mt-3 text-slate-600 text-sm leading-relaxed">
          Pendekatan yang memastikan strategi jelas, eksekusi rapi, dan dampak dapat diukur.
        </p>

        {/* 4 Kolom Keunggulan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-6">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#007A55] text-xl group-hover:bg-[#007A55] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                <IconCircle name={item.icon} className="bg-transparent border-0" />
              </div>
              <h3 className="font-bold text-slate-900 text-base pt-2">{item.title}</h3>
              <p className="text-[11px] font-semibold text-[#007A55] uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

{/* Komponen Kartu Layanan */}
function ServiceCard({ service }) {
  return (
    <article
      id={service.slug}
      className="group relative bg-white border border-slate-200 text-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-emerald-300"
    >
      <div>
        {/* Header Kartu: Tag Kategori & Arrow Link */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {service.tag}
          </span>
          <Link
            to={`/layanan/${service.slug}`}
            className="text-slate-400 hover:text-[#007A55] transition-colors p-1"
            aria-label={`Detail ${service.title}`}
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>

        {/* Visual Box Placeholder / Banner Ilustrasi Visual Layanan */}
        <Link to={`/layanan/${service.slug}`} className="block">
          <div className="mt-4 bg-emerald-50/60 rounded-xl border border-emerald-100 p-6 flex flex-col items-center justify-center text-center space-y-2 min-h-[120px] group-hover:bg-emerald-100/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-emerald-200 text-[#007A55] flex items-center justify-center font-bold">
              <IconCircle name={service.icon} className="bg-transparent border-0 text-[#007A55]" />
            </div>
            <p className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
              {service.title} FRAMEWORK
            </p>
          </div>
        </Link>

        {/* Judul dengan Link ke Detail */}
        <h3 className="mt-5 text-xl font-bold text-slate-900 hover:text-[#007A55] transition-colors">
          <Link to={`/layanan/${service.slug}`}>
            {service.title}
          </Link>
        </h3>

        {/* Problem Highlight Box */}
        <div className="mt-3 bg-red-50 border border-red-100 rounded-lg p-3 text-xs leading-relaxed text-slate-700">
          <span className="font-bold text-red-600">Problem: </span>
          {service.problem}
        </div>

        {/* Solusi Deskripsi Singkat */}
        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
          {service.short || service.solution}
        </p>
      </div>

      {/* Deliverables List */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          DELIVERABLES:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.deliverables && service.deliverables.map((item) => (
            <span
              key={item}
              className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-200/60"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}