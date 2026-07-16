import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const pcProfile = String(formData.get("pcProfile") || "").trim();
  const pcLabel = String(formData.get("pcLabel") || "").trim();
  const pcTotal = String(formData.get("pcTotal") || "").trim();
  const pcExtras = String(formData.get("pcExtras") || "").trim();
  const pcExtrasLabel = String(formData.get("pcExtrasLabel") || "").trim();
  const pcComponents = String(formData.get("pcComponents") || "").trim();
  const pcComponentsLabel = String(formData.get("pcComponentsLabel") || "").trim();
  const pcApproval = String(formData.get("pcApproval") || "").trim();
  const isPcLead = Boolean(pcLabel);
  const approvalTag = pcApproval === "1" ? "AKKOORD" : "NOG TE BESPREKEN";
  const subjectPrefix = isPcLead ? `[PC LEAD - ${approvalTag}] ` : "";

  const pcSummaryHtml = pcLabel
    ? `
              <div style="margin-top: 24px; padding: 18px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; color: #7c2d12;">
                <p style="margin: 0 0 12px; font-weight: 700; color: #9a3412;">Gekozen pc-configuratie</p>
                <p style="margin: 0 0 8px;"><strong>Build:</strong> ${pcLabel}</p>
                <p style="margin: 0 0 8px;"><strong>Totaal:</strong> € ${pcTotal || "onbekend"}</p>
                <p style="margin: 0 0 8px;"><strong>Extra hardware:</strong> ${pcExtrasLabel || "Geen extra hardware-upgrades"}</p>
                <p style="margin: 0 0 8px;"><strong>Componenten:</strong> ${pcComponentsLabel || "Niet opgegeven"}</p>
                <p style="margin: 0 0 8px;"><strong>Akkoord prijsindicatie:</strong> ${pcApproval === "1" ? "Ja" : "Nee"}</p>
                <p style="margin: 0;"><strong>Interne codes:</strong> profiel ${pcProfile || "n.v.t."}, components ${pcComponents || "geen"}, extras ${pcExtras || "geen"}</p>
              </div>
      `
    : "";

  const pcSummaryText = pcLabel
    ? `\n\nPc-configuratie:\n- Build: ${pcLabel}\n- Totaal: € ${pcTotal || "onbekend"}\n- Extra hardware: ${pcExtrasLabel || "Geen extra hardware-upgrades"}\n- Componenten: ${pcComponentsLabel || "Niet opgegeven"}\n- Akkoord prijsindicatie: ${pcApproval === "1" ? "Ja" : "Nee"}\n- Interne codes: profiel ${pcProfile || "n.v.t."}, components ${pcComponents || "geen"}, extras ${pcExtras || "geen"}`
    : "";

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
      subject: `${subjectPrefix}Nieuw bericht van ${name}: ${subject}`,
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
              ${pcSummaryHtml}
            </div>
            <div style="padding: 16px 24px 24px; font-size: 12px; color: #6b7280; background: #f9fafb;">
              <p style="margin: 0;">Dit bericht is automatisch aangemaakt via het contactformulier van Ladeco IT.</p>
            </div>
          </div>
        </div>
      `,
      text: `Naam: ${name}\nE-mailadres: ${email}\nOnderwerp: ${subject}\n\nBericht:\n${message}${pcSummaryText}`,
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
