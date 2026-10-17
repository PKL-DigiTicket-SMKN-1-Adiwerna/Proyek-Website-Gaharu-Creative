import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "../data/site.js";
import { services } from "../data/services.js";
import { Button, Tag } from "./ui.jsx";
import { Icon } from "./Icons.jsx";

const GOALS = [
  { key: "brand", label: "Membangun atau memperbarui brand", detail: "Identitas visual, positioning, dan tone of voice.", icon: "brand" },
  { key: "leads", label: "Mendapatkan leads berkualitas", detail: "Kanal dan kampanye yang menghasilkan prospek.", icon: "target" },
  { key: "sales", label: "Meningkatkan penjualan", detail: "Optimasi funnel dari trafik ke transaksi.", icon: "chart" },
  { key: "product", label: "Memperbaiki website atau produk digital", detail: "UX, performa, dan fitur yang tepat.", icon: "code" },
  { key: "optimize", label: "Mengoptimalkan kanal yang sudah jalan", detail: "Audit, automasi, dan peningkatan berbasis data.", icon: "search" },
];

const SEGMENTS = [
  { key: "umkm", label: "UMKM / bisnis lokal", detail: "Bandwidth tim terbatas, butuh hasil cepat." },
  { key: "korporat", label: "Korporat / brand established", detail: "Butuh sistem, skalabilitas, dan governance." },
  { key: "pemerintah", label: "Pemerintah / layanan publik", detail: "Komunikasi jelas, inklusif, dan terukur." },
];

const CHANNELS = [
  { key: "website", label: "Website", icon: "code" },
  { key: "social", label: "Media sosial", icon: "social" },
  { key: "ads", label: "Iklan berbayar", icon: "chart" },
  { key: "seo", label: "SEO / konten", icon: "content" },
  { key: "email", label: "Email / CRM", icon: "mail" },
  { key: "marketplace", label: "Marketplace", icon: "store" },
  { key: "offline", label: "Offline / event", icon: "team" },
];

const PAINS = [
  { key: "brand-unclear", label: "Identitas brand belum jelas" },
  { key: "content-inconsistent", label: "Konten tidak konsisten" },
  { key: "ads-waste", label: "Iklan boros tanpa hasil" },
  { key: "web-slow", label: "Website lambat atau sulit dipakai" },
  { key: "low-engagement", label: "Engagement rendah" },
  { key: "no-data", label: "Tidak ada data yang diukur" },
];

const TIMELINES = [
  { key: "cepat", label: "Kurang dari 1 bulan", detail: "Butuh sprint singkat dan fokus." },
  { key: "sedang", label: "1 sampai 3 bulan", detail: "Ideal untuk fase implementasi." },
  { key: "panjang", label: "Lebih dari 3 bulan", detail: "Bisa roadmap bertahap." },
];

const SCALES = [
  { key: "kecil", label: "Ringan", detail: "Satu kanal atau satu aset utama." },
  { key: "sedang", label: "Sedang", detail: "Beberapa kanal terintegrasi." },
  { key: "besar", label: "Besar", detail: "Transformasi menyeluruh." },
];

const GOAL_LABELS = Object.fromEntries(GOALS.map((item) => [item.key, item.label]));
const SEGMENT_LABELS = Object.fromEntries(SEGMENTS.map((item) => [item.key, item.label]));
const TIMELINE_LABELS = Object.fromEntries(TIMELINES.map((item) => [item.key, item.label]));
const SCALE_LABELS = Object.fromEntries(SCALES.map((item) => [item.key, item.label]));

function recommend(goal, channels, pains) {
  const set = new Set();
  const add = (slug) => set.add(slug);

  if (goal === "brand") {
    add("branding");
    add("content");
    add("social-media");
  } else if (goal === "leads") {
    add("performance-marketing");
    add("content");
    add("digital-product-development");
  } else if (goal === "sales") {
    add("performance-marketing");
    add("social-media");
    add("content");
  } else if (goal === "product") {
    add("digital-product-development");
    add("branding");
    add("content");
  } else if (goal === "optimize") {
    add("performance-marketing");
    add("social-media");
    add("content");
  }

  if (pains.includes("brand-unclear")) add("branding");
  if (pains.includes("content-inconsistent")) add("content");
  if (pains.includes("ads-waste") || pains.includes("no-data")) add("performance-marketing");
  if (pains.includes("low-engagement")) add("social-media");
  if (pains.includes("web-slow")) add("digital-product-development");

  if (channels.includes("website")) add("digital-product-development");
  if (channels.includes("social")) add("social-media");
  if (channels.includes("ads")) add("performance-marketing");
  if (channels.includes("seo")) add("content");
  if (channels.includes("marketplace")) add("content");

  const ordered = ["branding", "content", "social-media", "performance-marketing", "digital-product-development"]
    .filter((slug) => set.has(slug));

  // Selalu minimal dua rekomendasi agar arahnya tidak kosong.
  if (ordered.length < 2) {
    ordered.push("content", "social-media");
  }
  const unique = [...new Set(ordered)];
  return services.filter((service) => unique.includes(service.slug));
}

