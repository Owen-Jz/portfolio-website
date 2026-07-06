"use client";

import React, { forwardRef } from "react";
import { heroSourceLines } from "./heroSource.generated.js";

// Surface-level build log for the left pin — plain language, no jargon.
// The first three check off live as the visitor scrolls through the build
// (.step-fill / .step-label tweens in HeroStory); "Ship it" stays pending.
const BUILD_STEPS = ["Layout structured", "Interactions wired", "Motion choreographed"];

/**
 * Ch.2 decoration: engineering. A faint working grid, SVG hairlines that
 * draw in on scroll (.hero-draw), a render scan that sweeps the stage
 * (.build-scan), and two side pins (.build-pin): a build log that checks
 * itself off on the left, and the self-referential source panel on the
 * right — the opening lines of the very component rendering these pixels,
 * writing themselves in (.src-line) as the visitor scrolls.
 */
const BuildLayer = forwardRef(function BuildLayer(props, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden md:pointer-fine:block absolute inset-0 z-[6] pointer-events-none overflow-hidden"
    >
      {/* Faint engineering grid — tighter than the blueprint grid; bleeds
          past the viewport so its parallax climb never exposes an edge */}
      <div
        className="build-grid absolute inset-x-0 -inset-y-52 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Structural hairlines that draw themselves */}
      <svg
        className="build-lines absolute inset-0 w-full h-full"
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

      {/* Render scan — a thin red pass sweeping the stage as it builds
          (the timeline drives top from -8% to 105%) */}
      <div
        className="build-scan absolute left-0 right-0 h-28"
        style={{
          top: "-8%",
          background:
            "linear-gradient(to bottom, transparent, rgba(176,34,34,0.05) 55%, rgba(176,34,34,0.12))",
          borderBottom: "1px solid rgba(176,34,34,0.45)",
          boxShadow: "0 1px 24px rgba(176,34,34,0.25)",
        }}
      />

      {/* Left pin — the build log, checking itself off */}
      <div className="build-pin absolute left-6 lg:left-12 bottom-20 hidden lg:block w-[240px] rounded-md border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
          <span className="hero-annotation text-[#b02222]">02 · the build</span>
          <span className="hero-annotation">in progress</span>
        </div>
        <ul className="p-3 space-y-2">
          {BUILD_STEPS.map((label) => (
            <li key={label} className="flex items-center gap-2.5">
              <span className="relative w-1.5 h-1.5 rounded-full shrink-0 border border-white/25">
                <span className="step-fill absolute -inset-px rounded-full bg-[#b02222] scale-0" />
              </span>
              <span
                className="hero-annotation step-label"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {label}
              </span>
            </li>
          ))}
          <li className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 border border-[#b02222]/60 animate-pulse" />
            <span className="hero-annotation !text-white/20">Ship it</span>
          </li>
        </ul>
      </div>

      {/* Right pin — self-referential source panel, surface level: just the
          human-readable header of the component being rendered. Lines write
          themselves in as the visitor scrolls (.src-line). */}
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
              <span key={i} className="src-line block whitespace-pre">
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
