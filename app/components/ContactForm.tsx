export default function ContactForm({ success }: { success?: boolean }) {
  return (
    <form
      action="https://formsubmit.co/26bc4c4785863ed150af05fde3932d95"
      method="POST"
      className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950/10"
    >
      {success && (
        <div className="mb-6 rounded-3xl border border-green-200 bg-green-50 p-4 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-100">
          <p className="text-sm font-semibold">Bedankt voor je bericht!</p>
          <p className="mt-1 text-sm">We nemen snel contact met je op.</p>
        </div>
      )}
      <input type="hidden" name="_subject" value="Nieuw bericht van Ladeco IT website" />
      <input type="hidden" name="_captcha" value="true" />
      <input type="hidden" name="_next" value="/contact?success=1" />
      <input type="hidden" name="_autoresponse" value="Bedankt voor je bericht! We nemen snel contact op." />
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
            Naam
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
            placeholder="Jouw naam"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
            placeholder="naam@voorbeeld.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
            Onderwerp
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
            placeholder="Waar gaat je bericht over?"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
            Bericht
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="mt-3 w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700"
            placeholder="Vertel ons wat je nodig hebt..."
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto cursor-pointer"
        >
          {isLoading ? 'Verzenden...' : 'Verstuur bericht'}
        </button>
      </div>
    </form>
  );
}
