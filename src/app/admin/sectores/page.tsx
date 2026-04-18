import { getSectors } from "@/actions/sectors";
import { SectorForm } from "@/components/admin/sectors/sector-form";
import { SectorList } from "@/components/admin/sectors/sector-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default async function SectorsPage() {
    const sectors = await getSectors();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <Heading title={`Sectores (${sectors.length})`} description="Gestiona los sectores empresariales para las asociadas." />
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <SectorList initialSectors={sectors} />
                </div>
                <div className="col-span-3">
                    <SectorForm />
                </div>
            </div>
        </div>
    );
}
