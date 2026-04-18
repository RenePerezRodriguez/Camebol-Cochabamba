'use client';

import * as React from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBarProps {
    id: string;
    text: string;
    link?: string | null;
    type?: "info" | "warning" | "success" | "promo";
    isTransparent?: boolean;
}

// All types now map to the official Brand Green for consistency as requested
const typeConfig = {
    info: {
        bg: "bg-brand-green",
        glass: "bg-brand-green/20 backdrop-blur-md border-b border-brand-green/20",
    },
    warning: {
        bg: "bg-brand-green", // Forced green
        glass: "bg-brand-green/20 backdrop-blur-md border-b border-brand-green/20",
    },
    success: {
        bg: "bg-brand-green", // Forced green
        glass: "bg-brand-green/20 backdrop-blur-md border-b border-brand-green/20",
    },
    promo: {
        bg: "bg-brand-green", // Forced green
        glass: "bg-brand-green/20 backdrop-blur-md border-b border-brand-green/20",
    },
};

export function AnnouncementBar({ id, text, link, type = "info", isTransparent }: AnnouncementBarProps) {
    const [isVisible, setIsVisible] = React.useState(false);
    const storageKey = `banner-hidden-${id}`;

    React.useEffect(() => {
        const isHidden = localStorage.getItem(storageKey);
        if (!isHidden) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsVisible(true);
        }
    }, [storageKey]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem(storageKey, "true");
    };

    const config = typeConfig[type] || typeConfig.info;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className={cn(
                        "relative z-[60] overflow-hidden group",
                        isTransparent ? config.glass : config.bg
                    )}
                >
                    <div className="container relative mx-auto flex items-center justify-between gap-x-4 py-1 px-4 md:px-6">
                        <div className="flex-1 flex items-center justify-center sm:justify-start gap-2.5 text-center sm:text-left">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-0.5">
                                <span className={cn(
                                    "text-xs font-medium tracking-wide leading-none",
                                    isTransparent ? "text-slate-100" : "text-white"
                                )}>
                                    {text}
                                </span>
                                
                                {link && (
                                    <Link 
                                        href={link} 
                                        className={cn(
                                            "inline-flex items-center text-[10px] font-bold uppercase tracking-widest group/link transition-all",
                                            isTransparent ? "text-brand-pink border-b border-brand-pink/30 hover:border-brand-pink" : "text-white hover:opacity-80 underline underline-offset-4"
                                        )}
                                    >
                                        Más información
                                        <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="flex-none -mr-1">
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className={cn(
                                    "h-7 w-7 rounded-full transition-all hover:scale-105",
                                    isTransparent ? "hover:bg-white/10 text-white/60 hover:text-white" : "hover:bg-black/10 text-white/80 hover:text-white"
                                )}
                                onClick={handleClose}
                                aria-label="Cerrar anuncio"
                            >
                                <X className="h-3.5 w-3.5" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
