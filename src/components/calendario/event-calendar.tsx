
'use client';

import React from 'react';
import { Calendar, dateFnsLocalizer, type EventProps } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import type { Event as CalendarEvent } from '@/lib/data';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';


const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales,
});

const categoryColors: {[key: string]: string} = {
    'Networking': 'bg-blue-500 border-blue-500',
    'Taller': 'bg-green-500 border-green-500',
    'Foro': 'bg-purple-500 border-purple-500'
}

const CustomEvent = ({ event }: EventProps<CalendarEvent>) => (
    <div className='text-xs p-1'>
        <Badge variant="secondary" className={cn("text-white", categoryColors[event.category] || 'bg-primary border-primary')}>
            {event.title}
        </Badge>
    </div>
);

interface EventCalendarProps {
    events: CalendarEvent[];
}

export const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
    const router = useRouter();

    const handleSelectEvent = (event: CalendarEvent) => {
        router.push(`/calendario/${event.slug}`);
    };

    return (
        <Card className="p-4">
             <Calendar<CalendarEvent>
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                onSelectEvent={handleSelectEvent}
                messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    agenda: "Agenda",
                    date: "Fecha",
                    time: "Hora",
                    event: "Evento",
                    noEventsInRange: "No hay eventos en este rango.",
                    showMore: total => `+ Ver más (${total})`
                }}
                culture="es"
                components={{
                    event: CustomEvent
                }}
            />
        </Card>
    );
};
