import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Shield, Image as ImageIcon, Search, Megaphone, LifeBuoy } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#5B0F75]">Centro de Ayuda</h2>
                <p className="text-muted-foreground">
                    Guía de referencia para administrar la plataforma Camebol Cochabamba.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-2 border-l-4 border-l-[#D61F69]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Megaphone className="h-5 w-5 text-[#D61F69]" />
                            Gestión de Banners y Avisos
                        </CardTitle>
                        <CardDescription>Cómo comunicar noticias importantes en la web pública.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Los banners aparecen en la parte superior de todas las páginas públicas. Úsalos con moderación para no saturar al visitante.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border rounded p-3 bg-blue-50">
                                <Badge className="bg-blue-600 mb-2 hover:bg-blue-700">INFO</Badge>
                                <p className="text-xs">Para comunicados generales. Ejs: &quot;Nuestras oficinas cierran por feriado&quot;.</p>
                            </div>
                            <div className="border rounded p-3 bg-yellow-50">
                                <Badge className="bg-yellow-500 text-black mb-2 hover:bg-yellow-600">ALERTA</Badge>
                                <p className="text-xs">Para avisos críticos o cambios de última hora. Ejs: &quot;Evento cancelado por lluvia&quot;.</p>
                            </div>
                            <div className="border rounded p-3 bg-green-50">
                                <Badge className="bg-green-600 mb-2 hover:bg-green-700">ÉXITO</Badge>
                                <p className="text-xs">Para celebrar logros. Ejs: &quot;¡Llegamos a las 1000 socias!&quot;.</p>
                            </div>
                            <div className="border rounded p-3 bg-pink-50">
                                <Badge className="bg-[#D61F69] mb-2 hover:bg-[#b01955]">PROMO</Badge>
                                <p className="text-xs">Ideal para marketing. Usa el color de la marca. Ejs: &quot;Inscripciones abiertas&quot;.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="h-5 w-5 text-[#5B0F75]" />
                            Imágenes y Multimedia
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-gray-600">
                        <p><strong>Formato ideal:</strong> JPG o WebP para fotos. PNG solo para logotipos con fondo transparente.</p>
                        <p><strong>Peso máximo:</strong> Intenta que ninguna imagen supere los 500KB para que la web cargue rápido.</p>
                        <p><strong>Dimensiones:</strong></p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                            <li>Eventos (Horizontal): 1200x630 px</li>
                            <li>Perfil de Socia (Cuadrada): 400x400 px</li>
                            <li>Logos de Empresas: 300x300 px</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5 text-green-600" />
                            SEO (Posicionamiento)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 text-gray-600">
                        <p>
                            Al crear un evento, verás una <strong>&quot;Vista Previa en Google&quot;</strong>.
                        </p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Título:</strong> Manténlo entre 50-60 caracteres. Debe ser llamativo.</li>
                            <li><strong>Descripción:</strong> Máximo 160 caracteres. Incluye palabras clave que la gente buscaría.</li>
                            <li><strong>Slug:</strong> Es la parte final de la URL. Se genera automático, pero puedes editarlo para hacerlo más limpio (ej: <code>cena-anual-2025</code>).</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Accordion type="single" collapsible className="w-full bg-white p-4 rounded-lg border shadow-sm">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-medium text-[#5B0F75]">¿Qué es el Modo Mantenimiento?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                        Es un &quot;interruptor de emergencia&quot; que encuentras en <strong>Configuración</strong>.
                        Al activarlo, la web pública mostrará una pantalla de &quot;En Construcción&quot;, bloqueando el acceso a visitantes.
                        <br /><br />
                        <strong>Nota importante:</strong> Tú como administrador SIEMPRE podrás ver la web normal aunque el mantenimiento esté activo. Para verificar qué ven los usuarios, usa una ventana de incógnito.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-medium text-[#5B0F75]">¿Quién puede ver los Logs de Auditoría?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                        Solo los administradores principales. Los logs registran automáticamente cada vez que alguien Crea, Edita o Elimina un Evento o Socia. Son inmutables (no se pueden borrar) para garantizar la seguridad.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-medium text-[#5B0F75]">¿Cómo descargo la lista de socias?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                        Ve a la sección <strong>Directorio</strong>. En la parte superior derecha de la tabla encontrarás un botón <strong>&quot;Exportar CSV&quot;</strong>. Este archivo se abre perfectamente en Excel.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Alert className="bg-slate-50 border-slate-200">
                <LifeBuoy className="h-4 w-4" />
                <AlertTitle>¿Necesitas soporte técnico?</AlertTitle>
                <AlertDescription>
                    Si encuentras un error crítico en el sistema (pantalla roja, funciones que no responden), contacta al desarrollador.
                    <br />
                    <span className="font-mono text-xs mt-2 block select-all">rene_perez@outlook.it</span>
                </AlertDescription>
            </Alert>
        </div>
    );
}
