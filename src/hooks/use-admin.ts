"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAdmin() {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    return {
        user,
        loading,
        isAdmin,
    };
}

export function useRequireAdmin(redirectUrl = "/admin/login") {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            router.push(redirectUrl);
        }
    }, [user, loading, isAdmin, router, redirectUrl]);

    return { user, loading, isAdmin };
}
