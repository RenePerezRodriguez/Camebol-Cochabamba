
import { getLandingStats } from '@/actions/landing-content';
import { getPublicMembers } from '@/actions/members'; // Import member fetching action
import { QuienesSomosClient } from './quienes-somos-client';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Quiénes Somos | Cámara de Mujeres Empresarias - CAMEBOL Cochabamba',
    description: 'Conoce la historia, visión y compromiso de la Cámara de Mujeres Empresarias de Bolivia. Conectamos y fortalecemos el liderazgo femenino en Cochabamba.',
    openGraph: {
        title: 'Quiénes Somos | CAMEBOL Cochabamba',
        description: 'La Cámara de Mujeres Empresarias de Cochabamba: empoderando el liderazgo femenino en Bolivia.',
        url: 'https://camebolcochabamba.com/quienes-somos',
    },
};

export const dynamic = 'force-dynamic';

export default async function QuienesSomosPage() {
    const [statsData, members] = await Promise.all([
        getLandingStats(),
        getPublicMembers()
    ]);

    const stats = [
        { value: statsData.members, label: 'Asociadas a nivel nacional' },
        { value: statsData.businessRounds, label: 'Rondas de Negocio' },
        { value: statsData.trainedWomen, label: 'Mujeres Capacitadas' },
    ];

    return <QuienesSomosClient stats={stats} members={members} />;
}
