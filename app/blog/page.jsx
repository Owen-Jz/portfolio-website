"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { NavbarDemo } from "../components/ui/ResizableNavbar";
import FooterSection from "../components/FooterSection";
import { cn } from "../libs/utils";

const BlogComingSoon = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDemo />
      <main className="flex-grow flex items-center justify-center py-16">
        <motion.section
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="p-8 md:p-12 border border-dark-600 rounded-xl max-w-3xl mx-auto text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-dark-text-primary font-['Manrope'] mb-6"
            variants={sectionVariants}
          >
            Blog Coming Soon
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-dark-text-secondary font-['Manrope'] mb-8"
            variants={sectionVariants}
          >
            Stay tuned for insights on UI/UX design, web development, and
            creative inspiration.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={sectionVariants}
          >
            <input
              type="email"
              placeholder="Enter your email for updates"
              className={cn(
                "px-4 py-3 border border-dark-600 rounded-full text-dark-text-secondary",
                "focus:outline-none focus:border-brandRed w-full sm:w-64 font-['Manrope']"
              )}
              disabled
            />
            <button
              className={cn(
                "px-6 py-3 text-base font-semibold text-white rounded-full",
                "bg-gradient-to-r from-brandRed to-[#d38787] hover:from-brandRed-dark hover:to-brandRed",
                "transition-all duration-300 font-['Manrope'] shadow-lg hover:shadow-xl"
              )}
              disabled
            >
              Subscribe
            </button>
          </motion.div>
        </motion.section>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogComingSoon;
