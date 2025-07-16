'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Mail, UserPlus, Loader2, Sparkles, Chrome } from 'lucide-react';

interface SignUpButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onSuccess?: () => void;
  ctaTheme?: boolean; // Special CTA styling
}

const SignUpButton = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  onSuccess,
  ctaTheme = false
}: SignUpButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { data: session, status } = useSession();

  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Base button styles with brand gradient
  const baseClasses = `
    relative overflow-hidden font-semibold rounded-xl transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-purple-500/20
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Variant styles
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white
      hover:from-[#5a6fd8] hover:to-[#6a4190] hover:shadow-lg hover:shadow-purple-500/25
      active:scale-[0.98]
    `,
    secondary: `
      bg-white text-gray-700 border-2 border-gray-200
      hover:border-[#667eea] hover:text-[#667eea] hover:shadow-md
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-[#667eea] border-2 border-[#667eea]
      hover:bg-[#667eea] hover:text-white hover:shadow-md
      active:scale-[0.98]
    `
  };

  // Special CTA theme with enhanced styling
  const ctaClasses = `
    bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#667eea] bg-size-200 bg-pos-0
    hover:bg-pos-100 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/30
    border-2 border-white/20 hover:border-white/40
    active:scale-[0.98] transform-gpu
  `;

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
      onSuccess?.();
    } catch (error) {
      console.error('Google sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn('email', { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
      onSuccess?.();
    } catch (error) {
      console.error('Magic link sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in
  if (status === 'authenticated') {
    return (
      <motion.div
        className={`${baseClasses} ${variantClasses.primary} cursor-default`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center gap-2">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-6 h-6 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
              {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
            </div>
          )}
          <span>Go to Dashboard</span>
        </div>
      </motion.div>
    );
  }

  // Show auth options if clicked
  if (showOptions) {
    return (
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Google Sign Up */}
        <motion.button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className={`${baseClasses} ${variantClasses.secondary} flex items-center justify-center gap-3`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Chrome className="w-5 h-5 text-blue-500" />
              <span>Sign up with Google</span>
            </>
          )}
        </motion.button>

        {/* Magic Link Sign Up */}
        <motion.button
          onClick={handleMagicLinkSignUp}
          disabled={isLoading}
          className={`${baseClasses} ${variantClasses.outline} flex items-center justify-center gap-3`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Mail className="w-5 h-5" />
              <span>Sign up with Email</span>
            </>
          )}
        </motion.button>

        {/* Educational copy */}
        <motion.p 
          className="text-xs text-gray-500 text-center px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Join thousands of educators transforming their teaching with AI
        </motion.p>

        {/* Back Button */}
        <motion.button
          onClick={() => setShowOptions(false)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors w-full text-center py-2"
          whileHover={{ scale: 1.02 }}
        >
          ← Back
        </motion.button>
      </motion.div>
    );
  }

  // Main sign up button
  return (
    <motion.button
      onClick={() => setShowOptions(true)}
      disabled={isLoading || status === 'loading'}
      className={`${baseClasses} ${ctaTheme ? ctaClasses : variantClasses[variant]} flex items-center justify-center gap-2`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Sparkle effect for CTA theme */}
      {ctaTheme && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <Sparkles className="absolute top-2 right-2 w-4 h-4 text-white/60" />
          <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-white/40" />
        </motion.div>
      )}
      
      <div className="relative flex items-center gap-2">
        {status === 'loading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <UserPlus className="w-5 h-5" />
        )}
        <span>{ctaTheme ? 'Start Your AI Teaching Journey' : 'Get Started'}</span>
      </div>
    </motion.button>
  );
};

export default SignUpButton;
