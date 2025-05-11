// components/AnimatedSection.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({ children, className, threshold = 0.2, id }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow animation every time it enters/leaves view
    threshold: threshold, // Percentage of element in view to trigger
  });

  const sectionVariants = {
    hidden: {
      opacity: 0.3, // Start slightly visible to show something is there
      filter: "blur(8px)", // Start blurred
      y: 30, // Optional: slight upward movement on enter
      transition: { duration: 0.5, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)", // Unblur
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  };

  return (
    <motion.section
      id={id} // Add id for navigation
      ref={ref}
      variants={sectionVariants}
      initial="hidden" // Start hidden (blurred)
      animate={inView ? "visible" : "hidden"} // Animate based on inView state
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
