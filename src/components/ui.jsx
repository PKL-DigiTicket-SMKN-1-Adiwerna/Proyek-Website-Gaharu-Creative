import { Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";

/*
 * Primitif tampilan yang dipakai ulang di enam halaman.
 *
 * Batas kontras sudah dihitung di atas putih, lihat komentar src/index.css.
 * Di tahap wireframe hanya ada tiga tombol: terisi, outline, dan navbar.
 * Kalau warna brand masuk nanti, cukup ganti utility di konstanta `base`
 * tanpa menyentuh halaman satu per satu.
 */

export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>{children}</div>;
}

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors";

const buttonStyles = {
  primary: "bg-ink text-paper hover:bg-black",
  secondary: "border border-ink bg-paper text-ink hover:bg-block",
  nav: "bg-fill text-ink hover:bg-line",
};

/* Tombol bisa berubah jadi tautan router, tautan luar, atau tombol form. */
export function Button({
  to = null,
  href = null,
  kind = "primary",
  className = "",
  children,
  ...rest
}) {
  const full = `${buttonBase} ${buttonStyles[kind]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={full} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={full}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={rest.type || "button"} className={full} {...rest}>
      {children}
    </button>
  );
}

/* Label kecil, dipakai untuk tag kategori di pojok kartu (DESAIN.md 3.5). */
export function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-block rounded-sm bg-tag px-2 py-1 text-xs font-semibold text-tag-ink ${className}`}
    >
      {children}
    </span>
  );
}

/* Chip filter kategori. Dipakai Portofolio, Insight, dan Filter Cepat. */
export function FilterChip({ active = false, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-field bg-paper text-ink hover:bg-block"
      }`}
    >
      {children}
    </button>
  );
}

/*
 * Ikon dalam lingkaran abu muda (DESAIN.md 2.2). size: md untuk kartu, sm
 * untuk di dalam chip filter. Dekoratif: judul atau label teks selalu tampil
 * di sebelahnya, jadi ikon tidak ikut menamai tombol atau card.
 */
export function IconCircle({ name, size = "md", className = "" }) {
  const box = size === "sm" ? "h-7 w-7" : "h-11 w-11";
  const glyph = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center rounded-full bg-fill text-ink ${className}`}
      aria-hidden="true"
    >
      <Icon name={name} className={glyph} />
    </span>
  );
}

/*
 * Penanda visual untuk tempat yang isinya belum dikirim klien.
 * Wireframe menaruh kotak abu di semua slot gambar, peta, dan foto.
 * Atribut data-placeholder menambah badge "belum diverifikasi" dari index.css.
 */
export function ImageBlock({ label, hint = "", ratio = "aspect-[4/3]", className = "" }) {
  return (
    <div
      data-placeholder="Data belum diverifikasi"
      className={`flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-line bg-block p-6 text-center ${ratio} ${className}`}
    >
      <Icon name="layers" className="h-6 w-6 text-muted" />
      <span className="text-sm font-semibold text-muted">{label}</span>
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </div>
  );
}

/* Header section: label kecil di atas, H2 tebal rata tengah, subjudul kecil. */
export function SectionHead({ label, title, subtitle, align = "center", as = "h2", className = "" }) {
  const centered = align === "center";
  /* `as` dipakai halaman tanpa hero (Layanan, Kontak) supaya judul section
   * pertama tetap jadi H1 tunggal halaman itu. */
  const Heading = as === "h1" ? "h1" : "h2";
  const titleSize =
    as === "h1"
      ? "text-3xl sm:text-4xl"
      : "text-2xl sm:text-3xl";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {label ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
      ) : null}
      <Heading
        className={`mt-2 ${titleSize} font-bold tracking-tight text-ink ${
          centered ? "" : "text-left"
        }`}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p className={`mt-3 text-base leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Section({ id, className = "", children, divider = false }) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${divider ? "border-t border-line " : ""}py-14 sm:py-20 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
