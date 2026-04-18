import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AssociateForm } from "@/components/admin/associates/associate-form";
import { adminDb } from "@/lib/firebase-admin";

export default async function EditAssociatePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const doc = await adminDb.collection("associates").doc(id).get();

    if (!doc.exists) {
        return <div>Empresa no encontrada</div>;
    }

    const rawData = doc.data()!;
    const associate = {
        id: doc.id,
        ...rawData,
        createdAt: rawData.createdAt?.toDate ? rawData.createdAt.toDate().toISOString() : new Date().toISOString(),
        updatedAt: rawData.updatedAt?.toDate ? rawData.updatedAt.toDate().toISOString() : undefined,
    } as any;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <Heading title="Editar Empresa Asociada" description={`Editar información de ${associate.name}`} />
            </div>
            <Separator />
            <AssociateForm initialData={associate} />
        </div>
    );
}

