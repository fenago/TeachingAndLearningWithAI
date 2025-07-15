'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BentoGridItem } from '@/components/magicui/BentoGrid';

const FrictionParadoxCard = () => {
  const [frictionLevel, setFrictionLevel] = useState(50);
  
  // Calculate learning effectiveness based on friction
  // Peak learning happens at moderate friction (around 60-70%)
  const learningEffectiveness = Math.round(
    frictionLevel <= 60 
      ? frictionLevel * 1.5 
      : 90 - (frictionLevel - 60) * 0.75
  );
  const ease = 100 - frictionLevel;

  return (
    <BentoGridItem
      className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20"
      title={
        <span className="flex items-center gap-2">
          ⚡ The Friction Paradox
        </span>
      }
      description={
        <div className="space-y-4">
          <p className="text-base text-gray-700 dark:text-gray-300">
            "AI removes friction, but friction is where learning lives"
          </p>
          
          <div className="space-y-3">
            <label className="text-sm font-medium block">
              Adjust Friction Level: {frictionLevel}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={frictionLevel}
              onChange={(e) => setFrictionLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 text-center"
              animate={{ scale: 1 + (ease / 200) }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-xs text-gray-600 dark:text-gray-400">Ease of Use</p>
              <p className="text-2xl font-bold text-green-600">{ease}%</p>
            </motion.div>
            
            <motion.div 
              className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 text-center"
              animate={{ scale: 1 + (learningEffectiveness / 200) }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-xs text-gray-600 dark:text-gray-400">Learning</p>
              <p className="text-2xl font-bold text-blue-600">{learningEffectiveness}%</p>
            </motion.div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
            Notice how learning effectiveness increases with productive friction
          </p>
        </div>
      }
    />
  );
};

export default FrictionParadoxCard;
