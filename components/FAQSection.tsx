'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  relatedIds?: string[];
}

const faqData: FAQItem[] = [
  {
    id: 'different',
    question: 'How is this different from other AI education books?',
    answer: 'Unlike books that simply teach you to use AI tools, we focus on the science of learning itself. Our approach maintains productive friction—the challenges that create real learning—while leveraging AI to enhance, not replace, critical thinking. We\'re not about shortcuts; we\'re about transformation.',
    relatedIds: ['results', 'curriculum']
  },
  {
    id: 'technical',
    question: 'Can I implement without technical expertise?',
    answer: 'Absolutely! Our frameworks are designed for educators, not engineers. You\'ll learn to use AI through simple, proven templates and step-by-step guides. If you can write an email, you can implement our methods. No coding or technical background required.',
    relatedIds: ['support', 'curriculum']
  },
  {
    id: 'curriculum',
    question: 'Will this work with my existing curriculum?',
    answer: 'Yes! Our methods enhance your existing curriculum rather than replacing it. Whether you teach elementary math or college-level physics, our AI integration strategies adapt to your subject matter and teaching style. We show you how to augment what already works.',
    relatedIds: ['different', 'restrictions']
  },
  {
    id: 'restrictions',
    question: 'What if my district restricts AI use?',
    answer: 'We address this directly with a full chapter on navigating institutional policies. You\'ll learn compliant implementation strategies, how to advocate for responsible AI use, and alternative approaches that work within restrictions while preparing for inevitable policy changes.',
    relatedIds: ['curriculum', 'support']
  },
  {
    id: 'results',
    question: 'How quickly will I see results?',
    answer: 'Most educators report immediate time savings (within days) and see student engagement improvements within 2-3 weeks. Full transformation typically occurs over a semester as you implement more advanced strategies. Our phased approach ensures quick wins while building toward lasting change.',
    relatedIds: ['different', 'support']
  },
  {
    id: 'support',
    question: 'Is there ongoing support after purchase?',
    answer: 'Yes! Your purchase includes access to our private community of 10,000+ educators sharing strategies and solutions. Digital and physical purchases include 90 days of email support. Workshop attendees receive 30 days of direct implementation support with Dr. Lee\'s team.',
    relatedIds: ['technical', 'refund']
  },
  {
    id: 'refund',
    question: 'Can I get a refund if it doesn\'t work?',
    answer: 'We offer a 30-day money-back guarantee for all book purchases. If you\'ve genuinely tried our methods and don\'t see improvement, we\'ll refund your purchase—no questions asked. Workshop refunds available up to 7 days before the event date.',
    relatedIds: ['support', 'results']
  },
  {
    id: 'group',
    question: 'Are there group discounts for workshops?',
    answer: 'Yes! We offer significant discounts for schools and districts. Groups of 5-10 receive 15% off, 11-20 receive 25% off, and 20+ receive custom pricing. We can also arrange private workshops for your institution. Contact workshops@learningscience.ai for details.',
    relatedIds: ['support', 'curriculum']
  }
];

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    
    const query = searchQuery.toLowerCase();
    return faqData.filter(
      item =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getRelatedQuestions = (currentId: string) => {
    const current = faqData.find(item => item.id === currentId);
    if (!current?.relatedIds) return [];
    return faqData.filter(item => current.relatedIds?.includes(item.id));
  };

  return (
    <section id="faq" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">Your Questions Answered</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about transforming your teaching with AI
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <h3 className="text-lg font-semibold pr-4">
                        {highlightText(item.question, searchQuery)}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedItems.has(item.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {expandedItems.has(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-600 dark:text-gray-400 pl-8"
                          >
                            {highlightText(item.answer, searchQuery)}
                          </motion.p>

                          {/* Related questions */}
                          {hoveredItem === item.id && getRelatedQuestions(item.id).length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="mt-4 pl-8"
                            >
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Related questions:
                              </p>
                              <div className="space-y-1">
                                {getRelatedQuestions(item.id).map(related => (
                                  <button
                                    key={related.id}
                                    onClick={() => {
                                      toggleExpanded(related.id);
                                      // Scroll to the related question
                                      setTimeout(() => {
                                        document.getElementById(related.id)?.scrollIntoView({
                                          behavior: 'smooth',
                                          block: 'center'
                                        });
                                      }, 100);
                                    }}
                                    className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors block"
                                  >
                                    → {related.question}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 dark:text-gray-400">
                  No questions found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl"
        >
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our team is here to help you succeed
          </p>
          <a
            href="mailto:support@learningscience.ai"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
