import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { site, navLinks, links, clientLanguages } from "../data/site.js";
import { Button, Container } from "./ui.jsx";
import { Icon } from "./Icons.jsx";
import Logo from "./Logo.jsx";

/*
 * Navbar (DESAIN.md 3.1): logo kiri, menu tengah, pemilih bahasa dan tombol
 * Hubungi Kami kanan. Menu aktif ditandai garis bawah.
 */
function LanguagePicker() {
  const [open, setOpen] = useState(false);
  const box = useRef(null);

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
        aria-label="Pilih bahasa"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-field px-3 text-sm font-semibold text-ink transition-colors hover:bg-block"
      >
        <Icon name="globe" className="h-4 w-4" />
        ID
        <Icon name="chevronDown" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <ul className="absolute right-0 z-50 mt-2 w-56 rounded-md border border-line bg-paper p-1.5 shadow-sm">
          {clientLanguages.map((lang) => (
            <li key={lang.code}>
              {lang.available ? (
                <span
                  aria-current="true"
                  className="flex min-h-11 items-center justify-between rounded px-3 py-2 text-sm font-semibold text-ink"
                >
                  {lang.label}
                  <Icon name="check" className="h-4 w-4" />
                </span>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex min-h-11 items-center justify-between rounded px-3 py-2 text-sm text-muted"
                >
                  {lang.label}
                  <span className="text-xs uppercase tracking-wider">segera</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Header() {
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
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name}, beranda`}>
            <Logo className="h-9 w-9 shrink-0" />
            <span className="text-base font-bold tracking-tight text-ink">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-ink ${
                    isActive
                      ? "text-ink underline decoration-2 underline-offset-8"
                      : "text-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguagePicker />
            <Button to={links.konsultasi} kind="nav" className="px-4">
              Hubungi Kami
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-field text-ink lg:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
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
            <nav className="flex flex-col" aria-label="Navigasi mobile">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `min-h-11 rounded-md px-3 py-3 text-base font-medium ${
                      isActive ? "bg-block text-ink" : "text-muted"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
              <LanguagePicker />
              <Button
                to={links.konsultasi}
                kind="nav"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Hubungi Kami
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
