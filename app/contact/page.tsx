import ContactForm from "../components/ContactForm";

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ success?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const success = params?.success === "1";

  return (
    <main className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="headline mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Neem contact op voor een passend advies.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-[color:var(--muted)]">
            Heb je een vraag over onze diensten of wil je een afspraak maken? Vul het formulier in en we nemen snel contact met je op.
          </p>
        </div>

        <div className="space-y-6 text-[color:var(--muted)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">Direct contact</p>
          <p className="text-base leading-8">
            Je kunt ons telefonisch bereiken of het formulier invullen. We geven een eerlijk advies en zorgen dat je weet wat je kunt verwachten.
          </p>
          <div className="space-y-2 text-sm">
            <p>Telefoon: +32 478 22 86 26</p>
            <p>E-mail: info@ladeco-it.com</p>
          </div>
        </div>
      </section>

      <section>
        <ContactForm />
      </section>
    </main>
  );
}
