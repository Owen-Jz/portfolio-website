"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ReadingProgress
 * A thin gradient bar pinned to the very top of the viewport that fills
 * left-to-right as the reader scrolls through the article. Spring-smoothed
 * so it feels fluid rather than jumpy.
 */
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-[#b02222] via-[#e0a0a0] to-[#b02222] shadow-[0_0_12px_rgba(176,34,34,0.6)]"
    />
  );
};

export default ReadingProgress;
