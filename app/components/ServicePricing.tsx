import { serviceRates } from "@/app/lib/pcBuilderCatalog";
import { type Lang } from "../lib/i18n";

const euro = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

type ServicePricingProps = {
  lang: Lang;
};

export default function ServicePricing({ lang }: ServicePricingProps) {
  const copy = lang === "nl"
    ? {
        eyebrow: "Serviceprijzen",
        title: "Duidelijke tarieven voor het werk dat we leveren.",
        intro:
          "Dit zijn onze richtprijzen voor de meest gevraagde diensten. Voor grotere opdrachten of combinaties maken we een gerichte offerte op maat.",
        services: serviceRates,
      }
    : {
        eyebrow: "Service pricing",
        title: "Clear rates for the work we deliver.",
        intro:
          "These are our reference prices for the most requested services. For larger jobs or combinations, we prepare a tailored quote.",
        services: serviceRates.map((service) => {
          if (service.title === "Diagnose en foutanalyse") {
            return {
              ...service,
              title: "Diagnosis and fault analysis",
              description: "Inspection of PC, laptop or network issues with clear recovery advice.",
            };
          }

          if (service.title === "Windows-installatie en basisconfiguratie") {
            return {
              ...service,
              title: "Windows installation and basic setup",
              description: "Clean installation, drivers, updates and basic security.",
            };
          }

          if (service.title === "Data-overzet en back-uphulp") {
            return {
              ...service,
              title: "Data transfer and backup help",
              description: "Move documents, photos and basic settings to a new device.",
            };
          }

          if (service.title === "Pc-assemblage en stresstest") {
            return {
              ...service,
              title: "PC assembly and stress test",
              description: "Assembly, cable management, BIOS update and stability testing.",
            };
          }

          if (service.title === "Netwerkinterventie op locatie") {
            return {
              ...service,
              title: "On-site network intervention",
              unit: "/ hour",
              description: "For Wi-Fi issues, router installs and small network improvements.",
            };
          }

          return {
            ...service,
            title: "Semi-annual maintenance",
            description: "Dust cleaning, updates, health check and performance review.",
          };
        }),
      };

  return (
    <section className="panel-soft space-y-8 p-6 sm:p-8 lg:p-10">
      <div className="max-w-3xl space-y-4">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="headline text-3xl sm:text-4xl lg:text-5xl">{copy.title}</h2>
        <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
          {copy.intro}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {copy.services.map((service) => (
          <article
            key={service.title}
            className="rounded-[1.35rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-[color:var(--foreground)]">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{service.description}</p>
              </div>
              <p className="whitespace-nowrap text-base font-semibold text-[color:var(--foreground)]">
                {euro.format(service.price)}
                {service.unit ? service.unit : ""}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}