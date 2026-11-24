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

/* Tautan WhatsApp/email untuk komponen publik. Dibuat dari identitas situs
 * (setelan panel admin) supaya mengganti nomor di panel langsung berlaku ke
 * seluruh tombol, bukan hanya footer dan tombol mengambang. Nilai statis di
 * src/data/site.js cuma cadangan kalau panel belum diisi.
 */
export function linksFor(situs) {
  const wa = waHref(situs);
  return {
    ...links,
    konsultasi: wa,
    penawaran: wa,
    whatsapp: wa,
    mail: situs && situs.emailVerified && situs.email ? `mailto:${situs.email}` : null,
  };
}

/* Tautan wame bisa menerima pesan sendiri. Dipakai form/formulir yang isinya
 * belum ada di waMessage bawaan.
 */
export function waHrefDenganPesan(situs, pesan) {
  if (!situs || !situs.waNumber) return `${links.whatsapp}&text=${encodeURIComponent(pesan)}`;
  return `https://wa.me/${situs.waNumber}?text=${encodeURIComponent(pesan)}`;
}

/* Tautan wa.me memakai nomor dari panel admin bila ada; kalau tidak, jatuh ke
 * tautan statis supaya tombol tidak pernah kosong.
 */
export function waHref(s) {
  if (!s || !s.waNumber) return links.whatsapp;
  return `https://wa.me/${s.waNumber}?text=${encodeURIComponent(s.waMessage || "")}`;
}