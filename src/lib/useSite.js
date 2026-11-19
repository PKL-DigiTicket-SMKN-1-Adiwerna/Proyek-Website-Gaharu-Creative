// src/lib/useSite.js
// Sumber data identitas situs untuk komponen publik: nilai dari panel admin
// (/public/site) dengan cadangan statis src/data/site.js.

import { site, links } from "../data/site.js";
import { api, adaptSite } from "./api.js";
import { useApi } from "./useApi.js";

export function useSite() {
  const { data } = useApi(
    () => api.site().then((json) => ({ data: adaptSite(json.data, site) })),
    site,
  );
  return data || site;
}

/* Tautan wa.me memakai nomor dari panel admin bila ada; kalau tidak, jatuh ke
 * tautan statis supaya tombol tidak pernah kosong.
 */
export function waHref(s) {
  if (!s || !s.waNumber) return links.whatsapp;
  return `https://wa.me/${s.waNumber}?text=${encodeURIComponent(s.waMessage || "")}`;
}