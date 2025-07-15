'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
  emotion?: {
    label: string;
    color: string;
    pulseSpeed?: number;
  };
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className = '' }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Progress line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-indigo-500"
          style={{ height: progressHeight }}
        />
      </div>

      {/* Timeline items */}
      <div className="space-y-12 md:space-y-16">
        {items.map((item, index) => (
          <TimelineEntry
            key={index}
            item={item}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

interface TimelineEntryProps {
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}

function TimelineEntry({ item, index, isLeft }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView && item.description) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), item.description.length * 30);
      return () => clearTimeout(timer);
    }
  }, [isInView, item.description]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'} ml-20 md:ml-0`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.date}</p>
          
          {item.description && (
            <div className="mb-4">
              {isTyping ? (
                <TypewriterText text={item.description} speed={30} />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 italic">"{item.description}"</p>
              )}
            </div>
          )}

          {item.emotion && (
            <EmotionVisualization emotion={item.emotion} />
          )}

          {item.content}
        </motion.div>
      </div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
        className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-white dark:bg-gray-800 border-4 border-purple-500 z-10"
      />
    </motion.div>
  );
}

function TypewriterText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="text-gray-700 dark:text-gray-300 italic">
      "{displayedText}"
      {displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </p>
  );
}

function EmotionVisualization({ emotion }: { emotion: NonNullable<TimelineItem['emotion']> }) {
  const pulseSpeed = emotion.pulseSpeed || 2;
  
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        Emotion:
      </span>
      <div className="flex items-center gap-2">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: pulseSpeed,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: emotion.color }}
        />
        <span 
          className="font-medium"
          style={{ color: emotion.color }}
        >
          {emotion.label}
        </span>
      </div>
    </div>
  );
}
