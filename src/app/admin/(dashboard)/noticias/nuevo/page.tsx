import { NewsForm } from "@/components/admin/news-form";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Newspaper } from "lucide-react";
import Link from "next/link";

export default function NuevaNoticiaPage() {
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
                        Nueva Noticia
                    </h1>
                    <p className="text-muted-foreground">
                        Crea una nueva publicación para el sitio web.
                    </p>
                </div>
            </div>

            <Card className="border shadow-md">
                <CardHeader className="bg-slate-50/50">
                    <CardTitle>Redactar Publicación</CardTitle>
                    <CardDescription>
                        Completa todos los campos para publicar o guardar un borrador.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <NewsForm />
                </CardContent>
            </Card>
        </div>
    );
}
