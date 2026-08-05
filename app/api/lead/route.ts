

import { Resend } from "resend";
import { render } from "@react-email/render";
import ConfirmationEmail from "@/emails/ConfirmationEmail";



const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const confirmationHtml = await render(
  ConfirmationEmail({ name: body.name })
);

    const data = await resend.emails.send({
      from: "RBX.AI <contact@rbxagency.com>",
      to: "bogdyrus9@gmail.com",
      replyTo: body.email,
      subject: `Lead nou de la ${body.name}`,
      html: `
        <h2>Lead nou RBX.AI</h2>

        <p><b>Nume:</b> ${body.name}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Telefon:</b> ${body.phone}</p>
        <p><b>Companie:</b> ${body.company}</p>

        <hr>

        <p><b>Business:</b> ${body.business}</p>
        <p><b>Problema:</b> ${body.problem}</p>
        <p><b>Volum:</b> ${body.volume}</p>
        <p><b>Folosește AI:</b> ${body.ai}</p>
      `,
    });
await resend.emails.send({
  from: "RBX.AI <contact@rbxagency.com>",
  to: body.email,
  subject: "Am primit solicitarea ta - RBX.AI",
  html: confirmationHtml,
});
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Email failed" }, { status: 500 });
  }
}
