"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, MapPin, Search, Calendar as CalendarViewIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format, isPast } from 'date-fns';
import { es } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { EventCalendar } from '@/components/calendario/event-calendar';
import { cn } from '@/lib/utils';
import { AddToCalendarButton } from '@/components/calendario/add-to-calendar-button';
import { ViewSwitcher } from '@/components/shared/view-switcher';
import Image from 'next/image';
import { TextReveal } from '@/components/ui/text-reveal';
import { SectionDivider } from '@/components/ui/section-divider';

// Define types locally if not importing from shared types to avoid conflicts, or use Any for now if types are loose.
// But ideally we import the type returned by getPublicEvents. 
// Since we don't have a shared type file for the action return yet, let's define it based on what we return.

export type PublicEvent = {
    id: string;
    title: string;
    slug: string;
    start: Date;
    end: Date;
    location: string;
    description: string;
    longDescription: string;
    image: { imageUrl: string; imageHint: string };
    category: string;
};

type ViewMode = 'list' | 'calendar';

const EventCard = ({ event, index }: { event: PublicEvent, index: number }) => (
    <Card className={cn(
        "overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 break-inside-avoid flex flex-col group opacity-0 animate-fade-in-down bg-background/60 backdrop-blur-sm border-0 ring-1 ring-white/10 hover:ring-primary/30"
    )}
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <Link href={`/calendario/${event.slug}`} className="block relative overflow-hidden">
            <div className="relative h-52 w-full overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                    src={event.image.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Diamond Overlay Effect */}
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-background rotate-45 z-10 group-hover:scale-150 transition-transform duration-500" />
            </div>
            <Badge className="absolute top-4 right-4 z-20 shadow-lg bg-background/80 backdrop-blur-md text-foreground hover:bg-background capitalize">{event.category}</Badge>
        </Link>
        <div className="p-6 flex flex-col flex-grow relative">
            <CardHeader className="p-0 mb-4">
                <Link href={`/calendario/${event.slug}`}>
                    <CardTitle className="text-2xl !font-headline group-hover:text-primary transition-colors duration-300 leading-tight">{event.title}</CardTitle>
                </Link>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
                <div className="flex items-center text-muted-foreground mb-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 text-primary rotate-45 shrink-0">
                        <CalendarIcon className="w-4 h-4 -rotate-45" />
                    </div>
                    <span className="font-medium">{format(event.start, "d 'de' MMMM, yyyy", { locale: es })}</span>
                </div>
                <div className="flex items-center text-muted-foreground mb-5 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center mr-3 text-secondary rotate-45 shrink-0">
                        <MapPin className="w-4 h-4 -rotate-45" />
                    </div>
                    <span className="font-medium">{event.location}</span>
                </div>
                <CardDescription className="text-base line-clamp-3 mb-4">{event.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-0 pt-4 justify-between items-center border-t border-border/50 mt-auto">
                <Button asChild variant="ghost" className="group/btn pl-0 hover:bg-transparent hover:text-primary">
                    <Link href={`/calendario/${event.slug}`}>
                        Ver Detalles <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </Button>
                {/* Cast event to any for AddToCalendarButton if types don't perfectly match, or ensure PublicEvent satisfies it */}
                <AddToCalendarButton event={event as any}>
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors">
                        <CalendarIcon className="w-4 h-4" />
                    </Button>
                </AddToCalendarButton>
            </CardFooter>
        </div>
    </Card>
);

interface CalendarioClientProps {
    initialEvents: PublicEvent[];
}

export function CalendarioClient({ initialEvents }: CalendarioClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('Todos');
    const [view, setView] = useState<ViewMode>('list');

    // Derived state for events
    const { upcomingEvents, pastEvents } = useMemo(() => {
        // We received dates as Date objects from the server component (if we pass them correctly)
        // But Next.js serialization might convert them to strings if we are not careful. 
        // However, if we pass them from a Server Component to a Client Component, they must be serializable (strings).
        // Let's assume the parent converts them or we parse them here.
        // Actually, passing Date objects from SC to CC is weird in Next.js 13+ sometimes (warnings).
        // But let's assume valid Dates for now.

        const upcoming = initialEvents.filter(e => !isPast(e.end)).sort((a, b) => a.start.getTime() - b.start.getTime());
        const past = initialEvents.filter(e => isPast(e.end)).sort((a, b) => b.start.getTime() - a.start.getTime());
        return { upcomingEvents: upcoming, pastEvents: past };
    }, [initialEvents]);

    const eventCategories = useMemo(() => {
        const allCategories = initialEvents.map(event => event.category);
        return ['Todos', ...Array.from(new Set(allCategories))];
    }, [initialEvents]);

    const filterEvents = (events: PublicEvent[]) => {
        return events.filter(event => {
            const matchesCategory = activeCategory === 'Todos' || event.category === activeCategory;
            const matchesSearch = searchTerm === '' || event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    };

    const filteredUpcoming = filterEvents(upcomingEvents);
    const filteredPast = filterEvents(pastEvents);

    return (
        <div className="relative overflow-hidden min-h-screen">
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
                        Agenda CAMEBOL
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !font-headline leading-tight">
                        <TextReveal text="Calendario de Actividades" />
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Mantente al día con nuestros próximos eventos, talleres y oportunidades de networking.
                    </p>
                </div>

                <Tabs defaultValue="upcoming" className="w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-background/50 backdrop-blur-sm p-4 rounded-2xl border border-white/10 shadow-sm">
                        <TabsList className="bg-muted/50">
                            <TabsTrigger value="upcoming" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Próximos Eventos</TabsTrigger>
                            <TabsTrigger value="past" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Eventos Pasados</TabsTrigger>
                        </TabsList>
                        <div className="hidden md:block">
                            <ViewSwitcher view={view} setView={setView} modes={['list', 'calendar']} />
                        </div>
                    </div>

                    <div className="md:hidden flex justify-end mb-4">
                        <ViewSwitcher view={view} setView={setView} modes={['list', 'calendar']} />
                    </div>

                    <div className="mb-12 space-y-6">
                        <div className="relative md:col-span-2 max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Buscar evento por nombre o descripción..."
                                className="pl-12 w-full h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary focus:ring-primary/20 transition-all shadow-sm"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center flex-wrap gap-2">
                            {eventCategories.map(category => (
                                <Button
                                    key={category}
                                    variant={activeCategory === category ? 'default' : 'outline'}
                                    onClick={() => setActiveCategory(category)}
                                    className={cn("rounded-full px-6 transition-all", activeCategory === category ? "shadow-md scale-105" : "hover:bg-primary/5")}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <TabsContent value="upcoming" className="mt-0">
                        {view === 'list' ? (
                            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                {filteredUpcoming.length > 0 ? filteredUpcoming.map((event, index) => (
                                    <EventCard key={event.slug} event={event} index={index} />
                                )) : (
                                    <div className="col-span-full text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/20">
                                        <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                                        <p className='text-lg text-muted-foreground'>No hay próximos eventos que coincidan con tu búsqueda.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-background/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl">
                                {/* Cast if necessary for EventCalendar props */}
                                <EventCalendar events={filteredUpcoming as any} />
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="past" className="mt-0">
                        {view === 'list' ? (
                            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                                {filteredPast.length > 0 ? filteredPast.map((event, index) => (
                                    <EventCard key={event.slug} event={event} index={index} />
                                )) : (
                                    <div className="col-span-full text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/20">
                                        <CalendarIcon className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                                        <p className='text-lg text-muted-foreground'>No hay eventos pasados que coincidan con tu búsqueda.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-background/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl">
                                <EventCalendar events={filteredPast as any} />
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
            <SectionDivider />
        </div>
    );
}
