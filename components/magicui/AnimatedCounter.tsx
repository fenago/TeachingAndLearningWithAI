"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  formatter?: (value: number) => string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  formatter = (value: number) => Math.floor(value).toString(),
  className = "",
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let startTimestamp: number;
    let animationFrameId: number;
    let completed = false;

    // Create the animation
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Apply easing for a more natural counting effect
      // Ease out cubic: progress starts fast and slows down at the end
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.min(easeOutCubic * end, end));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else if (!completed) {
        completed = true;
        setCount(end); // Ensure we end exactly at the target number
      }
    };

    // Trigger the animation when in view
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
    
    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, controls]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
    >
      {prefix}{formatter(count)}{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
