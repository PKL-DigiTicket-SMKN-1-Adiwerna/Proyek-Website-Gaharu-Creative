import { useState, useEffect } from "react";
import { adminApi } from "../lib/adminApi";
import ImageUpload from "./ImageUpload.jsx";

export default function AdminAboutPage() {
  const [stories, setStories] = useState([]);
  const [values, setValues] = useState([]);
  const [team, setTeam] = useState([]);
  const [mission, setMission] = useState({ mission: "", vision: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sForm, setSForm] = useState(null);
  const [vForm, setVForm] = useState(null);
  const [tForm, setTForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const [s, v, t, m] = await Promise.all([
        adminApi.listStories("id"),
        adminApi.listValues("id"),
        adminApi.listTeam("id"),
        adminApi.getMission("id"),
      ]);
      setStories(s.data || []);
      setValues(v.data || []);
      setTeam(t.data || []);
      setMission(m.data || { mission: "", vision: "" });
    } catch (e) { setError(e?.message || "Gagal memuat data."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const saveStory = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (sForm.id) {
        const res = await adminApi.updateStory(sForm.id, { title: sForm.title, body: sForm.body });
        setStories((prev) => prev.map((x) => (x.id === sForm.id ? res.data : x)));
      } else {
        const res = await adminApi.createStory({ title: sForm.title, body: sForm.body, locale: "id" });
        setStories((prev) => [res.data, ...prev]);
      }
      setSForm(null);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };
  const removeStory = async (id) => {
    if (!confirm("Hapus cerita ini?")) return;
    try { await adminApi.deleteStory(id); setStories((prev) => prev.filter((x) => x.id !== id)); }
    catch (e) { setError(e?.message || "Gagal menghapus."); }
  };

  const saveValue = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (vForm.id) {
        const res = await adminApi.updateValue(vForm.id, { title: vForm.title, description: vForm.description, icon: vForm.icon });
        setValues((prev) => prev.map((x) => (x.id === vForm.id ? res.data : x)));
      } else {
        const res = await adminApi.createValue({ title: vForm.title, description: vForm.description, icon: vForm.icon, locale: "id" });
        setValues((prev) => [res.data, ...prev]);
      }
      setVForm(null);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };
  const removeValue = async (id) => {
    if (!confirm("Hapus nilai ini?")) return;
    try { await adminApi.deleteValue(id); setValues((prev) => prev.filter((x) => x.id !== id)); }
    catch (e) { setError(e?.message || "Gagal menghapus."); }
  };

  const saveMember = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (tForm.id) {
        const res = await adminApi.updateMember(tForm.id, { name: tForm.name, role: tForm.role, photo_path: tForm.photo });
        setTeam((prev) => prev.map((x) => (x.id === tForm.id ? res.data : x)));
      } else {
        const res = await adminApi.createMember({ name: tForm.name, role: tForm.role, photo_path: tForm.photo, locale: "id" });
        setTeam((prev) => [res.data, ...prev]);
      }
      setTForm(null);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };
  const removeMember = async (id) => {
    if (!confirm("Hapus anggota ini?")) return;
    try { await adminApi.deleteMember(id); setTeam((prev) => prev.filter((x) => x.id !== id)); }
    catch (e) { setError(e?.message || "Gagal menghapus."); }
  };

  const saveMission = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const res = await adminApi.updateMission({ mission: mission.mission, vision: mission.vision, locale: "id" });
      setMission(res.data || mission);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="text-sm text-slate-500">Memuat…</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Tentang</h1>
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <h2 className="font-semibold text-slate-800">Misi & Visi</h2>
        <form onSubmit={saveMission} className="space-y-2">
          <textarea placeholder="Misi" value={mission.mission || ""} onChange={(e) => setMission({ ...mission, mission: e.target.value })} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <textarea placeholder="Visi" value={mission.vision || ""} onChange={(e) => setMission({ ...mission, vision: e.target.value })} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-3 py-1.5 text-sm disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan Misi/Visi"}</button>
        </form>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Cerita / Tentang</h2>
          <button onClick={() => setSForm({ title: "", body: "" })} className="text-sm text-brand-700 hover:underline">+ Tambah</button>
        </div>
        {sForm && (
          <form onSubmit={saveStory} className="space-y-2">
            <input placeholder="Judul" value={sForm.title} onChange={(e) => setSForm({ ...sForm, title: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <textarea placeholder="Isi" value={sForm.body} onChange={(e) => setSForm({ ...sForm, body: e.target.value })} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-3 py-1.5 text-sm disabled:opacity-60">Simpan</button>
              <button type="button" onClick={() => setSForm(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Batal</button>
            </div>
          </form>
        )}
        {stories.map((s) => (
          <div key={s.id} className="border-t border-slate-100 pt-3 flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-slate-500 line-clamp-2">{s.body}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setSForm({ ...s })} className="text-brand-700 text-sm hover:underline">Edit</button>
              <button onClick={() => removeStory(s.id)} className="text-red-600 text-sm hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Nilai / Values</h2>
          <button onClick={() => setVForm({ title: "", description: "", icon: "" })} className="text-sm text-brand-700 hover:underline">+ Tambah</button>
        </div>
        {vForm && (
          <form onSubmit={saveValue} className="space-y-2">
            <input placeholder="Judul nilai" value={vForm.title} onChange={(e) => setVForm({ ...vForm, title: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <textarea placeholder="Deskripsi" value={vForm.description} onChange={(e) => setVForm({ ...vForm, description: e.target.value })} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-3 py-1.5 text-sm disabled:opacity-60">Simpan</button>
              <button type="button" onClick={() => setVForm(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Batal</button>
            </div>
          </form>
        )}
        {values.map((v) => (
          <div key={v.id} className="border-t border-slate-100 pt-3 flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{v.title}</div>
              <div className="text-sm text-slate-500">{v.description}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setVForm({ ...v })} className="text-brand-700 text-sm hover:underline">Edit</button>
              <button onClick={() => removeValue(v.id)} className="text-red-600 text-sm hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Tim</h2>
          <button onClick={() => setTForm({ name: "", role: "", photo: "" })} className="text-sm text-brand-700 hover:underline">+ Tambah</button>
        </div>
        {tForm && (
          <form onSubmit={saveMember} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input placeholder="Nama" value={tForm.name} onChange={(e) => setTForm({ ...tForm, name: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
              <input placeholder="Peran" value={tForm.role} onChange={(e) => setTForm({ ...tForm, role: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <ImageUpload label="Foto tim" value={tForm.photo} onChange={(v) => setTForm({ ...tForm, photo: v })} />
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-3 py-1.5 text-sm disabled:opacity-60">Simpan</button>
              <button type="button" onClick={() => setTForm(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Batal</button>
            </div>
          </form>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {team.map((t) => (
            <div key={t.id} className="border border-slate-200 rounded-lg p-3 text-center">
              {t.photo_path ? <img src={t.photo_path} alt={t.name} className="h-16 w-16 rounded-full object-cover mx-auto" /> : <div className="h-16 w-16 rounded-full bg-slate-200 mx-auto" />}
              <div className="mt-2 font-medium text-sm">{t.name}</div>
              <div className="text-xs text-slate-500">{t.role}</div>
              <div className="mt-2 flex gap-2 justify-center">
                <button onClick={() => setTForm({ id: t.id, name: t.name, role: t.role, photo: t.photo_path || "" })} className="text-brand-700 text-xs hover:underline">Edit</button>
                <button onClick={() => removeMember(t.id)} className="text-red-600 text-xs hover:underline">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
