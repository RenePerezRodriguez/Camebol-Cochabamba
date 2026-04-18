"use server";

import { adminDb } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function updateAffiliationStatus(id: string, status: "approved" | "rejected" | "pending") {
    await requireAdmin();

    const validStatuses = ["approved", "rejected", "pending"];
    if (!validStatuses.includes(status)) {
        return { error: "Estado inválido" };
    }

    try {
        const docRef = adminDb.collection("forms_affiliate").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return { error: "Solicitud no encontrada" };
        }

        await docRef.update({
            status,
            updatedAt: new Date(),
        });

        await logActivity({
            action: "update",
            resource: "affiliation",
            details: `Status changed to ${status} for: ${doc.data()?.empresa || id}`,
            userEmail: "admin",
            resourceId: id,
        });

        revalidatePath("/admin/afiliaciones");
        revalidatePath(`/admin/afiliaciones/${id}`);
        revalidatePath("/admin");

        return { success: true };
    } catch (error) {
        console.error("Error updating affiliation status:", error);
        return { error: "Error al actualizar el estado" };
    }
}
