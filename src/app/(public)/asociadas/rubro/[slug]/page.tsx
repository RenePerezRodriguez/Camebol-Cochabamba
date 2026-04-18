import { getSectors } from "@/actions/sectors";
import { getAssociatesBySector } from "@/actions/associates";
import { AsociadasList } from "@/components/asociadas/asociadas-list";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from 'next';

export const dynamic = "force-dynamic";

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const sectors = await getSectors();
    const sector = sectors.find(s => slugify(s.name) === slug);

    if (!sector) {
        return {
            title: 'Rubro no encontrado | CAMEBOL Cochabamba',
        };
    }

    return {
        title: `Empresas de ${sector.name} | Asociadas CAMEBOL`,
        description: `Directorio de mujeres empresarias y empresas asociadas a CAMEBOL Cochabamba en el rubro de ${sector.name}.`,
        openGraph: {
            title: `Empresas en el rubro de ${sector.name}`,
            description: `Explora nuestra red de mujeres empresarias en el rubro de ${sector.name}.`,
            url: `https://camebolcochabamba.com/asociadas/rubro/${slug}`,
        }
    };
}

export default async function SectorDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const sectors = await getSectors();

    // Find sector by slug matching
    const sector = sectors.find(s => slugify(s.name) === slug);

    if (!sector) {
        notFound();
    }

    const associates = await getAssociatesBySector(sector.id);

    return (
        <div className="min-h-screen bg-background relative">
            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50">
                <Button variant="ghost" asChild className="hover:bg-primary/10 group">
                    <Link href="/asociadas">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Volver a Rubros
                    </Link>
                </Button>
            </div>
            <AsociadasList companies={associates} />
        </div>
    );
}
