'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/schemas/category";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface NewsFiltersProps {
    categories: Category[];
}

export function NewsFilters({ categories }: NewsFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("categoria") || "all";

    const handleCategoryClick = (slug: string) => {
        const params = new URLSearchParams(searchParams);
        if (slug === "all") {
            params.delete("categoria");
        } else {
            params.set("categoria", slug);
        }
        router.push(`/noticias?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="w-full mb-8">
            <ScrollArea className="w-full whitespace-nowrap pb-2">
                <div className="flex w-max space-x-3 p-1">
                    <Button
                        variant={currentCategory === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCategoryClick("all")}
                        className={cn(
                            "rounded-full px-5 font-medium transition-all",
                            currentCategory === "all" ? "bg-brand-pink hover:bg-brand-pink/90 text-white border-none shadow-md" : "text-slate-600 border-slate-200 hover:border-brand-pink/30 hover:text-brand-pink"
                        )}
                    >
                        Todas
                    </Button>
                    
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={currentCategory === cat.slug ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleCategoryClick(cat.slug)}
                            className={cn(
                                "rounded-full px-5 font-medium transition-all",
                                currentCategory === cat.slug ? "bg-brand-pink hover:bg-brand-pink/90 text-white border-none shadow-md" : "text-slate-600 border-slate-200 hover:border-brand-pink/30 hover:text-brand-pink"
                            )}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
        </div>
    );
}
