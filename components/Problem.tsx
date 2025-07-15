'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import LazyLoadedComponent from './LazyLoadedComponent';
import { BentoGrid } from '@/components/magicui/BentoGrid';

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
import FrictionParadoxCard from '@/components/cards/FrictionParadoxCard';
import DependencyTrapCard from '@/components/cards/DependencyTrapCard';
import AuthenticityCard from '@/components/cards/AuthenticityCard';

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isAnimationInView = useInView(animationRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      id="problem"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-base-100 to-base-200 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-error rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-warning rounded-full filter blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Why Every AI Education Book Gets It Wrong
            <span className="bg-gradient-to-r from-error to-warning bg-clip-text text-transparent">
              {' '}(Until Now)
            </span>
          </h2>
          <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto">
            Most AI education resources promise to make teaching easier. Dr. Lee's book reveals why that's exactly the wrong approach. In 'AI and the Art of Productive Struggle,' you'll discover why the best AI tools for education are those that make students think harder, not less.
          </p>
        </motion.div>

        {/* Teaching Transformation Animation */}
        <motion.div
          ref={animationRef}
          className="max-w-3xl mx-auto my-12 md:my-16 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isAnimationInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="bg-base-100/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-base-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">How AI Transforms Teaching</h3>
            
            <div className="aspect-square w-full max-w-2xl mx-auto">
              <LazyLoadedComponent
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#667eea]/30 to-[#764ba2]/30 rounded-2xl">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-sm opacity-70">Loading visualization...</p>
                    </div>
                  </div>
                }
              >
                <TeachingTransformationAnimation />
              </LazyLoadedComponent>
            </div>
            
            <p className="text-center mt-4 text-base-content/80 italic">
              Visualizing how Dr. Lee's method balances AI assistance with cognitive challenge
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10"></div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -z-10"></div>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid className="max-w-6xl mx-auto">
          <FrictionParadoxCard />
          <DependencyTrapCard />
          <AuthenticityCard />
        </BentoGrid>
      </div>
    </section>
  );
};

export default Problem;
