import Link from "next/link";
import Image from "next/image";

export default function TentangPage() {
  return (
    <div className="space-y-24 py-12 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-[#007A55] text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200/60 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#007A55] animate-ping" />
            TENTANG GAHARU CREATIVE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Gaharu <span className="text-[#007A55]">Creative</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Agensi Digital 360° yang menghadirkan strategi terintegrasi, transformasi digital, dan pertumbuhan bisnis terukur untuk enterprise, institusi, dan UMKM di seluruh Indonesia.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              href="/kontak" 
              className="bg-[#007A55] hover:bg-[#006244] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 shadow-md shadow-emerald-700/20 hover:-translate-y-0.5"
            >
              Konsultasi Gratis →
            </Link>
            <Link 
              href="/layanan" 
              className="border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300 shadow-sm hover:-translate-y-0.5"
            >
              Lihat Layanan
            </Link>
          </div>
          <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
            <div className="group transition-transform duration-300 hover:scale-105">
              <p className="text-2xl font-extrabold text-[#007A55]">100+</p>
              <p className="text-[11px] text-slate-500 font-medium">Klien Terlayani</p>
            </div>
            <div className="group transition-transform duration-300 hover:scale-105">
              <p className="text-2xl font-extrabold text-[#007A55]">98%</p>
              <p className="text-[11px] text-slate-500 font-medium">Kepuasan Klien</p>
            </div>
            <div className="group transition-transform duration-300 hover:scale-105">
              <p className="text-2xl font-extrabold text-[#007A55]">4+ Thn</p>
              <p className="text-[11px] text-slate-500 font-medium">Pengalaman</p>
            </div>
          </div>
        </div>

        {/* Gambar Hero Menggunakan /Tentang Kami.webp */}
        <div className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 aspect-video lg:aspect-auto lg:h-[420px] shadow-xl shadow-slate-200/50">
          <Image
            src="/Tentang Kami.webp"
            alt="Tim Gaharu Creative"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </section>

      {/* 2. Partner Digital 360 */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
          <span className="text-xs font-semibold text-[#007A55] uppercase tracking-wider">
            REKAPITULASI DEDIKASI
          </span>
          <h2 className="text-3xl font-bold text-slate-900">
            Partner Digital 360° untuk Pertumbuhan Nyata
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Kami tidak hanya membuat desain atau menjalankan kampanye iklan, melainkan merancang ekosistem pertumbuhan digital terpadu berbasis data untuk memastikan keberlanjutan bisnis Anda.
          </p>
        </div>
      </section>

      {/* 3. Cerita Kami */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Gambar Cerita Kami Menggunakan /Tentang Kami-Cerita Kami.webp */}
        <div className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video lg:h-[360px] shadow-lg">
          <Image
            src="/Tentang Kami-Cerita Kami.webp"
            alt="Perjalanan Gaharu Creative"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#007A55] uppercase tracking-wider">PERJALANAN KAMI</span>
            <h2 className="text-3xl font-bold text-slate-900">Cerita Kami</h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Berdiri sejak tahun 2020, Gaharu Creative bermula dari sebuah ide untuk membantu pelaku usaha mengeksekusi kehadiran digital secara lebih terarah. Kami percaya bahwa setiap brand memiliki keunikan narasi yang patut disuarakan dengan strategi visual dan eksekusi yang tepat.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100/80 space-y-1 transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
              <p className="font-bold text-[#007A55] text-sm">Sejak 2020</p>
              <p className="text-xs text-slate-600">Konsisten bertransformasi mengikuti perkembangan tren dan teknologi digital.</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100/80 space-y-1 transition-all duration-300 hover:border-emerald-300 hover:shadow-md">
              <p className="font-bold text-[#007A55] text-sm">Fokus Dampak Nyata</p>
              <p className="text-xs text-slate-600">Meningkatkan nilai merek serta performa penjualan terukur bagi mitra bisnis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Misi & Tujuan */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#007A55] uppercase tracking-wider">FOKUS UTAMA</span>
            <h2 className="text-3xl font-bold text-slate-900">Misi & Tujuan</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Komitmen kami dalam membantu akselerasi dan transformasi digital bisnis di Indonesia.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold text-lg">🚀</div>
              <h3 className="font-bold text-slate-800 text-base">Membantu Skala Bisnis Digital</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Menyediakan fondasi strategi, identitas merek, dan infrastruktur perangkat lunak yang tangguh untuk akselerasi pertumbuhan bisnis.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold text-lg">🎯</div>
              <h3 className="font-bold text-slate-800 text-base">Mendorong Pertumbuhan Terukur</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Memastikan setiap investasi pemasaran dan inovasi produk memberikan imbal hasil (ROI) yang jelas dan berdampak jangka panjang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Nilai Perusahaan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#007A55] uppercase tracking-wider">PRINSIP KERJA</span>
          <h2 className="text-3xl font-bold text-slate-900">Nilai Perusahaan</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Fondasi budaya dan standar kerja tim dalam melayani setiap mitra.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Inovatif & Kreatif", icon: "💡", desc: "Menghadirkan ide-ide segar yang relevan dengan tren dan karakter bisnis mitra." },
            { title: "Integritas & Transparansi", icon: "🛡️", desc: "Keterbukaan alur kerja, penggunaan anggaran, dan pelaporan performa secara jujur." },
            { title: "Berorientasi Hasil", icon: "📈", desc: "Fokus pada pencapaian indikator kinerja utama (KPI) yang disepakati bersama." },
            { title: "Kolaborasi Bersama", icon: "🤝", desc: "Bekerja berdampingan sebagai partner strategis internal bagi bisnis Anda." },
          ].map((val, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg">{val.icon}</div>
              <h3 className="font-bold text-slate-800 text-base">{val.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Tim Inti */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#007A55] uppercase tracking-wider">TALENTA DIBALIK GAHARU</span>
            <h2 className="text-3xl font-bold text-slate-900">Tim Inti</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Profesional berpengalaman di bidang strategi, kreatif, dan teknologi.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Aditya Pratama", role: "Chief Executive Officer", desc: "10+ tahun pengalaman di bidang strategi transformasi bisnis digital." },
              { name: "Nabila Syafiqah", role: "Creative Director", desc: "Pakar strategi brand dan arahan visual multimedia berskala nasional." },
              { name: "Muhammad Rizky", role: "Lead Developer", desc: "Spesialis rekayasa perangkat lunak dan arsitektur sistem cloud." },
              { name: "Ananda Firdaus", role: "Head of Marketing", desc: "Praktisi performance marketing dan analitik corong akuisisi." },
            ].map((member, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm space-y-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                <div className="relative bg-slate-100 h-56 rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/icon-192.png"
                    alt={member.name}
                    fill
                    className="object-cover object-center p-6 opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-[#007A55] transition-colors">{member.name}</h3>
                  <p className="text-[11px] font-semibold text-[#007A55]">{member.role}</p>
                  <p className="text-slate-500 text-xs leading-relaxed pt-1">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Legalitas Perusahaan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#007A55] uppercase tracking-wider">KEPERCAYAAN & HUKUM</span>
          <h2 className="text-3xl font-bold text-slate-900">Legalitas Perusahaan</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Badan usaha resmi terdaftar untuk keamanan kerja sama jangka panjang.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Badan Hukum Resmi", desc: "Terdaftar sebagai badan usaha resmi yang diakui kementerian hukum dan HAM." },
            { title: "Izin Operasional Resmi", desc: "Memiliki kelengkapan NIB dan izin operasional di sektor teknologi dan kreatif." },
            { title: "Kepatuhan Pajak & Administrasi", desc: "Disiplin dalam pemenuhan kewajiban administrasi dan transaksi bisnis transparan." },
          ].map((leg, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold text-sm">✓</div>
              <h3 className="font-bold text-slate-800 text-base">{leg.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{leg.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#007A55] to-emerald-800 rounded-3xl p-10 lg:p-14 text-center text-white space-y-6 shadow-xl shadow-emerald-900/10">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Siap Bekerja Sama dan Mempercepat Pertumbuhan Brand Anda?
            </h2>
            <p className="text-emerald-100 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              Mulai langkah awal transformasi digital bisnis Anda bersama tim profesional Gaharu Creative.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/kontak" 
                className="bg-white text-[#007A55] hover:bg-emerald-50 font-semibold px-8 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-lg hover:scale-105"
              >
                Konsultasi Gratis →
              </Link>
              <Link 
                href="/portofolio" 
                className="border border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:scale-105"
              >
                Lihat Portofolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}