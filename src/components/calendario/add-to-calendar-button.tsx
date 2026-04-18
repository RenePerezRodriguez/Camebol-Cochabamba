
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Event } from '@/lib/data';

function generateUrl(type: 'google' | 'outlook' | 'yahoo', event: Event): string {
    const formatTime = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    
    const startTime = formatTime(event.start);
    const endTime = formatTime(event.end);

    const encodedTitle = encodeURIComponent(event.title);
    const encodedLocation = encodeURIComponent(event.location);
    const encodedDescription = encodeURIComponent(event.description);

    switch (type) {
        case 'google':
            return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startTime}/${endTime}&details=${encodedDescription}&location=${encodedLocation}`;
        case 'outlook':
            return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodedTitle}&startdt=${startTime}&enddt=${endTime}&body=${encodedDescription}&location=${encodedLocation}`;
        case 'yahoo':
             return `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodedTitle}&st=${startTime}&et=${endTime}&desc=${encodedDescription}&in_loc=${encodedLocation}`;
    }
}

function generateIcs(event: Event) {
    const formatTime = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '') + 'Z';
    
    const startTime = formatTime(event.start);
    const endTime = formatTime(event.end);

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `DTSTART:${startTime}`,
        `DTEND:${endTime}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export function AddToCalendarButton({ event, children }: { event: Event, children: React.ReactNode }) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem asChild>
                <a href={generateUrl('google', event)} target="_blank" rel="noopener noreferrer">Google Calendar</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <a href={generateUrl('outlook', event)} target="_blank" rel="noopener noreferrer">Outlook</a>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <a href={generateUrl('yahoo', event)} target="_blank" rel="noopener noreferrer">Yahoo Calendar</a>
            </DropdownMenuItem>
             <DropdownMenuItem onClick={() => generateIcs(event)}>
                Apple Calendar (.ics)
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
