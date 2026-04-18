"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema, NewsFormData, type News } from "@/lib/schemas/news";
import { createNews, updateNews } from "@/actions/news";
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
import { Switch } from "@/components/ui/switch";
import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, Layout, PlusCircle } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { cn, slugify } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { SeoPreview } from "@/components/admin/seo-preview";
import { getCategories } from "@/actions/categories";
import { Category } from "@/lib/schemas/category";
import { CategoriesModal } from "@/components/admin/categories-modal";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea";
import { Progress } from "@/components/ui/progress";
import { useTour } from "@/hooks/use-tour";
import { TourHelpButton } from "@/components/admin/tour-help-button";

interface NewsFormProps {
    initialData?: News;
}

export function NewsForm({ initialData }: NewsFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCats, setIsLoadingCats] = useState(true);
    const { startTour } = useTour();

    const form = useForm<NewsFormData>({
        resolver: zodResolver(newsSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            excerpt: initialData?.excerpt || "",
            content: initialData?.content || "",
            imageUrl: initialData?.imageUrl || "",
            imageAlt: initialData?.imageAlt || "",
            category: initialData?.category || "",
            author: initialData?.author || "CAMEBOL Cochabamba",
            publishedAt: initialData?.publishedAt 
                ? new Date(initialData.publishedAt).toISOString()
                : new Date().toISOString(),
            status: initialData?.status || "published",
            isFeatured: initialData?.isFeatured || false,
            metaTitle: initialData?.metaTitle || "",
            metaDescription: initialData?.metaDescription || "",
        },
    });

    // Smart SEO Sync States
    const [isSlugCustom, setIsSlugCustom] = useState(!!initialData?.slug);
    const [isMetaTitleCustom, setIsMetaTitleCustom] = useState(!!initialData?.metaTitle);
    const [isMetaDescriptionCustom, setIsMetaDescriptionCustom] = useState(!!initialData?.metaDescription);

    const { watch, setValue } = form;
    const title = watch("title");
    const slug = watch("slug");

    // Load dynamic categories
    const loadCategories = async () => {
        const data = await getCategories("news");
        setCategories(data);
        setIsLoadingCats(false);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    // Auto-slug logic deleted as it is handled by title field onChange for better control

    // 6. Draft logic (localStorage)
    const DRAFT_KEY = "news_form_draft";

    useEffect(() => {
        if (!initialData) {
            const savedDraft = localStorage.getItem(DRAFT_KEY);
            if (savedDraft) {
                try {
                    const parsed = JSON.parse(savedDraft);
                    Object.keys(parsed).forEach((key) => {
                        form.setValue(key as any, parsed[key]);
                    });
                    toast({
                        title: "Borrador recuperado",
                        description: "Hemos restaurado tu progreso anterior.",
                    });
                } catch (e) {
                    console.error("Error parsing draft", e);
                }
            }
        }
    }, [initialData, form, toast]);

    useEffect(() => {
        if (!initialData) {
            const subscription = form.watch((value) => {
                localStorage.setItem(DRAFT_KEY, JSON.stringify(value));
            });
            return () => subscription.unsubscribe();
        }
    }, [form, initialData]);

    const handleStartGuide = () => {
        startTour([
            { element: '#tour-news-title', popover: { title: 'Título de la Noticia', description: 'Escribe un título llamativo. La URL (Slug) se generará sola.', side: "bottom" } },
            { element: '#tour-news-excerpt', popover: { title: 'Resumen o Bajada', description: 'Este pequeño texto aparece en las tarjetas de la página principal. Intenta no pasarte de los 200 caracteres.', side: "top" } },
            { element: '#tour-news-content', popover: { title: 'Redactor Principal', description: 'Usa este editor avanzado. Puedes añadir negritas, listas para los hitos e incluso subir e insertar fotos directo dentro del texto.', side: "top" } },
            { element: '#tour-news-image', popover: { title: 'Imagen de Portada', description: 'Sube la foto destacada. El sistema la convertirá a formato WebP moderno para que cargue rapidísimo.', side: "left" } },
            { element: '#tour-news-seo', popover: { title: 'Ajustes de SEO', description: 'Google lee esto. CAMEBOL te mostrará una vista previa de cómo se verá el link cuando las personas lo compartan por WhatsApp.', side: "top" } },
        ], "news-form", true); // force=true para el botón manual
    };

    // Auto-arranque solo si es noticia nueva
    useEffect(() => {
        if (!initialData) {
            startTour([
                { element: '#tour-news-title', popover: { title: 'Título de la Noticia', description: 'Escribe un título llamativo. La URL (Slug) se generará sola.', side: "bottom" } },
                { element: '#tour-news-excerpt', popover: { title: 'Resumen o Bajada', description: 'Este pequeño texto aparece en las tarjetas de la página principal. Intenta no pasarte de los 200 caracteres.', side: "top" } },
                { element: '#tour-news-content', popover: { title: 'Redactor Principal', description: 'Usa este editor avanzado. Puedes añadir negritas, listas para los hitos e incluso subir e insertar fotos directo dentro del texto.', side: "top" } },
                { element: '#tour-news-image', popover: { title: 'Imagen de Portada', description: 'Sube la foto destacada. El sistema la convertirá a formato WebP moderno para que cargue rapidísimo.', side: "left" } },
                { element: '#tour-news-seo', popover: { title: 'Ajustes de SEO', description: 'Google lee esto. CAMEBOL te mostrará una vista previa de cómo se verá el link cuando las personas lo compartan por WhatsApp.', side: "top" } },
            ], "news-form");
        }
    }, [initialData, startTour]);

    async function onSubmit(data: NewsFormData) {
        startTransition(async () => {
            const result = initialData
                ? await updateNews(initialData.id, data)
                : await createNews(data);

            if (result?.error) {
                toast({
                    title: "Error",
                    description: typeof result.error === "string" ? result.error : "Error de validación.",
                    variant: "destructive",
                });
            } else {
                if (!initialData) {
                    localStorage.removeItem(DRAFT_KEY);
                }
                toast({
                    title: "¡Éxito!",
                    description: initialData ? "La noticia ha sido actualizada." : "La noticia ha sido creada.",
                });
                router.push("/admin/noticias");
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
                            <FormItem id="tour-news-title">
                                <FormLabel>Título de la Noticia</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Título impactante..."
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            // Auto-sync Slug and Meta Title if not custom
                                            if (!isSlugCustom) {
                                                setValue("slug", slugify(e.target.value));
                                            }
                                            if (!isMetaTitleCustom) {
                                                setValue("metaTitle", e.target.value);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Slug managed automatically in SEO section below */}

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>Categoría</FormLabel>
                                    <CategoriesModal 
                                        type="news" 
                                        onSuccess={loadCategories}
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

                    {/* Author is hidden as it is always CAMEBOL Cochabamba */}

                    <FormField
                        control={form.control}
                        name="publishedAt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Publicación</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="datetime-local" 
                                        {...field}
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
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Estado de publicación" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="draft">Borrador</SelectItem>
                                        <SelectItem value="published">Publicado</SelectItem>
                                    </SelectContent>
                                </Select>
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
                            <FormItem id="tour-news-image">
                                <FormLabel>Imagen Principal (WebP)</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value || ""}
                                        onChange={(url) => {
                                            field.onChange(url);
                                            if (!form.getValues("imageAlt")) {
                                                form.setValue("imageAlt", watch("title"));
                                            }
                                        }}
                                        folder="news"
                                    />
                                </FormControl>
                                <FormDescription>Se optimizará automáticamente a WebP.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageAlt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción de Imagen (SEO)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descriptivo de la imagen..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                        <FormItem id="tour-news-excerpt">
                            <div className="flex items-center justify-between">
                                <FormLabel>Resumen (Para el listado)</FormLabel>
                                <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                    {field.value?.length || 0} / 200 caracteres
                                </div>
                            </div>
                            <FormControl>
                                <AutoResizeTextarea 
                                    placeholder="Breve introducción de la noticia..." 
                                    {...field} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        // Auto-sync Meta Description if not custom
                                        if (!isMetaDescriptionCustom) {
                                            setValue("metaDescription", e.target.value);
                                        }
                                    }}
                                />
                            </FormControl>
                            <Progress 
                                value={((field.value?.length || 0) / 200) * 100} 
                                className={cn(
                                    "h-1 transition-all",
                                    (field.value?.length || 0) > 180 ? "bg-red-100 [&>div]:bg-red-500" : (field.value?.length || 0) > 150 ? "bg-amber-100 [&>div]:bg-amber-500" : ""
                                )}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem id="tour-news-content">
                            <FormLabel>Contenido Principal</FormLabel>
                            <FormControl>
                                <RichTextEditor 
                                    value={field.value} 
                                    onChange={field.onChange} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Destacar noticia</FormLabel>
                                <FormDescription>
                                    Mostrar permanentemente en la sección destacada del Home.
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

                <div id="tour-news-seo" className="rounded-lg border p-4 bg-gray-50 space-y-6">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                        <Layout className="h-4 w-4" /> Optimización SEO
                    </h3>

                    <SeoPreview
                        title={watch("metaTitle") || watch("title") || ""}
                        description={watch("metaDescription") || watch("excerpt") || ""}
                        slug={watch("slug") || ""}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug (URL Automático)</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="url-de-la-noticia"
                                            className="font-mono text-xs" 
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setIsSlugCustom(true);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="metaTitle"
                            render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meta Título (Google)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Título SEO..."
                                                {...field}
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setIsMetaTitleCustom(true);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                            )}
                        />
                        <div className="md:col-span-2">
                            <FormField
                                control={form.control}
                                name="metaDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meta Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Resumen atractivo para búsquedas..."
                                                className="h-20 resize-none"
                                                {...field}
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setIsMetaDescriptionCustom(true);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Actualizar Noticia" : "Publicar Noticia"}
                    </Button>
                    
                    {initialData && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.open(`/noticias/${initialData.slug}`, '_blank')}
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            Previsualizar
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
