export type ServiceRate = {
  title: string;
  price: number;
  unit?: string;
  description: string;
};

export type PcUpgradeOption = {
  id: string;
  label: string;
  price: number;
  helper: string;
};

export type PcPriceSource = {
  id: string;
  label: string;
  retailer: string;
  url: string;
  fallbackPrice: number;
  provider: "alternate" | "amazon-search";
  asin?: string;
};

export type PcPriceSnapshot = {
  price: number;
  isLive: boolean;
  sourceNote: string;
};

export type PcMarketAnchor = {
  id: string;
  label: string;
  retailer: string;
  url: string;
  price: number;
  isLive: boolean;
  sourceNote: string;
};

export type PcBuildProfile = {
  id: string;
  name: string;
  audience: string;
  description: string;
  category: "starter" | "gaming" | "creator";
  resolution: "1080p" | "1440p" | "mixed";
  basePrice: number;
  includes: string[];
  marketAnchors: PcMarketAnchor[];
  cheapestRetailer: string;
  cheapestTotal: number;
};

export type PcPricingPayload = {
  fetchedAt: string;
  pricingMode: "live" | "mixed" | "fallback";
  note: string;
  sourceCount: number;
  liveSourceCount: number;
  profiles: PcBuildProfile[];
  options: PcUpgradeOption[];
  retailers: string[];
};

type PcProfileCatalogEntry = {
  id: string;
  name: string;
  audience: string;
  description: string;
  category: "starter" | "gaming" | "creator";
  resolution: "1080p" | "1440p" | "mixed";
  productSourceId: string;
  includes: string[];
  marketAnchorSourceIds: string[];
  comparisonSourceIds: string[];
};

const fallbackCheckedAt = "2026-07-13T12:00:00.000Z";

export const serviceRates: ServiceRate[] = [
  {
    title: "Diagnose en foutanalyse",
    price: 49,
    description: "Controle van pc, laptop of netwerkprobleem met duidelijk hersteladvies.",
  },
  {
    title: "Windows-installatie en basisconfiguratie",
    price: 89,
    description: "Schone installatie, drivers, updates en basisbeveiliging.",
  },
  {
    title: "Data-overzet en back-uphulp",
    price: 119,
    description: "Overzetten van documenten, foto's en basisinstellingen naar een nieuw toestel.",
  },
  {
    title: "Pc-assemblage en stresstest",
    price: 149,
    description: "Montage, kabelmanagement, BIOS-update en stabiliteitstest.",
  },
  {
    title: "Netwerkinterventie op locatie",
    price: 95,
    unit: "/ uur",
    description: "Voor wifi-problemen, routerinstallaties en kleine netwerkverbeteringen.",
  },
  {
    title: "Halfjaarlijks onderhoud",
    price: 79,
    description: "Stofreiniging, updates, gezondheidscheck en prestatiecontrole.",
  },
];

export const pcUpgradeOptions: PcUpgradeOption[] = [
  {
    id: "storage-2tb",
    label: "Upgrade naar 2 TB NVMe SSD",
    price: 110,
    helper: "Meer ruimte voor grote games, mediabibliotheken en projectbestanden.",
  },
  {
    id: "memory-upgrade",
    label: "Geheugenupgrade naar zwaardere configuratie",
    price: 120,
    helper: "Handig voor streaming, zware multitask of creatieve software.",
  },
  {
    id: "cooling-upgrade",
    label: "Stillere koeling en betere airflow",
    price: 75,
    helper: "Voor lagere temperaturen en minder geluid onder belasting.",
  },
  {
    id: "psu-upgrade",
    label: "Betere voeding met meer upgradebuffer",
    price: 85,
    helper: "Interessant als je later een sterkere videokaart plant.",
  },
];

