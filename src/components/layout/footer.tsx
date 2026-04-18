'use client';

import * as React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, XIcon, Youtube } from 'lucide-react';
import { FOOTER_DATA, NAV_LINKS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { SectionDivider } from '@/components/ui/section-divider';

const iconMap: { [key: string]: React.ElementType } = {
  Facebook: Facebook,
  Instagram: Instagram,
  Linkedin: Linkedin,
  X: XIcon,
  Youtube: Youtube,
  Whatsapp: Phone,
};

export function Footer() {
  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-muted text-muted-foreground relative overflow-hidden">
      {/* Top Section Divider */}
      <SectionDivider position="top" fill="bg-muted" className="z-20" />
      {/* Diamond Mesh Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        transform: 'rotate(45deg) scale(2)'
      }}></div>

      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rotate-45 shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>

      <div className="container py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-12">
          {/* Logo y Acerca de */}
          <div className="md:col-span-1 lg:col-span-4 lg:pr-8">
            <Link href="/" className="flex items-center mb-4">
              <img
                src="/img/logos/CAMEBOL Cochabamba Logotipo.webp"
                alt="CAMEBOL CBBA Logo"
                width={140}
                height={40}
                className="h-10 w-auto filter drop-shadow-sm"
              />
            </Link>
            <p className="max-w-xs mt-4 text-sm leading-relaxed">
              Promoviendo el liderazgo y desarrollo de mujeres empresarias y profesionales en Cochabamba.
            </p>
            <div className="flex mt-8 space-x-3">
              {FOOTER_DATA.social.map((social) => {
                if (social.name === 'Whatsapp') return null;
                const Icon = iconMap[social.icon as keyof typeof iconMap];
                if (!Icon) return null;
                return (
                  <Button key={social.name} variant="outline" size="icon" asChild className="bg-background hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm">
                    <Link href={social.url} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="lg:col-span-2">
            <p className="font-semibold text-foreground tracking-wide">Menú Principal</p>
            <ul className="mt-6 space-y-4 text-sm">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="relative inline-block text-muted-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/afiliate" className="relative inline-block text-muted-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Afíliate
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Ayuda */}
          <div className="lg:col-span-2">
            <p className="font-semibold text-foreground tracking-wide">Legal & Ayuda</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link href="/preguntas-frecuentes" className="relative inline-block text-muted-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones" className="relative inline-block text-muted-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidad" className="relative inline-block text-muted-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/politica-de-cookies" className="relative inline-block text-muted-foreground hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-2 lg:col-span-4 lg:pl-12 border-l-0 lg:border-l border-border/50">
            <p className="font-semibold text-foreground tracking-wide">Ponte en Contacto</p>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm flex-shrink-0">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col mt-0.5">
                  <span className="font-medium text-foreground">Oficina Central</span>
                  <span className="text-muted-foreground">{FOOTER_DATA.address}, Cochabamba</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-sm flex-shrink-0">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col mt-0.5">
                  <span className="font-medium text-foreground">WhatsApp</span>
                  <a href={FOOTER_DATA.social.find(s => s.name === 'Whatsapp')?.url} className="text-muted-foreground hover:text-secondary transition-colors mt-0.5 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-secondary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                    {FOOTER_DATA.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm flex-shrink-0">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col mt-0.5">
                  <span className="font-medium text-foreground">Correo Electrónico</span>
                  <a href={`mailto:${FOOTER_DATA.email}`} className="text-muted-foreground hover:text-primary transition-colors mt-0.5 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                    {FOOTER_DATA.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Premium Divider */}
        <div className="mt-16 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <div className="pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {year} CAMEBOL Cochabamba. Todos los derechos reservados.</p>
          <p>
            Diseñado y Desarrollado por{' '}
            <a href="https://safesoft.tech" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              SafeSoft.tech
            </a>{' '}
            &{' '}
            <a href="https://desarrollowebbolivia.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary transition-colors relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              DesarrolloWebBolivia.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
