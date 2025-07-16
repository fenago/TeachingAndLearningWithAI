'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from './Analytics';

// Lazy loading intersection observer hook
export function useLazyLoading(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, isIntersecting] as const;
}

// Preload critical resources
export function PreloadCriticalResources(): null {
  useEffect(() => {
    // Preload critical CSS and fonts
    const preloadLinks = [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      { href: '/api/critical-data', as: 'fetch', crossorigin: 'anonymous' }
    ];

    preloadLinks.forEach(({ href, as, type, crossorigin }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (crossorigin) link.crossOrigin = crossorigin;
      document.head.appendChild(link);
    });

    // Prefetch likely next pages
    const prefetchPages = ['/blog', '/workshops', '/resources', '/about-author'];
    prefetchPages.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

// Image optimization component
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  ...props
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  [key: string]: any;
}) {
  const [setRef, isIntersecting] = useLazyLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const shouldLoad = priority || isIntersecting;

  // Generate responsive image URLs (for a real implementation, you'd use a service like Cloudinary)
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes.map(size => 
      `${baseSrc}?w=${size}&q=75 ${size}w`
    ).join(', ');
  };

  return (
    <div 
      ref={setRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {shouldLoad && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${hasError ? 'hidden' : ''}`}
          {...props}
        />
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
}

// Critical CSS injector for above-the-fold content
export function CriticalCSS(): null {
  useEffect(() => {
    // Inject critical CSS for above-the-fold content
    const criticalCSS = `
      /* Critical styles for LCP optimization */
      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
      .hero-section { min-height: 60vh; }
      .nav-container { position: sticky; top: 0; z-index: 50; }
      
      /* Prevent layout shifts */
      img { max-width: 100%; height: auto; }
      .aspect-video { aspect-ratio: 16/9; }
      .aspect-square { aspect-ratio: 1/1; }
      
      /* Loading states */
      .skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
      @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

// Web Vitals monitoring and optimization
export function WebVitalsOptimizer() {
  const [vitals, setVitals] = useState<{
    lcp?: number;
    fid?: number;
    cls?: number;
  }>({});

  useEffect(() => {
    // LCP optimization
    const optimizeLCP = () => {
      // Identify LCP element and optimize
      const lcpElements = document.querySelectorAll('img, video, [data-lcp]');
      lcpElements.forEach(element => {
        if (element instanceof HTMLImageElement) {
          element.loading = 'eager';
          element.fetchPriority = 'high';
        }
      });
    };

    // FID optimization - defer non-critical scripts
    const optimizeFID = () => {
      // Move non-critical JavaScript to after page load
      const nonCriticalScripts = document.querySelectorAll('script[data-defer]');
      nonCriticalScripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.getAttribute('src') || '';
        newScript.async = true;
        document.body.appendChild(newScript);
        script.remove();
      });
    };

    // CLS optimization - reserve space for dynamic content
    const optimizeCLS = () => {
      // Add placeholders for dynamic content
      const dynamicElements = document.querySelectorAll('[data-dynamic]');
      dynamicElements.forEach(element => {
        const placeholder = document.createElement('div');
        placeholder.className = 'skeleton';
        placeholder.style.height = element.getAttribute('data-height') || 'auto';
        element.parentNode?.insertBefore(placeholder, element);
      });
    };

    optimizeLCP();
    optimizeFID();
    optimizeCLS();

    // Monitor Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        setVitals(prev => ({ ...prev, lcp }));
        
        if (lcp > 2500) {
          console.warn('LCP optimization needed:', lcp);
          trackEvent('performance_issue', {
            metric: 'LCP',
            value: lcp,
            threshold_exceeded: true
          });
        }
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // FID Observer
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          setVitals(prev => ({ ...prev, fid }));
          
          if (fid > 100) {
            console.warn('FID optimization needed:', fid);
            trackEvent('performance_issue', {
              metric: 'FID',
              value: fid,
              threshold_exceeded: true
            });
          }
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // CLS Observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        setVitals(prev => ({ ...prev, cls: clsValue }));
        
        if (clsValue > 0.1) {
          console.warn('CLS optimization needed:', clsValue);
          trackEvent('performance_issue', {
            metric: 'CLS',
            value: clsValue,
            threshold_exceeded: true
          });
        }
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  // Show performance metrics in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs z-50">
        <div>LCP: {vitals.lcp ? `${Math.round(vitals.lcp)}ms` : '...'}</div>
        <div>FID: {vitals.fid ? `${Math.round(vitals.fid)}ms` : '...'}</div>
        <div>CLS: {vitals.cls ? vitals.cls.toFixed(3) : '...'}</div>
      </div>
    );
  }

  return null;
}

// Resource hints component
export function ResourceHints(): null {
  useEffect(() => {
    // DNS prefetch for external domains
    const dnsPrefetchDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com',
      'www.googletagmanager.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });

    // Preconnect to critical origins
    const preconnectOrigins = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectOrigins.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

// Service worker registration for caching
export function ServiceWorkerRegistration(): null {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          trackEvent('service_worker_registered', {
            scope: registration.scope
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
          trackEvent('service_worker_failed', {
            error: registrationError.message
          });
        });
    }
  }, []);

  return null;
}
