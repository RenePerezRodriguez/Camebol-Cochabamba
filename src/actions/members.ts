"use server";

import { adminDb } from "@/lib/firebase-admin";
import { memberSchema, MemberFormData } from "@/lib/schemas/member";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function createMember(data: MemberFormData) {
    await requireAdmin();
    const result = memberSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        const docRef = await adminDb.collection("members").add({
            ...result.data,
            createdAt: new Date(),
        });

        await logActivity({
            action: "create",
            resource: "member",
            details: `Registered member: ${result.data.name}`,
            userEmail: "admin",
            resourceId: docRef.id
        });

        revalidatePath("/admin/directorio");
    } catch (error: any) {
        return { error: error.message };
    }

    redirect("/admin/directorio");
}

export async function deleteMember(id: string) {
    await requireAdmin();
    try {
        await adminDb.collection("members").doc(id).delete();

        await logActivity({
            action: "delete",
            resource: "member",
            details: `Deleted member ID: ${id}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/directorio");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting member:", error);
        return { error: error.message || "Error desconocido al eliminar" };
    }
}

export async function updateMember(id: string, data: MemberFormData) {
    await requireAdmin();
    const result = memberSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        await adminDb.collection("members").doc(id).update({
            ...result.data,
            updatedAt: new Date(),
        });

        await logActivity({
            action: "update",
            resource: "member",
            details: `Updated member: ${result.data.name}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/directorio");
    } catch (error: any) {
        return { error: error.message };
    }

    redirect("/admin/directorio");
}

export async function updateMemberOrder(id: string, order: number) {
    await requireAdmin();
    try {
        await adminDb.collection("members").doc(id).update({
            order: order,
            updatedAt: new Date(),
        });

        revalidatePath("/admin/directorio");
        return { success: true };
    } catch (error: any) {
        console.error("Error updating member order:", error);
        return { error: error.message };
    }
}

export interface PublicMember extends MemberFormData {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getPublicMembers(): Promise<PublicMember[]> {
    try {
        // Fetch members, ideally filtering by those who should be public if there's such a field (e.g., type='directiva' or 'equipo')
        // For 'Conoce a Nuestro Liderazgo', we likely want 'directiva' or 'directorio'.
        // Let's fetch all active members and let the UI decide how to group them if needed.

        const snapshot = await adminDb.collection("members")
            .where("isActive", "==", true)
            // .orderBy("order", "asc") // If 'order' is used. If not, maybe name.
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data() as MemberFormData & { createdAt?: any, updatedAt?: any };
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
                updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : null,
            };
        });
    } catch (error) {
        console.error("Error fetching public members:", error);
        return [];
    }
}
