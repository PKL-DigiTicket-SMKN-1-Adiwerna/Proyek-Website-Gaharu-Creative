/* Data mitra dan penghargaan dari perusahaan, dikirim 14 Okt 2026.
 * Nama institusi ditampilkan sebagai teks karena berkas logo resmi belum ada.
 */
export const rekamJejak = {
  title: "Rekam Jejak",
  label: "Sejak 2016",
  intro:
    "Rekam jejak kami dalam mendampingi UMKM naik kelas telah dimulai sejak tahun 2016. Hingga saat ini, kami telah membantu lebih dari 25.000 usaha di seluruh penjuru Indonesia. Kepercayaan besar juga kami terima dari berbagai korporasi multinasional dan instansi kementerian sebagai mitra strategis dalam mengakselerasi transformasi digital.",
};

export const mitraGroups = [
  {
    key: "pemerintah",
    icon: "landmark",
    label: "Kementerian dan Lembaga Pemerintah",
    items: [
      "Bank Indonesia",
      "Kementerian Keuangan Republik Indonesia",
      "Kementerian Luar Negeri Republik Indonesia",
      "Kementerian Koperasi",
      "Kementerian Agama Republik Indonesia",
      "Kementerian Komunikasi dan Digital (Komdigi)",
      "Kementerian UMKM",
      "Kementerian Koordinator Bidang Pemberdayaan Masyarakat",
      "Kementerian Perdagangan",
      "Kementerian Perindustrian",
      "Kementerian Hukum dan HAM",
      "Badan Pengawas Obat dan Makanan",
      "Kementerian Pariwisata",
      "Kementerian Ekonomi Kreatif",
      "Otoritas Jasa Keuangan",
      "Kementerian Pemuda dan Olahraga",
    ],
  },
  {
    key: "swasta",
    icon: "building",
    label: "Perusahaan Swasta dan BUMN",
    items: [
      "Astra International",
      "Telkom Indonesia",
      "GoTo",
      "Adira Finance",
      "Google Indonesia",
      "Dafam Hotel Management (DHM)",
      "Polytron",
      "Bank Mandiri, BRI, BTN, BNI, dan BSI",
      "Djarum Group",
      "Pegadaian",
    ],
  },
];

export const penghargaan = [
  "Google Developer Challenge Champion",
  "Oxford Internet Institute Awardee",
  "National University of Singapore Awardee",
  "Juara Wirausaha Pemuda Kemenpora",
  "Juara Business Growth Kemenkeu",
  "Juara Wirausaha Syariah Bank Indonesia Jawa Tengah",
];

/* Jumlah mitra dipakai di kartu statistik. Dihitung dari daftar di atas supaya
 * tidak ada angka yang diketik manual dan lupa diperbarui.
 */
export const jumlahMitra = mitraGroups.reduce((total, group) => total + group.items.length, 0);