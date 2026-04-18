import { Suspense } from 'react';
import { getAssociateBySlug, getPublicAssociates } from '@/actions/associates';
import { AsociadaDetailClient } from '@/components/asociadas/asociada-detail-client';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const associates = await getPublicAssociates();
  return associates.map((associate) => ({
    slug: associate.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const company = await getAssociateBySlug(slug);

  if (!company) {
    return {
      title: 'Empresa no encontrada | CAMEBOL Cochabamba',
      description: 'El perfil de empresa asociada no existe o ha sido removido.',
    };
  }

  return {
    title: `${company.name} | Asociada CAMEBOL Cochabamba`,
    description: company.description || `Conoce a ${company.name}, representante destacada de CAMEBOL Cochabamba.`,
    openGraph: {
      title: `${company.name} - Asociada CAMEBOL`,
      description: company.description || `Conoce más sobre los servicios y productos de ${company.name} en el directorio de CAMEBOL Cochabamba.`,
      url: `https://camebolcochabamba.com/asociadas/${slug}`,
      images: company.logoUrl ? [{ url: company.logoUrl, width: 800, height: 600, alt: company.name }] : [],
    },
  };
}

function CompanyDetailSkeleton() {
  return (
    <div className="container py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function CompanyDetails({ slug }: { slug: string }) {
  const [company, allAssociates] = await Promise.all([
    getAssociateBySlug(slug),
    getPublicAssociates()
  ]);

  if (!company) {
    notFound();
  }

  const relatedCompanies = allAssociates.filter(
    (c) => c.sectorId === company.sectorId && c.id !== company.id
  ).slice(0, 3);

  return <AsociadaDetailClient company={company as any} relatedCompanies={relatedCompanies as any} />;
}

export default async function AsociadaDetallePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<CompanyDetailSkeleton />}>
      <CompanyDetails slug={slug} />
    </Suspense>
  );
}
