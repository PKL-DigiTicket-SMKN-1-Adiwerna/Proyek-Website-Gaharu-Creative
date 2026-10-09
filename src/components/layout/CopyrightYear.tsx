import { Suspense } from "react";

// Next.js 16 Cache Components tidak boleh evaluates new Date() saat prerender.
// Membungkus dalam Suspense membuat nilainya dihitung per request, jadi
// tahun copyright selalu benar tanpa perlu build ulang tiap Januari.
async function Year() {
  const year = await new Promise<number>((resolve) =>
    setTimeout(() => resolve(new Date().getFullYear()), 0)
  );
  return <>{year}</>;
}

export default function CopyrightYear() {
  return (
    <Suspense fallback={<span>2020</span>}>
      <Year />
    </Suspense>
  );
}
