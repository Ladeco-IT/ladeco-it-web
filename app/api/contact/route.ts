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
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5; background: #f3f4f6; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
            <div style="padding: 24px 24px 16px; background: #111827; color: #ffffff;">
              <h1 style="margin: 0; font-size: 20px; letter-spacing: -0.02em;">Nieuw contactbericht</h1>
              <p style="margin: 8px 0 0; color: #d1d5db; font-size: 14px;">Ladeco IT contactformulier</p>
            </div>
            <div style="padding: 24px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 120px; font-weight: 700; color: #111827;">Naam</td>
                  <td style="padding: 10px 0; color: #4b5563;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; font-weight: 700; color: #111827;">E-mail</td>
                  <td style="padding: 10px 0; color: #4b5563;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; font-weight: 700; color: #111827;">Onderwerp</td>
                  <td style="padding: 10px 0; color: #4b5563;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top: 24px; padding: 18px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; color: #374151;">
                <p style="margin: 0 0 12px; font-weight: 700; color: #111827;">Bericht</p>
                <div style="white-space: pre-wrap;">${message.replace(/\n/g, "<br />")}</div>
              </div>
            </div>
            <div style="padding: 16px 24px 24px; font-size: 12px; color: #6b7280; background: #f9fafb;">
              <p style="margin: 0;">Dit bericht is automatisch aangemaakt via het contactformulier van Ladeco IT.</p>
            </div>
          </div>
        </div>
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
