'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";
import { resolveLang } from "../lib/i18n";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const lang = resolveLang(searchParams.get("lang"));

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={lang} searchParams={searchParams.toString()} />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-6 pt-0 sm:px-8 sm:pb-8 lg:px-12 lg:pb-10">
        <main className="flex-1 pt-6 sm:pt-8 lg:pt-10">{children}</main>
        <Footer lang={lang} />
      </div>
    </div>
  );
}
