'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroVideoDialog } from '@/components/magicui/HeroVideoDialog';
import { Sparkles, Code, Database, Mic, ChevronRight } from 'lucide-react';

type PromptType = 'amateur' | 'expert';

const tabs = [
  {
    id: 'meta-prompting',
    label: 'Meta-Prompting Mastery',
    icon: Sparkles,
    gradient: 'linear-gradient(to right, #8b5cf6, #6366f1)' // purple to indigo
  },
  {
    id: 'system-prompt',
    label: 'System Prompt Engineering',
    icon: Code,
    gradient: 'linear-gradient(to right, #3b82f6, #06b6d4)' // blue to cyan
  },
  {
    id: 'custom-learning',
    label: 'Custom Learning Environments',
    icon: Database,
    gradient: 'linear-gradient(to right, #10b981, #059669)' // green to emerald
  },
  {
    id: 'multi-modal',
    label: 'Multi-Modal Learning',
    icon: Mic,
    gradient: 'linear-gradient(to right, #f97316, #ef4444)' // orange to red
  }
];

export default function Solution() {
  const [activeTab, setActiveTab] = useState('meta-prompting');

  return (
    <section id="solution" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Inside 'Productive Struggle': The Complete AI Education Methodology
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            This isn't just another AI guide. It's a complete transformation system based on 15+ years of research, packed into 10 comprehensive chapters that will revolutionize how you think about AI in education.
          </p>
        </motion.div>

        {/* Hero Video Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <HeroVideoDialog 
            thumbnailSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop"
            thumbnailAlt="Productive Friction Revolution"
          >
            {/* Tabs container */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              {/* Tab navigation */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all
                        ${activeTab === tab.id 
                          ? 'bg-gradient-to-r text-white shadow-lg -mb-px border-b-2 border-white dark:border-gray-800' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }
                      `}
                      style={activeTab === tab.id ? {
                        background: tab.gradient
                      } : {}}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'meta-prompting' && <MetaPromptingTab />}
                  {activeTab === 'system-prompt' && <SystemPromptTab />}
                  {activeTab === 'custom-learning' && <CustomLearningTab />}
                  {activeTab === 'multi-modal' && <MultiModalTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </HeroVideoDialog>
        </motion.div>
      </div>
    </section>
  );
}

// Tab content components
function MetaPromptingTab() {
  const [currentPrompt, setCurrentPrompt] = useState<PromptType>('amateur');
  const [isTyping, setIsTyping] = useState(false);

  const prompts = {
    amateur: "Explain photosynthesis",
    expert: "Acting as a biology professor specializing in plant physiology, explain the light-dependent and light-independent reactions of photosynthesis, including the role of photosystems I and II, the electron transport chain, and the Calvin cycle. Use analogies suitable for undergraduate students."
  };

  const responses = {
    amateur: "Photosynthesis is the process by which plants make food using sunlight, water, and carbon dioxide.",
    expert: "Photosynthesis consists of two major stages that work in concert to convert light energy into chemical energy..."
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Summon expert wisdom instead of generic responses
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Transform your AI from a simple Q&A bot into a panel of expert advisors
        </p>
      </div>

      {/* Interactive prompt builder */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Choose Prompt Style:</h4>
          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentPrompt('amateur');
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 1000);
              }}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                currentPrompt === 'amateur' 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="font-medium mb-1">Amateur Prompt</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                "{prompts.amateur}"
              </div>
            </button>

            <button
              onClick={() => {
                setCurrentPrompt('expert');
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 2000);
              }}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                currentPrompt === 'expert' 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="font-medium mb-1 flex items-center gap-2">
                Expert Prompt
                <span className="text-xs px-2 py-1 bg-purple-500 text-white rounded">RECOMMENDED</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                "{prompts.expert}"
              </div>
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">AI Response:</h4>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 min-h-[200px]">
            {isTyping ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex gap-1"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                </motion.div>
                <span className="text-sm text-gray-500">AI is thinking...</span>
              </div>
            ) : (
              <p className="text-sm">{responses[currentPrompt as PromptType]}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
        <ChevronRight className="w-4 h-4" />
        Learn how to craft expert-level prompts that unlock AI's full potential
      </div>
    </div>
  );
}

function SystemPromptTab() {
  const [personality, setPersonality] = useState(50);
  
  const getPersonalityStyle = () => {
    if (personality < 33) return { name: 'Strict Mentor', emoji: '👨‍🏫', color: 'text-red-500' };
    if (personality < 66) return { name: 'Balanced Guide', emoji: '🧘', color: 'text-blue-500' };
    return { name: 'Encouraging Coach', emoji: '🌟', color: 'text-green-500' };
  };

  const style = getPersonalityStyle();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-500" />
          Create AI tutors with academic guardrails
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Design AI personalities that challenge students while maintaining pedagogical integrity
        </p>
      </div>

      {/* Personality slider */}
      <div className="space-y-4">
        <h4 className="font-semibold">AI Teaching Style:</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Strict</span>
            <span className={`text-2xl ${style.color}`}>{style.emoji}</span>
            <span className="text-sm text-gray-600">Encouraging</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={personality}
            onChange={(e) => setPersonality(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <p className={`text-center font-medium ${style.color}`}>{style.name}</p>
        </div>
      </div>

      {/* Example conversations */}
      <div className="space-y-4">
        <h4 className="font-semibold">Classroom Conversation Example:</h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm">S</div>
            <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm">Can you just give me the answer to this calculus problem?</p>
            </div>
          </div>
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className={`w-8 h-8 ${personality < 33 ? 'bg-red-500' : personality < 66 ? 'bg-blue-500' : 'bg-green-500'} rounded-full flex items-center justify-center text-white text-sm`}>
              AI
            </div>
            <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm">
                {personality < 33 
                  ? "I won't provide direct answers. Show me your work first, and I'll guide you through your mistakes."
                  : personality < 66
                  ? "Let's work through this together. What have you tried so far?"
                  : "I'm here to help! Let's start with what you understand, and we'll build from there."
                }
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CustomLearningTab() {
  const [knowledgeExpanded, setKnowledgeExpanded] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Database className="w-6 h-6 text-green-500" />
          AI that knows only what you teach it
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create focused learning environments with curriculum-aligned AI responses
        </p>
      </div>

      {/* RAG visualization */}
      <div className="space-y-4">
        <h4 className="font-semibold">Knowledge Boundary Demonstration:</h4>
        
        <motion.div 
          className="relative p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg"
          animate={{ scale: knowledgeExpanded ? 1.02 : 1 }}
        >
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
              <Database className="w-4 h-4 text-green-500" />
              <span className="font-medium">Curriculum Database</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {['Biology 101', 'Chemistry Basics', 'Physics Intro'].map((subject) => (
              <div key={subject} className="p-2 bg-white/80 dark:bg-gray-800/80 rounded text-center text-sm">
                {subject}
              </div>
            ))}
          </div>

          <button
            onClick={() => setKnowledgeExpanded(!knowledgeExpanded)}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {knowledgeExpanded ? 'Hide' : 'Show'} Knowledge Boundaries
          </button>

          <AnimatePresence>
            {knowledgeExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2"
              >
                <div className="p-3 bg-white/80 dark:bg-gray-800/80 rounded">
                  <p className="text-sm"><span className="text-green-600">✓</span> "Explain mitosis" - <em>Within curriculum scope</em></p>
                </div>
                <div className="p-3 bg-white/80 dark:bg-gray-800/80 rounded">
                  <p className="text-sm"><span className="text-red-600">✗</span> "Latest AI research papers" - <em>Outside curriculum scope</em></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function MultiModalTab() {
  const [activeMode, setActiveMode] = useState('text');
  const [engagement, setEngagement] = useState(0);

  // Simulate engagement counting up
  useEffect(() => {
    const timer = setInterval(() => {
      setEngagement(prev => prev < 87 ? prev + 1 : prev);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Mic className="w-6 h-6 text-orange-500" />
          When AI speaks, sees, and understands like you do
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Engage every type of learner with multi-sensory AI interactions
        </p>
      </div>

      {/* Mode selector */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { id: 'text', label: 'Text', icon: '📝' },
          { id: 'voice', label: 'Voice', icon: '🎙️' },
          { id: 'visual', label: 'Visual', icon: '👁️' }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeMode === mode.id
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="text-2xl mb-1">{mode.icon}</div>
            <div className="font-medium">{mode.label}</div>
          </button>
        ))}
      </div>

      {/* Integration showcase */}
      <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg">
        <h4 className="font-semibold mb-4">Active Learning Mode: {activeMode.toUpperCase()}</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg">
            <span className="font-medium">Student Engagement</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${engagement}%` }}
                />
              </div>
              <span className="font-bold text-orange-600">{engagement}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white/80 dark:bg-gray-800/80 rounded">
              <p className="text-gray-600 dark:text-gray-400">Response Time</p>
              <p className="text-xl font-bold">2.3s</p>
            </div>
            <div className="p-3 bg-white/80 dark:bg-gray-800/80 rounded">
              <p className="text-gray-600 dark:text-gray-400">Comprehension</p>
              <p className="text-xl font-bold">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