function OptionCard({ active, onClick, icon, title, detail, multi = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-11 w-full items-start gap-3 rounded-md border p-4 text-left transition-colors ${
        active ? "border-brand-bright bg-button/10 text-ink" : "border-field bg-paper text-ink hover:border-brand-bright"
      }`}
    >
      {icon ? (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            active ? "bg-brand text-brand-ink" : "bg-fill text-ink"
          }`}
          aria-hidden="true"
        >
          <Icon name={icon} className="h-5 w-5" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold leading-snug">{title}</span>
        {detail ? <span className="mt-1 block text-xs leading-relaxed text-muted">{detail}</span> : null}
      </span>
      {multi ? (
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border ${
            active ? "border-brand bg-brand text-brand-ink" : "border-field bg-paper text-transparent"
          }`}
          aria-hidden="true"
        >
          <Icon name="check" className="h-4 w-4" />
        </span>
      ) : null}
    </button>
  );
}

function toggle(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function Diagnosa() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState(null);
  const [segment, setSegment] = useState("umkm");
  const [channels, setChannels] = useState([]);
  const [pains, setPains] = useState([]);
  const [timeline, setTimeline] = useState(null);
  const [scale, setScale] = useState(null);
  const [copyState, setCopyState] = useState("idle");
  const dialogRef = useRef(null);

  const steps = 6;
  const progress = Math.round((step / (steps - 1)) * 100);

  const reset = () => {
    setStep(0);
    setGoal(null);
    setSegment("umkm");
    setChannels([]);
    setPains([]);
    setTimeline(null);
    setScale(null);
    setCopyState("idle");
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    const onOpen = () => {
      setStep(0);
      setGoal(null);
      setSegment("umkm");
      setChannels([]);
      setPains([]);
      setTimeline(null);
      setScale(null);
      setCopyState("idle");
      setOpen(true);
    };
    window.addEventListener("open-diagnosa", onOpen);
    return () => window.removeEventListener("open-diagnosa", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => dialogRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open]);

  const recomputed = useMemo(
    () => (goal ? recommend(goal, channels, pains) : []),
    [goal, channels, pains]
  );

  const complexityScore =
    channels.length +
    pains.length +
    (scale === "besar" ? 2 : scale === "sedang" ? 1 : 0) +
    (timeline === "cepat" ? 2 : 0);
  const complexity = complexityScore >= 6 ? "Tinggi" : complexityScore >= 3 ? "Sedang" : "Ringan";
  const duration = complexity === "Tinggi" ? "8 sampai 12 minggu" : complexity === "Sedang" ? "4 sampai 8 minggu" : "2 sampai 4 minggu";

  const summary = useMemo(() => {
    if (!goal) return "";
    return [
      "Diagnosa Digital 360 - Gaharu Creative",
      `Tujuan utama: ${GOAL_LABELS[goal]}`,
      `Segmen: ${SEGMENT_LABELS[segment]}`,
      `Kanal aktif: ${channels.length ? channels.map((key) => CHANNELS.find((c) => c.key === key).label).join(", ") : "-"}`,
      `Tantangan: ${pains.length ? pains.map((key) => PAINS.find((p) => p.key === key).label).join(", ") : "-"}`,
      `Waktu yang realistis: ${TIMELINE_LABELS[timeline] || "-"}`,
      `Skala kebutuhan: ${SCALE_LABELS[scale] || "-"}`,
      `Rekomendasi layanan: ${recomputed.map((s) => s.title).join(", ")}`,
      `Perkiraan kompleksitas: ${complexity} (estimasi ${duration})`,
      "",
      "Ringkasan ini dihasilkan otomatis dari jawaban di diagnosa digital. Angka dan ruang lingkup final disesuaikan setelah discovery.",
    ].join("\n");
  }, [goal, segment, channels, pains, timeline, scale, recomputed, complexity, duration]);

  const canContinue = () => {
    if (step === 0) return Boolean(goal);
    if (step === 1) return Boolean(segment);
    if (step === 2) return channels.length > 0;
    if (step === 3) return pains.length > 0;
    if (step === 4) return Boolean(timeline && scale);
    return true;
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2500);
    }
  };

  const waHref = `https://wa.me/${site.waNumber}?text=${encodeURIComponent(summary)}`;
  /* Email resmi belum dikonfirmasi, jadi tombol email baru muncul kalau
   * site.emailVerified true (temuan audit C01, diterima 17 Okt 2026). */
  const mailHref =
    site.emailVerified && site.email
      ? `mailto:${site.email}?subject=${encodeURIComponent("Hasil Diagnosa Digital 360")}&body=${encodeURIComponent(summary)}`
      : null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="float-in-late fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-button bg-button px-4 py-3 text-sm font-semibold text-button-text shadow-sm transition-colors hover:opacity-90"
        aria-label="Buka diagnosa digital 360"
      >
        <Icon name="compass" className="h-5 w-5" />
        <span className="hidden sm:inline">Diagnosa Digital</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        aria-label="Tutup diagnosa"
        className="fixed inset-0 z-[60] bg-ink/20 backdrop-blur-sm"
        onClick={close}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnosa-title"
        tabIndex={-1}
        className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-line bg-paper p-5 shadow-sm sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Gaharu Studio</p>
            <h2 id="diagnosa-title" className="mt-1 text-2xl font-bold tracking-tight text-ink">
              Diagnosa Digital 360
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Tutup"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-field text-ink hover:bg-block"
          >
            <span aria-hidden="true" className="text-lg leading-none">&times;</span>
          </button>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted">
            <span>
              Langkah {Math.min(step + 1, steps - 1)} dari {steps - 1}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-fill">
            <div
              className="h-full rounded-full bg-button transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-6 max-h-[60vh] overflow-y-auto pr-1">
          {step === 0 ? (
            <div>
              <p className="text-base leading-relaxed text-muted">
                Pilih satu tujuan utama. Jawaban ini menentukan kombinasi layanan yang paling masuk akal.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {GOALS.map((item) => (
                  <OptionCard
                    key={item.key}
                    active={goal === item.key}
                    onClick={() => setGoal(item.key)}
                    icon={item.icon}
                    title={item.label}
                    detail={item.detail}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <p className="text-base leading-relaxed text-muted">Segmen mana yang paling mendekati bisnis Anda?</p>
              <div className="mt-5 grid gap-3">
                {SEGMENTS.map((item) => (
                  <OptionCard
                    key={item.key}
                    active={segment === item.key}
                    onClick={() => setSegment(item.key)}
                    title={item.label}
                    detail={item.detail}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <p className="text-base leading-relaxed text-muted">
                Kanal apa saja yang saat ini aktif? Pilih minimal satu.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {CHANNELS.map((item) => (
                  <OptionCard
                    key={item.key}
                    active={channels.includes(item.key)}
                    onClick={() => setChannels((prev) => toggle(prev, item.key))}
                    icon={item.icon}
                    title={item.label}
                    multi
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <p className="text-base leading-relaxed text-muted">
                Tantangan mana yang paling mengganggu saat ini? Pilih minimal satu.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {PAINS.map((item) => (
                  <OptionCard
                    key={item.key}
                    active={pains.includes(item.key)}
                    onClick={() => setPains((prev) => toggle(prev, item.key))}
                    title={item.label}
                    multi
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-base font-bold text-ink">Waktu yang realistis</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">Kapan hasil pertama perlu terlihat?</p>
                <div className="mt-4 grid gap-3">
                  {TIMELINES.map((item) => (
                    <OptionCard
                      key={item.key}
                      active={timeline === item.key}
                      onClick={() => setTimeline(item.key)}
                      title={item.label}
                      detail={item.detail}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-base font-bold text-ink">Skala kebutuhan</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">Seberapa luas program yang diharapkan?</p>
                <div className="mt-4 grid gap-3">
                  {SCALES.map((item) => (
                    <OptionCard
                      key={item.key}
                      active={scale === item.key}
                      onClick={() => setScale(item.key)}
                      title={item.label}
                      detail={item.detail}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div>
              <Tag>Hasil diagnosa</Tag>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
                Rekomendasi layanan untuk Anda
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Berdasarkan jawaban Anda, berikut kombinasi layanan yang kami sarankan untuk memulai.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {recomputed.map((service, index) => (
                  <article
                    key={service.slug}
                    className="rounded-md border border-line bg-block p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-button text-button-text">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
                          Prioritas {index + 1}
                        </span>
                        <span className="block text-sm font-bold text-ink">{service.title}</span>
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{service.short}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-4 rounded-md border border-line bg-paper p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">Perkiraan kompleksitas</p>
                  <p className="mt-2 text-lg font-bold text-ink">{complexity}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Estimasi durasi {duration}. Final setelah discovery.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">Langkah selanjutnya</p>
                  <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink">
                    <li>1. Kirim ringkasan ini ke tim Gaharu.</li>
                    <li>2. Kami balas dengan pertanyaan lanjutan.</li>
                    <li>3. Susun roadmap dan estimasi yang pas.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={waHref} kind="primary">
                  Kirim ke WhatsApp
                </Button>
                {mailHref ? (
                  <Button href={mailHref} kind="secondary">
                    Kirim lewat Email
                  </Button>
                ) : null}
                <Button kind="nav" onClick={copySummary}>
                  {copyState === "copied"
                    ? "Ringkasan tersalin"
                    : copyState === "error"
                    ? "Gagal menyalin"
                    : "Salin ringkasan"}
                </Button>
              </div>

              <pre className="mt-6 max-h-48 overflow-auto rounded-md border border-dashed border-line bg-block p-4 text-xs leading-relaxed text-muted">
                {summary}
              </pre>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <Button
            kind="secondary"
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            disabled={step === 0}
          >
            Kembali
          </Button>

          <div className="flex flex-wrap gap-3">
            {step < 5 ? (
              <Button kind="primary" onClick={() => setStep((prev) => prev + 1)} disabled={!canContinue()}>
                Lanjut
              </Button>
            ) : (
              <Button kind="secondary" onClick={reset}>
                Ulangi diagnosa
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}