"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "../libs/utils";

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    mobileHidden: { opacity: 0, y: 100 },
    mobileVisible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="py-16 bg-transparent">
      <motion.div
        className="mx-auto px-4 sm:px-6 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Heading */}
        <motion.div className="text-center mb-12" variants={headingVariants}>
          <p className="text-[#b02222] text-xl md:text-2xl font-bold font-['Manrope'] uppercase leading-7">
            Let’s Connect
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-normal font-['Manrope'] leading-tight">
            Why Not Hire Me for Your Next Project?
          </h2>
          <p className="text-gray-400 text-lg mt-4 font-['Manrope']">
            Let’s make something awesome together!
          </p>
        </motion.div>

        {/* Button Card */}
        <motion.div
          className="relative max-w-md mx-auto"
          variants={cardVariants}
          initial={["hidden", "mobileHidden"]}
          animate={
            inView ? ["visible", "mobileVisible"] : ["hidden", "mobileHidden"]
          }
          whileHover={{ scale: 1.02, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Spotlight Effect */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-3xl pointer-events-none"
            animate={{ opacity: inView ? 0.6 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Card */}
          <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 hover:border-[#b02222] transition-colors duration-300">
            <motion.a
              href="/contact"
              className="block w-full px-6 py-3 bg-gradient-to-r from-[#b02222] to-[#d38787] text-white rounded-full font-semibold text-center font-['Manrope'] relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(176, 34, 34, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Drop Me a Line
              <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
