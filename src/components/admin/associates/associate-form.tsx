"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { associateSchema, AssociateFormData, Associate } from "@/lib/schemas/associate";
import { createAssociate, updateAssociate } from "@/actions/associates";
import { getSectors } from "@/actions/sectors";
import { Sector } from "@/lib/schemas/sector";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/ui/image-upload"; // Assuming this exists from members

interface AssociateFormProps {
    initialData?: Associate;
}

export function AssociateForm({ initialData }: AssociateFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [sectors, setSectors] = useState<Sector[]>([]);

    useEffect(() => {
        const loadSectors = async () => {
            const data = await getSectors();
            setSectors(data);
        };
        loadSectors();
    }, []);

    const form = useForm<AssociateFormData>({
        resolver: zodResolver(associateSchema),
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            sectorId: initialData?.sectorId || "",
            description: initialData?.description || "",
            discount: initialData?.discount || "",
            logoUrl: initialData?.logoUrl || "",
            website: initialData?.website || "",
            facebook: initialData?.facebook || "",
            whatsapp: initialData?.whatsapp || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            address: initialData?.address || "",
            latitude: initialData?.latitude || "",
            longitude: initialData?.longitude || "",
            isActive: initialData?.isActive ?? true,
        },
    });

    // Auto-generate slug from name
    const watchName = form.watch("name");
    useEffect(() => {
        if (!initialData && watchName) {
            const slug = watchName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            form.setValue("slug", slug);
        }
    }, [watchName, initialData, form]);

    function onSubmit(data: AssociateFormData) {
        startTransition(async () => {
            let result;
            if (initialData) {
                result = await updateAssociate(initialData.id, data);
            } else {
                result = await createAssociate(data);
            }

            if (result?.error) {
                toast({
                    title: "Error",
                    description: typeof result.error === "string" ? result.error : "Error al guardar empresa.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "¡Éxito!",
                    description: `Empresa ${initialData ? "actualizada" : "creada"} correctamente.`,
                });
                router.push("/admin/asociadas");
                router.refresh();
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{initialData ? "Editar Empresa Asociada" : "Nueva Empresa Asociada"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre de la Empresa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej. Mi Empresa S.R.L." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug (URL)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="mi-empresa-srl" {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormDescription>Se genera automáticamente del nombre.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sectorId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sector</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona sector" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {sectors.map((sector) => (
                                                    <SelectItem key={sector.id} value={sector.id}>
                                                        {sector.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <div className="mt-1 text-xs">
                                            <Link href="/admin/sectores" className="text-primary hover:underline">
                                                Gestionar sectores
                                            </Link>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="logoUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Logo de la Empresa</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value || ""}
                                                onChange={(url) => field.onChange(url)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Información / Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descripción de la empresa..." className="min-h-[100px]" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descuento Ofrecido</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej. 10% de descuento en servicios..." {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sitio Web</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="facebook"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Facebook</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://www.facebook.com/..." {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="whatsapp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WhatsApp</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://wa.link/... o +591..." {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="contacto@empresa.com" {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+591 ..." {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dirección</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Av. ..." {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="latitude"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Latitud</FormLabel>
                                        <FormControl>
                                            <Input placeholder="-17.39..." {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="longitude"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Longitud</FormLabel>
                                        <FormControl>
                                            <Input placeholder="-66.15..." {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Membresía Activa</FormLabel>
                                        <FormDescription>
                                            Si está desactivado, la empresa no aparecerá en el directorio público.
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

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            Guardar Empresa
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
