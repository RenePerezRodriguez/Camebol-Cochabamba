'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Admin error:', error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
                Error en el panel
            </h2>
            <p className="text-muted-foreground max-w-md mb-6">
                Ha ocurrido un error inesperado. Intenta recargar o vuelve al dashboard.
            </p>
            <div className="flex gap-3">
                <Button onClick={reset} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reintentar
                </Button>
                <Button asChild variant="default" size="sm">
                    <a href="/admin">Ir al Dashboard</a>
                </Button>
            </div>
        </div>
    );
}
