import ContactForm from "../components/ContactForm";

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ success?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const success = params?.success === "1";

  return (
    <main className="space-y-5">
      <section className="panel p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="headline mt-4 text-3xl sm:text-4xl lg:text-5xl">Neem contact op voor een passend advies.</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-[color:var(--muted)]">
              Heb je een vraag over onze diensten of wil je een afspraak maken? Vul het formulier in en we nemen snel contact met je op.
            </p>
          </div>
          <ContactForm success={success} />
        </div>
      </section>
    </main>
  );
}
