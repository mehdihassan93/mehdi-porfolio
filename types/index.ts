export interface Project {
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    image?: string;
    link?: string;
}

export interface SiteConfig {
    name: string;
    title: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
        github: string;
        linkedin: string;
    };
    author: string;
    keywords: string[];
}
