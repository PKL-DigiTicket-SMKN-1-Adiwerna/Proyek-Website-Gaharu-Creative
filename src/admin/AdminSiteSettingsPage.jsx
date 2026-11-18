import { useState, useEffect } from "react";
import { adminApi } from "../lib/adminApi";
import ImageUpload from "./ImageUpload.jsx";

const DEFAULTS = {
  brand: {
    name: "Gaharu Creative",
    tagline: "Digital agency untuk merek yang ingin tumbuh dengan rapi.",
    hero_headline: "Merek yang rapi, pesan yang jelas, hasil yang terukur.",
    hero_subtitle: "Kami membantu bisnis membangun identitas, website, dan kampanye digital yang konsisten.",
    founded_year: "2016",
    hero_image: "",
  },
  contact: { email: "halo@gaharucreative.id", whatsapp: "6289605177985", address: "Semarang, Jawa Tengah" },
  social: { instagram: "", linkedin: "", tiktok: "" },
  seo: { title: "Gaharu Creative", description: "" },
};

// Key lama (datar) tetap dibaca supaya nilai yang pernah disimpan tidak hilang.
const LEGACY = {
  brand: { name: "brandName", tagline: "tagline", hero_headline: "heroHeadline", hero_subtitle: "heroSubtitle", founded_year: "foundedYear" },
  contact: { email: "email", whatsapp: "ctaWhatsapp", address: "address" },
};

const PLATFORM = ["instagram", "linkedin", "tiktok"];

export default function AdminSiteSettingsPage() {
  const [form, setForm] = useState(DEFAULTS);
  const [socialLain, setSocialLain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const res = await adminApi.listSettings("id");
      const rows = res?.data || [];
      const peta = {};
      rows.forEach((r) => { if (r?.key) peta[r.key] = r.value; });
      const ambil = (grup) => {
        const nilai = peta[grup];
        const dasar = { ...DEFAULTS[grup] };
        if (nilai && typeof nilai === "object" && !Array.isArray(nilai)) Object.assign(dasar, nilai);
        Object.entries(LEGACY[grup] || {}).forEach(([k, lama]) => {
          const kosong = dasar[k] === undefined || dasar[k] === null || dasar[k] === "";
          if (kosong && peta[lama] !== undefined && peta[lama] !== null && peta[lama] !== "") dasar[k] = peta[lama];
        });
        return dasar;
      };
      const sosial = { instagram: "", linkedin: "", tiktok: "" };
      const lain = [];
      (Array.isArray(peta.social) ? peta.social : []).forEach((it) => {
        if (!it || !it.platform) return;
        if (PLATFORM.includes(it.platform)) sosial[it.platform] = it.url || "";
        else lain.push(it);
      });
      setSocialLain(lain);
      setForm({ brand: ambil("brand"), contact: ambil("contact"), social: sosial, seo: ambil("seo") });
    } catch (e) { setError(e?.message || "Gagal memuat data."); }
    finally { setLoading(false); }
  };
  useEffect(() => { (async () => { await load(); })(); }, []);

  const ubah = (grup, key, value) => setForm((f) => ({ ...f, [grup]: { ...f[grup], [key]: value } }));

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError(""); setSaved(false);
    try {
      await adminApi.updateSetting("brand", form.brand, "id");
      await adminApi.updateSetting("contact", form.contact, "id");
      const sosial = PLATFORM.filter((p) => form.social[p]).map((p) => ({ platform: p, url: form.social[p] }));
      await adminApi.updateSetting("social", [...sosial, ...socialLain], "id");
      await adminApi.updateSetting("seo", form.seo, "id");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };

  const field = (grup, key, label, type = "text") => (
    <div key={`${grup}.${key}`}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea value={form[grup][key] || ""} onChange={(e) => ubah(grup, key, e.target.value)} rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      ) : (
        <input type="text" value={form[grup][key] || ""} onChange={(e) => ubah(grup, key, e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      )}
    </div>
  );

  if (loading) return <div className="text-sm text-slate-500">Memuat...</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Pengaturan Situs</h1>
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

      <form onSubmit={save} className="space-y-6">
        <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Identitas</h2>
          {field("brand", "name", "Nama brand")}
          {field("brand", "tagline", "Tagline")}
          {field("brand", "hero_headline", "Headline hero")}
          {field("brand", "hero_subtitle", "Subtitle hero", "textarea")}
          {field("brand", "founded_year", "Tahun berdiri")}
          <ImageUpload label="Gambar hero (opsional)" value={form.brand.hero_image || ""}
            onChange={(v) => ubah("brand", "hero_image", v)} />
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Kontak</h2>
          {field("contact", "email", "Email kontak")}
          {field("contact", "whatsapp", "Nomor WhatsApp (format 62... tanpa +)")}
          {field("contact", "address", "Alamat", "textarea")}
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Media sosial</h2>
          {field("social", "instagram", "Instagram (URL)")}
          {field("social", "linkedin", "LinkedIn (URL)")}
          {field("social", "tiktok", "TikTok (URL)")}
        </section>

        <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">SEO</h2>
          {field("seo", "title", "Judul halaman")}
          {field("seo", "description", "Deskripsi", "textarea")}
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-5 py-2 text-sm font-semibold disabled:opacity-60">
            {saving ? "Menyimpan..." : "Simpan semua"}
          </button>
          <button type="button" onClick={load} disabled={saving} className="rounded-lg border border-slate-300 px-5 py-2 text-sm">
            Muat ulang
          </button>
          {saved && <span className="text-sm text-emerald-700">Tersimpan.</span>}
        </div>
      </form>
    </div>
  );
}