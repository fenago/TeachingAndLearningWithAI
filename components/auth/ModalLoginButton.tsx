'use client';

import AuthButton from './AuthButton';

interface ModalLoginButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onSuccess?: () => void;
}

const ModalLoginButton = (props: ModalLoginButtonProps) => {
  return <AuthButton mode="signin" {...props} />;
};

export default ModalLoginButton;
