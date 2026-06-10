"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { Parallax, WordReveal } from "./gsap/ScrollFX";

const experiences = [
  {
    company: "Two Lions",
    period: "May 2026 – Present",
    role: "Full Stack Design Engineer",
    type: "Startup Studio",
    current: true,
    details: [
      "Driving end-to-end product design and full-stack development across the studio's portfolio of AI and deep tech ventures.",
      "Building scalable, production-ready interfaces and backend systems for early-stage startups from concept to launch.",
      "Bridging design and engineering to rapidly ship products across diverse verticals including AI, automation, and blockchain.",
    ],
    tags: ["Full Stack", "Product Design", "AI / Deep Tech"],
  },
  {
    company: "Naija Diaspora Hub",
    period: "Sep 2025 – Present",
    role: "Lead Product Designer & Frontend Developer",
    type: "Community Platform",
    current: false,
    details: [
      "Leading the end-to-end product design and frontend development for a global diaspora community platform.",
      "Architecting a scalable design system and implementing responsive interfaces using modern frameworks.",
      "Collaborating with cross-functional teams to deliver a seamless user experience for the global community.",
    ],
    tags: ["Product Design", "React", "Design Systems"],
  },
  {
    company: "Silicon Delta",
    period: "Jul 2024 – Feb 2025",
    role: "UI/UX Designer",
    type: "EdTech",
    current: false,
    details: [
      "Designed a comprehensive Learning Management System tailored for Nigerian institutions.",
      "Collaborated closely with engineering teams to ensure pixel-perfect implementation.",
      "Balanced technical constraints with user-centric design principles for maximum accessibility.",
    ],
    tags: ["UI/UX", "LMS Design", "Accessibility"],
  },
  {
    company: "RainShield Global",
    period: "Jun 2024 – Dec 2024",
    role: "UI/UX Designer & Brand Identity Developer",
    type: "Fintech",
    current: false,
    details: [
      "Spearheaded the complete brand identity overhaul for this emerging fintech platform.",
      "Architected an innovative, trust-centric UI/UX design system from the ground up.",
      "Optimized user flows to enhance efficiency and usability for diverse customer segments.",
    ],
    tags: ["Brand Identity", "Fintech", "UX Strategy"],
  },
  {
    company: "Carb",
    period: "2022 – 2023",
    role: "UI/UX Designer & Brand Identity Developer",
    type: "Mobility",
    current: false,
    details: [
      "Established a distinctive visual identity for a competitive e-hailing startup.",
      "Designed dual-sided application interfaces for both riders and drivers.",
      "Prioritized functional aesthetics to drive user acquisition and retention.",
    ],
    tags: ["Branding", "Mobile App", "Dual-Platform"],
  },
];

const ExperienceCard = ({ experience, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
          experience.current
            ? "bg-gradient-to-br from-[#b02222]/[0.08] to-[#151515]/80 border-[#b02222]/20 hover:border-[#b02222]/40 shadow-[0_0_40px_rgba(176,34,34,0.08)]"
            : "bg-[#111]/60 border-white/[0.06] hover:border-white/[0.12]"
        }`}
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-500 ${
            experience.current
              ? "bg-[#b02222]"
              : "bg-white/[0.06] group-hover:bg-[#b02222]/40"
          }`}
        />

        <div className="grid md:grid-cols-[240px_1fr]">
          <div className="p-6 md:p-8 md:border-r border-white/[0.04]">
            <div className="text-[72px] md:text-[80px] font-black leading-none text-white/[0.04] font-manrope select-none -mb-4">
              {num}
            </div>

            {experience.current && (
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                  Current
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-white/40 text-xs font-mono tracking-wide mb-2">
              <Calendar size={12} />
              <span>{experience.period}</span>
            </div>

            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium text-white/30 bg-white/[0.04]">
              {experience.type}
            </span>
          </div>

          <div className="p-6 md:p-8 pt-0 md:pt-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 font-manrope group-hover:text-[#b02222] transition-colors duration-300">
              {experience.company}
            </h3>
            <p className="text-white/50 text-base md:text-lg font-medium mb-5">
              {experience.role}
            </p>

            <ul className="space-y-2.5 mb-6">
              {experience.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-white/55 text-[13px] md:text-sm leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-[#b02222]/50 mt-[7px] flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {experience.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] text-white/35 text-[11px] font-medium tracking-wide border border-white/[0.04] group-hover:text-white/50 group-hover:border-white/[0.08] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progressHeight = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-[#0a0a0a]"
      id="experience"
    >
      <Parallax
        speed={0.5}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none"
      />
      <Parallax
        speed={-0.35}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
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
            <WordReveal
              text="Professional Journey"
              highlight="Journey"
              as="h2"
              className="text-4xl md:text-6xl font-bold font-manrope text-white mb-6"
            />
            <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
              A curated timeline of my professional career, highlighting key
              roles, impactful projects, and technical milestones.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute -left-8 top-0 bottom-0 w-px bg-white/[0.04]">
            <motion.div
              className="w-full bg-gradient-to-b from-[#b02222] to-[#b02222]/30 origin-top"
              style={{ height: progressHeight }}
            />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
