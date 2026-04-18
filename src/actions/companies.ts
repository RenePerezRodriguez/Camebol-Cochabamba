"use server";

import { adminDb } from "@/lib/firebase-admin";
import { companySchema, CompanyFormData } from "@/lib/schemas/company";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function createCompany(data: CompanyFormData) {
    await requireAdmin();
    const result = companySchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        // Generate slug if not provided
        const slug = result.data.slug || result.data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const docRef = await adminDb.collection("companies").add({
            ...result.data,
            slug,
            createdAt: new Date(),
        });

        await logActivity({
            action: "create",
            resource: "company",
            details: `Registered company: ${result.data.name}`,
            userEmail: "admin",
            resourceId: docRef.id
        });

        revalidatePath("/admin/asociadas");
        revalidatePath("/asociadas");
    } catch (error: any) {
        return { error: error.message };
    }

    redirect("/admin/asociadas");
}

export async function deleteCompany(id: string) {
    await requireAdmin();
    try {
        await adminDb.collection("companies").doc(id).delete();

        await logActivity({
            action: "delete",
            resource: "company",
            details: `Deleted company ID: ${id}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/asociadas");
        revalidatePath("/asociadas");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting company:", error);
        return { error: error.message || "Error desconocido al eliminar" };
    }
}

export async function updateCompany(id: string, data: CompanyFormData) {
    await requireAdmin();
    const result = companySchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    try {
        await adminDb.collection("companies").doc(id).update({
            ...result.data,
            updatedAt: new Date(),
        });

        await logActivity({
            action: "update",
            resource: "company",
            details: `Updated company: ${result.data.name}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/asociadas");
        revalidatePath("/asociadas");
    } catch (error: any) {
        return { error: error.message };
    }

    redirect("/admin/asociadas");
}

export async function getPublicCompanies() {
    try {
        // Fetch all companies suitable for public display
        // You might want to filter by an 'isActive' or 'approved' status if your schema supports it.
        // For now, we fetch all.
        const snapshot = await adminDb.collection("companies")
            .orderBy("name", "asc") // Alphabetical order is usually best for directories
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // Ensure dates are converted to strings or Date objects properly if needed by Client Components
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
                updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : null,
            };
        });
    } catch (error) {
        console.error("Error fetching public companies:", error);
        return [];
    }
}
