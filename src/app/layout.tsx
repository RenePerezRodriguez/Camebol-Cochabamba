import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { PT_Sans, PT_Serif } from 'next/font/google';
import { DiamondPreloader } from '@/components/ui/diamond-preloader';
import { ReadingProgressBar } from '@/components/ui/reading-progress-bar';
import { AuthProvider } from '@/lib/auth-context';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-serif',
});

export const viewport: Viewport = {
  themeColor: '#D61F69',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://camebolcochabamba.com'),
  title: {
    default: 'CAMEBOL Cochabamba | Cámara de Mujeres Empresarias',
    template: '%s | CAMEBOL Cochabamba',
  },
  description: 'Conectando, fortaleciendo y visibilizando el liderazgo empresarial femenino en Cochabamba, Bolivia.',
  keywords: ['mujeres empresarias', 'cochabamba', 'bolivia', 'negocios', 'liderazgo femenino', 'camebol', 'directorio empresas'],
  authors: [{ name: 'CAMEBOL Cochabamba' }],
  creator: 'CAMEBOL Cochabamba',
  publisher: 'CAMEBOL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'CAMEBOL Cochabamba',
    description: 'Impulsando el liderazgo de las mujeres empresarias en Bolivia.',
    url: 'https://camebolcochabamba.com',
    siteName: 'CAMEBOL Cochabamba',
    locale: 'es_BO',
    type: 'website',
    images: [
      {
        url: '/img/logos/CAMEBOL Cochabamba Logotipo.webp',
        width: 1200,
        height: 630,
        alt: 'CAMEBOL Cochabamba Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CAMEBOL Cochabamba',
    description: 'Cámara de Mujeres Empresarias de Bolivia - Filial Cochabamba',
    images: ['/img/logos/CAMEBOL Cochabamba Logotipo.webp'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { getMaintenanceMode } from "@/actions/settings";
import { MaintenanceGuard } from "@/components/maintenance-guard";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenance = await getMaintenanceMode();

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${ptSans.variable} ${ptSerif.variable} font-body antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="camebol-theme"
            disableTransitionOnChange
          >
            <MaintenanceGuard isEnabled={isMaintenance} />
            <OrganizationJsonLd />
            {children}
            <DiamondPreloader />
            <ReadingProgressBar />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
