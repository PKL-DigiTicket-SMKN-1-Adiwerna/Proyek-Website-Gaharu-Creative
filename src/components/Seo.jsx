import { useEffect } from "react";
import { site } from "../data/site.js";

/* Meta tag per halaman. Title dan description di-set lewat JS karena route
 * dirender di browser.
 *
 * Canonical dibangun dari site.url (VITE_SITE_URL) + path relatif, bukan dari
 * window.location.href. Kalau VITE_SITE_URL belum diisi, tag canonical dilepas
 * supaya tidak ada canonical yang menunjuk ke domain staging
 * (temuan audit SEO, 12 Okt 2026).
 */
function upsertMeta(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }
  Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value));
}

export function Seo({ title, description, image = null }) {
  useEffect(() => {
    const fullTitle =
      title === site.name ? `${title} | ${site.tagline}` : `${title} | ${site.name}`;
    document.title = fullTitle;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    const canonical = document.querySelector('link[rel="canonical"]');
    const path = `${window.location.pathname}${window.location.search}`;
    if (site.url) {
      if (canonical) {
        canonical.setAttribute("href", `${site.url}${path}`);
      } else {
        const link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", `${site.url}${path}`);
        document.head.appendChild(link);
      }
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: `${site.url}${path}`,
      });
    } else if (canonical) {
      canonical.remove();
    }

    if (image) {
      upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    }
  }, [title, description, image]);

  return null;
}
