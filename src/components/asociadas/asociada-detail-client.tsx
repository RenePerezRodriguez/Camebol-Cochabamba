'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Associate } from '@/lib/schemas/associate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, Mail, MapPin, Phone, Facebook, Instagram, Linkedin, XIcon, Youtube, Download, Share2, Building2, MessageCircle } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SectionDivider } from '@/components/ui/section-divider';
import { TextReveal } from '@/components/ui/text-reveal';
import dynamic from 'next/dynamic';

const AssociatesMap = dynamic(() => import('@/components/asociadas/associates-map'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-muted/20 animate-pulse rounded-lg" />
});

const socialIconMap: { [key: string]: React.ElementType } = {
  Facebook: Facebook,
  Instagram: Instagram,
  Linkedin: Linkedin,
  X: XIcon,
  Youtube: Youtube,
};


const ShareButtons = () => {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://camebolcochabamba.com'}${pathname}`;
  const text = "Mira esta empresa en CAMEBOL Cochabamba!";

  const socialPlatforms = [
    { name: 'Facebook', Icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'X', Icon: XIcon, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
    { name: 'LinkedIn', Icon: Linkedin, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}` },
    { name: 'WhatsApp', Icon: Mail, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}` }
  ];

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-background/80 backdrop-blur-md ring-1 ring-white/20">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-lg !font-headline flex items-center gap-2">
          <Share2 className="w-4 h-4 text-primary" />
          Compartir Perfil
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 pt-4 justify-center">
        {socialPlatforms.map(platform => (
          <Button key={platform.name} variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors border-primary/20" asChild>
            <a href={platform.url} target="_blank" rel="noopener noreferrer" aria-label={`Compartir en ${platform.name}`}>
              <platform.Icon className="h-4 w-4" />
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};


interface AsociadaDetailClientProps {
  company: Associate;
  relatedCompanies: Associate[];
}

export function AsociadaDetailClient({ company, relatedCompanies }: AsociadaDetailClientProps) {
  return (
    <div className="relative overflow-hidden min-h-screen bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full group overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          {company.logoUrl ? (
            <>
              <img
                src={company.logoUrl}
                alt={`Imagen de portada de ${company.name}`}
                className="absolute inset-0 object-cover w-full h-full blur-xl opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-primary/10" />
          )}
          {/* Diamond Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('/patterns/diamond-grid.svg')] bg-repeat mix-blend-overlay" />
        </div>

        <div className="container relative h-full flex flex-col justify-end pb-12 z-10">
          <div className="flex flex-col md:flex-row items-end md:items-center gap-8">
            {/* Logo Container with Diamond Style */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-background rotate-45 rounded-3xl shadow-2xl border-4 border-background overflow-hidden flex items-center justify-center relative z-10 group-hover:rotate-0 transition-transform duration-500 ease-out-back">
                <div className="w-[140%] h-[140%] -rotate-45 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center bg-white">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={`Logo de ${company.name}`}
                      className="object-contain w-3/4 h-3/4"
                    />
                  ) : (
                    <div className="text-muted-foreground text-xs text-center p-2">Sin Logo</div>
                  )}
                </div>
              </div>
              {/* Decorative Elements behind logo */}
              <div className="absolute inset-0 bg-primary/20 rotate-45 rounded-3xl blur-xl -z-10 scale-90 translate-y-4" />
            </div>

            <div className="mb-4 md:mb-8 animate-fade-in-up">
              <Badge variant="secondary" className="mb-3 text-sm px-3 py-1 shadow-md backdrop-blur-md bg-white/10 border-white/20 text-foreground">{company.sectorName}</Badge>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold !font-headline text-foreground drop-shadow-sm leading-tight">
                <TextReveal text={company.name} />
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container pt-12 pb-16 md:pb-24">


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            <div className="prose prose-lg text-muted-foreground max-w-none leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <p>{company.description}</p>
            </div>

            {company.discount && (
              <Card className="bg-green-50 border-green-200 shadow-sm animate-fade-in-up">
                <CardContent className="p-4 flex items-center gap-3">
                  <Badge className="bg-green-500">Beneficio</Badge>
                  <p className="font-medium text-green-800">{company.discount}</p>
                </CardContent>
              </Card>
            )}

            {/* Related items or further info could go here */}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-md ring-1 ring-white/20 overflow-hidden sticky top-24">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              <CardHeader>
                <CardTitle className="text-xl !font-headline flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                {company.address && (
                  <div className="flex items-start group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-3 group-hover:scale-110 transition-transform">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Dirección</p>
                      <span className="text-muted-foreground leading-relaxed">{company.address}</span>
                    </div>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-start group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-3 group-hover:scale-110 transition-transform">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Teléfono</p>
                      <a href={`tel:${company.phone}`} className="text-muted-foreground hover:text-primary transition-colors">{company.phone}</a>
                    </div>
                  </div>
                )}
                {company.website && (
                  <div className="flex items-start group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-3 group-hover:scale-110 transition-transform">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Sitio Web</p>
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors break-all">{company.website}</a>
                    </div>
                  </div>
                )}
                {company.email && (
                  <div className="flex items-start group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-3 group-hover:scale-110 transition-transform">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Email</p>
                      <a href={`mailto:${company.email}`} className="text-muted-foreground hover:text-primary transition-colors break-all">{company.email}</a>
                    </div>
                  </div>
                )}
                {company.facebook && (
                  <div className="flex items-start group">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 mr-3 group-hover:scale-110 transition-transform">
                      <Facebook className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Facebook</p>
                      <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors break-all">Visitar página</a>
                    </div>
                  </div>
                )}
                {company.whatsapp && (
                  <div className="flex items-start group">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 mr-3 group-hover:scale-110 transition-transform">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">WhatsApp</p>
                      <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-600 transition-colors">Enviar mensaje</a>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-border/50">
                  <p className="text-center text-muted-foreground italic">Información de contacto oficial de CAMEBOL</p>
                </div>
              </CardContent>
            </Card>

            <ShareButtons />

          </div>
        </div>



        {/* Map Section */}
        {company.latitude && company.longitude && (
          <div className="mt-16 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold !font-headline">Ubicación</h2>
            </div>
            <Card className="overflow-hidden shadow-xl border-0 ring-1 ring-border/50 bg-background/50 backdrop-blur-sm">
              <div className="h-[450px] w-full relative z-0">
                <AssociatesMap companies={[company]} zoom={16} />
              </div>
            </Card>
          </div>
        )}

        {/* Related Companies */}
        {relatedCompanies.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold !font-headline">Otras Asociadas del Sector</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCompanies.map((relatedCompany, index) => (
                <Link key={relatedCompany.slug} href={`/asociadas/${relatedCompany.slug}`} className="block h-full">
                  <Card className="h-full overflow-hidden transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-2 group border-0 bg-background/50 backdrop-blur-sm ring-1 ring-white/10" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative h-48 w-full overflow-hidden">
                      {relatedCompany.logoUrl ? (
                        <img
                          src={relatedCompany.logoUrl}
                          alt=""
                          className="absolute inset-0 object-cover w-full h-full blur-sm opacity-50 transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center text-primary/30">CAMEBOL</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
                        <div className="relative w-14 h-14 bg-white rounded-xl overflow-hidden shadow-lg shrink-0 rotate-3 group-hover:rotate-0 transition-transform duration-300">
                          {relatedCompany.logoUrl ? (
                            <img
                              src={relatedCompany.logoUrl}
                              alt={`Logo de ${relatedCompany.name}`}
                              className="absolute inset-0 object-contain w-full h-full p-1"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-[8px]">Sin Logo</div>
                          )}
                        </div>
                        <div className="text-white pb-1">
                          <h3 className="font-bold !font-headline leading-tight group-hover:text-primary-foreground transition-colors">{relatedCompany.name}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-3 text-xs">{relatedCompany.sectorName}</Badge>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {relatedCompany.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-20">
          <MagneticButton>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary/20 hover:bg-primary/5">
              <Link href="/asociadas">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Directorio
              </Link>
            </Button>
          </MagneticButton>
        </div>

      </div>
      <SectionDivider />
    </div >
  );
}
