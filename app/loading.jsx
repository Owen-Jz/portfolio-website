"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = ({ className = "" }) => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-neutral-950/80 ${className}`}
    >
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-t-neutral-600 border-neutral-300 dark:border-t-neutral-300 dark:border-neutral-600"
        variants={spinnerVariants}
        animate="animate"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
          backdropFilter: "blur(10px)",
        }}
      />
    </div>
  );
};
export default Loading;
