import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { services } from "./src/data/services.js";
import { posts } from "./src/data/insights.js";
import { portfolioItems } from "./src/data/portfolio.js";

/* Basis URL absolut untuk canonical, og:url, og:image, dan sitemap. Diisi lewat
 * VITE_SITE_URL begitu domain resmi ditetapkan; selama masih staging, nilai
 * cadangan di bawah ini yang dipakai supaya tautan absolut tidak kosong.
 * Domain yang berubah cukup diubah di satu tempat ini.
 */
const SITE_BASE = (
  process.env.VITE_SITE_URL || "https://proyek-website-gaharu-creative.vercel.app"
).replace(/\/$/, "");

/* Daftar rute untuk sitemap: rute statis + rute detail yang diambil dari data
 * supaya slug tidak pernah beda dengan yang dirender react-router.
 */
const RUTE_STATIS = [
  "/",
  "/tentang",
  "/layanan",
  "/portofolio",
  "/insight",
  "/kontak",
  "/kebijakan-privasi",
];
const RUTE_DINAMIS = [
  ...services.map((service) => `/layanan/${service.slug}`),
  ...portfolioItems.map((item) => `/portofolio/${item.slug}`),
  ...posts.map((post) => `/insight/${post.slug}`),
];

/* Plugin gaharu-seo:
 * - menyuntikkan canonical, og:url, og:image, dan twitter:image ke index.html
 *   (dev dan build), karena tag itu butuh URL absolut;
 * - menerbitkan robots.txt dan sitemap.xml ke dist supaya tidak lagi dijawab
 *   index.html oleh rewrite SPA di vercel.json.
 */
function gaharuSeo() {
  const gambar = `${SITE_BASE}/og-gaharu-creative.jpg`;
  return {
    name: "gaharu-seo",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const tags = [
          `<link rel="canonical" href="${SITE_BASE}/" />`,
          `<meta property="og:url" content="${SITE_BASE}/" />`,
          `<meta property="og:image" content="${gambar}" />`,
          `<meta name="twitter:image" content="${gambar}" />`,
        ].join("\n    ");
        return html.replace("</head>", `    ${tags}\n  </head>`);
      },
    },
    generateBundle() {
      const daftarRute = [...RUTE_STATIS, ...RUTE_DINAMIS];
      const urlset = daftarRute
        .map((rute) => `  <url>\n    <loc>${SITE_BASE}${rute}</loc>\n  </url>`)
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_BASE}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), gaharuSeo()],
});
