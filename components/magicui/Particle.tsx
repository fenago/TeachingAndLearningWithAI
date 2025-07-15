"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface ParticleProps {
  index: number;
  initialX: number;
  initialY: number;
  size: number;
  color: string;
  moveAmount: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  shouldReduceMotion: boolean;
}

const Particle: React.FC<ParticleProps> = ({
  index,
  initialX,
  initialY,
  size,
  color,
  moveAmount,
  mouseX,
  mouseY,
  shouldReduceMotion,
}) => {
  // Now these hooks are called at the component level, not in a loop
  const x = useTransform(
    mouseX,
    [0, 0.5, 1],
    [(initialX * 100 - moveAmount * 0.2), (initialX * 100), (initialX * 100 + moveAmount * 0.2)].map(x => `${x}%`)
  );
  
  const y = useTransform(
    mouseY,
    [0, 0.5, 1],
    [(initialY * 100 - moveAmount * 0.2), (initialY * 100), (initialY * 100 + moveAmount * 0.2)].map(y => `${y}%`)
  );
  
  const scale = useTransform(
    mouseX,
    [0, 0.5, 1],
    [0.95, 1, 1.05]
  );

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        left: x,
        top: y,
        scale,
        opacity: 0.8,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.6, 0.8, 0.6],
        scale: shouldReduceMotion ? 1 : [1, 1.05, 1],
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
};

export default Particle;
