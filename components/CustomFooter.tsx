'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Linkedin, Youtube, Mail, ChevronDown, Send, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/learningscience', color: 'hover:text-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/learningscience', color: 'hover:text-blue-600' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@learningscience', color: 'hover:text-red-500' },
];

const footerLinks = {
  product: [
    { name: 'Digital Book', href: '#pricing' },
    { name: 'Workshop', href: '#workshop' },
    { name: 'Free Chapter', href: '#download' },
  ],
  support: [
    { name: 'Contact', href: 'mailto:support@learningscience.ai' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Refund Policy', href: '/refunds' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
};

export default function CustomFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubscribed(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 5000);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company info and bio */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">LearningScience.ai</h3>
            <p className="text-gray-400 mb-4">
              Transforming education through productive struggle and AI integration.
            </p>
            
            {/* Dr. Lee bio section */}
            <motion.div className="mt-6">
              <button
                onClick={() => setBioExpanded(!bioExpanded)}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span className="font-semibold">About Dr. Sarah Lee</span>
                <motion.div
                  animate={{ rotate: bioExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {bioExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                      Dr. Sarah Lee is a leading expert in AI-enhanced education with over 15 years 
                      of experience. Former Stanford researcher, she's pioneered the productive struggle 
                      methodology that has helped over 10,000 educators transform their teaching approach.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Get Weekly AI Teaching Tips</h3>
            <p className="text-gray-400 mb-4">
              Join 5,000+ educators receiving practical AI integration strategies every Tuesday
            </p>
            
            <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                    />
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Subscribe
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-3 py-3 px-6 bg-green-900/50 border border-green-700 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">
                      Successfully subscribed! Check your email.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2024 LearningScience.ai. All rights reserved.
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-gray-400 transition-colors ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 max-w-md text-center md:text-right">
              Testimonials reflect individual experiences. Results may vary.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto');
  
  return (
    <motion.div className="relative inline-block">
      {isExternal ? (
        <a
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          className="text-gray-400 hover:text-white transition-colors relative group"
        >
          <span className="flex items-center gap-1">
            {children}
            {href.startsWith('http') && <ExternalLink className="w-3 h-3 opacity-50" />}
          </span>
          <motion.span
            className="absolute -bottom-0.5 left-0 h-0.5 bg-purple-500"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.2 }}
          />
        </a>
      ) : (
        <Link href={href} className="text-gray-400 hover:text-white transition-colors relative group">
          {children}
          <motion.span
            className="absolute -bottom-0.5 left-0 h-0.5 bg-purple-500"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.2 }}
          />
        </Link>
      )}
    </motion.div>
  );
}
