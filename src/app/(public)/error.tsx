'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-background to-background -z-20" />

            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold !font-headline text-foreground mb-4">
                Algo salió mal
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
                Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado. Por favor, intenta recargar la página.
            </p>

            <Button
                onClick={reset}
                variant="outline"
                size="lg"
                className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
            >
                <RefreshCw className="mr-2 h-4 w-4" />
                Intentar de nuevo
            </Button>
        </div>
    );
}
