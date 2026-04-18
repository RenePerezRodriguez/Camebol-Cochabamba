'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import { MEMBER_COMPANIES, EVENTS } from '@/lib/data';

// Mapeo de rutas a nombres más amigables
const breadcrumbNameMap: { [key: string]: string } = {
  '/quienes-somos': 'Nosotras',
  '/servicios': 'Servicios',
  '/asociadas': 'Asociadas',
  '/calendario': 'Actividades',
  '/afiliate': 'Afíliate',
  '/search': 'Búsqueda',
  '/preguntas-frecuentes': 'Preguntas Frecuentes',
  '/politica-de-privacidad': 'Política de Privacidad',
  '/politica-de-cookies': 'Política de Cookies',
  '/terminos-y-condiciones': 'Términos y Condiciones',
  '/quienes-somos/directorio': 'Directorio',
  '/quienes-somos/directiva': 'Directiva',
  '/quienes-somos/nuestro-equipo': 'Nuestro Equipo',
};


export function Breadcrumb() {
  const pathname = usePathname();
  
  // No mostrar en la página de inicio
  if (pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter((segment) => segment);

  const getDynamicName = (segment: string, fullPath: string) => {
    if (fullPath.startsWith('/asociadas/')) {
        const company = MEMBER_COMPANIES.find(c => c.slug === segment);
        return company ? company.name : segment;
    }
    if (fullPath.startsWith('/calendario/')) {
        const event = EVENTS.find(e => e.slug === segment);
        return event ? event.title : segment;
    }
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-muted/30 border-b">
      <div className="container py-2">
        <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
          <li>
            <div className="flex items-center">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Inicio</span>
              </Link>
            </div>
          </li>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            
            const dynamicName = getDynamicName(segment, href);
            const name = dynamicName || breadcrumbNameMap[href] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

            return (
              <li key={href}>
                <div className="flex items-center">
                  <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  <Link
                    href={href}
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(
                      'ml-1 hover:text-primary transition-colors line-clamp-1',
                      isLast ? 'font-medium text-foreground pointer-events-none' : ''
                    )}
                  >
                    {name}
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
