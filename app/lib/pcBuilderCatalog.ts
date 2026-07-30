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

export type PcBuildComponentOption = {
  id: string;
  label: string;
  price: number;
  helper: string;
  imageUrl?: string;
  imageAlt?: string;
  brand?: "amd" | "intel" | "nvidia" | "other";
  platform?: "amd" | "intel" | "all";
  sourceId?: string;
  retailer?: string;
  url?: string;
  isLive?: boolean;
  sourceNote?: string;
};

export type PcBuildComponentGroup = {
  id: string;
  label: string;
  helper: string;
  defaultOptionId: string;
  options: PcBuildComponentOption[];
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
  platformPrice: number;
  defaultBuild: Record<string, string>;
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
  buildComponents: PcBuildComponentGroup[];
  retailers: string[];
};

export type PcCatalogOverride = {
  note?: string;
  buildComponents?: PcBuildComponentGroup[];
  options?: PcUpgradeOption[];
};

type PcProfileCatalogEntry = {
  id: string;
  name: string;
  audience: string;
  description: string;
  category: "starter" | "gaming" | "creator";
  resolution: "1080p" | "1440p" | "mixed";
  productSourceId: string;
  defaultBuild: Record<string, string>;
  includes: string[];
  marketAnchorSourceIds: string[];
  comparisonSourceIds: string[];
};

const fallbackCheckedAt = "2026-07-13T12:00:00.000Z";

