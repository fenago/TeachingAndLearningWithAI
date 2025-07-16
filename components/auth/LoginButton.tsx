'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Mail, LogIn, Loader2, Chrome } from 'lucide-react';

interface LoginButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onSuccess?: () => void;
}

const LoginButton = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  onSuccess 
}: LoginButtonProps) => {
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
      onSuccess?.();
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('email', { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
      onSuccess?.();
    } catch (error) {
      console.error('Magic link sign in error:', error);
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
          <span>Welcome back!</span>
        </div>
      </motion.div>
    );
  }

  // Show auth options if clicked
  if (showOptions) {
    return (
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Google Sign In */}
        <motion.button
          onClick={handleGoogleSignIn}
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
              <span>Continue with Google</span>
            </>
          )}
        </motion.button>

        {/* Magic Link Sign In */}
        <motion.button
          onClick={handleMagicLinkSignIn}
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
              <span>Email Magic Link</span>
            </>
          )}
        </motion.button>

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

  // Main login button
  return (
    <motion.button
      onClick={() => setShowOptions(true)}
      disabled={isLoading || status === 'loading'}
      className={`${baseClasses} ${variantClasses[variant]} flex items-center justify-center gap-2`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative flex items-center gap-2">
        {status === 'loading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <LogIn className="w-5 h-5" />
        )}
        <span>Sign In</span>
      </div>
    </motion.button>
  );
};

export default LoginButton;
