import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export type AuditAction = "create" | "update" | "delete" | "login";
export type AuditResource = "event" | "member" | "company" | "system" | "auth" | "sector" | "news" | "affiliation";

interface LogEntry {
    action: AuditAction;
    resource: AuditResource;
    details: string;
    userEmail: string;
    resourceId?: string;
    metadata?: Record<string, any>;
}

export async function logActivity(entry: LogEntry) {
    try {
        await adminDb.collection("audit_logs").add({
            ...entry,
            timestamp: FieldValue.serverTimestamp(),
            createdAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
        // Fail silently to not block the main action
    }
}
