
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/lib/data';
import {
  AlertCircle, ArrowRight, Star,
  Rocket, Laptop, ShieldCheck, BrainCircuit, Users,
  Lightbulb, Landmark, Megaphone, Network, BookUser, TicketPercent,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScroll } from '@/hooks/use-scroll';
import { AnimatedCounter } from './animated-counter';
import { SectionHeader } from '../layout/section-header';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};

export function ServicesSection() {
    // Parallax scroll for icons
    const { progress } = useScroll({ threshold: 0 });
    const parallaxOffset = Math.max(0, 100 - progress * 3);

    const featuredServices = [
        "Asesoramiento e Innovación Empresarial",
        "CAMEBOL Business Academy",
    ].map(title => SERVICES.find(s => s.title === title)).filter(Boolean);

    const iconMap: Record<string, LucideIcon> = {
        Rocket, Laptop, ShieldCheck, BrainCircuit, Users,
        Lightbulb, Landmark, Megaphone, Network, BookUser, TicketPercent,
    };
    const getIcon = (name: string): LucideIcon => iconMap[name] || AlertCircle;

    return (
        <section id="services" className="py-12 md:py-24 bg-muted/50 relative overflow-hidden">
            {/* Background elements: dot pattern and floating particles */}
            {/* Background elements: Subtle Geometric Shapes */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-50/10 to-background z-0" />

            {/* Diamond Silhouettes - Almost Invisible */}
            <div className="absolute top-20 left-[10%] w-64 h-64 border border-primary/5 rotate-45 rounded-[3rem] -z-10 opacity-20" />
            <div className="absolute bottom-40 right-[5%] w-96 h-96 border border-secondary/5 rotate-12 rounded-[4rem] -z-10 opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/2 rotate-45 rounded-full blur-3xl -z-10 opacity-30" />


            <div className="container relative z-10">
                <SectionHeader
                    title="Nuestros Servicios"
                    subtitle="Como Cámara Multisectorial, brindamos herramientas, representación y oportunidades que fortalecen el liderazgo y la competitividad de nuestras asociadas."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {featuredServices.map((service, index) => {
                        if (!service) return null;
                        const ServiceIcon = getIcon(service.icon);
                        return (
                            <motion.div key={service.title} variants={itemVariants} className="h-full">
                                <Card className="relative bg-background h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden border-2 border-transparent hover:shadow-inner">
                                    {/* Animated gradient border */}
                                    <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-brand-pink via-brand-purple to-brand-indigo opacity-0 group-hover:opacity-75 transition-opacity duration-500"></span>

                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/90 via-brand-purple/90 to-brand-indigo/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105" />

                                    <div className="relative transition-colors duration-300 group-hover:text-white">
                                        <CardHeader>
                                            <div
                                                className="bg-primary/10 text-primary w-14 h-14 rounded-xl rotate-3 group-hover:rotate-6 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white shadow-sm"
                                                style={{ transform: `translateY(${parallaxOffset}px) rotate(3deg)` }}
                                            >
                                                <ServiceIcon className="w-7 h-7 -rotate-3 group-hover:-rotate-6 transition-transform duration-300" />
                                            </div>
                                            <CardTitle className="!font-headline">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground transition-colors duration-300 group-hover:text-white/80">{service.description}</p>
                                        </CardContent>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                    <motion.div variants={itemVariants} className="h-full">
                        <Card className="bg-primary/90 text-primary-foreground h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center justify-center text-center p-6">
                            <Star className="w-10 h-10 mb-4 text-accent" />
                            <h3 className="text-2xl font-bold !font-headline mb-2">Únete a la Red Más Grande</h3>
                            <p className="mb-6 opacity-80 flex items-center gap-1.5">
                                Conecta con
                                <span className="font-bold text-xl text-white">
                                    +<AnimatedCounter target={1500} />
                                </span>
                                mujeres líderes.
                            </p>
                            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                                <Link href="/afiliate">
                                    Conviértete en Socia <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </Card>
                    </motion.div>
                </motion.div>


                <div className="text-center mt-12">
                    <MagneticButton strength={0.05}>
                        <Button variant="secondary" asChild>
                            <Link href="/servicios">Ver todos los servicios</Link>
                        </Button>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
