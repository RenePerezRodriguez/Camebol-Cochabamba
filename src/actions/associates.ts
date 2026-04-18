"use server";

import { adminDb } from "@/lib/firebase-admin";
import { associateSchema, AssociateFormData, Associate } from "@/lib/schemas/associate";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function createAssociate(data: AssociateFormData) {
    const { email: adminEmail } = await requireAdmin();
    const result = associateSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        const docRef = await adminDb.collection("associates").add({
            ...result.data,
            createdAt: new Date(),
        });

        await logActivity({
            action: "create",
            resource: "company", // Using 'company' for associates to match AuditResource
            details: `Created associate: ${result.data.name}`,
            userEmail: "admin",
            resourceId: docRef.id
        });

        revalidatePath("/admin/asociadas");
        return { success: true, id: docRef.id };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function updateAssociate(id: string, data: AssociateFormData) {
    await requireAdmin();
    const result = associateSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        await adminDb.collection("associates").doc(id).update({
            ...result.data,
            updatedAt: new Date(),
        });

        await logActivity({
            action: "update",
            resource: "company",
            details: `Updated associate: ${result.data.name}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/asociadas");
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function deleteAssociate(id: string) {
    await requireAdmin();
    try {
        await adminDb.collection("associates").doc(id).delete();

        await logActivity({
            action: "delete",
            resource: "company",
            details: `Deleted associate ID: ${id}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/asociadas");
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function getAssociates(): Promise<Associate[]> {
    try {
        const snapshot = await adminDb.collection("associates").orderBy("name").get();
        const sectorsSnapshot = await adminDb.collection("sectors").get();
        const sectorsMap = new Map();
        sectorsSnapshot.forEach(doc => {
            sectorsMap.set(doc.id, doc.data().name);
        });

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                slug: data.slug,
                sectorId: data.sectorId,
                sectorName: sectorsMap.get(data.sectorId) || "Sin Sector",
                description: data.description,
                discount: data.discount,
                logoUrl: data.logoUrl,
                website: data.website,
                facebook: data.facebook,
                whatsapp: data.whatsapp,
                email: data.email,
                phone: data.phone,
                address: data.address,
                isActive: data.isActive,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            } as Associate;
        });
    } catch (error) {
        console.error("Error fetching associates:", error);
        return [];
    }
}
export async function getPublicAssociates(): Promise<Associate[]> {
    try {
        const snapshot = await adminDb.collection("associates")
            .where("isActive", "==", true)
            .orderBy("name")
            .get();

        const sectorsSnapshot = await adminDb.collection("sectors").get();
        const sectorsMap = new Map();
        sectorsSnapshot.forEach(doc => {
            sectorsMap.set(doc.id, doc.data().name);
        });

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                slug: data.slug,
                sectorId: data.sectorId,
                sectorName: sectorsMap.get(data.sectorId) || "Sin Sector",
                description: data.description,
                discount: data.discount,
                logoUrl: data.logoUrl,
                website: data.website,
                facebook: data.facebook,
                whatsapp: data.whatsapp,
                email: data.email,
                phone: data.phone,
                address: data.address,
                isActive: data.isActive,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            } as Associate;
        });
    } catch (error) {
        console.error("Error fetching public associates:", error);
        return [];
    }
}
export async function getAssociateBySlug(slug: string): Promise<Associate | null> {
    try {
        const snapshot = await adminDb.collection("associates")
            .where("slug", "==", slug)
            .limit(1)
            .get();

        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];
        const data = doc.data();

        const sectorsSnapshot = await adminDb.collection("sectors").get();
        const sectorsMap = new Map();
        sectorsSnapshot.forEach(doc => {
            sectorsMap.set(doc.id, doc.data().name);
        });

        return {
            id: doc.id,
            name: data.name,
            slug: data.slug,
            sectorId: data.sectorId,
            sectorName: sectorsMap.get(data.sectorId) || "Sin Sector",
            description: data.description,
            discount: data.discount,
            logoUrl: data.logoUrl,
            website: data.website,
            facebook: data.facebook,
            whatsapp: data.whatsapp,
            email: data.email,
            phone: data.phone,
            address: data.address,
            isActive: data.isActive,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        } as Associate;
    } catch (error) {
        console.error("Error fetching associate by slug:", error);
        return null;
    }
}
export async function getAssociatesBySector(sectorId: string): Promise<Associate[]> {
    try {
        const snapshot = await adminDb.collection("associates")
            .where("isActive", "==", true)
            .where("sectorId", "==", sectorId)
            .orderBy("name")
            .get();

        // We know the sector name since we query by ID, but for completeness let's fetch it or pass it.
        // Optimization: We could pass the sector name as argument to avoid fetching simplified.
        // But to be safe and consistent with Associate type, let's fetch map or single sector.
        const sectorDoc = await adminDb.collection("sectors").doc(sectorId).get();
        const sectorName = sectorDoc.exists ? sectorDoc.data()?.name : "Sin Sector";

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                slug: data.slug,
                sectorId: data.sectorId,
                sectorName: sectorName,
                description: data.description,
                discount: data.discount,
                logoUrl: data.logoUrl,
                website: data.website,
                facebook: data.facebook,
                whatsapp: data.whatsapp,
                email: data.email,
                phone: data.phone,
                address: data.address,
                isActive: data.isActive,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            } as Associate;
        });
    } catch (error) {
        console.error("Error fetching associates by sector:", error);
        return [];
    }
}
