'use client';

import Link from 'next/link';

interface HeaderLogoProps {
  isTransparent?: boolean;
}

export function HeaderLogo({ isTransparent }: HeaderLogoProps) {
  return (
    <Link href="/" className="flex flex-shrink-0 items-center" aria-label="Ir a la página de inicio de CAMEBOL Cochabamba">
      <img
        src={isTransparent ? "/img/logos/CAMEBOL Cochabamba Logotipo modo oscuro.webp" : "/img/logos/CAMEBOL Cochabamba Logotipo.webp"}
        alt="CAMEBOL CBBA Logo"
        width={140}
        height={40}
        className="h-10 w-auto transition-all duration-300"
      />
    </Link>
  );
}
