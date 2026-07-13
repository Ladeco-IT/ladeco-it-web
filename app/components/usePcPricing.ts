"use client";

import { useEffect, useState } from "react";

import {
  PcPricingPayload,
  createFallbackPcPricingPayload,
} from "@/app/lib/pcBuilderCatalog";

const fallbackPcPricing = createFallbackPcPricingPayload();

export function usePcPricing() {
  const [pricingData, setPricingData] = useState<PcPricingPayload>(fallbackPcPricing);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPricing() {
      try {
        const response = await fetch("/api/pc-builder-prices", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("De live prijsopvraging is momenteel niet beschikbaar.");
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
        setErrorMessage(error instanceof Error ? error.message : "Live prijzen laden mislukt.");
      }
    }

    void loadPricing();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    pricingData,
    status,
    errorMessage,
    fallbackPricing: fallbackPcPricing,
  };
}