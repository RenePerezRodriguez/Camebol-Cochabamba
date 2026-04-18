'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { DesktopSearch } from './desktop-search';
import { MobileNav } from './mobile-nav';
import { MainNav } from './main-nav';

export function HeaderActions({ isTransparent }: { isTransparent?: boolean }) {
  return (
    <div className="flex flex-1 items-center justify-end gap-2">
      <MainNav isTransparent={isTransparent} />

      <Suspense fallback={<div className="w-9 h-9" />}>
        <DesktopSearch isTransparent={isTransparent} />
      </Suspense>

      <Button className="hidden md:inline-flex" asChild>
        <Link href="/afiliate">Afíliate</Link>
      </Button>

      <Suspense fallback={<div className="w-9 h-9" />}>
        <MobileNav />
      </Suspense>
    </div>
  );
}
