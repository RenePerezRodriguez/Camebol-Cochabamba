"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectorSchema, SectorFormData } from "@/lib/schemas/sector";
import { createSector } from "@/actions/sectors";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTour } from "@/hooks/use-tour";
import { TourHelpButton } from "@/components/admin/tour-help-button";
import { useEffect } from "react";

export function SectorForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const { startTour } = useTour();

    const form = useForm<SectorFormData>({
        resolver: zodResolver(sectorSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(data: SectorFormData) {
        startTransition(async () => {
            const result = await createSector(data);

            if (result?.error) {
                toast({
                    title: "Error",
                    description: typeof result.error === "string" ? result.error : "Error al crear sector.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "¡Éxito!",
                    description: "Sector creado correctamente.",
                });
                form.reset();
                router.refresh();
            }
        });
    }

    const handleStartGuide = () => {
        startTour([
            { element: '#tour-sector-name', popover: { title: 'Nuevo Sector', description: 'Crea categorías para las empresas (ej: Alimentos, Minería).', side: "bottom" } },
        ], "sector-form", true);
    };

    useEffect(() => {
        startTour([
            { element: '#tour-sector-name', popover: { title: 'Nuevo Sector', description: 'Crea categorías para las empresas (ej: Alimentos, Minería).', side: "bottom" } },
        ], "sector-form");
    }, [startTour]);

    return (
        <Card>
            <div className="flex justify-end p-2 pb-0">
                <TourHelpButton onClick={handleStartGuide} />
            </div>
            <CardHeader>
                <CardTitle>Agregar Nuevo Sector</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem id="tour-sector-name">
                                    <FormLabel>Nombre del Sector</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej. Construcción" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                            Crear Sector
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
