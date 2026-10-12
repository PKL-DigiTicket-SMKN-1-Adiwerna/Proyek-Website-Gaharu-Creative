# DESAIN.md — Website Gaharu Creative

Dokumen ini adalah konversi dari file wireframe `Desain Gaharu Creative.pdf` (6 halaman) menjadi spesifikasi desain tertulis. Versi ini **masih tanpa warna** (hitam, putih, abu) sesuai wireframe asli. Pewarnaan menyusul di tahap berikutnya.

**Versi:** diperbarui mengikuti wireframe terbaru (`Desain Gaharu Creative (1).pdf`). Ringkasan perubahan ada di bagian 7.

---

## 1. Ringkasan

| Item | Isi |
|---|---|
| Brand | Gaharu Creative |
| Tagline | Konsultan & Eksekutor 360° Digital Agency |
| Jenis situs | Company profile agensi digital |
| Bahasa | Indonesia (ada pemilih bahasa `ID` di navbar) |
| Tahun berdiri | 2020 |
| Jumlah halaman | 6: Beranda, Tentang, Layanan, Portofolio, Insight, Kontak |
| Tujuan utama | Mengarahkan pengunjung ke **Konsultasi Gratis** / **Hubungi Kami** |

---

## 2. Design Tokens

### 2.1 Warna (tahap wireframe, tanpa warna)

| Peran | Warna | Pemakaian |
|---|---|---|
| Background utama | Putih | Halaman, navbar, kartu |
| Teks utama | Hitam | Judul, isi, tombol terisi |
| Teks sekunder | Abu tua | Subjudul, deskripsi, label kecil |
| Garis/border | Abu muda | Border kartu, pemisah section, field form |
| Placeholder | Abu terang | Kotak gambar, banner, peta, foto profil |
| Tombol navbar | Abu | Tombol "Hubungi Kami" |

Catatan: pewarnaan ditunda. Saat nanti dimulai, semua peran di atas sebaiknya dijadikan variabel warna di Figma agar mudah diganti sekaligus.

### 2.2 Gaya tombol dan elemen (tanpa warna)

| Elemen | Tampilan di wireframe |
|---|---|
| Tombol primer (Konsultasi Gratis, Minta Penawaran, Kirim Pesan, Berlangganan) | Terisi hitam, teks putih |
| Tombol sekunder (Lihat Portofolio, Lihat Layanan) | Outline hitam tipis, latar putih, teks hitam |
| Tombol navbar (Hubungi Kami) | Terisi abu, teks hitam |
| Ikon (lingkaran) | Ikon hitam di lingkaran abu muda |
| Tag kategori | Label kecil berlatar abu muda |

### 2.3 Tipografi

- Jenis huruf: sans-serif modern (wireframe tampak memakai gaya Roboto/Inter; pilih satu dan pakai konsisten).
- Hierarki yang terlihat di wireframe:
  - **H1**: judul hero (mis. "Portofolio", "Insight"), tebal dan besar
  - **H2**: judul section (mis. "5 Layanan Utama"), tebal, rata tengah
  - **Subjudul**: satu kalimat ringkas di bawah H2, ukuran kecil, rata tengah
  - **Judul kartu**: tebal, ukuran sedang
  - **Label kecil**: kategori/tag, ukuran terkecil

### 2.4 Spasi dan bentuk

- Layout rata tengah untuk header section, dengan konten dibatasi lebar maksimum.
- Section dipisahkan garis tipis horizontal dan ruang kosong yang lega.
- Kartu: sudut membulat sedang, border tipis, tanpa bayangan besar.
- Tombol: sudut membulat kecil, dua gaya (terisi dan outline).

---

## 3. Komponen Global

### 3.1 Navbar (di semua halaman)

- Kiri: logo lingkaran + teks **Gaharu Creative**
- Tengah: `Beranda` · `Tentang` · `Layanan` · `Portofolio` · `Insight` · `Kontak`
- Kanan: pemilih bahasa `ID` (ikon globe + dropdown) dan tombol **Hubungi Kami**
- Item menu aktif sebaiknya diberi penanda (mis. garis bawah).

### 3.2 Footer (di semua halaman)

Isi umum (rata tengah, beberapa baris):

- Gaharu Creative
- Layanan: Branding, Content, Social Media, Performance Marketing, Digital Product Development
- Kontak: (021) 0000 0000 | hello@gaharukreatif.id
- Jam Operasional: Senin–Jumat 09.00–17.00 WIB
- Media Sosial: Instagram | LinkedIn | X
- © 2020–2026 Gaharu Creative. Semua hak dilindungi.

