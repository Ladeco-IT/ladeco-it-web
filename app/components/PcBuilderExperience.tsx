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
type UsageIntent = "balanced" | "daily" | "student" | "gaming" | "creator" | "future";

export default function PcBuilderExperience({ lang }: PcBuilderExperienceProps) {
  const { pricingData: rawPricingData, status, errorMessage, fallbackPricing } = usePcPricing(lang);
  const [usageIntent, setUsageIntent] = useState<UsageIntent>("balanced");
  const [budget, setBudget] = useState(1700);
  const [needsTwoTb, setNeedsTwoTb] = useState(false);
  const [isPriceApproved, setIsPriceApproved] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState(fallbackPricing.profiles[0]?.id ?? "");

  const pricingData = lang === "nl"
    ? rawPricingData
    : {
        ...rawPricingData,
        note: "Price data is continuously updated for our own configuration guidance.",
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

            if (option.id === "ram-48gb-ddr5") {
              return { ...option, helper: "Extra breathing room for heavier daily workflows." };
            }

            return { ...option, helper: "For heavy creative projects and many open apps." };
          }),
        })),
        profiles: rawPricingData.profiles.map((profile) => {
          if (profile.id === "budget-home") {
            return {
              ...profile,
              name: "Affordable everyday PC",
              audience: "daily use, school, light gaming",
              description: "A budget-friendly starter PC for smooth everyday use with room to upgrade over time.",
              includes: [
                "Fully assembled desktop",
                "Great for daily use and study",
                "1 TB SSD storage",
                "Upgrade-friendly platform",
              ],
            };
          }

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

  const componentIntentAllowList: Record<UsageIntent, Record<ComponentGroupId, string[] | null>> = {
    balanced: { cpu: null, gpu: null, memory: null },
    daily: {
      cpu: ["cpu-ryzen-5-8400f", "cpu-ryzen-5-9600x"],
      gpu: null,
      memory: ["ram-16gb-ddr5", "ram-32gb-ddr5"],
    },
    student: {
      cpu: ["cpu-ryzen-5-8400f", "cpu-ryzen-5-9600x"],
      gpu: null,
      memory: ["ram-16gb-ddr5", "ram-32gb-ddr5", "ram-48gb-ddr5"],
    },
    gaming: {
      cpu: ["cpu-ryzen-5-8400f", "cpu-ryzen-5-9600x", "cpu-ryzen-7-8700f", "cpu-ryzen-7-7700"],
      gpu: null,
      memory: ["ram-16gb-ddr5", "ram-32gb-ddr5", "ram-48gb-ddr5"],
    },
    creator: {
      cpu: ["cpu-ryzen-5-9600x", "cpu-ryzen-7-8700f", "cpu-ryzen-7-7700"],
      gpu: null,
      memory: ["ram-32gb-ddr5", "ram-48gb-ddr5", "ram-64gb-ddr5"],
    },
    future: {
      cpu: ["cpu-ryzen-5-9600x", "cpu-ryzen-7-8700f", "cpu-ryzen-7-7700"],
      gpu: null,
      memory: ["ram-32gb-ddr5", "ram-48gb-ddr5", "ram-64gb-ddr5"],
    },
  };

  const extraIntentAllowList: Record<UsageIntent, string[] | null> = {
    balanced: null,
    daily: ["psu-upgrade"],
    student: ["memory-upgrade", "psu-upgrade"],
    gaming: ["memory-upgrade", "cooling-upgrade", "psu-upgrade"],
    creator: ["memory-upgrade", "cooling-upgrade"],
    future: ["memory-upgrade", "psu-upgrade", "cooling-upgrade"],
  };

  const recommendedBuildByIntent: Record<UsageIntent, { cpu: string; gpu: string; memory: string }> = {
    balanced: { cpu: "cpu-ryzen-5-9600x", gpu: "gpu-rtx-5060ti", memory: "ram-32gb-ddr5" },
    daily: { cpu: "cpu-ryzen-5-8400f", gpu: "gpu-rtx-5060", memory: "ram-16gb-ddr5" },
    student: { cpu: "cpu-ryzen-5-9600x", gpu: "gpu-rtx-5060", memory: "ram-32gb-ddr5" },
    gaming: { cpu: "cpu-ryzen-7-8700f", gpu: "gpu-rtx-5060ti", memory: "ram-32gb-ddr5" },
    creator: { cpu: "cpu-ryzen-7-7700", gpu: "gpu-rtx-5070", memory: "ram-64gb-ddr5" },
    future: { cpu: "cpu-ryzen-7-7700", gpu: "gpu-rtx-5070", memory: "ram-48gb-ddr5" },
  };

  const recommendedExtrasByIntent: Record<UsageIntent, string[]> = {
    balanced: ["memory-upgrade"],
    daily: [],
    student: ["memory-upgrade"],
    gaming: ["cooling-upgrade", "psu-upgrade"],
    creator: ["memory-upgrade", "cooling-upgrade"],
    future: ["psu-upgrade"],
  };

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

  const cpuAllowList = componentIntentAllowList[usageIntent].cpu;
  const gpuAllowList = componentIntentAllowList[usageIntent].gpu;
  const memoryAllowList = componentIntentAllowList[usageIntent].memory;
  const extraAllowList = extraIntentAllowList[usageIntent];

  const visibleCpuOptions = cpuAllowList
    ? selectedCpuGroup.options.filter((option) => cpuAllowList.includes(option.id))
    : selectedCpuGroup.options;
  const visibleGpuOptions = gpuAllowList
    ? selectedGpuGroup.options.filter((option) => gpuAllowList.includes(option.id))
    : selectedGpuGroup.options;
  const visibleMemoryOptions = memoryAllowList
    ? selectedMemoryGroup.options.filter((option) => memoryAllowList.includes(option.id))
    : selectedMemoryGroup.options;
  const visibleExtraOptions = pricingData.options.filter((option) => {
    if (option.id === "storage-2tb") {
      return false;
    }

    if (!extraAllowList) {
      return true;
    }

    return extraAllowList.includes(option.id);
  });

  const activeCpuId = visibleCpuOptions.some((option) => option.id === selectedCpuId)
    ? selectedCpuId
    : (visibleCpuOptions[0]?.id ?? selectedCpuGroup.options[0]?.id ?? "");
  const activeGpuId = visibleGpuOptions.some((option) => option.id === selectedGpuId)
    ? selectedGpuId
    : (visibleGpuOptions[0]?.id ?? selectedGpuGroup.options[0]?.id ?? "");
  const activeMemoryId = visibleMemoryOptions.some((option) => option.id === selectedMemoryId)
    ? selectedMemoryId
    : (visibleMemoryOptions[0]?.id ?? selectedMemoryGroup.options[0]?.id ?? "");

  const selectedCpu = visibleCpuOptions.find((option) => option.id === activeCpuId) ?? visibleCpuOptions[0] ?? selectedCpuGroup.options[0];
  const selectedGpu = visibleGpuOptions.find((option) => option.id === activeGpuId) ?? visibleGpuOptions[0] ?? selectedGpuGroup.options[0];
  const selectedMemory = visibleMemoryOptions.find((option) => option.id === activeMemoryId) ?? visibleMemoryOptions[0] ?? selectedMemoryGroup.options[0];

  const recommendedBuild = recommendedBuildByIntent[usageIntent];
  const recommendedExtras = recommendedExtrasByIntent[usageIntent];
  const recommendedCpu = selectedCpuGroup.options.find((option) => option.id === recommendedBuild.cpu);
  const recommendedGpu = selectedGpuGroup.options.find((option) => option.id === recommendedBuild.gpu);
  const recommendedMemory = selectedMemoryGroup.options.find((option) => option.id === recommendedBuild.memory);

  const scopedOptionIds = selectedOptionIds.filter((id) => visibleExtraOptions.some((option) => option.id === id));
  const effectiveOptionIds = needsTwoTb && !scopedOptionIds.includes("storage-2tb")
    ? [...scopedOptionIds, "storage-2tb"]
    : !needsTwoTb && scopedOptionIds.includes("storage-2tb")
      ? scopedOptionIds.filter((id) => id !== "storage-2tb")
      : scopedOptionIds;

  const selectedComponentTotal = selectedCpu.price + selectedGpu.price + selectedMemory.price;
  const selectedOptions = pricingData.options.filter((option) => effectiveOptionIds.includes(option.id));
  const extrasTotal = selectedOptions.reduce((sum, option) => sum + option.price, 0);

  const filteredProfiles = pricingData.profiles.filter((profile) => {
    const total = profile.platformPrice + selectedComponentTotal + extrasTotal;

    if (total > budget) {
      return false;
    }

    return true;
  });

  const activeProfile = filteredProfiles.find((profile) => profile.id === selectedProfile?.id) ?? filteredProfiles[0] ?? selectedProfile;

  const currentTotal = (activeProfile?.platformPrice ?? 0) + selectedComponentTotal + extrasTotal;
  const presetTotal = (activeProfile?.basePrice ?? 0) + extrasTotal;
  const selectedBuildLabel = `${activeProfile?.name ?? "PC build"} · ${selectedCpu.label} / ${selectedGpu.label} / ${selectedMemory.label}`;
  const selectedComponentsLabel = `CPU: ${selectedCpu.label}, GPU: ${selectedGpu.label}, RAM: ${selectedMemory.label}`;
  const selectedComponentIds = [selectedCpu.id, selectedGpu.id, selectedMemory.id].join(",");
  const selectedOptionLabels = selectedOptions.map((option) => option.label).join(", ") || (lang === "nl" ? "Geen extra hardware-upgrades" : "No extra hardware upgrades");
  const quoteSearch = `pcProfile=${encodeURIComponent(activeProfile?.id ?? "")}&pcLabel=${encodeURIComponent(selectedBuildLabel)}&pcTotal=${encodeURIComponent(currentTotal.toFixed(2))}&pcExtras=${encodeURIComponent(effectiveOptionIds.join(","))}&pcExtrasLabel=${encodeURIComponent(selectedOptionLabels)}&pcComponents=${encodeURIComponent(selectedComponentIds)}&pcComponentsLabel=${encodeURIComponent(selectedComponentsLabel)}&pcApproval=${isPriceApproved ? "1" : "0"}`;
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

    // Reset to a broad profile view so the chosen card configuration is reflected immediately.
    setUsageIntent("balanced");
    setSelectedProfileId(profile.id);
    setSelectedCpuId(profile.defaultBuild.cpu);
    setSelectedGpuId(profile.defaultBuild.gpu);
    setSelectedMemoryId(profile.defaultBuild.memory);
  }

  function applyRecommendedBuild() {
    if (!recommendedBuild) {
      return;
    }

    setSelectedCpuId(recommendedBuild.cpu);
    setSelectedGpuId(recommendedBuild.gpu);
    setSelectedMemoryId(recommendedBuild.memory);
    setSelectedOptionIds(recommendedExtras);
  }

  return (
    <main className="space-y-10">
      <section className="panel-soft space-y-6 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">{lang === "nl" ? "Pc builder" : "PC builder"}</p>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl">
            {lang === "nl" ? "Stel een voordelige pc samen op maat van je gebruik." : "Build a cost-efficient PC tailored to your use."}
          </h1>
          <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            {lang === "nl"
              ? "Deze pagina focust puur op de computer zelf. Kies zelf CPU, GPU en RAM, vul daarna aan met extra hardware en zie meteen wat de build kost."
              : "This page focuses purely on the computer itself. Pick CPU, GPU and RAM yourself, add extra hardware and see the build price update instantly."}
          </p>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-7 text-[color:var(--muted)]">
            <p>{lang === "nl" ? pricingData.note : "Price data is continuously updated for our own configuration guidance."}</p>
            {status === "loading" ? <p className="mt-2">{lang === "nl" ? "Prijsdata wordt bijgewerkt..." : "Updating price data..."}</p> : null}
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
                ? "Pas de builder aan op basis van gebruik, resolutie, opslag en budgetdoel."
                : "Adjust the builder based on usage, resolution, storage and budget target."}
            </p>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Jouw gebruiksprofiel" : "Your usage profile"}</span>
            <select
              value={usageIntent}
              onChange={(event) => setUsageIntent(event.target.value as UsageIntent)}
              className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none"
            >
              <option value="balanced">{lang === "nl" ? "Allround" : "Balanced"}</option>
              <option value="daily">{lang === "nl" ? "Gewoon dagelijks gebruik" : "Everyday use"}</option>
              <option value="student">{lang === "nl" ? "School en studie" : "School and study"}</option>
              <option value="gaming">{lang === "nl" ? "Gaming" : "Gaming"}</option>
              <option value="creator">{lang === "nl" ? "Creatie (foto/video)" : "Creative work (photo/video)"}</option>
              <option value="future">{lang === "nl" ? "Toekomstgericht" : "Future-proof"}</option>
            </select>
          </label>

          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Aanbevolen basis voor dit profiel" : "Recommended base for this profile"}</p>
            <p className="mt-2">
              {recommendedCpu?.label ?? "CPU"} / {recommendedGpu?.label ?? "GPU"} / {recommendedMemory?.label ?? "RAM"}
            </p>
            <button
              type="button"
              onClick={applyRecommendedBuild}
              className="mt-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]"
            >
              {lang === "nl" ? "Gebruik aanbevolen samenstelling" : "Use recommended setup"}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[color:var(--foreground)]">{lang === "nl" ? "Maximaal budget" : "Maximum budget"}</span>
              <span className="text-sm font-semibold text-[color:var(--accent)]">{euro.format(budget)}</span>
            </div>
            <input
              type="range"
              min={900}
              max={2800}
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

            {[
              { ...selectedCpuGroup, options: visibleCpuOptions },
              { ...selectedGpuGroup, options: visibleGpuOptions },
              { ...selectedMemoryGroup, options: visibleMemoryOptions },
            ].map((group) => {
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
            <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">
              {lang === "nl"
                ? "De getoonde upgrades zijn afgestemd op je gekozen gebruiksprofiel."
                : "Shown upgrades are tailored to your selected usage profile."}
            </p>
            <div className="mt-3 space-y-3">
              {visibleExtraOptions.map((option) => {
                const checked = selectedOptionIds.includes(option.id);
                const isRecommended = recommendedExtras.includes(option.id);

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
                        {isRecommended ? ` · ${lang === "nl" ? "aanbevolen" : "recommended"}` : ""}
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
                    ? "Deze prijs is een indicatie op basis van je gekozen onderdelen en profiel."
                    : "This price is an estimate based on your selected parts and profile."}
                </div>
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {lang === "nl" ? "Stap 3 - bevestiging" : "Step 3 - confirmation"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {lang === "nl"
                      ? "Vink akkoord aan om je gekozen configuratie en prijsindicatie door te sturen naar ons team."
                      : "Tick approval to send your selected configuration and estimate to our team."}
                  </p>
                </div>
                <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isPriceApproved}
                    onChange={(event) => setIsPriceApproved(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-[color:var(--accent)]"
                  />
                  <span className="text-sm leading-6 text-[color:var(--muted)]">
                    {lang === "nl"
                      ? "Ik ga akkoord met deze prijsindicatie en wil deze configuratie doorsturen voor finale controle en offerte op maat."
                      : "I agree with this price estimate and want to submit this configuration for final review and a tailored quote."}
                  </span>
                </label>
                <div className="rounded-2xl bg-[color:var(--accent-soft)]/70 px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                  {lang === "nl"
                    ? "Na je aanvraag bekijken we de configuratie handmatig, passen indien nodig prijzen of onderdelen aan, en sturen je daarna een finale offerte."
                    : "After your request, we review the configuration manually, adjust pricing or components if needed, and then send you a final quote."}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={quoteLink}
                    aria-disabled={!isPriceApproved}
                    className={`story-link inline-flex justify-center ${!isPriceApproved ? "pointer-events-none opacity-50 saturate-0" : ""}`}
                  >
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