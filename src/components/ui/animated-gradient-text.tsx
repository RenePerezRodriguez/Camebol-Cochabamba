'use client';

import { cn } from '@/lib/utils';

interface AnimatedGradientTextProps {
    children: React.ReactNode;
    className?: string;
    from?: string;
    via?: string;
    to?: string;
}

export function AnimatedGradientText({
    children,
    className,
    from = "from-primary",
    via = "via-secondary",
    to = "to-primary",
}: AnimatedGradientTextProps) {
    return (
        <span
            className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r bg-[length:200%_auto] animate-gradient-text",
                from,
                via,
                to,
                className
            )}
        >
            {children}
        </span>
    );
}
