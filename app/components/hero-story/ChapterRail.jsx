"use client";

import React from "react";

const LABELS = ["The Idea", "The Build", "The Ship"];

/**
 * Persistent chapter rail. Numbers are real buttons — jump links that
 * scroll to each chapter's hold plateau (skip affordance, keyboard-usable).
 */
export default function ChapterRail({ active = 0, onJump }) {
  return (
    <nav
      aria-label="Hero chapters"
      className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:pointer-fine:flex flex-col gap-6"
    >
      {LABELS.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => onJump?.(i)}
          className="group flex items-center gap-3 pointer-events-auto"
          aria-current={active === i ? "step" : undefined}
        >
          <span
            className={`hero-annotation transition-colors duration-300 ${
              active === i ? "text-[#b02222]" : "text-white/30 group-hover:text-white/60"
            }`}
          >
            0{i + 1}
          </span>
          <span
            className={`h-px transition-all duration-300 ${
              active === i ? "w-8 bg-[#b02222]" : "w-4 bg-white/20 group-hover:bg-white/40"
            }`}
          />
          <span
            className={`hero-annotation transition-opacity duration-300 ${
              active === i ? "opacity-100" : "opacity-0 group-hover:opacity-60"
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
