'use server';

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/session';

const STATS_DOC_PATH = 'settings/landing_stats';

export interface LandingStats {
    members: number;
    trainedWomen: number;
    businessRounds: number;
}

const DEFAULT_STATS: LandingStats = {
    members: 1200,
    trainedWomen: 700,
    businessRounds: 100,
};

export async function getLandingStats(): Promise<LandingStats> {
    try {
        const doc = await adminDb.doc(STATS_DOC_PATH).get();
        if (!doc.exists) {
            await adminDb.doc(STATS_DOC_PATH).set(DEFAULT_STATS);
            return DEFAULT_STATS;
        }
        const data = doc.data() as LandingStats;
        // If all values are 0 (not configured yet), use defaults
        if (!data.members && !data.trainedWomen && !data.businessRounds) {
            return DEFAULT_STATS;
        }
        return data;
    } catch (error) {
        console.error('Error fetching landing stats:', error);
        return DEFAULT_STATS;
    }
}

export async function updateLandingStats(stats: LandingStats) {
    await requireAdmin();
    try {
        await adminDb.doc(STATS_DOC_PATH).set(stats);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error updating landing stats:', error);
        return { success: false, error: 'Failed to update stats' };
    }
}
