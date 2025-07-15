"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  speed?: number;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = "left",
  pauseOnHover = true,
  speed = 20,
  className = "",
}) => {
  const marqueeVariants = {
    animate: {
      x: direction === "left" ? [0, -1000] : [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 1000 / speed,
          ease: "linear" as const,
        },
      },
    },
  };

  return (
    <div
      className={`flex overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <motion.div
        className="flex flex-nowrap"
        variants={marqueeVariants}
        animate="animate"
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {/* Duplicate items to create seamless loop effect */}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee;