Tautan tambahan di footer halaman Portofolio dan Kontak: Kebijakan Privasi | Syarat & Ketentuan | Karier.

### 3.3 Banner CTA penutup

Kotak lebar placeholder di atas footer, berisi judul ajakan dan indikator carousel (3 titik) di bawahnya. Judulnya berbeda per halaman (lihat bagian halaman).

### 3.4 Tombol

| Jenis | Tampilan | Contoh label |
|---|---|---|
| Primer | Terisi | Konsultasi Gratis, Minta Penawaran, Ajukan Konsultasi, Kirim Pesan, Berlangganan |
| Sekunder | Outline | Lihat Portofolio, Lihat Layanan |
| Navbar | Terisi kecil | Hubungi Kami |

### 3.5 Kartu

- **Kartu horizontal** (gambar kecil di kiri, teks di kanan): dipakai di blok pengantar dan filter kategori.
- **Kartu vertikal** (gambar besar di atas, teks di bawah): dipakai untuk layanan, studi kasus, artikel, dan tim.
- **Tag kategori**: label kecil di pojok kiri atas gambar (mis. Strategi, UMKM, Digital Marketing).

---

## 4. Halaman

### 4.1 Beranda

**Hero**
- Judul: Gaharu Creative
- Subjudul: Konsultan & Eksekutor 360° Digital Agency
- Tombol: Lihat Portofolio (sekunder), Konsultasi Gratis (primer)
- Kanan: kotak gambar placeholder besar

**Section: Partner Digital 360° untuk Pertumbuhan Bisnis Anda**
- Label: 360° Digital Agency
- Dua kartu horizontal:
  1. *Partner Digital 360° untuk Pertumbuhan Bisnis Anda*: "Kami membantu bisnis dari strategi hingga eksekusi: branding, konten, social media, performance marketing, dan pengembangan produk digital agar hasilnya terukur dan berkelanjutan." Tag: 360° Digital Agency.
  2. *Visual / Gambar*: area placeholder gambar besar untuk komunikasi layanan menyeluruh (mis. kolase tim dan kanal digital).

**Section: 5 Layanan Utama**
- Subjudul: Layanan yang saling terhubung untuk pertumbuhan bisnis Anda.
- Grid 3 + 2 kartu vertikal (ikon/logo monokrom sebagai placeholder):

| Tag | Layanan | Deskripsi singkat |
|---|---|---|
| Strategi | Branding | Identitas merek, strategi positioning, dan panduan komunikasi |
| Kreatif | Content | Perencanaan konten, produksi, dan optimasi untuk tiap tahap funnel |
| Engagement | Social Media | Kampanye organik, kalender konten, dan pengelolaan komunitas |
| Terukur | Performance Marketing | Iklan berbayar berbasis data untuk leads, penjualan, dan retensi |
| Produk | Digital Product Development | Pengembangan produk digital, landing page, dan optimasi pengalaman pengguna |

Baris kedua hanya 2 kartu, masing-masing lebih lebar.

**Section: Sejak 2020 — Fokus pada hasil yang konsisten**
- Subjudul: Ringkasan pencapaian Gaharu Creative.
- 3 kartu statistik:

| Label | Nilai |
|---|---|
| Tahun Berdiri | Sejak 2020 |
| Klien | 100+ Klien |
| Proyek | 500+ Proyek |

**Section: Dipercaya oleh berbagai klien di seluruh Indonesia**
- Subjudul: Placeholder logo klien (monokrom).
- 5 logo klien (ikon lingkaran + teks "Logo Klien 1" sampai "Logo Klien 5")

**Section: Portofolio Unggulan**
- Subjudul: Contoh proyek berdasarkan kategori industri.
- 3 kartu proyek:

| Tag | Badge hasil | Judul |
|---|---|---|
| UMKM | Hasil: Leads & transaksi meningkat | Kampanye konten & iklan untuk meningkatkan penjualan |
| Korporat | Hasil: Awareness naik & pipeline lebih berkualitas | Rebranding dan strategi komunikasi multi channel |
| Pemerintah | Hasil: Kinerja layanan membaik & adopsi meningkat | Penguatan layanan digital dan optimasi landing page |

