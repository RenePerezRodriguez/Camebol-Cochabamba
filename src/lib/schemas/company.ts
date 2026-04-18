import { z } from "zod";

export const companySchema = z.object({
    name: z.string().min(2, "El nombre es requerido"),
    slug: z.string().min(2, "El slug es requerido"),
    sector: z.string().min(2, "El sector es requerido"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    longDescription: z.string().optional(),
    logoUrl: z.string().url().optional().or(z.literal('')),
    coverImageUrl: z.string().url().optional().or(z.literal('')),
    website: z.string().url("Debe ser una URL válida").optional().or(z.literal('')),
    email: z.string().email("Email inválido").optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    foundedYear: z.string().optional(),
    representative: z.string().optional(),
    socialMedia: z.object({
        facebook: z.string().url().optional().or(z.literal('')),
        instagram: z.string().url().optional().or(z.literal('')),
        linkedin: z.string().url().optional().or(z.literal('')),
        twitter: z.string().url().optional().or(z.literal('')),
    }).optional(),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
});

export type CompanyFormData = z.infer<typeof companySchema>;
export type Company = CompanyFormData & { id: string };

// Common sectors for CAMEBOL
export const companySectors = [
    "Comercio",
    "Servicios",
    "Industria",
    "Gastronomía",
    "Moda y Textil",
    "Salud y Belleza",
    "Tecnología",
    "Educación",
    "Construcción",
    "Turismo",
    "Consultoría",
    "Finanzas",
    "Transporte",
    "Agroindustria",
    "Otros",
];
