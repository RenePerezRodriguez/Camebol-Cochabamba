import { getAdminNews } from "@/actions/news";
import { Button } from "@/components/ui/button";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Newspaper, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import { NewsRowActions } from "@/components/admin/news-row-actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CategoriesModal } from "@/components/admin/categories-modal";

export const dynamic = "force-dynamic";

export default async function NoticiasPage() {
    const newsItems = await getAdminNews();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Newspaper className="h-8 w-8 text-primary" />
                        Noticias y Publicaciones
                    </h1>
                    <p className="text-muted-foreground">
                        Gestiona los artículos, comunicados y noticias de la cámara.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <CategoriesModal type="news" />
                    <Button asChild>
                        <Link href="/admin/noticias/nuevo">
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Publicación
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[400px]">Título</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {newsItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    No hay noticias publicadas. Crea la primera para empezar.
                                </TableCell>
                            </TableRow>
                        ) : (
                            newsItems.map((item: any) => (
                                <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{item.title}</span>
                                            <span className="text-xs text-muted-foreground font-normal truncate max-w-[300px]">
                                                {item.slug}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize bg-blue-50 text-blue-700 border-blue-200 flex w-fit items-center gap-1 font-normal">
                                            <Tag className="h-3 w-3" />
                                            {item.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {format(new Date(item.publishedAt), "PPp", { locale: es })}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={item.status === 'published' ? 'default' : 'secondary'}
                                            className={item.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200'}
                                        >
                                            {item.status === 'published' ? 'Publicado' : 'Borrador'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                                            {item.author}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <NewsRowActions news={item} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
