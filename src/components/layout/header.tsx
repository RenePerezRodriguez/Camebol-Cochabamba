'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { HeaderLogo } from './header-logo';
import { HeaderActions } from './header-actions';
import { ScrollProgressBar } from './scroll-progress-bar';

interface HeaderProps {
    banner?: React.ReactNode;
}

export function Header({ banner }: HeaderProps) {
  const { scrolled, direction, progress } = useScroll();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  const headerClasses = cn(
    'fixed top-0 z-50 w-full transform-gpu transition-all duration-500 flex flex-col',
    scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent',
    !isHomePage && 'bg-background/95 backdrop-blur-md shadow-sm',
    direction === 'down' && scrolled ? '-translate-y-full' : 'translate-y-0',
    'animate-fade-in-down'
  );

  return (
    <header
      className={headerClasses}
      style={{ animationDelay: '0.1s' }}
      aria-label="Encabezado principal"
    >
      {/* Banner renders inside the fixed header structure to ensure no overlap */}
      {banner}

      <div className="container flex h-20 items-center justify-between">
        <HeaderLogo isTransparent={isTransparent} />
        <HeaderActions isTransparent={isTransparent} />
      </div>

      <ScrollProgressBar progress={progress} scrolled={scrolled} />
    </header>
  );
}
