import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prerender awal lalu stream bagian yang dinamis (tahun copyright).
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
