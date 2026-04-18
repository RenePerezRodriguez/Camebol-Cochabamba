import * as z from 'zod';

export const afiliateFormSchema = z.object({
    // Datos Empresariales
    empresa: z.string().min(2, 'El nombre de la empresa es requerido.'),
    representante: z.string().min(2, 'El nombre del representante es requerido.'),
    cargo: z.string().min(2, 'El cargo es requerido.'),
    rubro: z.string().min(2, 'El rubro es requerido.'),
    nit: z.string().min(5, 'El NIT es requerido.'),
    matricula: z.string().min(1, 'La matrícula es requerida.'),
    direccionEmpresarial: z.string().min(5, 'La dirección es requerida.'),
    telefonoFijoEmpresarial: z.string().optional(),
    emailEmpresarial: z.string().email('Correo electrónico empresarial inválido.'),
    celularEmpresarial: z.string().min(7, 'El celular empresarial es requerido.'),

    // Información Comercial
    fechaInicioActividades: z.string().min(1, 'La fecha es requerida.').regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido. Usa DD/MM/AAAA'),
    actividadPrincipal: z.string().min(5, 'La actividad principal es requerida.'),
    tipoEmpresa: z.enum(['comercial', 'industrial', 'servicios', 'otros'], {
        required_error: "Debes seleccionar un tipo de empresa."
    }),
    importa: z.boolean().default(false),
    exporta: z.boolean().default(false),
    detalleActividades: z.string().optional(),

    // Datos Personales
    nombreRepresentante: z.string().min(2, 'El nombre de la representante es requerido.'),
    lugarNacimiento: z.string().min(2, 'El lugar de nacimiento es requerido.'),
    fechaNacimiento: z.string().min(1, 'La fecha de nacimiento es requerida.').regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido. Usa DD/MM/AAAA'),
    ci: z.string().min(5, 'El carnet de identidad es requerido.'),
    estadoCivil: z.string().min(2, 'El estado civil es requerido.'),
    profesion: z.string().min(2, 'La profesión es requerida.'),
    telefonoFijoPersonal: z.string().optional(),
    celularPersonal: z.string().min(7, 'El celular personal es requerido.'),
    emailPersonal: z.string().email('Correo electrónico personal inválido.'),
    domicilio: z.string().min(5, 'El domicilio es requerido.'),

    // Datos de Contacto Comercial
    nombreContactoComercial: z.string().optional(),
    cargoContactoComercial: z.string().optional(),
    telefonoContactoComercial: z.string().optional(),
    celularContactoComercial: z.string().optional(),
    emailContactoComercial: z.string().email('Correo electrónico de contacto inválido.').optional().or(z.literal('')),

    // Foto y Firma
    fotoUrl: z.string().optional(),
    signature: z.string().optional(),
});

export type AfiliateFormValues = z.infer<typeof afiliateFormSchema>;
