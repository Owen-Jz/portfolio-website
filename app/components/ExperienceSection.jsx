"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, Building2, Globe } from "lucide-react";

const experiences = [
  {
    company: "Naija Diaspora Hub",
    period: "September 2025 – Present",
    role: "Lead Product Designer & Frontend Developer",
    details: [
      "Leading the end-to-end product design and frontend development for a global diaspora community platform.",
      "Architecting a scalable design system and implementing responsive interfaces using modern frameworks.",
      "Collaborating with cross-functional teams to deliver a seamless user experience for the global community.",
    ],
  },
  {
    company: "Silicon Delta",
    period: "July 2024 – February 2025",
    role: "UI/UX Designer",
    details: [
      "Designing a comprehensive Learning Management System (LMS) tailored for Nigerian institutions.",
      "Collaborating closely with engineering teams to ensure pixel-perfect implementation.",
      "Balancing technical constraints with user-centric design principles for maximum accessibility.",
    ],
  },
  {
    company: "RainShield Global",
    period: "June 2024 – December 2024",
    role: "UI/UX Designer & Brand Identity Developer",
    details: [
      "Spearheaded the complete brand identity overhaul for this emerging fintech platform.",
      "Architected an innovative, trust-centric UI/UX design system from the ground up.",
      "Optimized user flows to enhance efficiency and usability for diverse customer segments.",
    ],
  },
  {
    company: "Carb",
    period: "2022 - 2023",
    role: "UI/UX Designer & Brand Identity Developer",
    details: [
      "Established a distinctive visual identity for a competitive e-hailing startup.",
      "Designed dual-sided application interfaces for both riders and drivers.",
      "Prioritized functional aesthetics to drive user acquisition and retention.",
    ],
  },
];

const TimelineItem = ({ experience, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${isEven ? "md:flex-row-reverse" : ""
        }`}
    >
      {/* Spacer for Desktop (Empty side) */}
      <div className="hidden md:block w-5/12" />

      {/* Center Dot for Desktop */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center z-10 h-full top-0 md:top-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-10 h-10 rounded-full bg-[#1a1a1a] border-2 border-[#b02222] shadow-[0_0_20px_rgba(176,34,34,0.4)] flex items-center justify-center mb-2"
        >
          <div className="w-3 h-3 rounded-full bg-white" />
        </motion.div>
        {/* Connector Line (Mobile only visual aid if needed, but the main line handles it) */}
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`w-full pl-20 md:pl-0 md:w-5/12 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"
          }`}
      >
        <div className="group relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-[#151515]/60 border border-white/5 backdrop-blur-xl hover:border-[#b02222]/30 hover:shadow-[0_0_30px_rgba(176,34,34,0.1)] transition-all duration-500">
          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#b02222]/0 to-[#b02222]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Header */}
            <div
              className={`flex flex-col gap-3 mb-6 ${isEven ? "md:items-end" : "md:items-start"
                }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#b02222] text-sm font-mono tracking-wider">
                <Calendar size={14} />
                <span>{experience.period}</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#b02222] transition-colors">{experience.company}</h3>
                <p className="text-white/60 text-lg font-medium">{experience.role}</p>
              </div>
            </div>

            {/* Divider */}
            <div className={`h-px w-full bg-white/10 mb-6 ${isEven ? "ml-auto" : "mr-auto"}`} />

            {/* Details */}
            <ul className={`space-y-3 ${isEven ? "items-end" : "items-start"}`}>
              {experience.details.map((detail, i) => (
                <li key={i} className={`flex gap-3 text-white/70 text-sm leading-relaxed ${isEven ? "flex-row-reverse md:text-right" : "flex-row text-left"}`}>
                  <CheckCircle2
                    size={16}
                    className="text-[#b02222] flex-shrink-0 mt-1 opacity-70"
                  />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef(null);

  // Decorative blobs for background
  return (
    <section
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-[#0a0a0a]"
      id="experience"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#b02222] font-mono text-sm mb-6">
              <Briefcase size={16} />
              <span className="uppercase tracking-widest">Career Path</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-manrope text-white mb-6">
              Professional <span className="text-[#b02222]">Journey</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
              A curated timeline of my professional career, highlighting key roles, impactful projects, and technical milestones.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Center Timeline Line */}
          <div className="absolute left-9 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#b02222] via-white/10 to-[#b02222] md:-translate-x-1/2 opacity-30" />

          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <TimelineItem key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
