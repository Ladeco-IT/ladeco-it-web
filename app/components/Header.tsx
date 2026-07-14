"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pc-builder", label: "PC Builder" },
    { href: "/about", label: "Over ons" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="w-full border-b border-[color:var(--border)]/70 bg-[color:var(--surface)]/95 shadow-[0_10px_30px_rgba(36,25,19,0.04)] backdrop-blur">
      <div className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        <header className="w-full rounded-none border-0 bg-transparent px-0 py-0">
          <div className="relative flex items-center sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
            <Link href="/" className="flex items-center gap-3 sm:justify-self-start">
              <div className="relative h-12 w-12 overflow-hidden bg-transparent p-0 sm:h-14 sm:w-14">
                <Image
                  src="/logo.png"
                  alt="Ladeco IT logo"
                  fill
                  sizes="56px"
                  className="object-contain opacity-90"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--accent)]">Ladeco IT</p>
                <p className="text-sm font-medium text-[color:var(--foreground)]">Computers, software & netwerkservice</p>
              </div>
            </Link>

            <div className="hidden justify-self-center sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
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

            <div className="hidden sm:block sm:justify-self-end" aria-hidden="true" />

            <div className="ml-auto flex items-center gap-2 sm:hidden">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)] transition hover:bg-[color:var(--accent-soft)]"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsOpen((current) => !current)}
              >
                <span className="sr-only">Menu {isOpen ? "sluiten" : " openen"}</span>
                {isOpen ? (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <nav
            id="mobile-navigation"
            className={`mt-4 flex flex-col gap-2 text-sm sm:hidden ${isOpen ? "block" : "hidden"}`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
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
