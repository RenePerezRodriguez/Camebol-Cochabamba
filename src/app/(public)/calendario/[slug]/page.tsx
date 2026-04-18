import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { EventDetailClient } from '@/components/calendario/event-detail-client';
import { getEventBySlug, getPublicEvents } from '@/actions/events';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Evento No Encontrado',
    };
  }

  return {
    title: `${event.title} | CAMEBOL Cochabamba`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [
        {
          url: event.image.imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  };
}

async function EventDetails({ slug }: { slug: string }) {
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Fetch all public events to find related ones
  // Optimization: In a real app, strict "related" logic (by category) would be better in a separate action
  const allEvents = await getPublicEvents();

  // Exclude current and just take 3 others. 
  // Ideally filtering by category would be nice.
  const relatedEvents = allEvents
    .filter((e) => e.slug !== slug && e.category === event.category)
    .slice(0, 3);

  // If not enough related by category, just fill with others
  if (relatedEvents.length < 3) {
    const others = allEvents
      .filter(e => e.slug !== slug && e.category !== event.category)
      .slice(0, 3 - relatedEvents.length);
    relatedEvents.push(...others);
  }

  // Ensure types match what Client expects. 
  // The server actions return objects compatible with the Event interface but we cast to be sure or rely on TS.
  // We need to cast 'any' if the types are slightly mismatching in strictness of ImagePlaceholder.
  return <EventDetailClient event={event as any} relatedEvents={relatedEvents as any[]} />;
}

export default async function EventoDetallePage({ params }: Props) {
  const { slug } = await params;

  return (
    <Suspense fallback={<div className="container py-20 text-center">Cargando evento...</div>}>
      <EventDetails slug={slug} />
    </Suspense>
  );
}
