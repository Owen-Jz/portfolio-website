"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../libs/gsap";
import { KICKERS } from "./chapters.js";

const BEAT_SECONDS = 2.2;

/**
 * Mobile hero story: the same three beats as a designed, auto-playing
 * sequence (tap anywhere on the hero to advance). Pure CSS/SVG + GSAP time
 * tweens — no pin, no WebGL, nothing extra downloaded.
 */
export default function HeroStoryMobile({ stageRef }) {
  const wrapRef = useRef(null);
  const [beat, setBeat] = useState(0);
  const tlRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage = stageRef.current;
          const headline = stage.querySelector("[data-hero='headline']");
          const subline = stage.querySelector("[data-hero='subline']");
          const kicker = stage.querySelector("[data-hero='kicker']");
          const ctas = gsap.utils.toArray("[data-hero^='cta-']", stage);
          const primary = stage.querySelector("[data-hero='cta-primary']");
          // Capture wrapRef.current in a local const so the cleanup closure
          // holds a stable reference even if the ref is nulled before cleanup runs.
          const wrapEl = wrapRef.current;
          const frame = wrapEl.querySelector(".m-frame");

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onUpdate: () => {
              const t = tl.time();
              setBeat(t < BEAT_SECONDS ? 0 : t < BEAT_SECONDS * 2 ? 1 : 2);
            },
          });
          tlRef.current = tl;

          // Beat 1 — the idea (starts from HeroStage's wireframe defaults)
          tl.from(frame, { opacity: 0, scale: 0.97, duration: 0.5 });
          tl.addLabel("build", BEAT_SECONDS);

          // Beat 2 — the build
          tl.call(() => (kicker.textContent = KICKERS[1]), [], "build");
          tl.to([headline, subline], { "--wght": 500, duration: 0.8 }, "build");
          tl.to(
            wrapEl.querySelectorAll(".m-draw"),
            { strokeDashoffset: 0, duration: 0.9, stagger: 0.1 },
            "build"
          );
          tl.addLabel("ship", BEAT_SECONDS * 2);

          // Beat 3 — the ship
          tl.call(() => (kicker.textContent = KICKERS[2]), [], "ship");
          tl.to([headline, subline], { "--wght": 900, duration: 0.7 }, "ship");
          tl.to(frame, { opacity: 0, duration: 0.6 }, "ship");
          tl.to(
            ctas,
            { "--cta-border-alpha": 0, "--cta-text-alpha": 1, duration: 0.6 },
            "ship"
          );
          tl.to(primary, { "--cta-bg-alpha": 1, duration: 0.6 }, "ship");
          tl.call(() => ctas.forEach((el) => (el.style.borderStyle = "solid")), [], "ship+=0.3");

          const advance = () => {
            const labels = [0, tl.labels.build, tl.labels.ship];
            const t = tl.time();
            const next = labels.find((l) => l > t + 0.05);
            if (next !== undefined) tl.play(next);
          };
          wrapEl.addEventListener("pointerup", advance);
          return () => {
            wrapEl.removeEventListener("pointerup", advance);
            tl.kill();
          };
        }
      );

      // Reduced motion on mobile: Task 12's reduce context already sets the
      // final frame; this component renders inert decorations only.
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className="absolute inset-0 z-[5] md:hidden" aria-hidden="true">
      {/* dashed viewport frame, beat 1 */}
      <div className="m-frame absolute inset-4 border border-dashed border-white/20 rounded-sm pointer-events-none" />
      {/* draw-in hairlines, beat 2 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {["M 6 30 H 94", "M 6 72 H 94"].map((d, i) => (
          <path
            key={i}
            d={d}
            className="m-draw"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.15"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {/* beat indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-6 h-px transition-colors duration-300 ${
              beat >= i ? "bg-[#b02222]" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
