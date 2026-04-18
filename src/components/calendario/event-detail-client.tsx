
'use client';

import { useState, useEffect, useMemo } from 'react';
import { type Event } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Tag, Calendar as CalendarIcon, ArrowRight, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Countdown from './countdown';
import { AddToCalendarButton } from './add-to-calendar-button';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SectionDivider } from '@/components/ui/section-divider';

type EventDetailClientProps = {
  event: Event;
  relatedEvents: Event[];
};

export function EventDetailClient({ event: initialEvent, relatedEvents: initialRelatedEvents }: EventDetailClientProps) {
  const { ref: detailsRef, inView: detailsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: relatedRef, inView: relatedInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const event = useMemo(() => ({
    ...initialEvent,
    start: new Date(initialEvent.start),
    end: new Date(initialEvent.end),
  }), [initialEvent]);

  const relatedEvents = useMemo(() => initialRelatedEvents.map(e => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end),
  })), [initialRelatedEvents]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    if (!isClient) return '...';
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  };

  const isMultiDay = event.start.toDateString() !== event.end.toDateString();

  return (
    <div className="relative overflow-hidden min-h-screen bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={event.image.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={event.image.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          {/* Diamond Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('/patterns/diamond-grid.svg')] bg-repeat" />
        </div>

        <div className="container relative z-10 text-center pt-20">
          <div className="inline-block mb-6 animate-fade-in-down">
            <Badge variant="secondary" className="text-sm px-4 py-1.5 shadow-lg backdrop-blur-md bg-white/20 text-white border-white/20 hover:bg-white/30">
              {event.category}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold !font-headline leading-tight text-white mb-6 max-w-4xl mx-auto drop-shadow-lg animate-fade-in-up">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <CalendarIcon className="w-5 h-5 text-primary-foreground" />
              <span className="font-medium">{formatDate(event.start)}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <MapPin className="w-5 h-5 text-primary-foreground" />
              <span className="font-medium">{event.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={detailsRef} className="container py-16 relative -mt-20 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 animate-fade-in-up">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-2xl border-0 ring-1 ring-white/20 bg-background/80 backdrop-blur-md overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-6">
                <CardTitle className="text-2xl !font-headline flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary rotate-45">
                    <Tag className="w-5 h-5 -rotate-45" />
                  </div>
                  Detalles del Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p className="whitespace-pre-wrap">{event.longDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-border/50">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Horario</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(event.start)}</p>
                      <p className="text-sm text-muted-foreground font-medium text-primary">
                        <span suppressHydrationWarning>{formatTime(event.start)}</span> - <span suppressHydrationWarning>{formatTime(event.end)}</span>
                      </p>
                      {isMultiDay && <p className="text-xs text-muted-foreground mt-1">(Finaliza el {formatDate(event.end)})</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:border-secondary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <Button variant="link" className="p-0 h-auto text-xs mt-2 text-secondary" asChild>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noopener noreferrer">
                          Ver en mapa <ArrowRight className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: CTA */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-24 shadow-2xl border-0 ring-1 ring-white/20 bg-background/80 backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl !font-headline">¡Reserva tu Lugar!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="bg-muted/50 rounded-2xl p-4 text-center border border-border/50">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">El evento comienza en</h4>
                  <Countdown targetDate={event.start} />
                </div>

                <div className="space-y-3">
                  <MagneticButton>
                    <Button size="lg" className="w-full rounded-full h-12 text-lg shadow-lg hover:shadow-primary/25 transition-all">
                      Registrarse Ahora
                    </Button>
                  </MagneticButton>
                  <AddToCalendarButton event={event}>
                    <Button variant="outline" className="w-full rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Añadir al Calendario
                    </Button>
                  </AddToCalendarButton>
                </div>

                <div className="pt-4 border-t border-border/50 text-center">
                  <p className="text-sm text-muted-foreground mb-3">Comparte este evento</p>
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Events Section */}
      {relatedEvents.length > 0 && (
        <section ref={relatedRef} className="py-20 bg-muted/30 relative">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className={cn("text-3xl font-bold !font-headline opacity-0", relatedInView && "animate-fade-in-down")}>
                También te podría interesar
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
              {relatedEvents.map((relatedEvent, index) => (
                <Card key={relatedEvent.slug} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-background" style={{ animationDelay: `${index * 150}ms` }}>
                  <Link href={`/calendario/${relatedEvent.slug}`} className="block relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image
                      src={relatedEvent.image.imageUrl}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={relatedEvent.image.imageHint}
                    />
                    <Badge className="absolute top-3 right-3 z-20 shadow-md">{relatedEvent.category}</Badge>
                  </Link>
                  <CardContent className="p-6">
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <CalendarIcon className="w-3 h-3 mr-1 text-primary" />
                      {formatDate(relatedEvent.start)}
                    </div>
                    <Link href={`/calendario/${relatedEvent.slug}`}>
                      <h3 className="font-bold !font-headline text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{relatedEvent.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relatedEvent.description}</p>
                    <Button variant="link" className="p-0 h-auto text-primary group/btn" asChild>
                      <Link href={`/calendario/${relatedEvent.slug}`}>
                        Ver Detalles <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
      <SectionDivider />
    </div>
  );
}
