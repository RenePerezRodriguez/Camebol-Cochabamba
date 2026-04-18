
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SERVICES, type ServiceCategory } from '@/lib/data';
import * as Icons from 'lucide-react';
import { CheckCircle2, ArrowRight, Sparkles, MessageSquareQuote } from 'lucide-react';
import { SectionHeader } from '@/components/layout/section-header';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { ServiceModal } from '@/components/servicios/service-modal';
import { TextReveal } from '@/components/ui/text-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SectionDivider } from '@/components/ui/section-divider';

type IconName = keyof typeof Icons;

const getIcon = (name: string): React.ComponentType<{ className?: string }> => {
    const icon = Icons[name as IconName] as React.ComponentType<{ className?: string }>;
    return icon || Icons.AlertCircle;
};

const serviceCategories: ServiceCategory[] = [
    'Desarrollo Empresarial', 'Networking y Visibilidad', 'Asesoría Especializada'
];

export default function ServiciosPage() {
    const [filter, setFilter] = React.useState<ServiceCategory | 'Todos'>('Todos');
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [highlightedId, setHighlightedId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHighlightedId(hash);
            const timer = setTimeout(() => {
                setHighlightedId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const filteredServices = filter === 'Todos' ? SERVICES : SERVICES.filter(service => service.category === filter);

    return (
        <div className="relative overflow-hidden min-h-screen" ref={ref}>
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Floating Diamonds Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[15%] left-[5%] w-24 h-24 border border-primary/10 rotate-45 opacity-20 animate-float" />
                <div className="absolute top-[40%] right-[10%] w-32 h-32 border border-secondary/10 rotate-45 opacity-20 animate-float-delayed" />
                <div className="absolute bottom-[20%] left-[15%] w-16 h-16 bg-primary/5 rotate-45 opacity-20 animate-float" />
            </div>

            <div className="container py-16 md:py-24 relative">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Catálogo de Oportunidades
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !font-headline leading-tight">
                        <TextReveal text="Nuestros Servicios" />
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Descubre todo lo que CAMEBOL Cochabamba tiene para ofrecerte a ti y a tu empresa.
                    </p>
                </div>

                <div className="flex justify-center flex-wrap gap-3 mb-16" ref={ref}>
                    <Button
                        variant={filter === 'Todos' ? 'default' : 'outline'}
                        onClick={() => setFilter('Todos')}
                        className={cn("rounded-full px-6 transition-all", filter === 'Todos' ? "shadow-lg scale-105" : "hover:bg-primary/5")}
                    >
                        Todos
                    </Button>
                    {serviceCategories.map((category) => (
                        <Button
                            key={category}
                            variant={filter === category ? 'default' : 'outline'}
                            onClick={() => setFilter(category)}
                            className={cn("rounded-full px-6 transition-all", filter === category ? "shadow-lg scale-105" : "hover:bg-primary/5")}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, index) => {
                        const ServiceIcon = getIcon(service.icon);
                        return (
                            <div
                                key={service.id}
                                id={service.id}
                                className={cn('opacity-0 scroll-mt-24', inView && 'animate-fade-in-down')}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card
                                    className={cn(
                                        "relative flex flex-col h-full group transition-all duration-500 hover:-translate-y-2 overflow-hidden border-0 bg-background/60 backdrop-blur-sm",
                                        service.isFeatured ? "shadow-xl ring-1 ring-primary/20" : "shadow-lg hover:shadow-xl",
                                        highlightedId === service.id && 'animate-pulse-highlight ring-2 ring-primary'
                                    )}
                                >
                                    {/* Card Gradient Border Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {service.isFeatured && (
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 z-10 shadow-md">
                                            <Sparkles className="w-3 h-3" />
                                            <span>Destacado</span>
                                        </div>
                                    )}

                                    <CardHeader className="flex-row items-start gap-6 pt-8 pb-4 relative z-10">
                                        <div className="relative w-16 h-16 shrink-0 group-hover:scale-110 transition-transform duration-500">
                                            <div className="absolute inset-0 bg-primary/10 rotate-45 rounded-xl transition-colors duration-500 group-hover:bg-primary/20" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <ServiceIcon className="w-8 h-8 text-primary transition-colors duration-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <CardTitle className="leading-tight text-xl !font-headline mt-1 group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="flex flex-col flex-grow relative z-10">
                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.description}</p>
                                        {service.details && service.details.length > 0 && (
                                            <ul className="space-y-3 mt-auto">
                                                {service.details.slice(0, 2).map((detail, detailIndex) => (
                                                    <li key={detailIndex} className="flex items-start group/item">
                                                        <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 text-secondary flex-shrink-0 transition-transform group-hover/item:scale-110" />
                                                        <span className="text-muted-foreground text-sm">{detail}</span>
                                                    </li>
                                                ))}
                                                {service.details.length > 2 && (
                                                    <li className="flex items-start">
                                                        <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 text-secondary flex-shrink-0" />
                                                        <span className="text-muted-foreground text-sm italic">Y mucho más...</span>
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </CardContent>

                                    <CardFooter className="mt-auto pt-6 pb-8 relative z-10">
                                        <ServiceModal service={service}>
                                            <Button className="w-full group/btn" variant="secondary" suppressHydrationWarning>
                                                Saber Más
                                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        </ServiceModal>
                                    </CardFooter>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-32 mb-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10 transform rotate-1" />
                    <div className="text-center bg-background/80 backdrop-blur-md p-8 pb-16 md:p-16 rounded-3xl shadow-xl border border-white/20 relative overflow-hidden">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-x-10 -translate-y-10" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl translate-x-10 translate-y-10" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl rotate-45 flex items-center justify-center mx-auto mb-8">
                                <MessageSquareQuote className="w-8 h-8 text-primary -rotate-45" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold !font-headline mb-4">¿No sabes por dónde empezar?</h3>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                                Nuestro equipo está listo para escucharte. Contáctanos y te ayudaremos a identificar los servicios que mejor se adapten a tus metas y a las de tu empresa.
                            </p>
                            <MagneticButton>
                                <Button size="lg" className="rounded-full px-6 py-4 h-auto w-full sm:w-auto text-base sm:text-lg shadow-lg hover:shadow-xl transition-all" asChild>
                                    <Link href="/afiliate">
                                        Hablar con una Asesora <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
            <SectionDivider />
        </div>
    );
}
