'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, BookOpen, Download, Share2 } from 'lucide-react';
import PageFlipPage from './PageFlipPage';

// Dynamically import HTMLFlipBook to avoid SSR issues
const HTMLFlipBook = dynamic(
  () => import('react-pageflip').then((module) => module.default),
  {
    ssr: false,
    loading: () => <div className="w-[400px] h-[600px] bg-gray-200 animate-pulse rounded-lg" />
  }
);

interface Chapter1PageFlipProps {
  onGetBook?: () => void;
  onShareChapter?: () => void;
}

const Chapter1PageFlip: React.FC<Chapter1PageFlipProps> = ({
  onGetBook,
  onShareChapter
}) => {
  const flipBook = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(10); // Set initial page count
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && flipBook.current) {
      // Ensure the book is initialized
      const pageFlip = flipBook.current.getPageFlip();
      if (pageFlip) {
        setTotalPages(pageFlip.getPageCount());
      }
    }
  }, [isClient]);

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
    if (flipBook.current) {
      const pageFlip = flipBook.current.getPageFlip();
      if (pageFlip) {
        const count = pageFlip.getPageCount();
        setTotalPages(count);
      }
    }
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[400px] h-[600px] bg-gray-200 animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Chapter 1: The Friction Paradox
          </h1>
          <p className="text-lg text-slate-600">
            From "AI and the Art of Productive Struggle"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={onGetBook}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Get Full Book
          </button>
          <button
            onClick={onShareChapter}
            className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share Chapter
          </button>
        </div>
      </div>

      {/* Book Container */}
      <div className="flex justify-center items-center">
        <div className="book-container relative">
          <HTMLFlipBook
            // @ts-ignore
            ref={flipBook}
            width={400}
            height={600}
            className="shadow-2xl"
            style={{ margin: '0 auto' }}
            startPage={0}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            onInit={onInit}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {/* Cover Page */}
            <PageFlipPage className="cover-page">
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
            </PageFlipPage>

            {/* Page 1 */}
            <PageFlipPage>
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
            </PageFlipPage>

            {/* Page 2 */}
            <PageFlipPage>
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
            </PageFlipPage>

            {/* Page 3 */}
            <PageFlipPage>
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
            </PageFlipPage>

            {/* Page 4 */}
            <PageFlipPage>
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
            </PageFlipPage>

            {/* Page 5 */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Science Behind Productive Struggle
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    Neuroscience research reveals why struggle is essential for learning:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Memory Consolidation:</strong> The effort of retrieval strengthens 
                      neural pathways more than passive review
                    </li>
                    <li>
                      <strong>Pattern Recognition:</strong> Struggling with problems helps the brain 
                      identify underlying structures and relationships
                    </li>
                    <li>
                      <strong>Metacognitive Development:</strong> Difficulty forces students to develop 
                      strategies for learning itself
                    </li>
                    <li>
                      <strong>Resilience Building:</strong> Overcoming challenges builds confidence 
                      and persistence
                    </li>
                  </ul>
                  <p className="mt-4">
                    When AI eliminates these struggles, it can inadvertently eliminate the learning itself.
                  </p>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 6 */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Friction Paradox in Action
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    The friction paradox manifests in countless ways across educational contexts:
                  </p>
                  
                  <div className="bg-amber-50 p-3 rounded-lg mb-3">
                    <h4 className="font-semibold text-amber-900 mb-1">Writing:</h4>
                    <p className="text-sm text-amber-800">
                      Students who rely on AI for essay writing often lose the ability to organize 
                      thoughts independently.
                    </p>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-lg mb-3">
                    <h4 className="font-semibold text-amber-900 mb-1">Mathematics:</h4>
                    <p className="text-sm text-amber-800">
                      Immediate access to step-by-step solutions prevents the development of 
                      problem-solving intuition.
                    </p>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-1">Programming:</h4>
                    <p className="text-sm text-amber-800">
                      Code completion tools can prevent novices from understanding fundamental 
                      programming concepts.
                    </p>
                  </div>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 7 */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Dependency Trap: How AI Creates Learned Helplessness
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    When students become accustomed to immediate AI assistance, they can develop 
                    what psychologists call "learned helplessness" – a state where they believe 
                    they cannot succeed without external support.
                  </p>
                  <p>
                    Dr. Maria Chen, a cognitive psychologist at Stanford, explains: "We're seeing 
                    students who won't even attempt problems without AI. They've internalized the 
                    belief that they need technological assistance for any intellectual task."
                  </p>
                  <p>
                    This dependency creates a vicious cycle:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 ml-4 text-sm">
                    <li>Students struggle with a problem</li>
                    <li>They immediately turn to AI for help</li>
                    <li>They get the answer without developing understanding</li>
                    <li>They face similar problems with even less confidence</li>
                    <li>Their dependency deepens</li>
                  </ol>
                </div>
              </div>
            </PageFlipPage>

            {/* Page 8 */}
            <PageFlipPage>
              <div className="h-full p-6 bg-white">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  The Productive Struggle Revolution
                </h3>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    The solution isn't to abandon AI in education – it's to fundamentally reimagine 
                    how we design and deploy it. This book introduces the Productive Struggle Framework, 
                    a revolutionary approach that transforms AI from a crutch into a catalyst for 
                    deeper learning.
                  </p>
                  <p>
                    Instead of eliminating friction, Productive Struggle AI:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provides scaffolding without eliminating challenge</li>
                    <li>Asks guiding questions instead of giving answers</li>
                    <li>Gradually reduces support as competence grows</li>
                    <li>Celebrates struggle as part of the learning process</li>
                  </ul>
                  <p className="mt-4 font-semibold text-blue-800">
                    The future of education isn't about making learning easier – it's about making 
                    struggle more productive.
                  </p>
                </div>
              </div>
            </PageFlipPage>

            {/* End Page */}
            <PageFlipPage className="end-page">
              <div className="h-full bg-gradient-to-br from-purple-900 to-blue-900 text-white p-8 flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl font-bold mb-6">Ready for More?</h2>
                <p className="text-lg mb-8 opacity-90">
                  This is just the beginning. Discover how to transform AI from a learning 
                  inhibitor into a learning accelerator.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={onGetBook}
                    className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get the Full Book
                  </button>
                  <p className="text-sm opacity-80">
                    Continue reading all 12 chapters of Productive Struggle
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
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>
        
        <span className="text-slate-700 font-medium">
          Page {currentPage + 1} of {totalPages}
        </span>
        
        <button 
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6 text-slate-700" />
        </button>
      </div>
    </div>
  );
};

export default Chapter1PageFlip;
