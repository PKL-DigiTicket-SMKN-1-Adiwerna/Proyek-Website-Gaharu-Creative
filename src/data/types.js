/* Bentuk data untuk site.js, services.js, portfolio.js, dan insights.js.
 * JavaScript murni, jadi tidak ada keyword type. Bentuk dicatat sebagai JSDoc
 * supaya IDE tetap memberi petunjuk saat menambah field.
 */

/** @typedef {Object} SocialLink */

/**
 * @typedef {Object} SiteConfig
 * @property {string} name
 * @property {string} tagline
 * @property {number} founded
 * @property {string} description
 * @property {string[]} keywords
 * @property {string} waNumber
 * @property {boolean} waNumberVerified
 * @property {string} email
 * @property {boolean} emailVerified
 * @property {string} phone
 * @property {string} address
 * @property {boolean} addressVerified
 * @property {string} hours
 * @property {SocialLink[]} socials
 * @property {{ company: string, legalNote: string }} legal
 */

/**
 * @typedef {Object} Service
 * @property {string} slug
 * @property {string} title
 * @property {string} short
 * @property {string} problem
 * @property {string[]} deliverables
 * @property {{ title: string, detail: string }[]} process
 * @property {string} outcome
 */

/**
 * Bentuk item portofolio. Strukturnya sudah disiapkan supaya tidak diisi ulang
 * nanti.
 *
 * @typedef {Object} PortfolioItem
 * @property {string} slug
 * @property {string} client
 * @property {"umkm" | "korporat" | "pemerintah"} segment
 * @property {string} industry
 * @property {string[]} services
 * @property {string} challenge
 * @property {string} solution
 * @property {{ label: string, value: string, note?: string }[]} results
 * @property {string} year
 * @property {boolean} verified
 */

/**
 * @typedef {Object} Post
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} date
 * @property {string} author
 * @property {string} readingTime
 * @property {string[]} tags
 * @property {boolean} verified
 */

export {};
