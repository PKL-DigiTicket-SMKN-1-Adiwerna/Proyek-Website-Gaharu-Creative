import { useEffect } from "react";
import { site } from "../data/site.js";

/*
 * Meta tag per halaman untuk SPA. Title dan description di-set lewat JS setiap
 * kali pindah halaman karena route dirender di browser.
 */
export function Seo({ title, description }) {
  useEffect(() => {
    document.title = title === site.name ? `${title} | ${site.tagline}` : `${title} | ${site.name}`;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", window.location.href);
  }, [title, description]);

  return null;
}
