
'use client';

import { UserPlus, Network, BrainCircuit, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import React from 'react';
import { LinkWrapper } from './link-wrapper';
import { SectionHeader } from '../layout/section-header';
import { motion, Variants } from 'framer-motion';


const journeySteps = [
    {
        title: "Afíliate",
        description: "Únete a una red de más de 1.500 mujeres líderes y accede a un mundo de oportunidades.",
        icon: UserPlus,
        href: "/afiliate",
        tooltip: "Inicia tu proceso de afiliación y forma parte de nuestra comunidad."
    },
    {
        title: "Conecta",
        description: "Participa en eventos exclusivos, ruedas de negocios y actividades de networking.",
        icon: Network,
        href: "/calendario",
        tooltip: "Explora nuestro calendario de eventos y amplía tu red de contactos."
    },
    {
        title: "Expande",
        description: "Visibiliza tu marca, encuentra nuevas alianzas y lleva tu negocio al siguiente nivel.",
        icon: Rocket,
        href: "/asociadas",
        tooltip: "Conoce a nuestras socias y explora oportunidades de colaboración."
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};

const JourneyStep = ({ step, index }: { step: typeof journeySteps[0], index: number }) => {

    return (
        <motion.div variants={itemVariants} className="text-center transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100">
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Card className="bg-white/50 backdrop-blur-sm h-full group/card overflow-hidden relative border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <CardHeader className="relative pt-12">
                                <div className="absolute -top-4 -right-4 text-[6rem] font-bold !font-headline text-primary/5 transition-transform duration-300 group-hover/card:scale-110 select-none">
                                    0{index + 1}
                                </div>
                                <LinkWrapper href={step.href}>
                                    <div className="mx-auto w-16 h-16 relative mb-4">
                                        <div className="absolute inset-0 bg-primary/10 rotate-45 rounded-xl transition-transform duration-300 group-hover/card:rotate-90 group-hover/card:scale-110"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-primary transition-colors duration-300 group-hover/card:text-primary">
                                            <step.icon className="w-8 h-8 relative z-10" />
                                        </div>
                                    </div>
                                </LinkWrapper>
                            </CardHeader>
                            <CardContent>
                                <LinkWrapper href={step.href}>
                                    <CardTitle className="text-xl !font-headline mb-2 group-hover/card:text-primary transition-colors">{step.title}</CardTitle>
                                    <p className="text-muted-foreground text-sm group-hover/card:text-foreground/80 transition-colors">{step.description}</p>
                                </LinkWrapper>
                            </CardContent>
                        </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{step.tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </motion.div>
    );
};


export function JourneySection() {
    return (
        <section id="journey" className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
            {/* Background Elements */}
            {/* Background Elements - Subtle */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/3 right-10 w-64 h-64 bg-primary/2 rotate-45 rounded-3xl blur-3xl"></div>
                <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-secondary/2 -rotate-12 rounded-full blur-3xl"></div>
                <div className="absolute top-20 left-20 w-32 h-32 border border-primary/5 rotate-45 opacity-20"></div>
            </div>

            <div className="container relative z-10">
                <SectionHeader
                    title="Tu Viaje de Crecimiento en CAMEBOL COCHABAMBA"
                    subtitle="Te acompañamos en cada paso de tu desarrollo empresarial con un camino claro hacia el éxito."
                />

                {/* Desktop View */}
                <div className="hidden md:block">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="group grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                    >
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="absolute top-[3.5rem] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left"
                        />
                        {journeySteps.map((step, index) => (
                            <div key={index} className="relative z-10">
                                <JourneyStep step={step} index={index} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                                stopOnInteraction: true,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {journeySteps.map((step, index) => (
                                <CarouselItem key={index} className="p-2">
                                    <JourneyStep step={step} index={index} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
