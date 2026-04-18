"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2, Edit, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { deleteNews } from "@/actions/news";
import { useToast } from "@/hooks/use-toast";
import { News } from "@/lib/schemas/news";
import { useRouter } from "next/navigation";

interface NewsRowActionsProps {
    news: News;
}

export function NewsRowActions({ news }: NewsRowActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const result = await deleteNews(news.id);

            if (result?.error) {
                toast({
                    title: "Error al eliminar",
                    description: result.error,
                    variant: "destructive",
                });
            } else if (result?.success) {
                toast({
                    title: "Noticia eliminada",
                    description: "La noticia ha sido eliminada correctamente.",
                });
                router.refresh();
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast({
                title: "Error inesperado",
                description: "No se pudo eliminar la noticia.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    const copyId = () => {
        navigator.clipboard.writeText(news.id);
        toast({
            title: "Copiado",
            description: "ID de la noticia copiado al portapapeles.",
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting}>
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem onClick={copyId}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={`/admin/noticias/${news.id}`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => window.open(`/noticias/${news.slug}`, '_blank')}
                        className="flex items-center"
                    >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver en Web
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => setShowDeleteDialog(true)}
                        className="text-red-600 focus:text-red-100 focus:bg-red-500 transition-colors"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está absolutamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará permanentemente la noticia <strong>&quot;{news.title}&quot;</strong>. No se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? "Eliminando..." : "Sí, eliminar definitivamente"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
