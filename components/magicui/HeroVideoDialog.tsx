'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface HeroVideoDialogProps {
  videoSrc?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  children?: React.ReactNode;
}

export function HeroVideoDialog({
  videoSrc = 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
  thumbnailSrc = '/api/placeholder/800/450',
  thumbnailAlt = 'Video thumbnail',
  children
}: HeroVideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Video trigger button */}
      <motion.div
        className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <motion.div
            className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="w-8 h-8 text-gray-900 ml-1" />
          </motion.div>
        </div>
      </motion.div>

      {/* Custom content below video */}
      {children && (
        <div className="mt-8">
          {children}
        </div>
      )}

      {/* Video dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Video container */}
            <motion.div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <iframe
                src={videoSrc}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
