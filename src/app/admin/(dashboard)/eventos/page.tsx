import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export const dynamic = "force-dynamic";

import { adminDb } from "@/lib/firebase-admin";
import { Event } from "@/lib/schemas/event";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoriesModal } from "@/components/admin/categories-modal";

function safeDate(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString();
    if (typeof value.toDate === 'function') return value.toDate().toISOString();
    // Handle plain object timestamp from some libraries/versions
    if (value._seconds !== undefined) return new Date(value._seconds * 1000).toISOString();
    return null;
}

async function getEvents(): Promise<Event[]> {
    try {
        const snapshot = await adminDb.collection("events").orderBy("start", "desc").get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || "",
                slug: data.slug || "",
                start: safeDate(data.start) || new Date().toISOString(),
                end: safeDate(data.end) || new Date().toISOString(),
                location: data.location || "",
                description: data.description || "",
                category: data.category || "otro",
                customCategory: data.customCategory || null,
                latitude: data.latitude || null,
                longitude: data.longitude || null,
                imageUrl: data.imageUrl || null,
                // Optional fields explicitly mapped to avoid "plain object" errors
                longDescription: data.longDescription || null,
                imageAlt: data.imageAlt || null,
                metaTitle: data.metaTitle || null,
                metaDescription: data.metaDescription || null,
                createdAt: safeDate(data.createdAt),
                updatedAt: safeDate(data.updatedAt),
            } as Event;
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

export default async function EventsPage() {
    // Check auth server-side if needed, but middleware handles basic protect.
    // Ideally verify session/token here too or trust middleware + layout client check.

    const events = await getEvents();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
                <div className="flex items-center gap-3">
                    <CategoriesModal type="event" />
                    <Button asChild>
                        <Link href="/admin/eventos/nuevo">
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
                        </Link>
                    </Button>
                </div>
            </div>

            <DataTable columns={columns} data={events} searchKey="title" filename="eventos-camebol" />
        </div>
    );
}
