"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface MaintenanceGuardProps {
    isEnabled: boolean;
}

export function MaintenanceGuard({ isEnabled }: MaintenanceGuardProps) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Allow admin routes, login, and static assets always
        if (pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
            return;
        }

        if (isEnabled) {
            // If maintenance is on, and we are NOT on maintenance page, go there
            if (pathname !== "/mantenimiento") {
                router.push("/mantenimiento");
            }
        } else {
            // If maintenance is off, and we ARE on maintenance page, go home
            // This prevents users from getting stuck on /mantenimiento if they refresh after we disable it
            if (pathname === "/mantenimiento") {
                router.replace("/");
            }
        }
    }, [isEnabled, pathname, router]);

    return null; // This component renders nothing
}
