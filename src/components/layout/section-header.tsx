
'use client';

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <header className={cn('text-center mb-12 md:mb-16', className)} ref={ref}>
      <h2 className="text-3xl md:text-5xl font-bold !font-headline tracking-tight">{title}</h2>
      {subtitle && (
        <>
          <div
            className={cn(
              'w-24 h-1 mx-auto mt-4 bg-primary/20 rounded-full transition-all duration-1000',
              inView ? 'animate-draw-line-x-center' : 'w-0'
            )}
          ></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </>
      )}
    </header>
  );
}
