import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug debe ser válido (kebab-case)"),
    type: z.enum(["news", "event"]),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
export type Category = CategoryFormData & { id: string; createdAt: Date };
