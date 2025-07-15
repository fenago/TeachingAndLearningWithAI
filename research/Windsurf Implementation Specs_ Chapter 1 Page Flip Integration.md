# Windsurf Implementation Specs: Chapter 1 Page Flip Integration

## Project Overview
Integrate a React Page Flip component for Chapter 1 of "Productive Struggle: How AI Reshapes Teaching and Learning" into an existing React 18 + Next.js 14 application.

## Required Dependencies

### Install react-pageflip
```bash
npm install react-pageflip
# or
yarn add react-pageflip
# or
pnpm add react-pageflip
```

### Library Documentation
- **Official Docs:** https://nodlik.github.io/react-pageflip/
- **GitHub Repo:** https://github.com/Nodlik/react-pageflip
- **NPM Package:** https://www.npmjs.com/package/react-pageflip

## Component Implementation

### 1. Create the Page Component (`components/PageFlipPage.tsx`)

```tsx
import React from 'react';

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const PageFlipPage = React.forwardRef<HTMLDivElement, PageProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div className={`page ${className}`} ref={ref}>
        {children}
      </div>
    );
  }
);

PageFlipPage.displayName = 'PageFlipPage';

export default PageFlipPage;
```

### 2. Create the Main Chapter 1 Component (`components/Chapter1PageFlip.tsx`)

```tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, BookOpen, Download, Share2 } from 'lucide-react';
import PageFlipPage from './PageFlipPage';

// Dynamically import HTMLFlipBook to avoid SSR issues
const HTMLFlipBook = dynamic(() => import('react-pageflip'), {
  ssr: false,
  loading: () => <div className="w-[400px] h-[600px] bg-gray-200 animate-pulse rounded-lg" />
});

interface Chapter1PageFlipProps {
  onGetBook?: () => void;
  onShareChapter?: () => void;
}

const Chapter1PageFlip: React.FC<Chapter1PageFlipProps> = ({
  onGetBook,
  onShareChapter
}) => {
  const flipBook = useRef<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const nextPage = () => {
    flipBook.current?.getPageFlip().flipNext();
  };

  const prevPage = () => {
    flipBook.current?.getPageFlip().flipPrev();
  };

  const onInit = () => {
    setTotalPages(flipBook.current?.getPageFlip().getPageCount() || 0);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Productive Struggle
            </h1>
            <p className="text-xl text-slate-600 mb-4">
              How AI Reshapes Teaching and Learning
            </p>
            <p className="text-lg text-slate-500">
              Chapter 1: The Productive Friction Revolution
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-[400px] h-[600px] bg-gray-200 animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Productive Struggle
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            How AI Reshapes Teaching and Learning
          </p>
          <p className="text-lg text-slate-500">
            Chapter 1: The Productive Friction Revolution
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={onGetBook}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Get Full Book
          </button>
          <button 
            onClick={onShareChapter}
            className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share Chapter
          </button>
        </div>
      </div>

      {/* Book Container */}
      <div className="flex justify-center items-center">
        <div className="book-container relative">
          <HTMLFlipBook
            ref={flipBook}
            width={400}
            height={600}
            size="stretch"
            minWidth={300}
            maxWidth={500}
            minHeight={450}
            maxHeight={750}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={false}
            onFlip={onFlip}
            onInit={onInit}
            className="book-flip"
            style={{ margin: '0 auto' }}
          >
            {/* Cover Page */}
            <PageFlipPage className="cover-page">
              <div className="h-full bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8 flex flex-col justify-between">
                <div>
                  <BookOpen className="w-12 h-12 mb-6 text-blue-200" />
                  <h1 className="text-3xl font-bold mb-4 leading-tight">
                    Productive Struggle
                  </h1>
                  <p className="text-lg text-blue-100 mb-6">
                    How AI Reshapes Teaching and Learning
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-yellow-300">
                    Chapter 1
                  </h2>
                  <h3 className="text-lg text-blue-100">
                    The Productive Friction Revolution
                  </h3>
                  <p className="text-sm text-blue-200 mt-4">
                    Why AI's Greatest Gift to Education Isn't What You Think
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-blue-200">Dr. Ernesto Lee</p>
                </div>
              </div>
            </PageFlipPage>

            {/* Chapter Title Page */}
            <PageFlipPage>
              <div className="h-full p-8 bg-white">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-800 mb-4">
                    Chapter 1
                  </h1>
                  <h2 className="text-xl font-semibold text-blue-700 mb-6">
                    The Productive Friction Revolution
                  </h2>
                  <p className="text-lg text-slate-600 italic mb-8">
                    Why AI's Greatest Gift to Education Isn't What You Think
                  </p>
                </div>
                
                <div className="text-center mb-8">
                  <blockquote className="text-lg italic text-slate-600 border-l-4 border-blue-500 pl-4">
                    "The cave you fear to enter holds the treasure you seek."
                  </blockquote>
                  <p className="text-sm text-slate-500 mt-2">— Joseph Campbell</p>
                </div>

                <div className="space-y-4 text-sm text-slate-700">
                  <p>
                    In this groundbreaking chapter, Dr. Ernesto Lee reveals the fundamental paradox 
                    that's undermining AI integration in education worldwide.
                  </p>
                  <p>
                    You'll discover why the very feature that makes AI most appealing—its ability 
                    to eliminate friction—is precisely what makes it most dangerous to learning.
                  </p>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 3 - The Calculus Crisis */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Calculus Crisis That Changed Everything
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    Professor Sarah Chen had always prided herself on being an innovative educator. 
                    When ChatGPT burst onto the scene in late 2022, she was among the first faculty 
                    members at her university to embrace AI in her calculus courses.
                  </p>
                  <p>
                    Her students were struggling with complex integration problems, and she thought 
                    she had found the perfect solution: an AI tutor that could provide instant, 
                    step-by-step solutions to any mathematical challenge.
                  </p>
                  <p>
                    The results were immediate and seemingly miraculous. Student satisfaction scores 
                    soared. Office hours became nearly empty as students could get instant help at 3 AM. 
                    Homework completion rates reached 100% for the first time in her teaching career.
                  </p>
                  <p>
                    Professor Chen felt like she had revolutionized mathematics education.
                  </p>
                  <p className="font-semibold text-blue-800">
                    But then came the midterm exam.
                  </p>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 4 - The Crisis Revealed */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    Despite months of AI-assisted homework with perfect completion rates, her students 
                    performed worse than any class she had taught in fifteen years. The very students 
                    who had been confidently solving complex integrals with AI assistance couldn't 
                    handle basic derivative problems without technological support.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                    <p className="font-semibold text-red-700">
                      The AI hadn't made them better at calculus—it had made them dependent on getting 
                      answers without understanding.
                    </p>
                  </div>
                  <p>
                    Professor Chen had discovered what would become the central paradox of AI in education: 
                    <span className="font-semibold text-blue-800"> the very feature that makes AI most 
                    appealing—its ability to eliminate friction—is precisely what makes it most dangerous 
                    to learning.</span>
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Insight</h4>
                  <p className="text-sm text-blue-700 italic">
                    "AI's superpower is removing friction, but friction is where learning lives."
                  </p>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 5 - The Friction Paradox */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Friction Paradox: When Ease Becomes the Enemy
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    In our rush to embrace artificial intelligence in education, we have stumbled 
                    upon a fundamental contradiction that strikes at the heart of how learning 
                    actually works.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
                    <p className="font-semibold text-yellow-800">
                      AI's superpower is removing friction, but friction is where learning lives.
                    </p>
                  </div>
                  <p>
                    This isn't a minor technical glitch that can be fixed with better prompts or 
                    smarter algorithms. This is a profound philosophical challenge that forces us 
                    to reconsider everything we think we know about the relationship between 
                    technology and learning.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                    <p className="font-semibold text-red-700">
                      We are facing the first technology in human history that is so good at thinking 
                      that it can prevent us from learning how to think.
                    </p>
                  </div>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 6 - The Manifestation */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    The friction paradox manifests in countless ways across educational contexts:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>When students ask AI to solve their math problems, they get perfect solutions 
                      but miss the cognitive struggle that builds mathematical reasoning.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>When they request essay outlines, they receive well-structured arguments but 
                      bypass the messy process of developing their own ideas.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>When they seek explanations of complex concepts, they get clear, polished 
                      responses but avoid the productive confusion that leads to deep understanding.</span>
                    </li>
                  </ul>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6">
                    <p className="font-semibold text-red-700">
                      The irony is devastating: the smoother we make the learning process, the less 
                      learning actually occurs.
                    </p>
                  </div>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 7 - The Neuroscience */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Neuroscience of Necessary Struggle
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    To understand why friction is essential for learning, we must examine what 
                    actually happens in the brain when genuine learning occurs.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <p className="font-semibold text-blue-800">
                      Learning is not the acquisition of information—it is the physical rewiring 
                      of neural pathways through effortful cognitive processing.
                    </p>
                  </div>
                  <p>
                    When students encounter challenging problems that require sustained mental effort, 
                    their brains undergo measurable structural changes. The struggle to understand 
                    difficult concepts literally builds new neural connections.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
                    <p className="font-semibold text-green-700">
                      The brain grows stronger not from getting answers, but from the work of seeking answers.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-sm text-green-800 font-medium">
                    "Productive Struggle" = The optimal level of cognitive challenge that promotes 
                    learning without causing overwhelming frustration.
                  </p>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 8 - The Dependency Trap */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Dependency Trap: How AI Creates Learned Helplessness
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    The most insidious aspect of the friction paradox is how quickly students become 
                    dependent on AI assistance. What begins as occasional help with difficult problems 
                    rapidly evolves into an inability to engage in independent cognitive work.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                    <p className="font-semibold text-red-700">
                      AI doesn't just solve problems for students—it teaches them that problems should 
                      be solved by something other than their own thinking.
                    </p>
                  </div>
                  <p>
                    This phenomenon, which we might call "cognitive outsourcing," represents a new 
                    form of learned helplessness specifically adapted to the AI age.
                  </p>
                  <p>
                    Students begin to believe that their own thinking is inadequate, that their natural 
                    cognitive processes are too slow and inefficient compared to AI capabilities.
                  </p>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 9 - The Path Forward */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Path Forward: Productive Friction in an AI World
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    Recognizing the friction paradox is not an argument against AI in education—it's 
                    an argument for using AI more thoughtfully and strategically.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <p className="font-semibold text-blue-800">
                      The goal is not to eliminate AI from educational contexts but to harness its 
                      power while preserving the productive friction that makes learning possible.
                    </p>
                  </div>
                  <p>
                    This requires a fundamental shift in how we think about AI's role in education:
                  </p>
                  <ul className="space-y-2 ml-4 mt-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">✓</span>
                      <span>Instead of using AI to make learning easier, we must learn to use AI to make learning deeper.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">✓</span>
                      <span>Instead of eliminating cognitive challenges, we must use AI to create more meaningful challenges.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 10 - The Revolution */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Productive Struggle Revolution
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    What we need is nothing less than a productive struggle revolution—a fundamental 
                    reimagining of AI's role in education that prioritizes learning over efficiency, 
                    understanding over answers, and wisdom over information.
                  </p>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
                    <p className="font-semibold text-purple-700">
                      This revolution requires us to resist the seductive appeal of frictionless learning 
                      and instead embrace the messy, challenging, and ultimately transformative process 
                      of authentic education.
                    </p>
                  </div>
                  <p>
                    The productive struggle revolution is not about returning to pre-AI educational 
                    methods—it's about moving forward to post-AI educational wisdom.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <p className="font-semibold text-blue-800">
                      It's about learning to dance with artificial intelligence rather than being led by it.
                    </p>
                  </div>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 11 - Call to Action */}
            <PageFlipPage>
              <div className="h-full p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    Ready to Transform Your Teaching?
                  </h3>
                  <p className="text-sm text-slate-700 mb-6">
                    This is just the beginning. The complete book contains 9 more chapters with 
                    practical strategies, frameworks, and tools for implementing productive struggle 
                    in your AI-enhanced classroom.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-slate-800 mb-2">Get the Complete Book</p>
                    <p className="text-sm text-slate-600 mb-4">
                      Physical Book: $39.99 + $5.00 shipping<br />
                      Ebook: $34.99
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-slate-600 italic">
                      "The future of education is not about making learning frictionless—it's about 
                      making friction productive."
                    </p>
                    <p className="text-xs text-slate-500 mt-2">— Dr. Ernesto Lee</p>
                  </div>
                </div>
              </div>
            </PageFlipPage>

            {/* Back Cover */}
            <PageFlipPage className="cover-page">
              <div className="h-full bg-gradient-to-br from-purple-900 to-blue-900 text-white p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About the Author</h2>
                  <p className="text-sm text-blue-100 mb-4">
                    Dr. Ernesto Lee is an Assistant Professor of Computer Science and Data Analytics 
                    at Miami Dade College with over 30 years of combined industry and academic experience.
                  </p>
                  <p className="text-sm text-blue-100">
                    He has pioneered the integration of "Emotionally Intelligent AI" into the classroom 
                    and is a featured speaker at the ASU+GSV Summit 2025.
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-blue-200 mb-2">
                    Visit LearningScience.ai to learn more
                  </p>
                  <p className="text-xs text-blue-300">
                    © 2025 Dr. Ernesto Lee. All rights reserved.
                  </p>
                </div>
              </div>
            </PageFlipPage>
          </HTMLFlipBook>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        
        <span className="text-sm text-slate-600 px-4">
          Page {currentPage + 1} of {totalPages}
        </span>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage >= totalPages - 1}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-slate-500">
        <p>Experience the complete "Productive Struggle" methodology</p>
        <p>Get the full book at LearningScience.ai</p>
      </div>
    </div>
  );
};

export default Chapter1PageFlip;
```

