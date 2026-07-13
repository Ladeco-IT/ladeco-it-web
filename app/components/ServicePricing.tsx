import { serviceRates } from "@/app/lib/pcBuilderCatalog";

const euro = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

export default function ServicePricing() {
  return (
    <section className="panel-soft space-y-8 p-6 sm:p-8 lg:p-10">
      <div className="max-w-3xl space-y-4">
        <p className="eyebrow">Serviceprijzen</p>
        <h2 className="headline text-3xl sm:text-4xl lg:text-5xl">Duidelijke tarieven voor het werk dat we leveren.</h2>
        <p className="text-base leading-8 text-[color:var(--muted)] sm:text-lg">
          Dit zijn onze richtprijzen voor de meest gevraagde diensten. Voor grotere opdrachten of combinaties maken we een gerichte offerte op maat.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {serviceRates.map((service) => (
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