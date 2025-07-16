'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'inline' | 'modal' | 'sidebar';
  title?: string;
  description?: string;
  benefits?: string[];
  className?: string;
  source?: string; // Track signup source for analytics
}

export default function NewsletterSignup({
  variant = 'default',
  title,
  description,
  benefits = [
    'Weekly AI education insights',
    'Exclusive resources & templates',
    'Workshop announcements',
    'Research-based teaching strategies'
  ],
  className = '',
  source = 'newsletter-signup'
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const defaultTitle = 'Join 5,000+ Educators Transforming Teaching with AI';
  const defaultDescription = 'Get exclusive insights on productive struggle methodology and AI-enhanced education delivered to your inbox.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Simulate API call (replace with your newsletter service)
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          interests: ['ai-education', 'productive-struggle']
        }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setStatus('success');
      setEmail('');
      
      // Track conversion analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup', {
          source,
          email_domain: email.split('@')[1]
        });
      }

    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      console.error('Newsletter signup error:', error);
    }
  };

  // Inline variant for blog articles
  if (variant === 'inline') {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-6 my-8 ${className}`}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title || 'Get More AI Education Insights'}
            </h3>
            <p className="text-gray-600 mb-4">
              Join educators who are successfully implementing AI while preserving meaningful learning.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
            {status === 'success' && (
              <p className="text-green-600 text-sm mt-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Thanks! Check your email to confirm your subscription.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 sticky top-8 ${className}`}>
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Weekly AI Education Insights
          </h3>
          <p className="text-sm text-gray-600">
            Join 5,000+ educators getting practical AI teaching strategies.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center text-sm font-medium"
          >
            {status === 'loading' ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : status === 'success' ? (
              'Subscribed!'
            ) : (
              'Get Free Insights'
            )}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-green-600 text-xs mt-2 text-center">
            Check your email to confirm!
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-xs mt-2 text-center">
            {errorMessage}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <ul className="space-y-2">
            {benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-center text-xs text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white ${className}`}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-blue-100 text-lg">
            {description || defaultDescription}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : status === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Subscribed!
              </>
            ) : (
              <>
                Subscribe Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-blue-100 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Success! Check your email to confirm your subscription.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-200 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {errorMessage}
          </p>
        )}

        {status !== 'success' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-blue-100">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-300 flex-shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
        )}

        <p className="text-blue-200 text-sm mt-4">
          No spam. Unsubscribe anytime. 5,000+ educators trust us.
        </p>
      </div>
    </div>
  );
}
