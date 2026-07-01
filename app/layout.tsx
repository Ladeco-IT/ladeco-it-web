import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

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
      <body className="min-h-full bg-transparent text-slate-950 transition-colors duration-200 dark:bg-transparent dark:text-slate-100">
        <div className="min-h-screen">
          <div className="w-full border-b border-[color:var(--border)]/70 bg-[color:var(--surface)]/95 shadow-[0_10px_30px_rgba(36,25,19,0.04)] backdrop-blur">
            <div className=" max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <Header />
            </div>
          </div>

          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="site-shell flex min-h-screen flex-col p-3 sm:p-4 lg:p-5">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
