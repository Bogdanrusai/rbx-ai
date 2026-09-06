import { render } from "@react-email/render";
import { Resend } from "resend";
import ConfirmationEmail from "@/emails/ConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rawProfile = body.instagram?.trim() || "";
    const profileUrl = rawProfile
      ? rawProfile.startsWith("http")
        ? rawProfile
        : rawProfile.startsWith("@")
          ? `https://instagram.com/${rawProfile.slice(1)}`
          : `https://${rawProfile}`
      : "";

    const confirmationHtml = await render(
      ConfirmationEmail({
        name: body.name || "Salut",
      })
    );

    const internalEmail = await resend.emails.send({
      from: "RBX.AI <contact@rbxagency.com>",
      to: "bogdyrus9@gmail.com",
      replyTo: body.email,
      subject: `Lead nou de la ${body.name || "website"}`,
      html: `
        <div style="margin:0;padding:40px 16px;background:#eeeeee;font-family:Arial,sans-serif;">
          <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #dddddd;">
            <div style="padding:28px 36px;background:#090909;">
              <a
                href="https://rbxagency.com"
                style="color:#ffffff;font-size:24px;font-weight:700;text-decoration:none;"
              >
                RBX.AI
              </a>

              <p style="margin:8px 0 0;color:#888888;font-size:11px;letter-spacing:2px;">
                LEAD NOU DIN WEBSITE
              </p>
            </div>

            <div style="padding:36px;">
              <p style="margin:0 0 10px;color:#777777;font-size:11px;font-weight:700;letter-spacing:1.5px;">
                CONTACT NOU
              </p>

              <h1 style="margin:0 0 30px;color:#111111;font-size:30px;">
                ${body.name || "Nume nespecificat"}
              </h1>

              <div style="padding:24px;background:#f5f5f5;border:1px solid #dddddd;">
                <p style="margin:0 0 14px;color:#111111;">
                  <strong>Email:</strong>
                  <a href="mailto:${body.email}" style="color:#111111;">
                    ${body.email || "Nespecificat"}
                  </a>
                </p>

                <p style="margin:0 0 14px;color:#111111;">
                  <strong>Telefon:</strong>
                  <a href="tel:${body.phone}" style="color:#111111;">
                    ${body.phone || "Nespecificat"}
                  </a>
                </p>

                <p style="margin:0 0 14px;color:#111111;">
                  <strong>Companie:</strong>
                  ${body.company || "Nespecificat"}
                </p>

                <p style="margin:0;color:#111111;">
                  <strong>Website / Instagram:</strong>
                  ${
                    profileUrl
                      ? `<a href="${profileUrl}" style="color:#111111;">${body.instagram}</a>`
                      : "Nespecificat"
                  }
                </p>
              </div>

              <div style="margin-top:24px;padding:24px;background:#111111;color:#ffffff;">
                <p style="margin:0 0 14px;">
                  <strong>Business:</strong>
                  ${body.business || "Nespecificat"}
                </p>

                <p style="margin:0 0 14px;">
                  <strong>Problemă:</strong>
                  ${body.problem || "Nespecificat"}
                </p>

                <p style="margin:0 0 14px;">
                  <strong>Volum:</strong>
                  ${body.volume || "Nespecificat"}
                </p>

                <p style="margin:0;">
                  <strong>Folosește AI:</strong>
                  ${body.ai || "Nespecificat"}
                </p>
              </div>

              ${
                body.attribution
                  ? `<div style="margin-top:24px;padding:20px 24px;background:#f5f5f5;border:1px solid #dddddd;">
                      <p style="margin:0 0 8px;color:#777777;font-size:11px;font-weight:700;letter-spacing:1.5px;">SURSĂ</p>
                      <p style="margin:0;color:#111111;font-size:13px;">
                        ${[
                          body.attribution.wizardSource && `Formular: ${body.attribution.wizardSource}`,
                          body.attribution.utm_source && `utm_source: ${body.attribution.utm_source}`,
                          body.attribution.utm_medium && `utm_medium: ${body.attribution.utm_medium}`,
                          body.attribution.utm_campaign && `utm_campaign: ${body.attribution.utm_campaign}`,
                          body.attribution.referrer && `Referrer: ${body.attribution.referrer}`,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "Direct"}
                      </p>
                    </div>`
                  : ""
              }

              <div style="margin-top:28px;">
                <a
                  href="mailto:${body.email}"
                  style="display:inline-block;margin-right:10px;padding:14px 20px;background:#111111;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;"
                >
                  RĂSPUNDE LEADULUI
                </a>

                ${
                  profileUrl
                    ? `<a
                        href="${profileUrl}"
                        style="display:inline-block;margin-right:10px;padding:14px 20px;background:#d9d9d9;color:#111111;text-decoration:none;font-size:13px;font-weight:700;"
                      >
                        ANALIZEAZĂ AFACEREA
                      </a>`
                    : ""
                }

                <a
                  href="https://rbxagency.com"
                  style="display:inline-block;padding:14px 20px;background:#eeeeee;color:#111111;text-decoration:none;font-size:13px;font-weight:700;"
                >
                  DESCHIDE WEBSITE-UL
                </a>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    // Failure-safety: the internal notification and the visitor's
    // confirmation are independent. If Resend fails on one, we still attempt
    // the other, so a single provider hiccup never silently drops the lead
    // AND leaves the visitor with no confirmation. There is currently no
    // CRM or database behind this route — see README / final report — so
    // this internal email IS the lead record today; a failure here is
    // logged (never surfaced to the visitor as a stack trace) so it can be
    // caught in Vercel/Resend logs rather than only in the browser console.
    if (internalEmail.error) {
      console.error("Internal email error (lead may not have reached Bogdan):", internalEmail.error);
    }

    let confirmationEmail: Awaited<ReturnType<typeof resend.emails.send>> | null = null;
    try {
      confirmationEmail = await resend.emails.send({
        from: "RBX.AI <contact@rbxagency.com>",
        to: body.email,
        subject: "Am primit solicitarea ta — RBX.AI",
        html: confirmationHtml,
      });
      if (confirmationEmail.error) {
        console.error("Confirmation email error:", confirmationEmail.error);
      }
    } catch (confirmErr) {
      console.error("Confirmation email threw:", confirmErr);
    }

    if (internalEmail.error) {
      // The visitor-facing error stays generic — no internal details, no
      // stack trace — while the real cause is already in the server logs.
      return Response.json({ error: "A apărut o eroare temporară. Încearcă din nou." }, { status: 500 });
    }

    return Response.json({
      success: true,
      internalEmailId: internalEmail.data?.id,
      confirmationEmailId: confirmationEmail?.data?.id,
    });
  } catch (error) {
    console.error("Lead API error:", error);
    return Response.json(
      { error: "A apărut o eroare temporară. Încearcă din nou." },
      { status: 500 }
    );
  }
}
