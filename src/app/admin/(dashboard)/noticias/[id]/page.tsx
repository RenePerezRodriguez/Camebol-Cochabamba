import { getNewsById } from "@/actions/news";
import { NewsForm } from "@/components/admin/news-form";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Newspaper, AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditNoticiaPageProps {
    params: {
        id: string;
    };
}

export default async function EditNoticiaPage({ params }: EditNoticiaPageProps) {
    const { id } = await params;
    const news = await getNewsById(id);

    if (!news) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border shadow-sm h-96">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-xl font-bold">Noticia no encontrada</h2>
                <p className="text-muted-foreground mb-6">El artículo solicitado no existe o ha sido eliminado.</p>
                <Button asChild>
                    <Link href="/admin/noticias">Volver al Listado</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/noticias">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Newspaper className="h-8 w-8 text-primary" />
                        Editar Noticia
                    </h1>
                    <p className="text-muted-foreground">
                        Modifica el contenido de la publicación seleccionada.
                    </p>
                </div>
            </div>

            <Card className="border shadow-md">
                <CardHeader className="bg-slate-50/50">
                    <CardTitle>Detalles del Artículo</CardTitle>
                    <CardDescription>
                        Editando: <strong>{news.title}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <NewsForm initialData={news as any} />
                </CardContent>
            </Card>
        </div>
    );
}
