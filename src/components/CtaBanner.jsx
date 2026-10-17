import { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../data/site.js";
import { ctaSlides } from "../data/cta.js";
import { Container } from "./ui.jsx";

/* Band CTA penutup halaman (DESAIN.md v2 bagian 3.10): satu gradasi hijau,
 * eyebrow pill transparan, judul putih, lalu dua tombol. Slide teksnya berbeda
 * per halaman, komponennya satu.
 */
const slideHref = (href) => {
  if (href === "whatsapp") return links.whatsapp;
  if (href === "email") return links.mail;
  return href;
};

const bandClass =
  "bg-[linear-gradient(120deg,#0a6b4f_0%,#053b2b_100%)]";
const buttonPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-paper px-6 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50";
const buttonSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-white/50 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10";

export default function CtaBanner({ page }) {
  const slides = ctaSlides[page] || ctaSlides.beranda;
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isExternal = (href) => !href.startsWith("/");

  return (
    <section aria-label="Ajakan konsultasi" className="border-t border-line bg-paper py-16 sm:py-20">
      <Container>
        <div className={`rounded-3xl px-6 py-12 text-center shadow-lg sm:px-12 sm:py-14 ${bandClass}`}>
          <span className="inline-flex items-center rounded-full border border-white/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
            Konsultasi gratis
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
            {slide.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
            {slide.detail}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {slide.actions.map((action) => {
              const className = action.kind === "primary" ? buttonPrimary : buttonSecondary;
              return isExternal(action.href) ? (
                <a
                  key={action.label}
                  href={slideHref(action.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {action.label}
                </a>
              ) : action.href.startsWith("/") ? (
                <Link key={action.label} to={action.href} className={className}>
                  {action.label}
                </Link>
              ) : (
                <a key={action.label} href={action.href} className={className}>
                  {action.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-current={i === index ? "true" : undefined}
              aria-label={`Tampilkan ajakan ${i + 1}: ${item.title}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-8 rounded-full transition-colors ${
                i === index ? "bg-brand-700" : "bg-line hover:bg-brand-100"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
