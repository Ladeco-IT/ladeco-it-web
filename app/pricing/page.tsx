import ServicePricing from "../components/ServicePricing";
import { resolveLang } from "../lib/i18n";

export default async function PricingPage({ searchParams }: { searchParams?: Promise<{ lang?: string }> }) {
    const resolvedSearchParams = await searchParams;
    const lang = resolveLang(resolvedSearchParams?.lang);

    return (
        <main className="space-y-16">
            <ServicePricing lang={lang} />
        </main>
    );
}