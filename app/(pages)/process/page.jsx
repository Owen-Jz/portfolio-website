"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavbarDemo } from "../../components/ui/ResizableNavbar";
import FooterSection from "../../components/FooterSection";
import ContactSection from "../../components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

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
  const isEven = index % 2 === 0;

  useEffect(() => {
    const section = sectionRef.current;
    const num = numRef.current;
    const content = contentRef.current;
    if (!section || !num || !content) return;

    const ctx = gsap.context(() => {
      gsap.set(num, { opacity: 0, x: isEven ? -60 : 60, scale: 0.8 });
      gsap.set(content, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(num, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }).to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }, section);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Ghosted number */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={numRef}
          className={`absolute font-manrope font-black text-[20vw] leading-none select-none transition-transform duration-700
            ${isEven ? "left-0 -translate-x-1/4 text-white/[0.03]" : "right-0 translate-x-1/4 text-white/[0.03]"}
          `}
          style={{ top: "50%", transform: isEven ? "translateX(-25%) translateY(-50%)" : "translateX(25%) translateY(-50%)" }}
        >
          {phase.number}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8 md:gap-16`}>

          {/* Phase label */}
          <div ref={contentRef} className="flex-1 min-w-0">
            {/* Phase tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#b02222] font-mono text-sm font-bold">
                {phase.number}
              </span>
              <div className="h-px flex-1 max-w-[60px] bg-[#b02222]" />
            </div>

            {/* Name + pull */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-manrope text-white mb-3 leading-[0.9]">
              {phase.name}
            </h2>
            <p className="text-xl md:text-2xl font-manrope text-[#b02222] italic mb-6">
              {phase.pull}
            </p>

            {/* Body */}
            <p className="text-white/55 font-manrope text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {phase.body}
            </p>

            {/* Deliverable pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b02222]/40 bg-[#b02222]/10 text-[#b02222] text-sm font-manrope font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b02222]" />
              {phase.deliverable}
            </div>
          </div>

          {/* Visual placeholder — animated accent */}
          <div className={`w-full md:w-64 flex-shrink-0 ${isEven ? "md:order-last" : ""}`}>
            <div className="relative aspect-square md:aspect-auto md:h-64 rounded-3xl overflow-hidden bg-white/5 border border-white/10">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at ${isEven ? "30%" : "70%"} 50%, rgba(176,34,34,0.15) 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}
              >
                <span
                  className="font-black font-manrope text-[#b02222]/20 leading-none select-none"
                  style={{ transform: `rotate(${isEven ? "-12" : "12"}deg)` }}
                >
                  {phase.number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider — except after last */}
      {index < PHASES.length - 1 && (
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <div className="relative h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
    </section>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  const introRef = useRef(null);
  const stepperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade in
      gsap.fromTo(
        introRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
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
      <section ref={introRef} className="pt-40 pb-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#b02222]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b02222]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="text-sm font-manrope text-white/80">The Blueprint</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-manrope leading-[0.9] mb-8">
            How I <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b02222] to-[#d38787]">
              actually
            </span>{" "}
            work.
          </h1>

          <p className="text-lg md:text-xl text-white/50 font-manrope max-w-2xl mx-auto leading-relaxed">
            Six stages. Not a conveyor belt — more like a working method I've
            landed on after doing this long enough to know what actually matters.
          </p>

          {/* Scrolling indicator */}
          <div className="mt-16 flex flex-col items-center gap-2">
            <span className="text-white/30 text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
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
