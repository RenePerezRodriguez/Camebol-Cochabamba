"use client";

import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { UserRole } from "@/actions/users";

export function useRoles() {
    const { user, loading } = useAuth();
    const [role, setRole] = useState<UserRole>("user");
    const [claimsLoading, setClaimsLoading] = useState(true);

    useEffect(() => {
        async function checkClaims() {
            if (!user) {
                setRole("user");
                setClaimsLoading(false);
                return;
            }

            try {
                // Force token refresh to get latest claims if needed, 
                // but usually useAuth already provides a token. 
                // We need the parsed claims.
                const tokenResult = await user.getIdTokenResult();
                const claims = tokenResult.claims;

                if (claims.admin) {
                    setRole("admin");
                } else if (claims.editor) {
                    setRole("editor");
                } else {
                    setRole("user");
                }
            } catch (e) {
                console.error("Error parsing claims", e);
                setRole("user");
            } finally {
                setClaimsLoading(false);
            }
        }

        if (!loading) {
            checkClaims();
        }
    }, [user, loading]);

    const isAdmin = role === "admin";
    const isEditor = role === "editor" || role === "admin"; // Admins are implicitly editors

    return {
        role,
        isAdmin,
        isEditor,
        loading: loading || claimsLoading
    };
}
