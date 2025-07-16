import type { MetadataRoute } from 'next';
import config from '@/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${config.domainName}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `https://${config.domainName}/about-author`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `https://${config.domainName}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `https://${config.domainName}/workshops`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `https://${config.domainName}/resources`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Blog Articles
    {
      url: `https://${config.domainName}/blog/5-signs-ai-helping-not-replacing-learning`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `https://${config.domainName}/blog/why-easy-ai-tools-harm-student-learning`,
      lastModified: new Date('2024-01-08'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    // Legal Pages
    {
      url: `https://${config.domainName}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `https://${config.domainName}/tos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
