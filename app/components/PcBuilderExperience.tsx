"use client";

import Link from "next/link";
import { useState } from "react";

import { buildLocalizedHref, type Lang } from "../lib/i18n";

const euro = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

type PcBuilderExperienceProps = {
  lang: Lang;
};

type UsageIntent = "balanced" | "daily" | "student" | "gaming" | "creator" | "future";

export default function PcBuilderExperience({ lang }: PcBuilderExperienceProps) {
  const [simpleBudget, setSimpleBudget] = useState(2200);
  const [simpleUseCase, setSimpleUseCase] = useState<UsageIntent>("balanced");
  const [simpleNotes, setSimpleNotes] = useState("");
  const [wantsOrderAndPaymentLink, setWantsOrderAndPaymentLink] = useState(false);

  const copy = lang === "nl"
    ? {
        eyebrow: "Pc builder helper",
        title: "Eenvoudige pc-configuratiehulp.",
        intro: "Geef je budget en waarvoor je de pc wil gebruiken. Wij analyseren je vraag en bezorgen je de beste oplossing op maat.",
        usage: {
          balanced: "Allround",
          daily: "Dagelijks gebruik",
          student: "School en studie",
          gaming: "Gaming",
          creator: "Creatie (foto/video)",
          future: "Toekomstgericht",
        },
        budgetLabel: "Richtbudget",
        simpleUseCaseLabel: "Waarvoor wil je deze pc gebruiken?",
        simpleNotesLabel: "Extra wensen (optioneel)",
        simpleNotesPlaceholder: "Bijvoorbeeld: stil systeem, klein formaat, specifieke software, voorkeur AMD/Intel...",
        simpleFlowNote: "Na je aanvraag nemen we contact op met een concreet voorstel dat bij je budget en gebruik past.",
        simpleCta: "Vraag eenvoudige configuratie aan",
        orderIntentLabel: "Ik wil deze pc effectief bestellen en een betaallink ontvangen om de bestelling te bevestigen.",
        orderIntentCta: "Vraag eenvoudige configuratie + betaallink",
        quickSummaryTitle: "Snelle samenvatting",
      }
    : {
        eyebrow: "PC builder helper",
        title: "Simple PC configuration helper.",
        intro: "Share your budget and what you use the PC for. We analyze your request and provide the best tailored solution.",
        usage: {
          balanced: "Balanced",
          daily: "Everyday use",
          student: "School and study",
          gaming: "Gaming",
          creator: "Creative work",
          future: "Future-proof",
        },
        budgetLabel: "Target budget",
        simpleUseCaseLabel: "What will you use this PC for?",
        simpleNotesLabel: "Extra preferences (optional)",
        simpleNotesPlaceholder: "For example: silent system, compact case, specific software, AMD/Intel preference...",
        simpleFlowNote: "After your request we get back to you with a concrete recommendation that matches your budget and use case.",
        simpleCta: "Request simple configuration help",
        orderIntentLabel: "I want to place this order and receive a payment link to confirm it.",
        orderIntentCta: "Request simple configuration + payment link",
        quickSummaryTitle: "Quick summary",
      };

  const simpleUseCaseLabel = copy.usage[simpleUseCase];
  const simpleQuery = `pcMode=simple&pcSimpleBudget=${encodeURIComponent(String(simpleBudget))}&pcSimpleUse=${encodeURIComponent(simpleUseCaseLabel)}&pcSimpleNotes=${encodeURIComponent(simpleNotes)}&pcOrderIntent=${wantsOrderAndPaymentLink ? "1" : "0"}`;
  const simpleQuoteLink = buildLocalizedHref("/contact", simpleQuery, lang);

  return (
    <main className="space-y-8">
      <section className="panel-soft space-y-6 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">{copy.title}</h1>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">{copy.intro}</p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="panel space-y-6 p-6">
          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{copy.budgetLabel}</span>
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-sm text-[color:var(--muted)]">{lang === "nl" ? "Geschat budget" : "Estimated budget"}</span>
              <span className="text-sm font-semibold text-[color:var(--accent)]">{euro.format(simpleBudget)}</span>
            </div>
            <input
              type="range"
              min={900}
              max={5000}
              step={50}
              value={simpleBudget}
              onChange={(event) => setSimpleBudget(Number(event.target.value))}
              className="mt-4 w-full accent-[color:var(--accent)]"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{copy.simpleUseCaseLabel}</span>
            <select
              value={simpleUseCase}
              onChange={(event) => setSimpleUseCase(event.target.value as UsageIntent)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="balanced">{copy.usage.balanced}</option>
              <option value="daily">{copy.usage.daily}</option>
              <option value="student">{copy.usage.student}</option>
              <option value="gaming">{copy.usage.gaming}</option>
              <option value="creator">{copy.usage.creator}</option>
              <option value="future">{copy.usage.future}</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{copy.simpleNotesLabel}</span>
            <textarea
              rows={5}
              value={simpleNotes}
              onChange={(event) => setSimpleNotes(event.target.value)}
              placeholder={copy.simpleNotesPlaceholder}
              className="mt-3 w-full rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            />
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
            <input
              type="checkbox"
              checked={wantsOrderAndPaymentLink}
              onChange={(event) => setWantsOrderAndPaymentLink(event.target.checked)}
              className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
            />
            <span>{copy.orderIntentLabel}</span>
          </label>
        </aside>

        <div className="space-y-6">
          <section className="panel-soft space-y-5 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">{copy.quickSummaryTitle}</p>
            <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Wij zoeken de beste oplossing voor jou" : "We find the best solution for you"}</h2>
            <div className="space-y-2 text-sm leading-7 text-[color:var(--muted)]">
              <p>{lang === "nl" ? `Budget: ${euro.format(simpleBudget)}` : `Budget: ${euro.format(simpleBudget)}`}</p>
              <p>{lang === "nl" ? `Gebruik: ${simpleUseCaseLabel}` : `Use case: ${simpleUseCaseLabel}`}</p>
              <p>{lang === "nl" ? `Betaallink gewenst: ${wantsOrderAndPaymentLink ? "Ja" : "Nee"}` : `Payment link requested: ${wantsOrderAndPaymentLink ? "Yes" : "No"}`}</p>
              {simpleNotes ? (
                <p>{lang === "nl" ? `Extra wensen: ${simpleNotes}` : `Extra preferences: ${simpleNotes}`}</p>
              ) : null}
            </div>

            <div className="rounded-2xl bg-[color:var(--accent-soft)]/70 px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
              {copy.simpleFlowNote}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={simpleQuoteLink} className="story-link inline-flex justify-center">
                {wantsOrderAndPaymentLink ? copy.orderIntentCta : copy.simpleCta}
              </Link>
              <Link href={buildLocalizedHref("/contact", lang === "nl" ? "" : "lang=en", lang)} className="story-link inline-flex justify-center">
                {lang === "nl" ? "Algemeen contact" : "General contact"}
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
