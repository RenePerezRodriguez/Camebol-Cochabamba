import { BannerForm } from "@/components/admin/banner-form";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

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

export default async function EditBannerPage({ params }: PageProps) {
    const { id } = await params;
    const doc = await adminDb.collection("banners").doc(id).get();

    if (!doc.exists) {
        return <div>Banner no encontrado</div>;
    }

    const data = doc.data()!;
    const banner = {
        id: doc.id,
        title: data.title || "",
        content: data.content || "",
        type: data.type || "info",
        isActive: data.isActive ?? false,
        link: data.link || null,
        startDate: safeDate(data.startDate),
        endDate: safeDate(data.endDate),
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Editar Banner</h2>
            </div>
            <BannerForm initialData={banner} />
        </div>
    );
}
