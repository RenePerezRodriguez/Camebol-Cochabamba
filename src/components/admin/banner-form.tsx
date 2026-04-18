"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { bannerSchema, BannerFormData } from "@/lib/schemas/banner";
import { createBanner, updateBanner, deleteBanner } from "@/actions/banners";
import { useState, useTransition, useEffect } from "react";
import { Trash, Calendar } from "lucide-react";
import { useTour } from "@/hooks/use-tour";
import { TourHelpButton } from "@/components/admin/tour-help-button";
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

interface BannerFormProps {
    initialData?: any;
}

export function BannerForm({ initialData }: BannerFormProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { startTour } = useTour();

    const form = useForm<BannerFormData>({
        resolver: zodResolver(bannerSchema),
        defaultValues: initialData ? {
            title: initialData.title || "",
            content: initialData.content || "",
            link: initialData.link || "",
            isActive: initialData.isActive ?? true,
            type: initialData.type || "info",
            startDate: initialData.startDate ? (initialData.startDate.toDate ? initialData.startDate.toDate() : new Date(initialData.startDate)) : null,
            endDate: initialData.endDate ? (initialData.endDate.toDate ? initialData.endDate.toDate() : new Date(initialData.endDate)) : null,
        } : {
            title: "",
            content: "",
            link: "",
            isActive: true,
            type: "info",
            startDate: null,
            endDate: null,
        },
    });

    const onSubmit = (data: BannerFormData) => {
        // Clean data: Ensure link is empty string if null, and dates are handled
        const cleanedData = {
            ...data,
            link: data.link || "",
        };

        startTransition(async () => {
            try {
                let result;
                if (initialData) {
                    result = await updateBanner(initialData.id, cleanedData);
                } else {
                    result = await createBanner(cleanedData);
                }

                if (result?.error) {
                    toast({ 
                        title: "Error", 
                        description: typeof result.error === 'string' ? result.error : "Error de validación", 
                        variant: "destructive" 
                    });
                } else {
                    toast({ title: initialData ? "Banner actualizado" : "Banner creado" });
                    router.refresh();
                    router.push("/admin/banners");
                }
            } catch (error) {
                toast({ title: "Error", description: "Ocurrió un fallo inesperado", variant: "destructive" });
            }
        });
    };

    const handleStartGuide = () => {
        startTour([
            { element: '#tour-banner-title', popover: { title: 'Título Interno', description: 'Nombre para que tú lo identifiques.', side: "bottom" } },
            { element: '#tour-banner-message', popover: { title: 'El Mensaje', description: 'Lo que leerán los usuarios en la barra de arriba.', side: "bottom" } },
            { element: '#tour-banner-link', popover: { title: 'Botón de Acción', description: 'Si quieres que al tocar el banner vayan a una página, pon la URL aquí.', side: "bottom" } },
            { element: '#tour-banner-dates', popover: { title: 'Programación', description: 'Programa qué día empieza a mostrarse y qué día desaparece automático.', side: "top" } },
        ], "banner-form", true);
    };

    useEffect(() => {
        if (!initialData) {
            startTour([
                { element: '#tour-banner-title', popover: { title: 'Título Interno', description: 'Nombre para que tú lo identifiques.', side: "bottom" } },
                { element: '#tour-banner-message', popover: { title: 'El Mensaje', description: 'Lo que leerán los usuarios en la barra de arriba.', side: "bottom" } },
                { element: '#tour-banner-link', popover: { title: 'Botón de Acción', description: 'Si quieres que al tocar el banner vayan a una página, pon la URL aquí.', side: "bottom" } },
                { element: '#tour-banner-dates', popover: { title: 'Programación', description: 'Programa qué día empieza a mostrarse y qué día desaparece automático.', side: "top" } },
            ], "banner-form");
        }
    }, [initialData, startTour]);

    const handleDelete = async () => {
        if (!initialData) return;

        startTransition(async () => {
            try {
                const result = await deleteBanner(initialData.id);
                if (result?.success) {
                    toast({ title: "Banner eliminado" });
                    router.refresh();
                    router.push("/admin/banners");
                } else {
                    toast({ 
                        title: "Error", 
                        description: result?.error || "No se pudo eliminar", 
                        variant: "destructive" 
                    });
                }
            } catch (error) {
                toast({ title: "Error", description: "Fallo al eliminar", variant: "destructive" });
            } finally {
                setShowDeleteDialog(false);
            }
        });
    };

    return (
        <>
            <Form {...form}>
                <div className="flex justify-end mb-4">
                    <TourHelpButton onClick={handleStartGuide} />
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem id="tour-banner-title">
                                        <FormLabel className="font-bold">Título Interno</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: Campaña de Abril 2024" {...field} />
                                        </FormControl>
                                        <FormDescription>Nombre de referencia interna para administración.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem id="tour-banner-message">
                                        <FormLabel className="font-bold">Mensaje del Banner</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Escribe el mensaje que verán las usuarias..." 
                                                className="min-h-[100px] resize-none"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription>Este texto se mostrará en la parte superior del sitio.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem id="tour-banner-link">
                                        <FormLabel className="font-bold">URL de Destino (Opcional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://camebolcochabamba.com/evento-x" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormDescription>Dirección a la que se redirigirá al hacer clic.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-6">


                            <div id="tour-banner-dates" className="rounded-xl border bg-slate-50 p-6 space-y-4">
                                <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                                    <Calendar className="h-4 w-4" /> Programación de Visibilidad
                                </h3>
                                
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Fecha de Inicio</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="datetime-local" 
                                                        className="text-sm"
                                                        value={field.value ? new Date(new Date(field.value).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
                                                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs">Fecha de Fin</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="datetime-local" 
                                                        className="text-sm"
                                                        value={field.value ? new Date(new Date(field.value).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
                                                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 italic">
                                    Si se dejan vacías, el banner se mostrará indefinidamente mientras esté activo.
                                </p>
                            </div>

                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base font-medium">Estado Maestro</FormLabel>
                                            <FormDescription className="text-xs">
                                                Publicar u ocultar el banner globalmente.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                        <Button 
                            disabled={isPending} 
                            type="submit" 
                            className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none sm:min-w-[150px]"
                        >
                            {isPending ? "Procesando..." : (initialData ? "Actualizar Banner" : "Crear Banner")}
                        </Button>
                        
                        {initialData && (
                            <Button 
                                disabled={isPending} 
                                variant="outline" 
                                type="button" 
                                onClick={() => setShowDeleteDialog(true)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                                <Trash className="w-4 h-4 mr-2" /> Eliminar Permanente
                            </Button>
                        )}
                    </div>
                </form>
            </Form>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Está seguro de eliminar este banner?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción es irreversible. El banner <strong>&quot;{initialData?.title}&quot;</strong> desaparecerá de todos los listados y del sitio público.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isPending ? "Eliminando..." : "Confirmar Eliminación"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
