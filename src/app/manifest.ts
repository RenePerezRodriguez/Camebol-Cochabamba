import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'CAMEBOL Cochabamba',
        short_name: 'CAMEBOL',
        description: 'Cámara de Mujeres Empresarias de Bolivia - Filial Cochabamba',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#D61F69',
        icons: [
            {
                src: '/favicon.ico',
                type: 'image/x-icon',
            },
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            }
        ],
    };
}
