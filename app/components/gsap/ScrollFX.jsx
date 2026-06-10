"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../libs/gsap";

/**
 * Parallax — scrub-translates an element vertically as it crosses the viewport.
 * Use for background glows, images, and decorative layers.
 * speed > 0 drifts upward against scroll, speed < 0 drifts with it.
 * Desktop-only; respects prefers-reduced-motion.
 */
export function Parallax({ children, speed = 0.3, className = "", style }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ref.current,
            { y: () => speed * 140 },
            {
              y: () => -speed * 140,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * WordReveal — splits a heading into words, each masked and slid up
 * with a stagger when the heading enters the viewport.
 * `highlight` marks words (case-insensitive, punctuation ignored) to
 * receive `highlightClass` — e.g. the brand-red accent word.
 */
export function WordReveal({
  text,
  as: Tag = "h2",
  className = "",
  highlight = [],
  highlightClass = "text-[#b02222]",
  stagger = 0.07,
  start = "top 85%",
}) {
  const ref = useRef(null);
  const words = text.split(" ");
  const cleanWord = (w) => w.toLowerCase().replace(/[^\w]/g, "");
  const highlightSet = new Set(
    (Array.isArray(highlight) ? highlight : [highlight]).map(cleanWord)
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current.querySelectorAll(".wr-word"),
        { yPercent: 120, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          >
            <span
              className={`wr-word inline-block will-change-transform ${
                highlightSet.has(cleanWord(word)) ? highlightClass : ""
              }`}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/**
 * LineReveal — wraps each direct child in an overflow mask and slides
 * it up on enter. Use for multi-line display headings where each line
 * carries its own styling.
 */
export function LineReveal({
  children,
  className = "",
  stagger = 0.12,
  start = "top 85%",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current.querySelectorAll(".lr-line"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child) => (
        <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <span className="lr-line block will-change-transform">{child}</span>
        </span>
      ))}
    </div>
  );
}
