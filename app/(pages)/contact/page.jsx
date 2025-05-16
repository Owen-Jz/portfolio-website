"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import { cn } from "../../libs/utils";
import { sendEmail } from "./actions";
import { projectsData } from "../../components/projectinfo";

// Project Card component
const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.99,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full h-full"
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex flex-col h-full border border-gray-600 rounded-3xl overflow-hidden min-h-[400px] bg-gray-800/30 backdrop-blur-sm">
        <div className="relative aspect-[4/3] w-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent z-10" />
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.4 },
            }}
          />
          <div className="absolute top-4 left-4 z-20">
            <motion.div
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: project.color }}
              whileHover={{ scale: 1.05 }}
            >
              {project.category}
            </motion.div>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white/90 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base line-clamp-2 flex-grow">
            {project.description}
          </p>
          <div className="flex flex-row flex-wrap gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.div
            className="pt-3 flex items-center space-x-2 text-white cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <Link href={project.link} className="flex items-center gap-2">
              <span className="font-medium text-sm sm:text-base">
                View Project
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

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
    <div className="min-h-screen flex flex-col">
      <NavbarDemo />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Contact Form Section */}
          <motion.section
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-600 hover:border-[#b02222] transition-colors duration-300"
              variants={containerVariants}
            >
              <motion.div
                className="flex flex-col items-center text-center mb-12"
                variants={itemVariants}
              >
                <motion.p
                  className="text-[#b02222] text-xl md:text-2xl font-bold font-['Manrope'] uppercase leading-7 mb-4"
                  variants={itemVariants}
                >
                  Get in Touch
                </motion.p>
                <motion.h1
                  className="text-3xl md:text-5xl font-normal font-['Manrope'] text-white leading-tight"
                  variants={itemVariants}
                >
                  Let's Build Something Amazing
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-gray-300 font-medium font-['Manrope'] mt-4 max-w-2xl"
                  variants={itemVariants}
                >
                  Got a project or question? Send me a message, and I'll get
                  back to you as soon as possible.
                </motion.p>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-2xl mx-auto w-full"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-300 font-['Manrope'] block mb-2"
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
                      "focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] font-['Manrope']",
                      "transition-all duration-300 hover:border-[#b02222]"
                    )}
                    required
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-300 font-['Manrope'] block mb-2"
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
                      "focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] font-['Manrope']",
                      "transition-all duration-300 hover:border-[#b02222]"
                    )}
                    required
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-300 font-['Manrope'] block mb-2"
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
                      "focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] font-['Manrope']",
                      "transition-all duration-300 resize-none hover:border-[#b02222]"
                    )}
                    required
                    whileHover={{ scale: 1.01 }}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full px-6 py-3 bg-gradient-to-r from-[#b02222] to-[#d38787] text-white rounded-xl font-semibold font-['Manrope']",
                      "relative overflow-hidden transition-all duration-300",
                      "hover:shadow-[0_0_20px_rgba(176,34,34,0.3)]",
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
                        "text-sm font-['Manrope'] text-center mt-4",
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
      <FooterSection />
    </div>
  );
};

export default ContactPage;
