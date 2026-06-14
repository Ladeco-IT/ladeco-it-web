import ContactForm from "../components/ContactForm";

export default async function ContactPage({ searchParams }: { searchParams?: Promise<{ success?: string }> }) {
  const params = searchParams ? await searchParams : undefined;
  const success = params?.success === "1";

  return (
    <main className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950/20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Contact</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl dark:text-slate-100">Neem contact op met Ladeco IT</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Heb je een vraag over onze diensten of wil je een afspraak maken? Vul het formulier in en we nemen snel contact met je op.
          </p>
        </div>
        <ContactForm success={success} />
      </div>
    </main>
  );
}