export const serviceRates: ServiceRate[] = [
  {
    title: "Diagnose en foutanalyse",
    price: 39,
    description: "Controle van pc, laptop of netwerkprobleem met duidelijk hersteladvies.",
  },
  {
    title: "Windows-installatie en basisconfiguratie",
    price: 79,
    description: "Schone installatie, drivers, updates en basisbeveiliging.",
  },
  {
    title: "Data-overzet en back-uphulp",
    price: 89,
    description: "Overzetten van documenten, foto's en basisinstellingen naar een nieuw toestel.",
  },
  {
    title: "Pc-assemblage en stresstest",
    price: 119,
    description: "Montage, kabelmanagement, BIOS-update en stabiliteitstest.",
  },
  {
    title: "Netwerkinterventie op locatie",
    price: 75,
    unit: "/ uur",
    description: "Voor wifi-problemen, routerinstallaties en kleine netwerkverbeteringen.",
  },
  {
    title: "Halfjaarlijks onderhoud",
    price: 69,
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

const pcBuildComponents: PcBuildComponentGroup[] = [
  {
    id: "cpu",
    label: "CPU",
    helper: "Kies de processor die het best past bij je workload en budget.",
    defaultOptionId: "cpu-ryzen-5-8400f",
    options: [
      {
        id: "cpu-ryzen-5-8400f",
        label: "AMD Ryzen 5 8400F",
        price: 139.9,
        helper: "Solide instap voor gaming en dagelijks gebruik.",
        imageUrl: "https://www.alternate.be/p/1200x630/3/5/AMD_Ryzen_5_8400F__4_2_GHz__4_7_GHz_Turbo_Boost__socket_AM5_processor@@100057953_30.jpg",
        imageAlt: "Processor op moederbord",
        brand: "amd",
        platform: "amd",
        sourceId: "cpu-ryzen-5-8400f",
      },
      {
        id: "cpu-ryzen-7-8700f",
        label: "AMD Ryzen 7 8700F",
        price: 219.9,
        helper: "Meer cores voor streaming, multitasken en zwaardere games.",
        imageUrl: "https://www.alternate.be/p/1200x630/0/5/AMD_Ryzen_7_8700F__4_1_GHz__5_0_GHz_Turbo_Boost__socket_AM5_processor@@100057950_30.jpg",
        imageAlt: "Close-up van een desktop cpu",
        brand: "amd",
        platform: "amd",
        sourceId: "cpu-ryzen-7-8700f",
      },
      {
        id: "cpu-ryzen-5-9600x",
        label: "AMD Ryzen 5 9600X",
        price: 199.9,
        helper: "Sterke allround keuze met veel upgradepotentieel.",
        imageUrl: "https://www.alternate.be/p/1200x630/1/0/AMD_Ryzen_5_9600X__3_9_GHz__5_4_GHz_Turbo_Boost__socket_AM5_processor@@100065801_30.jpg",
        imageAlt: "Processorchip voor gaming pc",
        brand: "amd",
        platform: "amd",
        sourceId: "cpu-ryzen-5-9600x",
      },
      {
        id: "cpu-ryzen-7-7700",
        label: "AMD Ryzen 7 7700",
        price: 289,
        helper: "Extra marge voor multitasken, creatie en latere upgrades.",
        imageUrl: "https://images.unsplash.com/photo-1591799265444-d66432b91588?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Desktop processor op werkbank",
        brand: "amd",
        platform: "amd",
      },
      {
        id: "cpu-intel-core-i5-14600kf",
        label: "Intel Core i5-14600K",
        price: 309.9,
        helper: "Sterke Intel gamingkeuze met hoge single-core prestaties.",
        imageUrl: "https://www.alternate.be/p/1200x630/5/8/Intel__Core_i5_14600K__3_5_GHz__5_3_GHz_Turbo_Boost__socket_1700_processor@@100009785.jpg",
        imageAlt: "Intel desktop processor",
        brand: "intel",
        platform: "intel",
        sourceId: "cpu-intel-core-i5-14600kf",
      },
      {
        id: "cpu-intel-core-i7-14700f",
        label: "Intel Core i7-14700KF",
        price: 419.9,
        helper: "Voor zware multitask, streaming en creatieve workloads op Intel-platform.",
        imageUrl: "https://www.alternate.be/p/1200x630/1/8/Intel__Core_i7_14700KF__3_4_GHz__5_6_GHz_Turbo_Boost__socket_1700_processor@@100009781.jpg",
        imageAlt: "Intel Core processor",
        brand: "intel",
        platform: "intel",
        sourceId: "cpu-intel-core-i7-14700f",
      },
    ],
  },
  {
    id: "gpu",
    label: "GPU",
    helper: "De videokaart bepaalt een groot deel van de gamingprestaties.",
    defaultOptionId: "gpu-rtx-5060",
    options: [
      {
        id: "gpu-rtx-5060",
        label: "NVIDIA GeForce RTX 5060",
        price: 339,
        helper: "Voor soepel 1080p-gamen en een sterke prijs/prestatieverhouding.",
        imageUrl: "https://www.alternate.be/p/1200x630/1/6/MSI_GeForce_RTX_5060_8G_VENTUS_2X_OC_grafische_kaart@@100130461_30.jpg",
        imageAlt: "Grafische kaart met dubbele fan",
        brand: "nvidia",
        platform: "all",
        sourceId: "gpu-rtx-5060",
      },
      {
        id: "gpu-rtx-5060ti",
        label: "NVIDIA GeForce RTX 5060 Ti",
        price: 399,
        helper: "Meer headroom voor 1440p, hogere instellingen en streaming.",
        imageUrl: "https://www.alternate.be/p/1200x630/0/4/MSI_GeForce_RTX_5060_Ti_8G_VENTUS_2X_OC_PLUS_grafische_kaart@@100125340_30.jpg",
        imageAlt: "Gaming videokaart",
        brand: "nvidia",
        platform: "all",
        sourceId: "gpu-rtx-5060ti",
      },
      {
        id: "gpu-rtx-5070",
        label: "NVIDIA GeForce RTX 5070",
        price: 629,
        helper: "Voor wie hogere framerates en meer toekomstmarge wil.",
        imageUrl: "https://images.unsplash.com/photo-1624705002806-5d72df19c3a9?auto=format&fit=crop&w=900&q=80",
        imageAlt: "High-end grafische kaart",
        brand: "nvidia",
        platform: "all",
      },
      {
        id: "gpu-rx-7800xt",
        label: "AMD Radeon RX 7800 XT",
        price: 539,
        helper: "Sterke 1440p-keuze met ruime VRAM en goede prijs/prestatie.",
        imageUrl: "https://images.unsplash.com/photo-1640955014216-75201056c829?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Radeon videokaart",
        brand: "amd",
        platform: "all",
      },
    ],
  },
  {
    id: "memory",
    label: "RAM",
    helper: "Meer werkgeheugen geeft extra ruimte voor multitasken en creatieve software.",
    defaultOptionId: "ram-32gb-ddr5",
    options: [
      {
        id: "ram-16gb-ddr5",
        label: "16 GB DDR5",
        price: 79.9,
        helper: "Geschikt voor basisgaming, schoolwerk en lichte productiviteit.",
        imageUrl: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=900&q=80",
        imageAlt: "DDR5 geheugenmodule",
      },
      {
        id: "ram-32gb-ddr5",
        label: "32 GB DDR5",
        price: 139.9,
        helper: "De beste allround keuze voor gaming en multitasken.",
        imageUrl: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Twee RAM modules",
      },
      {
        id: "ram-48gb-ddr5",
        label: "48 GB DDR5",
        price: 199.9,
        helper: "Comfortabele tussenstap voor zwaarder dagelijks werk.",
        imageUrl: "https://images.unsplash.com/photo-1540829917886-91ab031b1764?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Desktop werkgeheugen",
      },
      {
        id: "ram-64gb-ddr5",
        label: "64 GB DDR5",
        price: 279.9,
        helper: "Voor zware creatieve workflows, veel tabs en grote projecten.",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-a53f6f7f35f5?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Hoge capaciteit DDR5 kit",
      },
    ],
  },
  {
    id: "motherboard",
    label: "Moederbord",
    helper: "Het moederbord bepaalt je aansluitingen en upgradepad.",
    defaultOptionId: "mb-b650-eagle-ax",
    options: [
      {
        id: "mb-b650-eagle-ax",
        label: "GIGABYTE B650 EAGLE AX",
        price: 129.9,
        helper: "Betrouwbare AM5-basis met wifi en DDR5-ondersteuning.",
        sourceId: "board-b650-eagle-ax",
        imageUrl: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=900&q=80",
        imageAlt: "ATX moederbord",
        brand: "amd",
        platform: "amd",
      },
      {
        id: "mb-b650m-pro-rs",
        label: "ASRock B650M Pro RS WiFi",
        price: 139.9,
        helper: "Compact mATX-moederbord met moderne aansluitingen.",
        imageUrl: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Micro-ATX moederbord",
        brand: "amd",
        platform: "amd",
      },
      {
        id: "mb-x870-gaming-plus",
        label: "MSI X870 Gaming Plus WiFi",
        price: 269.9,
        helper: "Voor wie meer uitbreidingsopties en high-end features wil.",
        imageUrl: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=900&q=80",
        imageAlt: "High-end gaming moederbord",
        brand: "amd",
        platform: "amd",
      },
      {
        id: "mb-b760-gaming-plus-wifi",
        label: "MSI B760 GAMING PLUS WIFI",
        price: 199.9,
        helper: "Intel LGA1700 bord voor i5/i7 gaming- en allroundbuilds.",
        imageUrl: "https://www.alternate.be/p/1200x630/9/0/MSI_B760_GAMING_PLUS_WIFI_socket_1700_moederbord@@1919709_30.jpg",
        imageAlt: "Intel gaming moederbord",
        brand: "intel",
        platform: "intel",
        sourceId: "mb-b760-gaming-plus-wifi",
      },
      {
        id: "mb-z790-gaming-plus",
        label: "MSI Z790 GAMING PLUS WIFI",
        price: 289.9,
        helper: "Sterkere Intel-basis met extra uitbreidingsmogelijkheden.",
        imageUrl: "https://www.alternate.be/p/1200x630/3/9/MSI_Z790_GAMING_PLUS_WIFI_socket_1700_moederbord@@100011893_30.jpg",
        imageAlt: "Intel Z790 moederbord",
        brand: "intel",
        platform: "intel",
        sourceId: "mb-z790-gaming-plus",
      },
    ],
  },
  {
    id: "storage",
    label: "Opslag",
    helper: "Snelle NVMe-opslag voor kortere laadtijden en vlotte workflows.",
    defaultOptionId: "ssd-1tb-gen4",
    options: [
      {
        id: "ssd-1tb-gen4",
        label: "1 TB NVMe Gen4 SSD",
        price: 89.9,
        helper: "Standaardkeuze voor snelle opstart en gaming.",
        sourceId: "ssd-lexar-nq790-1tb",
        imageUrl: "https://www.alternate.be/p/1200x630/7/9/Lexar_NQ790_1_TB_SSD@@100074097.jpg",
        imageAlt: "NVMe SSD",
      },
      {
        id: "ssd-2tb-gen4",
        label: "2 TB NVMe Gen4 SSD",
        price: 149.9,
        helper: "Meer ruimte voor grote game- en mediabibliotheken.",
        imageUrl: "https://www.alternate.be/p/1200x630/3/4/Samsung_990_PRO_2_TB_SSD@@1864243_30.jpg",
        imageAlt: "2TB solid state drive",
        sourceId: "ssd-2tb-gen4",
      },
      {
        id: "ssd-2tb-gen5",
        label: "2 TB NVMe Gen5 SSD",
        price: 239.9,
        helper: "Hogere snelheden voor zware creatieve workloads.",
        imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Snelle PCIe SSD",
      },
      {
        id: "ssd-4tb-gen4",
        label: "4 TB NVMe Gen4 SSD",
        price: 339.9,
        helper: "Voor wie maximale opslagcapaciteit wil in een desktopbuild.",
        imageUrl: "https://www.alternate.be/p/1200x630/6/3/Kingston_NV3_4_TB_SSD@@100093536_30.jpg",
        imageAlt: "Hoge capaciteit SSD",
        sourceId: "ssd-4tb-gen4",
      },
    ],
  },
  {
    id: "cooler",
    label: "CPU-koeling",
    helper: "Bepalend voor geluidsniveau en stabiele boostfrequenties.",
    defaultOptionId: "cooler-tower-120",
    options: [
      {
        id: "cooler-tower-120",
        label: "Tower luchtkoeler 120 mm",
        price: 44.9,
        helper: "Stille en betaalbare basis voor de meeste builds.",
        imageUrl: "https://images.unsplash.com/photo-1587202372583-49330a15584d?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Tower CPU koeler",
      },
      {
        id: "cooler-tower-dual",
        label: "Dual-tower luchtkoeler",
        price: 79.9,
        helper: "Betere thermiek voor zwaardere CPU's en lange sessies.",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Dual fan CPU cooler",
      },
      {
        id: "cooler-aio-360",
        label: "360 mm AIO waterkoeling",
        price: 169.9,
        helper: "Voor maximale koelcapaciteit en strakke uitstraling.",
        imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
        imageAlt: "AIO waterkoeler",
      },
    ],
  },
  {
    id: "psu",
    label: "Voeding",
    helper: "Een efficiënte voeding geeft stabiliteit en upgradebuffer.",
    defaultOptionId: "psu-750-gold",
    options: [
      {
        id: "psu-650-gold",
        label: "650W 80+ Gold",
        price: 84.9,
        helper: "Prima voor budget- en mainstream configuraties.",
        imageUrl: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Desktop voedingseenheid",
      },
      {
        id: "psu-750-gold",
        label: "750W 80+ Gold",
        price: 114.9,
        helper: "Aanbevolen balans tussen efficiëntie en upgradepad.",
        imageUrl: "https://images.unsplash.com/photo-1611175694984-6f5b18f0f93b?auto=format&fit=crop&w=900&q=80",
        imageAlt: "750W pc voeding",
      },
      {
        id: "psu-850-gold-modular",
        label: "850W 80+ Gold modulair",
        price: 149.9,
        helper: "Extra marge voor zwaardere GPU-upgrades later.",
        imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Modulaire pc voeding",
      },
    ],
  },
  {
    id: "case",
    label: "Behuizing",
    helper: "Luchtstroom, formaat en uitstraling van je build.",
    defaultOptionId: "case-airflow-mid",
    options: [
      {
        id: "case-airflow-mid",
        label: "Airflow mid-tower",
        price: 89.9,
        helper: "Goede airflow en nette afwerking voor dagelijks gebruik.",
        imageUrl: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Mid-tower pc behuizing",
      },
      {
        id: "case-rgb-glass",
        label: "RGB glaspaneel mid-tower",
        price: 129.9,
        helper: "Meer showbuild-uitstraling met extra ventilatoren.",
        imageUrl: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Gaming pc case met RGB",
      },
      {
        id: "case-quiet-premium",
        label: "Premium stille behuizing",
        price: 169.9,
        helper: "Demping en premium bouwkwaliteit voor stillere setups.",
        imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Premium desktop case",
      },
    ],
  },
];

export const pcPriceSources: PcPriceSource[] = [
  {
    id: "system-budget-home-5060",
    label: "Budget desktop referentie",
    retailer: "Interne referentie",
    url: "https://ladeco.it/pc-builder",
    fallbackPrice: 999,
    provider: "alternate",
  },
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
    id: "cpu-intel-core-i5-14600kf",
    label: "Intel Core i5-14600K",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/Intel/Core-i5-14600K-3-5-GHz-5-3-GHz-Turbo-Boost-socket-1700-processor/html/product/100009785",
    fallbackPrice: 309.9,
    provider: "alternate",
  },
  {
    id: "cpu-intel-core-i7-14700f",
    label: "Intel Core i7-14700KF",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/Intel/Core-i7-14700KF-3-4-GHz-5-6-GHz-Turbo-Boost-socket-1700-processor/html/product/100009781",
    fallbackPrice: 419.9,
    provider: "alternate",
  },
  {
    id: "mb-b760-gaming-plus-wifi",
    label: "MSI B760 GAMING PLUS WIFI",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/MSI/B760-GAMING-PLUS-WIFI-socket-1700-moederbord/html/product/1919709",
    fallbackPrice: 199.9,
    provider: "alternate",
  },
  {
    id: "mb-z790-gaming-plus",
    label: "MSI Z790 GAMING PLUS WIFI",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/MSI/Z790-GAMING-PLUS-WIFI-socket-1700-moederbord/html/product/100011893",
    fallbackPrice: 289.9,
    provider: "alternate",
  },
  {
    id: "ssd-2tb-gen4",
    label: "Samsung 990 PRO 2 TB SSD",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/Samsung/990-PRO-2-TB-SSD/html/product/1864243",
    fallbackPrice: 149.9,
    provider: "alternate",
  },
  {
    id: "ssd-4tb-gen4",
    label: "Kingston NV3 4 TB SSD",
    retailer: "ALTERNATE.be",
    url: "https://www.alternate.be/Kingston/NV3-4-TB-SSD/html/product/100093536",
    fallbackPrice: 339.9,
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
    id: "budget-home",
    name: "Voordelige basis-pc",
    audience: "dagelijks gebruik, school, lichte gaming",
    description:
      "Budgetvriendelijke instapconfiguratie voor vlot dagelijks gebruik met ruimte om later gericht te upgraden.",
    category: "starter",
    resolution: "1080p",
    productSourceId: "system-budget-home-5060",
    defaultBuild: {
      cpu: "cpu-ryzen-5-8400f",
      gpu: "gpu-rtx-5060",
      memory: "ram-16gb-ddr5",
      motherboard: "mb-b650-eagle-ax",
      storage: "ssd-1tb-gen4",
      cooler: "cooler-tower-120",
      psu: "psu-650-gold",
      case: "case-airflow-mid",
    },
    includes: [
      "Volledig afgewerkte desktop",
      "Geschikt voor dagelijks werk en studie",
      "1 TB SSD-opslag",
      "Upgradepad naar sterkere onderdelen later",
    ],
    marketAnchorSourceIds: ["gpu-rtx-5060", "cpu-ryzen-5-8400f"],
    comparisonSourceIds: ["system-budget-home-5060"],
  },
  {
    id: "casual-5060",
    name: "Instap gaming",
    audience: "1080p gaming, school, dagelijks gebruik",
    description:
      "Volwaardige instap-pc voor populaire games, schoolwerk en een vlotte dagelijkse workflow.",
    category: "starter",
    resolution: "1080p",
    productSourceId: "system-casual-5060",
    defaultBuild: {
      cpu: "cpu-ryzen-5-8400f",
      gpu: "gpu-rtx-5060",
      memory: "ram-16gb-ddr5",
      motherboard: "mb-b650-eagle-ax",
      storage: "ssd-1tb-gen4",
      cooler: "cooler-tower-120",
      psu: "psu-750-gold",
      case: "case-rgb-glass",
    },
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
    defaultBuild: {
      cpu: "cpu-ryzen-7-8700f",
      gpu: "gpu-rtx-5060ti",
      memory: "ram-32gb-ddr5",
      motherboard: "mb-b650m-pro-rs",
      storage: "ssd-2tb-gen4",
      cooler: "cooler-tower-dual",
      psu: "psu-750-gold",
      case: "case-rgb-glass",
    },
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
    defaultBuild: {
      cpu: "cpu-ryzen-5-9600x",
      gpu: "gpu-rx-7800xt",
      memory: "ram-32gb-ddr5",
      motherboard: "mb-x870-gaming-plus",
      storage: "ssd-2tb-gen4",
      cooler: "cooler-aio-360",
      psu: "psu-850-gold-modular",
      case: "case-quiet-premium",
    },
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
  fetchedAt: string,
  catalogOverride?: PcCatalogOverride
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

  const getComponentOption = (option: PcBuildComponentOption) => {
    if (!option.sourceId) {
      return {
        ...option,
        isLive: false,
        sourceNote: option.sourceNote ?? "Geschatte richtprijs",
      };
    }

    const { source, snapshot } = getSnapshot(option.sourceId);

    return {
      ...option,
      price: snapshot.price,
      retailer: source.retailer,
      url: source.url,
      isLive: snapshot.isLive,
      sourceNote: snapshot.sourceNote,
    };
  };

  const catalogBuildComponents =
    catalogOverride?.buildComponents && catalogOverride.buildComponents.length > 0
      ? catalogOverride.buildComponents
      : pcBuildComponents;

  const catalogOptions =
    catalogOverride?.options && catalogOverride.options.length > 0
      ? catalogOverride.options
      : pcUpgradeOptions;

  const buildComponents = catalogBuildComponents.map((group) => ({
    ...group,
    options: group.options.map(getComponentOption),
  }));

  const getBuildOptionPrice = (optionId: string) => {
    for (const group of buildComponents) {
      const option = group.options.find((entry) => entry.id === optionId);

      if (option) {
        return option.price;
      }
    }

    return 0;
  };

  const normalizeDefaultBuild = (defaultBuild: Record<string, string>) => {
    const normalized: Record<string, string> = {};

    for (const group of buildComponents) {
      const preferred = defaultBuild[group.id];
      const exists = preferred ? group.options.some((option) => option.id === preferred) : false;
      normalized[group.id] = exists ? preferred : group.defaultOptionId;
    }

    return normalized;
  };

  const getPlatformPrice = (defaultBuild: Record<string, string>, systemPrice: number) => {
    const componentTotal = Object.values(defaultBuild).reduce((sum, optionId) => sum + getBuildOptionPrice(optionId), 0);

    return Math.max(0, Number((systemPrice - componentTotal).toFixed(2)));
  };

  const profiles = pcBuildProfilesCatalog.map((profile) => {
    const base = getSnapshot(profile.productSourceId);
    const defaultBuild = normalizeDefaultBuild(profile.defaultBuild);
    const platformPrice = getPlatformPrice(defaultBuild, base.snapshot.price);
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
      platformPrice,
      defaultBuild,
      includes: profile.includes,
      marketAnchors,
      cheapestRetailer: cheapestComparison.retailer,
      cheapestTotal: cheapestComparison.price,
    };
  });

  const liveSourceCount = pcPriceSources.filter((source) => priceSnapshots[source.id]?.isLive).length;
  const sourceCount = pcPriceSources.length;

  const pricingNote =
    liveSourceCount === sourceCount
      ? "Prijsdata wordt continu bijgewerkt voor een zo scherp mogelijke configuratie-inschatting."
      : liveSourceCount > 0
        ? "Prijsdata combineert recente metingen met laatst gecontroleerde richtprijzen wanneer data tijdelijk ontbreekt."
        : "Prijsdata gebruikt momenteel de laatst gecontroleerde richtprijzen.";

  return {
    fetchedAt,
    pricingMode:
      liveSourceCount === sourceCount ? "live" : liveSourceCount > 0 ? "mixed" : "fallback",
    note: catalogOverride?.note ? `${pricingNote} ${catalogOverride.note}` : pricingNote,
    sourceCount,
    liveSourceCount,
    profiles,
    options: catalogOptions,
    buildComponents,
    retailers: [...new Set(pcPriceSources.map((source) => source.retailer))],
  };
}