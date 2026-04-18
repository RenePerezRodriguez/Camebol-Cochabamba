
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EVENTS } from '@/lib/data';
import { Calendar, Eye, MapPin, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import { SectionHeader } from '../layout/section-header';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import Autoplay from "embla-carousel-autoplay";
import React, { useState, useEffect } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { motion } from 'framer-motion';

// Format date consistently
function formatEventDate(date: Date, format: 'short' | 'long'): string {
    if (format === 'short') {
        const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        return months[date.getMonth()];
    }
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

interface EventProps {
    events?: any[]; // We'll use the proper type if available, or loose typing to match the action return
}

export function EventsSection({ events = [] }: EventProps) {
    const [mounted, setMounted] = useState(false);
    const plugin = React.useMemo(
        () => Autoplay({ delay: 5000, stopOnInteraction: true }),
        []
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Fallback to empty if no events (handled in UI)
    const displayEvents = events.length > 0 ? events : [];

    return (
        <section id="events" className="py-16 md:py-24 bg-background overflow-hidden relative">
            {/* Subtle Geometric Background */}
            <div className="absolute top-20 right-[-5%] w-72 h-72 bg-primary/2 rotate-45 rounded-[3rem] -z-10 blur-2xl" />
            <div className="absolute bottom-20 left-[-5%] w-64 h-64 border border-secondary/5 rotate-12 rounded-[2rem] -z-10 opacity-30" />

            <div className="container relative z-10">
                <SectionHeader
                    title="Próximas Actividades"
                    subtitle="Participa en nuestros eventos exclusivos de networking, capacitación y desarrollo."
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[plugin]}
                        className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl mx-auto"
                    >
                        <CarouselContent>
                            {displayEvents.map((event, index) => (
                                <CarouselItem key={`event-${index}`} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1 h-full">
                                        <Card className="overflow-hidden flex flex-col h-full group border-primary/10 bg-white/50 backdrop-blur-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                                            {event.image && (
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    <Link href="/calendario">
                                                        <img
                                                            src={event.image.imageUrl}
                                                            alt={event.title}
                                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                            data-ai-hint={event.image.imageHint}
                                                        />
                                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                            <div className="text-white flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                                                                <Eye className="w-5 h-5" />
                                                                <span className="font-medium">Ver detalles</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    {event.category && (
                                                        <Badge className="absolute top-3 right-3 bg-white/90 text-primary hover:bg-white backdrop-blur-md shadow-sm">{event.category}</Badge>
                                                    )}

                                                    {mounted && (
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm border-none shadow-sm text-primary hover:text-primary/80"
                                                            onClick={() => {
                                                                if (typeof navigator !== 'undefined' && navigator.share) {
                                                                    navigator.share({
                                                                        title: event.title,
                                                                        url: window.location.origin + '/calendario'
                                                                    });
                                                                } else {
                                                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/calendario')}`, '_blank');
                                                                }
                                                            }}
                                                        >
                                                            <Share2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                            <CardHeader className="relative">
                                                {/* Diamond Date Badge */}
                                                <div className="absolute -top-6 left-6 w-12 h-12 bg-primary text-white rotate-45 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                                                    <div className="-rotate-45 flex flex-col items-center justify-center leading-none">
                                                        <span className="text-xs font-bold uppercase">
                                                            {formatEventDate(event.start, 'short')}
                                                        </span>
                                                        <span className="text-sm font-bold">
                                                            {event.start.getDate()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <CardTitle className="mt-4 !font-headline group-hover:text-primary transition-colors line-clamp-2">{event.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow flex flex-col pt-0">
                                                <div className="flex-grow space-y-2">
                                                    <div className="flex items-center text-muted-foreground text-sm">
                                                        <Calendar className="w-4 h-4 mr-2 text-primary/70" />
                                                        <span>
                                                            {formatEventDate(event.start, 'long')}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-muted-foreground text-sm">
                                                        <MapPin className="w-4 h-4 mr-2 text-primary/70" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </motion.div>
                <div className="text-center mt-12">

                    <MagneticButton strength={0.1}>
                        <Button asChild>
                            <Link href="/calendario">Ver calendario completo</Link>
                        </Button>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
