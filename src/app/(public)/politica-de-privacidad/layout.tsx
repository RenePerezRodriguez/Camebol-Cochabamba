import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad | CAMEBOL Cochabamba',
    description: 'Entérate cómo manejamos y protegemos tus datos en CAMEBOL.',
    robots: {
        index: false,
        follow: true,
    }
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
