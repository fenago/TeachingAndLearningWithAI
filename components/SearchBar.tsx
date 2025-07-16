'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, BookOpen, Users, Video } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'article' | 'resource' | 'workshop';
  category: string;
}

// Comprehensive search database for LearningScience.io
const searchDatabase: SearchResult[] = [
  // Core Pages
  {
    id: '1',
    title: 'About Dr. Ernesto Lee - Educational AI Researcher',
    description: 'Leading expert in productive struggle methodology and AI-enhanced education',
    url: '/about-author',
    type: 'page',
    category: 'About'
  },
  {
    id: '2',
    title: 'AI Teaching Workshops - Professional Development',
    description: 'Transform your teaching with research-based AI workshops using productive struggle methodology',
    url: '/workshops',
    type: 'workshop',
    category: 'Professional Development'
  },
  {
    id: '3',
    title: 'Free AI Teaching Resources & Educator Tools',
    description: 'Access research-based resources, guides, templates, and tools for AI-enhanced education',
    url: '/resources',
    type: 'resource',
    category: 'Resources'
  },
  {
    id: '4',
    title: 'AI Education Blog - Research & Insights',
    description: 'Discover research-based insights on AI in education and productive struggle methodology',
    url: '/blog',
    type: 'page',
    category: 'Blog'
  },
  
  // Blog Articles
  {
    id: '5',
    title: '5 Signs AI is Helping (Not Replacing) Student Learning',
    description: 'Research-based indicators that show when AI tools enhance learning rather than eliminate thinking',
    url: '/blog/5-signs-ai-helping-not-replacing-learning',
    type: 'article',
    category: 'AI Education'
  },
  {
    id: '6',
    title: 'Why Easy AI Tools May Be Harming Student Learning',
    description: 'How AI tools that eliminate cognitive effort can undermine meaningful learning experiences',
    url: '/blog/why-easy-ai-tools-harm-student-learning',
    type: 'article',
    category: 'AI Education Research'
  },

  // Resource Topics
  {
    id: '7',
    title: 'Productive Struggle Implementation Guide',
    description: 'Step-by-step guide for implementing productive struggle methodology in your classroom',
    url: '/resources#implementation-guide',
    type: 'resource',
    category: 'Implementation'
  },
  {
    id: '8',
    title: 'AI Tool Evaluation Framework',
    description: 'Research-based framework for evaluating AI tools based on cognitive engagement principles',
    url: '/resources#evaluation-framework',
    type: 'resource',
    category: 'Evaluation'
  },
  {
    id: '9',
    title: 'Lesson Plan Templates for AI Integration',
    description: 'Ready-to-use templates for integrating AI tools while preserving productive struggle',
    url: '/resources#lesson-templates',
    type: 'resource',
    category: 'Templates'
  },

  // Key Topics
  {
    id: '10',
    title: 'Productive Struggle Methodology',
    description: 'Research-based approach that preserves cognitive effort while leveraging AI assistance',
    url: '/about-author#methodology',
    type: 'page',
    category: 'Methodology'
  },
  {
    id: '11',
    title: 'K-12 AI Education Strategies',
    description: 'Age-appropriate strategies for implementing AI in elementary, middle, and high school classrooms',
    url: '/workshops#k12-strategies',
    type: 'workshop',
    category: 'K-12 Education'
  },
  {
    id: '12',
    title: 'College Faculty AI Training',
    description: 'Professional development designed specifically for higher education instructors',
    url: '/workshops#college-faculty',
    type: 'workshop',
    category: 'Higher Education'
  }
];

const getResultIcon = (type: string) => {
  switch (type) {
    case 'article': return <FileText className="w-4 h-4" />;
    case 'workshop': return <Users className="w-4 h-4" />;
    case 'resource': return <BookOpen className="w-4 h-4" />;
    default: return <Search className="w-4 h-4" />;
  }
};

const getResultTypeLabel = (type: string) => {
  switch (type) {
    case 'article': return 'Article';
    case 'workshop': return 'Workshop';
    case 'resource': return 'Resource';
    case 'page': return 'Page';
    default: return 'Content';
  }
};

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter search results based on query
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const filtered = searchDatabase.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // Limit to 8 results

    setResults(filtered);
    setSelectedIndex(-1);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            window.location.href = results[selectedIndex].url;
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setQuery('');
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setQuery('');
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search resources, articles, workshops..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <Link
              key={result.id}
              href={result.url}
              onClick={() => handleResultClick(result.url)}
              className={`block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                index === selectedIndex ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1 text-blue-600">
                  {getResultIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {result.title}
                    </h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {getResultTypeLabel(result.type)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {result.description}
                  </p>
                  <div className="mt-1">
                    <span className="text-xs text-gray-500">{result.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {/* Search Analytics */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <div className="text-center">
            <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">No results found for "{query}"</p>
            <p className="text-xs text-gray-500">
              Try searching for "productive struggle", "AI education", "workshops", or "resources"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
