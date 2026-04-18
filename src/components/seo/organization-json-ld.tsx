export function OrganizationJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CAMEBOL Cochabamba',
        url: 'https://camebolcochabamba.com',
        logo: 'https://camebolcochabamba.com/img/logos/CAMEBOL%20Cochabamba%20Logotipo.webp',
        sameAs: [
            'https://www.facebook.com/profile.php?id=100065638682964',
            'https://www.instagram.com/camebol_cochabamba/',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+591 63924474',
            contactType: 'customer service',
            areaServed: 'BO',
            availableLanguage: 'es'
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'C. Rigoberto Sainz N° 464',
            addressLocality: 'Cochabamba',
            addressCountry: 'BO'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
