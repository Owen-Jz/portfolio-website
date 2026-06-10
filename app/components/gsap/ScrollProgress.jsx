"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../libs/gsap";

/**
 * ScrollProgress — hairline brand-gradient bar pinned to the top of the
 * viewport, scaling with overall page progress.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: barRef }
  );

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[150] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[#b02222] via-[#d34a4a] to-orange-600 will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
