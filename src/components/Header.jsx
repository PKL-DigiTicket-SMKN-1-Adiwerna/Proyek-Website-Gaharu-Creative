import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks, clientLanguages } from "../data/site.js";
import { useSite, linksFor } from "../lib/useSite.js";
import { useBahasa } from "../lib/i18n.js";
import { useTema } from "../lib/tema.js";
import { Button, Container } from "./ui.jsx";
import { Icon } from "./Icons.jsx";
import Logo from "./Logo.jsx";

/* Logo kiri, menu rata tengah, pemilih tema + bahasa dan tombol Hubungi Kami di
 * kanan (DESAIN.md bagian 3.1; permintaan CeO 19 Okt 2026). Pemilih bahasa
 * benar-benar mengganti bahasa antarmuka (src/lib/i18n.js); tombol tema
 * mengganti mode terang/gelap (src/lib/tema.js). */
function LanguagePicker() {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const { kode, t, ganti } = useBahasa();

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={box}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("Pilih bahasa")}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-field px-3 text-sm font-semibold text-ink transition-colors hover:bg-block"
      >
        <Icon name="globe" className="h-5 w-5" />
        {kode.toUpperCase()}
        <Icon name="chevronDown" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <ul className="absolute right-0 z-50 mt-2 w-56 rounded-md border border-line bg-paper p-1.5 shadow-sm">
          {clientLanguages.map((lang) => {
            const bahasa = lang.code.toLowerCase();
            const aktif = bahasa === kode;
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => {
                    ganti(bahasa);
                    setOpen(false);
                  }}
                  aria-current={aktif ? "true" : undefined}
                  className={`flex min-h-11 w-full items-center justify-between rounded px-3 py-2 text-sm font-semibold transition-colors ${
                    aktif ? "bg-block text-ink" : "text-ink hover:bg-block"
                  }`}
                >
                  {lang.label}
                  {aktif ? <Icon name="check" className="h-5 w-5" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function ThemeToggle() {
  const { gelap, balik } = useTema();
  const { t } = useBahasa();
  const label = gelap ? t("Mode terang") : t("Mode gelap");
  return (
    <button
      type="button"
      onClick={balik}
      aria-label={label}
      title={label}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-field text-ink transition-colors hover:bg-block"
    >
      <Icon name={gelap ? "sun" : "moon"} className="h-5 w-5" />
    </button>
  );
}

export default function Header() {
  const { name } = useSite();
  /* Tombol "Hubungi Kami" memakai nomor dari setelan situs, bukan nilai statis. */
  const wa = linksFor(useSite());
  const { t } = useBahasa();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line bg-paper">
      <Container>
        <div className="flex h-[72px] items-center gap-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Link
            to="/"
            className="flex shrink-0 items-center lg:justify-self-start"
            aria-label={`${name}, ${t("beranda")}`}
          >
            <Logo className="h-12 w-auto" />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex lg:justify-self-center"
            aria-label={t("Navigasi utama")}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand underline decoration-brand decoration-2 underline-offset-8"
                      : "text-muted hover:text-brand"
                  }`
                }
              >
                {t(link.label)}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:ml-0 lg:flex lg:justify-self-end">
            <ThemeToggle />
            <LanguagePicker />
            <Button href={wa.konsultasi} kind="nav" className="px-4">
              {t("Hubungi Kami")}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-field text-ink lg:hidden"
            aria-label={open ? t("Tutup menu") : t("Buka menu")}
          >
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-2 h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-2 -rotate-45" : "top-4"}`} />
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <div id="menu-mobile" className="border-t border-line bg-paper lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col" aria-label={t("Navigasi mobile")}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `min-h-11 rounded-md px-3 py-3 text-base font-medium ${
                      isActive ? "bg-brand/10 text-brand" : "text-muted hover:text-brand"
                    }`
                  }
                >
                  {t(link.label)}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
              <ThemeToggle />
              <LanguagePicker />
              <Button
                href={wa.konsultasi}
                kind="nav"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                {t("Hubungi Kami")}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
