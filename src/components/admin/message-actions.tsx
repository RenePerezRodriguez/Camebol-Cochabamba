"use client";

import { Trash2, MailOpen, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateMessageStatus, deleteMessage } from "@/actions/messages";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MessageActionsProps {
    id: string;
    status: string;
    subject: string;
}

export function MessageActions({ id, status, subject }: MessageActionsProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleToggleRead() {
        const newStatus = status === "read" ? "unread" : "read";
        startTransition(async () => {
            await updateMessageStatus(id, newStatus);
            router.refresh();
        });
    }

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteMessage(id);
            if (result.error) alert(result.error);
            router.refresh();
        });
    }

    return (
        <div className="flex gap-1">
            <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleRead}
                disabled={isPending}
                title={status === "read" ? "Marcar como no leído" : "Marcar como leído"}
            >
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : status === "read" ? (
                    <Mail className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <MailOpen className="h-4 w-4 text-blue-600" />
                )}
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" disabled={isPending} title="Eliminar">
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar mensaje</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Eliminar permanentemente el mensaje &quot;{subject}&quot;? Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
