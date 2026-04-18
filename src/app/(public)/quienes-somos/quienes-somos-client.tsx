
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { ABOUT_US, TEAM_MEMBERS, COMMUNITY_PHOTOS, QUICK_FAQS } from '@/lib/data';
import * as Icons from 'lucide-react';
import { SectionHeader } from '@/components/layout/section-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AnimatedCounter } from '@/components/home/animated-counter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getImage } from '@/lib/data-helpers';
import { TextReveal } from '@/components/ui/text-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SectionDivider } from '@/components/ui/section-divider';
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';

// Helper para obtener íconos dinámicamente
const getIcon = (name: string): React.ComponentType<{ className?: string }> => {
    const icon = Icons[name as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return icon || Icons.AlertCircle;
};

// Componente principal de la página
interface QuienesSomosClientProps {
    stats: { value: number; label: string }[];
    members?: any[];
}

interface NormalizedLeader {
    name: string;
    role: string;
    imageUrl: string;
}

export function QuienesSomosClient({ stats, members = [] }: QuienesSomosClientProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    // Filter for 'directiva' or 'directorio' members for the Leadership section
    const dynamicLeaders = members.filter(m => m.type === 'directiva' || m.type === 'directorio');

    let leaders: NormalizedLeader[] = [];

    if (dynamicLeaders.length > 0) {
        leaders = dynamicLeaders.map(m => ({
            name: m.name,
            role: m.role,
            // Handle different image structures from DB (string URL or object)
            imageUrl: typeof m.image === 'string' ? m.image : (m.image?.imageUrl || m.imageUrl || ''),
        }));
    }
    // Removed static fallback to ensure only CMS data is shown.

    // Use dynamic stats for impact section, fallback to static if empty (though unexpected)
    // Use dynamic stats for impact section, fallback to static if empty (though unexpected)
    const impactStats = stats.length > 0 ? stats : ABOUT_US.impactStats;

    // Lightbox State
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    const handleNextPhoto = () => {
        setSelectedPhotoIndex((prev) => (prev === null ? null : (prev + 1) % COMMUNITY_PHOTOS.length));
    };

    const handlePrevPhoto = () => {
        setSelectedPhotoIndex((prev) => (prev === null ? null : (prev - 1 + COMMUNITY_PHOTOS.length) % COMMUNITY_PHOTOS.length));
    };

    useEffect(() => {
        if (selectedPhotoIndex === null) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') setSelectedPhotoIndex((prev) => (prev === null ? null : (prev + 1) % COMMUNITY_PHOTOS.length));
            if (e.key === 'ArrowLeft') setSelectedPhotoIndex((prev) => (prev === null ? null : (prev - 1 + COMMUNITY_PHOTOS.length) % COMMUNITY_PHOTOS.length));
            if (e.key === 'Escape') setSelectedPhotoIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPhotoIndex]);

    return (
        <div className="relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Floating Diamonds Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-24 h-24 border border-primary/10 rotate-45 opacity-20 animate-float" />
                <div className="absolute top-[30%] right-[10%] w-32 h-32 border border-secondary/10 rotate-45 opacity-20 animate-float-delayed" />
                <div className="absolute bottom-[20%] left-[15%] w-16 h-16 bg-primary/5 rotate-45 opacity-20 animate-float" />
            </div>

            <div className="container pt-32 pb-16 md:pt-40 md:pb-24 relative">
                <main className="space-y-32">

                    {/* INTRO: El Viaje de la Heroína */}
                    <section id="intro" className="scroll-mt-24 relative">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                    Nuestra Esencia
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !font-headline leading-tight">
                                    <TextReveal text="Tu Aliada para el Éxito Empresarial" />
                                </h1>
                                <div className="prose prose-lg text-muted-foreground">
                                    <p>
                                        Sabemos que liderar una empresa es un viaje de desafíos y grandes satisfacciones. Por eso, hemos creado un espacio donde cada mujer empresaria encuentra no solo recursos, sino una <strong className="text-primary">red de apoyo incondicional</strong> para crecer, innovar y dejar huella.
                                    </p>
                                    <p>
                                        Nuestra misión es potenciar tu visión, conectarte con oportunidades y darte las herramientas para que superes cualquier obstáculo. <strong className="text-secondary">Juntas, somos una fuerza imparable.</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rotate-3 rounded-2xl transform scale-105 blur-lg" />
                                <Card className="relative overflow-hidden shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500 border-none">
                                    <div className="relative aspect-[4/3]">
                                        <Image
                                            src={getImage('gallery-1').imageUrl}
                                            alt="Mujeres empresarias colaborando"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 text-white max-w-xs">
                                            <div className="w-12 h-1 bg-secondary mb-4" />
                                            <h3 className="text-2xl font-bold mb-2">Conecta. Crece. Lidera.</h3>
                                            <p className="text-white/80 text-sm">El ecosistema donde tu liderazgo florece.</p>
                                        </div>
                                    </div>
                                </Card>
                                {/* Decorative Diamond with Image */}
                                <div className="absolute -bottom-8 -right-8 w-36 h-36 rotate-45 z-10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-sm opacity-50" />
                                    <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] -rotate-45">
                                            <Image
                                                src={getImage('gallery-2').imageUrl}
                                                alt="Detalle decorativo"
                                                fill
                                                className="object-cover scale-110"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                    {/* PROPÓSITO: Misión y Visión (Anclaje Emocional) */}
                    <section id="mision-vision" className="scroll-mt-24 relative">
                        <SectionHeader title="Nuestro Propósito" />
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="bg-background/50 backdrop-blur-sm h-full transition-all hover:shadow-xl hover:-translate-y-1 border-primary/10">
                                <CardHeader className="flex-row items-start gap-6">
                                    <div className="relative w-16 h-16 shrink-0">
                                        <div className="absolute inset-0 bg-primary/10 rotate-45 rounded-xl" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Icons.Goal className="h-8 w-8 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl !font-headline mb-3">Misión</CardTitle>
                                        <p className="text-muted-foreground leading-relaxed">{ABOUT_US.mission}</p>
                                    </div>
                                </CardHeader>
                            </Card>
                            <Card className="bg-background/50 backdrop-blur-sm h-full transition-all hover:shadow-xl hover:-translate-y-1 border-secondary/10">
                                <CardHeader className="flex-row items-start gap-6">
                                    <div className="relative w-16 h-16 shrink-0">
                                        <div className="absolute inset-0 bg-secondary/10 rotate-45 rounded-xl" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Icons.Eye className="h-8 w-8 text-secondary" />
                                        </div>
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl !font-headline mb-3">Visión</CardTitle>
                                        <p className="text-muted-foreground leading-relaxed">{ABOUT_US.vision}</p>
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>

                    </section>

                    {/* PILARES: Beneficios Tangibles */}
                    <section id="pilares" className="scroll-mt-24 relative">
                        <SectionHeader
                            title="Nuestros Pilares de Acción"
                            subtitle="Los cuatro ejes que garantizan tu crecimiento y el de tu empresa."
                        />        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {ABOUT_US.pillars.map((pillar, index) => {
                                const PillarIcon = getIcon(pillar.icon);
                                return (
                                    <div key={pillar.title} className="group relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rotate-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="p-8 bg-background rounded-2xl h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2 text-center border border-border/50 relative z-10">
                                            <div className="relative w-16 h-16 mx-auto mb-6">
                                                <div className="absolute inset-0 bg-primary/10 rotate-45 rounded-xl transition-all duration-300 group-hover:bg-primary group-hover:rotate-90" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <PillarIcon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold !font-headline mb-3 text-foreground">{pillar.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </section>

                    {/* IMPACTO: Prueba Social Cuantitativa */}
                    <section id="impacto" className="relative py-16 rounded-3xl overflow-hidden scroll-mt-24">
                        <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm -z-10" />
                        {/* Background Diamonds */}
                        <div className="absolute top-0 left-0 w-32 h-32 border-2 border-primary/10 rotate-45 -translate-x-16 -translate-y-16" />
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/5 rotate-45 translate-x-24 translate-y-24" />

                        <div className="container text-center relative z-10">
                            <h2 className="text-3xl font-bold !font-headline mb-2 text-foreground">Nuestro Impacto en Cifras</h2>
                            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">Los números que demuestran el poder de nuestra comunidad.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-8">
                                {impactStats.map((stat) => (
                                    <div key={stat.label} className="relative group">
                                        <div className="absolute inset-0 bg-primary/5 rotate-45 scale-0 group-hover:scale-75 transition-transform duration-500 rounded-xl" />
                                        <p className="text-5xl md:text-6xl font-bold text-primary relative z-10">
                                            +<AnimatedCounter target={stat.value} />
                                        </p>
                                        <p className="mt-4 text-lg text-muted-foreground font-medium">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </section>

                    {/* LIDERAZGO: Prueba Social Cualitativa */}
                    <section id="liderazgo" className="scroll-mt-24 relative">
                        <SectionHeader title="Conoce a Nuestro Liderazgo" subtitle="Mujeres visionarias que trabajan para potenciar a otras mujeres." />

                        <div className="relative px-4 sm:px-8">
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full max-w-5xl mx-auto"
                            >
                                <CarouselContent className="-ml-2 md:-ml-4">
                                    {leaders.map((member) => (
                                        <CarouselItem key={member.name} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                            <div className="flex flex-col items-center text-center group h-full p-2">
                                                <div className="relative py-4 mb-4 w-full flex justify-center">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rotate-45 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    <div className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-background shadow-lg bg-background rotate-45 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 rounded-2xl relative z-10">
                                                        <Avatar className="h-full w-full rounded-none">
                                                            <AvatarImage
                                                                src={member.imageUrl}
                                                                alt={member.name}
                                                                className="-rotate-45 scale-150 object-cover w-full h-full"
                                                            />
                                                            <AvatarFallback className="-rotate-45 bg-primary/10 text-primary">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                </div>
                                                <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1 line-clamp-2">{member.name}</h3>
                                                <p className="text-xs sm:text-sm text-primary font-medium line-clamp-2">{member.role}</p>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="-left-4 sm:-left-12" />
                                <CarouselNext className="-right-4 sm:-right-12" />
                            </Carousel>
                        </div>

                        <div className="text-center mt-12">
                            <MagneticButton>
                                <Button variant="secondary" asChild className="px-8 z-20 relative">
                                    <Link href="/quienes-somos/directorio">
                                        Ver Directorio Completo <Icons.ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </MagneticButton>
                        </div>
                    </section>

                    {/* COMUNIDAD: Vínculo y Pertenencia */}
                    <section id="comunidad" className="scroll-mt-24 relative">
                        <SectionHeader title="Nuestra Comunidad en Acción" subtitle="Momentos que capturan la energía, la colaboración y el espíritu de nuestra red." />
                        <div className="py-8 px-4 md:px-12">
                            <Carousel opts={{ loop: true, align: 'start' }} plugins={[Autoplay({ delay: 6000 })]} className="w-full">
                                <CarouselContent>
                                    {COMMUNITY_PHOTOS.map((photo, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-6">
                                            <Card
                                                className="overflow-hidden group border-none shadow-lg rounded-2xl h-full cursor-zoom-in"
                                                onClick={() => setSelectedPhotoIndex(index)}
                                            >
                                                <div className="aspect-[4/3] relative">
                                                    <Image
                                                        src={photo.imageUrl}
                                                        alt={photo.description}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                        <h4 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{photo.description}</h4>
                                                        <p className="text-white/80 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{photo.imageHint}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="flex -left-4 md:-left-12 bg-background/80 hover:bg-background border-primary/20 text-primary" />
                                <CarouselNext className="flex -right-4 md:-right-12 bg-background/80 hover:bg-background border-primary/20 text-primary" />
                            </Carousel>
                        </div>

                    </section>

                    {/* ÚNETE: Llamada a la Acción Final */}
                    <section id="unete" className="relative scroll-mt-24 text-center bg-primary text-primary-foreground rounded-3xl px-6 pt-12 pb-48 md:p-16 overflow-hidden shadow-2xl mb-24">
                        {/* Diamond Patterns Overlay */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rotate-45 -translate-x-32 -translate-y-32" />
                            <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rotate-45 translate-x-48 translate-y-48" />
                            <div className="absolute top-1/2 left-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px] opacity-20" />
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold !font-headline mb-6">¿Lista para dar el siguiente paso?</h2>
                            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
                                Forma parte de la red de mujeres empresarias más influyente de Bolivia. Accede a recursos, eventos y una comunidad que te impulsará al éxito.
                            </p>
                            <MagneticButton>
                                <Button
                                    className="bg-white text-primary hover:bg-white/90 transform transition-all hover:scale-105 h-auto py-4 px-6 w-full sm:w-auto text-base sm:text-lg font-bold rounded-full shadow-lg"
                                    asChild>
                                    <Link href="/afiliate">
                                        Únete a CAMEBOL Ahora <Icons.ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </MagneticButton>
                        </div>
                    </section>

                    {/* PREGUNTAS FRECUENTES (FAQ) */}
                    <section id="faq" className="pb-16">
                        <SectionHeader title="Preguntas Rápidas" />
                        <div className="max-w-3xl mx-auto">
                            {isMounted ? (
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {QUICK_FAQS.map((faq, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`item-${index}`}
                                            className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-sm px-2"
                                        >
                                            <AccordionTrigger className="p-6 text-lg hover:no-underline text-left font-medium">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="p-6 pt-0">
                                                <p className="text-muted-foreground text-base leading-relaxed">{faq.answer}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                // Fallback or empty state for SSR to prevent layout shift
                                <div className="space-y-4">
                                    {QUICK_FAQS.map((faq, index) => (
                                        <div key={index} className="bg-background/50 border border-border/50 rounded-xl p-6 opacity-50">
                                            <div className="h-6 bg-muted rounded w-3/4 mb-2 animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>


            {/* Lightbox Modal */}
            <Dialog open={selectedPhotoIndex !== null} onOpenChange={(open) => !open && setSelectedPhotoIndex(null)}>
                <DialogContent className="max-w-6xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none text-white ring-0 outline-none">
                    {/* Visually hidden title for accessibility */}
                    <DialogTitle className="sr-only">Galería de Comunidad</DialogTitle>
                    <DialogDescription className="sr-only">Navega a través de las fotos de nuestra comunidad.</DialogDescription>

                    <div className="relative w-full h-[80vh] flex items-center justify-center">
                        {/* Close Button Custom */}
                        <button
                            onClick={() => setSelectedPhotoIndex(null)}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                            <Icons.X className="w-6 h-6" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                            className="absolute left-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all transform hover:scale-110"
                        >
                            <Icons.ChevronLeft className="w-8 h-8" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                            className="absolute right-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all transform hover:scale-110"
                        >
                            <Icons.ChevronRight className="w-8 h-8" />
                        </button>

                        {selectedPhotoIndex !== null && (
                            <div className="relative w-full h-full">
                                <Image
                                    src={COMMUNITY_PHOTOS[selectedPhotoIndex].imageUrl}
                                    alt={COMMUNITY_PHOTOS[selectedPhotoIndex].description}
                                    fill
                                    className="object-contain"
                                    priority
                                    quality={90}
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">{COMMUNITY_PHOTOS[selectedPhotoIndex].description}</h3>
                                    <p className="text-white/80 text-sm max-w-2xl mx-auto">{COMMUNITY_PHOTOS[selectedPhotoIndex].imageHint}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
}
