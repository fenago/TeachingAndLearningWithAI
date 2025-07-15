"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Dock, DockIcon } from '@/components/magicui/dock';
import {
    HomeIcon,
    ExclamationTriangleIcon,
    BookOpenIcon,
    ChatBubbleLeftRightIcon,
    CreditCardIcon,
    QuestionMarkCircleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { motion, useScroll } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false); // Scrolling down
        } else {
            setIsVisible(true); // Scrolling up
        }
        lastScrollY.current = currentScrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
            style={{ scaleX: scrollYProgress }}
        />
        <motion.div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div className="flex items-center justify-center gap-4 p-2 bg-background/50 backdrop-blur-md rounded-full border">
                <div className="px-4">
                    <AnimatedLogo />
                </div>

                <Dock direction="middle" gap={12}>
                    <DockIcon className="p-2.5 group">
                        <a href="/#hero" className="relative">
                            <HomeIcon className="w-6 h-6" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Home</span>
                        </a>
                    </DockIcon>
                    <DockIcon className="p-2.5 group">
                        <a href="/#problem" className="relative">
                            <ExclamationTriangleIcon className="w-6 h-6" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Problem</span>
                        </a>
                    </DockIcon>
                    <DockIcon className="p-2.5 group">
                        <a href="/#chapters" className="relative">
                            <BookOpenIcon className="w-6 h-6" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chapters</span>
                        </a>
                    </DockIcon>
                    <DockIcon className="p-2.5 group">
                        <a href="/about-author" className="relative">
                            <UserIcon className="w-6 h-6" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Dr. Lee</span>
                        </a>
                    </DockIcon>
                    <DockIcon className="p-2.5 group">
                        <a href="/#social-proof" className="relative">
                            <ChatBubbleLeftRightIcon className="w-6 h-6" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Reviews</span>
                        </a>
                    </DockIcon>
                    <DockIcon className="p-2.5 group">
                        <a href="/#pricing" className="relative">
                            <CreditCardIcon className="w-6 h-6" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Pricing</span>
                        </a>
                    </DockIcon>
                    <DockIcon className="p-2.5 group">
                        <a href="/#faq" className="relative">
                            <QuestionMarkCircleIcon className="w-6 h-6" />
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">FAQ</span>
                        </a>
                    </DockIcon>
                </Dock>

                {/* Placeholder for CTA Button */}
                <motion.button 
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full mx-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get the Book
                </motion.button>
            </div>
        </motion.div>
        </>
    );
};

export default Navbar;
