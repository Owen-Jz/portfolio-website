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

  // Set isReady to true after a slight delay to ensure content is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100); // Small delay to ensure initial render completes
    return () => clearTimeout(timer);
  }, []);

  const sectionVariants = {
    hidden: {
      opacity: 1, // Start fully visible to avoid initial blur
      y: 0, // No initial offset
      transition: { duration: 0 }, // No transition on initial load
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
    },
    outOfView: {
      opacity: 0.5, // Slight fade when out of view
      y: 20, // Slight upward movement when out of view
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id={id} // Add id for navigation
      ref={ref}
      variants={sectionVariants}
      initial="hidden" // Start with no offset or fade
      animate={isReady ? (inView ? "visible" : "outOfView") : "hidden"} // Animate only when ready
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
