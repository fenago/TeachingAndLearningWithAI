"use client";

import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  return (
    <motion.div
      className="font-bold text-lg bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
      style={{ backgroundSize: '200% 200%' }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      LearningScience.ai
    </motion.div>
  );
};

export default AnimatedLogo;
