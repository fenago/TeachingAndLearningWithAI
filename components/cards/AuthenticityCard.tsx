'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BentoGridItem } from '@/components/magicui/BentoGrid';

const AuthenticityCard = () => {
  const [confusionLevel, setConfusionLevel] = useState(0);
  
  // Increase confusion over time
  useEffect(() => {
    const interval = setInterval(() => {
      setConfusionLevel((prev) => (prev + 1) % 101);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  // Questions that represent the identity crisis
  const questions = [
    "Is this my work?",
    "Am I learning?",
    "Who am I becoming?",
    "What's my value?"
  ];

  return (
    <BentoGridItem
      className="lg:col-span-2 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20"
      title={
        <span className="flex items-center gap-2">
          🆘 The Authenticity Crisis
        </span>
      }
    >
      <div className="mt-4 space-y-4">
        <p className="text-base leading-relaxed">
          "When every submission is AI-enhanced, how do we measure human growth?"
        </p>
        
        {/* Confusion visualization */}
        <div className="relative h-32 rounded-lg bg-black/5 dark:bg-white/5 overflow-hidden flex items-center justify-center">
          <div className="text-center space-y-2">
            {/* Central confusion indicator */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-5xl">😵‍💫</span>
            </motion.div>
            
            {/* Rotating questions */}
            <motion.p
              className="text-sm font-medium text-gray-600 dark:text-gray-400"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {questions[Math.floor((confusionLevel / 25) % questions.length)]}
            </motion.p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-red-100/50 dark:bg-red-900/20">
            <p className="text-2xl font-bold text-red-600">73%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Students report identity confusion
            </p>
          </div>
          <div className="p-3 rounded-lg bg-orange-100/50 dark:bg-orange-900/20">
            <p className="text-2xl font-bold text-orange-600">89%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Can't distinguish AI from peer work
            </p>
          </div>
        </div>
        
        <motion.p 
          className="text-xs text-center text-red-600 dark:text-red-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CRISIS MODE: Identity formation compromised
        </motion.p>
      </div>
    </BentoGridItem>
  );
};

export default AuthenticityCard;
