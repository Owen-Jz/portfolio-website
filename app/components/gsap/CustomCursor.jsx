"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../libs/gsap";

/**
 * CustomCursor — blend-mode dot + trailing ring. The ring inflates over
 * interactive elements and becomes a filled "VIEW" chip over anything
 * marked data-cursor="view". Desktop pointer devices only; the native
 * cursor is hidden via html.cursor-custom while mounted.
 */
export default function CustomCursor() {
  const wrapRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const dot = dotRef.current;
          const ring = ringRef.current;
          const label = labelRef.current;
          document.documentElement.classList.add("cursor-custom");
          gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

          const dotX = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power3" });
          const dotY = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power3" });
          const ringX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3" });
          const ringY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3" });

          const onMove = (e) => {
            dotX(e.clientX);
            dotY(e.clientY);
            ringX(e.clientX);
            ringY(e.clientY);
          };

          const setState = (state) => {
            if (state === "view") {
              gsap.to(ring, { scale: 2.6, backgroundColor: "rgba(255,255,255,1)", duration: 0.3 });
              gsap.to(label, { opacity: 1, duration: 0.2, delay: 0.08 });
              gsap.to(dot, { opacity: 0, duration: 0.2 });
            } else if (state === "link") {
              gsap.to(ring, { scale: 1.6, backgroundColor: "rgba(255,255,255,0)", duration: 0.3 });
              gsap.to(label, { opacity: 0, duration: 0.15 });
              gsap.to(dot, { opacity: 1, duration: 0.2 });
            } else {
              gsap.to(ring, { scale: 1, backgroundColor: "rgba(255,255,255,0)", duration: 0.3 });
              gsap.to(label, { opacity: 0, duration: 0.15 });
              gsap.to(dot, { opacity: 1, duration: 0.2 });
            }
          };

          const onOver = (e) => {
            const t = e.target instanceof Element ? e.target : null;
            if (!t) return;
            if (t.closest("[data-cursor='view']")) setState("view");
            else if (t.closest("a, button, [role='button'], input, textarea, select, label")) setState("link");
            else setState("default");
          };

          const onLeaveDoc = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
          const onEnterDoc = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });

          window.addEventListener("mousemove", onMove, { passive: true });
          window.addEventListener("mouseover", onOver, { passive: true });
          document.documentElement.addEventListener("mouseleave", onLeaveDoc);
          document.documentElement.addEventListener("mouseenter", onEnterDoc);

          return () => {
            document.documentElement.classList.remove("cursor-custom");
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
            document.documentElement.removeEventListener("mouseenter", onEnterDoc);
          };
        }
      );
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} aria-hidden="true" className="hidden md:block">
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[300] w-10 h-10 rounded-full border border-white/70 pointer-events-none mix-blend-difference flex items-center justify-center will-change-transform"
      >
        <span
          ref={labelRef}
          className="text-black text-[8px] font-bold font-manrope uppercase tracking-[0.2em] opacity-0 select-none"
        >
          View
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[300] w-1.5 h-1.5 rounded-full bg-white pointer-events-none mix-blend-difference will-change-transform"
      />
    </div>
  );
}
