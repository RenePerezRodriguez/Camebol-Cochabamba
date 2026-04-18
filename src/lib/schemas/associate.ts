import { z } from "zod";

export const associateSchema = z.object({
    name: z.string().min(3, "El nombre de la empresa es requerido"),
    slug: z.string().min(3, "El slug es requerido").optional(), // Auto-generated
    sectorId: z.string().min(1, "El sector es requerido"),
    description: z.string().nullable().optional(),
    discount: z.string().nullable().optional(),
    logoUrl: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
    facebook: z.string().nullable().optional(),
    whatsapp: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    latitude: z.string().nullable().optional(),
    longitude: z.string().nullable().optional(),
    isActive: z.boolean().default(true),
});

export type AssociateFormData = z.infer<typeof associateSchema>;

export type Associate = AssociateFormData & {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    sectorName?: string; // For display convenience
};
