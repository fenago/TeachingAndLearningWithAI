'use client';

import { AnimatedList } from '@/components/magicui/AnimatedList';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Brain, 
  Shield, 
  Database, 
  Mic, 
  Monitor, 
  Image, 
  Sparkles, 
  MessageSquare, 
  BookOpen 
} from 'lucide-react';

const chapters = [
  {
    id: 'productive-friction',
    title: 'The Productive Friction Revolution',
    transformation: 'From fearing AI will make students lazy → To using AI to make students think harder',
    value: 'Discover the research-backed framework that transforms AI from a learning crutch into a learning amplifier. No more guilt about using AI—just clarity about using it right.',
    keyInsight: 'AI\'s superpower is removing friction, but friction is where learning lives. The very feature that makes AI most appealing—its ability to eliminate struggle—is precisely what makes it most dangerous to learning.',
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    color: 'linear-gradient(to right, #8b5cf6, #6366f1)'
  },
  {
    id: 'meta-prompting',
    title: 'Meta-Prompting - Summoning the Wisdom of the Sages',
    transformation: 'From mediocre AI responses → To channeling decades of expert wisdom',
    value: 'Stop wasting time with amateur AI interactions and start accessing master-level expertise in any field. Transform from basic answers to professional-grade guidance.',
    keyInsight: 'Most people use AI wrong because they think their first thought is their best thought, when in reality, their first thought should be asking experts what they would think.',
    icon: <Brain className="w-6 h-6 text-indigo-500" />,
    color: 'linear-gradient(to right, #6366f1, #4f46e5)'
  },
  {
    id: 'system-prompts',
    title: 'System Prompts - Engineering AI Personalities',
    transformation: 'From fighting AI\'s generic responses → To engineering specialized AI tutors',
    value: 'Stop accepting AI\'s default settings that work against education. Create custom AI personalities that consistently promote learning over answer-seeking.',
    keyInsight: 'Most people use AI wrong because they accept default settings designed for general conversation instead of engineering specialized personalities designed for educational excellence.',
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    color: 'linear-gradient(to right, #3b82f6, #2563eb)'
  },
  {
    id: 'custom-learning',
    title: 'Custom Learning Environments - Your Knowledge, Your AI',
    transformation: 'From AI that distracts with vast knowledge → To focused AI that reinforces your curriculum',
    value: 'Eliminate chaos from irrelevant information. Create AI that reinforces your teaching instead of competing with it.',
    keyInsight: 'Most people use AI wrong because they give students access to all human knowledge when what students need is access to the right knowledge, delivered in the right way, at the right time.',
    icon: <Database className="w-6 h-6 text-green-500" />,
    color: 'linear-gradient(to right, #10b981, #059669)'
  },
  {
    id: 'multi-modal',
    title: 'Multi-Modal Learning - When AI Speaks Your Language',
    transformation: 'From text-only AI interactions → To natural speech and multi-sensory engagement',
    value: 'Unlock the potential of auditory and kinesthetic learners. Transform silent AI use into dynamic conversations that feel natural and energizing.',
    keyInsight: 'Most people use AI wrong because they limit themselves to typing and reading when the human brain is designed to learn through speaking, listening, and multi-sensory engagement.',
    icon: <Mic className="w-6 h-6 text-orange-500" />,
    color: 'linear-gradient(to right, #f97316, #ea580c)'
  },
  {
    id: 'screen-sharing',
    title: 'Screen Sharing Intelligence - When AI Sees What You See',
    transformation: 'From AI that only responds to questions → To AI that analyzes actual student work',
    value: 'Move beyond generic tutoring to diagnostic AI that sees exactly where understanding breaks down. Get detailed work analysis that would take hours manually.',
    keyInsight: 'Most people use AI wrong because they limit AI to providing solutions when what students need is AI that can see their actual work and diagnose their actual thinking process.',
    icon: <Monitor className="w-6 h-6 text-cyan-500" />,
    color: 'linear-gradient(to right, #06b6d4, #0891b2)'
  },
  {
    id: 'visual-intelligence',
    title: 'Visual Intelligence - When AI Creates What You Can\'t Imagine',
    transformation: 'From struggling to explain complex concepts → To instant visualizations that make anything comprehensible',
    value: 'Stop being limited by drawing skills. Create professional-quality visualizations for any concept. Transform abstract ideas into concrete visual understanding.',
    keyInsight: 'Most people use AI wrong because they limit themselves to text explanations when they could be creating powerful visualizations that make any concept instantly comprehensible.',
    icon: <Image className="w-6 h-6 text-pink-500" />,
    color: 'linear-gradient(to right, #ec4899, #db2777)'
  },
  {
    id: 'agentic-content',
    title: 'Agentic Content Creation - When AI Becomes Your Teaching Partner',
    transformation: 'From AI suggestions that create more work → To AI that delivers complete teaching materials',
    value: 'Stop being an AI assistant manager. Become an educational director. Receive ready-to-use lesson plans and materials that require zero additional work.',
    keyInsight: 'Most people use AI wrong because they get responses that require manual implementation when they could be directing AI to autonomously research, create, and deliver complete solutions.',
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    color: 'linear-gradient(to right, #a855f7, #9333ea)'
  },
  {
    id: 'conversational-apps',
    title: 'Conversational App Development - English as the Hottest Programming Language',
    transformation: 'From being limited by lack of programming skills → To building custom educational apps with plain English',
    value: 'Transform from technology consumer to creator. Every teaching idea becomes a working application without learning to code. Your vision becomes your programming language.',
    keyInsight: 'Most people use AI wrong because they limit themselves to asking questions and receiving text answers when they could be describing applications and receiving working software.',
    icon: <MessageSquare className="w-6 h-6 text-teal-500" />,
    color: 'linear-gradient(to right, #14b8a6, #0d9488)'
  },
  {
    id: 'learningscience-ai',
    title: 'LearningScience.ai - The Purpose-Built Educational AI Revolution',
    transformation: 'From adapting general-purpose AI tools → To using AI designed specifically for education',
    value: 'Stop being an AI tool manager and return to being an educator. Work with AI that understands learning science and promotes productive struggle from day one.',
    keyInsight: 'Most people use AI wrong because they assume general-purpose tools can be adapted for education, when what learning requires is AI designed specifically to make students think harder, not just get answers faster.',
    icon: <BookOpen className="w-6 h-6 text-amber-500" />,
    color: 'linear-gradient(to right, #f59e0b, #d97706)'
  }
];

export default function ChapterShowcase() {
  return (
    <section id="chapters" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            {['Inside', 'the', 'Book:', 'Ten', 'Transformational', 'Chapters'].map((word, i) => (
              <motion.span 
                key={i} 
                className="inline-block mr-[0.3em]" 
                whileHover={{ 
                  color: "#8b5cf6", 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover what awaits you in{' '}
            <motion.span 
              className="font-semibold text-gray-800 dark:text-gray-200"
              whileHover={{ 
                color: "#8b5cf6", 
                transition: { duration: 0.2 }
              }}
            >
              "AI and the Art of Productive Struggle"
            </motion.span>
            —from theoretical foundations to practical classroom implementation
          </p>
        </motion.div>

        {/* Animated chapter list */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <AnimatedList items={chapters} />
        </motion.div>
      </div>
    </section>
  );
}
