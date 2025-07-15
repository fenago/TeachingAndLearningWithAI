'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Marquee from '@/components/magicui/Marquee';
import { Star, TrendingUp, Clock, Users, Award } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  metric: {
    label: string;
    value: string;
    icon: React.ReactNode;
  };
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'maria-rodriguez',
    name: 'Prof. Maria R.',
    role: 'Large public university in California',
    quote: 'I went from feeling obsolete to becoming the AI mentor for my entire department. This book gave me the confidence and framework I needed.',
    image: '/mock-00037-.png',
    metric: {
      label: 'Student engagement',
      value: '+40%',
      icon: <Users className="w-4 h-4" />
    },
    rating: 5
  },
  {
    id: 'david-chen',
    name: 'Dr. David C.',
    role: 'Private college in Massachusetts',
    quote: 'My students are thinking deeper than ever, and I\'ve cut my prep time in half. The productive struggle methodology is revolutionary.',
    image: '/mock-00023-2eb6b.png',
    metric: {
      label: 'Lesson planning time',
      value: '-60%',
      icon: <Clock className="w-4 h-4" />
    },
    rating: 5
  },
  {
    id: 'jennifer-walsh',
    name: 'Prof. Jennifer W.',
    role: 'Large community college in Florida',
    quote: 'Finally, someone who gets it! This book showed me how to use AI without sacrificing the cognitive rigor my students need.',
    image: '/mock-00096-2eb6b.png',
    metric: {
      label: 'Assessment scores',
      value: '+25%',
      icon: <TrendingUp className="w-4 h-4" />
    },
    rating: 5
  },
  {
    id: 'michael-thompson',
    name: 'Dr. Michael T.',
    role: 'Research university in Texas',
    quote: 'The chapter on AI-resistant assignments alone was worth the price. My students can\'t fake their way through anymore - they actually have to think!',
    image: '/mock-00118-2eb6b.png',
    metric: {
      label: 'Critical thinking scores',
      value: '+35%',
      icon: <Award className="w-4 h-4" />
    },
    rating: 5
  },
  {
    id: 'sarah-johnson',
    name: 'Prof. Sarah J.',
    role: 'Small liberal arts college in Oregon',
    quote: 'This book transformed my entire approach to teaching. Students are more engaged, and I\'m actually enjoying grading again!',
    image: '/mock-01241-2eb6b.png',
    metric: {
      label: 'Student satisfaction',
      value: '+45%',
      icon: <Star className="w-4 h-4" />
    },
    rating: 5
  }
];

// Duplicate testimonials for continuous marquee
const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function SocialProof() {
  const [visibleMetrics, setVisibleMetrics] = useState<Set<string>>(new Set());

  return (
    <section id="social-proof" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">What Educators Are Saying About 'Productive Struggle'</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            ⭐⭐⭐⭐⭐ "This book changed everything"
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <Badge icon={<Award />} text="2,500+ Book Readers" />
          <Badge icon={<Star />} text="4.9/5 Book Rating" />
          <Badge icon={<TrendingUp />} text="93% Report Transformation" />
        </motion.div>

        {/* Testimonial marquee */}
        <div className="relative">
          <Marquee speed={30} pauseOnHover className="py-4">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
                onMetricVisible={() => {
                  setVisibleMetrics(prev => new Set(prev).add(testimonial.id));
                }}
                isMetricVisible={visibleMetrics.has(testimonial.id)}
              />
            ))}
          </Marquee>
        </div>


      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md"
    >
      <div className="text-purple-600">{icon}</div>
      <span className="font-medium">{text}</span>
    </motion.div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  onMetricVisible: () => void;
  isMetricVisible: boolean;
}

function TestimonialCard({ testimonial, onMetricVisible, isMetricVisible }: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isMetricVisible) {
          onMetricVisible();
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [onMetricVisible, isMetricVisible]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-96 mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Testimonial Image (if available) */}
      {testimonial.image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={testimonial.image} 
            alt={`${testimonial.name}'s testimonial`} 
            className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <p className="text-lg font-medium mb-4 italic">"{testimonial.quote}"</p>

        {/* Name and role */}
        <div className="mb-4">
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
        </div>

        {/* Metric */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {testimonial.metric.icon}
              <span>{testimonial.metric.label}</span>
            </div>
            {isMetricVisible ? (
              <CountUpMetric value={testimonial.metric.value} />
            ) : (
              <span className="text-xl font-bold text-gray-300">--</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CountUpMetric({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('');
  const numericValue = parseInt(value.match(/\d+/)?.[0] || '0');
  const prefix = value.startsWith('+') ? '+' : value.startsWith('-') ? '-' : '';
  const suffix = value.endsWith('%') ? '%' : '';

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(numericValue, Math.round(increment * step));
      setDisplayValue(`${prefix}${current}${suffix}`);

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, numericValue, prefix, suffix]);

  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-xl font-bold text-purple-600"
    >
      {displayValue}
    </motion.span>
  );
}


