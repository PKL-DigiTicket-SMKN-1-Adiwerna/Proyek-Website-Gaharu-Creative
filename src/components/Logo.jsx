/* Sumber gambar logo, dua berkas saja untuk seluruh situs:
 * - Logo        : public/logo.webp, ikon mark hasil konversi dari icon-11.png.
 *                 Dipakai di navbar (Header.jsx).
 * - LogoNama    : public/logo-nama.png, nama Gaharu Creative lengkap dengan aksen
 *                 mark di huruf G. Dipakai di footer.
 * Kanvas icon-11.png masih penuh ruang transparan, jadi berkasnya dipangkas dulu
 * ke area mark (224x217) sebelum dikonversi ke WebP lossless 240x233.
 * Jangan merender dua berkas berdampingan, mark sudah ada di dalam berkas nama.
 */
export default function Logo({ className = "h-10 w-auto" }) {
  return (
    <img
      src="/logo.webp"
      alt="Gaharu Creative"
      width={240}
      height={233}
      className={`${className} object-contain`}
    />
  );
}

export function LogoNama({ className = "h-10 w-auto" }) {
  return (
    <img
      src="/logo-nama.png"
      alt="Gaharu Creative"
      width={416}
      height={112}
      className={`${className} object-contain`}
    />
  );
}
