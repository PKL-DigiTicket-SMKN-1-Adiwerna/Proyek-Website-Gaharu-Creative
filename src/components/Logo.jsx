/* Logo Gaharu Creative memakai satu berkas gambar saja: public/logo-nama.png
 * (mark + tulisan GAHARU + tulisan CREATIVE sudah menyatu di dalamnya).
 * Jangan menambahkan gambar mark terpisah di sebelahnya, karena mark sudah
 * termasuk di berkas ini dan akan tampil dobel.
 * Logo dipakai di header dan footer, jadi ubah berkas ini untuk mengubah keduanya.
 */
export default function Logo({ className = "h-10 w-auto" }) {
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
