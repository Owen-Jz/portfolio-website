"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const ContactItem = ({ icon: Icon, label, value, href }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
  >
    <div className="p-3 rounded-xl bg-white/5 text-white group-hover:bg-[#b02222] group-hover:text-white transition-colors duration-300">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white font-manrope font-medium text-sm md:text-base group-hover:text-white transition-colors">{value}</p>
    </div>
  </a>
);

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-[#0a0a0a]" id="contact">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column: Heading & CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b02222]/10 border border-[#b02222]/20 text-[#b02222] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b02222] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b02222]"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">Available for hire</span>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-manrope text-white mb-8 leading-[0.95] tracking-tight">
                Let's build <br />
                <span className="text-white/20">something</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-orange-600">legendary.</span>
              </h2>

              <p className="text-white/50 text-lg md:text-xl font-manrope max-w-lg mb-12 leading-relaxed">
                Have a vision in mind? I'm here to translate your ideas into cutting-edge digital reality. Let's talk about your next big move.
              </p>

              <Link href="/contact" className="inline-block group">
                <div className="relative overflow-hidden rounded-full bg-white px-8 py-5 flex items-center gap-4 transition-transform duration-300 hover:scale-105">
                  <span className="text-black font-bold text-lg font-manrope relative z-10">Start a Project</span>
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center relative z-10 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="text-white w-5 h-5" />
                  </div>
                  <div className="absolute inset-0 bg-gray-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Contact Details & Socials */}
          <div className="lg:pt-20">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-4"
            >
              <ContactItem
                icon={Mail}
                label="Email Me"
                value="official@owendigitals.work"
                href="mailto:official@owendigitals.work"
              />
              <ContactItem
                icon={MapPin}
                label="Location"
                value="Port Harcourt, Nigeria (Remote)"
                href="#"
              />

              <div className="h-px bg-white/10 my-4" />

              <p className="text-white/40 text-sm font-mono uppercase tracking-wider mb-4">Socials</p>
              <div className="grid grid-cols-2 gap-4">
                <ContactItem
                  icon={Linkedin}
                  label="LinkedIn"
                  value="Owen Digitals"
                  href="https://linkedin.com"
                />
                <ContactItem
                  icon={Twitter}
                  label="Twitter / X"
                  value="@owendigitals"
                  href="https://twitter.com"
                />
                <ContactItem
                  icon={Github}
                  label="GitHub"
                  value="@owendigitals"
                  href="https://github.com"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
