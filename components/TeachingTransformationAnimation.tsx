"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TeachingTransformationAnimation = () => {
  const prefersReducedMotion = useReducedMotion();
  
  // Use simpler animations when reduced motion is preferred
  const iconVariants = {
    hidden: { opacity: prefersReducedMotion ? 0.5 : 0, scale: prefersReducedMotion ? 0.95 : 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.5 }
    },
    hover: prefersReducedMotion ? {
      opacity: 0.9
    } : { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Background gradient with animated glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] overflow-hidden"
        initial={{ opacity: 0.8 }}
        animate={{ 
          opacity: [0.8, 0.9, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute -inset-[100px] bg-[#667eea] rounded-full blur-[100px] opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
        {/* Traditional to AI-enhanced teaching transition */}
        <div className="flex flex-col items-center mb-8 w-full">
          <motion.h3 
            className="text-white text-xl font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Teaching Transformation
          </motion.h3>
          
          <div className="flex items-center justify-between w-full max-w-md">
            {/* Traditional Teaching */}
            <motion.div 
              className="flex flex-col items-center"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: 0.5 }}
            >
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-white text-sm">Traditional</p>
            </motion.div>

            {/* Arrow animation */}
            <motion.div
              className="w-24 h-px bg-white/50"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.7 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <motion.div 
                className="h-2 w-2 bg-white rounded-full relative -top-[3px]"
                animate={{ 
                  x: [0, 95, 95],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.div>

            {/* AI-enhanced teaching */}
            <motion.div 
              className="flex flex-col items-center"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: 1 }}
            >
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <motion.div
                  className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-white/80 flex items-center justify-center text-[#764ba2] text-xs font-bold"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  AI
                </motion.div>
              </div>
              <p className="text-white text-sm">AI-Enhanced</p>
            </motion.div>
          </div>
        </div>

        {/* Brain Activity Visualization */}
        <motion.div 
          className="w-full mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <h4 className="text-white text-sm font-medium text-center mb-2">Student Brain Activity</h4>
          <div className="w-full h-16 bg-white/10 rounded-lg overflow-hidden relative">
            {/* Productive struggle brain wave animation */}
            <svg viewBox="0 0 400 50" className="absolute inset-0 w-full h-full">
              <motion.path
                d="M0,25 C50,10 60,40 70,25 C80,10 90,40 100,25 C110,10 120,40 130,25 C140,10 150,40 160,25 C170,10 180,40 190,25 C200,10 210,40 220,25 C230,10 240,40 250,25 C260,10 270,40 280,25 C290,10 300,40 310,25 C320,10 330,40 340,25 C350,10 360,40 370,25 C380,10 390,40 400,25"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                }}
                transition={{ 
                  duration: 2,
                  delay: 1.7
                }}
              />
              
              {/* Animated dot that follows the path */}
              <motion.circle 
                cx="0" 
                cy="0" 
                r="3" 
                fill="#51cf66"
                animate={{
                  cx: [0, 400],
                  cy: [25, 10, 40, 25, 10, 40, 25, 10, 40, 25, 10, 40, 25, 10, 40, 25]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Transformation Timeline */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <h4 className="text-white text-sm font-medium text-center mb-2">Educator Transformation</h4>
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white text-xs opacity-80">Overwhelmed</p>
            </motion.div>
            
            <motion.div 
              className="w-full h-1 bg-white/20 mx-1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            />
            
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-white text-xs opacity-80">Learning</p>
            </motion.div>
            
            <motion.div 
              className="w-full h-1 bg-white/20 mx-1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3, duration: 1 }}
            />
            
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white text-xs">Empowered</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeachingTransformationAnimation;
