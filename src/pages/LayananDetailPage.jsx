import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { services } from "../data/services.js";
import { Seo } from "../components/Seo.jsx";
import { IconCircle } from "../components/ui.jsx";

export default function LayananDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  // State Accordion FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  if (!service) {
    return (
      <div className="min-h-screen bg-white text-slate-800 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Layanan Tidak Ditemukan</h1>
        <p className="mt-2 text-slate-600">Maaf, halaman layanan yang Anda cari tidak tersedia.</p>
        <Link
          to="/layanan"
          className="mt-6 bg-[#007A55] text-white font-bold px-7 py-3 rounded-full text-sm hover:bg-emerald-700 transition-all shadow-md"
        >
          ← Kembali ke Semua Layanan
        </Link>
      </div>
    );
  }

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isContentOrPerformance = slug === "content" || slug === "performance-marketing";

  // Data khusus jika rute yang dibuka adalah content / performance-marketing
  const contentProblems = [
    {
      title: "Inefisien dalam Menghabiskan Anggaran",
      tag: "Budget Tak Terkontrol",
      desc: '"Beberapa iklan belum terarah ke audiens yang benar sehingga budget terbuang percuma."',
      icon: "zap",
    },
    {
      title: "Lead Berkualitas Rendah",
      tag: "Conversion Minimal",
      desc: '"Traffic masuk tidak sesuai dengan kebutuhan pelanggan sesungguhnya."',
      icon: "chartBar",
    },
    {
      title: "Kinerja Kampanye Tidak Jelas",
      tag: "Tracking Tidak Terukur",
      desc: '"Sulit menentukan kampanye mana yang otentik akibat ketiadaan akuisisi data akurat."',
      icon: "layout",
    },
  ];

  const contentSolutions = [
    {
      tag: "Goal -> Audience -> Channel",
      title: "Strategi Kampanye yang Terukur",
      desc: "Menentukan tujuan utama (lead, penjualan, atau iklan) dan merancang funnel yang realistis berdasarkan data historis dan benchmark industri.",
      icon: "shieldCheck",
    },
    {
      tag: "Kontrol Biaya + Pacing Optimal",
      title: "Paid Advertising yang Sistematis",
      desc: "Mengelola struktur kampanye, pembaruan, dan optimasi bidding agar biaya tetap efisien tanpa mengorbankan volume konversi.",
      icon: "layers",
    },
    {
      tag: "Lookalike & High-Intent",
      title: "Audience Targeting yang Tepat",
      desc: "Menggabungkan segmentasi berbasis perilaku dan minat, termasuk pemanfaatan first-party data yang tersedia untuk remarketing presisi.",
      icon: "sparkles",
    },
    {
      tag: "Events & Conversions API",
      title: "Conversion Tracking & Measurement",
      desc: "Menyiapkan event tracking (view, add-to-cart, lead form, purchase) agar algoritma machine learning iklan berimpresi tepat sasaran.",
      icon: "code",
    },
    {
      tag: "Creative, Targeting, Landing Page",
      title: "Optimasi Berkelanjutan",
      desc: "Pengujian interaktif berkelanjutan untuk meningkatkan CTR, conversion rate (CVR), dan secara agresif menurunkan biaya per hasil.",
      icon: "box",
    },
    {
      tag: "Insight + Aksi Nyata",
      title: "Reporting yang Mudah Dibaca",
      desc: "Dashboard interaktif dan ringkasan eksekutif mingguan untuk membantu para stakeholders mengambil keputusan bisnis secara cepat.",
      icon: "fileText",
    },
  ];

  const contentFaqs = [
    {
      q: "Berapa lama untuk melihat hasil kampanye?",
      a: "Fase pembelajaran awal (learning phase) umumnya memakan waktu 7-14 hari kerja. Di tahap ini algoritma mencari pola target audiens terbaik. Peningkatan efisiensi biasanya mulai terlihat optimal di minggu ke-2 hingga ke-4.",
    },
    {
      q: "Apakah setup tracking sudah termasuk dalam layanan?",
      a: "Ya, kami membantu instalasi lengkap Meta Pixel, Google Tag Manager, Conversion API, hingga custom event tracking.",
    },
    {
      q: "Seberapa sering kampanye dioptimasi?",
      a: "Tim kami melakukan monitoring performa harian dan eksekusi optimasi skala berkala (bid, budget, dan creative refresh).",
    },
    {
      q: "Apakah bisa mulai dari channel tertentu saja?",
      a: "Bisa, alokasi channel disesuaikan dengan saluran utama yang paling efektif untuk karakteristik bisnis Anda.",
    },
    {
      q: "Bagaimana format pelaporan kinerja iklan?",
      a: "Laporan diberikan secara transparan melalui dashboard interaktif disertai ringkasan eksekutif dan rekomendasi mingguan.",
    },
  ];

  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      <Seo title={`${service.title} – Gaharu Creative`} description={service.short} />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white border-b border-slate-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/60 text-[#007A55] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#007A55] animate-pulse" />
              {service.tag || "PERFORMANCE & KONTEN"}
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {service.short || service.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/kontak"
                className="bg-[#007A55] hover:bg-emerald-800 text-white font-bold px-7 py-3 rounded-full text-sm transition-all shadow-md hover:scale-105"
              >
                Konsultasi Gratis →
              </Link>
              <Link
                to="/layanan"
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-sm"
              >
                Lihat Layanan Lain
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-emerald-200 shadow-sm flex items-center justify-center text-[#007A55]">
                <IconCircle name={service.icon} className="bg-transparent border-0 text-[#007A55]" />
              </div>
              <p className="text-xs font-bold tracking-widest text-[#007A55] uppercase">
                {service.title} FRAMEWORK
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MASALAH YANG SERING TERJADI */}
      <section className="bg-slate-300/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900">Masalah yang Sering Terjadi</h2>
            <p className="text-slate-600 text-sm">
              Banyak tim pemasaran menghadapi kendala yang membuat biaya iklan membengkak dan hasil kampanye sulit dipastikan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(isContentOrPerformance ? contentProblems : service.problemsList || []).map((prob, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 space-y-3 shadow-sm border border-slate-100 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold">
                  <IconCircle name={prob.icon || "zap"} className="bg-transparent border-0 text-red-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{prob.title}</h3>
                {prob.tag && (
                  <span className="inline-block bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {prob.tag}
                  </span>
                )}
                <p className="text-xs text-slate-500 leading-relaxed pt-1">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SOLUSI KAMI */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#007A55] uppercase tracking-widest">
              FRAMEWORK & DUKUNGAN
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Solusi Kami</h2>
            <p className="text-slate-600 text-sm">
              Pendekatan end-to-end: mulai dari strategi hingga pengukuran, agar setiap keputusan didukung data nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {(isContentOrPerformance ? contentSolutions : service.solutionsList || []).map((sol, idx) => (
              <div key={idx} className="bg-slate-50/70 border border-slate-100 rounded-2xl p-6 flex gap-4 transition-all hover:border-emerald-200 hover:shadow-md">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold">
                  <IconCircle name={sol.icon || "check"} className="bg-transparent border-0 text-[#007A55]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#007A55] uppercase tracking-wider block">
                    {sol.tag}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">{sol.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INDIKATOR KINERJA UTAMA (KPI) YANG DIUKUR */}
      <section className="bg-slate-300/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900">Indikator Kinerja Utama (KPI) yang Diukur</h2>
            <p className="text-slate-600 text-sm">
              Contoh metrik yang biasanya menjadi fokus utama pada program performance marketing berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kartu KPI 1: Tren Lead / Conversion */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Tren Lead / Conversion</h3>
                  <p className="text-[11px] text-slate-400">Pertumbuhan Mingguan</p>
                </div>
                <span className="bg-emerald-50 text-[#007A55] text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                  +182% Yield
                </span>
              </div>
              <div className="h-32 bg-gradient-to-t from-emerald-50 to-white rounded-xl border border-dashed border-emerald-200 flex items-end justify-around p-4 text-[10px] text-slate-400">
                <span>Minggu 1</span>
                <span>Minggu 2</span>
                <span>Minggu 3</span>
                <span className="font-bold text-[#007A55]">Minggu 4</span>
              </div>
            </div>

            {/* Kartu KPI 2: Biaya per Hasil (CPA/CPL) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Biaya per Hasil (CPA/CPL)</h3>
                  <p className="text-[11px] text-slate-400">Penurunan Biaya Akibat Kampanye</p>
                </div>
                <span className="bg-emerald-50 text-[#007A55] text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                  -38% Efisiensi
                </span>
              </div>
              <div className="h-32 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-end justify-around p-4 text-[10px] text-slate-400">
                <span className="h-20 w-6 bg-slate-200 rounded-t-md" />
                <span className="h-16 w-6 bg-slate-300 rounded-t-md" />
                <span className="h-12 w-6 bg-emerald-300 rounded-t-md" />
                <span className="h-8 w-6 bg-[#007A55] rounded-t-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKFLOW KEGIATAN */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900">Workflow Kegiatan</h2>
            <p className="text-slate-600 text-sm">
              Proses kerja yang rapi agar kampanye tidak hanya jalan, tapi benar-benar dioptimasi dengan presisi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: "01. AUDIT", title: "Cek Ads Account, Analytics & Setup Pixel/Tracking", desc: "Audit awal menyeluruh" },
              { step: "02. PLANNING", title: "Strategi, Funnel, Pilihan Budget & Struktur Kampanye", desc: "Perencanaan cermat" },
              { step: "03. LAUNCH", title: "Rilis Set Iklan, Testing Ads & Validasi Conversion Event", desc: "Peluncuran terarah" },
              { step: "04. OPTIMIZATION", title: "Tweak Creative, Ad Copy, Bidding, dan Audience Retargeting", desc: "Optimasi berkala" },
              { step: "05. REPORTING", title: "Insight Mingguan/Bulanan, Rekomendasi Scaling & Next Steps", desc: "Laporan transparan" },
            ].map((wf, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold">
                  <IconCircle name="sparkles" className="bg-transparent border-0 text-[#007A55]" />
                </div>
                <span className="text-[10px] font-bold text-[#007A55] tracking-wider block pt-1">
                  {wf.step}
                </span>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{wf.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CATATAN PENGISIAN KPI & FAQ */}
      <section className="bg-slate-300/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri: Catatan Pengisian KPI */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold">
                💡
              </div>
              <h3 className="font-bold text-slate-900 text-base">Catatan Pengisian KPI</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Untuk setiap materi iklan dan proyek baru, KPI dapat disesuaikan dengan skala kampanye bisnis Anda:
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />
                  <span><strong>CPL (Cost per Lead):</strong> Biaya per akuisisi kontak</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />
                  <span><strong>CPA (Cost per Acquisition):</strong> Biaya penjualan valid</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />
                  <span><strong>CTR (Click Through Rate):</strong> Efektivitas materi iklan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />
                  <span><strong>ROAS (Return on Ad Spend):</strong> Rasio omzet</span>
                </li>
              </ul>
            </div>

            {/* Kolom Kanan: FAQ Accordion */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#007A55] uppercase tracking-widest">FAQ</span>
                <p className="text-xs text-slate-500">
                  Jawaban singkat dari pertanyaan yang sering diajukan terkait layanan Performance Marketing Gaharu Creative.
                </p>
              </div>

              <div className="space-y-3">
                {(isContentOrPerformance ? contentFaqs : service.faqs || []).map((faq, idx) => (
                  <div key={idx} className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center p-4 text-left font-bold text-slate-800 text-sm hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#007A55] text-lg font-bold">{openFaqIndex === idx ? "−" : "+"}</span>
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BANNER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#007A55] rounded-3xl p-10 lg:p-14 text-center text-white space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Optimalkan Performa Kampanye Anda Sekarang
          </h2>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto leading-relaxed">
            Mulai jalankan kampanye digital marketing yang terukur bersama tim profesional Gaharu Creative.
          </p>
          <div className="pt-2">
            <Link
              to="/kontak"
              className="inline-block bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-lg hover:scale-105"
            >
              Mulai Konsultasi Gratis →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}