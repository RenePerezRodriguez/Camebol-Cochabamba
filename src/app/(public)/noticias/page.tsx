import { getCategories } from "@/actions/categories";
import { getPublishedNews } from "@/actions/news";
import { NewsGrid } from "@/components/public/news-grid";
import { NewsFilters } from "@/components/public/news-filters";
import { SectionHeader } from "@/components/layout/section-header";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Noticias y Actualidad | CAMEBOL Cochabamba",
    description: "Mantente al tanto de las últimas noticias, eventos y logros de la Cámara de Mujeres Empresarias de Cochabamba.",
};

interface NewsPageProps {
    searchParams: Promise<{ categoria?: string }>;
}

export default async function NewsListingPage({ searchParams }: NewsPageProps) {
    const { categoria } = await searchParams;
    
    // Fetch data in parallel
    const [news, categories] = await Promise.all([
        getPublishedNews(categoria),
        getCategories("news"),
    ]);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <SectionHeader 
                    title={
                        <span className="text-slate-900 uppercase">
                            Noticias <span className="text-brand-pink">&</span> Actualidad
                        </span>
                    } 
                    subtitle="Infórmate sobre las actividades, logros y novedades de nuestra comunidad de mujeres líderes en Cochabamba."
                />

                <div className="max-w-7xl mx-auto">
                    {/* Filters Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-slate-100 pb-6">
                        <div className="text-sm text-slate-500 font-medium whitespace-nowrap">
                            Filtrar por categoría:
                        </div>
                        <Suspense fallback={<div className="h-10 w-32 animate-pulse bg-slate-100 rounded-lg" />}>
                            <NewsFilters categories={categories} />
                        </Suspense>
                    </div>

                    {/* News Grid Section */}
                    <NewsGrid news={news} />
                </div>
            </div>
        </section>
    );
}
