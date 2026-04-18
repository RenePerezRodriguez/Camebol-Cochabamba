
'use client';

import { ALLIANCES } from '@/lib/data';
import { SectionHeader } from '../layout/section-header';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

// Extraemos el número del nombre del archivo de imagen para ordenar correctamente
const sortedAlliances = [...ALLIANCES].sort((a, b) => {
    // Obtenemos el nombre del archivo de la ruta, por ejemplo "1. CAMEBOL NACIONAL.jpeg" -> "1"
    const regex = /^(\d+(\.\d+)?)/;
    const numAStr = a.logo.imageUrl.split('/').pop()?.match(regex)?.[0];
    const numBStr = b.logo.imageUrl.split('/').pop()?.match(regex)?.[0];

    const numA = numAStr ? parseFloat(numAStr) : 999;
    const numB = numBStr ? parseFloat(numBStr) : 999;

    return numA - numB;
});

// Duplicamos la lista de alianzas para el efecto de carrusel infinito
const duplicatedAlliances = [...sortedAlliances, ...sortedAlliances];

export function AlliancesSection() {
    return (
        <section id="alliances" className="py-12 md:py-24 bg-background relative overflow-hidden">
            {/* Aurora Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-background to-secondary/5 opacity-50 pointer-events-none" />

            {/* Diamond Echoes Background */}
            <div className="absolute top-10 left-10 w-32 h-32 border border-primary/10 rotate-45 opacity-30 pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border border-secondary/10 rotate-45 opacity-30 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 rotate-45 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="container relative z-10 flex flex-col items-center">
                <SectionHeader
                    title="Nuestras Alianzas"
                    subtitle="Unimos fuerzas con organizaciones líderes para potenciar el impacto de nuestras iniciativas."
                    className="mb-8 md:mb-16"
                />
            </div>

            {/* Infinite Marquee Container */}
            <div className="w-full relative overflow-hidden flex items-center group py-4 md:py-8">
                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-4 md:gap-8 items-center pl-4 md:pl-8 pr-4 md:pr-8"
                    initial={{ x: "0%" }}
                    whileInView={{ x: "-50%" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50, // Más lento
                            ease: "linear",
                            delay: 3 // Esperar 3 segundos antes de iniciar el marquee
                        },
                    }}
                    style={{ width: "fit-content" }}
                >
                    {duplicatedAlliances.map((alliance, index) => (
                        <TooltipProvider key={`alliance-${alliance.name}-${index}`}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={alliance.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block shrink-0"
                                        aria-label={`Visitar el sitio de ${alliance.name}`}
                                    >
                                        <div className="w-32 h-24 md:w-48 md:h-32 bg-white/40 backdrop-blur-sm border border-white/20 p-3 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 hover:scale-105 flex items-center justify-center group/card">
                                            <img
                                                src={alliance.logo.imageUrl}
                                                alt={`${alliance.name} logo`}
                                                className="max-h-full max-w-full w-auto object-contain transition-all duration-300 drop-shadow-sm"
                                                data-ai-hint={alliance.logo.imageHint}
                                            />
                                        </div>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{alliance.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
