import "server-only";
import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";



let adminDb: FirebaseFirestore.Firestore;
let adminAuth: import("firebase-admin/auth").Auth;

// Helper to create safe mocks that don't crash build
const createMock = (reason: string) => {
    console.warn(`⚠️ [FirebaseAdmin] Using MOCK. Reason: ${reason}`);
    const mockFn = () => {
        console.error(`❌ [FirebaseAdmin] Runtime blocked: ${reason}`);
        throw new Error(`Firebase Admin not available: ${reason}`);
    };
    const mockDb = {
        collection: () => ({
            doc: () => ({ get: mockFn, delete: mockFn, update: mockFn, set: mockFn }),
            add: mockFn,
            orderBy: () => ({ get: mockFn, limit: () => ({ get: mockFn }) }),
            get: mockFn,
            where: () => ({ get: mockFn })
        }),
    } as any;
    const mockAuth = {
        getUser: mockFn,
        setCustomUserClaims: mockFn,
        getUserByEmail: mockFn,
        verifyIdToken: mockFn
    } as any;
    return { adminDb: mockDb, adminAuth: mockAuth };
}

try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    // Prioritize NEXT_PUBLIC_... but fallback to FIREBASE_CONFIG.projectId if available
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
        (process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG).projectId : undefined);

    if (getApps().length === 0) {
        if (privateKey && clientEmail && projectId) {
            // Local development or manual env vars
            const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
            initializeApp({
                credential: cert({ projectId, clientEmail, privateKey }),
                storageBucket: storageBucket,
            });
        } else {
            // Cloud/App Hosting environment (ADC)
            const { applicationDefault } = require("firebase-admin/app");

            // Extract storage bucket from FIREBASE_CONFIG if possible, or env
            let storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
            if (!storageBucket && process.env.FIREBASE_CONFIG) {
                try {
                    storageBucket = JSON.parse(process.env.FIREBASE_CONFIG).storageBucket;
                } catch (e) { /* ignore parse error */ }
            }

            initializeApp({
                credential: applicationDefault(),
                projectId: projectId, // Explicitly pass projectId if found
                storageBucket: storageBucket,
            });
        }
    }

    // Try getting services
    adminDb = getFirestore();
    adminAuth = getAuth();

} catch (error) {
    console.error("❌ [FirebaseAdmin] Init crashed:", error);
    // Fallback to mock on crash
    const mocks = createMock(`Init failed: ${error}`);
    adminDb = mocks.adminDb;
    adminAuth = mocks.adminAuth;
}

// Storage is initialized separately after app init
const adminStorage = getApps().length > 0 ? getStorage() : null;

export { adminDb, adminAuth, adminStorage };
