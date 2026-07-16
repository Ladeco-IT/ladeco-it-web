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

type PcBuilderExperienceProps = {
  lang: Lang;
};

type ComponentGroupId = "cpu" | "gpu" | "memory";

export default function PcBuilderExperience({ lang }: PcBuilderExperienceProps) {
  const { pricingData: rawPricingData, status, errorMessage, fallbackPricing } = usePcPricing(lang);
  const [category, setCategory] = useState<"all" | "starter" | "gaming" | "creator">("all");
  const [resolution, setResolution] = useState<"all" | "1080p" | "1440p" | "mixed">("all");
  const [preferredRetailer, setPreferredRetailer] = useState<string>("all");
  const [budget, setBudget] = useState(2100);
  const [needsTwoTb, setNeedsTwoTb] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState(fallbackPricing.profiles[0]?.id ?? "");

  const pricingData = lang === "nl"
    ? rawPricingData
    : {
        ...rawPricingData,
        note: "Current market prices are fetched from multiple stores.",
        options: rawPricingData.options.map((option) => {
          if (option.id === "storage-2tb") {
            return {
              ...option,
              label: "Upgrade to 2 TB NVMe SSD",
              helper: "More room for large games, media libraries and project files.",
            };
          }

          if (option.id === "memory-upgrade") {
            return {
              ...option,
              label: "Memory upgrade to a higher-end configuration",
              helper: "Useful for streaming, heavy multitasking or creative software.",
            };
          }

          if (option.id === "cooling-upgrade") {
            return {
              ...option,
              label: "Quieter cooling and better airflow",
              helper: "For lower temperatures and less noise under load.",
            };
          }

          return {
            ...option,
            label: "Better power supply with extra upgrade headroom",
            helper: "Useful if you plan to install a stronger graphics card later.",
          };
        }),
        buildComponents: rawPricingData.buildComponents.map((group) => ({
          ...group,
          label:
            group.id === "cpu"
              ? "CPU"
              : group.id === "gpu"
                ? "GPU"
                : "RAM",
          helper:
            group.id === "cpu"
              ? "Pick a processor that fits your workload and budget."
              : group.id === "gpu"
                ? "The graphics card drives most gaming performance."
                : "More memory helps with multitasking and creative workloads.",
          options: group.options.map((option) => {
            if (group.id === "cpu") {
              if (option.id === "cpu-ryzen-5-8400f") {
                return { ...option, helper: "Good entry-level gaming and everyday use." };
              }

              if (option.id === "cpu-ryzen-7-8700f") {
                return { ...option, helper: "Extra cores for streaming and heavier multitasking." };
              }

              return { ...option, helper: "Strong all-round pick with upgrade room." };
            }

            if (group.id === "gpu") {
              if (option.id === "gpu-rtx-5060") {
                return { ...option, helper: "Smooth 1080p gaming with strong value." };
              }

              return { ...option, helper: "More headroom for 1440p and higher settings." };
            }

            if (option.id === "ram-16gb-ddr5") {
              return { ...option, helper: "Enough for basic gaming and school work." };
            }

            if (option.id === "ram-32gb-ddr5") {
              return { ...option, helper: "Best all-round choice for most builds." };
            }

            return { ...option, helper: "For heavy creative projects and many open apps." };
          }),
        })),
        profiles: rawPricingData.profiles.map((profile) => {
          if (profile.id === "casual-5060") {
            return {
              ...profile,
              name: "Entry gaming",
              audience: "1080p gaming, school, everyday use",
              description: "A full entry-level PC for popular games, schoolwork and a smooth daily workflow.",
              includes: [
                "Fully assembled desktop",
                "RTX 5060-class graphics card",
                "1 TB SSD storage",
                "Suitable for 1080p gaming and general use",
              ],
              marketAnchors: profile.marketAnchors.map((anchor) => ({
                ...anchor,
                sourceNote: "Latest checked reference price",
              })),
            };
          }

          if (profile.id === "casual-5060ti") {
            return {
              ...profile,
              name: "Strong all-round gaming",
              audience: "1080p high, 1440p medium, streaming",
              description: "More graphics headroom for heavier titles and a smoother multitasking experience.",
              includes: [
                "Fully assembled desktop",
                "RTX 5060 Ti-class graphics card",
                "More headroom for streaming and heavier games",
                "A strong balance between price and performance",
              ],
              marketAnchors: profile.marketAnchors.map((anchor) => ({
                ...anchor,
                sourceNote: "Latest checked reference price",
              })),
            };
          }

          return {
            ...profile,
            name: "AM5 gaming starter",
            audience: "1440p gaming, newer platform, easier upgrades later",
            description: "For customers who want to start on a newer platform and grow more easily over time.",
            includes: [
              "Fully assembled desktop",
              "AM5 platform for longer lifespan",
              "1 TB SSD storage",
              "Focused on upgrade-friendly gaming",
            ],
            marketAnchors: profile.marketAnchors.map((anchor) => ({
              ...anchor,
              sourceNote: "Latest checked reference price",
            })),
          };
        }),
      };

  const effectiveOptionIds = needsTwoTb && !selectedOptionIds.includes("storage-2tb")
    ? [...selectedOptionIds, "storage-2tb"]
    : !needsTwoTb && selectedOptionIds.includes("storage-2tb")
      ? selectedOptionIds.filter((id) => id !== "storage-2tb")
      : selectedOptionIds;

  const componentGroup = (groupId: ComponentGroupId) =>
    pricingData.buildComponents.find((group) => group.id === groupId)
    ?? fallbackPricing.buildComponents.find((group) => group.id === groupId)!;

  const selectedProfile =
    pricingData.profiles.find((profile) => profile.id === selectedProfileId) ?? pricingData.profiles[0] ?? fallbackPricing.profiles[0];

  const defaultBuild = selectedProfile?.defaultBuild
    ?? fallbackPricing.profiles[0]?.defaultBuild
    ?? {
      cpu: componentGroup("cpu").defaultOptionId,
      gpu: componentGroup("gpu").defaultOptionId,
      memory: componentGroup("memory").defaultOptionId,
    };

  const [selectedCpuId, setSelectedCpuId] = useState(defaultBuild.cpu);
  const [selectedGpuId, setSelectedGpuId] = useState(defaultBuild.gpu);
  const [selectedMemoryId, setSelectedMemoryId] = useState(defaultBuild.memory);

  const selectedCpuGroup = componentGroup("cpu");
  const selectedGpuGroup = componentGroup("gpu");
  const selectedMemoryGroup = componentGroup("memory");

  const selectedCpu = selectedCpuGroup.options.find((option) => option.id === selectedCpuId) ?? selectedCpuGroup.options[0];
  const selectedGpu = selectedGpuGroup.options.find((option) => option.id === selectedGpuId) ?? selectedGpuGroup.options[0];
  const selectedMemory = selectedMemoryGroup.options.find((option) => option.id === selectedMemoryId) ?? selectedMemoryGroup.options[0];

  const selectedComponentTotal = selectedCpu.price + selectedGpu.price + selectedMemory.price;
  const selectedOptions = pricingData.options.filter((option) => effectiveOptionIds.includes(option.id));
  const extrasTotal = selectedOptions.reduce((sum, option) => sum + option.price, 0);

  const filteredProfiles = pricingData.profiles.filter((profile) => {
    const total = profile.platformPrice + selectedComponentTotal + extrasTotal;

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

  const activeProfile = filteredProfiles.find((profile) => profile.id === selectedProfile?.id) ?? filteredProfiles[0] ?? selectedProfile;

  const currentTotal = (activeProfile?.platformPrice ?? 0) + selectedComponentTotal + extrasTotal;
  const presetTotal = (activeProfile?.basePrice ?? 0) + extrasTotal;
  const selectedBuildLabel = `${activeProfile?.name ?? "PC build"} · ${selectedCpu.label} / ${selectedGpu.label} / ${selectedMemory.label}`;
  const selectedOptionLabels = selectedOptions.map((option) => option.label).join(", ") || (lang === "nl" ? "Geen extra hardware-upgrades" : "No extra hardware upgrades");
  const quoteSearch = `pcProfile=${encodeURIComponent(activeProfile?.id ?? "")}&pcLabel=${encodeURIComponent(selectedBuildLabel)}&pcTotal=${encodeURIComponent(currentTotal.toFixed(2))}&pcExtras=${encodeURIComponent(effectiveOptionIds.join(","))}&pcExtrasLabel=${encodeURIComponent(selectedOptionLabels)}`;
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
    setSelectedCpuId(profile.defaultBuild.cpu);
    setSelectedGpuId(profile.defaultBuild.gpu);
    setSelectedMemoryId(profile.defaultBuild.memory);
  }

  return (
    <main className="space-y-10">
      <section className="panel-soft space-y-6 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">{lang === "nl" ? "Pc builder" : "PC builder"}</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
            {lang === "nl" ? "Stel een pc samen op basis van actuele winkelprijzen." : "Build a PC based on current shop prices."}
          </h1>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {lang === "nl"
              ? "Deze pagina focust puur op de computer zelf. Kies zelf CPU, GPU en RAM, vul daarna aan met extra hardware en zie meteen wat de build kost."
              : "This page focuses purely on the computer itself. Pick CPU, GPU and RAM yourself, add extra hardware and see the build price update instantly."}
          </p>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-7 text-[color:var(--muted)]">
            <p>{lang === "nl" ? pricingData.note : "Current market prices are fetched from multiple stores."}</p>
            <p className="mt-2">
              {lang === "nl"
                ? `${pricingData.liveSourceCount} van de ${pricingData.sourceCount} prijsbronnen zijn live opgehaald.`
                : `${pricingData.liveSourceCount} of the ${pricingData.sourceCount} price sources were fetched live.`}
            </p>
            {status === "loading" ? <p className="mt-2">{lang === "nl" ? "Live prijzen worden nu opgehaald..." : "Fetching live prices..."}</p> : null}
            {status === "error" ? <p className="mt-2 text-[color:var(--accent)]">{errorMessage}</p> : null}
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr]">
        <aside className="panel space-y-6 p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">{lang === "nl" ? "Filters" : "Filters"}</p>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              {lang === "nl"
                ? "Pas de builder aan op basis van gebruik, resolutie, opslag en budget."
                : "Adjust the builder based on use case, resolution, storage and budget."}
            </p>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Type gebruik" : "Usage type"}</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as typeof category)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="all">{lang === "nl" ? "Alles" : "All"}</option>
              <option value="starter">Starter</option>
              <option value="gaming">Gaming</option>
              <option value="creator">Creator</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Doelresolutie" : "Target resolution"}</span>
            <select
              value={resolution}
              onChange={(event) => setResolution(event.target.value as typeof resolution)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="all">{lang === "nl" ? "Alles" : "All"}</option>
              <option value="1080p">1080p</option>
              <option value="1440p">1440p</option>
              <option value="mixed">{lang === "nl" ? "Gemengd" : "Mixed"}</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Voorkeurswinkel" : "Preferred retailer"}</span>
            <select
              value={preferredRetailer}
              onChange={(event) => setPreferredRetailer(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="all">{lang === "nl" ? "Alle winkels" : "All retailers"}</option>
              {pricingData.retailers.map((retailer) => (
                <option key={retailer} value={retailer}>
                  {retailer}
                </option>
              ))}
            </select>
          </label>

          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Maximaal budget" : "Maximum budget"}</span>
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
              <span className="block text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Minstens 2 TB opslag" : "At least 2 TB storage"}</span>
              <span className="mt-1 block text-sm leading-6 text-[color:var(--muted)]">{lang === "nl" ? "Voegt automatisch de opslagupgrade toe in de berekening." : "Automatically adds the storage upgrade to the calculation."}</span>
            </span>
          </label>

          <div className="space-y-4 rounded-2xl border border-[color:var(--border)] px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Kernconfiguratie" : "Core configuration"}</p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                {lang === "nl"
                  ? "Kies zelf CPU, GPU en RAM. De totaalprijs wordt daarop herberekend."
                  : "Pick CPU, GPU and RAM yourself. The total price is recalculated from those choices."}
              </p>
            </div>

            {[selectedCpuGroup, selectedGpuGroup, selectedMemoryGroup].map((group) => {
              const selectedValue = group.id === "cpu" ? selectedCpu.id : group.id === "gpu" ? selectedGpu.id : selectedMemory.id;

              return (
                <label key={group.id} className="block">
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{group.label}</span>
                  <select
                    value={selectedValue}
                    onChange={(event) => {
                      if (group.id === "cpu") {
                        setSelectedCpuId(event.target.value);
                      } else if (group.id === "gpu") {
                        setSelectedGpuId(event.target.value);
                      } else {
                        setSelectedMemoryId(event.target.value);
                      }
                    }}
                    className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
                  >
                    {group.options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label} - {euro.format(option.price)}
                      </option>
                    ))}
                  </select>
                  <span className="mt-2 block text-xs leading-5 text-[color:var(--muted)]">{group.helper}</span>
                </label>
              );
            })}
          </div>

          <div>
            <p className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Extra hardware" : "Extra hardware"}</p>
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
                  <p className="mt-2 text-xs leading-5 text-[color:var(--accent)]">
                    {lang === "nl" ? "Goedkoopste bron" : "Cheapest source"}: {profile.cheapestRetailer} ({euro.format(profile.cheapestTotal)})
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                    {lang === "nl" ? "Platformbasis" : "Platform base"}: {euro.format(profile.platformPrice)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{profile.description}</p>
                </button>
              );
            })}
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="panel p-6 text-sm leading-7 text-[color:var(--muted)]">
              {lang === "nl" ? "Geen configuraties gevonden binnen deze filters. Verhoog je budget of zet een filter breder." : "No configurations found within these filters. Increase your budget or broaden a filter."}
            </div>
          ) : null}

          {activeProfile ? (
            <section className="panel-soft grid gap-6 p-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">{lang === "nl" ? "Gekozen build" : "Selected build"}</p>
                <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">{activeProfile.name}</h2>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">{activeProfile.description}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">CPU</p>
                    <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">{selectedCpu.label}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">{euro.format(selectedCpu.price)}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">GPU</p>
                    <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">{selectedGpu.label}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">{euro.format(selectedGpu.price)}</p>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">RAM</p>
                    <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">{selectedMemory.label}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">{euro.format(selectedMemory.price)}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm leading-6 text-[color:var(--muted)]">
                  {activeProfile.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-[color:var(--accent)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[color:var(--muted)]">{lang === "nl" ? "Platformbasis" : "Platform base"}</span>
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(activeProfile.platformPrice)}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[color:var(--muted)]">CPU / GPU / RAM</span>
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(selectedComponentTotal)}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-[color:var(--muted)]">{lang === "nl" ? "Extra hardware" : "Extra hardware"}</span>
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{euro.format(extrasTotal)}</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-[color:var(--border)] pt-4">
                  <span className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Totaal" : "Total"}</span>
                  <span className="text-xl font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal)}</span>
                </div>
                <div className="rounded-2xl bg-[color:var(--accent-soft)]/70 px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  {lang === "nl"
                    ? <>Presetprijs met deze keuzes: <span className="font-semibold text-[color:var(--foreground)]">{euro.format(presetTotal)}</span>. Verschil met jouw custom build: <span className="font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal - presetTotal)}</span>.</>
                    : <>Preset price with these choices: <span className="font-semibold text-[color:var(--foreground)]">{euro.format(presetTotal)}</span>. Difference versus your custom build: <span className="font-semibold text-[color:var(--foreground)]">{euro.format(currentTotal - presetTotal)}</span>.</>}
                </div>
                <div className="rounded-2xl bg-[color:var(--accent-soft)]/70 px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  {lang === "nl"
                    ? <>Goedkoopste bron voor deze selectie nu: <span className="font-semibold text-[color:var(--foreground)]">{activeProfile.cheapestRetailer}</span> rond <span className="font-semibold text-[color:var(--foreground)]">{euro.format(activeProfile.cheapestTotal)}</span>.</>
                    : <>Cheapest source for this selection right now: <span className="font-semibold text-[color:var(--foreground)]">{activeProfile.cheapestRetailer}</span> around <span className="font-semibold text-[color:var(--foreground)]">{euro.format(activeProfile.cheapestTotal)}</span>.</>}
                </div>
                <div className="space-y-2">
                  {activeProfile.marketAnchors.map((anchor) => (
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
                    {lang === "nl" ? "Vraag offerte voor deze build" : "Request a quote for this build"}
                  </Link>
                  <Link href={buildLocalizedHref("/contact", lang === "nl" ? "" : "lang=en", lang)} className="story-link inline-flex justify-center">
                    {lang === "nl" ? "Algemeen contact" : "General contact"}
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