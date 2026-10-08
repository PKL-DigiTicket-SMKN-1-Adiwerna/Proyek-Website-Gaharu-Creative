import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gaharu Creative | Digital Agency 360°",
  description:
    "Gaharu Creative adalah digital agency 360° di Semarang. Branding, content, social media, performance marketing, dan digital product development untuk UMKM, korporasi, dan mitra pemerintah.",
  keywords: [
    "digital agency Semarang",
    "jasa digital marketing",
    "branding agency Semarang",
    "social media management Semarang",
    "web development agency Semarang",
  ],
  openGraph: {
    title: "Gaharu Creative | Digital Agency 360°",
    description:
      "Gaharu Creative adalah digital agency 360° di Semarang. Branding, content, social media, performance marketing, dan digital product development untuk UMKM, korporasi, dan mitra pemerintah.",
    type: "website",
    locale: "id_ID",
    siteName: "Gaharu Creative",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${bricolageGrotesque.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
