"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = "",
  speed = 40,
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    // Initial delay before typing starts
    if (!isTyping && currentIndex === 0) {
      timer = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }

    // Start typing once delay is complete
    if (isTyping && currentIndex < text.length) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, [text, currentIndex, speed, delay, isTyping]);

  return (
    <span className={className}>
      {displayText}
      {isTyping && currentIndex < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-current animate-blink ml-[1px]"></span>
      )}
    </span>
  );
};

export default TypewriterText;
