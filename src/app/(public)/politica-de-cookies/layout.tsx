import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Cookies | CAMEBOL Cochabamba',
    description: 'Información sobre el uso de cookies en nuestro portal web.',
    robots: {
        index: false,
        follow: true,
    }
};

export default function CookiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
