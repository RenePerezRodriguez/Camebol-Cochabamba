import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Servicios y Beneficios | CAMEBOL Cochabamba',
    description: 'Descubre los servicios y beneficios exclusivos para nuestras afiliadas: Desarrollo Empresarial, Asesoría, Networking y Visibilidad para potenciar tu empresa.',
    openGraph: {
        title: 'Servicios | CAMEBOL Cochabamba',
        description: 'Potenciamos tu empresa con desarrollo, asesoría y networking exclusivo.',
        url: 'https://camebolcochabamba.com/servicios',
    }
};

export default function ServiciosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
