import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export type AuditAction = "create" | "update" | "delete" | "login";
export type AuditResource = "event" | "member" | "company" | "system" | "auth" | "sector" | "news" | "affiliation" | "contact_message";

interface LogEntry {
    action: AuditAction;
    resource: AuditResource;
    details: string;
    userEmail: string;
    resourceId?: string;
    metadata?: Record<string, any>;
}

const MAX_AUDIT_LOGS = 500;

export async function logActivity(entry: LogEntry) {
    try {
        await adminDb.collection("audit_logs").add({
            ...entry,
            timestamp: FieldValue.serverTimestamp(),
            createdAt: new Date().toISOString(),
        });

        // Auto-limpiar logs antiguos para controlar costos de Firestore
        pruneOldLogs().catch(() => {});
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
}

async function pruneOldLogs() {
    const countSnap = await adminDb.collection("audit_logs").count().get();
    const total = countSnap.data().count;

    if (total <= MAX_AUDIT_LOGS) return;

    const toDelete = total - MAX_AUDIT_LOGS;
    const oldDocs = await adminDb
        .collection("audit_logs")
        .orderBy("timestamp", "asc")
        .limit(toDelete)
        .get();

    const batch = adminDb.batch();
    oldDocs.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
}