**Section: Testimoni Klien**
- Subjudul: Pengalaman klien terhadap kerja sama dengan Gaharu Creative.
- Kartu testimoni: Nama Klien — Perusahaan/Instansi
- Kutipan: "Gaharu Creative membantu kami menyusun strategi 360° yang jelas dan dieksekusi dengan rapi. Hasilnya terlihat dari meningkatnya kualitas leads dan konsistensi performa kampanye. Komunikasinya juga responsif sejak tahap perencanaan sampai evaluasi."

**Banner CTA:** Siap Mengembangkan Bisnis Anda?

---

### 4.2 Layanan

Halaman ini **tidak memiliki hero** dan langsung dimulai dari section "5 Layanan Utama" tepat di bawah navbar.

**Section: 5 Layanan Utama**
- Subjudul: Lima layanan yang saling terhubung untuk mendorong pertumbuhan bisnis Anda.
- Tombol: Konsultasi Gratis, Minta Penawaran
- Grid 3 + 2 kartu. Setiap kartu memakai format **Problem → Solusi → Deliverables**:

| Tag | Layanan | Problem | Solusi | Deliverables |
|---|---|---|---|---|
| Brand | Branding | Identitas brand belum jelas | Bangun brand yang kuat dan konsisten | Logo, visual identity, brand guidelines |
| Kreatif | Content | Konten tidak berkualitas dan tidak relevan | Buat konten yang relevan, menarik, dan konsisten | Social media content, copywriting, visual content |
| Engagement | Social Media | Social media tidak dikelola secara efektif | Kelola dengan strategi dan ritme yang tepat | Content planning, publishing, engagement |
| Terukur | Performance Marketing | Iklan tidak menghasilkan performa yang terukur | Advertising berbasis data untuk mencapai target bisnis | Campaign strategy, ads optimization, reporting |
| Produk | Digital Product Development | Bisnis membutuhkan produk digital yang efektif | Kembangkan produk digital yang berguna dan scalable | Website, web application, digital platform |

**Section: Kenapa Memilih Gaharu**
- Subjudul: Pendekatan yang memastikan strategi jelas, eksekusi rapi, dan dampak dapat diukur.
- 4 poin (ikon di lingkaran + judul + label kecil + deskripsi):

| Judul | Label | Deskripsi |
|---|---|---|
| Tim Berpengalaman | Kolaborasi strategi hingga eksekusi | Proses berjalan dengan alur kerja yang jelas dan komunikasi yang responsif. |
| Strategi Berbasis Data | Keputusan dari insight | Kami menyelaraskan tujuan bisnis dengan metrik yang relevan untuk tiap tahap. |
| Teknologi Terdepan | Alat & praktik yang tepat | Menggunakan pendekatan modern untuk mempercepat produksi dan memaksimalkan performa. |
| Hasil Terukur | Transparansi progres | Pelaporan dan evaluasi membantu Anda melihat dampak dari setiap program. |

**Banner CTA:** Diskusikan Kebutuhan Anda

---

### 4.3 Portofolio

**Hero**
- Judul: Portofolio
- Subjudul: Studi kasus, hasil, dan karya terbaru.
- Tombol: Lihat Layanan, Ajukan Konsultasi
- Chip filter: Semua · UMKM · Korporat · Pemerintah
- Kanan: kotak gambar placeholder besar

**Section: Filter Cepat**
- Subjudul: Pilih kategori untuk melihat studi kasus yang relevan.
- 4 kartu horizontal, masing-masing dengan ikon pencarian:

| Kategori | Deskripsi |
|---|---|
| Semua | Menampilkan seluruh proyek 360° yang pernah dikerjakan. |
| UMKM | Fokus pada peningkatan visibilitas, leads, dan penjualan untuk bisnis lokal. |
| Korporat | Strategi kampanye dan konten terintegrasi untuk brand berskala lebih besar. |
| Pemerintah | Kampanye layanan publik dengan pendekatan komunikasi yang jelas dan terukur. |

**Section: Studi Kasus Terbaru**
- Subjudul: 6 proyek pilihan dengan KPI terukur. Silakan klik untuk melihat detail.
- Grid 3 × 2 kartu vertikal:

| Tag | Judul | Ringkasan |
|---|---|---|
| UMKM | Kopi Nusantara 360° | Dari kampanye digital hingga optimasi konversi untuk meningkatkan pembelian |
| Korporat | Gaharu Cloud Launch | Penguatan awareness dan penanganan funnel dari iklan ke lead |
| Pemerintah | Program Literasi Digital | Kampanye informasi berbasis konten dan distribusi kanal yang terukur |
| UMKM | Skincare Lokal Go-Online | Perencanaan konten, optimasi performa, dan strategi retargeting |
| Korporat | Rebranding Kampanye Q2 | Rangkaian aset kreatif dan strategi kampanye multikanal |
| Pemerintah | Layanan Publik Mobile | Komunikasi layanan publik dengan fokus edukasi dan adopsi |

