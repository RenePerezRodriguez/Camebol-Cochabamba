'use server';

import { adminDb } from '@/lib/firebase-admin';
import { sendEmail } from '@/lib/email';
import { afiliateFormSchema, type AfiliateFormValues } from '@/lib/schemas/afiliate-schema';

export async function handleFormSubmission(values: AfiliateFormValues) {
  try {
    const parsedValues = afiliateFormSchema.safeParse(values);

    if (!parsedValues.success) {
      console.error(parsedValues.error.flatten().fieldErrors);
      return { success: false, message: 'Datos inválidos. Por favor revisa el formulario.' };
    }

    if (!parsedValues.data.signature) {
      return { success: false, message: 'La firma es requerida para completar el registro.' };
    }

    // Save to Firestore
    await adminDb.collection("forms_affiliate").add({
      // Business Data
      empresa: parsedValues.data.empresa,
      representante: parsedValues.data.representante,
      cargo: parsedValues.data.cargo,
      rubro: parsedValues.data.rubro,
      nit: parsedValues.data.nit,
      matricula: parsedValues.data.matricula,
      direccionEmpresarial: parsedValues.data.direccionEmpresarial,
      telefonoFijoEmpresarial: parsedValues.data.telefonoFijoEmpresarial || null,
      emailEmpresarial: parsedValues.data.emailEmpresarial,
      celularEmpresarial: parsedValues.data.celularEmpresarial,

      // Commercial Info
      fechaInicioActividades: parsedValues.data.fechaInicioActividades,
      actividadPrincipal: parsedValues.data.actividadPrincipal,
      tipoEmpresa: parsedValues.data.tipoEmpresa,
      importa: parsedValues.data.importa,
      exporta: parsedValues.data.exporta,
      detalleActividades: parsedValues.data.detalleActividades || null,

      // Personal Data
      nombreRepresentante: parsedValues.data.nombreRepresentante,
      lugarNacimiento: parsedValues.data.lugarNacimiento,
      fechaNacimiento: parsedValues.data.fechaNacimiento,
      ci: parsedValues.data.ci,
      estadoCivil: parsedValues.data.estadoCivil,
      profesion: parsedValues.data.profesion,
      telefonoFijoPersonal: parsedValues.data.telefonoFijoPersonal || null,
      celularPersonal: parsedValues.data.celularPersonal,
      emailPersonal: parsedValues.data.emailPersonal,
      domicilio: parsedValues.data.domicilio,

      // Commercial Contact
      nombreContactoComercial: parsedValues.data.nombreContactoComercial || null,
      cargoContactoComercial: parsedValues.data.cargoContactoComercial || null,
      telefonoContactoComercial: parsedValues.data.telefonoContactoComercial || null,
      celularContactoComercial: parsedValues.data.celularContactoComercial || null,
      emailContactoComercial: parsedValues.data.emailContactoComercial || null,

      // Photo, Signature & Status
      fotoUrl: parsedValues.data.fotoUrl || null,
      signature: parsedValues.data.signature,
      status: 'pending',
      createdAt: new Date(),
    });

    // Enviar notificación por email
    const d = parsedValues.data;
    const notificationEmail = process.env.NOTIFICATION_EMAIL!;
    await sendEmail({
      to: notificationEmail,
      subject: `🏢 Nueva solicitud de afiliación: ${d.empresa}`,
      replyTo: d.emailEmpresarial,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0f172a;color:white;padding:24px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;font-size:20px;">Nueva Solicitud de Afiliación</h2>
            <p style="margin:4px 0 0;opacity:0.7;font-size:14px;">camebolcochabamba.com</p>
          </div>
          <div style="background:#ffffff;padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
            <h3 style="color:#C2185B;margin:0 0 12px;font-size:16px;">Datos de la Empresa</h3>
            <table style="width:100%;font-size:14px;border-collapse:collapse;">
              <tr><td style="padding:6px 0;color:#64748b;width:160px;">Empresa</td><td style="padding:6px 0;font-weight:600;">${d.empresa}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Representante</td><td style="padding:6px 0;">${d.representante}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Cargo</td><td style="padding:6px 0;">${d.cargo}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Rubro</td><td style="padding:6px 0;">${d.rubro}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">NIT</td><td style="padding:6px 0;">${d.nit}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Email empresarial</td><td style="padding:6px 0;"><a href="mailto:${d.emailEmpresarial}" style="color:#C2185B;">${d.emailEmpresarial}</a></td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Celular</td><td style="padding:6px 0;">${d.celularEmpresarial}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Actividad principal</td><td style="padding:6px 0;">${d.actividadPrincipal}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Tipo empresa</td><td style="padding:6px 0;">${d.tipoEmpresa}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
            <h3 style="color:#C2185B;margin:0 0 12px;font-size:16px;">Datos del Representante</h3>
            <table style="width:100%;font-size:14px;border-collapse:collapse;">
              <tr><td style="padding:6px 0;color:#64748b;width:160px;">Nombre</td><td style="padding:6px 0;">${d.nombreRepresentante}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">CI</td><td style="padding:6px 0;">${d.ci}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Profesión</td><td style="padding:6px 0;">${d.profesion}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Email personal</td><td style="padding:6px 0;"><a href="mailto:${d.emailPersonal}" style="color:#C2185B;">${d.emailPersonal}</a></td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Celular personal</td><td style="padding:6px 0;">${d.celularPersonal}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">Revise esta solicitud en el <a href="https://camebolcochabamba.com/admin/afiliaciones" style="color:#C2185B;">panel de administración</a>. Puede responder directamente a este correo para contactar al solicitante.</p>
          </div>
        </div>
      `,
    }).catch((err) => console.error("[Afiliación] Error enviando email:", err));

    return { success: true };
  } catch (error) {
    console.error("Error saving affiliation:", error);
    return { success: false, message: 'Ocurrió un error en el servidor.' };
  }
}
