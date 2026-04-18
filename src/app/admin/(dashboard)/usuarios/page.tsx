import { getUsers } from "@/actions/users";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table"; // Reusing existing DataTable
import { SectionHeader } from "@/components/layout/section-header";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
    const { users, error } = await getUsers();

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Gestión de Usuarios"
                subtitle="Administra los usuarios registrados y sus roles de acceso."
            />

            {error ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
                    Error cargando usuarios: {error}. Asegúrate de que Firebase Admin esté configurado correctamente.
                </div>
            ) : (
                <div className="min-h-[400px]">
                    <DataTable
                        columns={columns}
                        data={users}
                        searchKey="displayName" // Allow searching by name
                    />
                </div>
            )}
        </div>
    );
}
