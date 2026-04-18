"use server";

import { adminAuth } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";

export type UserRole = "admin" | "editor" | "user";

export interface UserData {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    role: UserRole;
    lastSignInTime?: string;
    creationTime?: string;
}

export async function getUsers(): Promise<{ users: UserData[], error?: string }> {
    try {
        if (!adminAuth) {
            console.error("Firebase Admin Auth not initialized");
            return { users: [], error: "Service unavailable" };
        }

        const listUsersResult = await adminAuth.listUsers(100); // Limit to 100 for now

        const users: UserData[] = listUsersResult.users.map((userRecord) => {
            const claims = userRecord.customClaims || {};
            let role: UserRole = "user";

            if (claims.admin) {
                role = "admin";
            } else if (claims.editor) {
                role = "editor";
            }

            return {
                uid: userRecord.uid,
                email: userRecord.email || "",
                displayName: userRecord.displayName,
                photoURL: userRecord.photoURL,
                role,
                lastSignInTime: userRecord.metadata.lastSignInTime,
                creationTime: userRecord.metadata.creationTime,
            };
        });

        return { users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { users: [], error: "Failed to fetch users" };
    }
}

export async function setUserRole(uid: string, role: UserRole) {
    await requireAdmin();
    try {
        if (!adminAuth) {
            throw new Error("Firebase Admin Auth not initialized");
        }

        let claims = {};

        switch (role) {
            case "admin":
                // Admin has all permissions
                claims = { admin: true, editor: true };
                break;
            case "editor":
                // Editor has content permissions only
                claims = { admin: false, editor: true };
                break;
            case "user":
            default:
                // Regular user has no special permissions
                claims = { admin: false, editor: false };
                break;
        }

        await adminAuth.setCustomUserClaims(uid, claims);
        revalidatePath("/admin/usuarios");
        return { success: true };
    } catch (error) {
        console.error("Error setting user role:", error);
        return { success: false, error: "Failed to set role" };
    }
}
