"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import ContactSection from "../../components/ContactSection";
import GlassCard from "../../components/ui/GlassCard";

// ─── Phase Animation Components ───────────────────────────────────────────────

const DiscoveryAnim = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="absolute rounded-full border border-[#b02222]/40"
        style={{
          width: `${28 + i * 22}px`,
          height: `${28 + i * 22}px`,
          animation: `radar-pulse 2s ease-out ${i * 0.6}s infinite`,
        }}
      />
    ))}
    <div className="w-3 h-3 rounded-full bg-[#b02222] shadow-[0_0_12px_#b02222]" />
    <style>{`
      @keyframes radar-pulse {
        0% { opacity: 0.8; transform: scale(1); }
        100% { opacity: 0; transform: scale(1.4); }
      }
    `}</style>
  </div>
);

const StrategyAnim = () => (
  <div className="relative w-20 h-20">
    <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible">
      <path
        d="M40 10 L40 30 M40 30 L20 50 M40 30 L60 50"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="path-draw"
        style={{
          strokeDasharray: 120,
          strokeDashoffset: 120,
          animation: "draw-line 2s ease-out 0.2s forwards infinite",
        }}
      />
      <circle cx="40" cy="10" r="4" fill="#b02222" className="dot-appear" style={{ animation: "dot-appear 0.3s ease-out 0.8s forwards", opacity: 0 }} />
      <circle cx="40" cy="30" r="4" fill="rgba(255,255,255,0.4)" className="dot-appear" style={{ animation: "dot-appear 0.3s ease-out 1.1s forwards", opacity: 0 }} />
      <circle cx="20" cy="50" r="4" fill="rgba(255,255,255,0.4)" className="dot-appear" style={{ animation: "dot-appear 0.3s ease-out 1.4s forwards", opacity: 0 }} />
      <circle cx="60" cy="50" r="4" fill="rgba(255,255,255,0.4)" className="dot-appear" style={{ animation: "dot-appear 0.3s ease-out 1.7s forwards", opacity: 0 }} />
    </svg>
    <style>{`
      @keyframes draw-line {
        to { stroke-dashoffset: 0; }
      }
      @keyframes dot-appear {
        to { opacity: 1; }
      }
    `}</style>
  </div>
);

const DesignAnim = () => (
  <div className="relative w-20 h-20 flex items-center justify-center gap-2">
    {[
      { color: "bg-[#b02222]", delay: "0s" },
      { color: "bg-[#d38787]", delay: "0.15s" },
      { color: "bg-white/60", delay: "0.3s" },
      { color: "bg-white/30", delay: "0.45s" },
    ].map((swatch, i) => (
      <div
        key={i}
        className={`w-4 h-14 rounded-full ${swatch.color}`}
        style={{
          animation: `swatch-shift 2.5s ease-in-out ${swatch.delay} infinite alternate`,
          transformOrigin: "center",
        }}
      />
    ))}
    <style>{`
      @keyframes swatch-shift {
        0% { transform: scaleY(0.6) rotate(-8deg); opacity: 0.5; }
        100% { transform: scaleY(1) rotate(8deg); opacity: 1; }
      }
    `}</style>
  </div>
);

const PrototypeAnim = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="w-10 h-16 rounded-xl border-2 border-white/20 bg-white/5 relative overflow-hidden">
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-white/20" />
      <div
        className="absolute left-1 top-4 w-8 h-3 rounded bg-[#b02222]/60"
        style={{ animation: "ui-slide 2s ease-in-out 0.3s infinite alternate" }}
      />
      <div
        className="absolute left-1 top-9 w-6 h-3 rounded bg-white/30"
        style={{ animation: "ui-slide 2s ease-in-out 0.7s infinite alternate" }}
      />
      <div
        className="absolute left-1 top-14 w-7 h-3 rounded bg-white/20"
        style={{ animation: "ui-slide 2s ease-in-out 1.1s infinite alternate" }}
      />
    </div>
    <style>{`
      @keyframes ui-slide {
        0% { opacity: 0.3; transform: translateX(-4px); }
        100% { opacity: 1; transform: translateX(2px); }
      }
    `}</style>
  </div>
);

