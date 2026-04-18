import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageActions } from "@/components/admin/message-actions";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

function safeDate(value: unknown): string | null {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toLocaleDateString('es-BO');
    if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
        return (value as { toDate: () => Date }).toDate().toLocaleDateString('es-BO');
    }
    if (typeof value === 'object' && value !== null && '_seconds' in value) {
        return new Date((value as { _seconds: number })._seconds * 1000).toLocaleDateString('es-BO');
    }
    return null;
}

async function getMessages(): Promise<ContactMessage[]> {
    try {
        const snapshot = await adminDb.collection("contact_messages").orderBy("createdAt", "desc").limit(50).get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || "",
                email: data.email || "",
                subject: data.subject || "",
                message: data.message || "",
                status: data.status || "unread",
                createdAt: safeDate(data.createdAt) || "N/A",
            };
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
}

export default async function MessagesPage() {
    const messages = await getMessages();
    const unreadCount = messages.filter(m => m.status === "unread").length;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Mensajes de Contacto</h2>
                    {unreadCount > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                            {unreadCount} mensaje{unreadCount !== 1 ? "s" : ""} sin leer
                        </p>
                    )}
                </div>
            </div>

            <div className="rounded-md border bg-white dark:bg-gray-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Fecha</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Asunto</TableHead>
                            <TableHead className="max-w-[300px]">Mensaje</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24">No hay mensajes.</TableCell>
                            </TableRow>
                        ) : (
                            messages.map((msg) => (
                                <TableRow key={msg.id} className={msg.status === "unread" ? "bg-blue-50/50 dark:bg-blue-950/10" : ""}>
                                    <TableCell className="text-sm text-muted-foreground">{msg.createdAt}</TableCell>
                                    <TableCell className={msg.status === "unread" ? "font-semibold" : ""}>{msg.name}</TableCell>
                                    <TableCell>
                                        <a href={`mailto:${msg.email}`} className="text-primary hover:underline text-sm">
                                            {msg.email}
                                        </a>
                                    </TableCell>
                                    <TableCell className={msg.status === "unread" ? "font-semibold" : ""}>{msg.subject}</TableCell>
                                    <TableCell className="max-w-[300px]">
                                        <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                msg.status === "unread"
                                                    ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                                                    : "bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400"
                                            }
                                        >
                                            {msg.status === "unread" ? "No leído" : "Leído"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <MessageActions id={msg.id} status={msg.status} subject={msg.subject} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
