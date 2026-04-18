import { getMaintenanceMode, toggleMaintenanceMode } from "@/actions/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceSwitch } from "@/components/admin/maintenance-switch";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const isMaintenance = await getMaintenanceMode();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h2>
                <p className="text-muted-foreground">Gestiona ajustes globales y preferencias del sitio.</p>
            </div>

            <Card className="border-red-100 dark:border-red-900">
                <CardHeader>
                    <CardTitle className="text-red-700 dark:text-red-400">Modo Mantenimiento</CardTitle>
                    <CardDescription>
                        Al activar este modo, el sitio público mostrará una pantalla de &quot;En Construcción&quot;.
                        El panel de administración seguirá siendo accesible.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MaintenanceSwitch initialState={isMaintenance} />
                </CardContent>
            </Card>
        </div>
    );
}
