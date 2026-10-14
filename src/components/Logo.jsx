/* Logo baru memakai berkas gambar di public/icon-11.png.
 * Karena Logo dipakai di header, footer, dan tempat lain, cukup ubah file ini
 * dan semua penggunaan logo ikut berubah.
 */
export default function Logo({ className = "h-9 w-9" }) {
  return (
    <img
      src="/icon-11.png"
      alt=""
      aria-hidden="true"
      className={`${className} object-contain`}
    />
  );
}
