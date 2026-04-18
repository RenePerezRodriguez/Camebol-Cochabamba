import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quiénes Somos | CAMEBOL Cochabamba',
    description: 'Conoce la historia, misión, visión y a la mesa directiva de la Cámara de Mujeres Empresarias de Cochabamba. Descubre nuestro impacto en Bolivia.',
    openGraph: {
        title: 'Quiénes Somos | CAMEBOL Cochabamba',
        description: 'La historia y el directorio detrás de nuestra red empresarial femenina en Bolivia.',
        url: 'https://camebolcochabamba.com/quienes-somos',
    }
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
