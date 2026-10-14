import { servicesData } from "@/content/services";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-20 py-12">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="bg-emerald-50 text-[#007A55] text-xs font-semibold px-3 py-1.5 rounded-full uppercase">
            {service.subtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {service.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>
          <div className="flex gap-4">
            <Link href="/kontak" className="primary-btn">
              Mulai Konsultasi →
            </Link>
          </div>
        </div>
        <div className="bg-slate-100 border border-slate-200 rounded-2xl h-80 flex items-center justify-center text-slate-400 text-sm">
          [ Dashboard / Preview Banner - {service.badge} ]
        </div>
      </section>

      {/* Masalah yang Sering Terjadi */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Masalah yang Sering Terjadi</h2>
            <p className="text-slate-600 text-sm">Tantangan yang sering dihadapi bisnis tanpa strategi yang terarah.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.problems.map((prob, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 space-y-3">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold text-sm">✕</div>
                <h3 className="font-bold text-slate-800 text-base">{prob.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables (Output) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Deliverables (Hasil yang Anda Terima)</h2>
          <p className="text-slate-600 text-sm">Output jelas dan konkret yang kami berikan untuk mendukung pertumbuhan bisnis Anda.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.deliverables.map((del, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-3">
              <span className="text-[10px] font-bold text-[#007A55] bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
                {del.tag}
              </span>
              <h3 className="font-bold text-slate-800 text-base">{del.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{del.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow / Cara Kerja */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Proses / Workflow Kerja</h2>
            <p className="text-slate-600 text-sm">Alur kerja sistematis untuk hasil yang terukur dan efisien.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.workflow.map((wf, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 space-y-3">
                <span className="text-xl font-extrabold text-[#007A55]">{wf.step}</span>
                <h3 className="font-bold text-slate-800 text-base">{wf.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{wf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">FAQ seputar {service.badge}</h2>
          <p className="text-slate-600 text-sm">Pertanyaan umum yang sering ditanyakan klien.</p>
        </div>
        <div className="space-y-4">
          {service.faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">{faq.question}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#007A55] rounded-3xl p-10 text-center text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Konsultasikan Kebutuhan {service.badge} Anda</h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
            Diskusi terbuka bersama tim profesional kami untuk menentukan strategi terbaik.
          </p>
          <Link href="/kontak" className="inline-block bg-white text-[#007A55] hover:bg-slate-100 font-semibold px-8 py-3 rounded-full text-xs sm:text-sm transition">
            Hubungi Kami Sekarang →
          </Link>
        </div>
      </section>
    </div>
  );
}