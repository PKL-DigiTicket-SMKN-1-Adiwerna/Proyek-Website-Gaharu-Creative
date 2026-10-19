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

export const api = {
  site: () => apiFetch("/public/site"),
  home: () => apiFetch("/public/home"),
  services: () => apiFetch("/public/services"),
  service: (slug) => apiFetch(`/public/services/${encodeURIComponent(slug)}`),
  portfolioCategories: () => apiFetch("/public/portfolio/categories"),
  portfolioHero: () => apiFetch("/public/portfolio/hero"),
  portfolio: (params = {}) => apiFetch(`/public/portfolio${buildQuery(params)}`),
  portfolioItem: (slug) => apiFetch(`/public/portfolio/${encodeURIComponent(slug)}`),
  articleCategories: () => apiFetch("/public/articles/categories"),
  articleHero: () => apiFetch("/public/articles/hero"),
  articles: (params = {}) => apiFetch(`/public/articles${buildQuery(params)}`),
  article: (slug) => apiFetch(`/public/articles/${encodeURIComponent(slug)}`),
  about: () => apiFetch("/public/about"),
  contact: () => apiFetch("/public/contact"),
  testimonials: () => apiFetch("/public/testimonials"),

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
    title: s.name,
    icon: s.icon,
    short: s.shortDesc || s.short_desc || "",
    // field kaya (hero/problems/solutions/workflow/faq) tetap dari static bila ada;
    // di sini hanya data dasar yang tersedia dari API.
    _fromApi: true,
  }));
}

export function adaptHomeServices(apiItems) {
  return adaptServices(apiItems);
}

export function adaptPortfolioCategories(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((c) => ({
    key: c.slug === "all" ? "semua" : c.slug,
    slug: c.slug,
    label: c.name,
    icon: c.icon,
    detail: c.description,
    isAll: !!c.isAll,
  }));
}

export function adaptPortfolioItems(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((p) => ({
    slug: p.slug,
    title: p.title,
    tag: p.category ? p.category.name : p.tag,
    segment: p.category ? p.category.slug : p.segment,
    summary: p.summary,
    resultDraft: p.resultBadge,
    image: p.cover ? (p.cover.path ? p.cover.path : p.cover) : p.image,
    gambarAlt: p.cover && p.cover.alt ? p.cover.alt : p.gambarAlt,
    contoh: true,
    _fromApi: true,
  }));
}

export function adaptArticleCategories(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((c) => ({
    key: c.slug,
    slug: c.slug,
    label: c.name,
    icon: c.icon,
    detail: c.description,
  }));
}

export function adaptTestimonials(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((t) => ({
    name: t.clientName || t.name,
    company: t.company,
    role: t.role,
    quote: t.quote,
    avatar: t.avatarPath || t.avatar,
    _fromApi: true,
  }));
}
export function adaptArticles(apiItems) {
  if (!Array.isArray(apiItems)) return null;
  return apiItems.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category ? a.category.slug : a.category,
    categoryName: a.category ? a.category.name : null,
    tag: a.category ? a.category.name : a.tag,
    image: a.cover ? (a.cover.path ? a.cover.path : a.cover) : a.image,
    imageAlt: a.cover && a.cover.alt ? a.cover.alt : a.imageAlt,
    authorName: a.authorName,
    readMinutes: a.readMinutes,
    publishedAt: a.publishedAt,
    publishedLabel: a.publishedLabel,
    _fromApi: true,
  }));
}

export function adaptSite(apiData) {
  if (!apiData || typeof apiData !== "object") return null;
  return apiData;
}

export default api;