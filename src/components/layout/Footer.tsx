"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="bg-surface text-ink py-16 border-t border-line">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-display font-semibold text-lg mb-4">{site.name}</h3>
            <p className="text-sm text-ink-soft leading-relaxed">{site.description}</p>
            <div className="mt-4 flex gap-3">
              {site.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-soft hover:text-brand transition-colors focus-visible:outline-none"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-ink-soft">Layanan</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/layanan#${service.slug}`}
                    className="hover:text-brand transition-colors focus-visible:outline-none"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-ink-soft">Kontak</h4>
            <address className="text-sm space-y-2 not-italic">
              <p>{site.address}</p>
              <p>{site.hours}</p>
              <p>{site.phone}</p>
              <p>{site.email}</p>
            </address>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4 text-ink-soft">Tautan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tentang" className="hover:text-brand transition-colors focus-visible:outline-none">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/portofolio" className="hover:text-brand transition-colors focus-visible:outline-none">Portofolio</Link>
              </li>
              <li>
                <Link href="/insight" className="hover:text-brand transition-colors focus-visible:outline-none">Insight</Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-brand transition-colors focus-visible:outline-none">Kontak</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink-soft">
          <p>&copy; {site.founded} - {site.founded + 10} {site.name}. Semua hak dilindungi.</p>
          <p>{site.legal.company}. {site.legal.legalNote}</p>
        </div>
      </div>
    </footer>
  );
}