"use client";

import React, { forwardRef } from "react";

// CONFIRM WITH OWEN before launch (Task 15 checkpoint) — must be real.
export const PROOF_STATS = [
  { label: "projects shipped", value: "20+" },
  { label: "years building", value: "5" },
  { label: "currently", value: "Two Lions" },
];

/**
 * Ch.3 decoration: the shipped product. Graded background image, red
 * atmosphere, and proof stats as mono annotations. All revealed by the
 * master timeline; initial opacities are 0 via GSAP set() in HeroStory.
 */
const ShipLayer = forwardRef(function ShipLayer(props, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden md:pointer-fine:block absolute inset-0 z-[2] pointer-events-none overflow-hidden"
    >
      {/* Graded backdrop — same treatment as the old hero, now earned.
          backgroundAttachment: fixed anchors the image to the VIEWPORT, so
          it holds perfectly still while the hero pins, releases, and scrolls
          away — the page slides over a static image. (Desktop-only layer, so
          iOS's broken fixed-attachment never applies.) */}
      <div
        className="ship-bg absolute inset-0 opacity-0"
        style={{
          backgroundImage: "url('/hero3.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* Red atmosphere */}
      <div className="ship-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-[#b02222]/20 rounded-full blur-[130px] opacity-0" />

      {/* Proof — real numbers, mono annotations along the bottom */}
      <div className="absolute bottom-16 left-0 right-0 hidden md:flex items-center justify-center gap-12">
        {PROOF_STATS.map((s) => (
          <div key={s.label} className="ship-proof flex items-baseline gap-2 opacity-0">
            <span className="font-display text-white text-xl" style={{ "--wght": 700 }}>
              {s.value}
            </span>
            <span className="hero-annotation">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ShipLayer;
