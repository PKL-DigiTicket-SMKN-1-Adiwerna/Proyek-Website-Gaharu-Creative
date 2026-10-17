/* Lima layanan utama. Isi section mengikuti rangka DESAIN.md v2 bagian 5.3:
 * hero, masalah, solusi, deliverables, workflow, FAQ, dan CTA per layanan.
 * Halaman detail merender section hanya kalau datanya ada, jadi menambah layanan
 * baru cukup menambah satu objek di sini.
 *
 * Catatan data: angka klaim (jumlah proyek, sertifikasi, persentase hasil) tidak
 * dipakai di halaman ini karena belum dikonfirmasi pemilik usaha. Yang dipakai
 * hanya deskripsi kerja. Kalau klien mengirim angka resmi, tambahkan di sini.
 */

export const services = [
  {
    slug: "branding",
    tag: "STRATEGI",
    title: "Branding",
    short: "Identitas merek, strategi positioning, dan panduan komunikasi yang siap dipakai tim Anda.",
    hero: {
      eyebrow: "Layanan strategi dan identitas",
      titleBefore: "Branding yang Membangun ",
      accent: "Identitas Bisnis",
      titleAfter: " yang Kuat",
      lede:
        "Logo saja tidak cukup. Kami menyusun identitas yang konsisten, mudah dikenali, dan siap tumbuh, dari strategi sampai aset merek yang bisa langsung dipakai.",
      primary: { label: "Konsultasi Branding", href: "whatsapp" },
      secondary: { label: "Lihat Portofolio", to: "/portofolio" },
    },
    highlights: [
      { value: "Brand guideline", label: "Aturan pakai aset untuk tim dan vendor" },
      { value: "File sumber", label: "AI, EPS, dan SVG siap cetak dan digital" },
    ],
    problems: [
      {
        title: "Identitas Tidak Konsisten",
        body:
          "Visual yang berpindah-pindah, warna tidak selaras, dan gaya komunikasi yang berbeda di tiap kanal membuat brand sulit diingat.",
      },
      {
        title: "Posisi Pasar Kurang Jelas",
        body:
          "Brand tanpa diferensiasi kuat selalu dibandingkan dari harga, sehingga sulit keluar dari perang harga.",
      },
      {
        title: "Brand Recognition Lemah",
        body:
          "Tanpa elemen visual yang khas, biaya promosi yang dikeluarkan harus lebih besar untuk tetap terlihat di benak publik.",
      },
    ],
    solutions: [
      {
        label: "ARAH STRATEGI TERUKUR",
        title: "Brand Strategy",
        body: "Positioning, value proposition, target audiens, dan kerangka pesan yang konsisten.",
      },
      {
        label: "TATA WAJAH VISUAL",
        title: "Logo dan Visual Identity",
        body:
          "Desain logo konseptual, sistem visual, tipografi, dan elemen grafis pendukung untuk semua kanal.",
      },
      {
        label: "ATURAN PAKAI JELAS",
        title: "Brand Guidelines",
        body:
          "Panduan penggunaan logo, sistem warna, tata tulis, proporsi minimum, dan aturan penerapan di setiap media.",
      },
      {
        label: "GAYA KOMUNIKASI",
        title: "Brand Communication Tone",
        body:
          "Perumusan gaya bahasa, pesan prioritas, dan narasi yang selaras dari media sosial sampai materi presentasi.",
      },
    ],
    deliverables: [
      {
        title: "Logo System",
        body: "Logo utama, varian sekunder, ikon favicon, versi monokrom, serta alternatif horizontal dan vertikal.",
        chip: "Logo utama + varian",
      },
      {
        title: "Color Palette",
        body:
          "Kode HEX, RGB, CMYK, dan Pantone untuk warna primer dan sekunder, beserta panduan akurasi cetak dan digital.",
        chip: "Palet warna cetak dan digital",
      },
      {
        title: "Typography",
        body:
          "Font primer dan komplementer lengkap dengan panduan ukuran heading, body, caption, dan batas lisensi.",
        chip: "Skala tipografi",
      },
      {
        title: "Brand Guidelines",
        body:
          "Dokumen panduan siap cetak dan digital untuk tim internal, vendor kreatif, dan desainer agar komunikasi tetap konsisten.",
        chip: "Brand Guidelines PDF",
      },
      {
        title: "Master Brand Assets",
        body:
          "Folder siap pakai berisi file sumber dan format ekspor untuk kop surat, stempel, banner, sampai template media sosial.",
        chip: "Master aset",
      },
    ],
    steps: [
      { label: "TAHAP 01", title: "Discovery", body: "Riset tentang bisnis, nilai, audiens, dan kompetitor untuk menemukan fondasi identitas." },
      { label: "TAHAP 02", title: "Research", body: "Analisis kompetitor, preferensi visual target pasar, dan peluang diferensiasi." },
      { label: "TAHAP 03", title: "Strategy", body: "Perumusan posisi, karakter, dan pesan utama sebelum visual dikerjakan." },
      { label: "TAHAP 04", title: "Design", body: "Eksplorasi logo, sistem visual, sampai penerapan di mockup nyata." },
      { label: "TAHAP 05", title: "Delivery", body: "Final brand guidelines, aset lengkap, dan serah terima untuk dipakai tim Anda." },
    ],
    faqs: [
      {
        q: "Apakah branding sudah termasuk logo?",
        a:
          "Ya. Branding dimulai dari strategi: siapa target konsumen Anda, apa nilai uniknya, dan bagaimana Anda ingin dipersepsikan. Logo adalah visualisasi dari strategi itu.",
      },
      {
        q: "Berapa lama proses pengerjaan branding?",
        a:
          "Umumnya 3 sampai 6 minggu, tergantung jumlah varian aset dan kecepatan umpan balik dari tim Anda.",
      },
      {
        q: "Apakah hasilnya bisa dipakai di semua platform?",
        a:
          "Ya. Setiap aset disiapkan dalam format cetak dan digital, lengkap dengan varian ukuran untuk media sosial, kemasan, dan dokumen internal.",
      },
      {
        q: "Bagaimana kalau brand kami sudah jalan dan butuh rebranding?",
        a:
          "Kami mulai dari audit aset yang ada, lalu menentukan bagian mana yang perlu dipertahankan agar ekuitas merek tidak hilang.",
      },
    ],
    cta: {
      eyebrow: "KONSULTASI EKSKLUSIF",
      title: "Bangun Identitas Brand Anda Sekarang",
      body:
        "Diskusikan kebutuhan merek bisnis Anda bersama tim kami. Kami bantu menyusunnya menjadi aset yang bisa dipakai jangka panjang.",
      primary: "Jadwalkan Konsultasi Gratis",
    },
  },
  {
    slug: "konten",
    tag: "KREATIF",
    title: "Content",
    short: "Perencanaan konten, produksi video dan visual, serta penulisan naskah untuk tiap tahap funnel.",
    hero: {
      eyebrow: "Content strategy dan production",
      titleBefore: "Konten Digital yang ",
      accent: "Relevan dan Menarik",
      titleAfter: "",
      lede:
        "Strategi, penulisan, dan produksi konten yang membuat brand Anda konsisten, relevan, dan hasilnya bisa diukur.",
      primary: { label: "Diskusikan Kebutuhan Konten", href: "whatsapp" },
      secondary: { label: "Lihat Portofolio", to: "/portofolio" },
    },
    highlights: [
      { value: "Kalender 30 hari", label: "Topik, format, dan jadwal tayang per kanal" },
      { value: "Aset siap tayang", label: "Video pendek, carousel, dan caption" },
    ],
    problems: [
      {
        title: "Jadwal Publikasi Tidak Stabil",
        body: "Produksi yang tidak terjadwal membuat audiens kehilangan kebiasaan melihat brand Anda.",
      },
      {
        title: "Interaksi Rendah",
        body: "Pesan yang terlalu keras menjual atau tidak menjawab kebutuhan audiens membuat percakapan sepi.",
      },
      {
        title: "Arah Konten Tidak Jelas",
        body: "Tema konten tidak terhubung dengan kampanye penjualan, sehingga konten banyak dibuat tapi dampaknya tidak terukur.",
      },
    ],
    solutions: [
      {
        label: "LANDASAN",
        title: "Riset Audiens dan Topik",
        body: "Topik diambil dari pertanyaan dan keluhan yang paling sering muncul, bukan dari daftar ide generik.",
      },
      {
        label: "PERENCANAAN",
        title: "Kalender dan Pilar Konten",
        body: "Jadwal tayang, format, dan pilar konten disusun per bulan agar bisa dijalankan tim Anda.",
      },
      {
        label: "PRODUKSI",
        title: "Visual dan Naskah",
        body:
          "Fotografi, video pendek, desain carousel, dan copywriting dikerjakan dalam satu alur kerja yang sama.",
      },
      {
        label: "PENGUKURAN",
        title: "Evaluasi Performa",
        body: "Performa tiap topik ditinjau untuk menentukan arah konten bulan berikutnya.",
      },
    ],
    deliverables: [
      { title: "Content Calendar", body: "Topik, format, tanggal publikasi, dan prioritas konten untuk satu bulan ke depan.", chip: "Kalender editorial" },
      { title: "Copywriting", body: "Caption, pesan naratif, dan headline ajakan yang disesuaikan kebutuhan tiap platform.", chip: "Naskah caption" },
      { title: "Visual Assets", body: "Template desain, feed, carousel, dan aset grafis pendukung kampanye.", chip: "Aset desain" },
      { title: "Short-form Video", body: "Storyboard singkat, naskah hook, dan konsep video pendek untuk Reels atau TikTok.", chip: "Storyboard + naskah" },
      { title: "Performance Report", body: "Ringkasan metrik engagement, jangkauan, dan insight untuk optimasi berikutnya.", chip: "Laporan performa" },
      { title: "Dokumentasi Proses", body: "Catatan keputusan, revisi, dan penamaan aset agar alur kerja mudah dilacak.", chip: "Catatan kerja" },
    ],
    steps: [
      { label: "LANDASAN 01", title: "Riset", body: "Analisis bisnis, audiens, dan kompetitor." },
      { label: "TAHAPAN 02", title: "Perencanaan", body: "Penyusunan kalender, brief, dan pilar konten." },
      { label: "TAHAPAN 03", title: "Produksi", body: "Desain dan copywriting, review internal, validasi brand." },
      { label: "TAHAPAN 04", title: "Review", body: "Revisi terbatas dan persetujuan sebelum tayang." },
      { label: "TAHAPAN 05", title: "Optimasi", body: "Pantau performa, iterasi format dan topik." },
    ],
    faqs: [
      {
        q: "Berapa lama proses dari diskusi sampai konten siap tayang?",
        a:
          "Rata-rata 2 sampai 3 minggu untuk konten bulan pertama, karena masih ada tahap riset dan penyusunan pilar. Bulan berikutnya lebih cepat.",
      },
      {
        q: "Apakah konten bisa disesuaikan dengan gaya brand kami?",
        a: "Ya. Panduan visual dan tone of voice brand Anda jadi acuan utama sebelum produksi dimulai.",
      },
      {
        q: "Kami punya tim desain sendiri, layanan ini tetap cocok?",
        a:
          "Cocok. Kami bisa berhenti di tahap strategi dan kalender, lalu tim Anda yang mengeksekusi desainnya.",
      },
      {
        q: "Bagaimana cara mengukur keberhasilan konten?",
        a:
          "Metrik disepakati di awal, misalnya jangkauan, interaksi, atau jumlah leads dari konten, lalu dilaporkan tiap bulan.",
      },
      {
        q: "Apakah termasuk produksi video pendek?",
        a: "Bisa. Produksi video pendek tersedia sebagai tambahan sesuai kebutuhan dan jadwal pengambilan gambar.",
      },
    ],
    cta: {
      eyebrow: "SIAP BUAT KONTEN BERSAMA?",
      title: "Rencanakan Konten Anda Sekarang",
      body:
        "Susun kalender konten yang bisa dijaga tim Anda, dengan topik yang berhubungan langsung ke penjualan.",
      primary: "Mulai Kolaborasi Konten",
    },
  },
  {
    slug: "social-media",
    tag: "ENGAGEMENT",
    title: "Social Media",
    short: "Pengelolaan kanal sosial, kalender konten, dan interaksi komunitas harian.",
    hero: {
      eyebrow: "Social media management dan growth",
      titleBefore: "Kelola Social Media dengan ",
      accent: "Strategi yang Tepat",
      titleAfter: "",
      lede:
        "Membangun konsistensi konten, menaikkan interaksi, dan menjaga komunikasi brand tetap selaras dengan target bisnis Anda.",
      primary: { label: "Konsultasi Social Media", href: "whatsapp" },
      secondary: { label: "Lihat Portofolio", to: "/portofolio" },
    },
    highlights: [
      { value: "Jadwal terjaga", label: "Ritme posting yang realistis dijalankan" },
      { value: "Desain sesuai brand", label: "Aset visual mengikuti panduan identitas" },
      { value: "Laporan berkala", label: "Ringkasan performa dan rekomendasi" },
    ],
    problems: [
      {
        title: "Postingan Tidak Teratur",
        body: "Frekuensi yang tidak menentu membuat jangkauan organik turun dan audiens melupakan brand.",
      },
      {
        title: "Interaksi Rendah",
        body: "Konten yang kurang relevan membuat audiens jarang berkomentar atau membagikan.",
      },
      {
        title: "Komunikasi Brand Tidak Konsisten",
        body: "Tanpa panduan visual dan tone of voice, setiap platform terlihat seperti brand yang berbeda.",
      },
    ],
    solutions: [
      { label: "PENDEKATAN TERPADU", title: "Platform Strategy", body: "Penentuan kanal prioritas, pendekatan audiens, dan ritme posting yang tepat." },
      { label: "PERENCANAAN", title: "Editorial Calendar", body: "Rencana konten 30 hari ke depan: tema, format, dan jadwal tayang." },
      { label: "INTERAKSI", title: "Community Management", body: "Membalas komentar dan pesan, memicu percakapan, dan menjaga sentimen tetap positif." },
      { label: "DISTRIBUSI", title: "Content Distribution", body: "Penyebaran konten ke kanal pendukung agar jangkauannya lebih luas." },
    ],
    quote: {
      label: "HASIL YANG DIHARAPKAN",
      body: "Kami tidak hanya menambah jumlah posting. Yang dibangun adalah sistem yang menghasilkan kepercayaan dan pertumbuhan.",
    },
    deliverables: [
      { title: "Monthly Content Calendar", body: "Perencanaan konten 30 hari: topik, format, dan jadwal tayang per kanal.", chip: "Kalender bulanan" },
      { title: "Post Designs", body: "Aset visual siap tayang untuk feed, carousel, dan stories sesuai identitas brand.", chip: "Aset feed" },
      { title: "Captions dan Copywriting", body: "Teks caption dengan hook, ajakan, dan hashtag yang relevan.", chip: "Naskah caption" },
      { title: "Publishing Schedule", body: "Jadwal publikasi terjadwal agar konsisten dan tepat waktu.", chip: "Jadwal tayang" },
      { title: "Analytics Report", body: "Laporan performa bulanan: insight, rekomendasi, dan metrik pertumbuhan.", chip: "Laporan bulanan" },
    ],
    qualityNote:
      "Setiap konten yang keluar dari tim kami melewati pemeriksaan internal: kesesuaian identitas visual, ketepatan ejaan, dan kelayakan tayang.",
    steps: [
      { label: "01", title: "Audit Akun dan Kompetitor", body: "Pemetaan kondisi awal: performa konten, analisis kompetitor, dan positioning untuk menentukan arah." },
      { label: "02", title: "Strategi dan Pilar Konten", body: "Perumusan pilar konten, tone of voice, dan format prioritas." },
      { label: "03", title: "Produksi dan Review", body: "Produksi visual dan copywriting, penjadwalan, lalu persetujuan Anda sebelum tayang." },
      { label: "04", title: "Publishing dan Management", body: "Penjadwalan, interaksi dengan audiens, dan pemantauan komunitas harian." },
      { label: "05", title: "Evaluasi dan Optimasi", body: "Analisis performa bulanan, laporan insight, dan iterasi konten berdasarkan hasil." },
    ],
    faqs: [
      {
        q: "Apakah bisa mengelola beberapa platform sekaligus?",
        a:
          "Ya. Kami menangani Instagram, TikTok, LinkedIn, dan Facebook dengan jadwal yang tetap selaras.",
      },
      {
        q: "Seberapa jauh kalender konten dibuat ke depannya?",
        a: "Kalender disusun per bulan, dengan gambaran tema besar untuk kuartal berikutnya.",
      },
      {
        q: "Bagaimana cara menentukan topik konten untuk kami?",
        a:
          "Topik diambil dari pertanyaan pelanggan, kata kunci pencarian, dan performa konten sebelumnya, lalu dibahas bersama tim Anda.",
      },
      {
        q: "Apakah ada laporan analitik tiap periode?",
        a: "Ya, laporan performa bulanan berisi metrik utama dan rekomendasi tindak lanjut.",
      },
      {
        q: "Apakah sudah termasuk community management?",
        a: "Ya, termasuk pembalasan komentar dan pesan langsung pada jam kerja.",
      },
    ],
    cta: {
      eyebrow: "HUBUNGI TIM SOCIAL MEDIA",
      title: "Kembangkan Social Media Bisnis Anda Bersama Tim Kami",
      body: "Bangun kehadiran yang konsisten, interaksi yang naik, dan komunitas yang tumbuh.",
      primary: "Mulai Diskusi Konten",
    },
  },
  {
    slug: "performance-marketing",
    tag: "TERUKUR",
    title: "Performance Marketing",
    short: "Iklan berbayar berbasis data untuk leads, penjualan, dan biaya akuisisi yang terukur.",
    hero: {
      eyebrow: "Paid advertising berbasis data",
      titleBefore: "Performance Marketing Berbasis ",
      accent: "Data dan Hasil",
      titleAfter: "",
      lede:
        "Strategi iklan berbayar yang terukur dan dioptimalkan berkala untuk menaikkan konversi dan menjaga efisiensi biaya akuisisi.",
      primary: { label: "Mulai Strategi Kampanye", href: "whatsapp" },
      secondary: { label: "Lihat Portofolio", to: "/portofolio" },
    },
    highlights: [
      { value: "Pelacakan granular", label: "Event dan pixel disiapkan sejak awal" },
      { value: "Laporan mingguan", label: "Keputusan optimasi ditulis, bukan cuma tangkapan layar" },
      { value: "Metrik disepakati", label: "Angka sasaran dibahas sebelum anggaran jalan" },
    ],
    showKpi: true,
    problems: [
      {
        title: "Anggaran Habis Tanpa Konversi",
        body: "Iklan berjalan tanpa target audiens yang jelas dan tanpa pelacakan, sehingga biaya cepat habis tanpa hasil.",
      },
      {
        title: "Lead Berkualitas Rendah",
        body: "Traffic masuk tetapi tidak sesuai kebutuhan pelanggan, sehingga tim sales bekerja tidak efektif.",
      },
      {
        title: "Kinerja Kampanye Tidak Jelas",
        body: "Sulit menentukan kampanye mana yang efektif karena data yang terkumpul tidak lengkap.",
      },
    ],
    solutions: [
      { label: "Goal, Audience, Channel", title: "Strategi Kampanye yang Terukur", body: "Menetapkan tujuan (awareness, lead, penjualan, atau traffic) dan menyusun funnel berdasarkan data historis." },
      { label: "Meta, Google, TikTok Ads", title: "Paid Advertising yang Sistematis", body: "Menyusun struktur kampanye, penargetan, dan strategi bidding agar anggaran bekerja maksimal." },
      { label: "Segmentasi Audiens", title: "Penargetan yang Tepat", body: "Membangun segmen dari perilaku dan minat, termasuk pemanfaatan data first-party untuk retargeting." },
      { label: "Event dan API Pixel", title: "Pelacakan Konversi", body: "Menyiapkan event view, add-to-cart, lead form, dan purchase, plus integrasi pixel server-side." },
      { label: "Iterasi Mingguan", title: "Optimasi Berkelanjutan", body: "Pengujian materi iklan berkala untuk menaikkan CTR dan menurunkan biaya per hasil." },
      { label: "Insight dan Aksi", title: "Laporan yang Mudah Dibaca", body: "Ringkasan performa dan rekomendasi tindak lanjut yang bisa langsung diputuskan tim Anda." },
    ],
    deliverables: [
      { title: "Strategi dan Struktur Kampanye", body: "Dokumen tujuan, funnel, pembagian anggaran, dan struktur kampanye per kanal.", chip: "Rencana kampanye" },
      { title: "Setup Pelacakan", body: "Pemasangan pixel, event, dan integrasi data untuk mengukur hasil secara akurat.", chip: "Dokumentasi pelacakan" },
      { title: "Materi Iklan", body: "Penulisan naskah dan arahan visual untuk variasi materi yang diuji.", chip: "Materi uji" },
      { title: "Optimasi Berkala", body: "Penyetelan audiens, penawaran, dan materi berdasarkan hasil tiap pekan.", chip: "Catatan optimasi" },
      { title: "Laporan Performa", body: "Ringkasan mingguan dan bulanan berisi metrik utama serta langkah berikutnya.", chip: "Laporan performa" },
    ],
    kpi: {
      caption: "Ilustrasi bentuk laporan. Angka di bawah ini contoh tampilan, bukan hasil klien.",
      cards: [
        { title: "Tren Konversi", subtitle: "Jumlah konversi mingguan", badge: "Contoh tampilan", bars: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"] },
        { title: "Biaya per Hasil (CPA/CPL)", subtitle: "Pengeluaran biaya per hasil kampanye", badge: "Contoh tampilan", bars: ["Awal", "B-01", "B-02", "B-03", "Setelah"] },
      ],
    },
    steps: [
      { label: "01 AUDIT", title: "Cek Akun Iklan dan Pelacakan", body: "Meninjau akun iklan, analytics, dan pemasangan pixel sebelum anggaran jalan." },
      { label: "02 PLANNING", title: "Strategi dan Struktur Kampanye", body: "Menyusun funnel, pilihan kanal, dan pembagian anggaran." },
      { label: "03 LAUNCH", title: "Peluncuran dan Validasi", body: "Menayangkan set iklan awal, menguji materi, dan memastikan event konversi terekam." },
      { label: "04 OPTIMIZATION", title: "Penyetelan Berkala", body: "Menyesuaikan materi, audiens, dan bidding sesuai data yang masuk." },
      { label: "05 REPORTING", title: "Laporan dan Rekomendasi", body: "Ringkasan performa dan usulan langkah berikutnya." },
    ],
    faqs: [
      {
        q: "Berapa lama hasil kampanye mulai terlihat?",
        a:
          "Fase pembelajaran awal biasanya 7 sampai 14 hari kerja, saat algoritma mencari pola audiens. Hasil lebih stabil umumnya terlihat di minggu ketiga dan keempat.",
      },
      {
        q: "Apakah setup pelacakan sudah termasuk?",
        a: "Ya, termasuk pemasangan pixel, event, dan integrasi data yang dibutuhkan untuk mengukur konversi.",
      },
      {
        q: "Kampanye apa yang cocok untuk bisnis saya?",
        a:
          "Ditentukan setelah melihat data historis dan tujuan bisnis Anda. Kami usulkan kanal dan bentuk kampanye beserta alasannya.",
      },
      {
        q: "Bisa mulai dari satu kanal saja?",
        a: "Bisa. Banyak klien mulai dari satu kanal yang paling dekat dengan pelanggannya, lalu menambah kanal lain.",
      },
      {
        q: "Bagaimana format laporan kinerjanya?",
        a: "Laporan mingguan singkat dan rangkuman bulanan, berisi metrik utama, keputusan yang diambil, dan rekomendasi.",
      },
    ],
    cta: {
      eyebrow: "OPTIMASI ANGGARAN IKLAN",
      title: "Optimalkan Performa Kampanye Anda Sekarang",
      body:
        "Diskusikan tantangan akuisisi Anda bersama tim kami. Kami susun rencana kampanye yang dirancang untuk profitabilitas.",
      primary: "Konsultasi Strategi Iklan",
    },
  },
  {
    slug: "pengembangan-produk-digital",
    tag: "PRODUK",
    title: "Digital Product Development",
    short: "Pengembangan website, aplikasi web, dan platform digital beserta perawatan setelah rilis.",
    hero: {
      eyebrow: "Web dan software engineering",
      titleBefore: "Solusi Digital untuk ",
      accent: "Kebutuhan Bisnis",
      titleAfter: " Anda",
      lede:
        "Dari tahap eksplorasi ide, perancangan arsitektur, sampai rilis produk yang siap dipakai dan mudah dirawat.",
      primary: { label: "Konsultasi Produk Digital", href: "whatsapp" },
      secondary: { label: "Lihat Portofolio", to: "/portofolio" },
    },
    highlights: [
      { value: "Spesifikasi tertulis", label: "Ruang lingkup disepakati sebelum koding" },
      { value: "Kode terversi", label: "Repositori Git diserahkan ke klien" },
      { value: "Panduan serah terima", label: "Dokumentasi untuk tim internal" },
    ],
    problems: [
      {
        title: "Website Ketinggalan Zaman",
        body: "Lambat, tidak nyaman di ponsel, dan sulit ditemukan di mesin pencari, sehingga calon klien pindah ke kompetitor.",
      },
      {
        title: "Alur Kerja Tidak Efisien",
        body: "Proses masih manual, data tersebar di banyak tempat, dan rekap memakan waktu lama.",
      },
      {
        title: "Pengalaman Digital Buruk",
        body: "Navigasi membingungkan, alur registrasi tidak jelas, dan pengunjung cepat keluar.",
      },
    ],
    solutions: [
      { label: "SOLUSI 01", title: "Company Profile Website", body: "Struktur konten terarah, desain sesuai identitas brand, dan optimasi SEO dasar." },
      { label: "SOLUSI 02", title: "Landing Page", body: "Naskah persuasif, tata letak fokus, dan komponen ajakan yang jelas untuk mempercepat akuisisi." },
      { label: "SOLUSI 03", title: "Web Application", body: "Portal klien, sistem back-office internal, sampai aplikasi berbasis login." },
      { label: "SOLUSI 04", title: "Platform Digital", body: "Marketplace atau platform multi-peran dengan manajemen pengguna, katalog, dan alur transaksi." },
    ],
    deliverables: [
      { title: "Discovery", body: "Pemetaan kebutuhan, analisis audiens, dan ruang lingkup proyek.", chip: "Spesifikasi kebutuhan" },
      { title: "Wireframe", body: "Kerangka awal setiap halaman untuk menyepakati alur sebelum desain visual.", chip: "Prototipe alur" },
      { title: "UI Design", body: "Desain antarmuka lengkap dengan sistem komponen dan panduan responsif.", chip: "Komponen dan token desain" },
      { title: "Development", body: "Implementasi front-end dan back-end dengan versi kode di Git dan dokumentasi teknis.", chip: "Repositori kode" },
      { title: "Testing dan Deployment", body: "Pengujian fungsi, performa, keamanan, dan tampilan di berbagai ukuran layar, lalu deploy ke server produksi.", chip: "Produksi live" },
      { title: "Serah Terima", body: "Panduan penggunaan, akses akun, dan pendampingan untuk tim internal.", chip: "Panduan serah terima" },
    ],
    steps: [
      { label: "TAHAP 01", title: "Discovery", body: "Memetakan kebutuhan dan ruang lingkup. Perkiraan waktu 1 sampai 2 minggu." },
      { label: "TAHAP 02", title: "UI/UX Design", body: "Alur pengguna, wireframe, dan desain antarmuka. Perkiraan waktu 2 sampai 3 minggu." },
      { label: "TAHAP 03", title: "Development", body: "Implementasi dan integrasi. Perkiraan waktu 4 sampai 8 minggu." },
      { label: "TAHAP 04", title: "Testing dan QA", body: "Pengujian fungsi, performa, dan keamanan. Perkiraan waktu 1 minggu." },
      { label: "TAHAP 05", title: "Deploy dan Support", body: "Peluncuran, pemantauan, dan perbaikan lanjutan sesuai kesepakatan." },
    ],
    faqs: [
      {
        q: "Berapa lama proses pengembangan produk digital?",
        a:
          "Website company profile umumnya 4 sampai 8 minggu. Aplikasi web dengan login dan integrasi bisa lebih lama, tergantung ruang lingkup.",
      },
      {
        q: "Bisa menangani dari nol sampai rilis?",
        a: "Ya, mulai dari spesifikasi kebutuhan, desain, pengembangan, pengujian, sampai peluncuran.",
      },
      {
        q: "Apakah ada iterasi dan revisi desain?",
        a: "Ada. Jumlah putaran revisi disepakati di awal supaya jadwal tetap terjaga.",
      },
      {
        q: "Apakah hasil kerja bisa dilanjutkan tim internal kami?",
        a: "Ya. Kode dan dokumentasi diserahkan lengkap, termasuk akses repositori dan panduan penggunaan.",
      },
      {
        q: "Bagaimana cara memulai proyek?",
        a: "Kirim kebutuhan singkat lewat formulir atau WhatsApp. Kami balas dengan pertanyaan lanjutan dan gambaran tahapan.",
      },
    ],
    cta: {
      eyebrow: "MULAI PROYEK DIGITAL ANDA",
      title: "Siap Membangun Solusi Digital yang Sesuai Kebutuhan Bisnis?",
      body:
        "Diskusikan target, tantangan, dan prioritas Anda. Kami bantu menyusun rencana pengembangan yang jelas dari sisi biaya dan waktu.",
      primary: "Diskusikan Proyek Digital",
    },
  },
];

/* Empat poin alasan memilih Gaharu. Isinya dari DESAIN.md v2 bagian 5.2. */
export const whyChooseUs = [
  {
    icon: "team",
    title: "Tim Berpengalaman",
    label: "Kolaborasi strategi hingga eksekusi",
    detail: "Alur kerja dan titik persetujuan ditulis di awal, jadi Anda tahu proyek sedang di tahap mana.",
  },
  {
    icon: "chart",
    title: "Strategi Berbasis Data",
    label: "Keputusan dari insight",
    detail: "Tujuan bisnis dipetakan ke metrik yang bisa dibaca tiap bulan, bukan laporan tebal tanpa angka.",
  },
  {
    icon: "tech",
    title: "Teknologi yang Tepat",
    label: "Alat dan praktik sesuai kebutuhan",
    detail: "Perangkat kerja dipilih berdasarkan kebutuhan proyek, bukan karena sedang populer.",
  },
  {
    icon: "target",
    title: "Hasil Terukur",
    label: "Transparansi progres",
    detail: "Setiap program punya evaluasi berkala supaya dampaknya bisa dilihat dan disesuaikan.",
  },
];

/* Pemetaan slug rute ke nama layanan, dipakai di menu dan tautan internal. */
export const serviceSlugs = services.map((service) => service.slug);
