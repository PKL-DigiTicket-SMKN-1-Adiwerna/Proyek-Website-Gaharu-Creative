// Data tiruan (dummy) untuk panel admin sebelum backend Supabase/NestJS dihubungkan.
// Nantinya diganti fetch ke /api/v1/admin/*.

export const MOCK_SERVICES = [
  { id: "svc-1", slug: "brand-identity", title: "Identitas Merek", category: "Branding", status: "published", updated_at: "2026-10-18" },
  { id: "svc-2", slug: "web-design", title: "Desain Web", category: "Web", status: "published", updated_at: "2026-10-17" },
  { id: "svc-3", slug: "social-media", title: "Media Sosial", category: "Konten", status: "draft", updated_at: "2026-10-16" },
  { id: "svc-4", slug: "seo", title: "SEO & Analitik", category: "Digital", status: "published", updated_at: "2026-10-15" },
  { id: "svc-5", slug: "konsultasi", title: "Konsultasi Strategi", category: "Konsultasi", status: "published", updated_at: "2026-10-14" },
];

export const MOCK_INQUIRIES = [
  { id: "inq-1", full_name: "Budi Santoso", email: "budi@umkm.id", company: "Toko Maju", service_interest: "web-design", budget_range: "5-10jt", status: "new", created_at: "2026-10-19", message: "Butuh website toko online" },
  { id: "inq-2", full_name: "Siti Aminah", email: "siti@corp.co.id", company: "PT Maju", service_interest: "brand-identity", budget_range: "10-25jt", status: "in_progress", created_at: "2026-10-18", message: "Rebranding perusahaan" },
  { id: "inq-3", full_name: "Andi Wijaya", email: "andi@gmail.com", company: "", service_interest: "seo", budget_range: "<5jt", status: "done", created_at: "2026-10-17", message: "Audit SEO website lama" },
  { id: "inq-4", full_name: "Rina Putri", email: "rina@pemkab.go.id", company: "Pemkab Tegal", service_interest: "social-media", budget_range: "25jt+", status: "new", created_at: "2026-10-16", message: "Kampanye digital pemerintah" },
];

export const MOCK_PORTFOLIO = [
  { id: "pf-1", title: "UMKM E-Commerce Lokal", client: "Toko Maju", category: "UMKM", status: "published" },
  { id: "pf-2", title: "Korporat Gaharu Cloud", client: "PT Maju", category: "Korporat", status: "published" },
  { id: "pf-3", title: "Literasi Digital Pemerintah", client: "Pemkab Tegal", category: "Pemerintah", status: "draft" },
];

export const MOCK_ARTICLES = [
  { id: "art-1", title: "Membangun Merek yang Konsisten", category: "Branding", status: "published", published_at: "2026-10-10" },
  { id: "art-2", title: "Tips SEO untuk UMKM", category: "Digital", status: "draft", published_at: null },
];

export const STATUS_LABEL = {
  new: "Baru",
  in_progress: "Diproses",
  done: "Selesai",
  published: "Terbit",
  draft: "Draf",
};
