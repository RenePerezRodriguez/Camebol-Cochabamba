import { z } from "zod";

export const eventSchema = z.object({
    title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug debe ser válido (kebab-case)"),
    start: z.string().datetime(), // ISO string from date picker
    end: z.string().datetime(),
    location: z.string().min(5, "La ubicación es requerida"),
    // Coordinates for map display
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    description: z.string().min(10, "La descripción breve es requerida"),
    longDescription: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal('')),
    category: z.string().min(1, "La categoría es requerida"),

    // SEO Fields
    imageAlt: z.string().optional().describe("Texto alternativo para la imagen (SEO)"),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});

export type EventFormData = z.infer<typeof eventSchema>;
export type Event = EventFormData & { id: string };
