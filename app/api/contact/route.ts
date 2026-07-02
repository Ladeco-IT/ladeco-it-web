import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Vul alle velden in." }, { status: 400 });
  }

  if (!resend) {
    return NextResponse.json({ error: "RESEND_API_KEY is niet ingesteld." }, { status: 500 });
  }

  try {
    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const to = process.env.RESEND_TO_EMAIL ? [process.env.RESEND_TO_EMAIL] : ["alessio@ladeco-it.com"];
    const { data, error } = await resend.emails.send({
      from: `Ladeco IT <${from}>`,
      to,
      replyTo: email,
      subject: `Nieuw bericht van ${name}: ${subject}`,
      html: `
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mailadres:</strong> ${email}</p>
        <p><strong>Onderwerp:</strong> ${subject}</p>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
      text: `Naam: ${name}\nE-mailadres: ${email}\nOnderwerp: ${subject}\n\nBericht:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Er ging iets mis bij het versturen.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
