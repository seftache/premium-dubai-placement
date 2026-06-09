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
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/services`,
        },
      },
    },
    {
      url: `${baseUrl}/import-export`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/import-export`,
        },
      },
    },
    {
      url: `${baseUrl}/candidature`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/candidature`,
        },
      },
    },
  ];
}