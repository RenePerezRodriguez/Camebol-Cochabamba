import { getLandingStats } from "@/actions/landing-content";
import { StatsForm } from "@/components/admin/stats-form";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
    const stats = await getLandingStats();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Gestión de Contenido</h2>
                <p className="text-muted-foreground">Administra los textos, videos y cifras de la página de inicio (Landing Page).</p>
            </div>
            <Separator />

            <div className="grid gap-6">
                <StatsForm initialStats={stats} />

                {/* Future: Hero Video Management could go here */}
            </div>
        </div>
    );
}
