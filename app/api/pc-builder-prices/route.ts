import { NextResponse } from "next/server";

import {
  PcPriceSnapshot,
  createPcPricingPayload,
  pcPriceSources,
} from "@/app/lib/pcBuilderCatalog";

export const runtime = "nodejs";

function parseEuroPrice(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".").trim();
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function extractAlternatePrice(html: string) {
  const normalized = html.replace(/&nbsp;/g, " ").replace(/\s+/g, " ");

  const structuredMatch = normalized.match(
    /"priceCurrency"\s*:\s*"EUR"[\s\S]{0,120}?"price"\s*:\s*"([0-9.]+)"/i
  );

  if (structuredMatch) {
    const parsedStructuredPrice = Number(structuredMatch[1]);

    if (Number.isFinite(parsedStructuredPrice)) {
      return parsedStructuredPrice;
    }
  }

  const match = normalized.match(
    /<span class="price ">€\s*([0-9][0-9\.,]*)<\/span>[\s\S]{0,200}?Inclusief btw/i
  );

  if (!match) {
    return null;
  }

  return parseEuroPrice(match[1]);
}

async function fetchPriceSnapshot(url: string): Promise<PcPriceSnapshot> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "accept-language": "nl-BE,nl;q=0.9,en;q=0.8",
      "user-agent": "Mozilla/5.0 (compatible; LadecoITBot/1.0; +https://ladeco-it.com)",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();
  const price = extractAlternatePrice(html);

  if (price === null) {
    throw new Error("Geen prijs gevonden in productpagina");
  }

  return {
    price,
    isLive: true,
    sourceNote: "Live opgehaald via ALTERNATE.be productpagina",
  };
}

async function fetchAmazonSearchSnapshot(url: string, asin: string): Promise<PcPriceSnapshot> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "accept-language": "nl-BE,nl;q=0.9,en;q=0.8",
      "user-agent": "Mozilla/5.0 (compatible; LadecoITBot/1.0; +https://ladeco-it.com)",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();
  const normalized = html.replace(/\s+/g, " ");
  const start = normalized.indexOf(`data-asin=\"${asin}\"`);

  if (start < 0) {
    throw new Error("Amazon-resultaat niet gevonden");
  }

  const block = normalized.slice(start, start + 50000);
  const match = block.match(/<span class=\"a-offscreen\">€\s*([0-9\.,]+)<\/span>/i);

  if (!match) {
    throw new Error("Geen Amazon-prijs gevonden");
  }

  const price = parseEuroPrice(match[1]);

  if (price === null) {
    throw new Error("Amazon-prijs kon niet worden gelezen");
  }

  return {
    price,
    isLive: true,
    sourceNote: "Live opgehaald via Amazon.com.be zoekresultaat",
  };
}

async function fetchSourceSnapshot(source: (typeof pcPriceSources)[number]) {
  if (source.provider === "alternate") {
    return fetchPriceSnapshot(source.url);
  }

  if (source.provider === "amazon-search" && source.asin) {
    return fetchAmazonSearchSnapshot(source.url, source.asin);
  }

  throw new Error(`Niet-ondersteunde prijsprovider voor ${source.id}`);
}

export async function GET() {
  const results = await Promise.allSettled(
    pcPriceSources.map(async (source) => ({
      id: source.id,
      snapshot: await fetchSourceSnapshot(source),
    }))
  );

  const liveSnapshots: Partial<Record<string, PcPriceSnapshot>> = {};

  for (const result of results) {
    if (result.status === "fulfilled") {
      liveSnapshots[result.value.id] = result.value.snapshot;
    }
  }

  const payload = createPcPricingPayload(liveSnapshots, new Date().toISOString());

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}