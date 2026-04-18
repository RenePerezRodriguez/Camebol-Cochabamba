"use client";

import { CheckCircle, XCircle, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateAffiliationStatus } from "@/actions/affiliations";
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

interface AffiliationActionsProps {
    id: string;
    status: string;
    empresa: string;
}

export function AffiliationActions({ id, status, empresa }: AffiliationActionsProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleStatusChange(newStatus: "approved" | "rejected" | "pending") {
        startTransition(async () => {
            const result = await updateAffiliationStatus(id, newStatus);
            if (result.error) {
                alert(result.error);
            }
            router.refresh();
        });
    }

    if (status === "approved" || status === "rejected") {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleStatusChange("pending")}
                disabled={isPending}
                title="Volver a pendiente"
            >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4 text-muted-foreground" />}
            </Button>
        );
    }

    return (
        <div className="flex gap-1">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" disabled={isPending} title="Aprobar">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Aprobar solicitud</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Aprobar la solicitud de afiliación de <strong>{empresa}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleStatusChange("approved")}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Aprobar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" disabled={isPending} title="Rechazar">
                        <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Rechazar solicitud</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Rechazar la solicitud de afiliación de <strong>{empresa}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleStatusChange("rejected")}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Rechazar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
