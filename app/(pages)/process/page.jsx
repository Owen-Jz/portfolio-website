"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import ContactSection from "../../components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

// ─── Phase Visual Animations ─────────────────────────────────────────────────

const DiscoveryVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
    {/* Background grid */}
    <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-px opacity-[0.06]">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} className="bg-white rounded-sm" />
      ))}
    </div>

    {/* Radar rings */}
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className="absolute rounded-full border border-[#b02222]/30"
        style={{
          width: `${30 + i * 28}px`,
          height: `${30 + i * 28}px`,
          animation: `radar-ring 2.4s ease-out ${i * 0.6}s infinite`,
        }}
      />
    ))}

    {/* Center magnifying glass */}
    <div className="relative z-10">
      {/* Glass circle */}
      <div className="relative w-16 h-16 rounded-full border-2 border-white/40 bg-white/5 backdrop-blur-sm flex items-center justify-center">
        {/* Crosshair inside glass */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-px bg-white/30" />
          <div className="absolute w-px h-4 bg-white/30" />
        </div>
        {/* Glare */}
        <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-white/10" />
        {/* Center dot */}
        <div
          className="w-2 h-2 rounded-full bg-[#b02222]"
          style={{ animation: "center-pulse 2s ease-in-out infinite" }}
        />
      </div>
      {/* Handle */}
      <div
        className="absolute -bottom-1 -right-1 w-6 h-2 rounded-full bg-white/30 origin-right"
        style={{ transform: "rotate(45deg)" }}
      />
    </div>

    {/* Floating data dots */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-[#b02222]"
        style={{
          top: `${15 + (i % 3) * 30}%`,
          left: `${10 + (i % 2) * 75}%`,
          animation: `dot-blink 1.8s ease-in-out ${i * 0.3}s infinite alternate`,
          opacity: 0,
        }}
      />
    ))}

    <style>{`
      @keyframes radar-ring {
        0% { opacity: 0.6; transform: scale(1); }
        100% { opacity: 0; transform: scale(1.8); }
      }
      @keyframes center-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(176,34,34,0.4); }
        50% { box-shadow: 0 0 0 6px rgba(176,34,34,0); }
      }
      @keyframes dot-blink {
        0% { opacity: 0; transform: scale(0.5); }
        100% { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);

const StrategyVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
    <svg viewBox="0 0 120 120" className="w-28 h-28 overflow-visible">
      {/* Root node */}
      <circle cx="60" cy="20" r="6" fill="#b02222" style={{ animation: "node-appear 0.4s ease-out 0.2s both" }} />
      {/* Root to mid line */}
      <line x1="60" y1="26" x2="60" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"
        style={{ strokeDasharray: 19, strokeDashoffset: 19, animation: "line-draw 0.3s ease-out 0.5s forwards infinite" }} />
      {/* Mid node */}
      <circle cx="60" cy="50" r="5" fill="rgba(255,255,255,0.35)" style={{ animation: "node-appear 0.4s ease-out 0.7s both" }} />
      {/* Branch lines */}
      <line x1="60" y1="55" x2="30" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
        style={{ strokeDasharray: 29, strokeDashoffset: 29, animation: "line-draw 0.35s ease-out 0.9s forwards infinite" }} />
      <line x1="60" y1="55" x2="90" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
        style={{ strokeDasharray: 29, strokeDashoffset: 29, animation: "line-draw 0.35s ease-out 1.2s forwards infinite" }} />
      <line x1="60" y1="55" x2="60" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
        style={{ strokeDasharray: 25, strokeDashoffset: 25, animation: "line-draw 0.3s ease-out 1.5s forwards infinite" }} />
      {/* Leaf nodes */}
      <circle cx="30" cy="80" r="4" fill="rgba(255,255,255,0.25)" style={{ animation: "node-appear 0.4s ease-out 1.1s both" }} />
      <circle cx="90" cy="80" r="4" fill="rgba(255,255,255,0.25)" style={{ animation: "node-appear 0.4s ease-out 1.4s both" }} />
      <circle cx="60" cy="85" r="4" fill="rgba(255,255,255,0.25)" style={{ animation: "node-appear 0.4s ease-out 1.7s both" }} />
      {/* Sub-branch hints */}
      <line x1="30" y1="84" x2="18" y2="95" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
        style={{ strokeDasharray: 14, strokeDashoffset: 14, animation: "line-draw 0.3s ease-out 1.9s forwards infinite" }} />
      <line x1="90" y1="84" x2="102" y2="95" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
        style={{ strokeDasharray: 14, strokeDashoffset: 14, animation: "line-draw 0.3s ease-out 2.2s forwards infinite" }} />
      <circle cx="18" cy="98" r="2.5" fill="rgba(255,255,255,0.15)" style={{ animation: "node-appear 0.3s ease-out 2.1s both" }} />
      <circle cx="102" cy="98" r="2.5" fill="rgba(255,255,255,0.15)" style={{ animation: "node-appear 0.3s ease-out 2.4s both" }} />
    </svg>

    <style>{`
      @keyframes line-draw {
        to { stroke-dashoffset: 0; }
      }
      @keyframes node-appear {
        from { opacity: 0; transform: scale(0); }
        to { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);

const DesignVisual = () => {
  const swatches = [
    { hex: "#b02222", label: "Primary", delay: "0s" },
    { hex: "#d38787", label: "Secondary", delay: "0.15s" },
    { hex: "#f5c518", label: "Accent", delay: "0.3s" },
    { hex: "#1a1a1a", label: "Surface", delay: "0.45s" },
    { hex: "#ffffff", label: "Light", delay: "0.6s" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Canvas */}
      <div className="relative w-28 h-28">
        {/* Figma-like frame */}
        <div className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.03]" />

        {/* Layer 1 — base shape */}
        <div
          className="absolute top-4 left-4 w-14 h-10 rounded-lg bg-[#b02222]/60"
          style={{ animation: "layer-in 0.5s ease-out 0.2s both" }}
        />

        {/* Layer 2 — middle element */}
        <div
          className="absolute top-8 left-8 w-10 h-10 rounded-lg border border-white/30"
          style={{ animation: "layer-in 0.5s ease-out 0.5s both" }}
        />

        {/* Layer 3 — top element */}
        <div
          className="absolute top-5 left-12 w-8 h-6 rounded bg-[#d38787]/50"
          style={{ animation: "layer-in 0.5s ease-out 0.8s both" }}
        />

        {/* Color swatches */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5">
          {swatches.map((s, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 border-white/10"
              style={{
                backgroundColor: s.hex,
                animation: `swatch-pop 0.3s ease-out ${1.1 + i * 0.12}s both, swatch-glow 2s ease-in-out ${1.1 + i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Pen tool cursor hint */}
        <div
          className="absolute -top-2 -right-2 w-4 h-4"
          style={{ animation: "pen-dance 3s ease-in-out 1.5s infinite" }}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M2 14 L5 11 L11 5 L13 7 L7 13 Z" fill="rgba(176,34,34,0.8)" />
            <path d="M5 11 L11 5" stroke="#b02222" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes layer-in {
          from { opacity: 0; transform: scale(0.8) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes swatch-pop {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes swatch-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(176,34,34,0); }
          50% { box-shadow: 0 0 6px 1px rgba(176,34,34,0.4); }
        }
        @keyframes pen-dance {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-3px, -2px) rotate(-10deg); }
          50% { transform: translate(2px, -4px) rotate(5deg); }
          75% { transform: translate(-1px, -1px) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
};

const PrototypeVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
    {/* Phone frame */}
    <div className="relative w-16 h-28 rounded-3xl border border-white/20 bg-white/[0.03] overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 rounded-b-xl bg-white/10" />
      {/* Screen */}
      <div className="absolute inset-1 top-3 rounded-2xl bg-white/[0.05] overflow-hidden">
        {/* Header bar */}
        <div className="h-3 bg-[#b02222]/20 mx-1 mt-1 rounded" style={{ animation: "ui-fade 0.4s ease-out 0.3s both" }} />
        {/* Content blocks sliding in */}
        <div className="flex flex-col gap-1 p-1">
          <div className="h-3 bg-white/10 rounded" style={{ animation: "ui-slide-in 0.4s ease-out 0.5s both" }} />
          <div className="h-2 w-2/3 bg-white/8 rounded" style={{ animation: "ui-slide-in 0.4s ease-out 0.7s both" }} />
          <div className="h-2 w-1/2 bg-white/8 rounded ml-auto" style={{ animation: "ui-slide-in 0.4s ease-out 0.9s both" }} />
          <div className="h-3 bg-[#b02222]/30 rounded mt-1" style={{ animation: "ui-slide-in 0.4s ease-out 1.1s both" }} />
          <div className="h-2 w-3/4 bg-white/8 rounded" style={{ animation: "ui-slide-in 0.4s ease-out 1.3s both" }} />
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-white/20" />
      </div>
    </div>

    {/* Cursor + tap ripple */}
    <div className="absolute top-[38%] right-[calc(50%-3.5rem)] w-3 h-3">
      {/* Cursor */}
      <svg viewBox="0 0 12 16" fill="none" className="w-3 h-4">
        <path d="M0 0 L0 14 L4 10 L7 16 L9 15 L6 9 L11 9 Z" fill="#b02222" stroke="#b02222" strokeWidth="0.5" strokeLinejoin="round" />
      </svg>
      {/* Tap ripple */}
      <div
        className="absolute inset-0 rounded-full border border-[#b02222]/60"
        style={{ animation: "tap-ripple 2.5s ease-out 1.5s infinite" }}
      />
    </div>

    {/* Connection lines (flows) */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full bg-[#b02222]"
          style={{ animation: `flow-dot 1.5s ease-in-out ${2 + i * 0.3}s infinite`, opacity: 0 }}
        />
      ))}
    </div>

    <style>{`
      @keyframes ui-slide-in {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes ui-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes tap-ripple {
        0% { transform: scale(0.5); opacity: 0.8; }
        100% { transform: scale(3); opacity: 0; }
      }
      @keyframes flow-dot {
        0% { opacity: 0; transform: translateY(0); }
        50% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-12px); }
      }
    `}</style>
  </div>
);

const HandoffVisual = () => {
  const codeLines = [
    { width: "75%", color: "rgba(176,34,34,0.5)", delay: "0.3s" },
    { width: "55%", color: "rgba(255,255,255,0.3)", delay: "0.6s" },
    { width: "85%", color: "rgba(255,255,255,0.2)", delay: "0.9s" },
    { width: "40%", color: "rgba(211,135,135,0.4)", delay: "1.2s" },
    { width: "70%", color: "rgba(255,255,255,0.25)", delay: "1.5s" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Code editor frame */}
      <div className="relative w-32 h-24 rounded-xl border border-white/10 bg-[#0d0d0d]/80 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/5 bg-white/[0.02]">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <div className="ml-2 flex gap-1">
            <div className="w-6 h-1 rounded-full bg-white/10" />
            <div className="w-4 h-1 rounded-full bg-white/5" />
          </div>
        </div>
        {/* Code lines */}
        <div className="p-2 flex flex-col gap-1.5">
          {codeLines.map((line, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: line.width,
                backgroundColor: line.color,
                animation: `code-type 0.4s ease-out ${line.delay} both`,
              }}
            />
          ))}
          {/* Cursor blink */}
          <div
            className="w-1.5 h-1.5 rounded-sm bg-[#b02222] ml-1"
            style={{ animation: "cursor-blink 1s step-end infinite", opacity: 0 }}
          />
        </div>
        {/* Annotation highlight */}
        <div
          className="absolute bottom-3 left-2 right-2 h-2 rounded-full bg-[#b02222]/10 border border-[#b02222]/30"
          style={{ animation: "annotation-appear 0.5s ease-out 2s both" }}
        />
        {/* Annotation line */}
        <div
          className="absolute bottom-3 right-4 w-4 h-px bg-[#b02222]/50"
          style={{ animation: "annotation-appear 0.5s ease-out 2.2s both" }}
        />
      </div>

      <style>{`
        @keyframes code-type {
          from { opacity: 0; transform: scaleX(0); transform-origin: left; }
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes annotation-appear {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const LaunchVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
    {/* Background grid */}
    <div className="absolute inset-0 opacity-[0.04]">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="absolute bottom-0 left-0 right-0" style={{ height: `${20 + i * 20}%`, borderTop: '1px solid white' }} />
      ))}
    </div>

    {/* Rocket */}
    <div className="relative" style={{ animation: "rocket-hover 2s ease-in-out infinite" }}>
      {/* Exhaust trail */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-full bg-gradient-to-t from-[#b02222] to-transparent"
            style={{
              width: `${8 - i}px`,
              height: `${4 + i * 1.5}px`,
              opacity: 1 - i * 0.15,
              animation: `exhaust-flicker 0.3s ease-in-out ${i * 0.05}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Rocket body */}
      <svg viewBox="0 0 40 80" className="w-8 h-16 overflow-visible">
        {/* Body */}
        <path d="M20 0 C14 0 12 8 12 20 L12 55 C12 60 14 65 20 65 C26 65 28 60 28 55 L28 20 C28 8 26 0 20 0Z"
          fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* Window */}
        <circle cx="20" cy="28" r="6" fill="rgba(176,34,34,0.3)" stroke="rgba(176,34,34,0.6)" strokeWidth="1.5" />
        <circle cx="20" cy="28" r="3" fill="rgba(176,34,34,0.5)" style={{ animation: "window-glow 2s ease-in-out infinite" }} />
        {/* Wings */}
        <path d="M12 45 L2 60 L12 55Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        <path d="M28 45 L38 60 L28 55Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        {/* Nose tip */}
        <path d="M20 0 C17 4 16 8 16 12 L24 12 C24 8 23 4 20 0Z" fill="rgba(176,34,34,0.4)" />
      </svg>
    </div>

    {/* Particle stars */}
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-white"
        style={{
          top: `${10 + i * 15}%`,
          left: `${5 + (i % 3) * 35}%`,
          animation: `star-twinkle 1.5s ease-in-out ${i * 0.4}s infinite alternate`,
          opacity: 0,
        }}
      />
    ))}

    {/* Growth curve */}
    <div className="absolute bottom-4 left-4 right-4">
      <svg viewBox="0 0 80 30" className="w-full h-6 overflow-visible">
        <path
          d="M5 25 Q20 25 30 18 T55 10 T75 3"
          fill="none"
          stroke="rgba(176,34,34,0.4)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 120,
            strokeDashoffset: 120,
            animation: "growth-draw 2s ease-out 0.5s forwards",
          }}
        />
        <circle cx="75" cy="3" r="2.5" fill="#b02222" style={{ animation: "dot-appear 0.3s ease-out 2.5s forwards", opacity: 0 }} />
      </svg>
    </div>

    <style>{`
      @keyframes rocket-hover {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      @keyframes exhaust-flicker {
        from { opacity: 0.6; transform: scaleY(0.9); }
        to { opacity: 1; transform: scaleY(1.1); }
      }
      @keyframes window-glow {
        0%, 100% { fill: rgba(176,34,34,0.5); }
        50% { fill: rgba(176,34,34,0.9); }
      }
      @keyframes star-twinkle {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1.2); }
      }
      @keyframes growth-draw {
        to { stroke-dashoffset: 0; }
      }
      @keyframes dot-appear {
        to { opacity: 1; }
      }
    `}</style>
  </div>
);

const PHASE_VISUALS = [
  <DiscoveryVisual key="d" />,
  <StrategyVisual key="s" />,
  <DesignVisual key="ds" />,
  <PrototypeVisual key="p" />,
  <HandoffVisual key="h" />,
  <LaunchVisual key="l" />,
];

// ─── Phase Data ───────────────────────────────────────────────────────────────

const PHASES = [
  {
    number: "01",
    name: "Discovery",
    pull: "Find the real problem.",
    body: "Before anything else, I talk to people — users, stakeholders, whoever's actually feeling the pain — to understand the real problem versus the stated one. I dig into who the users are, what's working, what's broken, and why. Competitive analysis helps too, so we're not reinventing the wheel when there's already a perfectly good one out there.",
    deliverable: "Project Brief",
  },
  {
    number: "02",
    name: "Strategy",
    pull: "Map the path.",
    body: "Once I know the landscape, I define what success actually looks like. Who are the key users we're designing for? What do they need versus what do they want? I sketch out the information architecture so the product flows naturally, and I align every decision back to real business goals — not just aesthetic preferences.",
    deliverable: "Roadmap",
  },
  {
    number: "03",
    name: "Design",
    pull: "Make it real.",
    body: "Starting on paper, then moving to Figma. I work from rough wireframes to high-fidelity mockups, building out a proper design system along the way — typography scales, color tokens, spacing, components. The goal is a cohesive visual language that doesn't fall apart the moment you look at it on a different screen.",
    deliverable: "Design System & Mockups",
  },
  {
    number: "04",
    name: "Prototype",
    pull: "Does it actually work?",
    body: "Static mockups lie to you. So I build interactive prototypes — not just clicking through screens, but realistic flows with real micro-interactions. This is where we catch confusing navigation patterns, awkward transitions, and broken assumptions before a single line of code gets written.",
    deliverable: "Clickable Prototype",
  },
  {
    number: "05",
    name: "Handoff",
    pull: "Hand it off right.",
    body: "I write things down so developers don't have to guess. Annotated specs, component documentation, design tokens in a format they can actually use. I stay close during the build phase — answering questions, resolving edge cases, and making sure what's shipped actually matches what was designed.",
    deliverable: "Annotated Designs",
  },
  {
    number: "06",
    name: "Launch & Iterate",
    pull: "Ship it. Then improve it.",
    body: "Deployment isn't the finish line, it's the starting point. I track how the product is actually performing — user behavior, error rates, conversion. Feedback loops stay open. Based on real usage data, we iterate: fix what's broken, improve what's ambiguous, and double down on what's working.",
    deliverable: "Live Product",
  },
];

// ─── Phase Section ──────────────────────────────────────────────────────────

const PhaseSection = ({ phase, index }) => {
  const sectionRef = useRef(null);
  const numRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const section = sectionRef.current;
    const num = numRef.current;
    const content = contentRef.current;
    const visual = visualRef.current;
    if (!section || !num || !content || !visual) return;

    const ctx = gsap.context(() => {
      gsap.set(num, { opacity: 0, x: isEven ? -80 : 80, scale: 0.7 });
      gsap.set(content, { opacity: 0, y: 50 });
      gsap.set(visual, { opacity: 0, scale: 0.85 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(num, { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" })
        .to(visual, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, "-=0.7")
        .to(content, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }, section);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 overflow-hidden">
      {/* Ghosted number */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={numRef}
          className="absolute font-black text-[18vw] leading-none select-none text-white/[0.025] transition-all duration-700"
          style={{
            top: "50%",
            transform: `translateY(-50%) translateX(${isEven ? "-20%" : "20%"})`,
            [isEven ? "left" : "right"]: 0,
          }}
        >
          {phase.number}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-20`}
        >
          {/* Text content */}
          <div ref={contentRef} className="flex-1 min-w-0">
            {/* Phase tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#b02222] font-mono text-sm font-bold">{phase.number}</span>
              <div className="h-px w-8 bg-[#b02222]" />
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black font-manrope text-white mb-3 leading-[0.88]">
              {phase.name}
            </h2>
            <p className="text-xl md:text-2xl font-manrope text-[#b02222] italic mb-8">
              {phase.pull}
            </p>
            <p className="text-white/50 font-manrope text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {phase.body}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b02222]/40 bg-[#b02222]/10 text-[#b02222] text-sm font-manrope font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b02222]" />
              {phase.deliverable}
            </div>
          </div>

          {/* Visual */}
          <div
            ref={visualRef}
            className="w-full md:w-72 h-64 flex-shrink-0 rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
          >
            {PHASE_VISUALS[index]}
          </div>
        </div>
      </div>

      {/* Section divider */}
      {index < PHASES.length - 1 && (
        <div className="max-w-6xl mx-auto px-6 mt-24">
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>
      )}
    </section>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  const introRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.3,
        }
      );
    }, introRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b02222] selection:text-white">
      <NavbarDemo />

      {/* ── Intro ── */}
      <section ref={introRef} className="pt-40 pb-28 px-6 relative overflow-hidden">
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="text-sm font-manrope text-white/80">The Blueprint</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-manrope leading-[0.9] mb-8">
            How Owen <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">
              Actually
            </span>{" "}
            Works.
          </h1>

          <p className="text-lg md:text-xl text-white/50 font-manrope max-w-2xl mx-auto leading-relaxed">
            Six stages. Not a conveyor belt — more like a working method I've landed
            on after doing this long enough to know what actually matters.
          </p>

          <div className="mt-16 flex flex-col items-center gap-2">
            <span className="text-white/25 text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Phase Sections ── */}
      <div className="relative">
        {PHASES.map((phase, index) => (
          <PhaseSection key={phase.number} phase={phase} index={index} />
        ))}
      </div>

      {/* ── Outro ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="text-sm font-manrope text-white/80">That's the gist</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-manrope text-white mb-6 leading-tight">
            Every project <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">
              tells its own story.
            </span>
          </h2>
          <p className="text-white/50 font-manrope text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            But the specifics always change — scope, timeline, budget, complexity.
            The principles stay the same. Let's talk about yours.
          </p>
        </div>
      </section>

      <ContactSection />
      <FooterSection />
    </div>
  );
}
