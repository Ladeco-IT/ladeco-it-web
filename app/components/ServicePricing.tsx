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
        intro: "Prijzen zijn standaard prijzen en kunnen afwijken.",
        noticeTitle: "Belangrijk",
        noticeText: "Prijzen zijn standaard prijzen (kan afwijken).",
        otherRequestTitle: "Aanvraag voor andere IT zaken",
        otherRequestText: "Ook voor andere IT-vragen kan je contact opnemen. We maken dan een voorstel op maat.",
        services: serviceRates,
      }
    : {
        eyebrow: "Service pricing",
        title: "Clear rates for the work we deliver.",
        intro: "Prices are standard reference prices and may vary.",
        noticeTitle: "Important",
        noticeText: "Prices are standard prices (may vary).",
        otherRequestTitle: "Request for other IT services",
        otherRequestText: "You can also contact us for other IT needs. We will prepare a tailored proposal.",
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
              description: "For Wi-Fi issues, router installs and small and/or large network improvements.",
            };
          }

          if (service.title === "Computeronderhoud") {
            return {
              ...service,
              title: "Computer maintenance",
              description: "Dust cleaning, updates, health check and performance review.",
            };
          }

          return {
            ...service,
            title: service.title,
            description: service.description,
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
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 text-sm leading-7 text-[color:var(--muted)]">
          <p><strong>{copy.noticeTitle}:</strong> {copy.noticeText}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {copy.services.map((service) => (
          <article
            key={service.title}
            className="rounded-[1.35rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-base font-semibold text-[color:var(--foreground)]">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{service.description}</p>
              </div>
              <p className="text-base font-semibold text-[color:var(--foreground)] sm:whitespace-nowrap">
                {euro.format(service.price)}
                {service.unit ? service.unit : ""}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[1.35rem] border border-dashed border-[color:var(--border)] bg-[color:var(--surface)] p-5">
        <h3 className="text-base font-semibold text-[color:var(--foreground)]">{copy.otherRequestTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{copy.otherRequestText}</p>
      </div>
    </section>
  );
}