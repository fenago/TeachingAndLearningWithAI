'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Download, Shield, Users, TrendingUp, Clock } from 'lucide-react';

interface RecentPurchase {
  name: string;
  location: string;
  time: string;
}

const recentPurchases: RecentPurchase[] = [
  { name: 'Sarah M.', location: 'California', time: '2 minutes ago' },
  { name: 'Michael D.', location: 'Texas', time: '5 minutes ago' },
  { name: 'Jennifer L.', location: 'New York', time: '8 minutes ago' },
  { name: 'Robert K.', location: 'Florida', time: '12 minutes ago' },
  { name: 'Lisa T.', location: 'Illinois', time: '15 minutes ago' },
];

export default function FinalCTA() {
  const [workshopSpots, setWorkshopSpots] = useState(12);
  const [monthlyJoins, setMonthlyJoins] = useState(2847);
  const [visiblePurchase, setVisiblePurchase] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // Simulate workshop spots decreasing
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && workshopSpots > 3) {
        setWorkshopSpots(prev => prev - 1);
      }
    }, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, [workshopSpots]);

  // Simulate monthly joins increasing
  useEffect(() => {
    const interval = setInterval(() => {
      setMonthlyJoins(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 15000); // Every 15 seconds
    return () => clearInterval(interval);
  }, []);

  // Show purchase notifications
  useEffect(() => {
    const showPurchase = () => {
      setShowNotification(true);
      setVisiblePurchase(prev => (prev + 1) % recentPurchases.length);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    // Initial delay
    const initialTimer = setTimeout(showPurchase, 3000);
    
    // Then repeat
    const interval = setInterval(showPurchase, 20000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      {/* Particle animation background */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Don't Let Another Semester Pass Feeling Behind
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Join {monthlyJoins.toLocaleString()}+ educators who've transformed their teaching 
            with productive struggle methodology
          </p>

          {/* Urgency elements */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <UrgencyCard
              icon={<Users className="w-6 h-6" />}
              label="Next workshop cohort"
              value={`${workshopSpots} spots remaining`}
              urgent={workshopSpots < 5}
            />
            <UrgencyCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Educators joined this month"
              value={monthlyJoins.toLocaleString()}
              trending
            />
            <UrgencyCard
              icon={<Shield className="w-6 h-6" />}
              label="Risk-free guarantee"
              value="30-day money-back"
              trustBadge
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <RippleButton
              text="Transform My Teaching Now"
              primary
              icon={<TrendingUp className="w-5 h-5" />}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/80 text-white rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Start with Free Chapter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-purple-200 hover:text-white transition-colors flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Schedule Workshop Call
            </motion.button>
          </div>

          {/* Live counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 text-purple-200"
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              Last purchase: <span className="text-white font-medium">3 minutes ago</span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Purchase notifications */}
      <AnimatePresence>
        {showNotification && (
          <PurchaseNotification purchase={recentPurchases[visiblePurchase]} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ParticleBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

interface UrgencyCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  urgent?: boolean;
  trending?: boolean;
  trustBadge?: boolean;
}

function UrgencyCard({ icon, label, value, urgent, trending, trustBadge }: UrgencyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 border ${
        urgent ? 'border-red-400' : 'border-white/20'
      }`}
    >
      <div className="flex items-center justify-center gap-2 text-purple-200 mb-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className={`text-2xl font-bold ${urgent ? 'text-red-400' : 'text-white'}`}>
        {value}
      </div>
      {trustBadge && (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-2"
        />
      )}
    </motion.div>
  );
}

interface RippleButtonProps {
  text: string;
  primary?: boolean;
  icon?: React.ReactNode;
}

function RippleButton({ text, primary, icon }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples([...ripples, { x, y, id }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative overflow-hidden px-10 py-5 rounded-lg font-bold text-lg transition-all flex items-center gap-3 ${
        primary
          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-2xl'
          : 'bg-white/20 text-white'
      }`}
    >
      {icon}
      {text}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 40, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
}

function PurchaseNotification({ purchase }: { purchase: RecentPurchase }) {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed bottom-8 right-8 bg-white text-gray-900 rounded-lg shadow-2xl p-4 max-w-sm z-50"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <p className="font-semibold">{purchase.name} from {purchase.location}</p>
          <p className="text-sm text-gray-600">Just joined • {purchase.time}</p>
        </div>
      </div>
    </motion.div>
  );
}