**Banner CTA:** Punya Proyek Serupa? — Gaharu Creative dapat membantu dari strategi 360°, produksi konten, hingga optimasi performa berbasis data agar hasilnya jelas dan terukur.

---

### 4.4 Tentang

**Hero**
- Judul: Gaharu Creative
- Subjudul: Agensi Digital 360° • Berbasis di Indonesia
- Tombol: Konsultasi Gratis
- Kanan: kotak gambar placeholder besar

**Banner pengantar**
- Judul: Tentang Gaharu Creative — Partner Digital 360°
- Deskripsi: Gaharu Creative membantu brand tumbuh melalui strategi, desain, pengembangan, pemasaran, hingga optimasi berkelanjutan, dengan pendekatan digital 360° yang terukur.

**Section: Cerita Kami**
- Gambar kecil di kiri, teks di kanan
- Deskripsi: Perjalanan dimulai sejak 2020, berkembang menjadi tim yang fokus pada hasil dan kolaborasi.
- Tombol: Unduh Company Profile, Lihat Layanan
- Dua kartu horizontal:
  1. **Sejak 2020** (Awal mula & komitmen): berdiri pada 2020 dengan tujuan menghadirkan layanan digital yang menyeluruh namun tetap relevan untuk kebutuhan brand. Setiap tahap, dari riset hingga eksekusi, harus terhubung agar strategi tidak berhenti di dokumen.
  2. **Fokus pada dampak nyata** (Bukan sekadar tampilan): membangun website, kampanye, dan sistem digital yang mendukung pertumbuhan, meliputi visibilitas, positioning, leads, dan engagement, diukur lewat metrik jelas dan dievaluasi berkala.

**Section: Misi & Tujuan**
- Deskripsi: Dua arah yang saling melengkapi: bagaimana kami bekerja (misi) dan apa yang ingin dicapai (tujuan).
- Tombol: Diskusikan Kebutuhan Anda
- Dua kolom dengan ikon:
  - **Misi** (Memberi nilai melalui eksekusi digital 360°): Menyusun strategi yang relevan, merancang pengalaman digital yang jelas, membangun sistem yang stabil, serta menjalankan kampanye yang terukur.
  - **Tujuan** (Mendorong pertumbuhan yang berkelanjutan): Membantu brand meningkatkan awareness, menghasilkan leads, meningkatkan konversi, dan menjaga performa melalui optimasi rutin.

**Section: Nilai Perusahaan**
- Subjudul: Prinsip kerja yang menuntun setiap proyek, dari perencanaan sampai pengukuran hasil.
- 4 kartu horizontal sempit:

| Nilai | Deskripsi |
|---|---|
| Kreatif & Inovatif | Menghasilkan ide dan solusi yang tidak monoton, tetap relevan dengan kebutuhan audiens. |
| Kolaboratif & Profesional | Bekerja dengan ritme komunikasi yang jelas, menghargai masukan, dan menepati standar kualitas. |
| Berorientasi Hasil | Setiap keputusan didukung data, proses dievaluasi, dan keluaran diukur sesuai target. |
| Integritas & Transparansi | Bersikap jujur terhadap ruang lingkup, risiko, dan progres agar ekspektasi selaras. |

**Section: Tim Inti**
- Subjudul: Peran kunci yang memastikan kualitas strategi, kreativitas, pemasaran, dan teknis berjalan seimbang.
- 4 kartu dengan foto profil bulat (placeholder):

| Peran | Deskripsi |
|---|---|
| CEO & Founder | Arah strategi bisnis dan pengambilan keputusan. |
| Creative Director | Visi kreatif, kualitas desain, dan konsistensi brand. |
| Marketing Specialist | Perencanaan kampanye, optimasi kanal, dan performa. |
| Tech Lead | Arsitektur, pengembangan, dan keandalan sistem digital. |

**Section: Legalitas**
- Subjudul: Dokumen/informasi penting untuk meningkatkan kepercayaan dalam kerja sama.
- 3 poin dengan ikon:

