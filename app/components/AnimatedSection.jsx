// components/AnimatedSection.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({ children, className, threshold = 0.2, id }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allow animation every time it enters/leaves view
    threshold: threshold, // Percentage of element in view to trigger
  });

  // State to track if the component is ready (i.e., page is loaded)
  const [isReady, setIsReady] = useState(false);

  // Set isReady to true once the component mounts (page is loaded)
  useEffect(() => {
    setIsReady(true);
  }, []);

  const sectionVariants = {
    hidden: {
      opacity: 1, // Start fully visible to avoid initial blur
      filter: "blur(0px)", // No blur on initial load
      y: 0, // No initial offset
      transition: { duration: 0.5, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)", // Ensure no blur when visible
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
    outOfView: {
      opacity: 0.3, // Slight fade when out of view
      filter: "blur(8px)", // Apply blur when section leaves view
      y: 30, // Slight upward movement when out of view
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id={id} // Add id for navigation
      ref={ref}
      variants={sectionVariants}
      initial="hidden" // Start with no blur or offset
      animate={isReady ? (inView ? "visible" : "outOfView") : "hidden"} // Only animate when ready
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
