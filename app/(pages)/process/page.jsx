"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import ContactSection from "../../components/ContactSection";
import GlassCard from "../../components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

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
        style={{
          strokeDasharray: 120,
          strokeDashoffset: 120,
          animation: "draw-line 2s ease-out 0.2s forwards infinite",
        }}
      />
      <circle cx="40" cy="10" r="4" fill="#b02222" style={{ animation: "dot-appear 0.3s ease-out 0.8s forwards", opacity: 0 }} />
      <circle cx="40" cy="30" r="4" fill="rgba(255,255,255,0.4)" style={{ animation: "dot-appear 0.3s ease-out 1.1s forwards", opacity: 0 }} />
      <circle cx="20" cy="50" r="4" fill="rgba(255,255,255,0.4)" style={{ animation: "dot-appear 0.3s ease-out 1.4s forwards", opacity: 0 }} />
      <circle cx="60" cy="50" r="4" fill="rgba(255,255,255,0.4)" style={{ animation: "dot-appear 0.3s ease-out 1.7s forwards", opacity: 0 }} />
    </svg>
    <style>{`
      @keyframes draw-line { to { stroke-dashoffset: 0; } }
      @keyframes dot-appear { to { opacity: 1; } }
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
      <div className="absolute left-1 top-4 w-8 h-3 rounded bg-[#b02222]/60" style={{ animation: "ui-slide 2s ease-in-out 0.3s infinite alternate" }} />
      <div className="absolute left-1 top-9 w-6 h-3 rounded bg-white/30" style={{ animation: "ui-slide 2s ease-in-out 0.7s infinite alternate" }} />
      <div className="absolute left-1 top-14 w-7 h-3 rounded bg-white/20" style={{ animation: "ui-slide 2s ease-in-out 1.1s infinite alternate" }} />
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
      <div className="w-3 h-3 rounded-full bg-[#b02222] shadow-[0_0_10px_#b02222]" style={{ animation: "rocket-float 1.5s ease-in-out infinite" }} />
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
  <DiscoveryAnim key="d" />,
  <StrategyAnim key="s" />,
  <DesignAnim key="ds" />,
  <PrototypeAnim key="p" />,
  <HandoffAnim key="h" />,
  <LaunchAnim key="l" />,
];

// ─── Phase Data — Spontaneous, conversational tone ───────────────────────────

const PHASES = [
  {
    name: "Discovery",
    tagline: "First, I figure out what we're actually solving",
    body: "Before anything else, I talk to people — users, stakeholders, whoever's痛感 — to understand the real problem versus the stated one. I dig into who the users are, what's working, what's broken, and why. Competitive analysis helps too, so we're not reinventing the wheel when there's already a perfectly good one out there.",
    deliverable: "Project Brief",
  },
  {
    name: "Strategy",
    tagline: "Then we map out the path forward",
    body: "Once I know the landscape, I define what success actually looks like. Who are the key users we're designing for? What do they need vs. want? I sketch out the information architecture so the product flows naturally, and I align every decision back to real business goals — not just aesthetic preferences.",
    deliverable: "Roadmap",
  },
  {
    name: "Design",
    tagline: "Now the fun part — making it look and feel right",
    body: "Starting on paper, then moving to Figma. I work from rough wireframes to high-fidelity mockups, building out a proper design system along the way — typography scales, color tokens, spacing, components. The goal is a cohesive visual language that doesn't fall apart the moment you look at it on a different screen size.",
    deliverable: "Design System & Mockups",
  },
  {
    name: "Prototype",
    tagline: "Let's see if this actually works in motion",
    body: "Static mockups lie to you. So I build interactive prototypes — not just clicking through screens, but realistic flows with real micro-interactions. This is where we catch confusing navigation patterns, awkward transitions, and broken assumptions before a single line of code gets written.",
    deliverable: "Clickable Prototype",
  },
  {
    name: "Handoff",
    tagline: "Turning the design over to engineering, properly",
    body: "I write things down so developers don't have to guess. Annotated specs, component documentation, design tokens in a format they can actually use. I stay close during the build phase — answering questions, resolving edge cases, and making sure what's shipped matches what was designed.",
    deliverable: "Annotated Designs",
  },
  {
    name: "Launch & Iterate",
    tagline: "It's live — now let's make it better",
    body: "Deployment isn't the finish line, it's the starting point. I track how the product is actually performing — user behavior, error rates, conversion. Feedback loops stay open. Based on real usage data, we iterate: fix what's broken, improve what's ambiguous, and double down on what's working.",
    deliverable: "Live Product",
  },
];

// ─── PhaseCard ───────────────────────────────────────────────────────────────

const PhaseCard = ({ phase, index }) => {
  const cardRef = useRef(null);
  const animRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const anim = animRef.current;
    const text = textRef.current;
    if (!card || !anim || !text) return;

    const ctx = gsap.context(() => {
      gsap.set(anim, { opacity: 0, x: -30 });
      gsap.set(text, { opacity: 0, x: 30 });

      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.to(anim, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.05,
          });
          gsap.to(text, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.05 + 0.1,
          });
        },
      });
    }, card);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative pl-10 md:pl-14"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-[#b02222] shadow-[0_0_12px_#b02222] z-10" />

      {/* Timeline line — hide for last */}
      {index < PHASES.length - 1 && (
        <div className="absolute left-[5px] top-9 bottom-0 w-px bg-gradient-to-b from-[#b02222]/60 to-transparent" />
      )}

      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Animated visual */}
          <div
            ref={animRef}
            className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            {PHASE_ANIMATIONS[index]}
          </div>

          {/* Text content */}
          <div ref={textRef} className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-xl md:text-2xl font-bold font-manrope text-white">
                {phase.name}
              </h3>
              <span className="text-white/30 text-sm font-mono">— {phase.tagline}</span>
            </div>
            <p className="text-white/55 font-manrope text-base leading-relaxed mb-5">
              {phase.body}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b02222]/40 bg-[#b02222]/10 text-[#b02222] text-sm font-manrope font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b02222]" />
              {phase.deliverable}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.2,
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />

      <main className="pt-32 pb-0 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-sm font-manrope text-white/80">The Blueprint</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-manrope leading-tight">
              My Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">Process</span>
            </h1>
            <p className="text-lg text-white/60 font-manrope max-w-2xl mx-auto leading-relaxed">
              Not a rigid formula — more like a loose set of principles I actually follow, in the order I actually follow them.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {PHASES.map((phase, index) => (
              <PhaseCard key={phase.name} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </main>

      <ContactSection />
      <FooterSection />
    </div>
  );
}
