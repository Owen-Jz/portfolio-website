"use client";

import React, { forwardRef, useEffect, useState, useRef } from "react";
import { useLiveSpecs } from "./useLiveSpecs.js";

/**
 * Ch.1 decoration: blueprint grid, dashed frames around the real stage
 * elements, live-true spec labels, measurement hairlines. Never interactive.
 */
const BlueprintLayer = forwardRef(function BlueprintLayer({ stageRef }, ref) {
  const [frames, setFrames] = useState([]);

  // Resolve the real elements from the stage before useLiveSpecs measures.
  // useLiveSpecs skips null refs on its mount pass and re-measures on
  // document.fonts.ready, which picks these up.
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  useEffect(() => {
    h1Ref.current = stageRef.current?.querySelector("[data-hero='headline']") ?? null;
    subRef.current = stageRef.current?.querySelector("[data-hero='subline']") ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const specs = useLiveSpecs({ h1: h1Ref, sub: subRef });

  // Frame the real elements — re-measured on resize and after fonts load.
  useEffect(() => {
    let active = true;
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rootEl = stage.closest("[data-hero-root]");
      if (!rootEl) return;
      const stageBox = rootEl.getBoundingClientRect();
      const keys = ["headline", "subline", "badge", "ctas"];
      setFrames(
        keys
          .map((key) => {
            const el = stage.querySelector(`[data-hero="${key}"]`);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return {
              key,
              left: r.left - stageBox.left - 12,
              top: r.top - stageBox.top - 12,
              width: r.width + 24,
              height: r.height + 24,
            };
          })
          .filter(Boolean)
      );
    };
    measure();
    document.fonts?.ready?.then(() => { if (active) measure(); });
    window.addEventListener("resize", measure);
    return () => { active = false; window.removeEventListener("resize", measure); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden md:block absolute inset-0 z-[5] pointer-events-none overflow-hidden"
    >
      {/* Fine blueprint grid */}
      <div
        className="bp-grid absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Dashed selection frames + live spec labels */}
      {frames.map((f) => (
        <div
          key={f.key}
          className="bp-frame absolute border border-dashed border-white/25"
          style={{ left: f.left, top: f.top, width: f.width, height: f.height }}
        >
          {/* corner handles, Figma-style */}
          {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map(
            (pos) => (
              <span
                key={pos}
                className={`absolute ${pos} w-2 h-2 bg-[#0a0a0a] border border-white/50`}
              />
            )
          )}
          {f.key === "headline" && specs.h1 && (
            <span className="bp-spec hero-annotation absolute -top-6 left-0 whitespace-nowrap">
              {specs.h1}
            </span>
          )}
          {f.key === "subline" && specs.sub && (
            <span className="bp-spec hero-annotation absolute -bottom-6 left-0 whitespace-nowrap">
              {specs.sub}
            </span>
          )}
          {f.key === "ctas" && (
            <span className="bp-spec hero-annotation absolute -bottom-6 right-0 whitespace-nowrap">
              component · button × 2 · state: draft
            </span>
          )}
        </div>
      ))}
    </div>
  );
});

export default BlueprintLayer;
