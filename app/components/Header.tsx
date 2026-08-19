"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { buildLocalizedHref, resolveLang, type Lang } from "../lib/i18n";

type HeaderProps = {
  lang: Lang;
  searchParams: string;
};

export default function Header({ lang, searchParams }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: lang === "nl" ? "Home" : "Home" },
    { href: "/pc-builder", label: lang === "nl" ? "PC Builder" : "PC Builder" },
    { href: "/pricing", label: lang === "nl" ? "Prijzen" : "Pricing" },
    { href: "/about", label: lang === "nl" ? "Over ons" : "About us" },
    { href: "/contact", label: lang === "nl" ? "Contact" : "Contact" },
  ];

  function handleLanguageChange(nextLang: string) {
    const resolved = resolveLang(nextLang);
    router.replace(buildLocalizedHref(pathname, searchParams, resolved));
    setIsOpen(false);
  }

  return (
    <div
      className="header-shell w-full border-b border-[color:var(--border)]/70 bg-[color:var(--surface)]/95 shadow-[0_10px_30px_rgba(36,25,19,0.04)] backdrop-blur"
      style={{
        "--surface": "#fcf8f2",
        "--foreground": "#241913",
        "--muted": "#6f5b4e",
        "--border": "#d7c1a8",
        "--accent": "#9a5b2f",
        "--accent-soft": "#f4e3d0",
      } as React.CSSProperties}
    >
      <div className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        <header className="w-full rounded-none border-0 bg-transparent px-0 py-0">
          <div className="relative flex min-w-0 items-center gap-3 sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
            <Link href={buildLocalizedHref("/", searchParams, lang)} className="flex min-w-0 flex-1 items-center gap-2 sm:justify-self-start sm:gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden bg-transparent p-0 sm:h-14 sm:w-14">
                <Image
                  src="/logo.png"
                  alt="Ladeco IT logo"
                  fill
                  sizes="56px"
                  loading="eager"
                  className="object-contain opacity-90"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium leading-5 text-[color:var(--foreground)] sm:text-sm">
                  {lang === "nl" ? "Computers, software & netwerkservice" : "Computers, software & network services"}
                </p>
              </div>
            </Link>

            <div className="hidden justify-self-center sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={buildLocalizedHref(link.href, searchParams, lang)}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? "bg-[color:var(--accent)] text-white shadow-sm shadow-[rgba(36,25,19,0.12)]" : "text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]"}`}
                      style={isActive ? { color: "#ffffff" } : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="hidden sm:flex sm:justify-self-end sm:items-center">
              <label className="relative">
                <span className="sr-only">{lang === "nl" ? "Selecteer taal" : "Select language"}</span>
                <select
                  value={lang}
                  onChange={(event) => handleLanguageChange(event.target.value)}
                  className="h-11 appearance-none rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 pr-10 text-sm font-semibold text-[color:var(--foreground)] outline-none transition hover:bg-[color:var(--accent-soft)]"
                >
                  <option value="nl">Nederlands</option>
                  <option value="en">English</option>
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--muted)]">
                  ▾
                </span>
              </label>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:hidden">
              <button
                type="button"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)] transition hover:bg-[color:var(--accent-soft)]"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsOpen((current) => !current)}
              >
                <span className="sr-only">{lang === "nl" ? `Menu ${isOpen ? "sluiten" : "openen"}` : `Menu ${isOpen ? "close" : "open"}`}</span>
                <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden="true">
                  <span className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45" : "-translate-y-2"}`} />
                  <span className={`absolute h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-45" : "translate-y-2"}`} />
                </span>
              </button>
            </div>
          </div>

          <nav
            id="mobile-navigation"
            aria-hidden={!isOpen}
            inert={!isOpen}
            className={`mt-4 flex flex-col gap-2 overflow-hidden text-sm transition-[max-height,opacity,transform] duration-300 ease-in-out sm:hidden ${isOpen ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 -translate-y-2 opacity-0"}`}
          >
            <label className="relative mb-2 block">
              <span className="sr-only">{lang === "nl" ? "Selecteer taal" : "Select language"}</span>
              <select
                value={lang}
                onChange={(event) => handleLanguageChange(event.target.value)}
                className="h-11 w-full appearance-none rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 pr-10 text-sm font-semibold text-[color:var(--foreground)] outline-none transition hover:bg-[color:var(--accent-soft)]"
              >
                <option value="nl">Nederlands</option>
                <option value="en">English</option>
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--muted)]">
                ▾
              </span>
            </label>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={buildLocalizedHref(link.href, searchParams, lang)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 font-medium transition ${isActive ? "bg-[color:var(--accent)] text-white shadow-sm shadow-[rgba(36,25,19,0.12)]" : "text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]"}`}
                  style={isActive ? { color: "#ffffff" } : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </header>
      </div>
    </div>
  );
}
