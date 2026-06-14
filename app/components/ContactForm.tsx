'use client';

import { useState, useRef } from 'react';

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formsubmit.co/26bc4c4785863ed150af05fde3932d95', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        formRef.current?.reset();
        
        // Reset success message na 5 seconden
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Fout bij het versturen:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm dark:border-green-900 dark:bg-green-950 dark:shadow-green-950/10">
        <div className="text-center">
          <div className="mb-2 text-2xl">✓</div>
          <h2 className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
            Bedankt voor je bericht!
          </h2>
          <p className="text-sm text-green-800 dark:text-green-200">
            We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950/10"
    >
      <input type="hidden" name="_subject" value="Nieuw bericht van Ladeco IT website" />
      <input type="hidden" name="_captcha" value="true" />
      <input type="hidden" name="_next" value="/contact" />
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
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:bg-slate-500 disabled:cursor-not-allowed sm:w-auto cursor-pointer"
        >
          {isLoading ? 'Verzenden...' : 'Verstuur bericht'}
        </button>
      </div>
    </form>
  );
}
