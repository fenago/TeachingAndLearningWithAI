"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LazyLoadedComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
}

const LazyLoadedComponent: React.FC<LazyLoadedComponentProps> = ({
  children,
  fallback = null,
  threshold = 0.1
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRef, setIntersectionRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!intersectionRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "100px", // Load a bit before it comes into view
        threshold
      }
    );

    observer.observe(intersectionRef);
    return () => observer.disconnect();
  }, [intersectionRef, threshold]);

  return (
    <div ref={setIntersectionRef} className="w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntersecting ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {isIntersecting ? children : fallback}
      </motion.div>
    </div>
  );
};

export default LazyLoadedComponent;
