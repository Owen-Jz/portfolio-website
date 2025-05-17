"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "../../libs/utils";
import { sendEmail } from "./actions";

const ContactPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setStatus({ type: "success", message: result.message });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: result.message || "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Contact Form Section */}
        <motion.section
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Spotlight Effects */}
          {/* <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-3xl pointer-events-none opacity-60"
            animate={{ opacity: inView ? 0.6 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#b02222] to-[#d38787] rounded-full blur-3xl pointer-events-none opacity-40"
            animate={{ opacity: inView ? 0.4 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          /> */}

          <motion.div
            className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-600 hover:border-[#b02222] transition-colors duration-300 mx-4 sm:mx-6 lg:mx-8"
            variants={containerVariants}
          >
            <motion.div
              className="flex flex-col items-center text-center mb-8 sm:mb-12"
              variants={itemVariants}
            >
              <motion.p
                className="text-[#b02222] text-lg sm:text-xl md:text-2xl font-bold uppercase leading-7 mb-3 sm:mb-4"
                variants={itemVariants}
              >
                Get in Touch
              </motion.p>
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight px-4 sm:px-0"
                variants={itemVariants}
              >
                Let's Build Something Amazing
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-300 font-medium mt-3 sm:mt-4 max-w-2xl px-4 sm:px-0"
                variants={itemVariants}
              >
                Got a project or question? Send me a message, and I'll get back
                to you as soon as possible.
              </motion.p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6 max-w-2xl mx-auto w-full px-4 sm:px-0"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Name
                </label>
                <motion.input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={cn(
                    "w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-300",
                    "placeholder-gray-500",
                    "focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222]",
                    "transition-all duration-300 hover:border-[#b02222]",
                    "text-base sm:text-lg"
                  )}
                  required
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Email
                </label>
                <motion.input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={cn(
                    "w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-300",
                    "placeholder-gray-500",
                    "focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222]",
                    "transition-all duration-300 hover:border-[#b02222]",
                    "text-base sm:text-lg"
                  )}
                  required
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-300 block mb-2"
                >
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className={cn(
                    "w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-300",
                    "placeholder-gray-500",
                    "focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222]",
                    "transition-all duration-300 resize-none hover:border-[#b02222]",
                    "text-base sm:text-lg"
                  )}
                  required
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full px-6 py-3 bg-gradient-to-r from-[#b02222] to-[#d38787] text-white rounded-xl font-semibold",
                    "relative overflow-hidden transition-all duration-300",
                    "hover:shadow-[0_0_20px_rgba(176,34,34,0.3)]",
                    "text-base sm:text-lg",
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <motion.span
                    className="absolute inset-0 bg-white/30"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 2, opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {status && (
                  <motion.p
                    className={cn(
                      "text-sm sm:text-base text-center mt-4",
                      status.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    )}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
};

export default ContactPage;
