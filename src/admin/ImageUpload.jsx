import { useRef, useState } from "react";

// Konversi file gambar ke WebP (data URL) di browser via canvas.
export async function fileToWebP(file, maxDim = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        const s = maxDim / Math.max(w, h);
        w = Math.round(w * s);
        h = Math.round(h * s);
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      const tryType = (type) =>
        new Promise((res) => {
          canvas.toBlob((blob) => {
            if (!blob) return res(null);
            const r = new FileReader();
            r.onloadend = () => res(r.result);
            r.readAsDataURL(blob);
          }, type, quality);
        });
      (async () => {
        let data = await tryType("image/webp");
        if (!data) data = await tryType("image/jpeg");
        if (!data) reject(new Error("Gagal mengonversi gambar"));
        else resolve(data);
      })();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("File bukan gambar valid"));
    };
    img.src = url;
  });
}

export default function ImageUpload({ value, onChange, label = "Gambar", hint = "" }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setErr("Ukuran berkas melebihi 8 MB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const dataUrl = await fileToWebP(file);
      onChange(dataUrl);
    } catch (ex) {
      setErr(ex.message || "Gagal upload");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-slate-700">{label}</div>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Pratinjau gambar"
            className="aspect-[16/10] w-full rounded-lg border border-slate-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-600 text-xs leading-6 text-center text-white"
            title="Hapus gambar"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-xs text-slate-400">
          Belum ada gambar
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
        >
          {busy ? "Mengonversi..." : value ? "Ganti gambar" : "Upload gambar"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <span className="text-xs text-slate-400">Otomatis dikonversi ke WebP</span>
      </div>
      {hint ? <p className="text-xs text-slate-400">{hint}</p> : null}
      {err && <div className="text-xs text-red-600">{err}</div>}
    </div>
  );
}
