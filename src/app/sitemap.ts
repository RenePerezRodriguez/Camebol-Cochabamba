import { MetadataRoute } from 'next';
import { getSectors } from '@/actions/sectors';
import { getPublicAssociates } from '@/actions/associates';
import { getPublishedNews } from '@/actions/news';
import { getPublicEvents } from '@/actions/events';
import { slugify } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://camebolcochabamba.com';

    // Static routes
    const routes = [
        '',
        '/quienes-somos',
        '/servicios',
        '/asociadas',
        '/calendario',
        '/noticias',
        '/contacto',
        '/afiliate',
        '/politica-de-privacidad',
        '/politica-de-cookies',
        '/terminos-y-condiciones',
        '/preguntas-frecuentes',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Sectors
    const sectors = await getSectors();
    const sectorRoutes = sectors.map((sector) => ({
        url: `${baseUrl}/asociadas/rubro/${slugify(sector.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dynamic Associates
    const associates = await getPublicAssociates();
    const associateRoutes = associates.map((associate) => ({
        url: `${baseUrl}/asociadas/${associate.slug}`,
        lastModified: associate.updatedAt || associate.createdAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Dynamic News
    const news = await getPublishedNews();
    const newsRoutes = news.map((item) => ({
        url: `${baseUrl}/noticias/${item.slug}`,
        lastModified: new Date(item.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Dynamic Events
    const events = await getPublicEvents();
    const eventRoutes = events.map((event) => ({
        url: `${baseUrl}/calendario/${event.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...sectorRoutes, ...associateRoutes, ...newsRoutes, ...eventRoutes];
}