export const pcPriceSources: PcPriceSource[] = [
  {
    id: "system-casual-5060",
    label: "ALTERNATE Gamer Casual i5-5060 gaming pc",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/ALTERNATE/Gamer-Casual-i5-5060-gaming-pc/html/product/1946880",
    fallbackPrice: 1399,
    provider: "alternate",
  },
  {
    id: "system-casual-5060ti",
    label: "ALTERNATE Gamer Casual i5-5060Ti gaming pc",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/ALTERNATE/Gamer-Casual-i5-5060Ti-gaming-pc/html/product/1946881",
    fallbackPrice: 1599,
    provider: "alternate",
  },
  {
    id: "system-starter-am5-5060",
    label: "ALTERNATE Gamer Starter R5-5060 gaming pc",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/ALTERNATE/Gamer-Starter-R5-5060-gaming-pc/html/product/1938520",
    fallbackPrice: 1899,
    provider: "alternate",
  },
  {
    id: "gpu-rtx-5060",
    label: "MSI GeForce RTX 5060 8G VENTUS 2X OC",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/MSI/GeForce-RTX-5060-8G-VENTUS-2X-OC-grafische-kaart/html/product/100130461",
    fallbackPrice: 339,
    provider: "alternate",
  },
  {
    id: "gpu-rtx-5060ti",
    label: "MSI GeForce RTX 5060 Ti 8G VENTUS 2X OC PLUS",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/MSI/GeForce-RTX-5060-Ti-8G-VENTUS-2X-OC-PLUS-grafische-kaart/html/product/100125340",
    fallbackPrice: 399,
    provider: "alternate",
  },
  {
    id: "cpu-ryzen-5-8400f",
    label: "AMD Ryzen 5 8400F",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/AMD/Ryzen-5-8400F-4-2-GHz-4-7-GHz-Turbo-Boost-socket-AM5-processor/html/product/100057953",
    fallbackPrice: 139.9,
    provider: "alternate",
  },
  {
    id: "cpu-ryzen-7-8700f",
    label: "AMD Ryzen 7 8700F",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/AMD/Ryzen-7-8700F-4-1-GHz-5-0-GHz-Turbo-Boost-socket-AM5-processor/html/product/100057950",
    fallbackPrice: 219.9,
    provider: "alternate",
  },
  {
    id: "cpu-ryzen-5-9600x",
    label: "AMD Ryzen 5 9600X",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/AMD/Ryzen-5-9600X-3-9-GHz-5-4-GHz-Turbo-Boost-socket-AM5-processor/html/product/100065801",
    fallbackPrice: 199.9,
    provider: "alternate",
  },
  {
    id: "board-b650-eagle-ax",
    label: "GIGABYTE B650 EAGLE AX",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/GIGABYTE/B650-EAGLE-AX-socket-AM5-moederbord/html/product/100038250",
    fallbackPrice: 109.9,
    provider: "alternate",
  },
  {
    id: "ssd-lexar-nq790-1tb",
    label: "Lexar NQ790 1 TB NVMe SSD",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/Lexar/NQ790-1-TB-SSD/html/product/100074097",
    fallbackPrice: 154.9,
    provider: "alternate",
  },
  {
    id: "amazon-cpu-ryzen-5-8400f",
    label: "AMD Ryzen 5 8400F processor",
    retailer: "Amazon.com.be",
    url: "https://www.amazon.com.be/s?k=Ryzen+5+8400F",
    fallbackPrice: 170.99,
    provider: "amazon-search",
    asin: "B0D2JD6P86",
  },
  {
    id: "amazon-cpu-ryzen-7-8700f",
    label: "AMD Ryzen 7 8700F",
    retailer: "Amazon.com.be",
    url: "https://www.amazon.com.be/s?k=Ryzen+7+8700F",
    fallbackPrice: 153.71,
    provider: "amazon-search",
    asin: "B0F2YD8NYH",
  },
  {
    id: "amazon-cpu-ryzen-5-9600x",
    label: "AMD Ryzen 5 9600X",
    retailer: "Amazon.com.be",
    url: "https://www.amazon.com.be/s?k=Ryzen+5+9600X",
    fallbackPrice: 170.99,
    provider: "amazon-search",
    asin: "B0D6NN6TM7",
  },
  {
    id: "amazon-gpu-rtx-5060",
    label: "GIGABYTE GeForce RTX 5060 WINDFORCE OC 8G",
    retailer: "Amazon.com.be",
    url: "https://www.amazon.com.be/s?k=RTX+5060",
    fallbackPrice: 349,
    provider: "amazon-search",
    asin: "B0F6NLT7M4",
  },
  {
    id: "amazon-gpu-rtx-5060ti",
    label: "MSI Gaming RTX 5060 Ti 8G Ventus 2X OC Plus",
    retailer: "Amazon.com.be",
    url: "https://www.amazon.com.be/s?k=RTX+5060+Ti+8G+Ventus+2X+OC+Plus",
    fallbackPrice: 399,
    provider: "amazon-search",
    asin: "B0F4LQ216W",
  },
];

