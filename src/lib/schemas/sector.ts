import { z } from "zod";

export const sectorSchema = z.object({
    name: z.string().min(3, "El nombre del sector es requerido (mínimo 3 caracteres)"),
});

export type SectorFormData = z.infer<typeof sectorSchema>;
export type Sector = SectorFormData & { id: string; createdAt: Date };
