"use client";

import { useState, useEffect } from "react";
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
  ChevronDown 
} from "lucide-react";

import { ModalLoginButton, ModalSignUpButton } from "./auth";
import logo from "@/app/icon.png";
import config from "@/config";

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: "/#hero",
    label: "Home",
  },
  {
    href: "/#problem",
    label: "Problem",
  },
  {
    href: "/#chapters",
    label: "Chapters",
  },
  {
    href: "/about-author",
    label: "Dr. Lee",
  },
  {
    href: "/#social-proof",
    label: "Reviews",
  },
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

// User dropdown menu items
const userMenuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

const AuthHeader = () => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  // Close mobile menu when route changes
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
            className={`flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-colors ${
              isMobile ? 'w-full justify-start' : ''
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-8 h-8 rounded-full border-2 border-white/20"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {userInitial}
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium truncate max-w-24">
                {session.user.name || session.user.email?.split('@')[0] || 'User'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
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
      <div className={`flex items-center gap-3 ${isMobile ? 'flex-col w-full' : ''}`}>
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
    <header className="bg-base-200/80 backdrop-blur-sm border-b border-base-300/50">
      <nav
        className="container flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0"
            href="/"
            title={`${config.appName} homepage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8"
              placeholder="blur"
              priority={true}
              width={48}
              height={48}
            />
            <span className="font-extrabold text-lg">{config.appName}</span>
          </Link>
        </div>

        {/* Mobile burger button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-base-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover text-sm font-medium transition-colors hover:text-[#667eea]"
              title={link.label}
              onClick={(e) => {
                if (link.href.startsWith('/#')) {
                  e.preventDefault();
                  handleNavClick(link.href);
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop authentication/user menu */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1">
          <UserProfile />
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile menu panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200/95 backdrop-blur-xl sm:max-w-sm border-l border-base-300/50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  className="flex items-center gap-2 shrink-0"
                  title={`${config.appName} homepage`}
                  href="/"
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={logo}
                    alt={`${config.appName} logo`}
                    className="w-8"
                    placeholder="blur"
                    priority={true}
                    width={48}
                    height={48}
                  />
                  <span className="font-extrabold text-lg">{config.appName}</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile navigation links */}
              <div className="space-y-4 mb-8">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="block py-2 text-base font-medium link link-hover transition-colors hover:text-[#667eea]"
                    title={link.label}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile user menu */}
              <div className="border-t border-base-300/50 pt-6">
                {status === 'authenticated' && session.user ? (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {/* User info */}
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 rounded-xl">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-10 h-10 rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-semibold">
                          {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{session.user.name || 'Educator'}</p>
                        <p className="text-sm text-gray-600 truncate">{session.user.email}</p>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="space-y-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300/50 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Sign out */}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                ) : (
                  <UserProfile isMobile={true} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AuthHeader;