const pcBuildProfilesCatalog: PcProfileCatalogEntry[] = [
  {
    id: "casual-5060",
    name: "Instap gaming",
    audience: "1080p gaming, school, dagelijks gebruik",
    description:
      "Volwaardige instap-pc voor populaire games, schoolwerk en een vlotte dagelijkse workflow.",
    category: "starter",
    resolution: "1080p",
    productSourceId: "system-casual-5060",
    includes: [
      "Volledig afgewerkte desktop",
      "RTX 5060-klasse videokaart",
      "1 TB SSD-opslag",
      "Geschikt voor 1080p gaming en algemeen gebruik",
    ],
    marketAnchorSourceIds: ["gpu-rtx-5060", "cpu-ryzen-5-8400f", "ssd-lexar-nq790-1tb"],
    comparisonSourceIds: ["system-casual-5060"],
  },
  {
    id: "casual-5060ti",
    name: "Sterke allround gaming",
    audience: "1080p high, 1440p medium, streaming",
    description:
      "Meer grafische ruimte voor zwaardere titels en een comfortabelere multitask-ervaring.",
    category: "gaming",
    resolution: "1440p",
    productSourceId: "system-casual-5060ti",
    includes: [
      "Volledig afgewerkte desktop",
      "RTX 5060 Ti-klasse videokaart",
      "Meer marge voor streaming en zwaardere games",
      "Goede balans tussen prijs en prestaties",
    ],
    marketAnchorSourceIds: ["gpu-rtx-5060ti", "cpu-ryzen-7-8700f", "ssd-lexar-nq790-1tb"],
    comparisonSourceIds: ["system-casual-5060ti"],
  },
  {
    id: "starter-am5",
    name: "AM5 gaming starter",
    audience: "1440p gaming, nieuwer platform, later upgraden",
    description:
      "Voor klanten die liever instappen op een recenter platform en op termijn eenvoudiger willen doorgroeien.",
    category: "gaming",
    resolution: "1440p",
    productSourceId: "system-starter-am5-5060",
    includes: [
      "Volledig afgewerkte desktop",
      "AM5-platform voor langere levensduur",
      "1 TB SSD-opslag",
      "Gericht op upgradevriendelijk gamen",
    ],
    marketAnchorSourceIds: ["cpu-ryzen-5-9600x", "board-b650-eagle-ax", "gpu-rtx-5060", "ssd-lexar-nq790-1tb"],
    comparisonSourceIds: [
      "cpu-ryzen-5-9600x",
      "amazon-cpu-ryzen-5-9600x",
      "gpu-rtx-5060",
      "amazon-gpu-rtx-5060",
      "ssd-lexar-nq790-1tb",
      "board-b650-eagle-ax",
    ],
  },
];

export function getPcPriceSource(sourceId: string) {
  return pcPriceSources.find((entry) => entry.id === sourceId) ?? null;
}

export function createFallbackPcPricingPayload(): PcPricingPayload {
  return createPcPricingPayload({}, fallbackCheckedAt);
}

export function createPcPricingPayload(
  priceSnapshots: Partial<Record<string, PcPriceSnapshot>>,
  fetchedAt: string
): PcPricingPayload {
  const fallbackSnapshot = (source: PcPriceSource): PcPriceSnapshot => ({
    price: source.fallbackPrice,
    isLive: false,
    sourceNote: "Laatste gecontroleerde richtprijs",
  });

  const getSnapshot = (sourceId: string) => {
    const source = pcPriceSources.find((entry) => entry.id === sourceId);

    if (!source) {
      throw new Error(`Onbekende pc-bron: ${sourceId}`);
    }

    return {
      source,
      snapshot: priceSnapshots[sourceId] ?? fallbackSnapshot(source),
    };
  };

  const profiles = pcBuildProfilesCatalog.map((profile) => {
    const base = getSnapshot(profile.productSourceId);
    const marketAnchors = [profile.productSourceId, ...profile.marketAnchorSourceIds].map((sourceId) => {
      const { source, snapshot } = getSnapshot(sourceId);

      return {
        id: source.id,
        label: source.label,
        retailer: source.retailer,
        url: source.url,
        price: snapshot.price,
        isLive: snapshot.isLive,
        sourceNote: snapshot.sourceNote,
      };
    });

    const comparisonSnapshots = profile.comparisonSourceIds.map((sourceId) => {
      const { source, snapshot } = getSnapshot(sourceId);

      return {
        retailer: source.retailer,
        price: snapshot.price,
      };
    });

    const cheapestComparison = comparisonSnapshots.reduce((lowest, current) =>
      current.price < lowest.price ? current : lowest
    );

    return {
      id: profile.id,
      name: profile.name,
      audience: profile.audience,
      description: profile.description,
      category: profile.category,
      resolution: profile.resolution,
      basePrice: base.snapshot.price,
      includes: profile.includes,
      marketAnchors,
      cheapestRetailer: cheapestComparison.retailer,
      cheapestTotal: cheapestComparison.price,
    };
  });

  const liveSourceCount = pcPriceSources.filter((source) => priceSnapshots[source.id]?.isLive).length;
  const sourceCount = pcPriceSources.length;

  return {
    fetchedAt,
    pricingMode:
      liveSourceCount === sourceCount ? "live" : liveSourceCount > 0 ? "mixed" : "fallback",
    note:
      liveSourceCount === sourceCount
        ? "Live prijzen opgehaald via meerdere winkels. Beschikbaarheid en dagprijzen kunnen nog wijzigen."
        : liveSourceCount > 0
          ? "Een deel van de prijzen is live opgehaald. Ontbrekende waarden vallen terug op de laatst gecontroleerde richtprijs."
          : "Live prijsopvraging was niet beschikbaar. De simulator gebruikt de laatst gecontroleerde richtprijzen.",
    sourceCount,
    liveSourceCount,
    profiles,
    options: pcUpgradeOptions,
    retailers: [...new Set(pcPriceSources.map((source) => source.retailer))],
  };
}