import { articlesData } from "@/content/articles";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articlesData.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = articlesData.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Article Header */}
      <div className="space-y-4 text-center">
        <span className="bg-emerald-50 text-[#007A55] text-xs font-semibold px-3 py-1 rounded-full uppercase">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {article.title}
        </h1>
        <div className="flex justify-center items-center gap-4 text-xs text-slate-500 pt-2">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* Main Banner Image */}
      <div className="bg-slate-200 h-80 rounded-2xl w-full flex items-center justify-center text-slate-400 text-sm">
        [ Image Header Artikel ]
      </div>

      {/* Article Content */}
      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 italic border-l-4 border-[#007A55] pl-4">
          {article.content.intro}
        </p>

        {article.content.sections.map((sec, idx) => (
          <div key={idx} className="space-y-3 pt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{sec.heading}</h2>
            <p className="text-slate-600 leading-relaxed">{sec.body}</p>
          </div>
        ))}
      </div>

      {/* Navigation Back */}
      <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
        <Link href="/insight" className="secondary-btn text-xs">
          ← Kembali ke Insight
        </Link>
        <Link href="/kontak" className="primary-btn text-xs">
          Diskusi Bersama Kami →
        </Link>
      </div>
    </article>
  );
}