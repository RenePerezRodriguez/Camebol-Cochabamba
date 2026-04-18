'use client';

import Link from 'next/link';

interface LinkWrapperProps {
  href?: string;
  children: React.ReactNode;
}

export const LinkWrapper = ({ href, children }: LinkWrapperProps) => {
  if (href) {
    return <Link href={href}>{children}</Link>;
  }
  return <>{children}</>;
};
