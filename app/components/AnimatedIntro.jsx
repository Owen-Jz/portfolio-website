"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedIntro = ({ onComplete, isFadingOut }) => {
  const text = "OWEN DIGITALS";
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Start fade-out after 2.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    // Complete and notify parent after fade-out completes
    const completeTimer = setTimeout(() => {
      onComplete && onComplete();
    }, 3500); // 2.5s + 1s fade-out duration

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: showIntro ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
    >
      <div className="text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4"
        >
          {text.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={item}
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #b02222 0%, #d38787 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Optional: Add a subtle subtitle or loading indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-gray-400 text-sm md:text-base"
        >
          Portfolio
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedIntro;
