import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Afíliate a CAMEBOL | Cámara de Mujeres Empresarias',
    description: 'Únete a la Cámara de Mujeres Empresarias de Cochabamba. Conoce los requisitos, beneficios y llena el formulario para ser parte de nuestra red.',
    openGraph: {
        title: 'Afíliate a CAMEBOL Cochabamba',
        description: 'Haz crecer tu empresa rodeada de líderes. Conviértete en asociada.',
        url: 'https://camebolcochabamba.com/afiliate',
    }
};

export default function AfiliateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
