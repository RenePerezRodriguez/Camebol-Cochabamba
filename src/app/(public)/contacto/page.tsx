import { Metadata } from 'next';
import { ContactoClient } from './contacto-client';

export const metadata: Metadata = {
    title: 'Contáctanos | CAMEBOL Cochabamba',
    description: '¿Tienes alguna duda o quieres ser parte de la Cámara de Mujeres Empresarias? Ponte en contacto con nosotros. Estamos para apoyarte en tu crecimiento empresarial.',
    openGraph: {
        title: 'Contáctanos | CAMEBOL Cochabamba',
        description: 'Escríbenos y únete a la red de mujeres empresarias más importante de Bolivia.',
        url: 'https://camebolcochabamba.com/contacto',
    },
};

export default function ContactoPage() {
    return <ContactoClient />;
}
