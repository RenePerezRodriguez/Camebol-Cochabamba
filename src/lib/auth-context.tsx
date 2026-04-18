"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, IdTokenResult } from "firebase/auth";
import { auth } from "./firebase";
import { logoutAction } from "@/actions/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    claims: { [key: string]: any } | null;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
    claims: null,
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [claims, setClaims] = useState<{ [key: string]: any } | null>(null);

    useEffect(() => {

        // Safety timeout in case Firebase hangs
        const timeoutId = setTimeout(() => {
            console.warn("AuthProvider: Firebase auth timed out, forcing loading false");
            setLoading((prev) => {
                if (prev) return false;
                return prev;
            });
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            clearTimeout(timeoutId); // Clear timeout on successful response

            setUser(currentUser);

            if (currentUser) {
                try {
                    // Force token refresh to get latest claims
                    const tokenResult: IdTokenResult = await currentUser.getIdTokenResult(true);
                    setClaims(tokenResult.claims);
                    setIsAdmin(!!tokenResult.claims.admin);
                } catch (error) {
                    console.error("Error fetching token result:", error);
                    setClaims(null);
                    setIsAdmin(false);
                }
            } else {
                setClaims(null);
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return () => {
            unsubscribe();
            clearTimeout(timeoutId);
        };
    }, []);

    const logout = async () => {
        try {
            await logoutAction();
            await auth.signOut();
            setUser(null);
            setClaims(null);
            setIsAdmin(false);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, claims, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
