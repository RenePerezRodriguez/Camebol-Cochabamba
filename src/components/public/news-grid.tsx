'use client';

import { News } from "@/lib/schemas/news";
import { NewsCard } from "./news-card";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

interface NewsGridProps {
    news: News[];
}

export function NewsGrid({ news }: NewsGridProps) {
    if (news.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="bg-slate-50 p-6 rounded-full mb-6">
                    <Newspaper className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No se encontraron noticias</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                    Prueba seleccionando otra categoría o vuelve más tarde para ver nuevas publicaciones.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
                <NewsCard 
                    key={item.id} 
                    news={item} 
                    priority={index < 3} 
                />
            ))}
        </div>
    );
}
