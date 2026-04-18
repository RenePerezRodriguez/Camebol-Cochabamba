'use server';

import { adminDb } from '@/lib/firebase-admin';
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

    return { success: true };
  } catch (error) {
    console.error("Error saving affiliation:", error);
    return { success: false, message: 'Ocurrió un error en el servidor.' };
  }
}
