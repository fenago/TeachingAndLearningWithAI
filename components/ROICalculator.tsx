'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Clock, Users, Heart, Sparkles } from 'lucide-react';

interface CalculatorInputs {
  studentsPerWeek: number;
  hoursLessonPlanning: number;
  hoursGrading: number;
  hourlyValue: number;
}

interface CalculatorResults {
  weeklyTimeSaved: number;
  annualTimeSaved: number;
  monetaryValue: number;
  engagementIncrease: number;
  stressReduction: number;
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    studentsPerWeek: 150,
    hoursLessonPlanning: 10,
    hoursGrading: 8,
    hourlyValue: 50
  });

  const [results, setResults] = useState<CalculatorResults>({
    weeklyTimeSaved: 0,
    annualTimeSaved: 0,
    monetaryValue: 0,
    engagementIncrease: 0,
    stressReduction: 0
  });

  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate results whenever inputs change
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      calculateResults();
      setIsCalculating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputs]);

  const calculateResults = () => {
    // Time savings calculations (AI typically saves 30-40% of prep time)
    const prepTimeSaved = inputs.hoursLessonPlanning * 0.35;
    const gradingTimeSaved = inputs.hoursGrading * 0.40;
    const weeklyTimeSaved = prepTimeSaved + gradingTimeSaved;
    const annualTimeSaved = weeklyTimeSaved * 40; // 40 weeks in academic year
    
    // Monetary value
    const monetaryValue = annualTimeSaved * inputs.hourlyValue;
    
    // Engagement increase based on student count and time saved
    const engagementIncrease = Math.min(45, 20 + (inputs.studentsPerWeek / 20) + (weeklyTimeSaved * 2));
    
    // Stress reduction based on time saved and student load
    const stressReduction = Math.min(75, 30 + (weeklyTimeSaved * 5) - (inputs.studentsPerWeek / 50));

    setResults({
      weeklyTimeSaved: Math.round(weeklyTimeSaved * 10) / 10,
      annualTimeSaved: Math.round(annualTimeSaved),
      monetaryValue: Math.round(monetaryValue),
      engagementIncrease: Math.round(engagementIncrease),
      stressReduction: Math.round(stressReduction)
    });
  };

  const bookCost = 49; // Assuming book costs $49
  const exceedsBookCost = results.monetaryValue > bookCost * 10;

  return (
    <section id="roi" className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            Calculate Your Teaching Transformation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover how much time and stress you'll save with AI-enhanced teaching methods
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Your Current Teaching Load</h3>
            
            {/* Students per week */}
            <div className="mb-8">
              <label className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Students taught per week
                </span>
                <span className="font-bold text-lg">{inputs.studentsPerWeek}</span>
              </label>
              <input
                type="range"
                min="50"
                max="500"
                value={inputs.studentsPerWeek}
                onChange={(e) => setInputs({ ...inputs, studentsPerWeek: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50</span>
                <span>500</span>
              </div>
            </div>

            {/* Hours on lesson planning */}
            <div className="mb-8">
              <label className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Hours on lesson planning per week
                </span>
                <span className="font-bold text-lg">{inputs.hoursLessonPlanning}</span>
              </label>
              <input
                type="range"
                min="5"
                max="20"
                value={inputs.hoursLessonPlanning}
                onChange={(e) => setInputs({ ...inputs, hoursLessonPlanning: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5</span>
                <span>20</span>
              </div>
            </div>

            {/* Hours on grading */}
            <div className="mb-8">
              <label className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Hours on grading per week
                </span>
                <span className="font-bold text-lg">{inputs.hoursGrading}</span>
              </label>
              <input
                type="range"
                min="5"
                max="15"
                value={inputs.hoursGrading}
                onChange={(e) => setInputs({ ...inputs, hoursGrading: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5</span>
                <span>15</span>
              </div>
            </div>

            {/* Hourly value */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Your hourly value
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  min="25"
                  max="100"
                  value={inputs.hourlyValue}
                  onChange={(e) => setInputs({ ...inputs, hourlyValue: Math.min(100, Math.max(25, parseInt(e.target.value) || 25)) })}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {isCalculating ? (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <Sparkles className="w-12 h-12 text-purple-500 mx-auto animate-spin" />
                  <p className="mt-4 text-gray-600">Calculating your transformation...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Time saved metrics */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      Time Savings
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Weekly</p>
                        <CountingNumber value={results.weeklyTimeSaved} suffix=" hours" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Annual</p>
                        <CountingNumber value={results.annualTimeSaved} suffix=" hours" />
                      </div>
                    </div>
                  </div>

                  {/* Monetary value */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Annual Value of Time Saved
                    </h4>
                    <CountingNumber 
                      value={results.monetaryValue} 
                      prefix="$" 
                      className="text-3xl font-bold text-green-600"
                    />
                  </div>

                  {/* Engagement increase */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Student Engagement Increase
                    </h4>
                    <div className="flex items-center gap-4">
                      <CountingNumber 
                        value={results.engagementIncrease} 
                        prefix="+" 
                        suffix="%" 
                        className="text-2xl font-bold text-blue-600"
                      />
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${results.engagementIncrease}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stress reduction */}
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-600" />
                      Stress Reduction
                    </h4>
                    <div className="flex items-center gap-4">
                      <CountingNumber 
                        value={results.stressReduction} 
                        suffix="%" 
                        className="text-2xl font-bold text-pink-600"
                      />
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        less overwhelm
                      </div>
                    </div>
                    <StressMeter level={100 - results.stressReduction} />
                  </div>

                  {/* CTA */}
                  <motion.button
                    animate={exceedsBookCost ? {
                      scale: [1, 1.02, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(147, 51, 234, 0)",
                        "0 0 0 10px rgba(147, 51, 234, 0.1)",
                        "0 0 0 0 rgba(147, 51, 234, 0)"
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                  >
                    Get Started - Transform Your Teaching
                  </motion.button>
                  {exceedsBookCost && (
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Your annual savings exceed the book cost by {Math.round(results.monetaryValue / bookCost)}x!
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .slider {
          -webkit-appearance: none;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          cursor: pointer;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #7c3aed;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #7c3aed;
        }
      `}</style>
    </section>
  );
}

// Counting number animation component
function CountingNumber({ 
  value, 
  prefix = '', 
  suffix = '', 
  className = 'text-2xl font-bold'
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, increment * step);
      setDisplayValue(current);

      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const formattedValue = prefix === '$' 
    ? displayValue.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : displayValue % 1 === 0 
      ? displayValue.toString() 
      : displayValue.toFixed(1);

  return (
    <div className={className}>
      {prefix}{formattedValue}{suffix}
    </div>
  );
}

// Stress meter visualization
function StressMeter({ level }: { level: number }) {
  return (
    <div className="mt-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-red-400 to-orange-400"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {level < 30 ? '😌 Calm' : level < 60 ? '😟 Stressed' : '😰 Overwhelmed'}
        </div>
      </div>
    </div>
  );
}
