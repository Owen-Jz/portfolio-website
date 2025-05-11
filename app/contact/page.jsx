"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { NavbarDemo } from "../components/ui/ResizableNavbar";
import FooterSection from "../components/FooterSection";
import { cn } from "../libs/utils";

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

    console.log("Submitting form:", formData);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API response:", result);

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: result.error || "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        type: "error",
        message:
          "Something went wrong. Please try again or use the email link.",
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

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      borderColor: "#B02222", // brandRed
      transition: { duration: 0.3 },
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
          className="p-8 md:p-12 border border-dark-600 rounded-xl max-w-5xl mx-auto w-full"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-dark-text-primary font-['Manrope'] mb-6 text-center"
            variants={sectionVariants}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-dark-text-secondary font-medium font-['Manrope'] mb-8 text-center max-w-2xl mx-auto"
            variants={sectionVariants}
          >
            Got a project or question? Send me a message, and let’s build
            something amazing together.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            variants={sectionVariants}
          >
            {/* Email Link */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <motion.div variants={sectionVariants}>
                <Link
                  href="mailto:owendigitals@gmail.com"
                  className={cn(
                    "inline-block px-8 py-4 text-lg font-semibold text-white rounded-full",
                    "bg-gradient-to-r from-brandRed to-[#d38787] hover:from-brandRed-dark hover:to-brandRed",
                    "transition-all duration-300 font-['Manrope'] shadow-lg hover:shadow-[0_0_10px_rgba(176,34,34,0.3)] hover:scale-105"
                  )}
                >
                  Email: owendigitals@gmail.com
                </Link>
              </motion.div>
              <motion.p
                className="text-dark-text-secondary mt-4 font-['Manrope']"
                variants={sectionVariants}
              >
                I’ll respond within 24 hours.
              </motion.p>
            </div>
            {/* Contact Form */}
            <div className="flex flex-col space-y-6">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={sectionVariants}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-dark-text-secondary font-['Manrope'] block mb-1"
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
                      "w-full px-4 py-3 border border-dark-600 rounded-md text-dark-text-secondary",
                      "placeholder-dark-text-secondary placeholder-opacity-75",
                      "focus:outline-none focus:border-brandRed font-['Manrope']"
                    )}
                    required
                    variants={inputVariants}
                    whileHover="hover"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-dark-text-secondary font-['Manrope'] block mb-1"
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
                      "w-full px-4 py-3 border border-dark-600 rounded-md text-dark-text-secondary",
                      "placeholder-dark-text-secondary placeholder-opacity-75",
                      "focus:outline-none focus:border-brandRed font-['Manrope']"
                    )}
                    required
                    variants={inputVariants}
                    whileHover="hover"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-dark-text-secondary font-['Manrope'] block mb-1"
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
                      "w-full px-4 py-3 border border-dark-600 rounded-md text-dark-text-secondary",
                      "placeholder-dark-text-secondary placeholder-opacity-75",
                      "focus:outline-none focus:border-brandRed font-['Manrope'] resize-none"
                    )}
                    required
                    variants={inputVariants}
                    whileHover="hover"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full px-6 py-3 text-base font-semibold text-brandRed rounded-md",
                    "border border-brandRed hover:bg-brandRed hover:text-white",
                    "transition-all duration-300 font-['Manrope'] shadow-lg hover:shadow-[0_0_10px_rgba(176,34,34,0.3)]",
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                  variants={sectionVariants}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.form>
              {status && (
                <motion.p
                  className={cn(
                    "text-sm font-['Manrope'] text-center",
                    status.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {status.message}
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.section>
      </main>
      <FooterSection />
    </div>
  );
};

export default ContactPage;
