"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../libs/gsap";

/**
 * MarqueeBand — infinite editorial text band whose speed and direction
 * react to scroll velocity: flick the page and the band surges with you,
 * scroll up and it reverses. Two variants:
 *   ghost  — quiet outlined/solid alternation on the page background
 *   accent — solid brand-red tilted band for high-energy moments
 */
export default function MarqueeBand({ items = [], variant = "ghost", className = "" }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(trackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: variant === "accent" ? 22 : 46,
          ease: "none",
        });

        const st = ScrollTrigger.create({
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            const burst = gsap.utils.clamp(-4, 4, v / 300);
            // surge with the scroll, then relax to a steady crawl in
            // whichever direction the user last scrolled
            tween.timeScale(Math.abs(burst) < 1 ? Math.sign(burst) || 1 : burst);
            gsap.to(tween, {
              timeScale: v < 0 ? -1 : 1,
              duration: 1.4,
              overwrite: "auto",
            });
          },
        });

        return () => {
          st.kill();
          tween.kill();
        };
      });
    },
    { scope: wrapRef }
  );

  const isAccent = variant === "accent";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`relative overflow-hidden select-none ${
        isAccent
          ? "bg-[#b02222] py-4 md:py-5 -rotate-[1.2deg] scale-[1.03] my-8 shadow-[0_0_80px_rgba(176,34,34,0.25)]"
          : "border-y border-white/[0.05] py-4 md:py-5 bg-[#0a0a0a]"
      } ${className}`}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center shrink-0">
                {isAccent ? (
                  <>
                    <span
                      className={`px-6 md:px-10 font-manrope font-extrabold uppercase tracking-tight whitespace-nowrap text-2xl md:text-4xl ${
                        i % 2 === 0 ? "text-white" : "text-transparent"
                      }`}
                      style={
                        i % 2 === 1
                          ? { WebkitTextStroke: "1.5px rgba(0,0,0,0.55)" }
                          : undefined
                      }
                    >
                      {item}
                    </span>
                    <span className="text-lg md:text-2xl text-black/50">✦</span>
                  </>
                ) : (
                  <>
                    {/* ghost: one quiet mono line in the hero's blueprint voice */}
                    <span className="px-8 md:px-14 font-mono uppercase tracking-[0.3em] whitespace-nowrap text-[11px] md:text-sm text-white/35">
                      {item}
                    </span>
                    <span className="inline-block w-1 h-1 rounded-full bg-[#b02222]/50" />
                  </>
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