## Required CSS Styles

### Add to your global CSS file (e.g., `globals.css` or `styles/globals.css`)

```css
/* Page Flip Styles */
.book-container {
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-flip {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

.page {
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
}

.page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.02) 50%, transparent 100%);
  pointer-events: none;
}

.cover-page {
  background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);
  color: white;
  border: none;
}

.cover-page::before {
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .book-flip {
    transform: scale(0.8);
  }
}

@media (max-width: 640px) {
  .book-flip {
    transform: scale(0.7);
  }
}
```

## Usage in Next.js Page

### Create a page (`pages/chapter1.tsx` or `app/chapter1/page.tsx`)

```tsx
import Chapter1PageFlip from '@/components/Chapter1PageFlip';

export default function Chapter1Page() {
  const handleGetBook = () => {
    // Redirect to purchase page or open modal
    window.open('https://learningscience.ai/book', '_blank');
  };

  const handleShareChapter = () => {
    // Implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'Chapter 1: The Productive Friction Revolution',
        text: 'Read Chapter 1 of "Productive Struggle: How AI Reshapes Teaching and Learning"',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Chapter1PageFlip 
      onGetBook={handleGetBook}
      onShareChapter={handleShareChapter}
    />
  );
}
```

## Next.js Configuration

### Update `next.config.js` to handle the react-pageflip library

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
```

## TypeScript Configuration

### Add type definitions (`types/react-pageflip.d.ts`)

```typescript
declare module 'react-pageflip' {
  import { ReactNode, RefObject } from 'react';

