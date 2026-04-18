"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function getDashboardStats() {
    try {
        const [eventsSnap, membersSnap, companiesSnap, newsSnap, affiliationsSnap] = await Promise.all([
            adminDb.collection("events").get(),
            adminDb.collection("members").get(),
            adminDb.collection("companies").get(),
            adminDb.collection("news").get(),
            adminDb.collection("forms_affiliate").get(),
        ]);

        const totalEvents = eventsSnap.size;
        const totalMembers = membersSnap.size;
        const activeMembers = membersSnap.docs.filter(doc => doc.data().isActive).length;
        const totalCompanies = companiesSnap.size;
        const totalNews = newsSnap.size;
        const pendingAffiliations = affiliationsSnap.docs.filter(doc => doc.data().status === 'pending').length;
        const totalAffiliations = affiliationsSnap.size;

        // Upcoming events (next 5)
        const now = new Date();
        const upcomingEvents = eventsSnap.docs
            .filter(doc => {
                const start = doc.data().start?.toDate ? doc.data().start.toDate() : new Date(doc.data().start);
                return start >= now;
            })
            .sort((a, b) => {
                const aDate = a.data().start?.toDate ? a.data().start.toDate() : new Date(a.data().start);
                const bDate = b.data().start?.toDate ? b.data().start.toDate() : new Date(b.data().start);
                return aDate.getTime() - bDate.getTime();
            })
            .slice(0, 5)
            .map(doc => {
                const d = doc.data();
                const start = d.start?.toDate ? d.start.toDate() : new Date(d.start);
                return { id: doc.id, title: d.title, date: start.toISOString(), category: d.category || 'General' };
            });

        // Recent affiliations (last 5)
        const recentAffiliations = affiliationsSnap.docs
            .sort((a, b) => {
                const aDate = a.data().createdAt?.toDate ? a.data().createdAt.toDate() : new Date();
                const bDate = b.data().createdAt?.toDate ? b.data().createdAt.toDate() : new Date();
                return bDate.getTime() - aDate.getTime();
            })
            .slice(0, 5)
            .map(doc => {
                const d = doc.data();
                const created = d.createdAt?.toDate ? d.createdAt.toDate() : new Date();
                return { id: doc.id, empresa: d.empresa, representante: d.representante, status: d.status, date: created.toISOString() };
            });

        // Last 6 months member growth
        const last6Months = Array.from({ length: 6 }, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - (5 - i));
            return d.toLocaleString('es-BO', { month: 'short' });
        });

        const memberGrowth = last6Months.reduce((acc, month) => {
            const key = month.charAt(0).toUpperCase() + month.slice(1);
            acc[key] = 0;
            return acc;
        }, {} as Record<string, number>);

        membersSnap.docs.forEach(doc => {
            const date = doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date();
            const month = date.toLocaleString('es-BO', { month: 'short' });
            const key = month.charAt(0).toUpperCase() + month.slice(1);
            if (memberGrowth[key] !== undefined) {
                memberGrowth[key]++;
            }
        });

        const chartData = Object.entries(memberGrowth).map(([name, value]) => ({
            name,
            total: value
        }));

        const eventsByCategory = eventsSnap.docs.reduce((acc, doc) => {
            const cat = doc.data().category || "Sin categoría";
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const categoryData = Object.entries(eventsByCategory).map(([name, value]) => ({
            name,
            value
        }));

        return {
            totalEvents,
            totalMembers,
            activeMembers,
            totalCompanies,
            totalNews,
            pendingAffiliations,
            totalAffiliations,
            upcomingEvents,
            recentAffiliations,
            chartData,
            categoryData,
        };
    } catch (error) {
        console.error("Error fetching stats:", error);
        return {
            totalEvents: 0,
            totalMembers: 0,
            activeMembers: 0,
            totalCompanies: 0,
            totalNews: 0,
            pendingAffiliations: 0,
            totalAffiliations: 0,
            upcomingEvents: [],
            recentAffiliations: [],
            chartData: [],
            categoryData: [],
        };
    }
}
