"use server";

import { adminDb } from "@/lib/firebase-admin";
import { eventSchema, EventFormData } from "@/lib/schemas/event";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function createEvent(data: EventFormData) {
    await requireAdmin();
    const result = eventSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const { title, slug, start, end, location, latitude, longitude, description, imageUrl, category, longDescription, imageAlt, metaTitle, metaDescription } = result.data;

    // Auto-generate SEO fields if not provided
    const finalMetaTitle = metaTitle?.trim() || `${title} | CAMEBOL Cochabamba`;
    const finalMetaDescription = metaDescription?.trim() || description.substring(0, 160);
    const finalImageAlt = imageAlt?.trim() || (imageUrl ? `${title} - Evento CAMEBOL Cochabamba` : null);

    try {
        const docRef = await adminDb.collection("events").add({
            title,
            slug,
            start: new Date(start),
            end: new Date(end),
            location,
            latitude: latitude || null,
            longitude: longitude || null,
            description,
            longDescription: longDescription || "",
            imageUrl: imageUrl || null,
            category,
            // SEO - auto-generated if empty
            imageAlt: finalImageAlt,
            metaTitle: finalMetaTitle,
            metaDescription: finalMetaDescription,
            createdAt: new Date(),
        });

        await logActivity({
            action: "create",
            resource: "event",
            details: `Created event: ${title}`,
            userEmail: "admin",
            resourceId: docRef.id
        });

        revalidatePath("/admin/eventos");
        revalidatePath("/eventos");
    } catch (error: any) {
        return { error: error.message };
    }

    redirect("/admin/eventos");
}

export async function deleteEvent(id: string) {
    await requireAdmin();
    try {
        await adminDb.collection("events").doc(id).delete();

        await logActivity({
            action: "delete",
            resource: "event",
            details: `Deleted event ID: ${id}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/eventos");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting event:", error);
        return { error: error.message || "Error desconocido al eliminar" };
    }
}

export async function updateEvent(id: string, data: EventFormData) {
    await requireAdmin();
    const result = eventSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const { title, slug, start, end, location, latitude, longitude, description, imageUrl, category, longDescription, imageAlt, metaTitle, metaDescription } = result.data;

    // Auto-generate SEO fields if not provided
    const finalMetaTitle = metaTitle?.trim() || `${title} | CAMEBOL Cochabamba`;
    const finalMetaDescription = metaDescription?.trim() || description.substring(0, 160);
    const finalImageAlt = imageAlt?.trim() || (imageUrl ? `${title} - Evento CAMEBOL Cochabamba` : null);

    try {
        await adminDb.collection("events").doc(id).update({
            title,
            slug,
            start: new Date(start),
            end: new Date(end),
            location,
            latitude: latitude || null,
            longitude: longitude || null,
            description,
            longDescription: longDescription || "",
            imageUrl: imageUrl || null,
            category,
            // SEO - auto-generated if empty
            imageAlt: finalImageAlt,
            metaTitle: finalMetaTitle,
            metaDescription: finalMetaDescription,
            updatedAt: new Date(),
        });

        await logActivity({
            action: "update",
            resource: "event",
            details: `Updated event: ${title}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/eventos");
    } catch (error: any) {
        return { error: error.message };
    }

    redirect("/admin/eventos");
}

export async function getUpcomingEvents() {
    try {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const snapshot = await adminDb.collection("events")
            .where("start", ">=", now)
            .orderBy("start", "asc")
            .limit(9)
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                slug: data.slug,
                start: data.start.toDate(),
                end: data.end.toDate(),
                location: data.location,
                description: data.description,
                imageUrl: data.imageUrl,
                category: data.category,
                // Add explicit image object structure to match existing component expectation if needed
                // or adapt component. The component expects: 
                // image: { imageUrl: string, imageHint: string } 
                // But our DB has flat imageUrl. We'll adapt in the component or transformer.
                image: data.imageUrl ? { imageUrl: data.imageUrl, imageHint: data.title } : null
            };
        });
    } catch (error) {
        console.error("Error fetching upcoming events:", error);
        return [];
    }
}

export async function getPublicEvents() {
    try {
        const snapshot = await adminDb.collection("events")
            .orderBy("start", "asc")
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                slug: data.slug,
                start: data.start.toDate(),
                end: data.end.toDate(),
                location: data.location,
                description: data.description,
                longDescription: data.longDescription || "",
                imageUrl: data.imageUrl,
                category: data.category,
                // Adapt to components expecting nested image object
                image: {
                    imageUrl: data.imageUrl || "/img/placeholder.jpg",
                    imageHint: data.imageAlt || data.title
                }
            };
        });
    } catch (error) {
        console.error("Error fetching public events:", error);
        return [];
    }
}

export async function getEventBySlug(slug: string) {
    try {
        const snapshot = await adminDb.collection("events")
            .where("slug", "==", slug)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        // Match the Event type structure from lib/data.ts
        return {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            start: data.start.toDate(),
            end: data.end.toDate(),
            location: data.location,
            description: data.description,
            longDescription: data.longDescription || data.description, // Fallback
            category: data.category,
            // Mocking ImagePlaceholder fields to satisfy strict types if needed
            image: {
                id: "dynamic-image",
                description: data.imageAlt || data.title,
                imageUrl: data.imageUrl || "/img/placeholder.jpg",
                imageHint: data.imageAlt || data.title
            }
        };
    } catch (error) {
        console.error(`Error fetching event with slug ${slug}:`, error);
        return null;
    }
}
