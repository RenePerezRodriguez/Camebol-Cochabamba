"use client";

import { useRouter } from "next/navigation";
import { Sector } from "@/lib/schemas/sector";
import { deleteSector, updateSector } from "@/actions/sectors";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil } from "lucide-react";
import { useTransition, useState } from "react";
import { useToast } from "@/hooks/use-toast";
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

interface SectorListProps {
    initialSectors: Sector[];
}

export function SectorList({ initialSectors }: SectorListProps) {
    const router = useRouter(); // Import this
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const result = await deleteSector(id);
            if (result?.error) {
                toast({
                    title: "Error",
                    description: "No se pudo eliminar el sector.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Sector eliminado",
                    description: "El sector ha sido eliminado correctamente.",
                });
                router.refresh();
            }
        });
    };

    if (initialSectors.length === 0) {
        return (
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    No hay sectores registrados.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Listado de Sectores</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {initialSectors.map((sector) => (
                        <SectorItem key={sector.id} sector={sector} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function SectorItem({ sector }: { sector: Sector }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(sector.name);

    const handleUpdate = () => {
        startTransition(async () => {
            const result = await updateSector(sector.id, { name: newName });
            if (result?.error) {
                toast({
                    title: "Error",
                    description: "No se pudo actualizar el sector.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Sector actualizado",
                    description: "El nombre del sector ha sido actualizado.",
                });
                setIsEditing(false);
                router.refresh();
            }
        });
    };

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteSector(sector.id);
            if (result?.error) {
                toast({
                    title: "Error",
                    description: "No se pudo eliminar el sector.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Sector eliminado",
                    description: "El sector ha sido eliminado correctamente.",
                });
                router.refresh();
            }
        });
    };

    return (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            {isEditing ? (
                <div className="flex items-center gap-2 flex-1 mr-2">
                    <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        disabled={isPending}
                    />
                    <Button size="sm" onClick={handleUpdate} disabled={isPending}>
                        Guardar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} disabled={isPending}>
                        Cancelar
                    </Button>
                </div>
            ) : (
                <span className="font-medium">{sector.name}</span>
            )}

            {!isEditing && (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás segura?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente el sector &quot;{sector.name}&quot;.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    );
}

