'use client';

import { useState, useCallback } from 'react';

export type AuthModalTab = 'signin' | 'signup';

interface UseAuthModalReturn {
  isOpen: boolean;
  activeTab: AuthModalTab;
  openModal: (tab?: AuthModalTab) => void;
  closeModal: () => void;
  switchTab: (tab: AuthModalTab) => void;
}

export const useAuthModal = (initialTab: AuthModalTab = 'signin'): UseAuthModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AuthModalTab>(initialTab);

  const openModal = useCallback((tab: AuthModalTab = initialTab) => {
    setActiveTab(tab);
    setIsOpen(true);
  }, [initialTab]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const switchTab = useCallback((tab: AuthModalTab) => {
    setActiveTab(tab);
  }, []);

  return {
    isOpen,
    activeTab,
    openModal,
    closeModal,
    switchTab,
  };
};
