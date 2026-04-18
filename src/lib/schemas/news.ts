import { z } from "zod";

export const newsSchema = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug debe ser válido (kebab-case)"),
    excerpt: z.string().min(10, "El resumen debe tener al menos 10 caracteres").max(200, "El resumen no debe exceder los 200 caracteres"),
    content: z.string().min(20, "El contenido de la noticia es requerido"),
    imageUrl: z.string().url("La imagen es requerida").optional().or(z.literal('')),
    imageAlt: z.string().optional(),
    category: z.string().min(1, "La categoría es requerida"),
    author: z.string().default("CAMEBOL Cochabamba"),
    publishedAt: z.string().datetime(),
    status: z.enum(["draft", "published"]).default("published"),
    isFeatured: z.boolean().default(false),

    // SEO Fields
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});

export type NewsFormData = z.infer<typeof newsSchema>;
export type News = NewsFormData & { id: string };
