// src/lib/adminApi.js
// Klien API untuk panel admin Gaharu Creative (backend NestJS).
// Token (JWT) disimpan di localStorage under "admin_token".
const RAW_BASE = (import.meta.env.VITE_API_BASE_URL || "").trim();
const API_BASE = (RAW_BASE ? RAW_BASE.replace(/\/$/, "") : "") + "/api/v1";

export function getAdminToken() {
  try { return localStorage.getItem("admin_token") || ""; } catch { return ""; }
}
export function setAdminToken(tok) { try { localStorage.setItem("admin_token", tok); } catch {} }
export function clearAdminToken() { try { localStorage.removeItem("admin_token"); localStorage.removeItem("admin_email"); localStorage.removeItem("admin_role"); } catch {} }

export async function adminFetch(path, opts = {}) {
  const token = getAdminToken();
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  let json = null;
  try { json = await res.json(); } catch { json = null; }
  if (!res.ok) {
    const msg = (json && (json.message || json.error)) || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = json;
    if (res.status === 401) {
      clearAdminToken();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    throw err;
  }
  return json;
}

export const adminApi = {
  login: (email, password) => adminFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  // services
  listServices: (locale = "id") => adminFetch(`/admin/services?locale=${locale}`),
  getService: (id) => adminFetch(`/admin/services/${id}`),
  createService: (dto) => adminFetch("/admin/services", { method: "POST", body: JSON.stringify(dto) }),
  updateService: (id, dto) => adminFetch(`/admin/services/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
  deleteService: (id) => adminFetch(`/admin/services/${id}`, { method: "DELETE" }),
  // inquiries
  listInquiries: () => adminFetch("/admin/inquiries"),
  updateInquiry: (id, dto) => adminFetch(`/admin/inquiries/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
  // portfolio
  listPortfolio: (locale = "id") => adminFetch(`/admin/portfolio?locale=${locale}`),
  getPortfolio: (id) => adminFetch(`/admin/portfolio/${id}`),
  createPortfolio: (dto) => adminFetch("/admin/portfolio", { method: "POST", body: JSON.stringify(dto) }),
  updatePortfolio: (id, dto) => adminFetch(`/admin/portfolio/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
  deletePortfolio: (id) => adminFetch(`/admin/portfolio/${id}`, { method: "DELETE" }),
  // articles
  listArticles: (locale = "id") => adminFetch(`/admin/articles?locale=${locale}`),
  getArticle: (id) => adminFetch(`/admin/articles/${id}`),
  createArticle: (dto) => adminFetch("/admin/articles", { method: "POST", body: JSON.stringify(dto) }),
  updateArticle: (id, dto) => adminFetch(`/admin/articles/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
  deleteArticle: (id) => adminFetch(`/admin/articles/${id}`, { method: "DELETE" }),
  // stats
  listStats: (locale = "id") => adminFetch(`/admin/stats?locale=${locale}`),
  createStat: (dto) => adminFetch("/admin/stats", { method: "POST", body: JSON.stringify(dto) }),
  updateStat: (id, dto) => adminFetch(`/admin/stats/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
  deleteStat: (id) => adminFetch(`/admin/stats/${id}`, { method: "DELETE" }),
  // settings
  listSettings: (locale = "id") => adminFetch(`/admin/settings?locale=${locale}`),
  updateSetting: (key, value, locale = "id") => adminFetch(`/admin/settings/${encodeURIComponent(key)}`, { method: "PATCH", body: JSON.stringify({ value, locale }) }),
  // about
  listStories: (locale = "id") => adminFetch(`/admin/about/stories?locale=${locale}`),
  createStory: (dto) => adminFetch("/admin/about/stories", { method: "POST", body: JSON.stringify(dto) }),
  updateStory: (id, dto) => adminFetch(`/admin/about/stories/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
  deleteStory: (id) => adminFetch(`/admin/about/stories/${id}`, { method: "DELETE" }),
  listValues: (locale = "id") => adminFetch(`/admin/about/values?locale=${locale}`),
  createValue: (dto) => adminFetch("/admin/about/values", { method: "POST", body: JSON.stringify(dto) }),
  updateValue: (id, dto) => adminFetch(`/admin/about/values/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
  deleteValue: (id) => adminFetch(`/admin/about/values/${id}`, { method: "DELETE" }),
  listTeam: (locale = "id") => adminFetch(`/admin/about/team?locale=${locale}`),
  createMember: (dto) => adminFetch("/admin/about/team", { method: "POST", body: JSON.stringify(dto) }),
  updateMember: (id, dto) => adminFetch(`/admin/about/team/${id}`, { method: "PATCH", body: JSON.stringify(dto) }),
  deleteMember: (id) => adminFetch(`/admin/about/team/${id}`, { method: "DELETE" }),
  getMission: (locale = "id") => adminFetch(`/admin/about/mission?locale=${locale}`),
  updateMission: (dto) => adminFetch("/admin/about/mission", { method: "PATCH", body: JSON.stringify(dto) }),
};
