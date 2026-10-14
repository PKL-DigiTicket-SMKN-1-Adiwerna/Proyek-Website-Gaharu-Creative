import Link from "next/link";
import { siteConfig } from "@/lib/site";
import CopyrightYear from "./CopyrightYear";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <span className="text-xl font-bold text-[#007A55]">Gaharu Creative</span>
          <p className="text-sm text-slate-600 leading-relaxed">{siteConfig.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 mb-4">Tautan Cepat</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/" className="hover:text-[#007A55]">Beranda</Link></li>
            <li><Link href="/tentang" className="hover:text-[#007A55]">Tentang Kami</Link></li>
            <li><Link href="/layanan" className="hover:text-[#007A55]">Layanan</Link></li>
            <li><Link href="/portofolio" className="hover:text-[#007A55]">Portofolio</Link></li>
            <li><Link href="/insight" className="hover:text-[#007A55]">Insight</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 mb-4">Layanan Utama</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Branding & Creative Strategy</li>
            <li>Web & Custom Software</li>
            <li>Performance Marketing</li>
            <li>Social Media Management</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 mb-4">Hubungi Kami</h4>
          <p className="text-sm text-slate-600 mb-2">{siteConfig.contact.address}</p>
          <p className="text-sm text-slate-600 mb-2">{siteConfig.contact.email}</p>
          <p className="text-sm text-slate-600">{siteConfig.contact.phone}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 mt-12 pt-6 text-center text-sm text-slate-500">
        © <CopyrightYear /> {siteConfig.name}. Semua hak dilindungi.
      </div>
    </footer>
  );
}