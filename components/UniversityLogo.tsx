"use client";

import React from "react";
import { motion } from "framer-motion";

interface UniversityLogoProps {
  name: string;
  className?: string;
}

const UniversityLogo: React.FC<UniversityLogoProps> = ({ name, className = "" }) => {
  return (
    <motion.div
      className={`flex items-center justify-center px-6 py-2 bg-white/5 backdrop-blur-sm rounded-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="text-sm font-medium opacity-70">{name}</span>
    </motion.div>
  );
};

export default UniversityLogo;
