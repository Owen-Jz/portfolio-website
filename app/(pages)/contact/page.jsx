"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "../../libs/utils";
import { sendEmail } from "./actions";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";
import { Mail, MapPin, Linkedin, Twitter, Github, Send } from "lucide-react";

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-manrope text-white">
      {/* Background Elements */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
           
           {/* Left Column: Text & Info */}
           <motion.div
             initial="hidden"
             animate="visible"
             variants={fadeInUp}
             className="space-y-8"
           >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b02222]/10 border border-[#b02222]/20 text-[#b02222] mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b02222] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b02222]"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest">Contact Me</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Let's start <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-orange-600">a conversation.</span>
                </h1>
                
                <p className="text-xl text-white/50 max-w-lg leading-relaxed">
                    Interested in working together? Fill out the form or reach out directly. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
              </div>

              <div className="space-y-6">
                  <a href="mailto:hello@owendigitals.com" className="flex items-center gap-4 group">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:bg-[#b02222] group-hover:text-white transition-colors duration-300">
                          <Mail size={24} />
                      </div>
                      <div>
                          <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">Mail To</p>
                          <p className="text-lg font-medium">hello@owendigitals.com</p>
                      </div>
                  </a>

                  <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white">
                          <MapPin size={24} />
                      </div>
                      <div>
                          <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">Located In</p>
                          <p className="text-lg font-medium">Lagos, Nigeria (Remote)</p>
                      </div>
                  </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                   <p className="text-white/40 text-sm font-mono uppercase tracking-wider mb-6">Connect on Socials</p>
                   <div className="flex gap-4">
                       {[
                           { Icon: Linkedin, href: "https://linkedin.com" },
                           { Icon: Twitter, href: "https://twitter.com" },
                           { Icon: Github, href: "https://github.com" }
                       ].map(({ Icon, href }, idx) => (
                           <a 
                             key={idx}
                             href={href}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-[#b02222] hover:-translate-y-1 transition-all duration-300"
                           >
                               <Icon size={20} />
                           </a>
                       ))}
                   </div>
              </div>

           </motion.div>

           {/* Right Column: Form */}
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
           >
              <GlassCard className="p-8 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                      
                      <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-white/70">
                              Your Name
                          </label>
                          <input
                              id="name"
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className="w-full px-4 py-3 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] transition-colors"
                              required
                          />
                      </div>

                      <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-white/70">
                              Email Address
                          </label>
                          <input
                              id="email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              className="w-full px-4 py-3 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] transition-colors"
                              required
                          />
                      </div>

                      <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium text-white/70">
                              Your Message
                          </label>
                          <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell me about your project..."
                              rows={5}
                              className="w-full px-4 py-3 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#b02222] focus:ring-1 focus:ring-[#b02222] transition-colors resize-none"
                              required
                          />
                      </div>

                      <Button
                          type="submit"
                          disabled={isSubmitting}
                          variant="primary"
                          className="w-full flex justify-center items-center py-4 text-base"
                          withMotion={true}
                      >
                          {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  Sending...
                              </span>
                          ) : (
                              <span className="flex items-center gap-2">
                                  Send Message <Send size={16} />
                              </span>
                          )}
                      </Button>

                      <AnimatePresence>
                          {status && (
                              <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className={cn(
                                      "text-sm text-center p-3 rounded-lg bg-white/5 border",
                                      status.type === "success" ? "border-green-500/50 text-green-400" : "border-red-500/50 text-red-400"
                                  )}
                              >
                                  {status.message}
                              </motion.div>
                          )}
                      </AnimatePresence>

                  </form>
              </GlassCard>
           </motion.div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;
