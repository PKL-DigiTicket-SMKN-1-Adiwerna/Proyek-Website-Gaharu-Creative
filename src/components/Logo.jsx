/*
 * Logo Gaharu Creative: kotak hijau berisi huruf G putih, sama dengan favicon
 * di tab browser (public/icon.svg).
 *
 * DESAIN.md tahap wireframe masih grayscale, jadi hijau ini satu-satunya
 * warna yang muncul: logo adalah identitas brand, bukan elemen desain, dan
 * harus identik dengan favicon. Warna lewat token --brand supaya tahap
 * pewarnaan berikutnya cukup ganti di satu tempat.
 *
 * Glyph digeser naik 2.98 unit supaya optiknya duduk di tengah kotak; nilai
 * yang sama dipakai di public/icon.svg dan seluruh icon-*.png.
 */
const GLYPH = "M22.5 12.4a7.2 7.2 0 1 0 .5 6.6h-6.9v-2.9h10v2.9a10.2 10.2 0 1 1-3.6-7.8z";

export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false">
      <rect width="32" height="32" rx="7" fill="var(--brand)" />
      <path d={GLYPH} transform="translate(0.1 -2.98)" fill="var(--brand-ink)" />
    </svg>
  );
}
