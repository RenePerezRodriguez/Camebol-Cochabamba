"use client";

import { useRouter } from "next/navigation";
import { Associate } from "@/lib/schemas/associate";
import { deleteAssociate } from "@/actions/associates";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
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

interface AssociateRowActionsProps {
    associate: Associate;
}

export function AssociateRowActions({ associate }: AssociateRowActionsProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteAssociate(associate.id);
            if (result?.error) {
                toast({
                    title: "Error",
                    description: "No se pudo eliminar la empresa.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Empresa eliminada",
                    description: `La empresa ${associate.name} ha sido eliminada correctamente.`,
                });
                router.refresh();
            }
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/asociadas/${associate.id}`}>
                    <Pencil className="h-4 w-4" />
                </Link>
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar empresa?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Eliminará permanentemente a <strong>{associate.name}</strong> del sistema.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
