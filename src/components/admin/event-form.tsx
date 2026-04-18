"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventFormData, type Event } from "@/lib/schemas/event";
import { createEvent, updateEvent } from "@/actions/events";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, MapPin, PlusCircle } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { slugify } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { SeoPreview } from "@/components/admin/seo-preview";
import { getCategories } from "@/actions/categories";
import { Category } from "@/lib/schemas/category";
import { CategoriesModal } from "@/components/admin/categories-modal";
import dynamic from "next/dynamic";
import { useTour } from "@/hooks/use-tour";
import { TourHelpButton } from "@/components/admin/tour-help-button";

// Dynamic import to avoid SSR issues with Leaflet
const LocationPicker = dynamic(
    () => import("@/components/ui/location-picker").then((mod) => mod.LocationPicker),
    { ssr: false, loading: () => <div className="h-[300px] rounded-md border bg-muted animate-pulse flex items-center justify-center">Cargando mapa...</div> }
);

interface EventFormProps {
    initialData?: Event;
}

export function EventForm({ initialData }: EventFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCats, setIsLoadingCats] = useState(true);
    const { startTour } = useTour();

    const form = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData || {
            title: "",
            slug: "",
            location: "",
            description: "",
            longDescription: "",
            imageUrl: "",
            category: "",
            start: new Date().toISOString(),
            end: new Date().toISOString(),
        },
    });

    const { watch, setValue } = form;
    const title = watch("title");
    const slug = watch("slug");

    // Load dynamic categories
    useEffect(() => {
        const load = async () => {
            const data = await getCategories("event");
            setCategories(data);
            setIsLoadingCats(false);
        };
        load();
    }, []);

    // Auto-slug logic
    useEffect(() => {
        if (!initialData) {
            // Only auto-update slug if it's empty or we want to force it
            // Here we prioritize user editing, so we only set it if the user hasn't typed a custom slug
            // But checking "if user hasn't typed" is hard without dirtiness state which might be complex.
            // Simplified: If slug is empty OR derived from title, update it.
            // For now, let's just make it React to title if slug is missing.
            if (title && !slug) {
                setValue("slug", slugify(title));
            }
        }
    }, [title, initialData, setValue, slug]);

    const handleStartGuide = () => {
        startTour([
            { element: '#tour-event-title', popover: { title: 'Título del Evento', description: 'El nombre visual de tu evento o reunión.', side: "bottom" } },
            { element: '#tour-event-location', popover: { title: 'Nombre del Lugar', description: 'Escribe el nombre. Ej: Hotel Cochabamba, Zoom.', side: "top" } },
            { element: '#tour-event-map', popover: { title: 'Ubicación Exacta', description: 'Usa este mini-mapa para poner la chincheta exacta para Google Maps.', side: "top" } },
            { element: '#tour-event-dates', popover: { title: 'Fechas y Horarios', description: 'Selecciona cuándo empieza y cuándo termina tu actividad.', side: "top" } },
            { element: '#tour-event-image', popover: { title: 'Flyer o Banner', description: 'Sube la imagen de promoción.', side: "top" } },
        ], "event-form", true);
    };

    useEffect(() => {
        if (!initialData) {
            startTour([
                { element: '#tour-event-title', popover: { title: 'Título del Evento', description: 'El nombre visual de tu evento o reunión.', side: "bottom" } },
                { element: '#tour-event-location', popover: { title: 'Nombre del Lugar', description: 'Escribe el nombre. Ej: Hotel Cochabamba, Zoom.', side: "top" } },
                { element: '#tour-event-map', popover: { title: 'Ubicación Exacta', description: 'Usa este mini-mapa para poner la chincheta exacta para Google Maps.', side: "top" } },
                { element: '#tour-event-dates', popover: { title: 'Fechas y Horarios', description: 'Selecciona cuándo empieza y cuándo termina tu actividad.', side: "top" } },
                { element: '#tour-event-image', popover: { title: 'Flyer o Banner', description: 'Sube la imagen de promoción.', side: "top" } },
            ], "event-form");
        }
    }, [initialData, startTour]);

    async function onSubmit(data: EventFormData) {
        startTransition(async () => {
            const result = initialData
                ? await updateEvent(initialData.id, data)
                : await createEvent(data);

            if (result?.error) {
                toast({
                    title: "Error",
                    description: typeof result.error === "string" ? result.error : "Error de validación.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "¡Éxito!",
                    description: initialData ? "El evento ha sido actualizado." : "El evento ha sido creado.",
                });
                router.push("/admin/eventos");
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
                        name="title"
                        render={({ field }) => (
                            <FormItem id="tour-event-title">
                                <FormLabel>Título</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Reunión Mensual..."
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            // Optional: Force update slug on title change if new
                                            if (!initialData) {
                                                const newSlug = slugify(e.target.value);
                                                // Only set if current slug is empty or matches previous title slug
                                                // Simply setting it here gives a nice realtime effect
                                                setValue("slug", newSlug);
                                            }
                                        }}
                                    />
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
                                    <Input placeholder="reunion-mensual" {...field} />
                                </FormControl>
                                <FormDescription>Se genera automáticamente, pero puedes editarlo.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>Categoría</FormLabel>
                                    <CategoriesModal 
                                        type="event" 
                                        trigger={
                                            <Button variant="ghost" size="sm" type="button" className="h-6 px-2 text-xs gap-1 text-primary">
                                                <PlusCircle className="h-3 w-3" />
                                                Gestionar
                                            </Button>
                                        } 
                                    />
                                </div>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={isLoadingCats ? "Cargando..." : "Seleccionar categoría"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.length === 0 && !isLoadingCats && (
                                            <div className="p-2 text-xs text-center text-muted-foreground">
                                                No hay categorías. Créalas primero.
                                            </div>
                                        )}
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.slug}>
                                                {cat.name}
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
                        name="location"
                        render={({ field }) => (
                            <FormItem id="tour-event-location">
                                <FormLabel>Ubicación (Nombre)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Hotel Cochabamba / Zoom / Virtual" {...field} />
                                </FormControl>
                                <FormDescription>Nombre del lugar donde se realizará el evento.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Map Location Picker */}
                <div id="tour-event-map" className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Ubicación en Mapa (Opcional)
                    </label>
                    <LocationPicker
                        latitude={watch("latitude")}
                        longitude={watch("longitude")}
                        onLocationChange={(lat, lng) => {
                            setValue("latitude", lat);
                            setValue("longitude", lng);
                        }}
                    />
                </div>

                <div id="tour-event-dates" className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <FormField
                        control={form.control}
                        name="start"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Inicio</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field}
                                        value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            field.onChange(date.toISOString());
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="end"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fin</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field}
                                        value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            field.onChange(date.toISOString());
                                        }}
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
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem id="tour-event-image">
                                <FormLabel>Imagen del Evento</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value || ""}
                                        onChange={(url) => {
                                            field.onChange(url);
                                            // Auto-generate imageAlt if empty when image is uploaded
                                            const currentAlt = form.getValues("imageAlt");
                                            if (!currentAlt && url) {
                                                const eventTitle = form.getValues("title");
                                                const category = form.getValues("category");
                                                const categoryNames: Record<string, string> = {
                                                    networking: "networking",
                                                    capacitacion: "capacitación",
                                                    social: "evento social",
                                                    otro: "evento"
                                                };
                                                const autoAlt = eventTitle
                                                    ? `${eventTitle} - ${categoryNames[category] || "evento"} CAMEBOL Cochabamba`
                                                    : "Evento CAMEBOL Cochabamba";
                                                form.setValue("imageAlt", autoAlt);
                                            }
                                        }}
                                        folder="events"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageAlt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Texto Alternativo (Alt Text)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descripción breve de la imagen para Google..." {...field} value={field.value || ""} />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Describe la imagen para accesibilidad y SEO. Ej: &quot;Grupo de empresarias en taller de liderazgo&quot;.
                                </FormDescription>
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
                            <FormLabel>Descripción Corta</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Breve resumen..." className="resize-none" {...field} />
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
                                <Textarea placeholder="Detalles completos..." className="h-32" {...field} value={field.value || ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="rounded-lg border p-4 bg-gray-50 space-y-6">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                        <span>🔍</span> Optimización SEO
                    </h3>

                    <SeoPreview
                        title={watch("metaTitle") || watch("title") || ""}
                        description={watch("metaDescription") || watch("description") || ""}
                        slug={watch("slug") || ""}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="metaTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Título (Auto-generado si vacío)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={watch("title") ? `${watch("title")} | CAMEBOL Cochabamba` : "Se generará del título"}
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        {!field.value && watch("title") && (
                                            <span className="text-green-600">✓ Se usará: &quot;{watch("title")} | CAMEBOL Cochabamba&quot;</span>
                                        )}
                                        {!field.value && !watch("title") && "Escribe un título primero para ver el auto-generado."}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meta Descripción (Opcional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Resumen atractivo para resultados de búsqueda..."
                                            className="h-20 resize-none"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Máximo 160 caracteres recommended.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Actualizar Evento" : "Crear Evento"}
                    </Button>

                    {initialData && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.open(`/eventos/${initialData.slug}`, '_blank')}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver en Web
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
