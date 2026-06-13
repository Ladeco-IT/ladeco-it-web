import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Contact</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">Neem contact op met Ladeco IT</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            Heb je een vraag over onze diensten of wil je een afspraak maken? Vul het formulier in en we nemen snel contact met je op.
          </p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
