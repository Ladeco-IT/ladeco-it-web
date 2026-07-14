import type { Metadata } from "next";

import PcBuilderExperience from "../components/PcBuilderExperience";
import { resolveLang } from "../lib/i18n";
import { defaultKeywords, siteName, socialImage } from "../seo";

const pcBuilderCopy = {
  nl: {
    title: "PC Builder",
    description: "Vergelijk actuele pc-prijzen, filter op budget en gebruik, en stel een build samen op basis van live winkeldata.",
  },
  en: {
    title: "PC Builder",
    description: "Compare current PC prices, filter by budget and use case, and build a system from live shop data.",
  },
};

export const metadata: Metadata = {
  title: pcBuilderCopy.nl.title,
  description: pcBuilderCopy.nl.description,
  alternates: {
    canonical: "/pc-builder",
  },
  keywords: [...defaultKeywords, "pc builder", "gaming pc prijzen", "computer configurator"],
  openGraph: {
    title: `PC Builder | ${siteName}`,
    description: pcBuilderCopy.nl.description,
    url: "/pc-builder",
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
    title: `PC Builder | ${siteName}`,
    description: pcBuilderCopy.nl.description,
    images: [socialImage],
  },
};

export default async function PcBuilderPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const lang = resolveLang(resolvedSearchParams?.lang);

  return <PcBuilderExperience lang={lang} />;
}