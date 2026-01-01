"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, Building2 } from "lucide-react";

const GlassCard = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[#151515]/50 backdrop-blur-xl transition-all duration-500 ${
        hoverEffect
          ? "hover:border-white/20 hover:bg-[#151515]/70 hover:shadow-[0_0_30px_rgba(176,34,34,0.15)] hover:-translate-y-2"
          : ""
      } ${className}`}
    >
      <div className="absolute -left-10 -top-10 w-[150px] h-[150px] bg-[#b02222]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

const ExperienceCard = ({ experience, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <GlassCard className="flex flex-col h-full group p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#b02222] group-hover:bg-[#b02222]/10 transition-colors">
              <Building2 size={24} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-manrope group-hover:text-[#b02222] transition-colors">
                {experience.company}
              </h3>
              <p className="text-white/60 text-sm sm:text-base font-medium">
                {experience.role}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 w-fit">
            <Calendar size={14} className="text-[#b02222]" />
            <span className="text-xs sm:text-sm text-white/60 font-mono">{experience.period}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/5 mb-6" />

        {/* Details */}
        <ul className="space-y-4 flex-grow">
          {experience.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70 text-sm sm:text-base leading-relaxed">
              <CheckCircle2 
                size={18} 
                className="text-[#b02222] flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" 
              />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <Briefcase className="text-white/5 w-24 h-24 -mr-8 -mt-8 rotate-12" />
        </div>
      </GlassCard>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      company: "RainShield Global",
      period: "June 2024 – Present",
      role: "UI/UX Designer & Brand Identity Developer",
      details: [
        "Spearheaded the complete brand identity overhaul for this emerging fintech platform.",
        "Architected an innovative, trust-centric UI/UX design system from the ground up.",
        "Optimized user flows to enhance efficiency and usability for diverse customer segments.",
      ],
    },
    {
      company: "Silicon Delta",
      period: "July 2024 – Present",
      role: "UI/UX Designer",
      details: [
        "Designing a comprehensive Learning Management System (LMS) tailored for Nigerian institutions.",
        "Collaborating closely with engineering teams to ensure pixel-perfect implementation.",
        "Balancing technical constraints with user-centric design principles for maximum accessibility.",
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

  return (
<<<<<<< HEAD
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <motion.h2
          className="text-white text-3xl md:text-5xl font-normal font-['Manrope'] text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Experience
        </motion.h2>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
=======
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]" id="experience">
       {/* Background Elements */}
       <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />
       
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
           >
              <h2 className="text-4xl md:text-5xl font-bold font-manrope text-white mb-6">
                Professional Journey
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-lg">
                A timeline of my professional career, highlighting key roles and contributions in design and development.
              </p>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
>>>>>>> df230af (feat: Implement a comprehensive portfolio website with blog, admin panel, project pages, and various UI components.)
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
