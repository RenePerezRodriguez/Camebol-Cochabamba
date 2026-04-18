'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Users, Rocket, BarChart2, Calendar, Handshake, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const sections = [
  { name: 'Propósito', href: '#about', icon: Info },
  { name: 'Directorio', href: '#directorio', icon: Users },
  { name: 'Tu Viaje', href: '#journey', icon: Rocket },
  { name: 'Servicios', href: '#services', icon: BarChart2 },
  { name: 'Actividades', href: '#events', icon: Calendar },
  { name: 'Alianzas', href: '#alliances', icon: Handshake },
];

export function HomeNavFab() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (pathname !== '/') {
    return null;
  }

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="rounded-full w-12 h-12 md:w-14 md:h-14 shadow-lg transition-transform duration-300 hover:scale-110"
            aria-label="Navegación de la página"
          >
            <Compass className={cn("h-5 w-5 md:h-6 md:w-6 transition-transform duration-300", isOpen && "rotate-90")} />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-auto p-2 border-primary/20 bg-background/80 backdrop-blur-md">
          <nav className="flex flex-col gap-1">
            {sections.map((section) => (
              <Button
                key={section.name}
                variant="ghost"
                className="justify-start"
                asChild
                onClick={handleLinkClick}
              >
                <Link href={section.href}>
                  <section.icon className="mr-2 h-4 w-4" />
                  {section.name}
                </Link>
              </Button>
            ))}
          </nav>
        </PopoverContent>
      </Popover>
    </div>
  );
}
