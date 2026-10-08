import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { services } from "../data/services.js";
import { Seo } from "../components/Seo.jsx";

const waHref = `https://wa.me/${site.waNumber}?text=${encodeURIComponent(
  "Halo Gaharu Creative, saya ingin konsultasi gratis."
)}`;

export default function HomePage() {
  return (
    <>
      <Seo title={`${site.name} | Digital agency 360 di Semarang`} description={site.description} />
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-action-text">
            Digital agency 360&deg; di Semarang
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl">
            Identitas, konten, dan iklan yang kerjakannya bisa diukur.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Kami mulai dari masalah yang sudah Anda behalf, bukan dari daftar jasa. Dari situ baru
            menentukan maneuver yang perlu dikerjakan dan bagaimana hasilnya diukur.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-action px-6 text-base font-semibold text-on-action transition-colors hover:bg-action-hover"
            >
              Konsultasi gratis
            </a>
            <Link
              to="/layanan"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-card px-6 text-base font-semibold text-text transition-colors hover:bg-accent/10"
            >
              Lihat layanan
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted">
            Email <span className="text-text">{site.email}</span>{" "}
            <span className="text-flag">(domain belum dikonfirmasi)</span>
          </p>
        </div>
      </section>

      {/* Layanan. Grid kartu dengan judul generic adalah pola yang paling
          sering dipakai template, jadi replaced dengan daftar bernomor
          yang lebih mudah dipindai. */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
              Lima layanan, satu alur kerja
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Kebanyakan klien butuh lebih dari satu layanan. Kerjakan berurutan dari identitas,
              baru konten dan kanalnya, terakhir Biasanya iklan.
            </p>
          </div>

          <ol className="mt-12 divide-y divide-border border-t border-border">
            {services.map((service, i) => (
              <li key={service.slug} className="group">
                <Link
                  to={`/layanan#${service.slug}`}
                  className="flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="w-10 shrink-0 font-display text-sm font-semibold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="font-display text-xl font-semibold text-text transition-colors group-hover:text-action-text">
                      {service.title}
                    </span>
                    <span className="mt-2 block max-w-2xl leading-relaxed text-muted">
                      {service.short}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-sm font-medium text-action-text opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Detail &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cara kerja. Menggantikan blok testimoni dan blok statistik,
          karena keduanya butuh data klien yang belum ada. */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
              Cara kami bekerja
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Empat tahap yang sama untuk setiap proyek, dengan skala yang berbeda.
            </p>
          </div>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "Audits",
                body: "Kami periksa dulu kanal, data, dan competitor yang sudah ada. Banyak masalah bereser dari sini.",
              },
              {
                step: "Rencana",
                body: "Pekerjaan, target, dan batas lingkup ditulis lengkap sebelum ada yang dikerjakan.",
              },
              {
                step: "Eksekusi",
                body: "Produksi berjalan per tahap. Anda melihat hasilnya, bukan cuma laporan akhir.",
              },
              {
                step: "Evaluasi",
                body: "Ukuran keberhasilan disepakati di awal, lalu dicek ulang tiap bulan.",
              },
            ].map((item, i) => (
              <li key={item.step}>
                <p className="font-display text-sm font-semibold tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-text">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Portofolio. Dibiarkan kosong dan diberi tahu ke pembaca, bukan
          diisi dengan studi kasus fiktif. */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                Portofolio
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Daftar klien dan hasil kerjasamanya belum dikirim. Halaman ini akan diisi begitu
                datanya lengkap dan disetujui.
              </p>
            </div>
            <Link
              to="/portofolio"
              className="text-sm font-semibold text-action-text underline underline-offset-4"
            >
              Buka halaman portofolio
            </Link>
          </div>
        </div>
      </section>

      {/* CTA penutup */}
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6">
          <div className="flex flex-col gap-8 border-t border-border pt-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-text">
                Punya masalah yang belum selesai?
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Ceritakan situasinya lewat WhatsApp. Konsultasi pertama tidak perlu diayar dan tidak
                mengikat.
              </p>
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-action px-7 text-base font-semibold text-on-action transition-colors hover:bg-action-hover"
            >
              Konsultasi gratis
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
