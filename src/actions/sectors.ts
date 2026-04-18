"use server";

import { adminDb } from "@/lib/firebase-admin";
import { sectorSchema, SectorFormData, Sector } from "@/lib/schemas/sector";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function createSector(data: SectorFormData) {
    await requireAdmin();
    const result = sectorSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        // Check for duplicates
        const snapshot = await adminDb.collection("sectors")
            .where("name", "==", result.data.name)
            .get();

        if (!snapshot.empty) {
            return { error: "Ya existe un sector con este nombre." };
        }

        const docRef = await adminDb.collection("sectors").add({
            ...result.data,
            createdAt: new Date(),
        });

        await logActivity({
            action: "create",
            resource: "sector",
            details: `Created sector: ${result.data.name}`,
            userEmail: "admin",
            resourceId: docRef.id
        });

        revalidatePath("/admin/sectores");
        return { success: true, id: docRef.id };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function updateSector(id: string, data: SectorFormData) {
    await requireAdmin();
    const result = sectorSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        await adminDb.collection("sectors").doc(id).update({
            ...result.data,
            // updatedAt: new Date(), // If we want to track updates
        });

        await logActivity({
            action: "update",
            resource: "sector",
            details: `Updated sector: ${result.data.name}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/sectores");
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getSectors(): Promise<Sector[]> {
    try {
        const snapshot = await adminDb.collection("sectors").orderBy("name").get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            };
        });
    } catch (error) {
        console.error("Error fetching sectors:", error);
        return [];
    }
}

export async function deleteSector(id: string) {
    await requireAdmin();
    try {
        await adminDb.collection("sectors").doc(id).delete();

        await logActivity({
            action: "delete",
            resource: "sector",
            details: `Deleted sector ID: ${id}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/sectores");
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}
