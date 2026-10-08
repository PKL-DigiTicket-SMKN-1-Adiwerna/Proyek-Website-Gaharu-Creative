/*
 * Tahun copyright dihitung sekali saat komponen dirender.
 *
 * Tahun baca langsung saat komponen dirender, tanpa state.
 * Hasilnya selalu tahun berjalan, tidak perlu di-build ulang tiap Januari.
 */
export default function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}
