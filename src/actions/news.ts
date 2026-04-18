"use server";

import { adminDb, adminStorage } from "@/lib/firebase-admin";
import { newsSchema, NewsFormData, News } from "@/lib/schemas/news";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/logger";
import { requireAdmin } from "@/lib/session";

export async function createNews(data: NewsFormData) {
    await requireAdmin();
    const result = newsSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const { 
        title, 
        slug, 
        excerpt, 
        content, 
        imageUrl, 
        imageAlt, 
        category, 
        author, 
        publishedAt, 
        status, 
        isFeatured,
        metaTitle,
        metaDescription 
    } = result.data;

    // Auto-generate SEO fields if not provided
    const finalMetaTitle = metaTitle?.trim() || `${title} | Noticias CAMEBOL`;
    const finalMetaDescription = metaDescription?.trim() || excerpt.substring(0, 160);
    const finalImageAlt = imageAlt?.trim() || (imageUrl ? `${title} - CAMEBOL Cochabamba` : null);

    try {
        const docRef = await adminDb.collection("news").add({
            title,
            slug,
            excerpt,
            content,
            imageUrl: imageUrl || null,
            imageAlt: finalImageAlt,
            category,
            author: author || "CAMEBOL Cochabamba",
            publishedAt: new Date(publishedAt),
            status,
            isFeatured: isFeatured || false,
            metaTitle: finalMetaTitle,
            metaDescription: finalMetaDescription,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await logActivity({
            action: "create",
            resource: "news",
            details: `Created news: ${title}`,
            userEmail: "admin", // Ideally get from session
            resourceId: docRef.id
        });

        revalidatePath("/admin/noticias");
        revalidatePath("/noticias");
        revalidatePath("/");
    } catch (error: any) {
        console.error("Error creating news:", error);
        return { error: error.message };
    }

    redirect("/admin/noticias");
}

export async function updateNews(id: string, data: NewsFormData) {
    await requireAdmin();
    const result = newsSchema.safeParse(data);

    if (!result.success) {
        return { error: result.error.flatten() };
    }

    const { 
        title, 
        slug, 
        excerpt, 
        content, 
        imageUrl, 
        imageAlt, 
        category, 
        author, 
        publishedAt, 
        status, 
        isFeatured,
        metaTitle,
        metaDescription 
    } = result.data;

    const finalMetaTitle = metaTitle?.trim() || `${title} | Noticias CAMEBOL`;
    const finalMetaDescription = metaDescription?.trim() || excerpt.substring(0, 160);
    const finalImageAlt = imageAlt?.trim() || (imageUrl ? `${title} - CAMEBOL Cochabamba` : null);

    try {
        await adminDb.collection("news").doc(id).update({
            title,
            slug,
            excerpt,
            content,
            imageUrl: imageUrl || null,
            imageAlt: finalImageAlt,
            category,
            author,
            publishedAt: new Date(publishedAt),
            status,
            isFeatured,
            metaTitle: finalMetaTitle,
            metaDescription: finalMetaDescription,
            updatedAt: new Date(),
        });

        await logActivity({
            action: "update",
            resource: "news",
            details: `Updated news: ${title}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/noticias");
        revalidatePath("/noticias");
        revalidatePath(`/noticias/${slug}`);
        revalidatePath("/");
    } catch (error: any) {
        console.error("Error updating news:", error);
        return { error: error.message };
    }

    redirect("/admin/noticias");
}

export async function deleteNews(id: string) {
    await requireAdmin();
    try {
        const doc = await adminDb.collection("news").doc(id).get();
        if (!doc.exists) return { error: "Noticia no encontrada" };

        const data = doc.data();
        if (data) {
            const imagesToDelete: string[] = [];
            
            // 1. Imagen principal
            if (data.imageUrl) imagesToDelete.push(data.imageUrl);

            // 2. Imágenes en el contenido (HTML)
            const imgRegex = /<img[^>]+src="([^">]+)"/g;
            let match;
            while ((match = imgRegex.exec(data.content || "")) !== null) {
                imagesToDelete.push(match[1]);
            }

            // 3. Ejecutar borrado en Storage
            if (adminStorage && imagesToDelete.length > 0) {
                const bucket = adminStorage.bucket();
                for (const url of imagesToDelete) {
                    // Solo intentar borrar si es una URL de Firebase Storage de este proyecto
                    if (url.includes("firebasestorage.googleapis.com")) {
                        try {
                            const decodedUrl = decodeURIComponent(url);
                            const pathPart = decodedUrl.split("/o/")[1]?.split("?")[0];
                            if (pathPart) {
                                await bucket.file(pathPart).delete();
                            }
                        } catch (e) {
                            console.error(`Error eliminando archivo de storage: ${url}`, e);
                        }
                    }
                }
            }
        }

        await adminDb.collection("news").doc(id).delete();

        await logActivity({
            action: "delete",
            resource: "news",
            details: `Deleted news ID: ${id}`,
            userEmail: "admin",
            resourceId: id
        });

        revalidatePath("/admin/noticias");
        revalidatePath("/noticias");
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting news:", error);
        return { error: error.message || "Error al eliminar la noticia" };
    }
}

export async function getAdminNews(): Promise<News[]> {
    try {
        const snapshot = await adminDb.collection("news")
            .orderBy("publishedAt", "desc")
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data()!;
            return {
                id: doc.id,
                ...data,
                publishedAt: data.publishedAt.toDate().toISOString(),
                createdAt: data.createdAt.toDate().toISOString(),
                updatedAt: data.updatedAt.toDate().toISOString(),
            } as unknown as News;
        });
    } catch (error) {
        console.error("Error fetching admin news:", error);
        return [];
    }
}

export async function getPublishedNews(category?: string): Promise<News[]> {
    try {
        // Fetch all published news to avoid composite index requirements in Firestore
        const snapshot = await adminDb.collection("news")
            .where("status", "==", "published")
            .get();

        let news = snapshot.docs.map(doc => {
            const data = doc.data()!;
            return {
                id: doc.id,
                ...data,
                publishedAt: data.publishedAt.toDate().toISOString(),
                createdAt: data.createdAt.toDate().toISOString(),
                updatedAt: data.updatedAt.toDate().toISOString(),
            } as unknown as News;
        });

        // Filter by category in memory
        if (category && category !== "all") {
            news = news.filter(item => item.category === category);
        }

        // Sort by publishedAt DESC in memory
        return news.sort((a, b) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    } catch (error) {
        console.error("Error fetching published news:", error);
        return [];
    }
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
    try {
        const snapshot = await adminDb.collection("news")
            .where("slug", "==", slug)
            .where("status", "==", "published")
            .limit(1)
            .get();

        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];
        const data = doc.data()!;
        return {
            id: doc.id,
            ...data,
            publishedAt: data.publishedAt.toDate().toISOString(),
            createdAt: data.createdAt.toDate().toISOString(),
            updatedAt: data.updatedAt.toDate().toISOString(),
        } as unknown as News;
    } catch (error) {
        console.error("Error fetching news by slug:", error);
        return null;
    }
}

export async function getLatestNews(limit: number = 3): Promise<News[]> {
    try {
        const snapshot = await adminDb.collection("news")
            .where("status", "==", "published")
            .orderBy("publishedAt", "desc")
            .limit(limit)
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data()!;
            return {
                id: doc.id,
                ...data,
                publishedAt: data.publishedAt.toDate().toISOString(),
                createdAt: data.createdAt.toDate().toISOString(),
                updatedAt: data.updatedAt.toDate().toISOString(),
            } as unknown as News;
        });
    } catch (error) {
        console.error("Error fetching latest news:", error);
        return [];
    }
}


export async function getNewsById(id: string): Promise<News | null> {
    try {
        const doc = await adminDb.collection("news").doc(id).get();
        if (!doc.exists) return null;

        const data = doc.data()!;
        return {
            id: doc.id,
            ...data,
            publishedAt: data.publishedAt.toDate().toISOString(),
            createdAt: data.createdAt.toDate().toISOString(),
            updatedAt: data.updatedAt.toDate().toISOString(),
        } as unknown as News;
    } catch (error) {
        console.error("Error fetching news by id:", error);
        return null;
    }
}
