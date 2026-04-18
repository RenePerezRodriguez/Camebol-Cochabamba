"use server";

import { z } from "zod";
import { adminDb } from "@/lib/firebase-admin";
import { sendEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
});

export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Datos inválidos" };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    // Guardar en Firestore
    await adminDb.collection("contact_messages").add({
      name,
      email,
      subject,
      message,
      status: "unread",
      createdAt: new Date(),
    });

    // Notificar por email a info@
    const notificationEmail = process.env.NOTIFICATION_EMAIL!;
    await sendEmail({
      to: notificationEmail,
      subject: `📩 Nuevo mensaje de contacto: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0f172a;color:white;padding:24px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;font-size:20px;">Nuevo Mensaje de Contacto</h2>
            <p style="margin:4px 0 0;opacity:0.7;font-size:14px;">camebolcochabamba.com</p>
          </div>
          <div style="background:#ffffff;padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
            <table style="width:100%;font-size:14px;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#64748b;width:100px;">Nombre</td>
                <td style="padding:8px 0;font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Email</td>
                <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#C2185B;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#64748b;">Asunto</td>
                <td style="padding:8px 0;font-weight:600;">${subject}</td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
            <p style="font-size:14px;color:#334155;line-height:1.6;white-space:pre-wrap;">${message}</p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">Puede responder directamente a este correo para contestar al remitente.</p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("[Contacto] Error:", error);
    return { success: false, error: "Error al enviar el mensaje" };
  }
}
