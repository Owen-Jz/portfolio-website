"use client";

import React, { forwardRef } from "react";
import { heroSourceLines } from "./heroSource.generated.js";

/**
 * Ch.2 decoration: engineering. SVG hairlines that draw in on scroll
 * (.hero-draw — the timeline tweens strokeDashoffset to 0) and the
 * self-referential source panel: the real first lines of HeroStory.jsx,
 * the very component rendering these pixels.
 */
const BuildLayer = forwardRef(function BuildLayer(props, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-[6] pointer-events-none overflow-hidden"
    >
      {/* Structural hairlines that draw themselves */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {[
          "M 8 20 H 92",
          "M 8 80 H 92",
          "M 20 8 V 92",
          "M 80 8 V 92",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            className="hero-draw"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="0.1"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Self-referential source panel */}
      {heroSourceLines.length > 0 && (
        <div className="build-source absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:block w-[380px] max-h-[52vh] overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <span className="hero-annotation">hero-story/HeroStory.jsx</span>
            <span className="hero-annotation text-[#b02222]">
              ← the component you are looking at
            </span>
          </div>
          <pre className="p-3 text-[10px] leading-[1.7] font-mono text-white/45 overflow-hidden">
            {heroSourceLines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                <span className="inline-block w-7 text-right mr-3 text-white/20 select-none">
                  {i + 1}
                </span>
                {line}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
});

export default BuildLayer;
