import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "../components/ContactForm";
import { resolveLang } from "../lib/i18n";
import { defaultKeywords, siteName, socialImage } from "../seo";

const contactCopy = {
  nl: {
    title: "Contact",
    description: "Neem contact op met Ladeco IT voor een vraag, advies of een offerte op maat.",
  },
  en: {
    title: "Contact",
    description: "Contact Ladeco IT for a question, advice or a custom quote.",
  },
};

export const metadata: Metadata = {
  title: contactCopy.nl.title,
  description: contactCopy.nl.description,
  alternates: {
    canonical: "/contact",
  },
  keywords: [...defaultKeywords, "contact IT", "offerte IT", "computer service"],
  openGraph: {
    title: `Contact | ${siteName}`,
    description: contactCopy.nl.description,
    url: "/contact",
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
    title: `Contact | ${siteName}`,
    description: contactCopy.nl.description,
    images: [socialImage],
  },
};

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const lang = resolveLang(resolvedSearchParams?.lang);
  const copy = lang === "nl"
    ? {
        eyebrow: "Contact",
        title: "Neem contact op voor een passend advies.",
        intro:
          "Heb je een vraag over onze diensten of wil je een afspraak maken? Vul het formulier in en we nemen snel contact met je op.",
        direct: "Direct contact",
        directText:
          "Je kunt ons telefonisch bereiken of het formulier invullen. We geven een eerlijk advies en zorgen dat je weet wat je kunt verwachten.",
      }
    : {
        eyebrow: "Contact",
        title: "Get in touch for tailored advice.",
        intro:
          "Have a question about our services or want to schedule a meeting? Fill out the form and we will get back to you quickly.",
        direct: "Direct contact",
        directText:
          "You can reach us by phone or use the form. We give honest advice and make sure you know what to expect.",
      };


  return (
    <main className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="headline mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-[color:var(--muted)]">
            {copy.intro}
          </p>
        </div>

        <div className="space-y-6 text-[color:var(--muted)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">{copy.direct}</p>
          <p className="text-base leading-8">
            {copy.directText}
          </p>
          <div className="space-y-2 text-sm">
            <p>{lang === "nl" ? "Telefoon" : "Phone"}: +32 478 22 86 26</p>
            <p>E-mail: info@ladeco-it.com</p>
          </div>
        </div>
      </section>

      <section>
        <Suspense fallback={null}>
          <ContactForm lang={lang} />
        </Suspense>
      </section>
    </main>
  );
}
