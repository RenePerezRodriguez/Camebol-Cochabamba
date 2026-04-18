'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Building2,
  Target,
  Users,
  UserSquare2,
  UserCheck,
  Rocket,
  Laptop,
  Briefcase,
  BrainCircuit,
  Landmark,
  ArrowRight
} from 'lucide-react';

export function MainNav({ isTransparent }: { isTransparent?: boolean }) {
  const [mounted, setMounted] = React.useState(false);
  const textColorClass = isTransparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary";
  const bgHoverClass = isTransparent ? "hover:bg-white/10" : "hover:bg-accent/10";

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="hidden md:flex items-center space-x-4">
        <div className={cn("px-4 py-2 text-sm font-medium", textColorClass)}>Inicio</div>
        <div className={cn("px-4 py-2 text-sm font-medium", textColorClass)}>Nosotras</div>
        <div className={cn("px-4 py-2 text-sm font-medium", textColorClass)}>Servicios</div>
        <div className={cn("px-4 py-2 text-sm font-medium", textColorClass)}>Asociadas</div>
        <div className={cn("px-4 py-2 text-sm font-medium", textColorClass)}>Actividades</div>
        <div className={cn("px-4 py-2 text-sm font-medium", textColorClass)}>Noticias</div>
        <div className={cn("px-4 py-2 text-sm font-medium", textColorClass)}>Contacto</div>
      </nav>
    );
  }

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className={cn(navigationMenuTriggerStyle(), "bg-transparent", textColorClass, bgHoverClass)}>
              Inicio
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn("bg-transparent data-[state=open]:bg-accent/10", textColorClass, bgHoverClass)}>
            Nosotras
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                href="/quienes-somos"
                title="Quiénes Somos"
                icon={<Building2 className="h-6 w-6 text-primary" />}
              >
                Nuestra estructura y enfoque de género.
              </ListItem>
              <ListItem
                href="/quienes-somos#mision-vision"
                title="Visión y Misión"
                icon={<Target className="h-6 w-6 text-primary" />}
              >
                Nuestro propósito y metas a futuro.
              </ListItem>
              <ListItem
                href="/quienes-somos/directorio"
                title="Directorio"
                icon={<Users className="h-6 w-6 text-primary" />}
              >
                Conoce a nuestro equipo de liderazgo.
              </ListItem>

              <ListItem
                href="/quienes-somos/nuestro-equipo"
                title="Nuestro Equipo"
                icon={<UserCheck className="h-6 w-6 text-primary" />}
              >
                El equipo que hace posible CAMEBOL.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn("bg-transparent data-[state=open]:bg-accent/10", textColorClass, bgHoverClass)}>
            Servicios
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-[1fr_0.75fr] lg:w-[750px]">
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <ListItem
                    href="/servicios#asesoramiento"
                    title="Asesoramiento"
                    icon={<Rocket className="h-6 w-6 text-primary" />}
                  >
                    Innovación y estrategia para tu negocio.
                  </ListItem>
                  <ListItem
                    href="/servicios#academy"
                    title="Business Academy"
                    icon={<BrainCircuit className="h-6 w-6 text-primary" />}
                  >
                    Potencia tus conocimientos y habilidades.
                  </ListItem>
                  <ListItem
                    href="/servicios#transformacion"
                    title="Transformación Digital"
                    icon={<Laptop className="h-6 w-6 text-primary" />}
                  >
                    Implementa herramientas para el futuro.
                  </ListItem>
                  <ListItem
                    href="/servicios#representacion"
                    title="Representación"
                    icon={<Landmark className="h-6 w-6 text-primary" />}
                  >
                    Defendemos los intereses de nuestras asociadas.
                  </ListItem>
                  <ListItem
                    href="/servicios#red-negocios"
                    title="Red de Negocios"
                    icon={<Briefcase className="h-6 w-6 text-primary" />}
                  >
                    Conecta, colabora y crece.
                  </ListItem>
                </div>
              </div>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/80 to-primary p-6 no-underline outline-none focus:shadow-md"
                    href="/afiliate"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-white">
                      Networking
                    </div>
                    <p className="text-sm leading-tight text-white/90 mb-4">
                      Potencia Tu Red. Únete a una comunidad de líderes.
                    </p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center justify-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-colors">
                        Únete ahora <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/asociadas" className={cn(navigationMenuTriggerStyle(), "bg-transparent", textColorClass, bgHoverClass)}>
              Asociadas
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/calendario" className={cn(navigationMenuTriggerStyle(), "bg-transparent", textColorClass, bgHoverClass)}>
              Actividades
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/noticias" className={cn(navigationMenuTriggerStyle(), "bg-transparent", textColorClass, bgHoverClass)}>
              Noticias
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contacto" className={cn(navigationMenuTriggerStyle(), "bg-transparent", textColorClass, bgHoverClass)}>
              Contacto
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <div>
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
