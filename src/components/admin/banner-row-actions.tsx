"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deleteBanner } from "@/actions/banners";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface BannerRowActionsProps {
    banner: {
        id: string;
        title: string;
    };
}

export function BannerRowActions({ banner }: BannerRowActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este banner?");
        if (!confirmed) return;

        setIsDeleting(true);

        try {
            const result = await deleteBanner(banner.id);

            if (result?.error) {
                toast({
                    title: "Error al eliminar",
                    description: result.error,
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Banner eliminado",
                    description: "El banner ha sido eliminado correctamente.",
                });
                router.refresh();
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast({
                title: "Error inesperado",
                description: "No se pudo eliminar el banner.",
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
                <DropdownMenuItem asChild>
                    <Link href={`/admin/banners/${banner.id}`}>
                        <Pencil className="mr-2 h-4 w-4" /> Editar
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10"
                >
                    <Trash className="mr-2 h-4 w-4" />
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
