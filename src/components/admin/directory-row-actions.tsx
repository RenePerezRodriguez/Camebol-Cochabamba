"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteMember } from "@/actions/members";
import { toast } from "@/hooks/use-toast";
import { Member } from "@/lib/schemas/member";
import { useRouter } from "next/navigation";

interface DirectoryRowActionsProps {
    member: Member;
}

export function DirectoryRowActions({ member }: DirectoryRowActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta socia permanentemente?");
        if (!confirmed) return;

        setIsDeleting(true);

        try {
            const result = await deleteMember(member.id);

            if (result?.error) {
                toast({
                    title: "Error al eliminar",
                    description: result.error,
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Socia eliminada",
                    description: "El registro ha sido eliminado correctamente.",
                });
                router.refresh();
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast({
                title: "Error inesperado",
                description: "No se pudo eliminar el registro.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(member.id)}>
                    Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/admin/directorio/${member.id}`}>Editar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10"
                >
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
