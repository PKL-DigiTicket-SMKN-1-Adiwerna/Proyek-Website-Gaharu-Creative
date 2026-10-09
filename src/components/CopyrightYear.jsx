/*
 * Tahun baca langsung saat komponen dirender, tanpa state. Tidak perlu build
 * ulang tiap Januari. `from` dipakai untuk rentang tahun, sesuai footer
 * wireframe yang menulis 2020 sampai sekarang.
 */
export default function CopyrightYear({ from = null }) {
  const now = new Date().getFullYear();
  return <>{from ? `${from}-${now}` : now}</>;
}
