/* Tahun dibaca saat render. `from` untuk rentang tahun di footer. */
export default function CopyrightYear({ from = null }) {
  const now = new Date().getFullYear();
  return <>{from ? `${from}-${now}` : now}</>;
}
