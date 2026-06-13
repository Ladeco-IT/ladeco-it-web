import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ladeco IT | Computers, software en netwerkservice",
  description: "Ladeco IT verzorgt computerassemblage, softwareontwikkeling en netwerkondersteuning op kantoor en bij je thuis.",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-950">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-12">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-200/50 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white">
                <Image
                  src="/logo.png"
                  alt="Ladeco IT logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Ladeco IT</p>
                <p className="font-semibold text-slate-950">Computers, software & netwerkservice</p>
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
              <Link className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950" href="/">
                Home
              </Link>
              <Link className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950" href="/about">
                Over ons
              </Link>
              <Link className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950" href="/contact">
                Contact
              </Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
