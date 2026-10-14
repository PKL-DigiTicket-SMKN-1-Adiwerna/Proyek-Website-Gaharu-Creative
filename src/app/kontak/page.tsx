"use client";

import { useState } from "react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pesan Anda telah berhasil dikirim! Tim kami akan segera menghubungi Anda.");
  };

  return (
    <div className="space-y-20 py-12">
      {/* 1. Hero Section Kontak */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Hubungi Kami
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Solusi digital holistik siap didiskusikan dengan para konsultan dan kreator kami.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm max-w-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-bold text-slate-800 text-sm">Area Kontak</h3>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Silakan isi form di bawah. Tim kami akan merespons secepatnya hari kerja.
            </p>
            <div className="flex gap-2 pt-1 text-[10px] font-semibold">
              <span className="bg-emerald-50 text-[#007A55] px-2.5 py-1 rounded-full">Bentuk Komunikasi Cepat</span>
              <span className="bg-emerald-50 text-[#007A55] px-2.5 py-1 rounded-full">Respon Hari Kerja</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Form Kontak */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Form Kontak</h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Isi data berikut untuk menghubungi Gaharu Creative.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Lengkap */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#007A55] focus:ring-1 focus:ring-[#007A55] transition"
                />
              </div>

              {/* Perusahaan / Organisasi */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Perusahaan / Organisasi
                </label>
                <input
                  type="text"
                  placeholder="Nama perusahaan / Institusi"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#007A55] focus:ring-1 focus:ring-[#007A55] transition"
                />
              </div>
            </div>

            {/* Layanan Digital */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Layanan Digital <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#007A55] focus:ring-1 focus:ring-[#007A55] transition bg-white"
              >
                <option value="">Pilih layanan yang dibutuhkan</option>
                <option value="branding">Branding & Creative Strategy</option>
                <option value="content">Content Creation & Video</option>
                <option value="social-media">Social Media Management</option>
                <option value="performance-marketing">Performance Marketing</option>
                <option value="digital-product">Digital Product Development (Web/App)</option>
              </select>
            </div>

            {/* Pesan */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Pesan <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                placeholder="Ceritakan kebutuhan proyek Anda (tujuan, timeline, dan detail singkat). Contoh: Ingin website company profile dengan fitur lead form, target rilis akhir bulan."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#007A55] focus:ring-1 focus:ring-[#007A55] transition"
              ></textarea>
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="primary-btn w-full sm:w-auto px-10 py-3 text-xs sm:text-sm font-semibold rounded-full"
              >
                Kirim Pesan
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. Kanal Komunikasi & Informasi Kontak */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-[#007A55] uppercase tracking-wider">KANAL KOMUNIKASI</span>
          <h2 className="text-3xl font-bold text-slate-900">Informasi Kontak</h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Hubungi kami melalui kanal berikut atau datang langsung sesuai jam operasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WhatsApp */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold text-lg">💬</div>
            <span className="text-[11px] font-semibold text-slate-400">WhatsApp</span>
            <p className="font-bold text-slate-800 text-base">+62 812-3456-7890</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#007A55] font-semibold hover:underline block pt-1">
              Klik untuk chat langsung →
            </a>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold text-lg">✉️</div>
            <span className="text-[11px] font-semibold text-slate-400">Email</span>
            <p className="font-bold text-slate-800 text-base">halo@gaharucreative.co.id</p>
            <a href="mailto:halo@gaharucreative.co.id" className="text-[11px] text-[#007A55] font-semibold hover:underline block pt-1">
              Kirimkan brief atau proposal →
            </a>
          </div>

          {/* Alamat */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold text-lg">📍</div>
            <span className="text-[11px] font-semibold text-slate-400">Alamat</span>
            <p className="font-bold text-slate-800 text-xs sm:text-sm leading-relaxed">
              Jl. Contoh No. 12, Jakarta Selatan
            </p>
            <p className="text-[10px] text-slate-400">DKI Jakarta 12190</p>
          </div>

          {/* Jam Operasional */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold text-lg">🕒</div>
            <span className="text-[11px] font-semibold text-slate-400">Jam Operasional</span>
            <p className="font-bold text-slate-800 text-xs sm:text-sm">
              Senin–Jumat, 09.00–17.00 WIB
            </p>
            <p className="text-[10px] text-slate-400">Sabtu & Minggu: Libur Konsultasi</p>
          </div>
        </div>
      </section>

      {/* 4. Map Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-200 border border-slate-200 h-80 flex items-center justify-center">
          <div className="text-center space-y-2 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm max-w-sm">
            <span className="text-lg">📍</span>
            <h3 className="font-bold text-slate-800 text-sm">Gaharu Creative Headquarters</h3>
            <p className="text-slate-500 text-xs">Lokasi kantor dan area layanan utama (Jakarta & Remote)</p>
          </div>
        </div>
      </section>

      {/* 5. CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#007A55] rounded-3xl p-10 lg:p-14 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">SOLUSI STRATEGIS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Berkomitmen Tumbuh Bersama
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Siap mewujudkan transformasi digital brand Anda? Mulai sesi konsultasi eksklusif hari ini.
            </p>
          </div>
          <div>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#007A55] hover:bg-slate-100 font-semibold px-8 py-3 rounded-full text-xs sm:text-sm transition shadow-lg whitespace-nowrap"
            >
              Jadwalkan Diskusi →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}