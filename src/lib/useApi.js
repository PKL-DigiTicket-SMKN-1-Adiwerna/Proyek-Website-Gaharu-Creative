// src/lib/useApi.js
// Hook sederhana untuk fetch data dari API dengan fallback ke data static.
// Saat backend belum tersedia, fetch gagal dan komponen memakai fallback.

import { useEffect, useState } from "react";
import { useBahasa } from "./i18n.js";

export function useApi(fetcher, fallback = null, deps = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);
  /* Bahasa ikut jadi pemicu: saat pengunjung mengganti bahasa, permintaan
   * diulang supaya judul/isi dari backend ikut berganti. */
  const { kode } = useBahasa();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const json = await fetcher();
        if (cancelled) return;
        if (json && json.data !== undefined && json.data !== null) {
          setData(json.data);
          setFromApi(true);
        } else {
          setData(fallback);
          setFromApi(false);
        }
      } catch (err) {
        if (cancelled) return;
        setError(err);
        setData(fallback);
        setFromApi(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, kode]);

  return { data, loading, error, fromApi };
}

export function useAsyncAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const run = async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fn();
      return r;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, run };
}