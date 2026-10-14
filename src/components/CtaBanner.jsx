import { useState } from "react";
import { links } from "../data/site.js";
import { ctaSlides } from "../data/cta.js";
import { Button, Container } from "./ui.jsx";

/* Tiga slide per halaman, ganti lewat tombol titik atau keyboard. */
const slideHref = (href) => {
  if (href === "whatsapp") return links.whatsapp;
  if (href === "email") return links.mail;
  return href;
};

export default function CtaBanner({ page }) {
  const slides = ctaSlides[page] || ctaSlides.beranda;
  // App memasang komponen ini dengan key sesuai rute, jadi pindah halaman
  // otomatis kembali ke slide pertama tanpa perlu effect.
  const [index, setIndex] = useState(0);

  const slide = slides[index];
  const green = slide.title === "Siap Mengembangkan Bisnis Anda?";

  return (
    <section aria-label="Ajakan" className="border-t border-line bg-paper py-14 sm:py-16">
      <Container>
        <div
          className={`rounded-lg border px-6 py-10 text-center sm:px-10 sm:py-12 ${
            green
              ? "relative overflow-hidden border-emerald-900/30 bg-[linear-gradient(135deg,#10b981_0%,#047857_45%,#065f46_100%)] text-white shadow-[0_24px_45px_-15px_rgba(4,120,87,0.55)] border-b-4 border-b-emerald-950/50"
              : "border-line bg-block"
          }`}
        >
          {green ? (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-lime-300/25 blur-3xl"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40"
              />
            </>
          ) : null}

          <div className="relative">
            <h2
              className={`text-2xl font-bold tracking-tight sm:text-3xl ${
                green ? "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]" : "text-ink"
              }`}
            >
              {slide.title}
            </h2>
            <p
              className={`mx-auto mt-3 max-w-2xl text-base leading-relaxed ${
                green ? "text-emerald-50" : "text-muted"
              }`}
            >
              {slide.detail}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {slide.actions.map((action) =>
                action.href.startsWith("/") ? (
                  <Button
                    key={action.label}
                    to={action.href}
                    kind={green && action.kind === "primary" ? "secondary" : action.kind}
                  >
                    {action.label}
                  </Button>
                ) : (
                  <Button
                    key={action.label}
                    href={slideHref(action.href)}
                    kind={green && action.kind === "primary" ? "secondary" : action.kind}
                  >
                    {action.label}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" aria-label="Pilih slide ajakan">
          {slides.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-current={i === index ? "true" : undefined}
              aria-label={`Tampilkan slide ${i + 1}: ${item.title}`}
              onClick={() => setIndex(i)}
              className={`h-11 w-6 rounded-full transition-colors ${
                i === index ? "bg-ink" : "bg-fill hover:bg-line"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
