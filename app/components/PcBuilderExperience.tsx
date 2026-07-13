"use client";

import Link from "next/link";
import { useState } from "react";

import { usePcPricing } from "./usePcPricing";

const euro = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

export default function PcBuilderExperience() {
  const { pricingData, status, errorMessage, fallbackPricing } = usePcPricing();
  const [category, setCategory] = useState<"all" | "starter" | "gaming" | "creator">("all");
  const [resolution, setResolution] = useState<"all" | "1080p" | "1440p" | "mixed">("all");
  const [preferredRetailer, setPreferredRetailer] = useState<string>("all");
  const [budget, setBudget] = useState(2100);
  const [needsTwoTb, setNeedsTwoTb] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState(fallbackPricing.profiles[0]?.id ?? "");

  const effectiveOptionIds = needsTwoTb && !selectedOptionIds.includes("storage-2tb")
    ? [...selectedOptionIds, "storage-2tb"]
    : !needsTwoTb && selectedOptionIds.includes("storage-2tb")
      ? selectedOptionIds.filter((id) => id !== "storage-2tb")
      : selectedOptionIds;

  const selectedOptions = pricingData.options.filter((option) => effectiveOptionIds.includes(option.id));
  const extrasTotal = selectedOptions.reduce((sum, option) => sum + option.price, 0);

  const filteredProfiles = pricingData.profiles.filter((profile) => {
    const total = profile.basePrice + extrasTotal;

    if (category !== "all" && profile.category !== category) {
      return false;
    }

    if (resolution !== "all" && profile.resolution !== resolution) {
      return false;
    }

    if (preferredRetailer !== "all" && profile.cheapestRetailer !== preferredRetailer) {
      return false;
    }

    if (total > budget) {
      return false;
    }

    return true;
  });

  const selectedProfile =
    filteredProfiles.find((profile) => profile.id === selectedProfileId) ?? filteredProfiles[0] ?? pricingData.profiles[0];

  const currentTotal = selectedProfile.basePrice + extrasTotal;
  const selectedOptionLabels = selectedOptions.map((option) => option.label).join(", ") || "Geen extra hardware-upgrades";
  const quoteLink = `/contact?pcProfile=${encodeURIComponent(selectedProfile.id)}&pcLabel=${encodeURIComponent(selectedProfile.name)}&pcTotal=${encodeURIComponent(currentTotal.toFixed(2))}&pcExtras=${encodeURIComponent(effectiveOptionIds.join(","))}&pcExtrasLabel=${encodeURIComponent(selectedOptionLabels)}`;

  function toggleOption(optionId: string) {
    setSelectedOptionIds((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
    );
  }

  return (
    <main className="space-y-10">
      <section className="panel-soft space-y-6 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Pc builder</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">Stel een pc samen op basis van actuele winkelprijzen.</h1>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Deze pagina focust puur op de computer zelf. We vergelijken live prijzen uit meerdere winkels, filteren op jouw budget en tonen welke opbouw het meest logisch is voor jouw gebruik.
          </p>
        </div>

        <div className="rounded-[1.35rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 text-sm leading-7 text-[color:var(--muted)]">
          <p>{pricingData.note}</p>
          <p className="mt-2">Vergelijkte winkels: {pricingData.retailers.join(", ")}</p>
          <p className="mt-2">{pricingData.liveSourceCount} van de {pricingData.sourceCount} prijsbronnen zijn live opgehaald.</p>
          {status === "loading" ? <p className="mt-2">Live prijzen worden opgehaald...</p> : null}
          {status === "error" ? <p className="mt-2">{errorMessage}</p> : null}
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr]">
        <aside className="panel space-y-6 p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">Filters</p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              Pas de builder aan op basis van gebruik, resolutie, opslag en budget.
            </p>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">Type gebruik</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as typeof category)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="all">Alles</option>
              <option value="starter">Starter</option>
              <option value="gaming">Gaming</option>
              <option value="creator">Creator</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">Doelresolutie</span>
            <select
              value={resolution}
              onChange={(event) => setResolution(event.target.value as typeof resolution)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="all">Alles</option>
              <option value="1080p">1080p</option>
              <option value="1440p">1440p</option>
              <option value="mixed">Gemengd</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">Goedkoopste winkel</span>
            <select
              value={preferredRetailer}
              onChange={(event) => setPreferredRetailer(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="all">Maakt niet uit</option>
              {pricingData.retailers.map((retailer) => (
                <option key={retailer} value={retailer}>{retailer}</option>
              ))}
            </select>
          </label>

          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[color:var(--foreground)]">Maximaal budget</span>
              <span className="text-sm font-semibold text-[color:var(--accent)]">{euro.format(budget)}</span>
            </div>
            <input
              type="range"
              min={1200}
              max={2600}
              step={50}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="mt-4 w-full accent-[color:var(--accent)]"
            />
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] px-4 py-3">
            <input
              type="checkbox"
              checked={needsTwoTb}
              onChange={(event) => setNeedsTwoTb(event.target.checked)}
              className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
            />
            <span>
              <span className="block text-sm font-semibold text-[color:var(--foreground)]">Minstens 2 TB opslag</span>
              <span className="mt-1 block text-sm leading-6 text-[color:var(--muted)]">Voegt automatisch de opslagupgrade toe in de berekening.</span>
            </span>
          </label>

          <div>
            <p className="text-sm font-semibold text-[color:var(--foreground)]">Extra hardware</p>
            <div className="mt-3 space-y-3">
              {pricingData.options.filter((option) => option.id !== "storage-2tb").map((option) => {
                const checked = selectedOptionIds.includes(option.id);

                return (
                  <label key={option.id} className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] px-4 py-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOption(option.id)}
                      className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-[color:var(--foreground)]">{option.label} ({euro.format(option.price)})</span>
                      <span className="mt-1 block text-sm leading-6 text-[color:var(--muted)]">{option.helper}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles.map((profile) => {
              const total = profile.basePrice + extrasTotal;
              const isSelected = profile.id === selectedProfile.id;

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
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">{profile.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{profile.audience}</p>
                  <p className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">{euro.format(total)}</p>
                  <p className="mt-2 text-xs leading-5 text-[color:var(--accent)]">Goedkoopste bron: {profile.cheapestRetailer} ({euro.format(profile.cheapestTotal)})</p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{profile.description}</p>
                </button>
              );
            })}
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="panel p-6 text-sm leading-7 text-[color:var(--muted)]">
              Geen configuraties gevonden binnen deze filters. Verhoog je budget of zet een filter breder.
            </div>
          ) : null}

          {selectedProfile ? (
            <section className="panel-soft grid gap-6 p-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">Gekozen build</p>
                <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">{selectedProfile.name}</h2>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">{selectedProfile.description}</p>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-[color:var(--muted)]">
                  {selectedProfile.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-[color:var(--accent)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[color:var(--muted)]">Basisconfiguratie</span>
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(selectedProfile.basePrice)}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[color:var(--muted)]">Extra hardware</span>
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(extrasTotal)}</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-[color:var(--border)] pt-4">
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">Totaal</span>
                  <span className="text-xl font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal)}</span>
                </div>
                <div className="rounded-2xl bg-[color:var(--accent-soft)]/70 px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  Goedkoopste bron voor deze selectie nu: <span className="font-semibold text-[color:var(--foreground)]">{selectedProfile.cheapestRetailer}</span> rond <span className="font-semibold text-[color:var(--foreground)]">{euro.format(selectedProfile.cheapestTotal)}</span>.
                </div>
                <div className="space-y-2">
                  {selectedProfile.marketAnchors.map((anchor) => (
                    <div key={anchor.id} className="rounded-2xl border border-[color:var(--border)]/70 px-4 py-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-[color:var(--foreground)]">{anchor.label}</p>
                          <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">{anchor.sourceNote}</p>
                        </div>
                        <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(anchor.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={quoteLink} className="story-link inline-flex justify-center">
                    Vraag offerte voor deze build
                  </Link>
                  <Link href="/contact" className="story-link inline-flex justify-center">
                    Algemeen contact
                  </Link>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}