"use client";

import React, { forwardRef } from "react";

// CONFIRM WITH OWEN before launch — must be real.
// Numeric stats count up on scroll (.stat-num); text stats render as-is.
export const PROOF_STATS = [
  { target: 20, suffix: "+", label: "projects shipped" },
  { target: 5, suffix: "", label: "years building" },
  { text: "Two Lions", label: "currently" },
];

/**
 * Ch.3 decoration: the shipped product. Graded static backdrop, red
 * atmosphere, an impact shockwave for the letter-slam beat, a live deploy
 * card, and proof stats that count themselves up. All revealed by the
 * master timeline.
 */
const ShipLayer = forwardRef(function ShipLayer(props, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden md:pointer-fine:block absolute inset-0 z-[2] pointer-events-none overflow-hidden"
    >
      {/* Graded backdrop — anchored to the viewport so it never moves */}
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
      {/* margin-centered (not translate) so GSAP can own its transform
          for the pointer-parallax sway */}
      <div className="ship-glow absolute top-1/2 left-1/2 -ml-[320px] -mt-[320px] w-[640px] h-[640px] bg-[#b02222]/20 rounded-full blur-[130px] opacity-0" />

      {/* Impact shockwave — bursts from the name the moment the letters
          slam back together (scale/opacity driven by the timeline) */}
      <div
        className="ship-shockwave absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-0"
        style={{
          border: "1.5px solid rgba(176,34,34,0.65)",
          boxShadow: "0 0 60px rgba(176,34,34,0.35), inset 0 0 40px rgba(176,34,34,0.15)",
        }}
      />

      {/* Deploy card — the story ends with the site going live */}
      <div className="ship-deploy absolute right-6 lg:right-12 bottom-20 hidden lg:block w-[250px] rounded-md border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-sm opacity-0">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
          <span className="hero-annotation text-[#b02222]">03 · the ship</span>
          <span className="hero-annotation">production</span>
        </div>
        <ul className="p-3 space-y-2">
          <li className="flex items-center gap-2.5">
            <span className="hero-annotation !text-white/55">build</span>
            <span className="hero-annotation ml-auto !text-white/55">✓ passed</span>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="hero-annotation !text-white/55">deploy</span>
            <span className="hero-annotation ml-auto !text-white/55">owendigitals.work</span>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="hero-annotation !text-white/55">status</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b02222] animate-pulse" />
              <span className="hero-annotation !text-white/75">live</span>
            </span>
          </li>
        </ul>
      </div>

      {/* Proof — real numbers rolling up, mono annotations along the bottom */}
      <div className="absolute bottom-16 left-0 right-0 hidden md:flex items-center justify-center gap-12">
        {PROOF_STATS.map((s) => (
          <div key={s.label} className="ship-proof flex items-baseline gap-2 opacity-0">
            <span className="font-display text-white text-xl" style={{ "--wght": 700 }}>
              {s.text != null ? (
                s.text
              ) : (
                <>
                  <span className="stat-num" data-target={s.target}>
                    {s.target}
                  </span>
                  {s.suffix}
                </>
              )}
            </span>
            <span className="hero-annotation">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ShipLayer;
