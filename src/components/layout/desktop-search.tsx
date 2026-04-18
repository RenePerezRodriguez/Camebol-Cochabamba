'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function DesktopSearch({ isTransparent }: { isTransparent?: boolean }) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultSearchQuery = searchParams.get('q') ?? '';

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('q') as string;
    if (query) {
      router.push(`/buscar?q=${query}`);
      setIsSearchOpen(false);
    }
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        const triggerButton = (event.target as HTMLElement).closest('[aria-label*="search"]');
        if (!triggerButton) {
          setIsSearchOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <div className={cn(
        "hidden md:flex items-center gap-2 transition-all duration-300",
        isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
      )}>
        <form onSubmit={handleSearch} ref={searchRef} className="w-full" role="search">
          <Input
            name="q"
            type="search"
            placeholder="Buscar en el sitio..."
            className="w-full"
            defaultValue={defaultSearchQuery}
            aria-label="Campo de búsqueda"
          />
        </form>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className={cn("hidden md:inline-flex", isTransparent && "text-white hover:text-white/80 hover:bg-white/10")}
        aria-label={isSearchOpen ? 'Cerrar barra de búsqueda' : 'Abrir barra de búsqueda'}
        aria-expanded={isSearchOpen}
      >
        {isSearchOpen ? <X className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
      </Button>
    </>
  )
}
