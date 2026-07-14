"use client";

import Link from "next/link";
import { useState } from "react";

import { usePcPricing } from "./usePcPricing";
import { buildLocalizedHref, type Lang } from "../lib/i18n";

const euro = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

type PricingSimulatorProps = {
  lang?: Lang;
};

export default function PricingSimulator({ lang = "nl" }: PricingSimulatorProps) {
  const { pricingData, status, errorMessage, fallbackPricing } = usePcPricing(lang);
  const [selectedProfileId, setSelectedProfileId] = useState(fallbackPricing.profiles[0]?.id ?? "");
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);

  const selectedProfile = pricingData.profiles.find((profile) => profile.id === selectedProfileId) ?? pricingData.profiles[0];
  const selectedOptions = pricingData.options.filter((option) => selectedOptionIds.includes(option.id));
  const extrasTotal = selectedOptions.reduce((sum, option) => sum + option.price, 0);
  const currentTotal = selectedProfile.basePrice + extrasTotal;
  const selectedOptionLabels = selectedOptions.map((option) => option.label).join(", ") || (lang === "nl" ? "Geen extra hardware-upgrades" : "No extra hardware upgrades");
  const quoteLink = buildLocalizedHref(
    "/contact",
    `pcProfile=${encodeURIComponent(selectedProfile.id)}&pcLabel=${encodeURIComponent(selectedProfile.name)}&pcTotal=${encodeURIComponent(currentTotal.toFixed(2))}&pcExtras=${encodeURIComponent(selectedOptionIds.join(","))}&pcExtrasLabel=${encodeURIComponent(selectedOptionLabels)}`,
    lang,
  );

  return (
    <section className="panel-soft space-y-10 p-6 sm:p-8 lg:p-10">
      <div className="max-w-3xl space-y-4">
        <p className="eyebrow">{lang === "nl" ? "Pc building simulator" : "PC building simulator"}</p>
        <h2 className="headline text-3xl sm:text-4xl lg:text-5xl">
          {lang === "nl" ? "Actuele computerprijzen, apart van onze servicekosten." : "Current computer prices, separate from our service fees."}
        </h2>
        <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
          {lang === "nl"
            ? "Deze simulator gaat puur over de computer zelf. De basisprijzen komen uit een interne API die actuele retailerprijzen ophaalt, zodat je snel ziet welke pc-opbouw op dit moment het scherpst staat."
            : "This simulator focuses purely on the computer itself. Base prices come from an internal API that fetches current retailer prices so you can quickly see which PC build is the sharpest right now."}
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.35rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 text-sm leading-7 text-[color:var(--muted)]">
          <p>{lang === "nl" ? pricingData.note : "Current market prices are fetched from multiple stores."}</p>
          <p className="mt-2">
            {lang === "nl"
              ? `${pricingData.liveSourceCount} van de ${pricingData.sourceCount} prijsbronnen zijn live opgehaald.`
              : `${pricingData.liveSourceCount} of the ${pricingData.sourceCount} price sources were fetched live.`}
          </p>
          {status === "loading" ? <p className="mt-2">{lang === "nl" ? "Live prijzen worden nu opgehaald..." : "Fetching live prices..."}</p> : null}
          {status === "error" ? <p className="mt-2">{errorMessage}</p> : null}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">
              {lang === "nl" ? "Pc building simulator" : "PC building simulator"}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {lang === "nl"
                ? "Kies een vertrekpunt en vink hardware-upgrades aan. De simulator toont meteen welke samenstelling in deze vergelijking het goedkoopst uitkomt."
                : "Choose a starting point and tick hardware upgrades. The simulator immediately shows which configuration comes out cheapest in this comparison."}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {pricingData.profiles.map((profile) => {
              const profileTotal = profile.basePrice + extrasTotal;
              const isSelected = profile.id === selectedProfile.id;
              const isCheapest = profileTotal === Math.min(...pricingData.profiles.map((item) => item.basePrice + extrasTotal));

              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setSelectedProfileId(profile.id)}
                  className={`rounded-[1.5rem] border p-5 text-left transition ${
                    isSelected
                      ? "border-[color:var(--accent)] bg-[color:var(--surface)] shadow-[0_18px_40px_rgba(36,25,19,0.08)]"
                      : "border-[color:var(--border)] bg-[color:rgba(255,248,240,0.78)] hover:border-[color:var(--accent)]/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--foreground)]">{profile.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{profile.audience}</p>
                    </div>
                    {isCheapest ? (
                      <span className="rounded-full bg-[color:var(--accent)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white">
                        {lang === "nl" ? "Goedkoopst" : "Cheapest"}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">{euro.format(profileTotal)}</p>
                  <p className="mt-2 text-xs leading-5 text-[color:var(--accent)]">
                    {lang === "nl" ? "Goedkoopste bron nu" : "Cheapest source now"}: {profile.cheapestRetailer} ({euro.format(profile.cheapestTotal)})
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{profile.description}</p>
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <h3 className="text-lg font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Extra opties" : "Extra options"}</h3>
              <div className="mt-4 space-y-3">
                {pricingData.options.map((option) => {
                  const checked = selectedOptionIds.includes(option.id);

                  return (
                    <label key={option.id} className="flex cursor-pointer items-start gap-3 rounded-[1.15rem] border border-[color:var(--border)]/80 px-4 py-3 transition hover:border-[color:var(--accent)]/60">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setSelectedOptionIds((current) => current.includes(option.id) ? current.filter((id) => id !== option.id) : [...current, option.id])}
                        className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-3 text-sm font-semibold text-[color:var(--foreground)]">
                          <span>{option.label}</span>
                          <span>{euro.format(option.price)}</span>
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-[color:var(--muted)]">{option.helper}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Huidige simulatie" : "Current simulation"}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{selectedProfile.name}</p>
                </div>
                <p className="text-2xl font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal)}</p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">{lang === "nl" ? "Inbegrepen basis" : "Included base"}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--muted)]">
                    {selectedProfile.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-[color:var(--accent)]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">{lang === "nl" ? "Marktankers" : "Market anchors"}</p>
                  <div className="mt-3 space-y-2">
                    {selectedProfile.marketAnchors.map((anchor) => (
                      <div key={anchor.id} className="rounded-2xl bg-[color:var(--accent-soft)]/70 px-4 py-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-[color:var(--foreground)]">{anchor.label}</p>
                            <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">{anchor.sourceNote}</p>
                          </div>
                          <p className="whitespace-nowrap text-sm font-semibold text-[color:var(--foreground)]">{euro.format(anchor.price)}</p>
                        </div>
                        <a href={anchor.url} className="mt-2 inline-flex text-xs font-semibold text-[color:var(--accent)]">
                          {lang === "nl" ? "Bekijk bron bij" : "View source at"} {anchor.retailer}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-[color:var(--border)] px-4 py-4">
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-[color:var(--muted)]">{lang === "nl" ? "Basisconfiguratie" : "Base configuration"}</span>
                    <span className="font-semibold text-[color:var(--foreground)]">{euro.format(selectedProfile.basePrice)}</span>
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-4 text-sm">
                    <span className="text-[color:var(--muted)]">{lang === "nl" ? "Geselecteerde extra&apos;s" : "Selected extras"}</span>
                    <span className="font-semibold text-[color:var(--foreground)]">{euro.format(extrasTotal)}</span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4 border-t border-[color:var(--border)] pt-4">
                    <span className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Geschatte totaalprijs" : "Estimated total price"}</span>
                    <span className="text-lg font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:rgba(255,248,240,0.72)] p-5 text-sm leading-7 text-[color:var(--muted)]">
            <p>{lang === "nl" ? `Laatst bijgewerkt: ${new Date(pricingData.fetchedAt).toLocaleString("nl-BE")}` : `Last updated: ${new Date(pricingData.fetchedAt).toLocaleString("en-GB")}`}</p>
            <p className="mt-2">{lang === "nl" ? "Vergelijkte winkels" : "Compared stores"}: {pricingData.retailers.join(", ")}</p>
            <p className="mt-3">{lang === "nl" ? "Bij een aanvraag vergelijken we de onderdelen opnieuw en sturen we de goedkoopste haalbare combinatie door voor jouw moment van aankoop." : "When you request a quote, we compare the parts again and send the cheapest workable combination for the time you place your order."}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href={quoteLink} className="story-link inline-flex">{lang === "nl" ? "Vraag deze configuratie aan" : "Request this configuration"}</Link>
              <Link href={buildLocalizedHref("/pc-builder", lang === "nl" ? "" : "lang=en", lang)} className="story-link inline-flex">{lang === "nl" ? "Open volledige builder" : "Open full builder"}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
