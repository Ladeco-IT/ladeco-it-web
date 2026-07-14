import Image from "next/image";
import type { Metadata } from "next";
import { buildLocalizedHref, resolveLang } from "./lib/i18n";
import { defaultKeywords, siteDescription, siteName, socialImage } from "./seo";

const homeCopy = {
  nl: {
    title: siteName,
    description: siteDescription,
    openGraphTitle: siteName,
    openGraphDescription: siteDescription,
  },
  en: {
    title: siteName,
    description: "Ladeco IT provides computer assembly, software development and network support at home and at your office.",
    openGraphTitle: siteName,
    openGraphDescription: "Ladeco IT provides computer assembly, software development and network support at home and at your office.",
  },
};

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: defaultKeywords,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
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
};

export default function Home({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = resolveLang(searchParams?.lang);
  const copy = lang === "nl"
    ? {
        eyebrow: "IT-service op maat",
        title: "IT-oplossingen die hun werk doen, zonder veel ophef.",
        intro:
          "Bij Ladeco IT bouwen we computers, software en netwerken met aandacht voor detail. We helpen particulieren en kleine bedrijven rustig, praktisch en zonder onnodige fratsen verder.",
        primary: "Vraag een offerte aan",
        secondary: "Meer over ons",
        sections: [
          {
            eyebrow: "Assemblage",
            title: "Sterke machines, zorgvuldig samengesteld.",
            text: "We bouwen computers met onderdelen die passen bij jouw werk, hobby of dagelijks gebruik.",
            imageAlt: "Computerassemblage in progress",
            image: "/computer_maken.png",
          },
          {
            eyebrow: "Software",
            title: "Duidelijke tools voor echte situaties.",
            text: "Van slimme automatisering tot praktische oplossingen die echt helpen op het werk.",
            imageAlt: "Softwareontwikkeling op een laptop",
            image: "/software_maken.png",
          },
          {
            eyebrow: "Netwerk",
            title: "Stabiele verbindingen, weinig gedoe.",
            text: "We zorgen voor een netwerk dat betrouwbaar is, ook als alles tegelijk gebruikt wordt.",
            imageAlt: "IT-werkplek met netwerkapparatuur",
            image: "/basis_foto.png",
          },
        ],
      }
    : {
        eyebrow: "Tailored IT service",
        title: "IT solutions that do their job without much fuss.",
        intro:
          "At Ladeco IT we build computers, software and networks with attention to detail. We help private customers and small businesses move forward calmly, practically and without unnecessary fuss.",
        primary: "Request a quote",
        secondary: "More about us",
        sections: [
          {
            eyebrow: "Assembly",
            title: "Strong machines, carefully assembled.",
            text: "We build computers with parts that fit your work, hobby or day-to-day use.",
            imageAlt: "Computer assembly in progress",
            image: "/computer_maken.png",
          },
          {
            eyebrow: "Software",
            title: "Clear tools for real situations.",
            text: "From smart automation to practical solutions that genuinely help at work.",
            imageAlt: "Software development on a laptop",
            image: "/software_maken.png",
          },
          {
            eyebrow: "Network",
            title: "Stable connections, little hassle.",
            text: "We make sure your network stays reliable, even when everything is running at once.",
            imageAlt: "IT workspace with network equipment",
            image: "/basis_foto.png",
          },
        ],
      };

  return (
    <main className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {copy.intro}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={buildLocalizedHref("/contact", searchParams?.lang ? `lang=${searchParams.lang}` : "", lang)} className="story-link justify-center sm:justify-start">
              {copy.primary}
              <span aria-hidden="true">↗</span>
            </a>
            <a href={buildLocalizedHref("/about", searchParams?.lang ? `lang=${searchParams.lang}` : "", lang)} className="story-link justify-center sm:justify-start">
              {copy.secondary}
            </a>
          </div>
        </div>

        <div className="relative h-[320px] w-full overflow-hidden rounded-md">
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <Image
              src="/logo.png"
              alt="Logo Ladeco IT"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="eager"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative max-h-[320px] overflow-hidden rounded-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
            <Image
              src={copy.sections[0].image}
              alt={copy.sections[0].imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-5">
          <p className="eyebrow">{copy.sections[0].eyebrow}</p>
          <h2 className="text-3xl font-semibold text-[color:var(--foreground)]">
            {copy.sections[0].title}
          </h2>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {copy.sections[0].text}
          </p>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-5">
          <p className="eyebrow">{copy.sections[1].eyebrow}</p>
          <h2 className="text-3xl font-semibold text-[color:var(--foreground)]">
            {copy.sections[1].title}
          </h2>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {copy.sections[1].text}
          </p>
        </div>

        <div className="relative max-h-[320px] overflow-hidden rounded-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
            <Image
              src={copy.sections[1].image}
              alt={copy.sections[1].imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative max-h-[320px] overflow-hidden rounded-md">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
            <Image
              src={copy.sections[2].image}
              alt={copy.sections[2].imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-5">
          <p className="eyebrow">{copy.sections[2].eyebrow}</p>
          <h2 className="text-3xl font-semibold text-[color:var(--foreground)]">
            {copy.sections[2].title}
          </h2>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {copy.sections[2].text}
          </p>
        </div>
      </section>
    </main>
  );
}
