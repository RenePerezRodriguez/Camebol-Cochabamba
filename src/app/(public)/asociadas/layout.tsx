import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nuestras Asociadas y Sectores | CAMEBOL Cochabamba',
    description: 'Explora el directorio de empresas y profesionales que forman parte de la Cámara de Mujeres Empresarias de Cochabamba. Encuentra servicios por rubro.',
    openGraph: {
        title: 'Directorio de Asociadas | CAMEBOL Cochabamba',
        description: 'Conoce a las mujeres líderes detrás de las mejores empresas de la región.',
        url: 'https://camebolcochabamba.com/asociadas',
    }
};

export default function AsociadasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
