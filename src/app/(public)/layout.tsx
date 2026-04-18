import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { FloatingButtons } from '@/components/layout/floating-buttons';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { HomeNavFab } from '@/components/layout/home-nav-fab';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { PageTransition } from '@/components/layout/page-transition';
import { PublicBannerList } from "@/components/public-banner-list";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Header banner={
                    <Suspense fallback={null}>
                        <PublicBannerList />
                    </Suspense>
                } />
                
                <Suspense fallback={null}>
                    <Breadcrumb />
                </Suspense>
                <main className="flex-1">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
                <Footer />
            </div>
            <FloatingButtons />
            <ScrollToTop />
            <Suspense fallback={null}>
                <HomeNavFab />
            </Suspense>
        </>
    );
}
