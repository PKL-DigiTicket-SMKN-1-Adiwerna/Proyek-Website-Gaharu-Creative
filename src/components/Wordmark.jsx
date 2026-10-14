/* Nama brand "Gaharu Creative" dalam bentuk gambar, bukan teks font.
 * Sumber: public/icon-12.png (logo+nama) yang sudah dipangkas jadi
 * public/logo-nama.png supaya tidak ada ruang kosong excessif.
 * Dipakai di header dan footer; ubah file ini untuk mengubah keduanya.
 */
export default function Wordmark({ className = "h-8 w-auto" }) {
  return (
    <img
      src="/logo-nama.png"
      alt="Gaharu Creative"
      className={`${className} object-contain`}
    />
  );
}