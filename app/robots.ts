import type { MetadataRoute } from 'next';
import config from '@/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${config.domainName}`;
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/auth-test/',
        '/header-test/',
        '/modern-header-test/',
        '/api/',
        '/admin/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
