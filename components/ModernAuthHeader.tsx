"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
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
  HelpCircle,
  Sparkles
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

const ModernAuthHeaderContent = () => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const { scrollY } = useScroll();

  // Handle scroll effects
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setShowBackToTop(latest > 400);
    });
    return () => unsubscribe();
  }, [scrollY]);

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
          <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse" />
          <div className="w-20 h-4 bg-white/20 rounded animate-pulse" />
        </div>
      );
    }

    if (status === 'authenticated' && session.user) {
      const userInitial = session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U';
      
      return (
        <div className={`relative ${isMobile ? 'w-full' : ''}`}>
          <motion.button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-all duration-200 ${
              isMobile ? 'w-full justify-start' : ''
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-8 h-8 rounded-full border-2 border-white/30 shadow-lg"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                {userInitial}
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium truncate max-w-24 text-white">
                {session.user.name || session.user.email?.split('@')[0] || 'User'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform text-gray-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </div>
          </motion.button>

          {/* Desktop Dropdown */}
          {!isMobile && (
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* User Info Header */}
                  <div className="p-4 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 border-b border-gray-200/50">
                    <div className="flex items-center gap-3">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-12 h-12 rounded-full shadow-lg"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
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
                  <div className="p-2 border-t border-gray-200/50">
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
          variant={isMobile ? "secondary" : "outline"}
          size={isMobile ? "md" : "sm"}
          fullWidth={isMobile}
        />
        <ModalSignUpButton 
          variant="primary" 
          size={isMobile ? "md" : "sm"}
          fullWidth={isMobile}
        />
      </div>
    );
  };

  return (
    <>
      {/* Modern Floating Header */}
      <motion.header
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 group"
              title={`${config.appName} homepage`}
            >
              <div className="relative">
                <Image
                  src={logo}
                  alt={`${config.appName} logo`}
                  className="w-8 h-8 transition-transform group-hover:scale-110"
                  placeholder="blur"
                  priority={true}
                  width={32}
                  height={32}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
              <span className="font-bold text-lg text-white group-hover:text-gray-200 transition-colors">
                {config.appName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                    onClick={(e) => {
                      if (item.href.startsWith('/#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Authentication */}
            <div className="hidden lg:flex items-center">
              <UserProfile />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="absolute top-20 left-4 right-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Navigation Items */}
              <div className="p-4 space-y-2">
                {navigationItems.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
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
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Authentication */}
              <div className="p-4 border-t border-gray-700/50 bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20">
                <UserProfile isMobile={true} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
};

const ModernAuthHeader = () => {
  return (
    <Suspense fallback={null}>
      <ModernAuthHeaderContent />
    </Suspense>
  );
};

export default ModernAuthHeader;
