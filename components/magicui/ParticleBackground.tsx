"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import Particle from "./Particle";

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
  style?: React.CSSProperties;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = "",
  particleCount = 30,
  interactive = true,
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const shouldReduceMotion = useReducedMotion();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Handle mouse movement
  useEffect(() => {
    if (!interactive || shouldReduceMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
      const x = (touch.clientX - left) / width;
      const y = (touch.clientY - top) / height;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY, interactive, shouldReduceMotion]);

  // Create particles data (without hooks)
  const particlesData = Array.from({ length: shouldReduceMotion ? Math.min(particleCount, 15) : particleCount }).map((_, i) => {
    // Generate a more even distribution of particles
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = Math.random() * 0.4 + 0.1; // Between 10% and 50% from center
    
    // Convert polar coordinates to cartesian for initial position
    const initialX = 0.5 + Math.cos(angle) * radius;
    const initialY = 0.5 + Math.sin(angle) * radius;
    
    // Calculate size - smaller particles move more
    const size = Math.random() * 40 + (i % 3 === 0 ? 30 : 10); // Larger variation in sizes
    
    // Movement amount based on inverse of size (smaller particles move more)
    const moveAmount = 50 / size * (shouldReduceMotion ? 0.3 : 1);
    
    // Color based on position in array
    const colorIndex = i % 5;
    const colors = ["#667eea", "#764ba2", "#4ecdc4", "#667eea", "#51cf66"];
    const color = colors[colorIndex];
    
    return { initialX, initialY, size, color, moveAmount, index: i };
  });

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
        zIndex: 0,
        ...style
      }}
      aria-hidden="true"
    >
      {particlesData.map((particle) => (
        <Particle
          key={particle.index}
          index={particle.index}
          initialX={particle.initialX}
          initialY={particle.initialY}
          size={particle.size}
          color={particle.color}
          moveAmount={particle.moveAmount}
          mouseX={mouseX}
          mouseY={mouseY}
          shouldReduceMotion={shouldReduceMotion || false}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
