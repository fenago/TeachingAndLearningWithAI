'use client';

import { useState, useEffect } from 'react';

interface ReadingProgressProps {
  target?: string; // Target element selector (default: article)
  className?: string;
}

export default function ReadingProgress({ 
  target = 'article', 
  className = '' 
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      const targetElement = (document.querySelector(target) || document.body) as HTMLElement;
      const rect = targetElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const documentHeight = targetElement.scrollHeight;
      
      // Calculate how much of the target element has been scrolled through
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = targetElement.offsetTop;
      const elementHeight = documentHeight;
      
      // Progress calculation
      const scrolled = scrollTop - elementTop;
      const total = elementHeight - windowHeight;
      const progressPercent = Math.max(0, Math.min(100, (scrolled / total) * 100));
      
      setProgress(progressPercent);
      
      // Show progress bar when user starts reading (after 10% of viewport)
      setIsVisible(scrollTop > windowHeight * 0.1);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    calculateProgress();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [target]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50 transition-opacity duration-300 ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Reading progress"
    >
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Estimated reading time calculator
export function EstimatedReadingTime({ 
  text, 
  className = '',
  wordsPerMinute = 200 
}: { 
  text: string; 
  className?: string;
  wordsPerMinute?: number;
}) {
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      <span className="font-medium">{readingTime} min read</span>
      <span className="mx-2">•</span>
      <span>{wordCount.toLocaleString()} words</span>
    </div>
  );
}

// Reading progress analytics hook
export function useReadingAnalytics(articleId: string) {
  const [readingData, setReadingData] = useState({
    startTime: 0,
    timeSpent: 0,
    maxProgress: 0,
    completed: false
  });

  useEffect(() => {
    const startTime = Date.now();
    setReadingData(prev => ({ ...prev, startTime }));

    const updateProgress = () => {
      const currentTime = Date.now();
      const timeSpent = currentTime - startTime;
      
      // Calculate reading progress
      const article = document.querySelector('article') as HTMLElement;
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const documentHeight = article.scrollHeight;
      const scrollTop = window.pageYOffset;
      const elementTop = article.offsetTop;
      
      const scrolled = scrollTop - elementTop;
      const total = documentHeight - windowHeight;
      const progressPercent = Math.max(0, Math.min(100, (scrolled / total) * 100));

      setReadingData(prev => ({
        ...prev,
        timeSpent,
        maxProgress: Math.max(prev.maxProgress, progressPercent),
        completed: progressPercent >= 90 // Consider 90% as completed
      }));
    };

    const throttledUpdate = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateProgress();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const handleScroll = throttledUpdate();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // Log reading analytics when component unmounts
      if (readingData.timeSpent > 10000) { // Only log if user spent more than 10 seconds
        console.log('Reading Analytics:', {
          articleId,
          timeSpent: readingData.timeSpent,
          maxProgress: readingData.maxProgress,
          completed: readingData.completed
        });
        
        // Here you could send analytics to your preferred service
        // analytics.track('Article Read', { ... });
      }
    };
  }, [articleId, readingData.timeSpent]);

  return readingData;
}
