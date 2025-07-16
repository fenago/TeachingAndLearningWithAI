'use client';

import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, Users, FileText } from 'lucide-react';

interface RelatedItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'resource' | 'workshop' | 'page';
  category: string;
  readingTime?: number;
  publishDate?: string;
  featured?: boolean;
}

interface RelatedContentProps {
  currentUrl: string;
  category?: string;
  limit?: number;
  title?: string;
  className?: string;
}

// Comprehensive related content database
const contentDatabase: RelatedItem[] = [
  {
    id: '1',
    title: '5 Signs AI is Helping (Not Replacing) Student Learning',
    description: 'Discover research-based indicators that show when AI tools enhance learning rather than eliminate thinking.',
    url: '/blog/5-signs-ai-helping-not-replacing-learning',
    type: 'article',
    category: 'AI Education',
    readingTime: 6,
    publishDate: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Why Easy AI Tools May Be Harming Student Learning',
    description: 'How AI tools that eliminate cognitive effort can undermine meaningful learning experiences.',
    url: '/blog/why-easy-ai-tools-harm-student-learning',
    type: 'article',
    category: 'AI Education Research',
    readingTime: 8,
    publishDate: '2024-01-08',
    featured: true
  },
  {
    id: '3',
    title: 'AI Teaching Workshops - Professional Development',
    description: 'Transform your teaching with research-based AI workshops using productive struggle methodology.',
    url: '/workshops',
    type: 'workshop',
    category: 'Professional Development',
    featured: true
  },
  {
    id: '4',
    title: 'Free AI Teaching Resources & Educator Tools',
    description: 'Access research-based resources, guides, templates, and tools for AI-enhanced education.',
    url: '/resources',
    type: 'resource',
    category: 'Resources',
    featured: true
  },
  {
    id: '5',
    title: 'About Dr. Ernesto Lee - Educational AI Researcher',
    description: 'Leading expert in productive struggle methodology and AI-enhanced education.',
    url: '/about-author',
    type: 'page',
    category: 'About'
  },
  {
    id: '6',
    title: 'Productive Struggle Implementation Guide',
    description: 'Step-by-step guide for implementing productive struggle methodology in your classroom.',
    url: '/resources#implementation-guide',
    type: 'resource',
    category: 'Implementation'
  },
  {
    id: '7',
    title: 'AI Tool Evaluation Framework',
    description: 'Research-based framework for evaluating AI tools based on cognitive engagement principles.',
    url: '/resources#evaluation-framework',
    type: 'resource',
    category: 'Evaluation'
  },
  {
    id: '8',
    title: 'K-12 AI Education Strategies',
    description: 'Age-appropriate strategies for implementing AI in elementary, middle, and high school classrooms.',
    url: '/workshops#k12-strategies',
    type: 'workshop',
    category: 'K-12 Education'
  },
  {
    id: '9',
    title: 'College Faculty AI Training',
    description: 'Professional development designed specifically for higher education instructors.',
    url: '/workshops#college-faculty',
    type: 'workshop',
    category: 'Higher Education'
  },
  {
    id: '10',
    title: 'Lesson Plan Templates for AI Integration',
    description: 'Ready-to-use templates for integrating AI tools while preserving productive struggle.',
    url: '/resources#lesson-templates',
    type: 'resource',
    category: 'Templates'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'article': return <FileText className="w-4 h-4" />;
    case 'workshop': return <Users className="w-4 h-4" />;
    case 'resource': return <BookOpen className="w-4 h-4" />;
    default: return <ArrowRight className="w-4 h-4" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'article': return 'Article';
    case 'workshop': return 'Workshop';
    case 'resource': return 'Resource';
    case 'page': return 'Page';
    default: return 'Content';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'article': return 'bg-blue-100 text-blue-800';
    case 'workshop': return 'bg-green-100 text-green-800';
    case 'resource': return 'bg-purple-100 text-purple-800';
    case 'page': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function RelatedContent({
  currentUrl,
  category,
  limit = 4,
  title = 'Related Content',
  className = ''
}: RelatedContentProps) {
  // Filter out current page and get related content
  const filteredContent = contentDatabase
    .filter(item => item.url !== currentUrl)
    .sort((a, b) => {
      // Prioritize featured content
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then prioritize same category if specified
      if (category) {
        if (a.category === category && b.category !== category) return -1;
        if (a.category !== category && b.category === category) return 1;
      }
      
      // Finally sort by publish date if available
      if (a.publishDate && b.publishDate) {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
      
      return 0;
    })
    .slice(0, limit);

  if (filteredContent.length === 0) return null;

  return (
    <section className={`${className}`}>
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredContent.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="group block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="text-gray-500">
                    {getTypeIcon(item.type)}
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {getTypeLabel(item.type)}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h4>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium">{item.category}</span>
                {item.readingTime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.readingTime} min read</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Next/Previous navigation for sequential content
export function ContentNavigation({
  previousContent,
  nextContent,
  className = ''
}: {
  previousContent?: RelatedItem;
  nextContent?: RelatedItem;
  className?: string;
}) {
  if (!previousContent && !nextContent) return null;

  return (
    <nav className={`border-t border-gray-200 pt-8 ${className}`}>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Previous Content */}
        {previousContent && (
          <Link
            href={previousContent.url}
            className="group flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-gray-400 transform rotate-180 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">Previous</div>
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {previousContent.title}
              </h4>
            </div>
          </Link>
        )}
        
        {/* Next Content */}
        {nextContent && (
          <Link
            href={nextContent.url}
            className="group flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 md:text-right"
          >
            <div className="flex-1 min-w-0 md:order-1">
              <div className="text-xs text-gray-500 mb-1">Next</div>
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {nextContent.title}
              </h4>
            </div>
            <div className="flex-shrink-0 md:order-2">
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

// Featured content carousel for homepage
export function FeaturedContent({ 
  limit = 3,
  className = '' 
}: { 
  limit?: number;
  className?: string;
}) {
  const featuredItems = contentDatabase
    .filter(item => item.featured)
    .slice(0, limit);

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Content</h2>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredItems.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                  <span className="ml-2">{getTypeLabel(item.type)}</span>
                </span>
                {item.readingTime && (
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{item.readingTime} min</span>
                  </div>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{item.category}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
