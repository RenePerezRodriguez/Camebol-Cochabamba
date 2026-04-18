import { DataTable } from "@/components/ui/data-table";
import { columns, AuditLog } from "./columns";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

async function getLogs(): Promise<AuditLog[]> {
    try {
        const snapshot = await adminDb.collection("audit_logs")
            .orderBy("createdAt", "desc")
            .limit(100)
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                action: data.action,
                resource: data.resource,
                details: data.details,
                userEmail: data.userEmail,
                createdAt: data.createdAt instanceof Date
                    ? data.createdAt.toLocaleString()
                    : (data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : new Date().toLocaleString()),
            };
        }) as AuditLog[];
    } catch (error) {
        console.error("Error fetching logs:", error);
        return [];
    }
}

export default async function AuditPage() {
    const logs = await getLogs();

    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Logs de Auditoría</h2>
            <p className="text-muted-foreground">Historial de las últimas 100 acciones en el sistema.</p>
            <DataTable columns={columns} data={logs} searchKey="details" filename="audit-logs" />
        </div>
    );
}
