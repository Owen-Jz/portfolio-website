"use client";

import React, { forwardRef, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../libs/gsap";

/**
 * The persistent hero core. Everything here is real, server-rendered, and
 * interactive from frame one — chapter treatments only restyle these nodes.
 * GSAP-only magnetic CTAs (no framer-motion in hero-story/).
 */
const HeroStage = forwardRef(function HeroStage(props, ref) {
  const ctasRef = useRef(null);

  // Magnetic pull on CTAs — desktop fine pointers only.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const links = gsap.utils.toArray("[data-magnetic]", ctasRef.current);
          const cleanups = links.map((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
            const onMove = (e) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
            };
            const onLeave = () => {
              xTo(0);
              yTo(0);
            };
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseleave", onLeave);
            return () => {
              el.removeEventListener("mousemove", onMove);
              el.removeEventListener("mouseleave", onLeave);
            };
          });
          return () => cleanups.forEach((fn) => fn());
        }
      );
    },
    { scope: ctasRef }
  );

  return (
    <div
      ref={ref}
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
    >
      {/* Badge — real from frame one */}
      <div
        data-hero="badge"
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-8 backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#b02222] animate-pulse" />
        Available for new projects
      </div>

      {/* Headline — the LCP element. Weight animates 120 -> 900 via --wght. */}
      <h1
        data-hero="headline"
        className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight text-white leading-[0.95] mb-4 select-none"
        style={{ "--wght": 120, "--wdth": 110 }}
      >
        OWEN
      </h1>
      <p
        data-hero="subline"
        className="font-display text-lg md:text-2xl text-white/70 tracking-[0.18em] uppercase mb-8"
        style={{ "--wght": 120 }}
      >
        Full Stack Design Engineer
      </p>

      {/* Kicker — one line, rewritten per chapter by the timeline */}
      <p
        data-hero="kicker"
        aria-live="off"
        className="hero-annotation mb-10 min-h-[1.5em]"
      >
        Every product starts as a sketch.
      </p>

      {/* CTAs — clickable and focusable at every scroll position */}
      <div
        ref={ctasRef}
        data-hero="ctas"
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      >
        {/* The --cta-* properties MUST be initialized inline: the master
            timeline tweens them, and GSAP reads an undefined custom property
            as 0 on its first scrub render — which made the buttons invisible
            through Ch.1/2. Inline values give the tweens true start points. */}
        <Link
          href="/contact"
          data-hero="cta-primary"
          data-magnetic
          className="hero-cta inline-flex items-center justify-center h-12 px-6 text-sm md:text-base rounded-sm will-change-transform"
          style={{ "--cta-border-alpha": 0.35, "--cta-bg-alpha": 0, "--cta-text-alpha": 0.55 }}
        >
          Start a Project <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
        <Link
          href="/cv.pdf"
          data-hero="cta-secondary"
          data-magnetic
          className="hero-cta inline-flex items-center justify-center h-12 px-6 text-sm md:text-base rounded-sm will-change-transform"
          style={{ "--cta-border-alpha": 0.35, "--cta-bg-alpha": 0, "--cta-text-alpha": 0.55 }}
        >
          Download CV <Download className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
});

export default HeroStage;
