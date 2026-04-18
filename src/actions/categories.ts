"use server";

import { adminDb } from "@/lib/firebase-admin";
import { categorySchema, CategoryFormData, Category } from "@/lib/schemas/category";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function createCategory(data: CategoryFormData) {
    await requireAdmin();
    const result = categorySchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        // Check for duplicates within the same type
        const snapshot = await adminDb.collection("categories")
            .where("type", "==", result.data.type)
            .where("name", "==", result.data.name)
            .get();

        if (!snapshot.empty) {
            return { error: `Ya existe una categoría de ${result.data.type === 'news' ? 'noticias' : 'eventos'} con este nombre.` };
        }

        const docRef = await adminDb.collection("categories").add({
            ...result.data,
            createdAt: new Date(),
        });

        await logActivity({
            action: "create",
            resource: "news", // Using news as generic for categories or add "category" to AuditResource
            details: `Created category (${result.data.type}): ${result.data.name}`,
            userEmail: "admin",
            resourceId: docRef.id
        });

        revalidatePath("/admin/noticias");
        revalidatePath("/admin/eventos");
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Error creating category:", error);
        return { error: error.message };
    }
}

export async function updateCategory(id: string, data: CategoryFormData) {
    await requireAdmin();
    const result = categorySchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        await adminDb.collection("categories").doc(id).update({
            ...result.data,
            updatedAt: new Date(),
        });

        await logActivity({
            action: "update",
            resource: "news",
            details: `Updated category: ${result.data.name}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/noticias");
        revalidatePath("/admin/eventos");
        return { success: true };
    } catch (error: any) {
        console.error("Error updating category:", error);
        return { error: error.message };
    }
}

export async function deleteCategory(id: string) {
    await requireAdmin();
    try {
        await adminDb.collection("categories").doc(id).delete();

        await logActivity({
            action: "delete",
            resource: "news",
            details: `Deleted category ID: ${id}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/noticias");
        revalidatePath("/admin/eventos");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting category:", error);
        return { error: error.message };
    }
}

export async function getCategories(type: "news" | "event"): Promise<Category[]> {
    try {
        const snapshot = await adminDb.collection("categories")
            .where("type", "==", type)
            .orderBy("name", "asc")
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                slug: data.slug,
                type: data.type,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            } as Category;
        });
    } catch (error) {
        console.error(`Error fetching categories for ${type}:`, error);
        return [];
    }
}
