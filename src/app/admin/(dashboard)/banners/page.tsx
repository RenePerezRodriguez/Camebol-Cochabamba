import { DataTable } from "@/components/ui/data-table";
import { columns, Banner } from "./columns";
import { adminDb } from "@/lib/firebase-admin";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

function safeDate(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString();
    if (typeof value.toDate === 'function') return value.toDate().toISOString();
    if (value._seconds !== undefined) return new Date(value._seconds * 1000).toISOString();
    return null;
}

async function getBanners(): Promise<Banner[]> {
    try {
        const snapshot = await adminDb.collection("banners").orderBy("createdAt", "desc").get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || "",
                content: data.content || "",
                type: data.type || "info",
                isActive: data.isActive ?? false,
                link: data.link || null,
                createdAt: safeDate(data.createdAt),
                startDate: safeDate(data.startDate),
                endDate: safeDate(data.endDate),
            } as Banner;
        });
    } catch (error) {
        console.error("Error fetching banners:", error);
        return [];
    }
}

export default async function BannersPage() {
    const banners = await getBanners();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Gestor de Banners</h2>
                    <p className="text-muted-foreground">Configura los avisos y promociones del sitio.</p>
                </div>
                <Link href="/admin/banners/nuevo">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Banner
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={banners} searchKey="title" filename="banners" />
        </div>
    );
}
