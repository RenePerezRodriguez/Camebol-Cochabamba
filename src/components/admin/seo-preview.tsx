"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SeoPreviewProps {
    title: string;
    description: string;
    slug: string;
}

export function SeoPreview({ title, description, slug }: SeoPreviewProps) {
    const baseUrl = "https://camebolcochabamba.org.bo/eventos/";
    const fullUrl = `${baseUrl}${slug || "mi-evento-increible"}`;

    // Titles commonly cut off around 60 chars. Descs around 160.
    const titleLength = title?.length || 0;
    const descLength = description?.length || 0;

    const titleScore = titleLength > 10 && titleLength <= 60 ? 100 : titleLength > 60 ? 60 : 40;
    const descScore = descLength > 50 && descLength <= 160 ? 100 : descLength > 160 ? 60 : 30;

    // Simple color logic
    const getProgressColor = (score: number) => {
        if (score >= 80) return "bg-green-500";
        if (score >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Vista Previa en Google (Simulación)
            </h3>

            <Card className="p-4 bg-white border border-gray-100 shadow-sm">
                <div className="font-sans">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="bg-gray-100 rounded-full p-1">
                            <img src="/favicon.ico" alt="" className="w-4 h-4 object-contain opacity-50" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-700">Camebol Cochabamba</span>
                            <span className="text-[10px] text-gray-500">{fullUrl}</span>
                        </div>
                    </div>
                    <h4 className="text-[#1a0dab] text-xl font-normal hover:underline cursor-pointer truncate">
                        {title || "Título del Evento | CAMEBOL"}
                    </h4>
                    <p className="text-sm text-[#4d5156] mt-1 line-clamp-2">
                        {description || "Aquí aparecerá la descripción de tu evento. Asegúrate de incluir palabras clave relevantes para atraer a más asistentes..."}
                    </p>
                </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Longitud del Título ({titleLength} caracteres)</span>
                    </div>
                    <Progress
                        value={Math.min((titleLength / 60) * 100, 100)}
                        className="h-1.5 [&>div]:bg-brand-pink/60"
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Longitud Descripción ({descLength} caracteres)</span>
                    </div>
                    <Progress
                        value={Math.min((descLength / 160) * 100, 100)}
                        className="h-1.5 [&>div]:bg-brand-pink/60"
                    />
                </div>
            </div>
        </div>
    );
}
