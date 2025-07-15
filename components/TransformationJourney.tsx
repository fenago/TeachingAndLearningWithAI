'use client';

import { Timeline } from '@/components/magicui/Timeline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const timelineItems = [
  {
    date: 'October 15th',
    title: 'The Breaking Point',
    description: 'Laptop glowing like a beacon of my inadequacy',
    emotion: {
      label: 'Overwhelm',
      color: '#ef4444',
      pulseSpeed: 1.5
    },
    content: (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4"
      >
        <div className="relative rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
            alt="Stressed teacher at kitchen table"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
            Sarah sits at her kitchen table, 2 AM, surrounded by ungraded papers and the weight of falling behind.
          </p>
        </div>
      </motion.div>
    )
  },
  {
    date: 'November 3rd',
    title: 'The Discovery',
    description: 'Something I haven\'t felt in months: possibility',
    emotion: {
      label: 'Hope',
      color: '#eab308',
      pulseSpeed: 2
    },
    content: (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4"
      >
        <div className="relative rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=300&fit=crop"
            alt="Teacher reading book with sunrise"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
            Morning light streams through the window as Sarah discovers a new approach to AI in education.
          </p>
        </div>
      </motion.div>
    )
  },
  {
    date: 'December 18th',
    title: 'The Transformation',
    description: 'I\'m not just keeping up—I\'m helping shape the future',
    emotion: {
      label: 'Confidence',
      color: '#10b981',
      pulseSpeed: 2.5
    },
    content: (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4"
      >
        <div className="relative rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1580894908361-967195033215?w=400&h=300&fit=crop"
            alt="Teacher confidently leading AI-enhanced classroom"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
            Sarah leads her classroom with renewed energy, AI tools amplifying her teaching impact.
          </p>
        </div>
      </motion.div>
    )
  }
];

export default function TransformationJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const transformationPercentage = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 50, 100]
  );

  return (
    <section id="journey" ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: useTransform(scrollYProgress, [0, 1], [0, -200])
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">Sarah's Story</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From overwhelmed educator to AI-empowered innovator—follow one teacher's 
            transformative journey that mirrors thousands of others
          </p>
        </motion.div>

        {/* Transformation percentage indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-6 text-center">
              Transformation Progress
            </h3>
            <div className="relative pt-8">
              <motion.div
                className="absolute -top-2 text-sm font-bold bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-md"
                style={{
                  left: useTransform(transformationPercentage, (v) => `${v}%`),
                  x: '-50%'
                }}
              >
                <motion.span>
                  {useTransform(transformationPercentage, (v) => Math.round(v))}
                </motion.span>
                %
              </motion.div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  style={{
                    width: useTransform(transformationPercentage, (v) => `${v}%`)
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Overwhelm</span>
                <span>Hope</span>
                <span>Confidence</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Timeline items={timelineItems} />
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Sarah's journey could be yours. The transformation begins with a single step.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105">
            Start Your Transformation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
