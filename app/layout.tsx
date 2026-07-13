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
      <head>
        <link rel="icon" href="/logo.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/logo-dark.png" media="(prefers-color-scheme: dark)" />
        <script dangerouslySetInnerHTML={{ __html: `
(function(){
  try {
    var light = '/logo.png';
    var dark = '/logo-dark.png';
    function setFavicon(href){
      var link = document.querySelector("link[id='dynamic-favicon']");
      if(!link){
        link = document.createElement('link');
        link.id = 'dynamic-favicon';
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = href;
    }
    var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    function update(){ setFavicon(mq && mq.matches ? dark : light); }
    update();
    if(mq && mq.addEventListener) mq.addEventListener('change', update);
  } catch(e){}
})();
        ` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
{"@context":"https://schema.org","@type":"Organization","name":"Ladeco IT","url":"https://ladeco-it.com","logo":"https://ladeco-it.com/logo.png"}
        ` }} />
      </head>
      <body className="min-h-full bg-slate-50 text-slate-950 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-12">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
