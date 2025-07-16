'use client';

import AuthButton from './AuthButton';

interface ModalSignUpButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onSuccess?: () => void;
  ctaTheme?: boolean;
}

const ModalSignUpButton = (props: ModalSignUpButtonProps) => {
  return <AuthButton mode="signup" {...props} />;
};

export default ModalSignUpButton;
