import { Link } from "react-router-dom";
import { portfolioItems as staticItems } from "../data/portfolio.js";
import { api, adaptPortfolioItems } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";

/* Daftar proyek lain di luar studi kasus yang sedang dibuka. Diambil dari API
 * supaya proyek baru dari panel admin ikut tampil, dengan cadangan statis kalau
 * API kosong atau gagal. Semua proyek selain yang sedang dibuka ditampilkan.
 */
export default function ProyekLainnya({ slug }) {
  const { data } = useApi(
    () => api.portfolio().then((j) => ({ data: adaptPortfolioItems(j.data) })),
    staticItems
  );
  const daftar = (data && data.length ? data : staticItems).filter((p) => p.slug !== slug);
  if (!daftar.length) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {daftar.map((p) => (
        <Link
          key={p.slug}
          to={`/portofolio/${p.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-4 shadow-sm transition-all hover:border-brand-600 hover:shadow-md"
        >
          <div>
            <div className="mb-3 aspect-[16/10] overflow-hidden rounded-xl bg-chip">
              <img
                src={p.image || "/Beranda.webp"}
                alt={p.gambarAlt || p.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-sm font-bold text-ink group-hover:text-button">{p.title}</h3>
            {p.summary ? (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{p.summary}</p>
            ) : null}
          </div>
          <span className="mt-4 block text-xs font-bold text-button">Lihat Detail Proyek →</span>
        </Link>
      ))}
    </div>
  );
}
