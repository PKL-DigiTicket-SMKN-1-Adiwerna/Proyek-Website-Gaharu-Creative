import { useState } from "react";
import { links } from "../data/site.js";
import { ctaSlides } from "../data/cta.js";
import { Button, Container } from "./ui.jsx";

/*
 * Banner CTA penutup di atas footer (DESAIN.md 3.3). Wireframe menggambar
 * satu kotak lebar dengan indikator tiga titik, jadi tiap halaman punya tiga
 * slide. Ganti slide lewat tombol titik atau lewat keyboard.
 *
 * `prefers-reduced-motion` dihormati: tanpa animasi paksa, perpindahan slide
 * tetap lewat tombol.
 */
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

  return (
    <section aria-label="Ajakan" className="border-t border-line bg-paper py-14 sm:py-16">
      <Container>
        <div className="rounded-lg border border-line bg-block px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{slide.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {slide.detail}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {slide.actions.map((action) =>
              action.href.startsWith("/") ? (
                <Button key={action.label} to={action.href} kind={action.kind}>
                  {action.label}
                </Button>
              ) : (
                <Button key={action.label} href={slideHref(action.href)} kind={action.kind}>
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
