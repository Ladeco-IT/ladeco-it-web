"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mb-6 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-200/50 backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white">
            <Link href="/">
              <Image src="/logo.png" alt="Ladeco IT logo" fill className="object-contain p-1" />
            </Link>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Ladeco IT</p>
            <p className="font-semibold text-slate-950">Computers, software & netwerkservice</p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-950 transition hover:border-slate-400 hover:bg-slate-50 sm:hidden"
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

      <nav
        id="mobile-navigation"
        className={`mt-4 flex flex-col gap-3 text-sm text-slate-700 sm:mt-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 ${isOpen ? "block" : "hidden"} sm:block`}
      >
        <Link
          href="/"
          className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950"
          onClick={() => setIsOpen(false)}
        >
          Over ons
        </Link>
        <Link
          href="/contact"
          className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
