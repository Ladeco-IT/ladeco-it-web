"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { usePcPricing } from "./usePcPricing";
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
type BuildPlatform = "all" | "amd" | "intel";

const recommendedProfileByIntent: Record<UsageIntent, string> = {
  balanced: "casual-5060",
  daily: "budget-home",
  student: "casual-5060",
  gaming: "casual-5060ti",
  creator: "starter-am5",
  future: "starter-am5",
};

const recommendedExtrasByIntent: Record<UsageIntent, string[]> = {
  balanced: ["storage-2tb"],
  daily: [],
  student: ["memory-upgrade"],
  gaming: ["cooling-upgrade", "psu-upgrade"],
  creator: ["memory-upgrade", "cooling-upgrade", "storage-2tb"],
  future: ["storage-2tb", "psu-upgrade"],
};

const groupLabelEn: Record<string, string> = {
  cpu: "CPU",
  gpu: "GPU",
  memory: "RAM",
  motherboard: "Motherboard",
  storage: "Storage",
  cooler: "CPU cooling",
  psu: "Power supply",
  case: "Case",
};

export default function PcBuilderExperience({ lang }: PcBuilderExperienceProps) {
  const { pricingData, status, errorMessage, fallbackPricing } = usePcPricing(lang);
  const [usageIntent, setUsageIntent] = useState<UsageIntent>("balanced");
  const [platform, setPlatform] = useState<BuildPlatform>("all");
  const [budget, setBudget] = useState(2200);
  const [isPriceApproved, setIsPriceApproved] = useState(false);
  const [wantsOrderAndPaymentLink, setWantsOrderAndPaymentLink] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState(fallbackPricing.profiles[0]?.id ?? "");
  const [selectedComponentByGroup, setSelectedComponentByGroup] = useState<Record<string, string>>({});

  const copy = lang === "nl"
    ? {
        eyebrow: "Pc builder",
        title: "Stel een volledige pc samen met echte onderdelen.",
        intro: "Kies per onderdeel de hardware die je wil. De configurator berekent meteen je totaal en stuurt de volledige onderdelenlijst door voor offerte of bestelling.",
        noteTitle: "Onderhoud voor je collega",
        noteBody: "Je collega kan prijzen en onderdelen rechtstreeks aanpassen in app/lib/pcBuilderCatalog.ts. Nieuwe keuzes verschijnen automatisch in deze builder.",
        loading: "Prijsdata wordt bijgewerkt...",
        filtersTitle: "Filters",
        filtersBody: "Stem de aanbeveling af op je gebruik en budget.",
        usageLabel: "Jouw gebruiksprofiel",
        platformLabel: "Platform",
        platformHelp: "Kies AMD of Intel en we tonen alleen compatibele CPU- en moederbordkeuzes.",
        platformAll: "Alles",
        platformAmd: "AMD",
        platformIntel: "Intel",
        usage: {
          balanced: "Allround",
          daily: "Dagelijks gebruik",
          student: "School en studie",
          gaming: "Gaming",
          creator: "Creatie (foto/video)",
          future: "Toekomstgericht",
        },
        budgetLabel: "Maximaal budget",
        profileTitle: "Aanbevolen profiel",
        applyRecommendation: "Gebruik aanbevolen profiel",
        extrasTitle: "Extra hardware en service",
        extrasBody: "Selecteer extra upgrades die bovenop je onderdelenkeuze komen.",
        profileBase: "Platformbasis",
        noProfiles: "Geen configuraties binnen dit budget. Verhoog je budget of kies lichtere onderdelen.",
        selectedBuild: "Gekozen build",
        total: "Totaal",
        selectedParts: "Onderdelen",
        selectedExtras: "Extra hardware",
        estimateNote: "Dit is een indicatieve prijs op basis van actuele en fallback marktdata.",
        approvalTitle: "Stap 1 - prijsindicatie bevestigen",
        approvalText: "Ik ga akkoord met deze prijsindicatie en wil deze configuratie laten nakijken.",
        orderTitle: "Stap 2 - bestellen en betalen",
        orderText: "Ik wil deze pc effectief bestellen en een betaallink ontvangen om de bestelling te bevestigen.",
        quoteAction: "Vraag offerte aan",
        orderAction: "Bestel en vraag betaallink",
        generalContact: "Algemeen contact",
        retailerLabel: "Referentie",
        recommended: "Aanbevolen",
      }
    : {
        eyebrow: "PC builder",
        title: "Build a complete PC with real hardware choices.",
        intro: "Choose each part yourself. The configurator calculates your total instantly and sends the full parts list for quote or order handling.",
        noteTitle: "Maintenance for your colleague",
        noteBody: "Your colleague can update prices and part lists directly in app/lib/pcBuilderCatalog.ts. New options appear automatically in this builder.",
        loading: "Updating price data...",
        filtersTitle: "Filters",
        filtersBody: "Tune recommendations to your use case and budget.",
        usageLabel: "Your usage profile",
        platformLabel: "Platform",
        platformHelp: "Pick AMD or Intel and we only show compatible CPU and motherboard choices.",
        platformAll: "All",
        platformAmd: "AMD",
        platformIntel: "Intel",
        usage: {
          balanced: "Balanced",
          daily: "Everyday use",
          student: "School and study",
          gaming: "Gaming",
          creator: "Creative work",
          future: "Future-proof",
        },
        budgetLabel: "Maximum budget",
        profileTitle: "Recommended profile",
        applyRecommendation: "Use recommended profile",
        extrasTitle: "Extra hardware and service",
        extrasBody: "Select optional upgrades on top of your selected parts.",
        profileBase: "Platform base",
        noProfiles: "No configurations match this budget. Raise the budget or pick lighter components.",
        selectedBuild: "Selected build",
        total: "Total",
        selectedParts: "Selected parts",
        selectedExtras: "Extra hardware",
        estimateNote: "This is an estimated price based on mixed live and fallback market data.",
        approvalTitle: "Step 1 - approve estimate",
        approvalText: "I agree with this estimate and want this configuration reviewed.",
        orderTitle: "Step 2 - order and payment",
        orderText: "I want to place this order and receive a payment link to confirm it.",
        quoteAction: "Request quote",
        orderAction: "Order and request payment link",
        generalContact: "General contact",
        retailerLabel: "Reference",
        recommended: "Recommended",
      };

  const activePricing = pricingData.buildComponents.length > 0 ? pricingData : fallbackPricing;
  const allGroups = activePricing.buildComponents;

  const visibleGroups = useMemo(() => {
    return allGroups.map((group) => {
      if (group.id !== "cpu" && group.id !== "motherboard") {
        return group;
      }

      const options = group.options.filter((option) => {
        if (platform === "all") {
          return true;
        }

        const optionPlatform = option.platform ?? "all";
        return optionPlatform === "all" || optionPlatform === platform;
      });

      if (options.length === 0) {
        return group;
      }

      return {
        ...group,
        options,
        defaultOptionId: options.some((option) => option.id === group.defaultOptionId)
          ? group.defaultOptionId
          : options[0].id,
      };
    });
  }, [allGroups, platform]);

  const profileById = useMemo(
    () => new Map(pricingData.profiles.map((profile) => [profile.id, profile])),
    [pricingData.profiles]
  );

  const selectedProfile = profileById.get(selectedProfileId) ?? pricingData.profiles[0] ?? fallbackPricing.profiles[0];

  const resolvedComponentByGroup = useMemo(() => {
    const next: Record<string, string> = { ...selectedComponentByGroup };

    for (const group of visibleGroups) {
      const candidate = next[group.id]
        ?? selectedProfile?.defaultBuild[group.id]
        ?? group.defaultOptionId;

      const exists = group.options.some((option) => option.id === candidate);
      next[group.id] = exists ? candidate : group.defaultOptionId;
    }

    return next;
  }, [visibleGroups, selectedComponentByGroup, selectedProfile]);

  const selectedEntries = visibleGroups.map((group) => {
    const selectedOptionId = resolvedComponentByGroup[group.id] ?? group.defaultOptionId;
    const selectedOption = group.options.find((option) => option.id === selectedOptionId) ?? group.options[0];

    return { group, option: selectedOption };
  });

  const selectedComponentTotal = selectedEntries.reduce((sum, entry) => sum + (entry.option?.price ?? 0), 0);
  const selectedOptions = pricingData.options.filter((option) => selectedOptionIds.includes(option.id));
  const extrasTotal = selectedOptions.reduce((sum, option) => sum + option.price, 0);

  const filteredProfiles = pricingData.profiles.filter((profile) => {
    const total = profile.platformPrice + selectedComponentTotal + extrasTotal;
    return total <= budget;
  });

  const activeProfile = filteredProfiles.find((profile) => profile.id === selectedProfile?.id)
    ?? filteredProfiles[0]
    ?? selectedProfile;

  const currentTotal = (activeProfile?.platformPrice ?? 0) + selectedComponentTotal + extrasTotal;
  const selectedComponentsLabel = selectedEntries
    .map((entry) => `${entry.group.label}: ${entry.option?.label ?? "-"}`)
    .join(", ");
  const selectedComponentIds = selectedEntries
    .map((entry) => `${entry.group.id}:${entry.option?.id ?? ""}`)
    .join(",");
  const selectedBuildLabel = `${activeProfile?.name ?? "PC build"} · ${selectedEntries.map((entry) => entry.option?.label ?? "").join(" / ")}`;
  const selectedOptionLabels = selectedOptions.map((option) => option.label).join(", ")
    || (lang === "nl" ? "Geen extra hardware-upgrades" : "No extra hardware upgrades");

  const quoteSearch = `pcProfile=${encodeURIComponent(activeProfile?.id ?? "")}&pcLabel=${encodeURIComponent(selectedBuildLabel)}&pcTotal=${encodeURIComponent(currentTotal.toFixed(2))}&pcExtras=${encodeURIComponent(selectedOptionIds.join(","))}&pcExtrasLabel=${encodeURIComponent(selectedOptionLabels)}&pcComponents=${encodeURIComponent(selectedComponentIds)}&pcComponentsLabel=${encodeURIComponent(selectedComponentsLabel)}&pcApproval=${isPriceApproved ? "1" : "0"}&pcOrderIntent=${wantsOrderAndPaymentLink ? "1" : "0"}`;
  const quoteLink = buildLocalizedHref("/contact", quoteSearch, lang);

  function toggleOption(optionId: string) {
    setSelectedOptionIds((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
    );
  }

  function selectProfile(profileId: string) {
    const profile = pricingData.profiles.find((entry) => entry.id === profileId);

    if (!profile) {
      return;
    }

    setSelectedProfileId(profile.id);
  }

  function applyProfileDefaults() {
    if (!activeProfile) {
      return;
    }

    const next: Record<string, string> = {};

    for (const group of visibleGroups) {
      next[group.id] = activeProfile.defaultBuild[group.id] ?? group.defaultOptionId;
    }

    setSelectedComponentByGroup(next);
  }

  function applyRecommendedProfile() {
    const recommendedProfile = pricingData.profiles.find((profile) => profile.id === recommendedProfileByIntent[usageIntent]);

    if (!recommendedProfile) {
      return;
    }

    setSelectedProfileId(recommendedProfile.id);

    const next: Record<string, string> = {};
    for (const group of visibleGroups) {
      next[group.id] = recommendedProfile.defaultBuild[group.id] ?? group.defaultOptionId;
    }

    setSelectedComponentByGroup(next);
    setSelectedOptionIds(recommendedExtrasByIntent[usageIntent]);
  }

  const recommendedProfileName = pricingData.profiles.find((profile) => profile.id === recommendedProfileByIntent[usageIntent])?.name
    ?? (lang === "nl" ? "Niet beschikbaar" : "Not available");

  return (
    <main className="space-y-10">
      <section className="panel-soft space-y-6 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">{copy.title}</h1>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">{copy.intro}</p>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-7 text-[color:var(--muted)]">
            <p><strong>{copy.noteTitle}:</strong> {copy.noteBody}</p>
            {status === "loading" ? <p className="mt-2">{copy.loading}</p> : null}
            {status === "error" ? <p className="mt-2 text-[color:var(--accent)]">{errorMessage}</p> : null}
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr]">
        <aside className="panel space-y-6 p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">{copy.filtersTitle}</p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{copy.filtersBody}</p>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{copy.usageLabel}</span>
            <select
              value={usageIntent}
              onChange={(event) => setUsageIntent(event.target.value as UsageIntent)}
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
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{copy.platformLabel}</span>
            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value as BuildPlatform)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="all">{copy.platformAll}</option>
              <option value="amd">{copy.platformAmd}</option>
              <option value="intel">{copy.platformIntel}</option>
            </select>
            <span className="mt-2 block text-xs leading-5 text-[color:var(--muted)]">{copy.platformHelp}</span>
          </label>

          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">{copy.profileTitle}</p>
            <p className="mt-2">{recommendedProfileName}</p>
            <button
              type="button"
              onClick={applyRecommendedProfile}
              className="mt-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]"
            >
              {copy.applyRecommendation}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[color:var(--foreground)]">{copy.budgetLabel}</span>
              <span className="text-sm font-semibold text-[color:var(--accent)]">{euro.format(budget)}</span>
            </div>
            <input
              type="range"
              min={1200}
              max={4500}
              step={50}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="mt-4 w-full accent-[color:var(--accent)]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[color:var(--foreground)]">{copy.extrasTitle}</p>
            <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">{copy.extrasBody}</p>
            <div className="mt-3 space-y-3">
              {pricingData.options.map((option) => {
                const checked = selectedOptionIds.includes(option.id);
                const isRecommended = recommendedExtrasByIntent[usageIntent].includes(option.id);

                return (
                  <label key={option.id} className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] px-4 py-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOption(option.id)}
                      className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-[color:var(--foreground)]">
                        {option.label} ({euro.format(option.price)})
                        {isRecommended ? ` · ${copy.recommended}` : ""}
                      </span>
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
              const total = profile.platformPrice + selectedComponentTotal + extrasTotal;
              const isSelected = profile.id === activeProfile?.id;

              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => selectProfile(profile.id)}
                  className={`rounded-[1.5rem] border p-5 text-left transition ${
                    isSelected
                      ? "border-[color:var(--accent)] bg-[color:var(--surface)] shadow-[0_18px_40px_rgba(36,25,19,0.08)]"
                      : "border-[color:var(--border)] bg-[color:rgba(255,248,240,0.78)] hover:border-[color:var(--accent)]/50"
                  }`}
                >
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">{profile.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{profile.audience}</p>
                  <p className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">{euro.format(total)}</p>
                  <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">{copy.profileBase}: {euro.format(profile.platformPrice)}</p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{profile.description}</p>
                </button>
              );
            })}
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="panel p-6 text-sm leading-7 text-[color:var(--muted)]">{copy.noProfiles}</div>
          ) : null}

          <section className="space-y-5">
            {visibleGroups.map((group) => {
              const selectedOptionId = resolvedComponentByGroup[group.id] ?? group.defaultOptionId;

              return (
                <div key={group.id} className="panel p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                        {lang === "nl" ? group.label : (groupLabelEn[group.id] ?? group.label)}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{group.helper}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {group.options.map((option) => {
                      const isSelected = option.id === selectedOptionId;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedComponentByGroup((current) => ({ ...current, [group.id]: option.id }))}
                          className={`overflow-hidden rounded-2xl border text-left transition ${
                            isSelected
                              ? "border-[color:var(--accent)] bg-[color:var(--surface)] shadow-[0_10px_24px_rgba(36,25,19,0.08)]"
                              : "border-[color:var(--border)] bg-[color:rgba(255,248,240,0.72)] hover:border-[color:var(--accent)]/50"
                          }`}
                        >
                          {option.imageUrl ? (
                            <Image
                              src={option.imageUrl}
                              alt={option.imageAlt ?? option.label}
                              width={720}
                              height={320}
                              className="h-28 w-full object-cover"
                            />
                          ) : null}
                          <div className="space-y-2 p-4">
                            <p className="text-sm font-semibold text-[color:var(--foreground)]">{option.label}</p>
                            <p className="text-sm font-semibold text-[color:var(--accent)]">{euro.format(option.price)}</p>
                            <p className="text-xs leading-5 text-[color:var(--muted)]">{option.helper}</p>
                            {option.retailer && option.url ? (
                              <a
                                href={option.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex text-xs font-semibold text-[color:var(--accent)] underline underline-offset-4"
                                onClick={(event) => event.stopPropagation()}
                              >
                                {copy.retailerLabel}: {option.retailer}
                              </a>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>

          {activeProfile ? (
            <section className="panel-soft grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">{copy.selectedBuild}</p>
                <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">{activeProfile.name}</h2>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">{activeProfile.description}</p>
                <button
                  type="button"
                  onClick={applyProfileDefaults}
                  className="mt-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]"
                >
                  {lang === "nl" ? "Gebruik standaard onderdelen van dit profiel" : "Use this profile defaults"}
                </button>
              </div>

              <div className="space-y-4 rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[color:var(--muted)]">{copy.profileBase}</span>
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(activeProfile.platformPrice)}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[color:var(--muted)]">{copy.selectedParts}</span>
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(selectedComponentTotal)}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[color:var(--muted)]">{copy.selectedExtras}</span>
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(extrasTotal)}</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-[color:var(--border)] pt-4">
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{copy.total}</span>
                  <span className="text-xl font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal)}</span>
                </div>
                <div className="rounded-2xl bg-[color:var(--accent-soft)]/70 px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  {copy.estimateNote}
                </div>
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  <p className="font-semibold text-[color:var(--foreground)]">{copy.approvalTitle}</p>
                  <label className="mt-2 flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isPriceApproved}
                      onChange={(event) => setIsPriceApproved(event.target.checked)}
                      className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                    />
                    <span>{copy.approvalText}</span>
                  </label>
                </div>
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  <p className="font-semibold text-[color:var(--foreground)]">{copy.orderTitle}</p>
                  <label className="mt-2 flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={wantsOrderAndPaymentLink}
                      onChange={(event) => setWantsOrderAndPaymentLink(event.target.checked)}
                      className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                    />
                    <span>{copy.orderText}</span>
                  </label>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={quoteLink}
                    aria-disabled={!isPriceApproved}
                    className={`story-link inline-flex justify-center ${!isPriceApproved ? "pointer-events-none opacity-50 saturate-0" : ""}`}
                  >
                    {copy.quoteAction}
                  </Link>
                  <Link
                    href={quoteLink}
                    aria-disabled={!isPriceApproved || !wantsOrderAndPaymentLink}
                    className={`story-link inline-flex justify-center ${!isPriceApproved || !wantsOrderAndPaymentLink ? "pointer-events-none opacity-50 saturate-0" : ""}`}
                  >
                    {copy.orderAction}
                  </Link>
                  <Link href={buildLocalizedHref("/contact", lang === "nl" ? "" : "lang=en", lang)} className="story-link inline-flex justify-center">
                    {copy.generalContact}
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
