"use client";

import { useEffect, useState } from "react";
import { formatSpec } from "./specFormat.js";

/**
 * Live-true spec labels. Reads getComputedStyle for each ref'd element and
 * re-measures on resize and font load. refsMap: { key: ref }. Returns
 * { key: "H1 · 96px · -2% · Archivo 120" }.
 */
export function useLiveSpecs(refsMap) {
  const [specs, setSpecs] = useState({});

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      const next = {};
      for (const [key, ref] of Object.entries(refsMap)) {
        const el = ref.current;
        if (!el) continue;
        const cs = getComputedStyle(el);
        const ls = cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing);
        // variable font weight lives in --wght when animated; fall back to font-weight
        const wghtVar = parseFloat(cs.getPropertyValue("--wght"));
        next[key] = formatSpec({
          tag: el.tagName,
          fontSizePx: parseFloat(cs.fontSize),
          letterSpacingPx: ls || 0,
          fontFamily: cs.fontFamily,
          weight: Number.isFinite(wghtVar) ? wghtVar : parseFloat(cs.fontWeight),
        });
      }
      setSpecs(next);
    };

    measure();
    document.fonts?.ready?.then(() => { if (!cancelled) measure(); });
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
    // refsMap is expected to be a stable object created once by the caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return specs;
}
