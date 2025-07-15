'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BentoGridItem } from '@/components/magicui/BentoGrid';

const SarahStoryCard = () => {
  const [isHeartbeating, setIsHeartbeating] = useState(true);
  
  // Diary entry excerpt
  const diaryEntry = `"3:17 AM - Still awake. ChatGPT wrote my essay in 30 seconds. 
  It's perfect. Too perfect. I learned nothing. 
  I feel like a fraud. This isn't me."`;

  return (
    <BentoGridItem
      className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20"
      title={
        <span className="flex items-center gap-2">
          😰 Sarah's 3 AM Struggle
        </span>
      }
    >
      <div className="mt-4 space-y-4">
        {/* Avatar with stress indicator */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
              S
            </div>
            {/* Heartbeat animation */}
            <AnimatePresence>
              {isHeartbeating && (
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-red-400"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.5, 0] 
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              High School Senior
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                Stress Level: High
              </span>
              <motion.span 
                className="text-red-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.span>
            </div>
          </div>
        </div>
        
        {/* Diary entry */}
        <motion.div 
          className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border-l-4 border-rose-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
            {diaryEntry}
          </p>
          <p className="text-xs text-gray-500 mt-2">- Diary Entry #47</p>
        </motion.div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400">
          One of thousands experiencing the same crisis every night
        </p>
      </div>
    </BentoGridItem>
  );
};

export default SarahStoryCard;
