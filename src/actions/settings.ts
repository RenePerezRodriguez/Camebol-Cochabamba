"use server";

import { adminDb } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function getMaintenanceMode(): Promise<boolean> {
    try {
        const doc = await adminDb.collection("settings").doc("general").get();
        return doc.exists ? doc.data()?.maintenanceMode || false : false;
    } catch (error) {
        console.error("Error fetching maintenance mode:", error);
        return false;
    }
}

export async function toggleMaintenanceMode(currentState: boolean) {
    await requireAdmin();
    try {
        const newState = !currentState;
        await adminDb.collection("settings").doc("general").set({
            maintenanceMode: newState,
            updatedAt: new Date()
        }, { merge: true });

        await logActivity({
            action: "update",
            resource: "system",
            details: `Maintenance mode ${newState ? "ENABLED" : "DISABLED"}`,
            userEmail: "admin"
        });

        revalidatePath("/");
        return { success: true, state: newState };
    } catch (error) {
        console.error("Error toggling maintenance mode:", error);
        return { error: "Failed to update settings" };
    }
}
