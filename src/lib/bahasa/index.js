// src/lib/bahasa/index.js
// Menggabungkan seluruh berkas kamus di ./kamus/ menjadi satu peta
// { "teks Indonesia": "English" }. Berkas baru cukup dijatuhkan di folder itu
// (tidak perlu diimpor satu per satu), supaya penambahan terjemahan tidak
// menyentuh berkas bersama.
const modul = import.meta.glob("./kamus/*.js", { eager: true });

const KAMUS = Object.assign({}, ...Object.values(modul).map((m) => m.default || {}));

export default KAMUS;