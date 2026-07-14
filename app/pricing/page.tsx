import ServicePricing from "../components/ServicePricing";
import { resolveLang } from "../lib/i18n";

export default function PricingPage({ searchParams }: { searchParams?: { lang?: string } }) {
    const lang = resolveLang(searchParams?.lang);

    return (
        <main className="space-y-16">
            <ServicePricing lang={lang} />
        </main>
    );
}