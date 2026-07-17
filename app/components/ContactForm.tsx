'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { buildLocalizedHref, type Lang } from "../lib/i18n";

type ContactFormProps = {
  lang: Lang;
};

export default function ContactForm({ lang }: ContactFormProps) {
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
  const pcComponents = searchParams.get("pcComponents") || "";
  const pcComponentsLabel = searchParams.get("pcComponentsLabel") || "";
  const pcApproval = searchParams.get("pcApproval") || "";
  const success = searchParams.get("success") === "1";
  const [subjectValue, setSubjectValue] = useState(() =>
    pcLabel
      ? lang === "nl"
        ? "Offerteaanvraag pc-configuratie"
        : "Quote request for PC configuration"
      : ""
  );
  const [messageValue, setMessageValue] = useState(() =>
    pcLabel
      ? lang === "nl"
        ? `Hallo,

Ik wil graag meer info en een offerte voor deze pc-configuratie:
- Build: ${pcLabel}
- Geschatte totaalprijs: € ${pcTotal || "onbekend"}
- Extra hardware: ${pcExtrasLabel || "Geen extra hardware-upgrades"}

Mijn vragen of voorkeuren:
`
        : `Hello,

I would like more information and a quote for this PC configuration:
- Build: ${pcLabel}
- Estimated total price: € ${pcTotal || "unknown"}
- Extra hardware: ${pcExtrasLabel || "No extra hardware upgrades"}

My questions or preferences:
`
      : ""
  );

  const copy = lang === "nl"
    ? {
        successTitle: "Bedankt voor je bericht!",
        successText: "We nemen snel contact met je op.",
        errorTitle: "Versturen mislukt",
        selectedBuild: "Gekozen pc-configuratie",
        totalLabel: "Geschatte totaalprijs",
        extrasLabel: "Extra hardware",
        componentsLabel: "Componentkeuze",
        approvalLabel: "Akkoord op indicatie",
        approvalYes: "Ja",
        approvalNo: "Nee",
        flowTitle: "Wat gebeurt er na je aanvraag?",
        flowText: "We bekijken je configuratie intern, doen waar nodig prijs- of onderdeelaanpassingen en sturen je daarna een finale offerte.",
        name: "Naam",
        namePlaceholder: "Jouw naam",
        email: "E-mailadres",
        subject: "Onderwerp",
        subjectPlaceholder: "Waar gaat je bericht over?",
        message: "Bericht",
        messagePlaceholder: "Vertel ons wat je nodig hebt...",
        submit: isSubmitting ? "Versturen..." : "Verstuur bericht",
        genericError: "Er ging iets mis bij het versturen van je bericht.",
        successRedirect: "/contact?success=1",
      }
    : {
        successTitle: "Thanks for your message!",
        successText: "We will get back to you soon.",
        errorTitle: "Sending failed",
        selectedBuild: "Selected PC configuration",
        totalLabel: "Estimated total price",
        extrasLabel: "Extra hardware",
        componentsLabel: "Component selection",
        approvalLabel: "Approved estimate",
        approvalYes: "Yes",
        approvalNo: "No",
        flowTitle: "What happens after your request?",
        flowText: "We review your configuration internally, adjust pricing or components if needed, and then send you a final quote.",
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email address",
        subject: "Subject",
        subjectPlaceholder: "What is your message about?",
        message: "Message",
        messagePlaceholder: "Tell us what you need...",
        submit: isSubmitting ? "Sending..." : "Send message",
        genericError: "Something went wrong while sending your message.",
        successRedirect: "/contact?success=1&lang=en",
      };

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
        throw new Error(result.error || copy.genericError);
      }

      form.reset();
      router.replace(buildLocalizedHref("/contact", lang === "nl" ? "success=1" : "success=1", lang), { scroll: false });
      setStatus("success");
      setMessage(`${copy.successTitle} ${copy.successText}`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-soft p-6 sm:p-7">
      {(success || status === "success") && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          <p className="text-sm font-semibold">{copy.successTitle}</p>
          <p className="mt-1 text-sm">{copy.successText}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900">
          <p className="text-sm font-semibold">{copy.errorTitle}</p>
          <p className="mt-1 text-sm">{message}</p>
        </div>
      )}

      <div className="space-y-5">
        {pcLabel ? (
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm leading-6 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">{copy.selectedBuild}</p>
            <p className="mt-2">{pcLabel}</p>
            <p className="mt-1">{copy.totalLabel}: € {pcTotal || (lang === "nl" ? "onbekend" : "unknown")}</p>
            <p className="mt-1">{copy.extrasLabel}: {pcExtrasLabel || (lang === "nl" ? "Geen extra hardware-upgrades" : "No extra hardware upgrades")}</p>
            <p className="mt-1">{copy.componentsLabel}: {pcComponentsLabel || (lang === "nl" ? "Niet opgegeven" : "Not provided")}</p>
            <p className="mt-1">{copy.approvalLabel}: {pcApproval === "1" ? copy.approvalYes : copy.approvalNo}</p>
          </div>
        ) : null}

        {pcLabel ? (
          <div className="rounded-2xl bg-[color:var(--accent-soft)]/70 p-4 text-sm leading-6 text-[color:var(--muted)]">
            <p className="font-semibold text-[color:var(--foreground)]">{copy.flowTitle}</p>
            <p className="mt-1">{copy.flowText}</p>
          </div>
        ) : null}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[color:var(--foreground)]">
            {copy.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]"
            placeholder={copy.namePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[color:var(--foreground)]">
            {copy.email}
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
            {copy.subject}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={subjectValue}
            onChange={(event) => setSubjectValue(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]"
            placeholder={copy.subjectPlaceholder}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[color:var(--foreground)]">
            {copy.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={messageValue}
            onChange={(event) => setMessageValue(event.target.value)}
            className="mt-3 w-full rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)]"
            placeholder={copy.messagePlaceholder}
          />
        </div>
        <input type="hidden" name="pcProfile" value={pcProfile} />
        <input type="hidden" name="pcLabel" value={pcLabel} />
        <input type="hidden" name="pcTotal" value={pcTotal} />
        <input type="hidden" name="pcExtras" value={pcExtras} />
        <input type="hidden" name="pcExtrasLabel" value={pcExtrasLabel} />
        <input type="hidden" name="pcComponents" value={pcComponents} />
        <input type="hidden" name="pcComponentsLabel" value={pcComponentsLabel} />
        <input type="hidden" name="pcApproval" value={pcApproval} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[color:var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {copy.submit}
        </button>
      </div>
    </form>
  );
}
