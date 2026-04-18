"use server";

import { adminDb } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function updateMessageStatus(id: string, status: "read" | "unread") {
    await requireAdmin();

    try {
        const docRef = adminDb.collection("contact_messages").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) return { error: "Mensaje no encontrado" };

        await docRef.update({ status, updatedAt: new Date() });
        revalidatePath("/admin/mensajes");
        return { success: true };
    } catch (error) {
        console.error("Error updating message status:", error);
        return { error: "Error al actualizar el mensaje" };
    }
}

export async function deleteMessage(id: string) {
    await requireAdmin();

    try {
        const docRef = adminDb.collection("contact_messages").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) return { error: "Mensaje no encontrado" };

        const subject = doc.data()?.subject || id;
        await docRef.delete();

        await logActivity({
            action: "delete",
            resource: "contact_message",
            details: `Deleted contact message: ${subject}`,
            userEmail: "admin",
            resourceId: id,
        });

        revalidatePath("/admin/mensajes");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Error deleting message:", error);
        return { error: "Error al eliminar el mensaje" };
    }
}
