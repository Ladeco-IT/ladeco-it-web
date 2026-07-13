"use client";

import Link from "next/link";
import { useState } from "react";

import { usePcPricing } from "./usePcPricing";

const euro = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

const pricingCopy = {
  sectionEyebrow: "Pc building simulator",
  sectionTitle: "Actuele computerprijzen, apart van onze servicekosten.",
  sectionDescription:
    "Deze simulator gaat puur over de computer zelf. De basisprijzen komen uit een interne API die actuele retailerprijzen ophaalt, zodat je snel ziet welke pc-opbouw op dit moment het scherpst staat.",
  builderTitle: "Pc building simulator",
  builderDescription:
    "Kies een vertrekpunt en vink hardware-upgrades aan. De simulator toont meteen welke samenstelling in deze vergelijking het goedkoopst uitkomt.",
  followUp:
    "Bij een aanvraag vergelijken we de onderdelen opnieuw en sturen we de goedkoopste haalbare combinatie door voor jouw moment van aankoop.",
};

export default function PricingSimulator() {
  const { pricingData, status, errorMessage, fallbackPricing } = usePcPricing();
  const [selectedProfileId, setSelectedProfileId] = useState(fallbackPricing.profiles[0]?.id ?? "");
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);

  const buildProfiles = pricingData.profiles;
  const upgradeOptions = pricingData.options;
  const selectedProfile =
    buildProfiles.find((profile) => profile.id === selectedProfileId) ?? buildProfiles[0];

  const selectedOptions = upgradeOptions.filter((option) => selectedOptionIds.includes(option.id));
  const extrasTotal = selectedOptions.reduce((sum, option) => sum + option.price, 0);
  const currentTotal = selectedProfile.basePrice + extrasTotal;
  const selectedOptionLabels = selectedOptions.map((option) => option.label).join(", ") || "Geen extra hardware-upgrades";
  const quoteLink = `/contact?pcProfile=${encodeURIComponent(selectedProfile.id)}&pcLabel=${encodeURIComponent(selectedProfile.name)}&pcTotal=${encodeURIComponent(currentTotal.toFixed(2))}&pcExtras=${encodeURIComponent(selectedOptionIds.join(","))}&pcExtrasLabel=${encodeURIComponent(selectedOptionLabels)}`;

  const totalsByProfile = buildProfiles.map((profile) => ({
    id: profile.id,
    total: profile.basePrice + extrasTotal,
  }));
  const lowestTotal = Math.min(...totalsByProfile.map((profile) => profile.total));

  function toggleOption(optionId: string) {
    setSelectedOptionIds((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
    );
  }

  return (
    <section className="panel-soft space-y-10 p-6 sm:p-8 lg:p-10">
      <div className="max-w-3xl space-y-4">
        <p className="eyebrow">{pricingCopy.sectionEyebrow}</p>
        <h2 className="headline text-3xl sm:text-4xl lg:text-5xl">{pricingCopy.sectionTitle}</h2>
        <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
          {pricingCopy.sectionDescription}
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.35rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 text-sm leading-7 text-[color:var(--muted)]">
          <p>{pricingData.note}</p>
          <p className="mt-2">
            {pricingData.liveSourceCount} van de {pricingData.sourceCount} prijsbronnen zijn live opgehaald.
          </p>
          {status === "loading" ? <p className="mt-2">Live prijzen worden nu opgehaald...</p> : null}
          {status === "error" ? <p className="mt-2">{errorMessage}</p> : null}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[color:var(--accent)]">
              {pricingCopy.builderTitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              {pricingCopy.builderDescription}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {buildProfiles.map((profile) => {
              const profileTotal = profile.basePrice + extrasTotal;
              const isSelected = profile.id === selectedProfile.id;
              const isCheapest = profileTotal === lowestTotal;

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
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                        {profile.audience}
                      </p>
                    </div>
                    {isCheapest ? (
                      <span className="rounded-full bg-[color:var(--accent)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white">
                        Goedkoopst
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">
                    {euro.format(profileTotal)}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[color:var(--accent)]">
                    Goedkoopste bron nu: {profile.cheapestRetailer} ({euro.format(profile.cheapestTotal)})
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{profile.description}</p>
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Extra opties</h3>
              <div className="mt-4 space-y-3">
                {upgradeOptions.map((option) => {
                  const checked = selectedOptionIds.includes(option.id);

                  return (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-start gap-3 rounded-[1.15rem] border border-[color:var(--border)]/80 px-4 py-3 transition hover:border-[color:var(--accent)]/60"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOption(option.id)}
                        className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-3 text-sm font-semibold text-[color:var(--foreground)]">
                          <span>{option.label}</span>
                          <span>{euro.format(option.price)}</span>
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-[color:var(--muted)]">
                          {option.helper}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Huidige simulatie</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{selectedProfile.name}</p>
                </div>
                <p className="text-2xl font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal)}</p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Inbegrepen basis
                  </p>
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
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Marktankers
                  </p>
                  <div className="mt-3 space-y-2">
                    {selectedProfile.marketAnchors.map((anchor) => (
                      <div key={anchor.label} className="rounded-2xl bg-[color:var(--accent-soft)]/70 px-4 py-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-[color:var(--foreground)]">{anchor.label}</p>
                            <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">{anchor.sourceNote}</p>
                          </div>
                          <p className="whitespace-nowrap text-sm font-semibold text-[color:var(--foreground)]">
                            {euro.format(anchor.price)}
                          </p>
                        </div>
                        <a href={anchor.url} className="mt-2 inline-flex text-xs font-semibold text-[color:var(--accent)]">
                          Bekijk bron bij {anchor.retailer}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-[color:var(--border)] px-4 py-4">
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-[color:var(--muted)]">Basisconfiguratie</span>
                    <span className="font-semibold text-[color:var(--foreground)]">{euro.format(selectedProfile.basePrice)}</span>
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-4 text-sm">
                    <span className="text-[color:var(--muted)]">Geselecteerde extra&apos;s</span>
                    <span className="font-semibold text-[color:var(--foreground)]">{euro.format(extrasTotal)}</span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4 border-t border-[color:var(--border)] pt-4">
                    <span className="text-sm font-semibold text-[color:var(--foreground)]">Geschatte totaalprijs</span>
                    <span className="text-lg font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:rgba(255,248,240,0.72)] p-5 text-sm leading-7 text-[color:var(--muted)]">
            <p>Laatst bijgewerkt: {new Date(pricingData.fetchedAt).toLocaleString("nl-BE")}</p>
            <p className="mt-2">Vergelijkte winkels: {pricingData.retailers.join(", ")}</p>
            <p className="mt-3">{pricingCopy.followUp}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href={quoteLink} className="story-link inline-flex">
                Vraag deze configuratie aan
              </Link>
              <Link href="/pc-builder" className="story-link inline-flex">
                Open volledige builder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}