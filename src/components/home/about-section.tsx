
import { LandingStats } from '@/actions/landing-content';
import { AboutSectionClient } from './about-section-client';

export async function AboutSection({ statsData }: { statsData: LandingStats }) {
    const stats = [
        { value: statsData.members, label: 'Asociadas a nivel nacional' },
        { value: statsData.trainedWomen, label: 'Mujeres capacitadas en formación empresarial' },
        { value: statsData.businessRounds, label: 'Rondas de negocio' },
    ];

    // Server Component doesn't support hooks like useInView directly in the render body if it's async
    // But we need client interactivity for animations. 
    // Best pattern: Pass data to a Client Component wrapper.

    return <AboutSectionClient stats={stats} />;
}
