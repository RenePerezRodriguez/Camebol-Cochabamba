'use client';

import * as React from 'react';
import Link from 'next/link';
import { Share2, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FOOTER_DATA } from '@/lib/data';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';

export function FloatingButtons() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const isHome = pathname === '/';

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("fixed left-6 z-50 transition-all duration-500", isHome ? "bottom-24" : "bottom-6")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline" className="rounded-full w-12 h-12 shadow-lg bg-background hover:bg-primary hover:text-primary-foreground transition-colors">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Redes Sociales</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" align="end" className="w-auto p-2">
          <div className="flex flex-col gap-2">
            <Button size="icon" variant="ghost" className="hover:bg-green-100 hover:text-green-600" asChild>
              <a href={FOOTER_DATA.social.find(s => s.name === 'Whatsapp')?.url} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </Button>
            <Button size="icon" variant="ghost" className="hover:bg-blue-100 hover:text-blue-600" asChild>
              <a href="https://www.facebook.com/profile.php?id=100065638682964" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </Button>
            <Button size="icon" variant="ghost" className="hover:bg-pink-100 hover:text-pink-600" asChild>
              <a href="https://www.instagram.com/camebol_cochabamba/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
