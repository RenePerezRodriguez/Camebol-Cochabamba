import { getSectors } from "@/actions/sectors";
import { getPublicAssociates } from "@/actions/associates";
import { SectorsGrid } from "@/components/asociadas/sectors-grid";

export const dynamic = "force-dynamic";

export default async function AsociadasPage() {
    const [sectors, companies] = await Promise.all([
        getSectors(),
        getPublicAssociates()
    ]);

    return <SectorsGrid sectors={sectors} companies={companies} />;
}
