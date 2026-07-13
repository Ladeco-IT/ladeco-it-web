'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pcProfile = searchParams.get("pcProfile") || "";
  const pcLabel = searchParams.get("pcLabel") || "";
  const pcTotal = searchParams.get("pcTotal") || "";
  const pcExtras = searchParams.get("pcExtras") || "";
  const pcExtrasLabel = searchParams.get("pcExtrasLabel") || "";
  const success = searchParams.get("success") === "1";
  const [subjectValue, setSubjectValue] = useState(() =>
    pcLabel ? `Offerteaanvraag pc-configuratie: ${pcLabel}` : ""
  );
  const [messageValue, setMessageValue] = useState(() =>
    pcLabel
      ? `Hallo,

Ik wil graag meer info en een offerte voor deze pc-configuratie:
- Build: ${pcLabel}
- Geschatte totaalprijs: € ${pcTotal || "onbekend"}
- Extra hardware: ${pcExtrasLabel || "Geen extra hardware-upgrades"}

Mijn vragen of voorkeuren:
`
      : ""
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Er ging iets mis bij het versturen van je bericht.");
      }

      form.reset();
      router.replace("/contact?success=1", { scroll: false });
      setStatus("success");
      setMessage("Bedankt voor je bericht! We nemen snel contact met je op.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Er ging iets mis bij het versturen van je bericht.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-soft p-6 sm:p-7">
      {(success || status === "success") && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          <p className="text-sm font-semibold">Bedankt voor je bericht!</p>
          <p className="mt-1 text-sm">We nemen snel contact met je op.</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900">
          <p className="text-sm font-semibold">Versturen mislukt</p>
          <p className="mt-1 text-sm">{message}</p>
        </div>
      )}

      <div className="space-y-5">
        {pcLabel ? (
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm leading-6 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">Gekozen pc-configuratie</p>
            <p className="mt-2">{pcLabel}</p>
            <p className="mt-1">Geschatte totaalprijs: € {pcTotal || "onbekend"}</p>
            <p className="mt-1">Extra hardware: {pcExtrasLabel || "Geen extra hardware-upgrades"}</p>
          </div>
        ) : null}
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
            value={subjectValue}
            onChange={(event) => setSubjectValue(event.target.value)}
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
            value={messageValue}
            onChange={(event) => setMessageValue(event.target.value)}
            className="mt-3 w-full rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]"
            placeholder="Vertel ons wat je nodig hebt..."
          />
        </div>
        <input type="hidden" name="pcProfile" value={pcProfile} />
        <input type="hidden" name="pcLabel" value={pcLabel} />
        <input type="hidden" name="pcTotal" value={pcTotal} />
        <input type="hidden" name="pcExtras" value={pcExtras} />
        <input type="hidden" name="pcExtrasLabel" value={pcExtrasLabel} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[color:var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? "Versturen..." : "Verstuur bericht"}
        </button>
      </div>
    </form>
  );
}
