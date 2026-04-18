import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export const dynamic = "force-dynamic";

import { adminDb } from "@/lib/firebase-admin";
import { Member } from "@/lib/schemas/member";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function safeDate(value: any): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString();
    if (typeof value.toDate === 'function') return value.toDate().toISOString();
    if (value._seconds !== undefined) return new Date(value._seconds * 1000).toISOString();
    return null;
}

async function getMembers(): Promise<Member[]> {
    try {
        const snapshot = await adminDb.collection("members")
            .where("type", "in", ["directorio", "directiva", "equipo"])
            .orderBy("name")
            .get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || "",
                role: data.role || "",
                company: data.company || "",
                type: data.type || "directorio",
                bio: data.bio || null,
                imageUrl: data.imageUrl || null,
                linkedIn: data.linkedIn || null,
                email: data.email || null,
                isActive: data.isActive ?? true,
                order: data.order || 0,
            } as Member;
        });
    } catch (error) {
        console.error("Error fetching members:", error);
        return [];
    }
}

export default async function DirectoryPage() {
    const members = await getMembers();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Directorio de Socias</h2>
                <Button asChild>
                    <Link href="/admin/directorio/nuevo">
                        <Plus className="mr-2 h-4 w-4" /> Nueva Socia
                    </Link>
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={members}
                searchKey="name"
                filename="directorio-camebol"
                filterColumn="type"
                filterOptions={[
                    { label: "Directorio", value: "directorio" },
                    { label: "Directiva", value: "directiva" },
                    { label: "Equipo", value: "equipo" },
                ]}
            />
        </div>
    );
}
