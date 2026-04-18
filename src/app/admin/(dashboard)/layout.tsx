"use client";

import { useRequireAdmin } from "@/hooks/use-admin";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LayoutDashboard, Calendar, Users, FileText, LogOut, Menu, X, ChevronRight, Building2, Newspaper, ShieldCheck, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchCommand } from "@/components/admin/search-command";
import { useTour } from "@/hooks/use-tour";
import { useEffect } from "react";
const navigationGroups = [
    {
        title: "Principal",
        items: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        ]
    },
    {
        title: "Gestión",
        items: [
            { name: "Asociadas", href: "/admin/asociadas", icon: Building2 },
            { name: "Afiliaciones", href: "/admin/afiliaciones", icon: FileText },
            { name: "Directorio", href: "/admin/directorio", icon: Users },
        ]
    },
    {
        title: "Contenido",
        items: [
            { name: "Noticias", href: "/admin/noticias", icon: Newspaper },
            { name: "Eventos", href: "/admin/eventos", icon: Calendar },
            { name: "Banners", href: "/admin/banners", icon: FileText },
            { name: "Contenido Home", href: "/admin/contenido", icon: FileText },
        ]
    },
    {
        title: "Sistema",
        items: [
            { name: "Usuarios", href: "/admin/usuarios", icon: Users },
            { name: "Auditoría", href: "/admin/auditoria", icon: ShieldCheck },
            { name: "Configuración", href: "/admin/configuracion", icon: Settings },
        ]
    }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { loading, isAdmin } = useRequireAdmin();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { startTour } = useTour();

    useEffect(() => {
        if (!loading && isAdmin && pathname === "/admin") {
            startTour([
                { element: '#admin-sidebar', popover: { title: 'Tu Centro de Control', description: 'Este es el menú principal. Desde aquí puedes navegar para gestionar todo el contenido de CAMEBOL.', side: "right", align: 'start' } },
                { element: '#admin-header-actions', popover: { title: 'Búsqueda Rápida', description: 'Usa este buscador rápido o presiona ⌘+K para encontrar usuarios, noticias u opciones al instante.', side: "bottom", align: 'end' } },
                { element: '#admin-user-flow', popover: { title: 'Dashboard', description: 'Aquí verás un resumen rápido y estadísticas. Haz clic en Siguiente para empezar.', side: "top", align: 'center' } }
            ], "dashboard-global");
        }
    }, [loading, isAdmin, pathname, startTour]);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-200"></div>
                <div className="mt-4 h-4 w-32 rounded bg-indigo-200"></div>
            </div>
        </div>
    );

    if (!isAdmin) return null;

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm transition-opacity lg:hidden",
                    sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar - Desktop: Static Flex Item | Mobile: Fixed Overlay */}
            <div
                id="admin-sidebar"
                className={cn(
                    "fixed inset-y-0 z-50 flex w-72 flex-col bg-[#5B0F75] text-white shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
                style={{
                    background: "linear-gradient(180deg, #5B0F75 0%, #3a064d 100%)"
                }}
            >
                {/* Sidebar Header */}
                <div className="flex h-20 items-center justify-between px-6 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <span className="font-bold text-lg">C</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight">CAMEBOL Admin</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white/70 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex flex-1 flex-col overflow-y-auto py-6 px-4 space-y-6">
                    {navigationGroups.map((group) => (
                        <div key={group.title}>
                            <p className="px-4 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                {group.title}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                "group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-white/10 text-white shadow-lg backdrop-blur-sm"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon
                                                    className={cn(
                                                        "h-5 w-5 transition-colors",
                                                        isActive ? "text-brand-gold" : "text-white/50 group-hover:text-white"
                                                    )}
                                                />
                                                {item.name}
                                            </div>
                                            {isActive && <ChevronRight className="h-4 w-4 text-white/50" />}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-white/10 bg-black/10 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-200 hover:bg-red-500/10 hover:text-red-100 transition-colors"
                    >
                        <LogOut className="h-5 w-5 text-red-300 group-hover:text-red-100" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Header (Desktop + Mobile enhanced) */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:bg-gray-950 dark:border-gray-800">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden dark:text-gray-200"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex-1 flex items-center justify-between gap-4">
                        <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 flex items-center gap-2 shrink-0">
                            <span className="text-gray-400">Admin</span>
                            <span className="text-gray-400">/</span>
                            <span>{navigationGroups.flatMap(g => g.items).find(i => i.href === pathname)?.name || 'Dashboard'}</span>
                        </div>

                        <div id="admin-header-actions" className="flex items-center gap-4">
                            <SearchCommand />
                            <ModeToggle />
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <div id="admin-user-flow" className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
