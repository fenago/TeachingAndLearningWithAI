'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';

interface AuthButtonProps {
  mode: 'signin' | 'signup';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onSuccess?: () => void;
  ctaTheme?: boolean; // Special CTA styling for signup
}

const AuthButton = ({ 
  mode,
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  onSuccess,
  ctaTheme = false
}: AuthButtonProps) => {
  const { data: session, status } = useSession();
  const { isOpen, activeTab, openModal, closeModal } = useAuthModal(mode);

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
          <span>{mode === 'signin' ? 'Welcome back!' : 'Go to Dashboard'}</span>
        </div>
      </motion.div>
    );
  }

  const buttonText = mode === 'signin' ? 'Sign In' : (ctaTheme ? 'Start Your AI Teaching Journey' : 'Get Started');
  const icon = mode === 'signin' ? LogIn : UserPlus;
  const Icon = icon;

  return (
    <>
      <motion.button
        onClick={() => openModal(mode)}
        disabled={status === 'loading'}
        className={`${baseClasses} ${ctaTheme ? ctaClasses : variantClasses[variant]} flex items-center justify-center gap-2`}
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
            <Icon className="w-5 h-5" />
          )}
          <span>{buttonText}</span>
        </div>
      </motion.button>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        initialTab={mode}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default AuthButton;
