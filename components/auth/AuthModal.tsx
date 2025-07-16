'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Chrome, Loader2, Sparkles, BookOpen, Users, Lightbulb } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'signin' | 'signup';
  onSuccess?: () => void;
}

const AuthModal = ({ 
  isOpen, 
  onClose, 
  initialTab = 'signin',
  onSuccess 
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { data: session, status } = useSession();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setEmail('');
      setEmailSent(false);
      setIsLoading(false);
      // Prevent body scroll when modal is open
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    } else {
      // Restore body scroll when modal is closed
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    }

    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, initialTab]);

  // Close modal if user becomes authenticated
  useEffect(() => {
    if (status === 'authenticated' && isOpen) {
      onSuccess?.();
      onClose();
    }
  }, [status, isOpen, onSuccess, onClose]);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
    } catch (error) {
      console.error('Google authentication error:', error);
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const result = await signIn('email', { 
        email: email.trim(),
        callbackUrl: '/dashboard',
        redirect: false
      });
      
      if (result?.ok) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Magic link error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabContent = {
    signin: {
      title: "Welcome Back, Educator",
      subtitle: "Continue your AI-powered teaching journey",
      benefits: [
        { icon: BookOpen, text: "Access your personalized dashboard" },
        { icon: Lightbulb, text: "Continue where you left off" },
        { icon: Users, text: "Connect with educator community" }
      ],
      cta: "Sign In",
      switchText: "New to LearningScience.ai?",
      switchAction: "Create account"
    },
    signup: {
      title: "Transform Your Teaching",
      subtitle: "Join thousands of educators using AI to enhance learning",
      benefits: [
        { icon: Sparkles, text: "Research-based AI teaching strategies" },
        { icon: BookOpen, text: "Immediate classroom implementation" },
        { icon: Users, text: "Join our community of innovative educators" }
      ],
      cta: "Get Started Free",
      switchText: "Already have an account?",
      switchAction: "Sign in"
    }
  };

  const currentContent = tabContent[activeTab];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: "spring", damping: 25 }}
        >
          {/* Glass morphism background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />
          
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-gray-600" />
          </motion.button>

          <div className="relative p-8">
            {/* Header with animated gradient text */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                {currentContent.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {currentContent.subtitle}
              </p>
            </motion.div>

            {/* Tab Switcher */}
            <motion.div
              className="flex bg-gray-100/80 rounded-xl p-1 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {(['signin', 'signup'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeTab === tab 
                      ? 'bg-white shadow-sm text-[#667eea]' 
                      : 'text-gray-600 hover:text-gray-800'
                    }
                  `}
                >
                  {tab === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </motion.div>

            {emailSent ? (
              // Success state
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="w-16 h-16 text-[#667eea] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
                <p className="text-gray-600 text-sm mb-4">
                  We've sent a magic link to <strong>{email}</strong>
                </p>
                <p className="text-xs text-gray-500">
                  Click the link in your email to complete {activeTab === 'signin' ? 'signing in' : 'registration'}
                </p>
                <button
                  onClick={() => setEmailSent(false)}
                  className="mt-4 text-[#667eea] hover:underline text-sm"
                >
                  ← Try a different email
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === 'signin' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === 'signin' ? 20 : -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Benefits List */}
                  <div className="mb-6 space-y-3">
                    {currentContent.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10">
                          <benefit.icon className="w-4 h-4 text-[#667eea]" />
                        </div>
                        <span className="text-sm text-gray-700">{benefit.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Google OAuth Button */}
                  <motion.button
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    className="w-full mb-4 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#667eea] rounded-xl font-medium text-gray-700 hover:text-[#667eea] transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Chrome className="w-5 h-5 text-blue-500" />
                        <span>Continue with Google</span>
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <motion.div
                    className="relative mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                  </motion.div>

                  {/* Magic Link Form */}
                  <motion.form
                    onSubmit={handleMagicLink}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#667eea] focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                        required
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isLoading || !email.trim()}
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl font-semibold hover:from-[#5a6fd8] hover:to-[#6a4190] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          <span>{currentContent.cta}</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>

                  {/* Switch Tab */}
                  <motion.div
                    className="text-center mt-6 pt-4 border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className="text-sm text-gray-600">
                      {currentContent.switchText}{' '}
                      <button
                        onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
                        className="text-[#667eea] hover:underline font-medium"
                      >
                        {currentContent.switchAction}
                      </button>
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
