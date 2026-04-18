import { EventForm } from "@/components/admin/event-form";

export const dynamic = "force-dynamic";

import { adminDb } from "@/lib/firebase-admin";
import { Event } from "@/lib/schemas/event";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

function safeDate(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString();
    if (typeof value.toDate === 'function') return value.toDate().toISOString();
    if (value._seconds !== undefined) return new Date(value._seconds * 1000).toISOString();
    return null;
}

async function getEvent(id: string): Promise<Event | null> {
    const doc = await adminDb.collection("events").doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data()!;
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
        longDescription: data.longDescription || null,
        imageAlt: data.imageAlt || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
    } as Event;
}

export default async function EditEventPage({ params }: PageProps) {
    const { id } = await params;
    const event = await getEvent(id);

    if (!event) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Editar Evento</h3>
                <p className="text-sm text-muted-foreground">Modificar detalles del evento.</p>
            </div>
            <EventForm initialData={event} />
        </div>
    );
}
