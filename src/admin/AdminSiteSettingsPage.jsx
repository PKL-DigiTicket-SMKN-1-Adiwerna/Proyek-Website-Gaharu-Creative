import { useState } from "react";
import { useContent } from "../lib/contentStore.js";
import ImageUpload from "./ImageUpload.jsx";

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
  const [content, setContent] = useContent("site", DEFAULTS);
  const [form, setForm] = useState(content);
  const [saved, setSaved] = useState(false);

  const save = (e) => {
    e.preventDefault();
    setContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const reset = () => {
    setContent(DEFAULTS);
    setForm(DEFAULTS);
  };

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

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Pengaturan Situs</h1>
      <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        {field("brandName", "Nama brand")}
        {field("tagline", "Tagline")}
        {field("heroHeadline", "Headline hero")}
        {field("heroSubtitle", "Subtitle hero", "textarea")}
        {field("foundedYear", "Tahun berdiri")}
        {field("ctaWhatsapp", "Nomor WhatsApp (format 62... tanpa +)")}
        {field("email", "Email kontak")}
        {field("address", "Alamat")}
        <ImageUpload
          label="Gambar hero (opsional)"
          value={form.heroImage || ""}
          onChange={(v) => setForm({ ...form, heroImage: v })}
        />
        <div className="flex gap-2 pt-2">
          <button type="submit" className="rounded-lg bg-brand-800 text-white px-5 py-2 text-sm font-semibold">
            Simpan
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
