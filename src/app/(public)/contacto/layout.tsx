import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto | CAMEBOL Cochabamba',
    description: 'Ponte en contacto con la Cámara de Mujeres Empresarias de Cochabamba. Encuentra nuestras oficinas, teléfonos, email y horarios de atención.',
    openGraph: {
        title: 'Contacto | CAMEBOL Cochabamba',
        description: 'Contáctate con nuestra cámara empresarial.',
        url: 'https://camebolcochabamba.com/contacto',
    }
};

export default function ContactoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