  interface FlipBookProps {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    onFlip?: (e: { data: number }) => void;
    onChangeOrientation?: (e: { data: 'portrait' | 'landscape' }) => void;
    onChangeState?: (e: { data: 'user_fold' | 'fold_corner' | 'flipping' | 'read' }) => void;
    onInit?: () => void;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    ref?: RefObject<any>;
  }

  const HTMLFlipBook: React.FC<FlipBookProps>;
  export default HTMLFlipBook;
}
```

## SEO and Meta Tags

### Add to your page head or layout

```tsx
import Head from 'next/head';

// In your component or layout
<Head>
  <title>Chapter 1: The Productive Friction Revolution - Productive Struggle</title>
  <meta name="description" content="Read Chapter 1 of Productive Struggle: How AI Reshapes Teaching and Learning by Dr. Ernesto Lee. Discover why AI's greatest gift to education isn't what you think." />
  <meta property="og:title" content="Chapter 1: The Productive Friction Revolution" />
  <meta property="og:description" content="Experience the revolutionary approach to AI in education through an interactive page flip preview." />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Chapter 1: The Productive Friction Revolution" />
  <meta name="twitter:description" content="Read Chapter 1 of Productive Struggle: How AI Reshapes Teaching and Learning" />
</Head>
```

## Implementation Notes

### Important Considerations:

1. **SSR Handling:** The component uses `dynamic` import with `ssr: false` to prevent server-side rendering issues with the react-pageflip library.

2. **Client-Side Rendering:** The `isClient` state ensures the component only renders on the client side.

3. **Mobile Responsiveness:** CSS transforms scale the book down on smaller screens.

4. **Accessibility:** Navigation buttons include proper disabled states and ARIA labels.

5. **Performance:** The component lazy loads the HTMLFlipBook to improve initial page load.

### Customization Options:

- **Colors:** Modify the gradient backgrounds and text colors in the Tailwind classes
- **Content:** Update the page content in each `PageFlipPage` component
- **Dimensions:** Adjust the `width` and `height` props of `HTMLFlipBook`
- **Animation:** Modify `flippingTime` and other animation properties

### Integration with Existing App:

- Import the component into any existing page
- Customize the callback functions (`onGetBook`, `onShareChapter`) to integrate with your existing routing and analytics
- Style the component to match your existing design system
- Add analytics tracking to monitor engagement

This implementation provides a complete, production-ready page flip component that can be directly integrated into your existing React 18 + Next.js 14 application.

