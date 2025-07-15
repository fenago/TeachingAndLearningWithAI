"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import ParticleBackground from "./magicui/ParticleBackground";
import AnimatedCounter from "./magicui/AnimatedCounter";
import TypewriterText from "./magicui/TypewriterText";
import Marquee from "./magicui/Marquee";
import UniversityLogo from "./UniversityLogo";
import LazyLoadedComponent from "./LazyLoadedComponent";

// Dynamically import the TeachingTransformationAnimation for better performance
const TeachingTransformationAnimation = dynamic(
  () => import('./TeachingTransformationAnimation'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#667eea]/30 to-[#764ba2]/30 rounded-2xl">
        <div className="text-center p-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm opacity-70">Loading visualization...</p>
        </div>
      </div>
    )
  }
);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(heroRef, { once: false, amount: 0.2 });
  const isCounterInView = useInView(counterRef, { once: true, amount: 0.5 });
  
  // Track scroll position for parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Split headline into words for staggered animation
  const headline = "The Book That's Transforming How Educators Use AI";
  const headlineWords = headline.split(" ");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  const primaryBtnVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { 
        type: "spring" as const, 
        stiffness: 400, 
        damping: 10
      } 
    },
    tap: { scale: 0.98 }
  };

  const outlineBtnVariants = {
    rest: { scale: 1, borderColor: "rgba(102, 126, 234, 0.5)" },
    hover: { 
      scale: 1.03,
      borderColor: "rgba(102, 126, 234, 1)",
      transition: { 
        type: "spring" as const, 
        stiffness: 400, 
        damping: 10
      } 
    },
    tap: { scale: 0.98 }
  };

  const playBtnVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { 
        type: "spring" as const, 
        stiffness: 400, 
        damping: 10
      } 
    },
    tap: { scale: 0.95 }
  };

  // Pulse animation for play button
  const pulsePingVariants = {
    animate: {
      opacity: [0.8, 0],
      scale: [0.8, 1.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  // Parallax effects for subtle animations on scroll - enhanced for Phase 3
  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 20 : 50]);
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 40 : 100]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.2], [1, prefersReducedMotion ? 0.98 : 0.95]);
  
  // Create a background opacity value that adjusts with scroll
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.25, 0.15]);
  
  // Create a background opacity value that works with CSS
  const [bgOpacity, setBgOpacity] = useState(0.25);
  
  // Update background opacity based on scroll
  useEffect(() => {
    const unsubscribe = backgroundOpacity.onChange(value => {
      setBgOpacity(value);
    });
    return () => unsubscribe();
  }, [backgroundOpacity]);
  
  return (
    <div id="hero" ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background with responsive mouse movement */}
      <ParticleBackground 
        particleCount={prefersReducedMotion ? 25 : 40} 
        interactive={!prefersReducedMotion} 
        className="motion-reduce:opacity-[0.03]"
        style={{ opacity: bgOpacity }}
      />
      
      {/* Main hero content */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-8 py-16 lg:py-24 w-full">
        {/* Left side - Content with parallax effect */}
        <motion.div 
          className="flex flex-col gap-8 lg:gap-10 items-center lg:items-start text-center lg:text-left lg:w-1/2"
          style={{ y: prefersReducedMotion ? 0 : contentY }}
        >
          {/* Headline with staggered word animation - enhanced for Phase 3 */}
          <motion.h1 
            className="font-serif font-bold text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-tight"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ scale: headlineScale }}
          >
            {headlineWords.map((word, i) => (
              <motion.span 
                key={i} 
                className="inline-block mr-[0.3em]" 
                variants={wordVariants}
                whileHover={{ color: "#667eea", scale: prefersReducedMotion ? 1 : 1.05 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            className="text-lg opacity-90 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Discover Dr. Ernesto Lee's groundbreaking methodology in 'AI and the Art of Productive Struggle' - the research-based guide that helps K-12 and college educators harness AI's power while preserving the cognitive effort that makes learning meaningful.
          </motion.p>
          
          {/* Author Credibility */}
          <motion.div 
            className="flex items-center gap-2 text-base font-medium text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span className="text-primary/80">By</span>
            <span className="font-semibold">Dr. Ernesto Lee</span>
            <span className="text-primary/80">-</span>
            <span className="text-primary/80">15+ Years of AI Education Research</span>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {/* Primary CTA - with ripple effect */}
            <motion.button
              className="btn bg-gradient-to-r from-[#667eea] to-[#764ba2] border-0 text-white btn-lg relative overflow-hidden group"
              variants={primaryBtnVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              style={{ transformStyle: "preserve-3d" }}
            >
              Get the Book Now
              <span className="text-sm font-normal ml-2 opacity-90">Starting at $34.99</span>
              <motion.span 
                className="absolute inset-0 bg-white rounded-lg"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ 
                  scale: 4, 
                  opacity: 0.2, 
                  transition: { duration: 0.5 } 
                }}
                transition={{ type: "tween" }}
              />
            </motion.button>
            
            {/* Secondary CTA - with border animation */}
            <motion.button 
              className="btn btn-outline btn-lg border-2 border-primary relative overflow-hidden"
              variants={outlineBtnVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => window.open('https://editor.reedsy.com/s/tIF20dQ', '_blank', 'noopener,noreferrer')}
            >
              Read Chapter 1 Free
              <motion.div 
                className="absolute inset-0 border-2 border-primary rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 1,
                  transition: { duration: 0.2 }
                }}
              />
            </motion.button>
          </motion.div>
          
          {/* Tertiary CTA - Video with pulse animation */}
          <Link href="/chapter-1-preview" passHref>
            <motion.button 
              className="flex items-center gap-2 text-primary hover:text-primary-focus transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              variants={playBtnVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="rounded-full bg-primary/10 p-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
                <motion.span
                  className="absolute -inset-1 rounded-full border border-primary"
                  variants={pulsePingVariants}
                  animate="animate"
                />
              </div>
              <span className="font-medium">See Inside the Book</span>
              <span className="text-sm opacity-75">(preview pages)</span>
            </motion.button>
          </Link>
          
          {/* Trust Elements with scroll-triggered animations - enhanced for Phase 3 */}
          <div ref={counterRef} className="flex flex-col gap-6 w-full mt-2">
            {/* Stats with animated counter - now scroll-triggered */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={(isInView && isCounterInView) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="font-semibold">
                <AnimatedCounter
                  end={2500}
                  suffix="+ educators transformed by this book"
                  formatter={(value) => Math.floor(value).toLocaleString()}
                />
              </div>
              <div className="font-semibold">
                <TypewriterText
                  text="10 comprehensive chapters of proven strategies"
                  delay={1500}
                  speed={50}
                />
              </div>
              <div className="font-semibold">
                Available in{' '}
                <span className="text-primary">digital and physical editions</span>
              </div>
            </motion.div>

            {/* University logos marquee */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <Marquee speed={15} className="py-2">
                <div className="flex gap-6 mx-4">
                  <UniversityLogo name="Stanford University" />
                  <UniversityLogo name="Harvard University" />
                  <UniversityLogo name="MIT" />
                  <UniversityLogo name="UC Berkeley" />
                  <UniversityLogo name="Princeton" />
                  <UniversityLogo name="Yale University" />
                  <UniversityLogo name="Columbia University" />
                </div>
              </Marquee>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Book image only */}
        <motion.div
          className="relative mt-10 lg:mt-0 lg:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ y: prefersReducedMotion ? 0 : illustrationY }}
        >
          {/* Book cover image - now larger and centered */}
          <motion.div 
            className="relative w-4/5 max-w-md"
            initial={{ opacity: 0, rotateY: -15 }}
            animate={isInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -15 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05, rotateY: 5, transition: { duration: 0.4 } }}
          >
            <div className="drop-shadow-2xl">
              <img 
                src="/mock-00001a-.png" 
                alt="Productive Struggle Book Cover" 
                className="w-full h-auto object-contain rounded-md"
                style={{ 
                  filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.3))"
                }}
              />
            </div>
            {/* Enhanced decorative elements for the book */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-xl -z-10"></div>
            <div className="absolute top-1/3 -left-12 w-24 h-24 bg-gradient-to-tr from-accent/20 to-primary/10 rounded-full blur-xl -z-10"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
