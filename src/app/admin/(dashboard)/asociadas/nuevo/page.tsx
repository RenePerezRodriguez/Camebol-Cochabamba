import { AssociateForm } from "@/components/admin/associates/associate-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function NewAssociatePage() {
    return (
        <div className="space-y-6">
            <div>
                <Heading title="Nueva Empresa Asociada" description="Registrar una nueva empresa en el directorio." />
                <p className="text-sm text-muted-foreground mt-2">
                    Asegúrate de que el sector exista previamente.
                </p>
            </div>
            <Separator />
            <AssociateForm />
        </div>
    );
}
