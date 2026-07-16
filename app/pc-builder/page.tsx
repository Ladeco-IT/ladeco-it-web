import type { Metadata } from "next";

import PcBuilderExperience from "../components/PcBuilderExperience";
import { resolveLang } from "../lib/i18n";
import { defaultKeywords, siteName, socialImage } from "../seo";

const pcBuilderCopy = {
  nl: {
    title: "PC Builder",
    description: "Stel een voordelige pc samen op basis van je gebruik, budget en gewenste prestaties.",
  },
  en: {
    title: "PC Builder",
    description: "Build a cost-efficient PC based on your use case, budget and desired performance.",
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