const HandoffAnim = () => (
  <div className="relative w-20 h-20 flex items-center justify-center gap-1 font-mono text-sm text-white/50">
    <span style={{ animation: "bracket-bounce 2s ease-in-out 0s infinite" }}>{`{`}</span>
    <div className="flex flex-col gap-1 items-center">
      <div className="w-6 h-1.5 bg-white/20 rounded" style={{ animation: "type 1.5s steps(4) 0.3s infinite" }} />
      <div className="w-4 h-1.5 bg-[#b02222]/50 rounded" style={{ animation: "type 1.5s steps(3) 0.6s infinite" }} />
      <div className="w-5 h-1.5 bg-white/20 rounded" style={{ animation: "type 1.5s steps(4) 0.9s infinite" }} />
    </div>
    <span style={{ animation: "bracket-bounce 2s ease-in-out 0.2s infinite" }}>{`}`}</span>
    <style>{`
      @keyframes bracket-bounce {
        0%, 100% { opacity: 0.4; transform: translateX(-2px); }
        50% { opacity: 1; transform: translateX(2px); }
      }
      @keyframes type {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
    `}</style>
  </div>
);

const LaunchAnim = () => (
  <div className="relative w-20 h-20 flex flex-col items-center justify-end gap-1">
    <div className="relative">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#b02222]"
          style={{
            left: `${-6 + i * 6}px`,
            top: `${-i * 8}px`,
            animation: `dot-rise 1.5s ease-out ${i * 0.2}s infinite`,
            opacity: 0,
          }}
        />
      ))}
      <div
        className="w-3 h-3 rounded-full bg-[#b02222] shadow-[0_0_10px_#b02222]"
        style={{ animation: "rocket-float 1.5s ease-in-out infinite" }}
      />
    </div>
    <div className="w-10 h-1 rounded-full bg-gradient-to-r from-[#b02222] to-transparent opacity-40" style={{ animation: "trail-glow 1.5s ease-in-out infinite" }} />
    <style>{`
      @keyframes dot-rise {
        0% { opacity: 0; transform: translateY(0); }
        50% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-16px); }
      }
      @keyframes rocket-float {
        0%, 100% { transform: translateY(2px); }
        50% { transform: translateY(-4px); }
      }
      @keyframes trail-glow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }
    `}</style>
  </div>
);

const PHASE_ANIMATIONS = [
  <DiscoveryAnim key="discovery" />,
  <StrategyAnim key="strategy" />,
  <DesignAnim key="design" />,
  <PrototypeAnim key="prototype" />,
  <HandoffAnim key="handoff" />,
  <LaunchAnim key="launch" />,
];

// ─── Phase Data ───────────────────────────────────────────────────────────────

const PHASES = [
  {
    number: 1,
    name: "Discovery",
    description:
      "Deep-dive research into your users, market, and competitors. I conduct stakeholder interviews and gather insights to understand the problem space fully.",
    deliverable: "Project Brief",
  },
  {
    number: 2,
    name: "Strategy",
    description:
      "Define clear goals, map user personas, and establish information architecture. This is where we align business objectives with user needs.",
    deliverable: "Roadmap",
  },
  {
    number: 3,
    name: "Design",
    description:
      "From low-fidelity wireframes to high-fidelity mockups in Figma. I build a comprehensive design system ensuring consistency across every component.",
    deliverable: "Design System & Mockups",
  },
  {
    number: 4,
    name: "Prototype",
    description:
      "Transform static designs into interactive, clickable prototypes. Realistic interactions let us validate flows and catch issues before development.",
    deliverable: "Clickable Prototype",
  },
  {
    number: 5,
    name: "Handoff",
    description:
      "Developer-friendly documentation with annotated specs, design tokens, and component guidelines. I collaborate closely with engineers to ensure fidelity.",
    deliverable: "Annotated Designs",
  },
  {
    number: 6,
    name: "Launch & Iterate",
    description:
      "Rigorous QA, smooth deployment, and post-launch monitoring. I track metrics and gather feedback to drive continuous improvement.",
    deliverable: "Live Product",
  },
];

// ─── PhaseCard ───────────────────────────────────────────────────────────────

const PhaseCard = ({ phase, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="relative pl-12 md:pl-16"
    >
      {/* Timeline connector (vertical line) */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
        {index < PHASES.length - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-[#b02222] to-[#b02222]/20 mt-8" />
        )}
      </div>

      {/* Number badge */}
      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#b02222] flex items-center justify-center text-white text-sm font-bold font-manrope shadow-lg shadow-[#b02222]/30 z-10">
        {phase.number}
      </div>

      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Animated visual */}
          <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            {PHASE_ANIMATIONS[index]}
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl font-bold font-manrope text-white mb-2">
              {phase.name}
            </h3>
            <p className="text-white/60 font-manrope text-base leading-relaxed mb-4">
              {phase.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b02222]/40 bg-[#b02222]/10 text-[#b02222] text-sm font-manrope font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b02222]" />
              Deliverable: {phase.deliverable}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />

      <main className="pt-32 pb-0 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
        </div>
      </main>

      {/* ContactSection replaces footer on this page */}
      <ContactSection />
      <FooterSection />
    </div>
  );
}
