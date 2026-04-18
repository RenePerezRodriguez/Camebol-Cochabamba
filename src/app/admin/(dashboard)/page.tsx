import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Building2, Newspaper, FileText, ArrowRight, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "@/actions/stats";
import { DashboardCharts } from "@/components/admin/dashboard-charts";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();
    const pendingMembers = stats.totalMembers - stats.activeMembers;

    const statCards = [
        {
            title: "Asociadas",
            value: stats.totalCompanies,
            description: "Empresas en el directorio",
            icon: Building2,
            href: "/admin/asociadas",
            color: "text-violet-600 dark:text-violet-400",
            bg: "bg-violet-100 dark:bg-violet-900/50",
        },
        {
            title: "Eventos",
            value: stats.totalEvents,
            description: "Registrados en plataforma",
            icon: Calendar,
            href: "/admin/eventos",
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-100 dark:bg-blue-900/50",
        },
        {
            title: "Noticias",
            value: stats.totalNews,
            description: "Publicaciones activas",
            icon: Newspaper,
            href: "/admin/noticias",
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-100 dark:bg-emerald-900/50",
        },
        {
            title: "Directorio",
            value: stats.activeMembers,
            subtitle: pendingMembers > 0 ? `+${pendingMembers} inactivas` : undefined,
            description: "Socias activas",
            icon: Users,
            href: "/admin/directorio",
            color: "text-pink-600 dark:text-pink-400",
            bg: "bg-pink-100 dark:bg-pink-900/50",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Resumen general de CAMEBOL Cochabamba
                </p>
            </div>

            {/* Affiliation Alert */}
            {stats.pendingAffiliations > 0 && (
                <Link href="/admin/afiliaciones">
                    <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="flex items-center gap-4 py-4">
                            <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-3">
                                <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-amber-800 dark:text-amber-200">
                                    {stats.pendingAffiliations} {stats.pendingAffiliations === 1 ? 'solicitud pendiente' : 'solicitudes pendientes'} de afiliaci&oacute;n
                                </p>
                                <p className="text-sm text-amber-600 dark:text-amber-400">Revisar y procesar las solicitudes recibidas</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-amber-500" />
                        </CardContent>
                    </Card>
                </Link>
            )}

            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card) => (
                    <Link key={card.title} href={card.href}>
                        <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`rounded-lg ${card.bg} p-2.5`}>
                                        <card.icon className={`h-5 w-5 ${card.color}`} />
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/50" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold tracking-tight">{card.value}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-muted-foreground">{card.description}</p>
                                        {card.subtitle && (
                                            <Badge variant="secondary" className="text-xs">{card.subtitle}</Badge>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Charts */}
            <DashboardCharts
                memberGrowthData={stats.chartData}
                categoryData={stats.categoryData}
            />

            {/* Bottom Grid: Upcoming Events + Recent Affiliations */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Upcoming Events */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    Pr&oacute;ximos Eventos
                                </CardTitle>
                                <CardDescription>Eventos programados</CardDescription>
                            </div>
                            <Link href="/admin/eventos" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                Ver todos <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {stats.upcomingEvents.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-8 text-center">No hay eventos pr&oacute;ximos</p>
                        ) : (
                            <div className="space-y-3">
                                {stats.upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                                            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{event.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(event.date).toLocaleDateString('es-BO', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="shrink-0 text-xs">{event.category}</Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Affiliations */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                                    Solicitudes Recientes
                                </CardTitle>
                                <CardDescription>{stats.totalAffiliations} solicitudes en total</CardDescription>
                            </div>
                            <Link href="/admin/afiliaciones" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                Ver todas <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {stats.recentAffiliations.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-8 text-center">No hay solicitudes a&uacute;n</p>
                        ) : (
                            <div className="space-y-3">
                                {stats.recentAffiliations.map((aff) => (
                                    <div key={aff.id} className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                                            {(aff.empresa || '?')[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{aff.empresa}</p>
                                            <p className="text-xs text-muted-foreground truncate">{aff.representante}</p>
                                        </div>
                                        <Badge variant={aff.status === 'pending' ? 'secondary' : 'default'} className="shrink-0 text-xs">
                                            {aff.status === 'pending' ? 'Pendiente' : aff.status === 'approved' ? 'Aprobada' : aff.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