| Judul | Label | Deskripsi |
|---|---|---|
| Dokumen Perusahaan | Identitas legal | CV/Perizinan & data pendukung perusahaan |
| Kelengkapan Kontrak | Alur kerja & SLA | Skema kerja, ruang lingkup, dan ketentuan layanan |
| Kebijakan Privasi & Keamanan | Aturan pengelolaan data | Prosedur keamanan dan penggunaan data klien |

**Banner CTA:** Siap Bekerja Sama? — tombol Konsultasi Gratis. Ceritakan kebutuhan Anda. Tim Gaharu Creative akan merespons dengan analisis awal dan rekomendasi langkah berikutnya.

**Footer khusus halaman ini:** Alamat, Email, Telepon/WhatsApp (masih placeholder), Menu: Tentang Kami • Layanan • Portofolio • Artikel • Kontak.

---

### 4.5 Insight

**Hero**
- Judul: Insight
- Subjudul: Artikel terbaru seputar pertumbuhan digital.
- Tombol: Lihat Portofolio, Konsultasi Gratis

**Section: Filter Kategori**
- Subjudul: Pilih kategori untuk melihat artikel yang relevan.
- 4 ikon kategori dalam lingkaran: Semua · Digital Marketing · Branding · Teknologi

**Section: Artikel Unggulan**
- Subjudul: Pilihan artikel dari Gaharu Creative untuk membantu strategi dan eksekusi digital Anda.
- 3 kartu artikel:

| Tag | Judul | Ringkasan | Tanggal |
|---|---|---|---|
| Digital Marketing | Strategi Digital Marketing untuk UMKM di 2025 | Panduan menyusun strategi yang fokus pada target funnel dan pengukuran yang jelas | September |
| Branding | Cara Meningkatkan Brand Identity yang Kuat untuk Bisnis Anda | Langkah membangun identitas merek yang konsisten dari positioning sampai visual dan tone of voice | Agustus |
| Teknologi | Tren Teknologi Digital yang Akan Mempengaruhi Bisnis di 2025 | Pemetaan teknologi yang relevan untuk efisiensi proses, personalisasi, dan pertumbuhan | Juli |

Setiap kartu memiliki tombol **Baca Selengkapnya**.

**Section: Berlangganan Insight Terbaru**
- Deskripsi: Dapatkan artikel, panduan, dan update strategi digital langsung ke email Anda.
- Form: field **Email** (placeholder "Masukkan email Anda", contoh "nama@perusahaan.com") + tombol **Berlangganan**

---

### 4.6 Kontak

Halaman ini **tidak memiliki hero**. Konten langsung dimulai dari section "Hubungi Kami" tepat di bawah navbar.

**Section: Hubungi Kami**
- Kartu: *Area Kontak*: "Silakan isi form di sebelah kiri. Tim kami akan merespons secepatnya (hari kerja)." Tag: Bentuk komunikasi cepat · Respon hari kerja.

**Section: Form Kontak**
- Subjudul: Isi data berikut untuk menghubungi Gaharu Creative.

| Field | Placeholder | Bantuan |
|---|---|---|
| Nama Lengkap | Masukkan nama lengkap Anda | — |
| Perusahaan | Nama perusahaan / institusi | — |
| Layanan Digital | Pilih layanan yang dibutuhkan | Mis. Branding, Website, UI/UX, Pengembangan, Digital Campaign |
| Pesan | Ceritakan kebutuhan proyek Anda (tujuan, timeline, dan detail singkat) | Contoh: Ingin website company profile dengan fitur lead form, target rilis akhir bulan. |

- Tombol: **Kirim Pesan** (di tengah, di bawah form)
- Susunan: 2 kolom × 2 baris

**Section: Informasi Kontak**
- Deskripsi: Hubungi kami melalui kanal berikut atau datang langsung sesuai jam operasional.
- 4 poin dengan ikon:

| Kanal | Contoh isi |
|---|---|
| WhatsApp | +62 812-3456-7890 |
| Email | halo@gaharucreative.co.id |
| Alamat | Jl. Contoh No. 12, Jakarta Selatan |
| Jam Operasional | Senin–Jumat, 09.00–17.00 WIB |

**Section: Peta**
- Placeholder peta Google Maps: "Lokasi kantor dan area layanan."

**Banner CTA:** Berkomitmen Tumbuh Bersama

**Footer khusus halaman ini:** © 2020–Sekarang Gaharu Creative · Strategi • Desain • Pengembangan • Kampanye Digital (360°) · Kebijakan Privasi | Syarat & Ketentuan · Kontak: halo@gaharucreative.co.id | +62 812 3456-7890

