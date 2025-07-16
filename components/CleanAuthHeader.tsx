"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  User, 
  Settings, 
  LogOut, 
  BookOpen, 
  LayoutDashboard,
  ChevronDown,
  Menu,
  X,
  ArrowUp,
  Home,
  AlertTriangle,
  Star,
  CreditCard,
  HelpCircle
} from "lucide-react";

import { ModalLoginButton, ModalSignUpButton } from "./auth";
import logo from "@/app/icon.png";
import config from "@/config";

const navigationItems = [
  { href: "/#hero", label: "Home", icon: Home },
  { href: "/#problem", label: "Problem", icon: AlertTriangle },
  { href: "/#chapters", label: "Chapters", icon: BookOpen },
  { href: "/about-author", label: "Dr. Lee", icon: User },
  { href: "/#social-proof", label: "Reviews", icon: Star },
  { href: "/#pricing", label: "Pricing", icon: CreditCard },
  { href: "/#faq", label: "FAQ", icon: HelpCircle },
];

const userMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

const CleanAuthHeaderContent = () => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  }, [searchParams]);

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  // Handle smooth scrolling for hash links
  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const element = document.getElementById(href.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
    setIsUserMenuOpen(false);
  };

  // Back to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User Profile Component
  const UserProfile = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (status === 'loading') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      );
    }

    if (status === 'authenticated' && session.user) {
      const userInitial = session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U';
      
      return (
        <div className={`relative ${isMobile ? 'w-full' : ''}`}>
          <motion.button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              isMobile ? 'w-full justify-start' : ''
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-8 h-8 rounded-full border-2 border-gray-200"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {userInitial}
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium truncate max-w-24 text-gray-700">
                {session.user.name || session.user.email?.split('@')[0] || 'User'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform text-gray-500 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </div>
          </motion.button>

          {/* Desktop Dropdown */}
          {!isMobile && (
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* User Info Header */}
                  <div className="p-4 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-12 h-12 rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-semibold">
                          {userInitial}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          {session.user.name || 'Educator'}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Sign Out */}
                  <div className="p-2 border-t border-gray-200">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      );
    }

    // Unauthenticated state
    return (
      <div className={`flex items-center gap-3 ${isMobile ? 'flex-col w-full space-y-3' : ''}`}>
        <ModalLoginButton 
          variant="secondary" 
          size="sm"
          fullWidth={isMobile}
        />
        <ModalSignUpButton 
          variant="primary" 
          size="sm"
          fullWidth={isMobile}
        />
      </div>
    );
  };

  return (
    <>
      {/* Clean Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="h-8 w-8"
                width={32}
                height={32}
              />
              <span className="hidden font-bold text-xl sm:inline-block">
                {config.appName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('/#')) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className="text-sm font-medium transition-colors hover:text-[#667eea] text-gray-600 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center">
              <UserProfile />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={(e) => {
                      if (item.href.startsWith('/#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <UserProfile isMobile={true} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

// Main CleanAuthHeader component with Suspense boundary
const CleanAuthHeader = () => {
  return (
    <Suspense fallback={<div className="bg-base-200 h-16" />}>
      <CleanAuthHeaderContent />
    </Suspense>
  );
};

export default CleanAuthHeader;
