'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

// Custom page labels for better UX
const pageLabels: Record<string, string> = {
  '/': 'Home',
  '/about-author': 'About Dr. Ernesto Lee',
  '/blog': 'AI Education Blog',
  '/workshops': 'AI Teaching Workshops',
  '/resources': 'Educator Resources',
  '/privacy-policy': 'Privacy Policy',
  '/tos': 'Terms of Service',
  '/blog/5-signs-ai-helping-not-replacing-learning': '5 Signs AI is Helping Student Learning',
  '/blog/why-easy-ai-tools-harm-student-learning': 'Why Easy AI Tools May Harm Learning'
};

// Generate structured data for breadcrumbs
const generateBreadcrumbStructuredData = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://learningscience.io${item.href}`
    }))
  };
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Build breadcrumb path
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = pageLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    breadcrumbItems.push({
      label,
      href: currentPath
    });
  });

  const structuredData = generateBreadcrumbStructuredData(breadcrumbItems);

  return (
    <>
      {/* Inject Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                )}
                
                {isLast ? (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="hover:text-blue-600 transition-colors duration-200 flex items-center"
                  >
                    {index === 0 && <Home className="w-4 h-4 mr-1" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