---

## 5. Perilaku dan Interaksi (usulan)

Wireframe belum menjelaskan interaksi, jadi bagian ini bersifat saran:

- **Navbar**: tetap menempel di atas saat scroll; menu aktif diberi penanda.
- **Filter Portofolio dan Insight**: klik kategori memfilter kartu di bawahnya tanpa pindah halaman.
- **Kartu**: efek hover ringan (naik sedikit atau border lebih tegas).
- **Carousel banner CTA**: 3 slide dengan indikator titik.
- **Form Kontak dan Berlangganan**: validasi field wajib dan format email, lalu tampilkan pesan sukses/gagal.
- **Pemilih bahasa `ID`**: siapkan struktur konten untuk bahasa kedua (mis. EN) bila diperlukan.
- **Responsif**: kolom 3 jadi 2 di tablet dan 1 di ponsel; navbar menjadi menu hamburger di ponsel; hero dua kolom menjadi satu kolom (teks di atas, gambar di bawah).

---

## 6. Catatan dan Hal yang Perlu Diseragamkan

Temuan saat mengonversi wireframe, sebaiknya dirapikan sebelum desain final:

1. **Email berbeda-beda**: `hello@gaharukreatif.id` (Beranda, Layanan, Insight), `hello@gaharustudio.co` (Portofolio), `halo@gaharucreative.co.id` dan `halo@gaharucreati...` (Kontak). Tentukan satu alamat resmi.
2. **Telepon berbeda-beda**: `(021) 0000 0000`, `+62 000 0000 000`, `+62 812-3456-7890`. Seragamkan.
3. **Footer tidak seragam** antar halaman (isi, susunan, tautan). Buat satu komponen footer.
4. **Judul Beranda** memakai awalan "Beranda —" yang kemungkinan hanya label wireframe; ganti menjadi judul biasa.
5. **Hero Beranda** memuat dua blok pengantar yang mirip (hero dan section "Partner Digital 360°"); pertimbangkan digabung.
6. **Istilah tidak konsisten**: "Digital Agency", "Agensi Digital", "Agency". Pilih satu.
7. **Teks terpotong** di banyak kartu (mis. "Identitas merek, strategi positioni..."): tentukan batas jumlah baris atau karakter per kartu.
8. **Tombol "Hubungi Kami" di navbar** dan **"Konsultasi Gratis"** memiliki fungsi yang mirip; tentukan tujuan tautan masing-masing (mis. ke halaman Kontak vs form/WhatsApp).
9. **Penulisan nama brand di URL/email** ("gaharu**kreatif**", "gaharu**studio**", "gaharu**creative**") perlu dipastikan.
10. **Data testimoni, klien, dan tim** masih placeholder: perlu konten asli (nama, logo, foto).
11. **Tanggal artikel** di Insight hanya memuat bulan; tambahkan tahun.
12. **Hero tidak seragam**: Beranda, Portofolio, Tentang, dan Insight memakai hero, sedangkan Layanan dan Kontak langsung masuk ke konten. Pastikan memang disengaja agar header halaman terasa konsisten.
13. **Tombol CTA berkurang** di banyak section (Beranda, Layanan, Tentang, Insight). Pastikan jalur menuju Konsultasi Gratis tetap mudah ditemukan, misalnya lewat banner CTA di bawah dan tombol Hubungi Kami di navbar.

---

## 7. Perubahan dari Versi Sebelumnya

Dibandingkan wireframe pertama, wireframe terbaru berubah di bagian berikut. Halaman Portofolio tidak berubah.

| Halaman | Perubahan |
|---|---|
| Beranda | Tombol dihapus dari section "Partner Digital 360°", "5 Layanan Utama", dan "Portofolio Unggulan". Tombol hero tetap ada. |
| Layanan | Hero dan section "Layanan Kami" (beserta dua kartunya) dihapus. Tombol di section "Kenapa Memilih Gaharu" dihapus. Halaman kini dimulai dari "5 Layanan Utama". |
| Tentang | Tombol "Minta Dokumen Legal" di section Legalitas dihapus. |
| Insight | Tombol "Lihat Portofolio" dan "Konsultasi Gratis" di section "Artikel Unggulan" dihapus. Tombol hero tetap ada. |
| Kontak | Hero dihapus. Halaman kini dimulai dari "Hubungi Kami". |
| Portofolio | Tidak ada perubahan. |

