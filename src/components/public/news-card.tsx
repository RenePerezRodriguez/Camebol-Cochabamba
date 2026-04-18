'use client';

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import { News } from "@/lib/schemas/news";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
    news: News;
    priority?: boolean;
}

export function NewsCard({ news, priority = false }: NewsCardProps) {
    const formattedDate = format(new Date(news.publishedAt), "PPP", { locale: es });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Image Container */}
            <Link href={`/noticias/${news.slug}`} className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={news.imageUrl || "/img/placeholder-news.webp"}
                    alt={news.imageAlt || news.title}
                    fill
                    priority={priority}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-pink hover:bg-brand-pink/90 text-white border-none shadow-lg px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                        {news.category}
                    </Badge>
                </div>
                {news.isFeatured && (
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-amber-400 text-amber-950 border-none shadow-lg px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                            Destacado
                        </Badge>
                    </div>
                )}
            </Link>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-4 text-slate-500 text-xs mb-3 font-medium">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-pink" />
                        {formattedDate}
                    </span>
                </div>

                <Link href={`/noticias/${news.slug}`} className="block group/title">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover/title:text-brand-pink transition-colors line-clamp-2">
                        {news.title}
                    </h3>
                </Link>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {news.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                        <User className="w-3.5 h-3.5" />
                        {news.author}
                    </div>
                    
                    <Link 
                        href={`/noticias/${news.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-pink hover:gap-3 transition-all duration-300"
                    >
                        Leer más
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
