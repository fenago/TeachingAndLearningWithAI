'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BentoGridItem } from '@/components/magicui/BentoGrid';

const DependencyTrapCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const beforeSample = {
    title: "Before AI Assistance",
    content: "I think Romeo loved Juliet because she was different from other girls. Their families fought a lot which made it hard for them to be together. The story shows that love can be really strong even when people try to stop it.",
    quality: "Original thought, personal voice"
  };
  
  const afterSample = {
    title: "After 6 Months of AI",
    content: "The thematic exploration of forbidden love in Romeo and Juliet exemplifies the quintessential conflict between individual desire and societal constraints, ultimately demonstrating the tragic consequences of familial discord.",
    quality: "Generic, no personal insight"
  };

  return (
    <BentoGridItem
      className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20"
      title={
        <span className="flex items-center gap-2">
          ⚠️ The Dependency Trap
        </span>
      }
    >
      <div className="mt-4 space-y-4">
        <p className="text-base leading-relaxed">
          "Students can access any answer but can't generate original thoughts"
        </p>
        
        {/* Flip card container */}
        <div 
          className="relative h-48 cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front - Before */}
            <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
              <div className="h-full p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border-2 border-green-400">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  {beforeSample.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                  "{beforeSample.content}"
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 absolute bottom-2 left-4">
                  ✓ {beforeSample.quality}
                </p>
              </div>
            </div>
            
            {/* Back - After */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ transform: "rotateY(180deg)", backfaceVisibility: 'hidden' }}
            >
              <div className="h-full p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border-2 border-red-400">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  {afterSample.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                  "{afterSample.content}"
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 absolute bottom-2 left-4">
                  ✗ {afterSample.quality}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Click to see the transformation
        </p>
        
        {/* Warning indicator */}
        <motion.div 
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-lg">⚠️</span>
          <span className="text-xs font-medium">Critical thinking skills at risk</span>
        </motion.div>
      </div>
    </BentoGridItem>
  );
};

export default DependencyTrapCard;
