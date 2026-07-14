"use client";

import { useEffect, useState } from "react";

import {
  PcPricingPayload,
  createFallbackPcPricingPayload,
} from "@/app/lib/pcBuilderCatalog";
import { type Lang } from "../lib/i18n";

const fallbackPcPricing = createFallbackPcPricingPayload();

export function usePcPricing(lang: Lang = "nl") {
  const [pricingData, setPricingData] = useState<PcPricingPayload>(fallbackPcPricing);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPricing() {
      try {
        const response = await fetch("/api/pc-builder-prices", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(lang === "nl" ? "De live prijsopvraging is momenteel niet beschikbaar." : "The live price lookup is currently unavailable.");
        }

        const result = (await response.json()) as PcPricingPayload;

        if (cancelled) {
          return;
        }

        setPricingData(result);
        setStatus("ready");
        setErrorMessage("");
      } catch (error) {
        if (cancelled) {
          return;
        }

        setPricingData(fallbackPcPricing);
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : (lang === "nl" ? "Live prijzen laden mislukt." : "Failed to load live prices."));
      }
    }

    void loadPricing();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return {
    pricingData,
    status,
    errorMessage,
    fallbackPricing: fallbackPcPricing,
  };
}