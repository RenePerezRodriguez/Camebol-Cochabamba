'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ABOUT_US } from '@/lib/data';
import { ArrowRight, Goal, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { SectionHeader } from '../layout/section-header';
import { AnimatedCounter } from './animated-counter';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { motion, Variants } from 'framer-motion';

interface AboutSectionClientProps {
    stats: { value: number; label: string }[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    },
};

export function AboutSectionClient({ stats }: AboutSectionClientProps) {
    return (
        <section id="about" className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Geometric Shapes */}
            <div className="absolute -left-32 -top-32 w-80 h-80 bg-primary/2 rotate-45 rounded-[3rem] -z-10 blur-3xl" />
            <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-secondary/2 rotate-45 rounded-[4rem] -z-10 blur-3xl" />
            {/* Additional Layered Diamonds */}
            <div className="absolute top-1/2 left-10 w-24 h-24 border border-primary/5 rotate-45 rounded-xl animate-pulse opacity-30" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-20 right-1/4 w-16 h-16 border border-secondary/5 rotate-12 rounded-lg animate-pulse opacity-30" style={{ animationDuration: '5s' }} />

            <div className="container relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    <motion.div variants={itemVariants}>
                        <SectionHeader title="Nuestro Propósito" className="text-left mb-6 items-start" />


                        <p className="mt-4 text-lg text-muted-foreground">{ABOUT_US.introduction}</p>
                        <MagneticButton strength={0.05}>
                            <Button variant="outline" className="mt-6 group" asChild>
                                <Link href="/quienes-somos">
                                    Conoce más sobre nosotras <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </MagneticButton>
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-8">
                        <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 bg-white/50 backdrop-blur-sm">
                            <CardHeader className="flex-row items-center gap-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex-shrink-0 relative">
                                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rotate-45 rounded-sm animate-bounce" style={{ animationDuration: '3s' }} />
                                                <div className="bg-primary/10 text-primary p-4 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300">
                                                    <Goal className="h-8 w-8 -rotate-3 group-hover:-rotate-6 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Nuestra Misión</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <CardTitle className="text-xl font-bold !font-headline text-primary">Misión</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Fomentar el <strong className="text-primary font-semibold">crecimiento</strong> y la consolidación de las empresas lideradas por mujeres, a través de la <strong className="text-primary font-semibold">capacitación</strong>, el <strong className="text-primary font-semibold">networking</strong> y la defensa de sus intereses, contribuyendo al <strong className="text-primary font-semibold">desarrollo económico y social</strong> de Cochabamba y Bolivia.</p>
                            </CardContent>
                        </Card>
                        <Card className="group hover:shadow-lg transition-all duration-300 border-secondary/10 hover:border-secondary/30 bg-white/50 backdrop-blur-sm">
                            <CardHeader className="flex-row items-center gap-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex-shrink-0 relative">
                                                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary/20 rotate-12 rounded-sm animate-bounce delay-700" style={{ animationDuration: '3s' }} />
                                                <div className="bg-secondary/10 text-secondary p-4 rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300">
                                                    <Eye className="h-8 w-8 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Nuestra Visión</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <CardTitle className="text-xl font-bold !font-headline text-secondary">Visión</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Ser la organización <strong className="text-primary font-semibold">líder y referente</strong> en el <strong className="text-primary font-semibold">empoderamiento económico</strong> de la mujer en Bolivia, reconocida por su impacto en la creación de <strong className="text-primary font-semibold">oportunidades</strong> y la promoción de un entorno empresarial <strong className="text-primary font-semibold">inclusivo y equitativo</strong>.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-16 pt-12 relative text-center"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary/20 rounded-full"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <div className="text-5xl font-bold text-primary flex justify-center">
                                    <AnimatedCounter target={stat.value} />+
                                </div>
                                <p className="mt-2 text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

