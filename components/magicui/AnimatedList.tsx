'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AnimatedListItem {
  id: string;
  title: string;
  subtitle?: string;
  transformation?: string;
  value?: string;
  preview?: string;
  keyInsight?: string;
  icon?: React.ReactNode;
  color?: string;
}

interface AnimatedListProps {
  items: AnimatedListItem[];
  className?: string;
}

export function AnimatedList({ items, className = '' }: AnimatedListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    if (expandedId !== id) {
      // Mark as read after a delay
      setTimeout(() => {
        setReadProgress(prev => new Set(prev).add(id));
      }, 2000);
    }
  };

  const completionPercentage = Math.round((readProgress.size / items.length) * 100);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Reading Progress
          </span>
          <span className="text-sm font-bold text-purple-600">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* List items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleExpand(item.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                {item.icon && (
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-2xl"
                  >
                    {item.icon}
                  </motion.div>
                )}
                <div className="text-left">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <motion.span
                      whileHover={{
                        color: "#8b5cf6",
                        transition: { duration: 0.2 }
                      }}
                      className="cursor-pointer"
                    >
                      {item.title}
                    </motion.span>
                    {readProgress.has(item.id) && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded">
                        Read
                      </span>
                    )}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="px-6 py-4 space-y-3"
                  >
                    {item.transformation && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Transformation:
                        </h4>
                        <p className="text-sm font-medium">{item.transformation}</p>
                      </div>
                    )}
                    {item.value && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Value to You:
                        </h4>
                        <p className="text-sm">{item.value}</p>
                      </div>
                    )}
                    {item.preview && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Preview:
                        </h4>
                        <p className="text-sm">{item.preview}</p>
                      </div>
                    )}
                    {item.keyInsight && (
                      <motion.div
                        className="p-4 rounded-lg cursor-pointer"
                        style={{
                          background: item.color || 'linear-gradient(to right, #8b5cf6, #6366f1)'
                        }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.h4 
                          className="font-medium text-sm text-white/90 mb-1"
                          whileHover={{
                            color: "#ffffff",
                            transition: { duration: 0.2 }
                          }}
                        >
                          Key Insight:
                        </motion.h4>
                        <motion.p 
                          className="text-white font-medium"
                          whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.2 }
                          }}
                        >
                          "{item.keyInsight}"
                        </motion.p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
