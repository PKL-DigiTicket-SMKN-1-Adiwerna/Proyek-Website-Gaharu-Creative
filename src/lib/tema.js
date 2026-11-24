// src/lib/tema.js
// Tema tampilan: "terang" (bawaan) atau "gelap". Nilai disimpan di localStorage
// dan ditulis ke <html data-tema="...">; token warna di index.css yang berganti,
// jadi komponen tidak perlu diubah satu per satu.
//
// Agar tidak berkedip saat halaman dimuat, skrip kecil di index.html sudah
// memasang data-tema sebelum React jalan (fungsi mulaiTema() hanya menyamakan
// keadaan di sisi React).
import { useCallback, useEffect, useSyncExternalStore } from "react";

const KUNCI = "gaharu_tema";
const pendengar = new Set();

function dariSistem() {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "gelap" : "terang";
  } catch {
    return "terang";
  }
}

function tersimpan() {
  try {
    const nilai = localStorage.getItem(KUNCI);
    if (nilai === "gelap" || nilai === "terang") return nilai;
  } catch {
    void 0;
  }
  return null;
}

let tema = tersimpan() || dariSistem();

function beritahu() {
  pendengar.forEach((fn) => fn());
}

function langganan(fn) {
  pendengar.add(fn);
  return () => pendengar.delete(fn);
}

export function temaSekarang() {
  return tema;
}

export function pasangTema(baru) {
  tema = baru === "gelap" ? "gelap" : "terang";
  try {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem(KUNCI, tema);
  } catch {
    void 0;
  }
  beritahu();
  return tema;
}

export function balikTema() {
  return pasangTema(tema === "gelap" ? "terang" : "gelap");
}

/* Dipanggil sekali dari main.jsx: menulis pilihan yang tersimpan ke <html>. */
export function mulaiTema() {
  try {
    document.documentElement.dataset.tema = tema;
  } catch {
    void 0;
  }
}

export function useTema() {
  const aktif = useSyncExternalStore(langganan, temaSekarang, temaSekarang);
  const ganti = useCallback((baru) => pasangTema(baru), []);
  const balik = useCallback(() => balikTema(), []);
  return { tema: aktif, gelap: aktif === "gelap", ganti, balik };
}

/* Panel admin masih memakai warna bawaan Tailwind (bg-white, text-slate-*),
 * jadi dipaksa terang selama halaman admin dibuka; pilihan tema pengunjung
 * dipulihkan lagi saat keluar. ponytail: kalau suatu saat panel admin ikut
 * digelapkan, hapus pemaksaan ini dan ganti kelas mentahnya ke token. */
export function useTemaTerang() {
  useEffect(() => {
    const lama = document.documentElement.dataset.tema;
    document.documentElement.dataset.tema = "terang";
    return () => {
      if (lama === undefined) delete document.documentElement.dataset.tema;
      else document.documentElement.dataset.tema = lama;
    };
  }, []);
}