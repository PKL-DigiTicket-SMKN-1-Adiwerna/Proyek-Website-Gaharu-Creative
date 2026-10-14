"use client";

import { useState } from "react";
import { articlesData } from "@/content/articles";
import Link from "next/link";

export default function InsightPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    { name: "Semua", desc: "Seluruh topik", icon: "📑" },
    { name: "Digital Marketing", desc: "Ads, SEO, Growth", icon: "📈" },
    { name: "Branding", desc: "Identitas & Cerita", icon: "🎨" },
    { name: "Teknologi", desc: "Web, AI, Cloud", icon: "💻" },
  ];

  const filteredArticles =
    selectedCategory === "Semua"
      ? articlesData
      : articlesData.filter((a) => a.category === selectedCategory);

  return (
    <div className="space-y-16 py-12">
      {/* Header Insight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-block bg-emerald-50 text-[#007A55] text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Pusat Pengetahuan & Analisis
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Insight</h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Artikel terbaru seputar pertumbuhan digital, panduan taktis, dan disrupsi pasar Indonesia.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link href="/portofolio" className="secondary-btn">Lihat Portofolio ↗</Link>
          <Link href="/kontak" className="primary-btn">Konsultasi Gratis 💬</Link>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10">
          {[
            { val: "120+", label: "Artikel Dipublikasi" },
            { val: "45k", label: "Pembaca Aktif/Bulan" },
            { val: "360°", label: "Spektrum Digital" },
            { val: "15+", label: "Pakar Kontributor" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
              <p className="text-2xl font-extrabold text-[#007A55]">{stat.val}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Kategori */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Filter Kategori</h2>
          <p className="text-slate-500 text-xs">Pilih kategori untuk melihat artikel yang relevan.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`p-6 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                  isActive
                    ? "border-[#007A55] bg-emerald-50/50 shadow-sm"
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
                  {cat.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isActive ? "text-[#007A55]" : "text-slate-800"}`}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">{cat.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* List Artikel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold text-[#007A55] tracking-wider uppercase">KURASI KHUSUS</span>
            <h2 className="text-2xl font-bold text-slate-900">Artikel Unggulan</h2>
          </div>
          <span className="text-xs text-slate-500">Menampilkan {filteredArticles.length} Artikel</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div key={art.slug} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="bg-slate-200 h-48 w-full flex items-center justify-center text-slate-400 text-xs">
                  [ Cover Image - {art.category} ]
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="font-semibold text-[#007A55] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {art.category}
                    </span>
                    <span>{art.readTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{art.date} • {art.author}</p>
                  <h3 className="font-bold text-slate-800 text-base leading-snug hover:text-[#007A55] transition">
                    <Link href={`/insight/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link href={`/insight/${art.slug}`} className="text-[#007A55] text-xs font-semibold hover:underline inline-flex items-center gap-1">
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}