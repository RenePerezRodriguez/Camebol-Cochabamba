import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getAssociates } from "@/actions/associates";
import { getSectors } from "@/actions/sectors";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AssociatesPage() {
    const [associates, sectors] = await Promise.all([
        getAssociates(),
        getSectors()
    ]);

    const filterOptions = sectors.map(sector => ({
        label: sector.name,
        value: sector.id
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Heading
                    title={`Empresas Asociadas (${associates.length})`}
                    description="Gestiona las empresas que forman parte de la cámara."
                />
                <Button asChild>
                    <Link href="/admin/asociadas/nuevo">
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Empresa
                    </Link>
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={associates}
                searchKey="name"
                filename="asociadas-camebol"
                filterColumn="sectorName"
                filterOptions={filterOptions}
            />
        </div>
    );
}

