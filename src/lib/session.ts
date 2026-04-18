import "server-only";
import { cookies } from "next/headers";
import { adminAuth } from "./firebase-admin";

const SESSION_COOKIE_NAME = "__session";
const SESSION_EXPIRY_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

export async function createSessionCookie(idToken: string) {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn: SESSION_EXPIRY_MS,
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_EXPIRY_MS / 1000,
        path: "/",
    });
}

export async function clearSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifySession(): Promise<{ uid: string; email: string; admin: boolean } | null> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

        if (!sessionCookie) return null;

        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
        return {
            uid: decoded.uid,
            email: decoded.email || "",
            admin: !!decoded.admin,
        };
    } catch {
        return null;
    }
}

export async function requireAdmin(): Promise<{ uid: string; email: string }> {
    const session = await verifySession();
    if (!session || !session.admin) {
        throw new Error("Unauthorized: Admin access required");
    }
    return { uid: session.uid, email: session.email };
}
