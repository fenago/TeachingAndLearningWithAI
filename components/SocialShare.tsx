'use client';

import { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Mail, Link2, Check } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  hashtags?: string[];
  via?: string;
  className?: string;
}

interface SharePlatform {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

export default function SocialShare({
  url,
  title,
  description,
  hashtags = ['AIEducation', 'ProductiveStruggle', 'EdTech'],
  via = 'learningscience_io',
  className = ''
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fullUrl = url.startsWith('http') ? url : `https://learningscience.io${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.join(',');

  const platforms: SharePlatform[] = [
    {
      name: 'Twitter',
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtagString}&via=${via}`,
      color: 'hover:bg-blue-400 hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      color: 'hover:bg-blue-700 hover:text-white'
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'hover:bg-gray-600 hover:text-white'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const handleShare = (platform: SharePlatform) => {
    if (platform.name === 'Email') {
      window.location.href = platform.url;
    } else {
      window.open(platform.url, '_blank', 'width=550,height=420');
    }
    
    // Track share analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform.name.toLowerCase(),
        content_type: 'article',
        item_id: url
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        aria-label="Share this content"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Share</span>
      </button>

      {/* Share Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
          <div className="p-3">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Share this content</h4>
            
            {/* Social Platforms */}
            <div className="space-y-1">
              {platforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShare(platform)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-md transition-colors duration-200 ${platform.color}`}
                >
                  {platform.icon}
                  <span>Share on {platform.name}</span>
                </button>
              ))}
              
              {/* Copy Link */}
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Link2 className="w-4 h-4" />
                )}
                <span className={copied ? 'text-green-600' : ''}>
                  {copied ? 'Link copied!' : 'Copy link'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Enhanced social sharing with Web Share API
export function NativeSocialShare({
  url,
  title,
  description,
  fallbackComponent
}: {
  url: string;
  title: string;
  description: string;
  fallbackComponent: React.ReactNode;
}) {
  const [canShare, setCanShare] = useState(false);

  // Check if Web Share API is available
  useState(() => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      setCanShare(true);
    }
  });

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: description,
        url: url.startsWith('http') ? url : `https://learningscience.io${url}`
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (canShare) {
    return (
      <button
        onClick={handleNativeShare}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Share</span>
      </button>
    );
  }

  return <>{fallbackComponent}</>;
}

// Social proof component for articles
export function SocialProof({ 
  shareCount = 0, 
  viewCount = 0,
  className = '' 
}: { 
  shareCount?: number; 
  viewCount?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center space-x-4 text-sm text-gray-600 ${className}`}>
      {viewCount > 0 && (
        <div className="flex items-center space-x-1">
          <span>{viewCount.toLocaleString()} views</span>
        </div>
      )}
      {shareCount > 0 && (
        <div className="flex items-center space-x-1">
          <Share2 className="w-4 h-4" />
          <span>{shareCount} shares</span>
        </div>
      )}
    </div>
  );
}
