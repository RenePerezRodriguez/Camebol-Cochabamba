
import { getPublicEvents } from '@/actions/events';
import { CalendarioClient } from './calendario-client';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calendario de Eventos | CAMEBOL Cochabamba',
    description: 'Mantente al tanto de todos los eventos, talleres y reuniones de la Cámara de Mujeres Empresarias de Cochabamba. Participa y fortalece tu red empresarial.',
    openGraph: {
        title: 'Calendario de Eventos | CAMEBOL Cochabamba',
        description: 'No te pierdas ninguna de nuestras actividades diseñadas para transformar tu liderazgo.',
        url: 'https://camebolcochabamba.com/calendario',
    },
};

export const dynamic = 'force-dynamic';

export default async function CalendarioPage() {
    const events = await getPublicEvents();

    return <CalendarioClient initialEvents={events} />;
}
