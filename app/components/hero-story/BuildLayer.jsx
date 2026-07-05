"use client";

import React, { forwardRef } from "react";
import { heroSourceLines } from "./heroSource.generated.js";

// Surface-level build log for the left pin — plain language, no jargon.
const BUILD_STEPS = [
  { label: "Layout structured", state: "done" },
  { label: "Interactions wired", state: "done" },
  { label: "Motion choreographed", state: "active" },
  { label: "Ship it", state: "todo" },
];

/**
 * Ch.2 decoration: engineering. SVG hairlines that draw in on scroll
 * (.hero-draw — the timeline tweens strokeDashoffset to 0) and two side
 * pins (.build-pin — the timeline slides them up on entering the build):
 * a plain-language build log on the left, and the self-referential source
 * panel on the right — the opening lines of the very component rendering
 * these pixels, kept surface-level readable.
 */
const BuildLayer = forwardRef(function BuildLayer(props, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden md:pointer-fine:block absolute inset-0 z-[6] pointer-events-none overflow-hidden"
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

      {/* Left pin — the build log, in plain language */}
      <div className="build-pin absolute left-6 lg:left-12 bottom-20 hidden lg:block w-[240px] rounded-md border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
          <span className="hero-annotation text-[#b02222]">02 · the build</span>
          <span className="hero-annotation">in progress</span>
        </div>
        <ul className="p-3 space-y-2">
          {BUILD_STEPS.map((step) => (
            <li key={step.label} className="flex items-center gap-2.5">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  step.state === "done"
                    ? "bg-white/60"
                    : step.state === "active"
                    ? "bg-[#b02222] animate-pulse"
                    : "border border-white/25"
                }`}
              />
              <span
                className={`hero-annotation ${
                  step.state === "todo" ? "!text-white/20" : "!text-white/55"
                }`}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right pin — self-referential source panel, surface level: just the
          human-readable header of the component being rendered */}
      {heroSourceLines.length > 0 && (
        <div className="build-pin build-source absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:block w-[340px] max-h-[46vh] overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <span className="hero-annotation">hero-story/HeroStory.jsx</span>
            <span className="hero-annotation text-[#b02222]">
              ← this very section
            </span>
          </div>
          <pre className="p-3 text-[10px] leading-[1.7] font-mono text-white/45 overflow-hidden">
            {heroSourceLines.map((line, i) => (
              <span key={i} className="block whitespace-pre">
                <span className="inline-block w-7 text-right mr-3 text-white/20 select-none">
                  {i + 1}
                </span>
                {line}
              </span>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
});

export default BuildLayer;
