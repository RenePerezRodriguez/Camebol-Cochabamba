"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema, CompanyFormData, Company, companySectors } from "@/lib/schemas/company";
import { createCompany, updateCompany } from "@/actions/companies";
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
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { useToast } from "@/hooks/use-toast";
import { useTour } from "@/hooks/use-tour";
import { TourHelpButton } from "@/components/admin/tour-help-button";
import { useEffect } from "react";

interface CompanyFormProps {
    initialData?: Company;
}

export function CompanyForm({ initialData }: CompanyFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const { startTour } = useTour();

    const form = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
        defaultValues: initialData || {
            name: "",
            slug: "",
            sector: "",
            description: "",
            longDescription: "",
            logoUrl: "",
            coverImageUrl: "",
            website: "",
            email: "",
            phone: "",
            address: "",
            foundedYear: "",
            representative: "",
            socialMedia: {
                facebook: "",
                instagram: "",
                linkedin: "",
                twitter: "",
            },
            isActive: true,
            isFeatured: false,
        },
    });

    // Auto-generate slug from name
    const watchName = form.watch("name");
    const generateSlug = () => {
        const slug = watchName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        form.setValue("slug", slug);
    };

    const handleStartGuide = () => {
        startTour([
            { element: '#tour-company-name', popover: { title: 'Empresa Asociada', description: 'Escribe el nombre. Esto generará la URL de su perfil público.', side: "bottom" } },
            { element: '#tour-company-sector', popover: { title: 'Sector Comercial', description: 'Asigna el sector para que puedan filtrarla en el directorio.', side: "bottom" } },
            { element: '#tour-company-logo', popover: { title: 'Logo Institucional', description: 'Sube el logotipo (cuadrado idealmente).', side: "top" } },
            { element: '#tour-company-cover', popover: { title: 'Foto de Portada', description: 'Esta foto aparecerá grande arriba de su perfil, tipo LinkedIn.', side: "top" } },
        ], "company-form", true);
    };

    useEffect(() => {
        if (!initialData) {
            startTour([
                { element: '#tour-company-name', popover: { title: 'Empresa Asociada', description: 'Escribe el nombre. Esto generará la URL de su perfil público.', side: "bottom" } },
                { element: '#tour-company-sector', popover: { title: 'Sector Comercial', description: 'Asigna el sector para que puedan filtrarla en el directorio.', side: "bottom" } },
                { element: '#tour-company-logo', popover: { title: 'Logo Institucional', description: 'Sube el logotipo (cuadrado idealmente).', side: "top" } },
                { element: '#tour-company-cover', popover: { title: 'Foto de Portada', description: 'Esta foto aparecerá grande arriba de su perfil, tipo LinkedIn.', side: "top" } },
            ], "company-form");
        }
    }, [initialData, startTour]);

    async function onSubmit(data: CompanyFormData) {
        startTransition(async () => {
            const result = initialData
                ? await updateCompany(initialData.id, data)
                : await createCompany(data);

            if (result?.error) {
                toast({
                    title: "Error",
                    description: typeof result.error === "string" ? result.error : "Error de validación.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "¡Éxito!",
                    description: initialData ? "Empresa actualizada." : "Empresa registrada correctamente.",
                });
                router.push("/admin/asociadas");
                router.refresh();
            }
        });
    }

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
                            <FormItem id="tour-company-name">
                                <FormLabel>Nombre de la Empresa</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mi Empresa S.R.L." {...field} onBlur={generateSlug} />
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
                                    <Input placeholder="mi-empresa-srl" {...field} />
                                </FormControl>
                                <FormDescription>Se genera automáticamente del nombre.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                            <FormItem id="tour-company-sector">
                                <FormLabel>Sector</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona sector" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {companySectors.map((sector) => (
                                            <SelectItem key={sector} value={sector}>
                                                {sector}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="representative"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Representante</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del representante" {...field} value={field.value || ""} />
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
                                    <Input placeholder="contacto@empresa.com" {...field} value={field.value || ""} />
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
                                    <Input placeholder="+591 4 1234567" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sitio Web</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://www.empresa.com" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="foundedYear"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Año de Fundación</FormLabel>
                                <FormControl>
                                    <Input placeholder="2010" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input placeholder="Av. América #123, Cochabamba" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción Corta</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Breve descripción de la empresa..." className="h-24" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción Larga (Opcional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Descripción detallada de la empresa, historia, servicios..." className="h-32" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="logoUrl"
                        render={({ field }) => (
                            <FormItem id="tour-company-logo">
                                <FormLabel>Logo</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        folder="companies"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="coverImageUrl"
                        render={({ field }) => (
                            <FormItem id="tour-company-cover">
                                <FormLabel>Imagen de Portada</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        folder="companies"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Activa</FormLabel>
                                    <FormDescription>
                                        Mostrar en el directorio público.
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
                        name="isFeatured"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Destacada</FormLabel>
                                    <FormDescription>
                                        Mostrar de forma destacada.
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

                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Actualizar Empresa" : "Registrar Empresa"}
                </Button>
            </form>
        </Form>
    );
}
