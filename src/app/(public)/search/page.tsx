'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { NAV_LINKS, SERVICES, EVENTS, MEMBER_COMPANIES } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { FileText, Briefcase, Calendar, Users, ArrowRight, Search } from 'lucide-react';
import { SectionHeader } from '@/components/layout/section-header';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { SectionDivider } from '@/components/ui/section-divider';

type SearchResult = {
  type: 'Página' | 'Servicio' | 'Evento' | 'Miembro';
  title: string;
  description: string;
  href: string;
  Icon: React.ElementType;
};

function SearchPageComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const allResults: SearchResult[] = [];

      // Buscar en páginas
      NAV_LINKS.forEach((link) => {
        if (link.label.toLowerCase().includes(lowerCaseQuery)) {
          allResults.push({
            type: 'Página',
            title: link.label,
            description: `Navega a la página de ${link.label}.`,
            href: link.href,
            Icon: FileText,
          });
        }
      });

      // Buscar en servicios
      SERVICES.forEach((service) => {
        if (service.title.toLowerCase().includes(lowerCaseQuery) || service.description.toLowerCase().includes(lowerCaseQuery)) {
          allResults.push({
            type: 'Servicio',
            title: service.title,
            description: service.description,
            href: `/servicios#${service.id}`,
            Icon: Briefcase,
          });
        }
      });

      // Buscar en eventos
      EVENTS.forEach((event) => {
        if (event.title.toLowerCase().includes(lowerCaseQuery) || event.description.toLowerCase().includes(lowerCaseQuery)) {
          allResults.push({
            type: 'Evento',
            title: event.title,
            description: isClient ? `${format(event.start, "d 'de' MMMM, yyyy", { locale: es })} - ${event.location}` : 'Cargando fecha...',
            href: `/calendario/${event.slug}`,
            Icon: Calendar,
          });
        }
      });

      // Buscar en miembros
      MEMBER_COMPANIES.forEach((company) => {
        if (company.name.toLowerCase().includes(lowerCaseQuery) || company.sector.toLowerCase().includes(lowerCaseQuery)) {
          allResults.push({
            type: 'Miembro',
            title: company.name,
            description: `Sector: ${company.sector}`,
            href: `/asociadas/${company.slug}`,
            Icon: Users,
          });
        }
      });

      // Eliminar duplicados por título y tipo
      const uniqueResults = allResults.filter((result, index, self) =>
        index === self.findIndex((r) => (
          r.title === result.title && r.type === result.type
        ))
      );

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(uniqueResults);
    }
  }, [query, isClient]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container py-16 md:py-24 relative z-10">
        <SectionHeader
          title="Resultados de Búsqueda"
          subtitle={query ? `Mostrando resultados para: "${query}"` : 'Realiza una búsqueda para encontrar contenido.'}
          className="mb-12"
        />

        {query && results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <Link href={result.href} key={index} className="block group h-full">
                <Card className="h-full border-0 shadow-lg bg-background/60 backdrop-blur-md ring-1 ring-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-background/80">
                  <CardHeader className="flex-row items-start gap-4 pb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 rotate-45 group-hover:rotate-0 transition-transform duration-300">
                      <result.Icon className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge variant="secondary" className="mb-2 text-xs">{result.type}</Badge>
                      <CardTitle className="text-lg !font-headline truncate group-hover:text-primary transition-colors">{result.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 mb-4">{result.description}</CardDescription>
                    <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      Ver detalle <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-background/40 backdrop-blur-sm rounded-3xl border border-white/10">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-xl font-medium text-foreground mb-2">{query ? 'No se encontraron resultados.' : 'Escribe algo en la barra de búsqueda.'}</p>
            {query && <p className="text-muted-foreground">Intenta con otros términos de búsqueda.</p>}
          </div>
        )}
      </div>
      <SectionDivider />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-pulse text-primary font-medium">Cargando resultados...</div></div>}>
      <SearchPageComponent />
    </Suspense>
  )
}
