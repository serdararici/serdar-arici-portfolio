"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number; // Initial delay before starting
  speed?: number; // Typing speed in ms
}

const TypewriterText = ({ text, delay = 1, speed = 100 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase: add one character at a time
        if (displayText.length < text.length) {
          setDisplayText(text.slice(0, displayText.length + 1));
          timeout = setTimeout(handleTyping, speed);
        } else {
          // Word completed: wait for 4 seconds then start deleting
          timeout = setTimeout(() => setIsDeleting(true), 4000);
        }
      } else {
        // Deleting phase: remove one character at a time
        if (displayText.length > 0) {
          setDisplayText(text.slice(0, displayText.length - 1));
          timeout = setTimeout(handleTyping, speed / 2); // Deleting is faster than typing
        } else {
          // Deleting completed: reset to typing phase
          setIsDeleting(false);
        }
      }
    };

    // Initial delay for the very first start
    if (displayText === "" && !isDeleting) {
      timeout = setTimeout(handleTyping, delay * 1000);
    } else {
      timeout = setTimeout(handleTyping, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text, speed, delay]);

  return (
    <span className="relative inline-flex items-center">
      <span className="text-primary">{displayText}</span>
      
      {/* Animated Cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="w-[3px] h-[1.1em] bg-primary ml-1 shadow-[0_0_8px_rgba(var(--primary),0.8)]"
      />
    </span>
  );
};

export default TypewriterText;