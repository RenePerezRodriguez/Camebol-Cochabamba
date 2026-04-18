import { z } from "zod";

export const memberTypeEnum = z.enum(["directorio", "directiva", "equipo"]);

export const memberSchema = z.object({
    name: z.string().min(3, "El nombre es requerido"),
    role: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    type: memberTypeEnum.default("directorio"),
    bio: z.string().max(500, "La biografía no puede exceder 500 caracteres").nullable().optional(),
    imageUrl: z.string().min(1, "La foto es requerida"),
    linkedIn: z.string().nullable().optional().or(z.literal('')),
    email: z.string().nullable().optional().or(z.literal('')),
    isActive: z.boolean().default(true),
    order: z.number().default(0), // Required per user request (default 0)
});

export type MemberType = z.infer<typeof memberTypeEnum>;
export type MemberFormData = z.infer<typeof memberSchema>;
export type Member = MemberFormData & { id: string };

// Labels for display
export const memberTypeLabels: Record<MemberType, string> = {
    directorio: "Directorio",
    directiva: "Directiva",
    equipo: "Nuestro Equipo",
};
