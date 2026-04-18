'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/layout/section-header';
import { ArrowRight, ArrowLeft, Mail, Search, LayoutGrid, List, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { CompaniesMap } from '@/components/asociadas/companies-map';
import { ViewSwitcher } from '@/components/shared/view-switcher';
import Image from 'next/image';
import { PaginationControls } from '@/components/shared/pagination-controls';
import { TextReveal } from '@/components/ui/text-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SectionDivider } from '@/components/ui/section-divider';

const ITEMS_PER_PAGE = 6;

interface AsociadasListProps {
    companies: any[]; // Replace 'any' with proper type from schema/types if available
}

export function AsociadasList({ companies }: AsociadasListProps) {
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const sectors = useMemo(() => {
        const allSectors = companies.map(company => company.sectorName);
        return ['Todos', ...Array.from(new Set(allSectors))];
    }, [companies]);

    const filteredCompanies = useMemo(() => {
        let filtered = companies;
        if (activeFilter !== 'Todos') {
            filtered = filtered.filter(company => company.sectorName === activeFilter);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(company =>
                company.name.toLowerCase().includes(term) ||
                company.sectorName.toLowerCase().includes(term) ||
                (company.description && company.description.toLowerCase().includes(term))
            );
        }
        return filtered;
    }, [activeFilter, searchTerm, companies]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1);
    }, [activeFilter, searchTerm]);

    const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
    const paginatedCompanies = filteredCompanies.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="relative overflow-hidden min-h-screen">
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
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Directorio Empresarial
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !font-headline leading-tight">
                        <TextReveal text="Nuestras Asociadas" />
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Conoce a las empresas y emprendedoras que forman parte de nuestra creciente comunidad.
                    </p>
                </div>

                <div className="mb-12 space-y-8 bg-background/50 backdrop-blur-sm p-6 rounded-3xl border border-white/10 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="relative md:col-span-2">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Buscar por nombre, rubro o descripción..."
                                className="pl-12 w-full h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary focus:ring-primary/20 transition-all shadow-sm"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-start md:justify-end">
                            <ViewSwitcher view={view} setView={setView} />
                        </div>
                    </div>
                    {/* Only show sector filter if there are sectors */}
                    {sectors.length > 2 && ( // 'Todos' + at least 2 sectors
                        <div className="flex justify-center flex-wrap gap-2">
                            {sectors.map(sector => (
                                <Button
                                    key={sector}
                                    variant={activeFilter === sector ? 'default' : 'outline'}
                                    onClick={() => setActiveFilter(sector)}
                                    className={cn("rounded-full px-6 transition-all", activeFilter === sector ? "shadow-md scale-105" : "hover:bg-primary/5")}
                                >
                                    {sector}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>

                {view === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {paginatedCompanies.map((company, index) => (
                            <div
                                key={company.id || company.slug}
                                className={cn('opacity-0 animate-fade-in-down')}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Card className="h-full overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2 group bg-background/60 backdrop-blur-sm border-0 ring-1 ring-white/10 hover:ring-primary/30">
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <div className="block h-full w-full">
                                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            {company.logoUrl ? (
                                                <Image
                                                    src={company.logoUrl}
                                                    alt={`Logo de ${company.name}`}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110 blur-sm opacity-50"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary/30">CAMEBOL</div>
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                                            <div className="relative w-16 h-16 border-2 border-white/50 rounded-xl overflow-hidden shadow-lg bg-white rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                                {company.logoUrl ? (
                                                    <Image
                                                        src={company.logoUrl}
                                                        alt={`Logo de ${company.name}`}
                                                        fill
                                                        className="object-contain p-1"
                                                        sizes="64px"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-center p-1">Sin Logo</div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Diamond Overlay Effect */}
                                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-background/10 backdrop-blur-md rotate-45 z-10 group-hover:scale-150 transition-transform duration-500 border border-white/20" />
                                    </div>

                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-30 translate-x-4 group-hover:translate-x-0 duration-300">
                                        <Button size="icon" className="w-10 h-10 rounded-full shadow-lg" asChild>
                                            <a href={`mailto:${company.email || 'info@camebol.org'}`}>
                                                <Mail className="h-5 w-5" />
                                            </a>
                                        </Button>
                                    </div>

                                    <CardContent className="p-6 relative">
                                        <Link href={`/asociadas/${company.slug}`} className="absolute inset-0 z-20">
                                            <span className="sr-only">Ver perfil de {company.name}</span>
                                        </Link>
                                        <Badge variant="secondary" className="mb-3 hover:bg-secondary hover:text-white transition-colors relative z-30">{company.sectorName}</Badge>
                                        <h3 className="text-xl font-bold !font-headline text-foreground mb-3 group-hover:text-primary transition-colors leading-tight relative z-10">{company.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed relative z-10">
                                            {company.description}
                                        </p>
                                        <MagneticButton>
                                            <Button variant="link" className="p-0 h-auto text-primary group/btn relative z-10" asChild>
                                                <span>
                                                    Ver Perfil <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                                </span>
                                            </Button>
                                        </MagneticButton>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 mb-12">
                        {paginatedCompanies.map((company, index) => (
                            <div
                                key={company.id || company.slug}
                                className={cn('opacity-0 animate-fade-in-down')}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Card className="hover:shadow-lg hover:border-primary/30 transition-all duration-300 bg-background/60 backdrop-blur-sm group">
                                    <CardContent className="p-4 flex items-center gap-6 relative">
                                        <Link href={`/asociadas/${company.slug}`} className="absolute inset-0 z-10">
                                            <span className="sr-only">Ver perfil de {company.name}</span>
                                        </Link>
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-border/50 bg-white group-hover:scale-105 transition-transform duration-300">
                                            {company.logoUrl ? (
                                                <Image
                                                    src={company.logoUrl}
                                                    alt={`Logo de ${company.name}`}
                                                    fill
                                                    className="object-contain p-2"
                                                    sizes="80px"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-center p-1">Sin Logo</div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold !font-headline text-foreground group-hover:text-primary transition-colors mb-1">{company.name}</h3>
                                            <Badge variant="outline" className="bg-background/50 relative z-20">{company.sectorName}</Badge>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button size="sm" variant="outline" className="rounded-full hover:bg-primary/5 hover:text-primary hover:border-primary/30 relative z-20" asChild>
                                                <a href={`mailto:${company.email || 'info@camebol.org'}`}>
                                                    <Mail className="mr-2 h-4 w-4" /> Contactar
                                                </a>
                                            </Button>
                                            <MagneticButton>
                                                <Button size="sm" className="rounded-full relative z-20" asChild>
                                                    <span>
                                                        Ver Perfil <ArrowRight className="ml-2 h-4 w-4" />
                                                    </span>
                                                </Button>
                                            </MagneticButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}

                {filteredCompanies.length === 0 && (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/20 mb-12">
                        <Search className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                        <p className="text-xl text-muted-foreground">No se encontraron asociadas que coincidan con tu búsqueda.</p>
                    </div>
                )}

                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                <div className="mt-24">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold !font-headline mb-4">Ubicación de Nuestras Asociadas</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Encuentra a nuestras empresas afiliadas en el mapa.</p>
                    </div>
                    <Card className="overflow-hidden shadow-2xl border-0 ring-4 ring-background/50 rounded-3xl">
                        <div className="h-[500px] w-full relative">
                            {/* Map Overlay Gradient */}
                            <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]" />
                            <CompaniesMap companies={companies} />
                        </div>
                    </Card>
                </div>

            </div>
            <SectionDivider />
        </div>
    );
}
