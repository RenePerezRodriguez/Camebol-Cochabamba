import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | CAMEBOL Cochabamba',
    description: 'Lee nuestros Términos y Condiciones de uso para el portal de CAMEBOL Cochabamba.',
    robots: {
        index: false,
        follow: true,
    }
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
