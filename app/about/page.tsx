import type { Metadata } from "next";

import { resolveLang } from "../lib/i18n";
import { defaultKeywords, siteName, socialImage } from "../seo";

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
        title: "IT die eerlijk, helder en klantgericht werkt.",
        intro:
          "Ladeco IT staat voor een goede prijs-kwaliteitverhouding, een service die je verder helpt en respect voor de klant in elke stap van het proces.",
        valuesTitle: "Onze kernwaarden",
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
        promiseTitle: "Geen verrassing, geen onnodige franje.",
        promiseText:
          "We geven je een helder advies, een praktische uitvoering en een prijs die past bij wat je echt nodig hebt.",
        pointsTitle: "Wat je van ons krijgt",
        points: [
          {
            title: "Duidelijke offertes",
            text: "Alles staat overzichtelijk op papier, zodat je direct weet waar je aan toe bent.",
          },
          { title: "Snelle service", text: "We reageren snel op vragen en lossen problemen op zonder lang te wachten." },
          { title: "Betrouwbaarheid", text: "Onze planning is realistisch en we houden ons aan de afspraken die we maken." },
        ],
        cards: [
          { title: "Eerlijk", text: "Duidelijke prijzen en heldere afspraken." },
          { title: "Lokaal", text: "We kennen de regio en werken dichtbij onze klanten." },
          { title: "Praktisch", text: "Geen mooie woorden, maar direct toepasbare oplossingen." },
          { title: "Rust", text: "Zodat jij vertrouwen hebt in je IT." },
        ],
      }
    : {
        eyebrow: "About us",
        title: "IT that works honestly, clearly and with the customer in mind.",
        intro:
          "Ladeco IT stands for good value for money, service that actually helps you move forward, and respect for the customer at every step of the process.",
        valuesTitle: "Our core values",
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
        promiseTitle: "No surprises, no unnecessary frills.",
        promiseText:
          "We give you clear advice, practical execution and a price that matches what you really need.",
        pointsTitle: "What you get from us",
        points: [
          {
            title: "Clear quotes",
            text: "Everything is laid out clearly so you know exactly what to expect.",
          },
          { title: "Fast service", text: "We respond quickly and solve issues without making you wait long." },
          { title: "Reliability", text: "Our planning is realistic and we stick to the agreements we make." },
        ],
        cards: [
          { title: "Honest", text: "Clear prices and clear agreements." },
          { title: "Local", text: "We know the region and work close to our customers." },
          { title: "Practical", text: "No fancy words, just directly usable solutions." },
          { title: "Calm", text: "So you can trust your IT." },
        ],
      };

  return (
    <main className="space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-4">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {copy.intro}
          </p>
        </div>

        <div className="bg-[color:var(--surface)] border border-[color:var(--border)] p-6 text-[color:var(--muted)]">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">{copy.valuesTitle}</p>
          <div className="mt-6 space-y-5">
            {copy.values.map((item) => (
              <div key={item.title}>
                <p className="font-semibold text-[color:var(--foreground)]">{item.title}</p>
                <p className="mt-2 text-base leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">{copy.pointsTitle}</p>
          <h2 className="text-3xl font-semibold text-[color:var(--foreground)]">{copy.promiseTitle}</h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            {copy.promiseText}
          </p>
        </div>

        <div className="space-y-6 text-[color:var(--muted)]">
          {copy.points.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="mt-1 h-3 w-3 rounded-full bg-[color:var(--accent)]"></span>
              <div>
                <p className="font-semibold text-[color:var(--foreground)]">{item.title}</p>
                <p className="mt-2 text-base leading-7">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.cards.map((item) => (
            <div key={item.title} className="border-t border-[color:var(--border)]/40 pt-4 text-[color:var(--muted)]">
              <p className="font-semibold text-[color:var(--foreground)]">{item.title}</p>
              <p className="mt-2 text-sm leading-6">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
