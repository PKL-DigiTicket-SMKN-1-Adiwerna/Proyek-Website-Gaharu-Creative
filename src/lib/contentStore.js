// Penyimpanan konten situs di browser (localStorage). Tanpa backend/Supabase.
// Dipakai admin panel untuk mengedit isi website; halaman publik membaca dari sini
// dengan fallback ke data statis bila belum ada.

const KEY = "gaharu_content_v1";

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(obj) {
  localStorage.setItem(KEY, JSON.stringify(obj));
}

export function getContent(section) {
  const all = readAll();
  return all[section] ?? null;
}

export function setContent(section, data) {
  const all = readAll();
  all[section] = data;
  writeAll(all);
}

export function resetContent(section) {
  const all = readAll();
  if (section) delete all[section];
  else Object.keys(all).forEach((k) => delete all[k]);
  writeAll(all);
}

export function getAllContent() {
  return readAll();
}

// Hook React-friendly: baca konten, fallback ke data statis.
import { useState, useEffect, useCallback } from "react";
export function useContent(section, fallback) {
  const [value, setValue] = useState(() => {
    const c = getContent(section);
    return c != null ? c : fallback;
  });
  useEffect(() => {
    const handler = () => {
      const c = getContent(section);
      setValue(c != null ? c : fallback);
    };
    window.addEventListener("gaharu:content-changed", handler);
    return () => window.removeEventListener("gaharu:content-changed", handler);
  }, [section, fallback]);
  const update = useCallback((next) => {
    setContent(section, next);
    setValue(next);
    window.dispatchEvent(new CustomEvent("gaharu:content-changed"));
  }, [section]);
  return [value, update];
}

export function notifyContentChanged() {
  window.dispatchEvent(new CustomEvent("gaharu:content-changed"));
}
