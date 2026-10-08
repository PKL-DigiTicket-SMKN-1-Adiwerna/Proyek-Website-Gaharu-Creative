"use client";

import { site } from "@/lib/site";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Halo Gaharu Creative, saya ingin konsultasi gratis."
  );
  const href = `https://wa.me/${site.waNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-strong text-white shadow-lg hover:bg-brand-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-strong"
      aria-label="Chat WhatsApp Gaharu Creative"
    >
      <svg
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.673m-5.421 7.403c-.756.275-1.296.422-1.637.438-.202.008-2.178-.13-2.493-.144C3.897 21.226 2.25 18.717 2.013 17.747c-.123-.502-.122-2.496 1.408-5.068 1.191-1.97 2.64-3.345 4.412-3.93.562-.184 1.53-.21 2.686-.131.886.058 1.712.372 2.311.94.6.568.947 1.335 1.074 2.118.08.498.08 2.312-.074 2.43-.099.08-.248.13-.57.13h-.025z" />
      </svg>
    </a>
  );
}