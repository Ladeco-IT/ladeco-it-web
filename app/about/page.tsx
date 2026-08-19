import type { Metadata } from "next";
import Image from "next/image";

import { resolveLang } from "../lib/i18n";
import { defaultKeywords, siteName, socialImage } from "../seo";
import RevealOnScroll from "../components/RevealOnScroll";

const aboutCopy = {
  nl: {
    title: "Over ons",
    description: "Leer hoe Ladeco IT werkt: eerlijk advies, praktische uitvoering en service die verder helpt.",
  },
  en: {
    title: "About us",
    description: "Learn how Ladeco IT works: honest advice, practical execution and service that helps you move forward.",
  },
};

export const metadata: Metadata = {
  title: aboutCopy.nl.title,
  description: aboutCopy.nl.description,
  alternates: {
    canonical: "/about",
  },
  keywords: [...defaultKeywords, "over Ladeco IT", "IT bedrijf", "lokale IT service"],
  openGraph: {
    title: `Over ons | ${siteName}`,
    description: aboutCopy.nl.description,
    url: "/about",
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
    title: `Over ons | ${siteName}`,
    description: aboutCopy.nl.description,
    images: [socialImage],
  },
};

export default async function AboutPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const lang = resolveLang(resolvedSearchParams?.lang);
  const copy = lang === "nl"
    ? {
        eyebrow: "Over ons",
        title: "Ladeco IT: praktisch IT-bedrijf met focus op mensen.",
        intro:
          "Ladeco IT helpt particulieren en kleine bedrijven met computers, software en netwerken. We combineren technisch vakwerk met duidelijke communicatie zodat je precies weet wat we doen en waarom.",
        companyTitle: "Wie we zijn als bedrijf",
        companyText:
          "We bouwen en onderhouden systemen die betrouwbaar moeten werken in het dagelijkse leven. Geen overbodige complexiteit, wel oplossingen die passen bij je budget, je gebruik en je toekomstplannen.",
        valuesTitle: "Waar we voor staan",
        values: [
          {
            title: "Prijs-kwaliteit",
            text: "Eerlijke oplossingen die passen bij jouw budget en die lang meegaan.",
          },
          {
            title: "Goede service",
            text: "Snelle terugkoppeling en een daadkrachtige aanpak, ook nadat de opdracht klaar is.",
          },
          {
            title: "Respect",
            text: "We luisteren naar jouw wensen, houden rekening met jouw omgeving en communiceren open.",
          },
        ],
        teamTitle: "Ontmoet ons team",
        teamIntro:
          "Achter Ladeco IT staat een klein team dat elke opdracht mee opvolgt, van eerste vraag tot oplevering en nazorg.",
        team: [
          {
            name: "Depreytere Alessio",
            role: "Oprichter en technisch aanspreekpunt",
            text: "Alessio bewaakt de technische keuzes en vertaalt complexe IT-vragen naar heldere, haalbare oplossingen.",
            image: "/team/alessio-20260801-v2.jpeg",
            imageAlt: "Profielfoto van Depreytere Alessio",
          },
          {
            name: "Lahousse Thibaut",
            role: "Hardware en implementatie",
            text: "Thibaut focust op pc-assemblage, upgrades en kwaliteitscontrole zodat elke configuratie stabiel en klaar voor gebruik is.",
            image: "/team/thibaut-20260801.jpeg",
            imageAlt: "Profielfoto van Lahousse Thibaut",
          },
          {
            name: "Bultynck Alexander",
            role: "Support en projectopvolging",
            text: "Alexander zorgt voor vlotte communicatie, support en een correcte opvolging tijdens en na de uitvoering.",
            image: "/team/alexander-20260801.jpg",
            imageAlt: "Profielfoto van Bultynck Alexander",
          },
        ],
        finalTitle: "Wat je van ons mag verwachten",
        finalText:
          "Duidelijke afspraken, eerlijke prijzen en een team dat bereikbaar blijft. We willen dat je IT gewoon werkt, zodat jij verder kan met je werk of project.",
      }
    : {
        eyebrow: "About us",
        title: "Ladeco IT: a practical IT company with people-first service.",
        intro:
          "Ladeco IT supports private customers and small businesses with computers, software and networks. We combine technical craftsmanship with clear communication so you always understand what we do and why.",
        companyTitle: "Who we are as a company",
        companyText:
          "We build and maintain systems that must work reliably in daily life. No unnecessary complexity, just solutions that match your budget, your use case and your long-term plans.",
        valuesTitle: "What we stand for",
        values: [
          {
            title: "Value for money",
            text: "Honest solutions that fit your budget and last a long time.",
          },
          {
            title: "Good service",
            text: "Fast feedback and a decisive approach, even after the job is done.",
          },
          {
            title: "Respect",
            text: "We listen to your wishes, take your environment into account and communicate openly.",
          },
        ],
        teamTitle: "Meet our team",
        teamIntro:
          "Ladeco IT is run by a focused team that follows every project from the first request to delivery and aftercare.",
        team: [
          {
            name: "Depreytere Alessio",
            role: "Founder and technical lead",
            text: "Alessio guides the technical direction and translates complex IT questions into clear, practical solutions.",
            image: "/team/alessio-20260801-v2.jpeg",
            imageAlt: "Profile photo of Depreytere Alessio",
          },
          {
            name: "Lahousse Thibaut",
            role: "Hardware and implementation",
            text: "Thibaut focuses on PC assembly, upgrades and quality control so each configuration is stable and ready to use.",
            image: "/team/thibaut-20260801.jpeg",
            imageAlt: "Profile photo of Lahousse Thibaut",
          },
          {
            name: "Bultynck Alexander",
            role: "Support and project follow-up",
            text: "Alexander keeps communication smooth, handles support and ensures proper follow-up during and after delivery.",
            image: "/team/alexander-20260801.jpg",
            imageAlt: "Profile photo of Bultynck Alexander",
          },
        ],
        finalTitle: "What you can expect from us",
        finalText:
          "Clear agreements, fair pricing and a team that remains available. Our goal is simple: your IT should just work so you can focus on your work or project.",
      };

  return (
    <main className="space-y-14">
      <RevealOnScroll>
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-4">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {copy.intro}
          </p>
        </div>

        <div className="panel space-y-4 p-6 text-[color:var(--muted)]">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">{copy.companyTitle}</p>
          <p className="text-base leading-7">{copy.companyText}</p>
        </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="panel-soft p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">{copy.valuesTitle}</p>
          </div>
          <div className="space-y-5">
            {copy.values.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                <p className="font-semibold text-[color:var(--foreground)]">{item.title}</p>
                <p className="mt-2 text-base leading-7 text-[color:var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">{copy.teamTitle}</p>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">{copy.teamIntro}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {copy.team.map((member) => (
            <article key={member.name} className="panel space-y-3 p-5">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[color:var(--accent)]/55 bg-[color:var(--accent-soft)] ring-2 ring-[color:var(--border)]">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="64px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <p className="text-xl font-semibold text-[color:var(--foreground)]">{member.name}</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">{member.role}</p>
              <p className="text-sm leading-7 text-[color:var(--muted)]">{member.text}</p>
            </article>
          ))}
        </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="panel-soft p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">{copy.finalTitle}</p>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">{copy.finalText}</p>
        </div>
        </section>
      </RevealOnScroll>

    </main>
  );
}
