import { MemberForm } from "@/components/admin/member-form";

export const dynamic = "force-dynamic";

import { adminDb } from "@/lib/firebase-admin";
import { Member } from "@/lib/schemas/member";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getMember(id: string): Promise<Member | null> {
    const doc = await adminDb.collection("members").doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data()!;
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
}

export default async function EditMemberPage({ params }: PageProps) {
    const { id } = await params;
    const member = await getMember(id);

    if (!member) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Editar Socia</h3>
                <p className="text-sm text-muted-foreground">Actualizar información de la socia.</p>
            </div>
            <MemberForm initialData={member} />
        </div>
    );
}
