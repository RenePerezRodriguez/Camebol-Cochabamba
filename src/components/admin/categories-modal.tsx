'use client';

import { useState, useTransition, useEffect } from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Loader2, 
    Tag, 
    X, 
    Check,
    Settings2 
} from "lucide-react";
import { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from "@/actions/categories";
import { Category, CategoryFormData } from "@/lib/schemas/category";
import { slugify } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CategoriesModalProps {
    type: "news" | "event";
    trigger?: React.ReactNode;
    onSuccess?: () => void;
}

export function CategoriesModal({ type, trigger, onSuccess }: CategoriesModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const router = useRouter();

    // Form state for new/edit
    const [editingId, setEditingId] = useState<string | null>(null);
    const [nameInput, setNameInput] = useState("");

    const fetchCategories = async () => {
        setIsLoading(true);
        const data = await getCategories(type);
        setCategories(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchCategories();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, type]);

    const handleSave = async () => {
        if (nameInput.trim().length < 3) {
            toast({
                title: "Error",
                description: "El nombre debe tener al menos 3 caracteres.",
                variant: "destructive"
            });
            return;
        }

        const data: CategoryFormData = {
            name: nameInput,
            slug: slugify(nameInput),
            type: type
        };

        startTransition(async () => {
            const result = editingId 
                ? await updateCategory(editingId, data)
                : await createCategory(data);

            if (result.error) {
                toast({
                    title: "Error",
                    description: typeof result.error === 'string' ? result.error : "Error de validación.",
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Exito",
                    description: editingId ? "Categoría actualizada." : "Categoría creada.",
                });
                setNameInput("");
                setEditingId(null);
                fetchCategories();
                if (onSuccess) onSuccess();
                router.refresh();
            }
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar esta categoría? Los elementos asociados podrían verse afectados.")) return;

        startTransition(async () => {
            const result = await deleteCategory(id);
            if (result.error) {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Eliminado",
                    description: "Categoría eliminada correctamente.",
                });
                fetchCategories();
                if (onSuccess) onSuccess();
                router.refresh();
            }
        });
    };

    const startEdit = (cat: Category) => {
        setEditingId(cat.id);
        setNameInput(cat.name);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNameInput("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="gap-2">
                        <Settings2 className="h-4 w-4" />
                        Gestionar Categorías
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-primary" />
                        Categorías de {type === 'news' ? 'Noticias' : 'Eventos'}
                    </DialogTitle>
                    <DialogDescription>
                        Añade, edita o elimina las categorías disponibles para tus {type === 'news' ? 'noticias' : 'eventos'}.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    {/* Add/Edit Form */}
                    <div className="flex items-end gap-3 p-4 bg-slate-50 rounded-lg border">
                        <div className="flex-1 space-y-1.5">
                            <label className="text-xs font-semibold uppercase text-slate-500">
                                {editingId ? "Editar Categoría" : "Nueva Categoría"}
                            </label>
                            <Input 
                                placeholder="Ej: Capacitación, Comunicado..." 
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                disabled={isPending}
                                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                            />
                        </div>
                        <div className="flex gap-2">
                            {editingId ? (
                                <>
                                    <Button size="icon" variant="ghost" onClick={cancelEdit} disabled={isPending}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" onClick={handleSave} disabled={isPending}>
                                        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={handleSave} disabled={isPending} className="gap-2">
                                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                                    Añadir
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* List Table */}
                    <div className="max-h-[300px] overflow-y-auto border rounded-md">
                        <Table>
                            <TableHeader className="bg-slate-50 sticky top-0 z-10">
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead className="w-[100px] text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={2} className="h-24 text-center">
                                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Cargando categorías...
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : categories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} className="h-24 text-center text-muted-foreground italic">
                                            No hay categorías creadas.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    categories.map((cat) => (
                                        <TableRow key={cat.id} className={editingId === cat.id ? "bg-blue-50/50" : ""}>
                                            <TableCell className="font-medium">{cat.name}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-slate-500 hover:text-blue-600"
                                                        onClick={() => startEdit(cat)}
                                                        disabled={isPending}
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-slate-500 hover:text-red-600"
                                                        onClick={() => handleDelete(cat.id)}
                                                        disabled={isPending}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
