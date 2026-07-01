export default function ContactForm({ success }: { success?: boolean }) {
  return (
    <form
      action="https://formsubmit.co/26bc4c4785863ed150af05fde3932d95"
      method="POST"
      className="panel-soft p-6 sm:p-7"
    >
      {success && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          <p className="text-sm font-semibold">Bedankt voor je bericht!</p>
          <p className="mt-1 text-sm">We nemen snel contact met je op.</p>
        </div>
      )}
      <input type="hidden" name="_subject" value="Nieuw bericht van Ladeco IT website" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="/contact?success=1" />
      <input type="hidden" name="_autoresponse" value="Bedankt voor je bericht! We nemen snel contact op." />
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[color:var(--foreground)]">
            Naam
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]"
            placeholder="Jouw naam"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[color:var(--foreground)]">
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]"
            placeholder="naam@voorbeeld.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-[color:var(--foreground)]">
            Onderwerp
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]"
            placeholder="Waar gaat je bericht over?"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[color:var(--foreground)]">
            Bericht
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="mt-3 w-full rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]"
            placeholder="Vertel ons wat je nodig hebt..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[color:var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
        >
          Verstuur bericht
        </button>
      </div>
    </form>
  );
}
