"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sector } from "@/lib/schemas/sector";
import { slugify } from "@/lib/utils";
import { ArrowRight, Briefcase, Search, Sparkles } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";

import { Associate } from "@/lib/schemas/associate";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import { LayoutGrid, Building2, Map as MapIcon } from "lucide-react";

const AssociatesMap = dynamic(() => import('@/components/asociadas/associates-map'), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-muted/20 animate-pulse rounded-lg" />
});

interface SectorsGridProps {
    sectors: Sector[];
    companies: Associate[];
}

export function SectorsGrid({ sectors, companies }: SectorsGridProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<'sectors' | 'companies'>('sectors');

    const filteredSectors = sectors.filter(sector =>
        sector.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCompanies = searchTerm ? companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="relative overflow-hidden min-h-screen bg-background selection:bg-primary/20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Floating Diamonds Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[15%] left-[5%] w-24 h-24 border border-primary/10 rotate-45 opacity-20 animate-float" />
                <div className="absolute top-[40%] right-[10%] w-32 h-32 border border-secondary/10 rotate-45 opacity-20 animate-float-delayed" />
                <div className="absolute bottom-[20%] left-[15%] w-16 h-16 bg-primary/5 rotate-45 opacity-20 animate-float" />
            </div>

            <div className="container py-16 md:py-24 relative">
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 ring-1 ring-primary/20 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        Directorio Empresarial
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold !font-headline leading-tight tracking-tight">
                        <TextReveal text="Explora por Rubros" />
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Descubre las empresas líderes de Cochabamba organizadas por sectores.
                        <span className="block mt-2 text-primary font-medium">Conectando talento con oportunidades.</span>
                    </p>

                    <div className="max-w-md mx-auto relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Buscar empresa o rubro..."
                                className="pl-12 h-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-sm focus:ring-primary/20 focus:border-primary shadow-sm hover:shadow-md transition-all duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8 gap-2">
                    <Button
                        variant={viewMode === 'sectors' ? 'default' : 'outline'}
                        onClick={() => setViewMode('sectors')}
                        className={cn("rounded-full px-6 gap-2", viewMode === 'sectors' && "shadow-md")}
                    >
                        <LayoutGrid className="w-4 h-4" />
                        Rubros
                    </Button>
                    <Button
                        variant={viewMode === 'companies' ? 'default' : 'outline'}
                        onClick={() => setViewMode('companies')}
                        className={cn("rounded-full px-6 gap-2", viewMode === 'companies' && "shadow-md")}
                    >
                        <Building2 className="w-4 h-4" />
                        Todas las Empresas
                    </Button>
                </div>




                {searchTerm && filteredCompanies.length > 0 && (
                    <div className="mb-12 animate-fade-in space-y-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold !font-headline">Empresas</h2>
                            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                {filteredCompanies.length}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCompanies.map((company, index) => (
                                <div
                                    key={company.id}
                                    className="opacity-0 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <Link href={`/asociadas/${company.slug}`} className="group block h-full">
                                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden hover:-translate-y-1 hover:ring-primary/30">
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-border/50 bg-white group-hover:scale-105 transition-transform duration-300">
                                                    {company.logoUrl ? (
                                                        <Image
                                                            src={company.logoUrl}
                                                            alt={`Logo de ${company.name}`}
                                                            fill
                                                            className="object-contain p-1"
                                                            sizes="64px"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] text-center p-1 text-muted-foreground">Sin Logo</div>
                                                    )}
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <h3 className="text-base font-bold !font-headline text-foreground group-hover:text-primary transition-colors truncate">{company.name}</h3>
                                                    <p className="text-xs text-muted-foreground truncate">{company.sectorName}</p>
                                                </div>
                                                <div className="flex-shrink-0 text-primary/20 group-hover:text-primary transition-colors">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {filteredSectors.length > 0 && (
                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-border/50"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-background px-3 text-sm text-muted-foreground">Rubros relacionados</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!searchTerm && viewMode === 'companies' && (
                    <div className="mb-12 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {companies.map((company, index) => (
                                <div
                                    key={company.id}
                                    className="opacity-0 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 20}ms` }}
                                >
                                    <Link href={`/asociadas/${company.slug}`} className="group block h-full">
                                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden hover:-translate-y-1 hover:ring-primary/30">
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-border/50 bg-white group-hover:scale-105 transition-transform duration-300">
                                                    {company.logoUrl ? (
                                                        <Image
                                                            src={company.logoUrl}
                                                            alt={`Logo de ${company.name}`}
                                                            fill
                                                            className="object-contain p-1"
                                                            sizes="64px"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] text-center p-1 text-muted-foreground">Sin Logo</div>
                                                    )}
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <h3 className="text-base font-bold !font-headline text-foreground group-hover:text-primary transition-colors truncate">{company.name}</h3>
                                                    <p className="text-xs text-muted-foreground truncate">{company.sectorName}</p>
                                                </div>
                                                <div className="flex-shrink-0 text-primary/20 group-hover:text-primary transition-colors">
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", (!searchTerm && viewMode !== 'sectors') && "hidden")}>
                    {filteredSectors.map((sector, index) => (
                        <div
                            key={sector.id}
                            className={cn('opacity-0 animate-fade-in-up')}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <Link
                                href={`/asociadas/rubro/${slugify(sector.name)}`}
                                className="group block h-full"
                            >
                                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-background/40 backdrop-blur-lg ring-1 ring-white/10 overflow-hidden hover:-translate-y-2 group-hover:ring-primary/30">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <CardContent className="p-8 flex flex-col items-center text-center h-full justify-center gap-6 relative z-10">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-background to-white/50 ring-1 ring-white/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                                                <Briefcase className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-bold text-xl !font-headline group-hover:text-primary transition-colors leading-tight">
                                                {sector.name}
                                            </h3>
                                            <div className="w-12 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                        </div>

                                        <div className="mt-auto pt-2">
                                            <MagneticButton>
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </MagneticButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>

                {filteredSectors.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Search className="w-10 h-10 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl font-medium text-muted-foreground">No se encontraron rubros</h3>
                        <p className="text-sm text-muted-foreground/70 mt-2">Intenta con otro término de búsqueda</p>
                    </div>
                )}


                <div className="mt-24">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold !font-headline mb-4 flex items-center justify-center gap-2">
                            <MapIcon className="w-8 h-8 text-primary" />
                            Mapa de Asociadas
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Explora la ubicación de nuestras empresas afiliadas en Cochabamba.</p>
                    </div>
                    <Card className="overflow-hidden shadow-2xl border-0 ring-4 ring-background/50 rounded-3xl bg-background/50 backdrop-blur-sm">
                        <div className="h-[500px] w-full relative">
                            <AssociatesMap companies={companies} />
                        </div>
                    </Card>
                </div>
            </div>
        </div >
    );
}
