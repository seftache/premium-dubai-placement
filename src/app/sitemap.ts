import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://emploisdubai.com';
  const today = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          fr: baseUrl,
          'fr-FR': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: today,
      changeFrequency: 'daily' as const,
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/services`,
          'fr-FR': `${baseUrl}/services`,
        },
      },
    },
    {
      url: `${baseUrl}/candidature`,
      lastModified: today,
      changeFrequency: 'daily' as const,
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/candidature`,
          'fr-FR': `${baseUrl}/candidature`,
        },
      },
    },
    {
      url: `${baseUrl}/import-export`,
      lastModified: today,
      changeFrequency: 'daily' as const,
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/import-export`,
          'fr-FR': `${baseUrl}/import-export`,
        },
      },
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
      alternates: {
        languages: {
          fr: `${baseUrl}/mentions-legales`,
          'fr-FR': `${baseUrl}/mentions-legales`,
        },
      },
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
      alternates: {
        languages: {
          fr: `${baseUrl}/confidentialite`,
          'fr-FR': `${baseUrl}/confidentialite`,
        },
      },
    },
    {
      url: `${baseUrl}/guides/emploi-serveur-dubai`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/visa-travail-dubai`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
}