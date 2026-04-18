'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Menu, Facebook, Instagram, Linkedin, XIcon as TwitterIcon, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_LINKS, type NavLink, FOOTER_DATA } from '@/lib/data';

const socialIconMap: { [key: string]: React.ElementType } = {
  Facebook: Facebook,
  Instagram: Instagram,
  Linkedin: Linkedin,
  X: TwitterIcon,
  Youtube: Youtube,
};

export function MobileNav() {
  const [mounted, setMounted] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultSearchQuery = searchParams.get('q') ?? '';

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('q') as string;
    if (query) {
      router.push(`/buscar?q=${query}`);
      setIsMobileMenuOpen(false);
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="md:hidden" aria-label="Cargando menú...">
        <Menu className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación móvil" aria-expanded={isMobileMenuOpen}>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm flex flex-col p-0">
        <SheetTitle className="sr-only">Menú de Navegación Principal</SheetTitle>
        <div className="p-4 flex-1 overflow-y-auto">
          <form onSubmit={handleSearch} className="mb-4" role="search">
            <Input
              name="q"
              type="search"
              placeholder="Buscar..."
              defaultValue={defaultSearchQuery}
              aria-label="Campo de búsqueda móvil"
            />
          </form>
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link: NavLink) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    if (!link.subLinks) {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={cn(
                    'text-lg font-medium',
                    pathname === link.href ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {link.label}
                </Link>
                {link.subLinks && (
                  <div className="flex flex-col pl-4 mt-2 gap-2 border-l-2 border-muted">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'text-base',
                          pathname === subLink.href ? 'text-primary' : 'text-muted-foreground'
                        )}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t bg-background">
          <Button className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/afiliate">Afíliate</Link>
          </Button>
          <div className="flex justify-center space-x-2 mt-4">
            {FOOTER_DATA.social.map((social, index) => {
              if (social.name === 'Whatsapp') return null;
              const Icon = socialIconMap[social.icon as keyof typeof socialIconMap];
              if (!Icon) return null;
              return (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  className="transition-transform duration-300 hover:scale-110"
                  style={{
                    animation: `fade-in-down 0.5s ${0.3 + index * 0.1}s ease-out forwards`,
                    opacity: 0,
                  }}
                  asChild
                >
                  <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <Icon className="h-5 w-5" />
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
