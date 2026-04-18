"use server";

import { createSessionCookie, clearSessionCookie } from "@/lib/session";

export async function loginAction(idToken: string) {
    try {
        await createSessionCookie(idToken);
        return { success: true };
    } catch (error: any) {
        return { error: error.message || "Failed to create session" };
    }
}

export async function logoutAction() {
    await clearSessionCookie();
    return { success: true };
}
