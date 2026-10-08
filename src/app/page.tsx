import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/content/services";

export default function Home() {
  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent-text uppercase tracking-wider mb-4">
              Digital Agency 360°
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              Gaharu Creative adalah partner digital 360° yang membuat pertumbuhan digital jadi sederhana, efektif, dan berdampak.
            </h1>
            <p className="text-lg text-ink-soft leading-relaxed mb-8">
              {site.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${site.waNumber}?text=Halo%20Gaharu%20Creative%2C%20saya%20ingin%20konsultasi%20gratis.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-[#059669] rounded-lg hover:bg-[#047857] transition-colors focus-visible:outline-none"
              >
                Konsultasi Gratis
              </a>
              <Link
                href="/layanan"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-ink bg-surface border border-line rounded-lg hover:bg-line transition-colors focus-visible:outline-none"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="bg-surface border-y border-line py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-brand">2020</p>
              <p className="text-sm text-ink-soft mt-1">Tahun berdiri</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-brand">5</p>
              <p className="text-sm text-ink-soft mt-1">Layanan inti</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-brand" data-placeholder="Data belum diverifikasi">
                KLIEN-01
              </p>
              <p className="text-sm text-ink-soft mt-1">Klien terlayani</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-brand" data-placeholder="Data belum diverifikasi">
                PROYEK-01
              </p>
              <p className="text-sm text-ink-soft mt-1">Proyek selesai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services summary */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Layanan Inti</h2>
          <p className="text-ink-soft mb-10 max-w-2xl">
            Lima layanan end-to-end yang menutupi kebutuhan digital bisnis Anda dari identitas sampai performa.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.slug}
                className="rounded-lg border border-line bg-surface p-6 flex flex-col"
              >
                <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-ink-soft flex-1">{service.short}</p>
                <Link
                  href={`/layanan#${service.slug}`}
                  className="mt-4 text-sm font-medium text-brand hover:text-brand-2 transition-colors focus-visible:outline-none"
                >
                  Detail layanan
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/layanan"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-[#059669] rounded-lg hover:bg-[#047857] transition-colors focus-visible:outline-none"
            >
              Lihat Semua Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="bg-surface border-t border-line py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Pengalaman Terpilih</h2>
              <p className="text-ink-soft max-w-2xl">
                Studi kasus yang sudah terverifikasi akan tampil di sini.
              </p>
            </div>
            <Link
              href="/portofolio"
              className="text-sm font-medium text-brand hover:text-brand-2 transition-colors focus-visible:outline-none shrink-0"
            >
              Semua portofolio
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="rounded-lg border border-line bg-paper p-6"
                data-placeholder="Data belum diverifikasi"
              >
                <p className="text-xs uppercase tracking-wider text-accent-text font-semibold mb-2">
                  KLIEN-0{i}
                </p>
                <h3 className="font-display text-lg font-semibold mb-2">
                  Studi kasus {i} (data asli belum dikirim)
                </h3>
                <p className="text-sm text-ink-soft">
                  Tantangan, solusi, dan hasil berangka akan ditampilkan di sini setelah data diverifikasi.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">Testimoni Klien</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <figure
                key={i}
                className="rounded-lg border border-line bg-surface p-6"
                data-placeholder="Data belum diverifikasi"
              >
                <blockquote className="text-ink-soft">
                  "Testimoni klien akan tampil di sini setelah tim kami menerima data asli."
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold">KONTAK-{i} (data asli belum dikirim)</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#10B981] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Siap tumbuh bersama kami?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Ceritakan kebutuhan Anda dan dapatkan konsultasi gratis tanpa komitmen.
          </p>
          <a
            href={`https://wa.me/${site.waNumber}?text=Halo%20Gaharu%20Creative%2C%20saya%20ingin%20konsultasi%20gratis.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-[#10B981] bg-white rounded-lg hover:bg-white/90 transition-colors focus-visible:outline-none"
          >
            Konsultasi Gratis via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}