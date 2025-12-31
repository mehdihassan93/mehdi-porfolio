import { siteConfig } from '@/config/site';

export const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/mehdi-hero.png`,
    sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
    ],
    jobTitle: siteConfig.title,
    worksFor: {
        '@type': 'Organization',
        name: 'AIDEON Limited',
        url: 'https://aideon.ltd',
        sameAs: 'https://www.linkedin.com/company/aideon'
    },
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressCountry: 'UK'
    },
    description: siteConfig.description,
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Roehampton'
    },
    knowsAbout: ['Android Development', 'Kotlin', 'Jetpack Compose', 'Software Architecture', 'Distributed Systems']
};
