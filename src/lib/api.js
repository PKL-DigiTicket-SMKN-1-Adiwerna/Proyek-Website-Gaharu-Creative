// src/lib/api.js
// Klien API untuk backend Gaharu Creative (kontrak: DESAIN-BACKEND.md).
// Semua endpoint publik memakai envelope { data, meta }. Endpoint admin
// (dengan token) ditangani terpisah bila dashboard dibangun nanti.

const RAW_BASE = (import.meta.env.VITE_API_BASE_URL || "").trim();
const API_BASE = (RAW_BASE ? RAW_BASE.replace(/\/$/, "") : "") + "/api/v1";

export class ApiError extends Error {
  constructor(code, message, status = 0, details = null) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function resolveLocale() {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("locale");
    if (q) return q;
  } catch {
    void 0;
  }
  try {
    const stored = localStorage.getItem("gaharu_locale");
    if (stored) return stored;
  } catch {
    void 0;
  }
  try {
    const nav = (navigator.language || "id").slice(0, 2).toLowerCase();
    return nav === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

export function setLocale(locale) {
  try { localStorage.setItem("gaharu_locale", locale); } catch {
    void 0;
  }
}

function buildQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    q.set(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

export async function apiFetch(path, options = {}) {
  const {
    method = "GET",
    body,
    locale,
    headers = {},
    signal,
    etag,
    idempotencyKey,
    turnstileToken,
  } = options;

  const loc = locale || resolveLocale();
  const url = `${API_BASE}${path.startsWith("/") ? path : "/" + path}`;

  const h = {
    Accept: "application/json",
    "Accept-Language": loc === "en" ? "en-US" : "id-ID",
    "X-Locale": loc,
    ...headers,
  };
  if (body !== undefined) h["Content-Type"] = "application/json";
  if (etag) h["If-None-Match"] = etag;
  if (idempotencyKey) h["Idempotency-Key"] = idempotencyKey;
  if (turnstileToken) h["X-Turnstile-Token"] = turnstileToken;

  try {
    const token = localStorage.getItem("gaharu_access_token");
    if (token) h.Authorization = `Bearer ${token}`;
  } catch {
    void 0;
  }

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: h,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch {
    throw new ApiError("NETWORK_ERROR", "Tidak dapat terhubung ke server.", 0);
  }

  if (res.status === 304) {
    return { data: null, meta: { notModified: true }, status: 304 };
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    void 0;
  }

  if (!res.ok) {
    const err = (json && json.error) || {};
    throw new ApiError(
      err.code || "HTTP_ERROR",
      err.message || res.statusText || "Terjadi kesalahan.",
      res.status,
      err.details || null
    );
  }
  return json || { data: null, meta: {} };
}

// ---------- Endpoint publik ----------

/* Isi konten (layanan, artikel, portofolio, tentang) disimpan per bahasa di DB.
 * Versi Inggris belum tentu ada, dan backend mengembalikan daftar kosong (atau
 * 404 untuk detail) kalau barisnya tidak ada. Supaya halaman tidak pernah kosong,
 * permintaan diulang dengan locale=id; begitu admin mengisi konten Inggris,
 * versi itu yang dipakai.
 */
function kosong(json) {
  const d = json && json.data;
  if (Array.isArray(d)) return d.length === 0;
  if (d && typeof d === "object") return Object.keys(d).length === 0;
  return d === null || d === undefined;
}

async function apiKonten(path, opsi = {}) {
  if (resolveLocale() !== "en") return apiFetch(path, opsi);
  try {
    const utama = await apiFetch(path, opsi);
    if (!kosong(utama)) return utama;
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 404) throw err;
  }
  return apiFetch(path, { ...opsi, locale: "id" });
}

export const api = {
  site: () => apiFetch("/public/site"),
  home: () => apiKonten("/public/home"),
  services: () => apiKonten("/public/services"),
  service: (slug) => apiKonten(`/public/services/${encodeURIComponent(slug)}`),
  portfolioCategories: () => apiKonten("/public/portfolio/categories"),
  portfolioHero: () => apiKonten("/public/portfolio/hero"),
  portfolio: (params = {}) => apiKonten(`/public/portfolio${buildQuery(params)}`),
  portfolioItem: (slug) => apiKonten(`/public/portfolio/${encodeURIComponent(slug)}`),
  articleCategories: () => apiKonten("/public/articles/categories"),
  articleHero: () => apiKonten("/public/articles/hero"),
  articles: (params = {}) => apiKonten(`/public/articles${buildQuery(params)}`),
  article: (slug) => apiKonten(`/public/articles/${encodeURIComponent(slug)}`),
  about: () => apiKonten("/public/about"),
  clients: () => apiKonten("/public/clients"),
  contact: () => apiKonten("/public/contact"),
  testimonials: () => apiKonten("/public/testimonials"),
  awards: () => apiKonten("/public/awards"),
  stats: () => apiKonten("/public/stats"),

  submitInquiry: (payload, idempotencyKey, turnstileToken) =>
    apiFetch("/public/inquiries", {
      method: "POST",
      body: payload,
      idempotencyKey,
      turnstileToken,
    }),
  subscribe: (payload) => apiFetch("/public/subscribers", { method: "POST", body: payload }),
  unsubscribe: (payload) => apiFetch("/public/subscribers/unsubscribe", { method: "POST", body: payload }),
};

// ---------- Adapter: bentuk API -> bentuk static yang dipakai komponen ----------

export function adaptServices(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((s) => ({
    slug: s.slug,
    tag: (s.tag || "").toUpperCase(),
    title: s.name || s.title,
    icon: s.icon,
    short: s.shortDesc || s.short_desc || "",
    // Layanan dari API hanya punya satu masalah/solusi dan daftar deliverables
    // berbentuk teks; dibungkus ke bentuk yang dipakai kartu.
    problems: s.problem ? [{ title: s.problem }] : [],
    deliverables: Array.isArray(s.deliverables)
      ? s.deliverables.map((d) => (typeof d === "string" ? { title: d } : d))
      : [],
    _fromApi: true,
  }));
}

/* Satu layanan untuk /layanan/:slug yang tidak ada di data statis. Semua bagian
 * yang datanya kosong tetap disediakan sebagai array kosong supaya template
 * halaman tidak perlu tahu asal datanya. */
export function adaptServiceDetail(s) {
  if (!s || typeof s !== "object" || !s.slug) return null;
  const title = s.name || s.title || "";
  const short = s.shortDesc || s.short_desc || "";
  const tag = (s.tag || "").toUpperCase();
  const deliverables = Array.isArray(s.deliverables)
    ? s.deliverables.map((d) => (typeof d === "string" ? { title: d } : d))
    : [];
  return {
    slug: s.slug,
    tag: tag || "LAYANAN",
    title,
    icon: s.icon,
    short,
    hero: {
      eyebrow: tag || "Layanan",
      titleBefore: title,
      accent: "",
      titleAfter: "",
      lede: short,
      primary: { label: "Konsultasi Gratis" },
      secondary: { to: "/kontak", label: "Minta Penawaran" },
    },
    problems: s.problem ? [{ title: "Masalah yang sering muncul", body: s.problem }] : [],
    solutions: s.solution
      ? [{ label: "Pendekatan", title: "Yang kami kerjakan", body: s.solution }]
      : [],
    highlights: [],
    deliverables,
    steps: [],
    faqs: [],
    kpi: null,
    quote: null,
    qualityNote: "",
    cta: {
      eyebrow: "Langkah berikutnya",
      title: `Mulai ${title}`,
      body: short,
      primary: "Konsultasi Gratis",
    },
    _fromApi: true,
  };
}

const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

function labelTanggal(nilai) {
  if (!nilai) return "";
  const d = new Date(nilai);
  if (Number.isNaN(d.getTime())) return "";
  return `${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

function slugify(nilai) {
  return String(nilai || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function adaptHomeServices(apiItems) {
  return adaptServices(apiItems);
}

export function adaptPortfolioCategories(apiItems) {
  if (!Array.isArray(apiItems) || !apiItems.length) return null;
  const list = apiItems.map((c) => ({
    key: c.slug === "all" ? "semua" : slugify(c.slug || c.name),
    slug: c.slug,
    id: c.id,
    label: c.name,
    icon: c.icon,
    detail: c.description || "",
    isAll: !!c.isAll,
  }));
  /* Basis data tidak menyimpan baris "semua", jadi chip itu dilengkapi di sini. */
  return list.some((c) => c.key === "semua")
    ? list
    : [{ key: "semua", slug: "all", label: "Semua", icon: "layers", detail: "", isAll: true }, ...list];
}

export function adaptPortfolioItems(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((p) => ({
    slug: p.slug,
    proyek: p.title || p.proyek,
    title: p.title,
    tag: (p.category ? p.category.name : null) || p.category_name || p.industry || p.tag || "",
    /* Segmen dipakai untuk mencocokkan chip filter; slug kategori diutamakan,
     * industri jadi cadangan untuk baris lama yang belum punya category_id. */
    segment: slugify(
      (p.category ? p.category.slug : null) || p.category_slug || p.industry || p.segment || ""
    ),
    categoryId: p.category_id || null,
    summary: p.summary,
    resultDraft: p.resultBadge || p.result_badge || "",
    image: (p.cover && p.cover.path) ? p.cover.path : (p.cover_path || p.image || ""),
    gambarAlt: (p.cover && p.cover.alt) ? p.cover.alt : (p.cover_alt || p.gambarAlt || ""),
    disiplin: Array.isArray(p.disiplin) ? p.disiplin : [],
    contoh: true,
    _fromApi: true,
  }));
}

/* Satu item portofolio untuk halaman detail /portofolio/:slug. */
export function adaptPortfolioItem(apiItem) {
  if (!apiItem || typeof apiItem !== "object") return null;
  return {
    slug: apiItem.slug,
    title: apiItem.title,
    summary: apiItem.summary,
    industry: apiItem.industry,
    clientName: apiItem.client_name || apiItem.clientName || "",
    projectDate: apiItem.project_date || apiItem.projectDate || "",
    resultBadge: apiItem.result_badge || apiItem.resultBadge || "",
    image: (apiItem.cover && apiItem.cover.path) ? apiItem.cover.path : (apiItem.cover_path || apiItem.image || ""),
    imageAlt: (apiItem.cover && apiItem.cover.alt) ? apiItem.cover.alt : (apiItem.cover_alt || apiItem.title || ""),
    body: apiItem.body || "",
    _fromApi: true,
  };
}

export function adaptArticleCategories(apiItems) {
  if (!Array.isArray(apiItems) || !apiItems.length) return null;
  const list = apiItems.map((c) => ({
    key: slugify(c.slug || c.name),
    slug: c.slug,
    label: c.name,
    icon: c.icon,
    detail: c.description || "",
  }));
  return list.some((c) => c.key === "semua")
    ? list
    : [{ key: "semua", label: "Semua", icon: "layers" }, ...list];
}

export function adaptTestimonials(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((t) => ({
    name: t.clientName || t.client_name || t.name,
    company: t.company,
    role: t.role,
    quote: t.quote,
    avatar: t.avatarPath || t.avatar_path || t.avatar,
    _fromApi: true,
  }));
}
export function adaptArticles(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((a) => {
    const namaKategori =
      (a.category ? a.category.name : null) || a.category_name || a.categoryName || a.tag || null;
    const slugKategori =
      (a.category ? a.category.slug : null) ||
      a.category_slug ||
      (typeof a.category === "string" ? a.category : "");
    return {
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      /* Filter kategori membandingkan slug; baris API hanya punya category_id,
       * jadi slug/nama kategori datang dari join di backend. */
      category: slugify(slugKategori || namaKategori),
      categoryName: namaKategori,
      tag: namaKategori || a.tag || "",
      image: (a.cover && a.cover.path) ? a.cover.path : (a.cover_path || a.image || ""),
      imageAlt: (a.cover && a.cover.alt) ? a.cover.alt : (a.cover_alt || a.imageAlt || ""),
      authorName: a.authorName || a.author_name,
      readMinutes: a.readMinutes || a.read_minutes,
      publishedAt: a.publishedAt || a.published_at,
      publishedLabel:
        a.publishedLabel || a.published_label || labelTanggal(a.publishedAt || a.published_at),
      content: a.body || a.content,
      _fromApi: true,
    };
  });
}

/* Mitra/klien: bentuk API disamakan dengan MITRA_LOGOS di src/data/klien.js.
 * Ukuran gambar tidak dikirim backend, jadi komponen melengkapinya dari peta
 * slug -> dimensi berkas statis (lihat STATIS di RekamJejak.jsx).
 */
export function adaptClients(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((c, i) => ({
    slug: c.slug,
    name: c.name,
    category: c.category === "swasta" ? "swasta" : "pemerintah",
    logo: c.logo_path || c.logoPath || `/logos/klien/${c.slug}.svg`,
    alt: c.logo_alt || c.name,
    order: c.sort_order ?? c.sortOrder ?? i,
    _fromApi: true,
  }));
}

/* Identitas situs dari panel admin (/public/site) -> bentuk src/data/site.js.
 * Nilai kosong atau null tidak menimpa fallback statis, jadi field yang belum
 * diisi di panel tetap memakai nilai bawaan. Penanda *Verified dinyalakan
 * untuk field yang benar-benar dikirim backend supaya footer merendernya.
 */
const LABEL_SOSIAL = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  facebook: "Facebook",
  tiktok: "TikTok",
  x: "X",
  twitter: "X",
};

function teks(nilai) {
  return typeof nilai === "string" && nilai.trim() ? nilai.trim() : null;
}

/* 628111222333 -> +62 811-1222-333 (3 digit awal, sisanya per 4). */
function nomorTampil(nomor) {
  const digit = String(nomor).replace(/\D/g, "");
  const lokal = (digit.startsWith("62") ? digit.slice(2) : digit).replace(/^0/, "");
  if (!lokal) return null;
  const sisa = lokal.slice(3).match(/.{1,4}/g) || [];
  return `+62 ${[lokal.slice(0, 3), ...sisa].filter(Boolean).join("-")}`;
}

export function adaptSite(payload, fallback = {}) {
  const p = payload && typeof payload === "object" ? payload : {};
  const brand = p.brand || {};
  const contact = p.contact || {};
  const hasil = { ...fallback };

  // Nilai datar (brandName, ctaWhatsapp, ...) jadi acuan utama; objek grup lama
  // hanya cadangan supaya data lama tidak hilang.
  const nama = teks(p.brandName) || teks(brand.name);
  if (nama) hasil.name = nama;

  const tagline = teks(p.tagline) || teks(brand.tagline);
  if (tagline) hasil.tagline = tagline;

  const email = teks(p.email) || teks(contact.email);
  if (email) {
    hasil.email = email;
    hasil.emailVerified = true;
  }

  const wa = teks(p.ctaWhatsapp) || teks(contact.whatsapp);
  if (wa) {
    hasil.waNumber = wa;
    hasil.waDisplay = nomorTampil(wa) || wa;
    hasil.waNumberVerified = true;
  }

  const alamat = teks(p.address) || teks(contact.address);
  if (alamat) {
    hasil.address = alamat;
    hasil.addressVerified = true;
  }

  const berdiri = p.foundedYear ?? brand.founded_year;
  if (berdiri) hasil.founded = Number(berdiri) || hasil.founded;

  const sosial = (Array.isArray(p.social) ? p.social : [])
    .filter((s) => s && teks(s.url))
    .map((s) => {
      const kunci = String(s.platform || "").toLowerCase();
      return { label: LABEL_SOSIAL[kunci] || s.platform, href: s.url, verified: true };
    });
  if (sosial.length) hasil.socials = sosial;

  return hasil;
}

export function adaptAwards(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    issuer: a.issuer || "",
    year: a.year || "",
    description: a.description || "",
    image: a.image_path || "",
    alt: a.image_alt || a.title || "",
  }));
}

export default api;