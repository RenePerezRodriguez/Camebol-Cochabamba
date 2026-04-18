import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { JourneySection } from '@/components/home/journey-section';
import { ServicesSection } from '@/components/home/services-section';
import { EventsSection } from '@/components/home/events-section';
import { AlliancesSection } from '@/components/home/alliances-section';
import { getUpcomingEvents } from '@/actions/events';
import { getLandingStats } from '@/actions/landing-content';

import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Inicio | Cámara de Mujeres Empresarias - CAMEBOL Cochabamba',
  description: 'Conoce a la Cámara de Mujeres Empresarias de Cochabamba. Únete a nuestra red de líderes, descubre nuestras asociadas y fortalece tu negocio con nosotras.',
  openGraph: {
    title: 'Inicio | CAMEBOL Cochabamba',
    description: 'Únete a la red de mujeres empresarias más importante de Cochabamba.',
    url: 'https://camebolcochabamba.com',
  },
};
export default async function Home() {
  const [events, statsData] = await Promise.all([
    getUpcomingEvents(),
    getLandingStats(),
  ]);

  return (
    <>
      <HeroSection />
      <AboutSection statsData={statsData} />
      <ServicesSection />
      <JourneySection />
      <EventsSection events={events} />
      <AlliancesSection />
    </>
  );
}
