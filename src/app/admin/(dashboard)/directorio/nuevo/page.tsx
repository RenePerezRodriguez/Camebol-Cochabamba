import { MemberForm } from "@/components/admin/member-form";

export const dynamic = "force-dynamic";

export default function NewMemberPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Registrar Nueva Socia</h3>
                <p className="text-sm text-muted-foreground">Complete la información de la socia.</p>
            </div>
            <MemberForm />
        </div>
    );
}
