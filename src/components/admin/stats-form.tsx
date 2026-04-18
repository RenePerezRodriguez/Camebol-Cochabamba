'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Loader2, Save, RefreshCw } from 'lucide-react';
import { updateLandingStats, LandingStats } from '@/actions/landing-content';
import { useTour } from '@/hooks/use-tour';
import { TourHelpButton } from '@/components/admin/tour-help-button';
import { useEffect } from 'react';

const statsSchema = z.object({
    members: z.number().min(0, "Debe ser un número positivo"),
    trainedWomen: z.number().min(0, "Debe ser un número positivo"),
    businessRounds: z.number().min(0, "Debe ser un número positivo"),
});

export function StatsForm({ initialStats }: { initialStats: LandingStats }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { startTour } = useTour();

    const form = useForm<z.infer<typeof statsSchema>>({
        resolver: zodResolver(statsSchema),
        defaultValues: {
            members: initialStats.members,
            trainedWomen: initialStats.trainedWomen,
            businessRounds: initialStats.businessRounds,
        },
    });

    function onSubmit(values: z.infer<typeof statsSchema>) {
        startTransition(async () => {
            const result = await updateLandingStats(values);
            if (result.success) {
                toast({
                    title: "Estadísticas actualizadas",
                    description: "Los cambios se reflejarán en la página de inicio.",
                });
                router.refresh();
            } else {
                toast({
                    variant: "destructive",
                    title: "Error al actualizar",
                    description: result.error,
                });
            }
        });
    }

    const handleStartGuide = () => {
        startTour([
            { element: '#tour-stats-inputs', popover: { title: 'Impacto en Números', description: 'Actualiza estas cifras para que se vean en la sección "Nosotras" de la web principal.', side: "bottom" } },
        ], "stats-form", true);
    };

    useEffect(() => {
        startTour([
            { element: '#tour-stats-inputs', popover: { title: 'Impacto en Números', description: 'Actualiza estas cifras para que se vean en la sección "Nosotras" de la web principal.', side: "bottom" } },
        ], "stats-form");
    }, [startTour]);

    return (
        <Card>
            <div className="flex justify-end p-4 pb-0">
                <TourHelpButton onClick={handleStartGuide} />
            </div>
            <CardHeader>
                <CardTitle>Impacto (Sección &quot;Nosotras&quot;)</CardTitle>
                <CardDescription>
                    Actualiza los números que aparecen en la sección de estadísticas de la página de inicio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div id="tour-stats-inputs" className="grid gap-6 md:grid-cols-3">
                            <FormField
                                control={form.control}
                                name="members"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Asociadas Nacionales</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Número total de afiliadas.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="trainedWomen"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mujeres Capacitadas</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Impacto en formación.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessRounds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rondas de Negocio</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>Eventos de networking.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Guardar Cambios
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
