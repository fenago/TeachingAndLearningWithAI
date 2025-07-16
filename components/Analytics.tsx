'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics 4 Configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsProps {
  googleAnalyticsId?: string;
  debug?: boolean;
}

// Main Analytics Component
// Analytics tracking component wrapped in Suspense
function AnalyticsTracker({ 
  googleAnalyticsId = 'G-XXXXXXXXXX', // Replace with actual GA4 ID
  debug = false 
}: AnalyticsProps): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Google Analytics
    if (googleAnalyticsId && typeof window !== 'undefined') {
      // Load GA4 script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
        debug_mode: debug,
        // Enhanced ecommerce for workshop tracking
        custom_map: {
          custom_parameter_1: 'workshop_type',
          custom_parameter_2: 'content_category'
        }
      });

      if (debug) {
        console.log('Analytics initialized:', { googleAnalyticsId, pathname });
      }
    }
  }, [googleAnalyticsId, debug]);

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', googleAnalyticsId, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
        page_title: document.title,
        page_location: window.location.href
      });

      if (debug) {
        console.log('Page view tracked:', { pathname, searchParams: searchParams?.toString() });
      }
    }
  }, [pathname, searchParams, googleAnalyticsId, debug]);

  return null;
}

// Main Analytics component with Suspense boundary
export default function Analytics(props: AnalyticsProps): JSX.Element {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker {...props} />
    </Suspense>
  );
}

// Enhanced tracking functions
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString()
    });
  }
};

// Specific event tracking functions
export const trackWorkshopInterest = (workshopType: string) => {
  trackEvent('workshop_interest', {
    workshop_type: workshopType,
    content_category: 'professional_development'
  });
};

export const trackResourceDownload = (resourceName: string, resourceType: string) => {
  trackEvent('resource_download', {
    resource_name: resourceName,
    resource_type: resourceType,
    content_category: 'educational_resource'
  });
};

export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', {
    source,
    conversion_type: 'email_capture'
  });
};

export const trackSearchQuery = (query: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    engagement_type: 'site_search'
  });
};

export const trackContentEngagement = (
  contentType: string,
  contentId: string,
  engagementType: string,
  value?: number
) => {
  trackEvent('content_engagement', {
    content_type: contentType,
    content_id: contentId,
    engagement_type: engagementType,
    value: value || 1
  });
};

export const trackSocialShare = (platform: string, contentUrl: string) => {
  trackEvent('share', {
    method: platform,
    content_type: 'article',
    item_id: contentUrl
  });
};

// Reading analytics for blog articles
export const trackReadingProgress = (
  articleId: string,
  progressPercentage: number,
  timeSpent: number
) => {
  // Only track major milestones to avoid too many events
  const milestones = [25, 50, 75, 90, 100];
  const milestone = milestones.find(m => 
    progressPercentage >= m && 
    progressPercentage < m + 5
  );

  if (milestone) {
    trackEvent('reading_progress', {
      article_id: articleId,
      progress_percentage: milestone,
      time_spent_seconds: Math.round(timeSpent / 1000),
      engagement_type: 'content_consumption'
    });
  }
};

// SEO Performance Tracking Component
export function SEOTracker(): null {
  useEffect(() => {
    // Track Core Web Vitals
    if (typeof window !== 'undefined') {
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        trackEvent('web_vital', {
          name: 'LCP',
          value: Math.round(lastEntry.startTime),
          rating: lastEntry.startTime <= 2500 ? 'good' : 
                  lastEntry.startTime <= 4000 ? 'needs_improvement' : 'poor'
        });
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          trackEvent('web_vital', {
            name: 'FID',
            value: Math.round(entry.processingStart - entry.startTime),
            rating: entry.processingStart - entry.startTime <= 100 ? 'good' :
                    entry.processingStart - entry.startTime <= 300 ? 'needs_improvement' : 'poor'
          });
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID not supported
      }

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        trackEvent('web_vital', {
          name: 'CLS',
          value: Math.round(clsValue * 1000) / 1000,
          rating: clsValue <= 0.1 ? 'good' :
                  clsValue <= 0.25 ? 'needs_improvement' : 'poor'
        });
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS not supported
      }

      // Page Load Time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_performance', {
          load_time_ms: loadTime,
          page_url: window.location.pathname
        });
      });

      // Track scroll depth
      let maxScroll = 0;
      const trackScrollDepth = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          
          // Track at 25%, 50%, 75%, and 100%
          const milestones = [25, 50, 75, 100];
          const milestone = milestones.find(m => scrollPercent >= m && maxScroll < m + 5);
          
          if (milestone) {
            trackEvent('scroll_depth', {
              percent: milestone,
              page_url: window.location.pathname
            });
          }
        }
      };

      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(trackScrollDepth, 100);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null;
}

// Conversion Funnel Tracking
export const trackConversionFunnel = (step: string, data: Record<string, any> = {}) => {
  const funnelSteps = [
    'page_visit',
    'content_engagement',
    'newsletter_signup',
    'resource_download',
    'workshop_interest',
    'contact_form'
  ];

  trackEvent('conversion_funnel', {
    funnel_step: step,
    step_order: funnelSteps.indexOf(step) + 1,
    ...data
  });
};

// User Journey Tracking
export const trackUserJourney = (action: string, context: Record<string, any> = {}) => {
  trackEvent('user_journey', {
    journey_action: action,
    session_id: sessionStorage.getItem('session_id') || 'anonymous',
    timestamp: new Date().toISOString(),
    ...context
  });
};

// Error Tracking
export const trackError = (error: Error, context: Record<string, any> = {}) => {
  trackEvent('exception', {
    description: error.message,
    fatal: false,
    error_type: error.name,
    stack_trace: error.stack?.substring(0, 500), // Limit stack trace length
    ...context
  });
};
