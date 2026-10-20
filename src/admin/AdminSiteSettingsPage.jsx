import { useState, useEffect } from "react";
import { adminApi } from "../lib/adminApi";
import ImageUpload from "./ImageUpload.jsx";

const FIELDS = [
  ["brandName", "Nama brand"],
  ["tagline", "Tagline"],
  ["heroHeadline", "Headline hero"],
  ["heroSubtitle", "Subtitle hero", "textarea"],
  ["foundedYear", "Tahun berdiri"],
  ["ctaWhatsapp", "Nomor WhatsApp (format 62... tanpa +)"],
  ["email", "Email kontak"],
  ["address", "Alamat"],
];

const DEFAULTS = {
  brandName: "Gaharu Creative",
  tagline: "Digital agency untuk merek yang ingin tumbuh dengan rapi.",
  heroHeadline: "Merek yang rapi, pesan yang jelas, hasil yang terukur.",
  heroSubtitle: "Kami membantu bisnis membangun identitas, website, dan kampanye digital yang konsisten.",
  foundedYear: "2016",
  ctaWhatsapp: "6289605177985",
  email: "halo@gaharucreative.id",
  address: "Semarang, Jawa Tengah",
  heroImage: "",
};

export default function AdminSiteSettingsPage() {
  const [form, setForm] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const res = await adminApi.listSettings("id");
      const rows = res.data || [];
      const next = { ...DEFAULTS };
      rows.forEach((r) => {
        if (r && r.key && r.value !== undefined) {
          next[r.key] = (typeof r.value === "object" && r.value !== null && "value" in r.value) ? r.value.value : r.value;
        }
      });
      setForm(next);
    } catch (e) { setError(e?.message || "Gagal memuat data."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError(""); setSaved(false);
    try {
      for (const [key] of FIELDS) {
        await adminApi.updateSetting(key, form[key], "id");
      }
      await adminApi.updateSetting("heroImage", form.heroImage || "", "id");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };

  const reset = () => { setForm(DEFAULTS); };

  const field = (key, label, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={form[key] || ""}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      ) : (
        <input
          type="text"
          value={form[key] || ""}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      )}
    </div>
  );

  if (loading) return <div className="text-sm text-slate-500">Memuat…</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Pengaturan Situs</h1>
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        {FIELDS.map(([key, label, type]) => field(key, label, type))}
        <ImageUpload
          label="Gambar hero (opsional)"
          value={form.heroImage || ""}
          onChange={(v) => setForm({ ...form, heroImage: v })}
        />
        <div className="flex gap-2 pt-2">
          <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-5 py-2 text-sm font-semibold disabled:opacity-60">
            {saving ? "Menyimpan…" : "Simpan"}
          </button>
          <button type="button" onClick={reset} className="rounded-lg border border-slate-300 px-5 py-2 text-sm">
            Reset ke default
          </button>
          {saved && <span className="self-center text-sm text-brand-700">Tersimpan ✓</span>}
        </div>
      </form>
    </div>
  );
}
