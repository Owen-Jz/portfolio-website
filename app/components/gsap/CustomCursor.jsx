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
  const coordsRef = useRef(null);
  const caretRef = useRef(null);

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
            if (heroMode === "crosshair" && coordsRef.current) {
              coordsRef.current.textContent = `x ${e.clientX} · y ${e.clientY}`;
              gsap.set(coordsRef.current, { x: e.clientX + 18, y: e.clientY + 18 });
            }
            if (heroMode === "caret" && caretRef.current) {
              gsap.set(caretRef.current, { x: e.clientX + 6, y: e.clientY - 8 });
            }
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

          let heroMode = "default";
          const onHeroCursor = (e) => {
            heroMode = e.detail?.mode || "default";
            const coords = coordsRef.current;
            const caret = caretRef.current;
            gsap.to(coords, { opacity: heroMode === "crosshair" ? 1 : 0, duration: 0.2 });
            gsap.to(caret, { opacity: heroMode === "caret" ? 1 : 0, duration: 0.2 });
            // crosshair: shrink ring to a small plus-like dot; caret: hide ring
            gsap.to(ring, {
              scale: heroMode === "caret" ? 0 : heroMode === "crosshair" ? 0.5 : 1,
              duration: 0.3,
            });
            gsap.to(dot, { opacity: heroMode === "caret" ? 0 : 1, duration: 0.2 });
          };
          window.addEventListener("hero-cursor", onHeroCursor);

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
            window.removeEventListener("hero-cursor", onHeroCursor);
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
      {/* Hero chapter modes */}
      <div
        ref={coordsRef}
        className="fixed top-0 left-0 z-[300] pointer-events-none hero-annotation !text-white/50 opacity-0 will-change-transform"
        style={{ transform: "translate(16px, 16px)" }}
      />
      <div
        ref={caretRef}
        className="fixed top-0 left-0 z-[300] w-[2px] h-4 bg-[#b02222] pointer-events-none opacity-0 will-change-transform animate-pulse"
      />
    </div>
  );
}
