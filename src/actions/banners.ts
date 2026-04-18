"use server";

import { adminDb } from "@/lib/firebase-admin";
import { bannerSchema, BannerFormData } from "@/lib/schemas/banner";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

// Helper type for Firestore data
type FirestoreBanner = BannerFormData & {
    id: string;
    createdAt?: any;
    updatedAt?: any;
};

export async function createBanner(data: BannerFormData) {
    await requireAdmin();
    const result = bannerSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        const docRef = await adminDb.collection("banners").add({
            ...result.data,
            startDate: result.data.startDate ? new Date(result.data.startDate) : null,
            endDate: result.data.endDate ? new Date(result.data.endDate) : null,
            createdAt: new Date(),
        });

        await logActivity({
            action: "create",
            resource: "system",
            details: `Created banner: ${result.data.title}`,
            userEmail: "admin",
            resourceId: docRef.id
        });

        revalidatePath("/admin/banners");
        revalidatePath("/");
    } catch (error: any) {
        return { error: error.message };
    }

    redirect("/admin/banners");
}

export async function deleteBanner(id: string) {
    await requireAdmin();
    try {
        await adminDb.collection("banners").doc(id).delete();

        await logActivity({
            action: "delete",
            resource: "system",
            details: `Deleted banner ID: ${id}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/banners");
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting banner:", error);
        return { error: error.message || "Error desconocido al eliminar" };
    }
}

export async function updateBanner(id: string, data: BannerFormData) {
    await requireAdmin();
    const result = bannerSchema.safeParse(data);
    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        await adminDb.collection("banners").doc(id).update({
            ...result.data,
            startDate: result.data.startDate ? new Date(result.data.startDate) : null,
            endDate: result.data.endDate ? new Date(result.data.endDate) : null,
            updatedAt: new Date(),
        });

        await logActivity({
            action: "update",
            resource: "system",
            details: `Updated banner: ${result.data.title}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/banners");
        revalidatePath("/");
    } catch (error: any) {
        return { error: error.message };
    }

    redirect("/admin/banners");
}

export async function getActiveBanners() {
    try {
        const now = new Date();
        const snapshot = await adminDb.collection("banners")
            .where("isActive", "==", true)
            .get();

        const banners = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as FirestoreBanner[];

        // Filter by date manually
        return banners.filter(b => {
            // Handle Firestore Timestamps or JS Date objects safely
            const startRaw = b.startDate as any;
            const endRaw = b.endDate as any;

            const start = startRaw ? (startRaw.toDate ? startRaw.toDate() : new Date(startRaw)) : null;
            const end = endRaw ? (endRaw.toDate ? endRaw.toDate() : new Date(endRaw)) : null;

            if (start && start > now) return false;
            if (end && end < now) return false;

            return true;
        });

    } catch (error) {
        console.error("Error getting public banners:", error);
        return [];
    }
}
