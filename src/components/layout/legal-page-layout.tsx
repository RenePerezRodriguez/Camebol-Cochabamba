'use client';

import { SectionHeader } from '@/components/layout/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { SectionDivider } from '@/components/ui/section-divider';

interface LegalPageLayoutProps {
    title: string;
    subtitle?: string;
    lastUpdated?: string;
    children: React.ReactNode;
}

export function LegalPageLayout({ title, subtitle, lastUpdated, children }: LegalPageLayoutProps) {
    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-20" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container py-16 md:py-24 relative z-10">
                <SectionHeader
                    title={title}
                    subtitle={subtitle || (lastUpdated ? `Última actualización: ${lastUpdated}` : undefined)}
                    className="mb-12"
                />

                <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-background/80 backdrop-blur-md ring-1 ring-white/20">
                    <CardContent className="p-8 md:p-12 prose prose-lg max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80">
                        {children}
                    </CardContent>
                </Card>
            </div>
            <SectionDivider />
        </div>
    );
}
