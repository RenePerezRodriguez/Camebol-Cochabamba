import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calendario de Eventos | CAMEBOL Cochabamba',
    description: 'Mantente al día con los próximos eventos, talleres, seminarios y actividades organizadas por la Cámara de Mujeres Empresarias de Cochabamba.',
    openGraph: {
        title: 'Calendario de Eventos | CAMEBOL Cochabamba',
        description: 'Toda nuestra agenda de actividades empresariales y crecimiento profesional.',
        url: 'https://camebolcochabamba.com/calendario',
    }
};

export default function CalendarioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
