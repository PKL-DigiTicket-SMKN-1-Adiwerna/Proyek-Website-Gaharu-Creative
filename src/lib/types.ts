export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  problems: { title: string; desc: string }[];
  deliverables: { title: string; tag: string; desc: string }[];
  workflow: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
}