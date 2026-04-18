import { z } from "zod";

export const bannerSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    content: z.string().min(1, "El contenido es requerido"),
    link: z.string().url("Debe ser una URL válida").optional().nullable().or(z.literal("")),
    isActive: z.boolean().default(true),
    startDate: z.coerce.date().optional().nullable(),
    endDate: z.coerce.date().optional().nullable(),
    type: z.enum(["info", "warning", "success", "promo"]).default("info"),
});

export type BannerFormData = z.infer<typeof bannerSchema>;
