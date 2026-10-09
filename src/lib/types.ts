export type Service = {
  slug: string;
  title: string;
  short: string;
  problem: string;
  deliverables: string[];
  process: { title: string; detail: string }[];
  outcome: string;
};

export type PortfolioItem = {
  slug: string;
  client: string;
  segment: "umkm" | "korporat" | "pemerintah";
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { label: string; value: string; note?: string }[];
  year: string;
  verified: boolean;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
  verified: boolean;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  founded: number;
  description: string;
  keywords: string[];
  waNumber: string;
  waNumberVerified: boolean;
  email: string;
  emailVerified: boolean;
  phone: string;
  address: string;
  addressVerified: false | boolean;
  hours: string;
  socials: { label: string; href: string; verified: boolean }[];
  legal: { company: string; legalNote: string };
};
