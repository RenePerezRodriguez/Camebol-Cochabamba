'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cn(
            "fixed bottom-8 right-8 z-50 transition-all duration-500 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        )}>
            <Button
                onClick={scrollToTop}
                size="icon"
                className="h-10 w-10 md:h-12 md:w-12 rounded-none rotate-45 bg-primary/80 hover:bg-primary text-white shadow-lg backdrop-blur-sm border border-white/20 group transition-all duration-300 hover:scale-110 hover:shadow-primary/25"
                aria-label="Volver arriba"
            >
                <ArrowUp className="h-5 w-5 md:h-6 md:w-6 -rotate-45 transition-transform duration-300 group-hover:-translate-y-1" />
            </Button>
        </div>
    );
}
