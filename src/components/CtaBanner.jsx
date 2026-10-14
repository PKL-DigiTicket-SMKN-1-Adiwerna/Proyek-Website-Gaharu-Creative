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
              ? "border-emerald-700 bg-[#047857] text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] border-b-4 border-b-emerald-900/40"
              : "border-line bg-block"
          }`}
        >
          <h2
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${
              green ? "text-white" : "text-ink"
            }`}
          >
            {slide.title}
          </h2>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base leading-relaxed ${
              green ? "text-white/90" : "text-muted"
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
