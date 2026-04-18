"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberSchema, MemberFormData, Member, memberTypeLabels } from "@/lib/schemas/member";
import { createMember, updateMember } from "@/actions/members";
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
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { useToast } from "@/hooks/use-toast";
import { useTour } from "@/hooks/use-tour";
import { TourHelpButton } from "@/components/admin/tour-help-button";

interface MemberFormProps {
    initialData?: Member;
}

export function MemberForm({ initialData }: MemberFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const { startTour } = useTour();

    const form = useForm<MemberFormData>({
        resolver: zodResolver(memberSchema),
        defaultValues: initialData || {
            name: "",
            role: "",
            company: "",
            type: "directorio",
            bio: "",
            imageUrl: "",
            linkedIn: "",
            email: "",
            isActive: true,
        },
    });

    async function onSubmit(data: MemberFormData) {
        startTransition(async () => {
            const result = initialData
                ? await updateMember(initialData.id, data)
                : await createMember(data);

            if (result?.error) {
                toast({
                    title: "Error",
                    description: typeof result.error === "string" ? result.error : "Error de validación.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "¡Éxito!",
                    description: initialData ? "Socia actualizada." : "Socia registrada correctamente.",
                });
                router.push("/admin/directorio");
                router.refresh();
            }
        });
    }

    const handleStartGuide = () => {
        startTour([
            { element: '#tour-member-name', popover: { title: 'Nombre de la Socia/Directora', description: 'Introduce el nombre completo tal como aparecerá en el directorio.', side: "bottom" } },
            { element: '#tour-member-type', popover: { title: 'Sección del Directorio', description: '¿Es del Directorio actual, Tribunal de Honor o Past President? Esto define su grupo.', side: "bottom" } },
            { element: '#tour-member-role', popover: { title: 'Cargo', description: 'Ej: Presidenta, Tesorera, Secretaria de Actas.', side: "top" } },
            { element: '#tour-member-image', popover: { title: 'Foto de Perfil', description: 'Sube la foto oficial. El sistema aplicará bordes suaves automáticamente.', side: "top" } },
        ], "member-form", true);
    };

    useEffect(() => {
        if (!initialData) {
            startTour([
                { element: '#tour-member-name', popover: { title: 'Nombre de la Socia/Directora', description: 'Introduce el nombre completo tal como aparecerá en el directorio.', side: "bottom" } },
                { element: '#tour-member-type', popover: { title: 'Sección del Directorio', description: '¿Es del Directorio actual, Tribunal de Honor o Past President? Esto define su grupo.', side: "bottom" } },
                { element: '#tour-member-role', popover: { title: 'Cargo', description: 'Ej: Presidenta, Tesorera, Secretaria de Actas.', side: "top" } },
                { element: '#tour-member-image', popover: { title: 'Foto de Perfil', description: 'Sube la foto oficial. El sistema aplicará bordes suaves automáticamente.', side: "top" } },
            ], "member-form");
        }
    }, [initialData, startTour]);

    return (
        <Form {...form}>
            <div className="flex justify-end mb-4">
                <TourHelpButton onClick={handleStartGuide} />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem id="tour-member-name">
                                <FormLabel>Nombre Completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="María Pérez" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem id="tour-member-type">
                                <FormLabel>Tipo / Sección</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona tipo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {(Object.entries(memberTypeLabels) as [string, string][])
                                            .filter(([value]) => value !== "asociada")
                                            .map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Determina en qué sección aparecerá esta persona.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email (Opcional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="maria@ejemplo.com" {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Empresa (Opcional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre de la empresa" {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem id="tour-member-role">
                                <FormLabel>Cargo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Gerente General" {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="linkedIn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://linkedin.com/in/..." {...field} value={field.value ?? ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem id="tour-member-image">
                                <FormLabel>Foto de Perfil</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        folder="members"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Orden de Visualización</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                    onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                    value={field.value || 0}
                                />
                            </FormControl>
                            <FormDescription>
                                Menor número aparece primero (ej. 1, 2, 3...)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Socia Activa</FormLabel>
                                <FormDescription>
                                    Marcar si la socia está actualmente activa en CAMEBOL.
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

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Biografía / Descripción</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Breve descripción profesional..." className="h-32" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Actualizar Socia" : "Registrar Socia"}
                </Button>
            </form>
        </Form>
    );
}
