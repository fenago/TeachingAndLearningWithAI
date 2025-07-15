'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, BookOpen, Share2 } from 'lucide-react';
import '@/styles/chapter-flip.css';

// Import HTMLFlipBook dynamically
const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[800px] h-[600px] bg-gray-200 animate-pulse rounded-lg" />
      </div>
    )
  }
);

export default function Chapter1PreviewPage() {
  const router = useRouter();
  const book = useRef<any>(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const nextButtonClick = () => {
    book.current?.pageFlip()?.flipNext();
  };

  const prevButtonClick = () => {
    book.current?.pageFlip()?.flipPrev();
  };

  const onPage = (e: any) => {
    setPage(e.data);
  };

  const handleGetBook = () => {
    router.push('/#pricing');
  };

  const handleShareChapter = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Chapter 1: The Friction Paradox - Productive Struggle',
        text: 'Check out this fascinating chapter about how AI can reshape teaching and learning!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(console.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Chapter 1: The Friction Paradox
          </h1>
          <p className="text-lg text-slate-600">
            From "Productive Struggle: How AI Reshapes Teaching and Learning"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleGetBook}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Get Full Book
          </button>
          <button
            onClick={handleShareChapter}
            className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share Chapter
          </button>
        </div>
      </div>

      {/* Book Container */}
      <div className="flex justify-center items-center">
        <HTMLFlipBook
          width={400}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={400}
          maxHeight={600}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          onFlip={onPage}
          onChangeOrientation={() => {}}
          onChangeState={() => {}}
          className="demo-book shadow-2xl"
          ref={book}
        >
          {/* Cover Page */}
          <div className="page">
            <div className="h-full bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">Chapter 1</h2>
                <h1 className="text-4xl font-bold mb-6">The Friction Paradox</h1>
                <p className="text-lg leading-relaxed opacity-90">
                  Why Too Much AI Help Can Hurt Learning
                </p>
              </div>
              <div>
                <p className="text-sm opacity-80">From the book:</p>
                <p className="text-xl font-semibold mt-2">Productive Struggle</p>
                <p className="text-sm mt-1 opacity-80">By Dr. Ernesto Lee</p>
              </div>
            </div>
          </div>

          {/* Page 1 */}
          <div className="page">
            <div className="h-full p-6 bg-white">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                The Teacher Who Discovered AI's Dark Secret
              </h3>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  Sarah Martinez thought she had discovered the holy grail of mathematics education. 
                  As a veteran geometry teacher at Lincoln High School, she'd watched her students 
                  struggle with proof-writing for fifteen years. Then, in the fall of 2023, she 
                  introduced an AI tutor that could guide students through geometric proofs step-by-step.
                </p>
                <p>
                  "The results were immediate and spectacular," Sarah recalls. "Students who had 
                  never successfully completed a proof were suddenly turning in perfect homework. 
                  Participation skyrocketed. Parent complaints about 'impossible assignments' 
                  disappeared overnight."
                </p>
                <p>
                  For three months, Sarah believed she had revolutionized her classroom. Her 
                  students seemed more confident, homework completion rates hit 100%, and the 
                  AI tool's analytics showed students spending more time than ever on mathematics.
                </p>
              </div>
            </div>
          </div>

          {/* Page 2 */}
          <div className="page">
            <div className="h-full p-6 bg-white">
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  Then came the midterm exam.
                </p>
                <p>
                  "I'll never forget grading those papers," Sarah says, her voice still carrying 
                  the shock of that December evening. "Student after student had left the proof 
                  section blank. Kids who had been submitting flawless homework couldn't even 
                  begin the most basic proofs without AI assistance."
                </p>
                <p>
                  The class average on the proof section was 23% – the lowest in her career. 
                  More disturbing than the scores was what she observed during the exam: the 
                  blank stares, the nervous fidgeting, the learned helplessness that had replaced 
                  mathematical thinking.
                </p>
                <p>
                  Sarah had accidentally discovered what researchers now call the "Friction Paradox" 
                  – the counterintuitive principle that making learning too easy can actually make 
                  it impossible.
                </p>
              </div>
            </div>
          </div>

          {/* Page 3 */}
          <div className="page">
            <div className="h-full p-6 bg-white">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                Understanding the Friction Paradox
              </h3>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  The Friction Paradox represents one of the most important discoveries in modern 
                  educational technology: cognitive friction – the mental effort required to process, 
                  understand, and apply information – isn't a bug in the learning process. It's the 
                  essential feature.
                </p>
                <p>
                  Consider how a muscle grows stronger. It's not the lifting of the weight that 
                  builds strength, but the resistance against it. Remove the resistance, and you 
                  remove the growth. The brain operates on remarkably similar principles.
                </p>
                <p>
                  When AI removes too much cognitive friction, it can transform from a learning 
                  accelerator into a learning inhibitor. The very efficiency that makes AI attractive 
                  can short-circuit the struggle that makes learning stick.
                </p>
              </div>
            </div>
          </div>

          {/* Page 4 */}
          <div className="page">
            <div className="h-full p-6 bg-white">
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  Despite months of AI-assisted homework with perfect completion rates, her students 
                  had performed worse than any class she'd taught in fifteen years. The same students 
                  who had been confidently solving complex problems with AI assistance couldn't handle 
                  basic concepts without technological support.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Key Insight:</h4>
                  <p className="text-sm text-blue-800 italic">
                    "The problem wasn't that AI was too powerful – it was that we were using it 
                    completely wrong. We were optimizing for efficiency and correct answers when 
                    we should have been optimizing for learning and intellectual growth."
                  </p>
                </div>
                <p className="mt-4">
                  This realization sparked a two-year research journey that would fundamentally 
                  challenge everything the education world believed about AI.
                </p>
              </div>
            </div>
          </div>

          {/* End Page */}
          <div className="page">
            <div className="h-full bg-gradient-to-br from-purple-900 to-blue-900 text-white p-8 flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-bold mb-6">Ready for More?</h2>
              <p className="text-lg mb-8 opacity-90">
                This is just the beginning. Discover how to transform AI from a learning 
                inhibitor into a learning accelerator.
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleGetBook}
                  className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get the Full Book
                </button>
                <p className="text-sm opacity-80">
                  Continue reading all 12 chapters of Productive Struggle
                </p>
              </div>
            </div>
          </div>
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button 
          onClick={prevButtonClick}
          disabled={page === 0}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>
        
        <span className="text-slate-700 font-medium">
          Page {page + 1} of {totalPage || 6}
        </span>
        
        <button 
          onClick={nextButtonClick}
          disabled={page >= (totalPage || 6) - 1}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6 text-slate-700" />
        </button>
      </div>
    </div>
  );
}
