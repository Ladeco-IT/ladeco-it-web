import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import AppShell from "./components/AppShell";
import { defaultKeywords, siteDescription, siteName, siteUrl, socialImage } from "./seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: defaultKeywords,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "/",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18315148229"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18315148229');
            `,
          }}
        />
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
        <Suspense fallback={null}>
          <AppShell>{children}</AppShell>
        </Suspense>
      </body>
    </html>
  );
}
