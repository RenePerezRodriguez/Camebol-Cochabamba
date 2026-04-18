import { BannerForm } from "@/components/admin/banner-form";

export default function NewBannerPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Nuevo Banner</h2>
                <p className="text-muted-foreground">Crea un aviso visible para todos los visitantes.</p>
            </div>
            <BannerForm />
        </div>
    );
}
