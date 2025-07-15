'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Check, Download, Package, Users, Star, ArrowRight } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  priceText: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  ctaText: string;
  color: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'digital',
    name: 'Digital Book',
    price: 34.99,
    priceText: '$34.99',
    description: 'Start your AI teaching transformation today',
    features: [
      'Instant download',
      '10 comprehensive chapters',
      'Implementation frameworks',
      'Private community access',
      '30-day money-back guarantee'
    ],
    icon: <Download className="w-6 h-6" />,
    ctaText: 'Get Instant Access',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'physical',
    name: 'Physical + Digital',
    price: 39.99,
    priceText: '$39.99',
    description: 'The complete package for hands-on learners',
    features: [
      'Everything in Digital',
      'Premium printed edition',
      'Bonus quick-reference cards',
      'Free shipping on orders over $50',
      '30-day money-back guarantee'
    ],
    icon: <Package className="w-6 h-6" />,
    popular: true,
    ctaText: 'Order Complete Package',
    color: 'from-purple-600 to-indigo-600'
  },
  {
    id: 'workshop',
    name: 'Complete Workshop',
    price: 499,
    priceText: '$499/person',
    description: 'Transform your entire teaching approach',
    features: [
      'Everything above included',
      '6-hour live workshop with Dr. Lee',
      'Hands-on practice sessions',
      '30-day implementation support',
      'Certificate of completion',
      'Contact for group rates'
    ],
    icon: <Users className="w-6 h-6" />,
    ctaText: 'Reserve Your Spot',
    color: 'from-orange-600 to-red-600'
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">Choose Your Transformation Path</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Whether you're self-studying or bringing AI transformation to your entire school, 
            we have the perfect option for you
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Questions?</span> Contact us at{' '}
            <a href="mailto:support@learningscience.ai" className="text-purple-600 hover:underline">
              support@learningscience.ai
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

function PricingCard({ tier, index }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full ${
          tier.popular ? 'ring-2 ring-purple-600' : ''
        }`}
      >
        {/* Popular badge */}
        {tier.popular && (
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1 -right-1 z-10"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">Most Popular</span>
            </div>
          </motion.div>
        )}

        {/* Card content */}
        <div className="p-8">
          {/* Icon and name */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${tier.color} text-white`}>
              {tier.icon}
            </div>
            <h3 className="text-2xl font-bold">{tier.name}</h3>
          </div>

          {/* Price */}
          <div className="mb-4">
            <AnimatedPrice price={tier.priceText} />
            {tier.id === 'physical' && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                + $5 shipping (free over $50)
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {tier.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature, featureIndex) => (
              <FeatureItem key={featureIndex} feature={feature} index={featureIndex} />
            ))}
          </ul>

          {/* CTA Button */}
          <MagneticButton
            text={tier.ctaText}
            gradient={tier.color}
            onClick={() => console.log(`Selected: ${tier.id}`)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnimatedPrice({ price }: { price: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true }}
      className="text-4xl font-bold"
    >
      {isVisible ? (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {price.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ) : (
        <span className="invisible">{price}</span>
      )}
    </motion.div>
  );
}

function FeatureItem({ feature, index }: { feature: string; index: number }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-3"
    >
      <motion.div
        animate={isVisible ? { scale: [0, 1.2, 1] } : {}}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      </motion.div>
      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
    </motion.li>
  );
}

function MagneticButton({ text, gradient, onClick }: { text: string; gradient: string; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (event.clientX - centerX) * 0.1;
    const distY = (event.clientY - centerY) * 0.1;
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full py-3 px-6 rounded-lg text-white font-semibold bg-gradient-to-r ${gradient} relative overflow-hidden group`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {text}
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </span>
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '0%' : '-100%' }}
        transition={{ type: "tween", duration: 0.3 }}
      />
    </motion.button>
  );
}
