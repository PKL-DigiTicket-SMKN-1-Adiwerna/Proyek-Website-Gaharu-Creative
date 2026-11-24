// src/lib/i18n.js
// Bahasa antarmuka: "id" atau "en". Pilihan disimpan di localStorage lewat
// setLocale()/resolveLocale() milik api.js supaya permintaan API memakai bahasa
// yang sama dengan tampilan.
//
// Cara pakai di komponen:
//   const t = useT();
//   return <h1>{t("Layanan Kami")}</h1>;
// Kunci kamus adalah teks Indonesia apa adanya, nilainya padanan Inggris.
// Teks yang belum ada di kamus ditampilkan apa adanya (tidak pernah kosong).
import { useCallback, useSyncExternalStore } from "react";
import { resolveLocale, setLocale as simpanBahasa } from "./api.js";
import KAMUS from "./bahasa/index.js";

let kode = resolveLocale();
const pendengar = new Set();

function beritahu() {
  pendengar.forEach((fn) => fn());
}

function langganan(fn) {
  pendengar.add(fn);
  return () => pendengar.delete(fn);
}

export function kodeBahasa() {
  return kode;
}

export function gantiBahasa(baru) {
  const nilai = baru === "en" ? "en" : "id";
  if (nilai === kode) return nilai;
  kode = nilai;
  simpanBahasa(nilai);
  try {
    document.documentElement.lang = nilai;
  } catch {
    void 0;
  }
  beritahu();
  return nilai;
}

export function terjemah(teks, kodeAktif = kode) {
  if (kodeAktif !== "en" || typeof teks !== "string") return teks;
  return KAMUS[teks] ?? teks;
}

/* Untuk kode di luar komponen (mis. Seo saat membangun judul dokumen). */
export const t = (teks) => terjemah(teks);

export function useBahasa() {
  const aktif = useSyncExternalStore(langganan, kodeBahasa, kodeBahasa);
  const tAktif = useCallback((teks) => terjemah(teks, aktif), [aktif]);
  return { kode: aktif, t: tAktif, ganti: gantiBahasa };
}

export function useT() {
  return useBahasa().t;
}