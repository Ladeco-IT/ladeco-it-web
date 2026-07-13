import type { Metadata } from "next";

import PcBuilderExperience from "../components/PcBuilderExperience";
import { defaultKeywords, siteName, socialImage } from "../seo";

export const metadata: Metadata = {
  title: "PC Builder",
  description:
    "Vergelijk actuele pc-prijzen, filter op budget en gebruik, en stel een build samen op basis van live winkeldata.",
  alternates: {
    canonical: "/pc-builder",
  },
  keywords: [...defaultKeywords, "pc builder", "gaming pc prijzen", "computer configurator"],
  openGraph: {
    title: `PC Builder | ${siteName}`,
    description:
      "Vergelijk actuele pc-prijzen, filter op budget en gebruik, en stel een build samen op basis van live winkeldata.",
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
    description:
      "Vergelijk actuele pc-prijzen, filter op budget en gebruik, en stel een build samen op basis van live winkeldata.",
    images: [socialImage],
  },
};

export default function PcBuilderPage() {
  return <PcBuilderExperience />;
}