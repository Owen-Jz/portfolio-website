"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavbarDemo } from "../../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import GlassCard from "../../components/ui/GlassCard";
import { ArrowRight, FileText, Map, Palette, MousePointer, Code, Rocket } from "lucide-react";

const PHASES = [
  {
    number: 1,
    name: "Discovery",
    description:
      "Deep-dive research into your users, market, and competitors. I conduct stakeholder interviews and gather insights to understand the problem space fully.",
    deliverable: "Project Brief",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    number: 2,
    name: "Strategy",
    description:
      "Define clear goals, map user personas, and establish information architecture. This is where we align business objectives with user needs.",
    deliverable: "Roadmap",
    icon: <Map className="w-5 h-5" />,
  },
  {
    number: 3,
    name: "Design",
    description:
      "From low-fidelity wireframes to high-fidelity mockups in Figma. I build a comprehensive design system ensuring consistency across every component.",
    deliverable: "Design System & Mockups",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    number: 4,
    name: "Prototype",
    description:
      "Transform static designs into interactive, clickable prototypes. Realistic interactions let us validate flows and catch issues before development.",
    deliverable: "Clickable Prototype",
    icon: <MousePointer className="w-5 h-5" />,
  },
  {
    number: 5,
    name: "Handoff",
    description:
      "Developer-friendly documentation with annotated specs, design tokens, and component guidelines. I collaborate closely with engineers to ensure fidelity.",
    deliverable: "Annotated Designs",
    icon: <Code className="w-5 h-5" />,
  },
  {
    number: 6,
    name: "Launch & Iterate",
    description:
      "Rigorous QA, smooth deployment, and post-launch monitoring. I track metrics and gather feedback to drive continuous improvement.",
    deliverable: "Live Product",
    icon: <Rocket className="w-5 h-5" />,
  },
];

const PhaseCard = ({ phase, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="relative pl-12 md:pl-16"
    >
      {/* Timeline connector (line + dot) */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
        {/* Vertical line - hide for last item */}
        {index < PHASES.length - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-[#b02222] to-[#b02222]/20 mt-8" />
        )}
      </div>

      {/* Number badge */}
      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#b02222] flex items-center justify-center text-white text-sm font-bold font-manrope shadow-lg shadow-[#b02222]/30 z-10">
        {phase.number}
      </div>

      <GlassCard className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-white/80">
            {phase.icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-manrope text-white">
            {phase.name}
          </h3>
        </div>

        <p className="text-white/60 font-manrope text-base leading-relaxed mb-6">
          {phase.description}
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b02222]/40 bg-[#b02222]/10 text-[#b02222] text-sm font-manrope font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b02222]" />
          Deliverable: {phase.deliverable}
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-sm font-manrope text-white/80">The Blueprint</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-manrope leading-tight mb-4">
              My Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">Process</span>
            </h1>
            <p className="text-lg text-white/60 font-manrope max-w-2xl mx-auto">
              A structured approach to transforming ideas into polished, high-impact products — from first insight to live launch.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-6">
            {PHASES.map((phase, index) => (
              <PhaseCard key={phase.number} phase={phase} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16 pt-8"
          >
            <p className="text-white/60 font-manrope mb-4">
              Interested in working together?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#b02222] text-white font-manrope font-semibold hover:bg-[#991d1d] transition-colors shadow-lg shadow-[#b02222]/20"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}