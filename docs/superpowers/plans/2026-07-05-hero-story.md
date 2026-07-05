# "Blueprint to Reality" Hero Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the landing-page hero with a 240vh pinned scrollytelling narrative in which the hero UI visibly builds itself (idea → build → ship), backed by a lazy-loaded Three.js point-cloud layer.

**Architecture:** A persistent, server-rendered `HeroStage` (headline, kicker, CTAs, badge — real and clickable from frame one) sits inside a pinned section. Three decoration layers (Blueprint/Build/Ship) and a WebGL particle layer are choreographed by ONE GSAP master timeline (`scrub: 0.5`) that also tweens a plain `glState` object feeding shader uniforms, so DOM and WebGL can never drift. Mobile and reduced-motion get separate, complete, non-pinned treatments.

**Tech Stack:** Next.js 15 (App Router, JS not TS), GSAP 3.15 + ScrollTrigger + @gsap/react, Lenis, plain `three` (new), Tailwind 4, vitest (new, logic-only tests).

**Spec:** `docs/superpowers/specs/2026-07-05-hero-story-design.md` — read it before starting any task.

## Global Constraints

- Palette: canvas `#0a0a0a`, accent `#b02222`, white hairlines at low opacity. No new colors.
- **No Framer Motion anywhere inside `app/components/hero-story/`** — GSAP only.
- Pin: `start: "top top", end: "+=240%", scrub: 0.5, anticipatePin: 1`.
- No `bg-clip-text` shimmer anywhere in the new hero.
- CTAs and headline are real DOM from SSR, focusable and clickable at all scroll positions. Materialization is style-only.
- Three.js must never be downloaded on mobile (<768px), coarse pointers, or `prefers-reduced-motion: reduce`.
- All annotation spec labels must be computed from real `getComputedStyle` values.
- Dev server on Node 25 needs: `node --no-experimental-webstorage node_modules/next/dist/bin/next dev --turbopack` — or use `npm run dev` only if it already works in your session. Verify with `node -v` first.
- Every `gsap.matchMedia()` desktop context uses: `"(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"`.
- Commit after every task (each task ends with a commit step). Never commit `node_modules`.

## File Map (created/modified across all tasks)

```
Create: app/components/hero-story/chapters.js            (Task 3)
Create: app/components/hero-story/__tests__/chapters.test.js
Create: app/components/hero-story/specFormat.js          (Task 4)
Create: app/components/hero-story/__tests__/specFormat.test.js
Create: app/components/hero-story/useLiveSpecs.js        (Task 4)
Create: app/components/hero-story/pointTargets.js        (Task 5)
Create: app/components/hero-story/__tests__/pointTargets.test.js
Create: app/libs/lenis.js                                (Task 6)
Create: app/components/hero-story/HeroStage.jsx          (Task 7)
Create: app/components/hero-story/BlueprintLayer.jsx     (Task 8)
Create: scripts/generate-hero-source.mjs                 (Task 9)
Create: app/components/hero-story/heroSource.generated.js (Task 9, generated)
Create: app/components/hero-story/BuildLayer.jsx         (Task 9)
Create: app/components/hero-story/ShipLayer.jsx          (Task 10)
Create: app/components/hero-story/HeroParticles.jsx      (Task 11)
Create: app/components/hero-story/ChapterRail.jsx        (Task 12)
Create: app/components/hero-story/HeroStory.jsx          (Task 12)
Modify: app/components/gsap/CustomCursor.jsx             (Task 13)
Create: app/components/hero-story/HeroStoryMobile.jsx    (Task 14)
Modify: app/page.js                                      (Tasks 6, 15)
Modify: app/layout.js                                    (Task 2)
Modify: app/globals.css                                  (Tasks 2, 7)
Modify: package.json                                     (Tasks 1, 9)
```

---

### Task 1: Dependencies & Test Harness

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `three` importable; `npm test` runs vitest; `npm run test:watch` available.

- [ ] **Step 1: Install dependencies**

```powershell
npm install three
npm install -D vitest
```

- [ ] **Step 2: Add test scripts to package.json**

In `package.json` `"scripts"`, add (keep existing scripts untouched):

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Verify vitest runs (zero tests is OK)**

Run: `npm test`
Expected: vitest exits reporting "No test files found" (exit code may be 1 — that's fine at this stage; it proves the binary works).

- [ ] **Step 4: Verify the production build still passes**

Run: `npm run build`
Expected: build completes with no new errors.

- [ ] **Step 5: Commit**

```powershell
git add package.json package-lock.json
git commit -m "chore: add three and vitest for hero story"
```

---

### Task 2: Variable Display Font (Archivo)

The type IS the animation (spec §3): weight animates 100→900 across chapters. Archivo variable (Google Fonts) has wght 100–900 + wdth 62–125, loads via `next/font/google` with zero layout shift. (Owen reviews it visually at the Task 8 checkpoint; swapping candidates later means changing only this task's code.)

**Files:**
- Modify: `app/layout.js`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS variable `--font-archivo`; utility class `.font-display`; headline weight driven by custom property `--wght` through `font-variation-settings`.

- [ ] **Step 1: Load Archivo in layout.js**

In `app/layout.js`, extend the font imports:

```js
import { Manrope, Archivo } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});
```

And put both font variables on `<body>` (keep `manrope.className` so the default body font is unchanged):

```jsx
<body className={`${manrope.className} ${manrope.variable} ${archivo.variable}`}>
```

- [ ] **Step 2: Add the display utility to globals.css**

Append to `app/globals.css` (after the `.font-manrope` block):

```css
/* Variable display face for the hero story — weight is animated via --wght */
.font-display {
  font-family: var(--font-archivo), "Archivo", sans-serif;
  font-variation-settings: "wght" var(--wght, 900), "wdth" var(--wdth, 100);
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: passes; no font loader errors.

- [ ] **Step 4: Commit**

```powershell
git add app/layout.js app/globals.css
git commit -m "feat(hero): load Archivo variable font with wght/wdth axes"
```

---

### Task 3: Chapter Timing Model (TDD)

Single source of truth for all scroll choreography. Every timeline position in Task 12 references these constants — no magic numbers in components.

**Files:**
- Create: `app/components/hero-story/chapters.js`
- Test: `app/components/hero-story/__tests__/chapters.test.js`

**Interfaces:**
- Produces: `CHAPTERS` (`{idea, build, ship}`, each `{enter:[a,b], hold:[a,b], exit:[a,b]}`), `EVENTS` (`{assemble:[a,b], weightFill:[a,b], release:[a,b]}`), `PIN_END = "+=240%"`, `bd(band) => number`, `chapterAt(progress) => 0|1|2`.

- [ ] **Step 1: Write the failing test**

Create `app/components/hero-story/__tests__/chapters.test.js`:

```js
import { describe, it, expect } from "vitest";
import { CHAPTERS, EVENTS, PIN_END, bd, chapterAt } from "../chapters.js";

const bandsOf = (ch) => [ch.enter, ch.hold, ch.exit];

describe("chapter bands", () => {
  it("covers 0..1 contiguously in order idea->build->ship", () => {
    const all = [
      ...bandsOf(CHAPTERS.idea),
      ...bandsOf(CHAPTERS.build),
      ...bandsOf(CHAPTERS.ship),
    ];
    expect(all[0][0]).toBe(0);
    expect(all[all.length - 1][1]).toBe(1);
    for (let i = 1; i < all.length; i++) {
      expect(all[i][0]).toBeCloseTo(all[i - 1][1], 10); // contiguous
      expect(all[i][1]).toBeGreaterThan(all[i][0]); // monotonic
    }
  });

  it("gives every chapter a hold plateau of at least 10% scroll", () => {
    for (const ch of Object.values(CHAPTERS)) {
      expect(bd(ch.hold)).toBeGreaterThanOrEqual(0.1);
    }
  });

  it("keeps big events inside narrow windows (<= 10% scroll)", () => {
    expect(bd(EVENTS.assemble)).toBeLessThanOrEqual(0.1);
    expect(bd(EVENTS.weightFill)).toBeLessThanOrEqual(0.1);
  });

  it("places assemble inside build and weightFill at ship entrance", () => {
    expect(EVENTS.assemble[0]).toBeGreaterThanOrEqual(CHAPTERS.build.enter[0]);
    expect(EVENTS.assemble[1]).toBeLessThanOrEqual(CHAPTERS.build.hold[1]);
    expect(EVENTS.weightFill[0]).toBeCloseTo(CHAPTERS.ship.enter[0], 10);
  });

  it("bd returns band duration", () => {
    expect(bd([0.2, 0.5])).toBeCloseTo(0.3, 10);
  });

  it("chapterAt maps progress to chapter index", () => {
    expect(chapterAt(0)).toBe(0);
    expect(chapterAt(0.32)).toBe(0);
    expect(chapterAt(0.34)).toBe(1);
    expect(chapterAt(0.65)).toBe(1);
    expect(chapterAt(0.67)).toBe(2);
    expect(chapterAt(1)).toBe(2);
  });

  it("pins for 240% viewport height", () => {
    expect(PIN_END).toBe("+=240%");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../chapters.js`.

- [ ] **Step 3: Implement chapters.js**

Create `app/components/hero-story/chapters.js`:

```js
/**
 * Scroll choreography model for the hero story. All values are progress
 * fractions (0..1) across the 240vh pin. Plateau choreography: each chapter
 * gets an entrance, a hold (nothing animates — a screenshot-able frame),
 * and an exit. Big events live in narrow bands so they read as events.
 */
export const CHAPTERS = {
  idea: { enter: [0.0, 0.06], hold: [0.06, 0.24], exit: [0.24, 0.33] },
  build: { enter: [0.33, 0.4], hold: [0.4, 0.56], exit: [0.56, 0.66] },
  ship: { enter: [0.66, 0.74], hold: [0.74, 0.92], exit: [0.92, 1.0] },
};

export const EVENTS = {
  assemble: [0.4, 0.48], // particle snap into the exploded UI wireframe
  weightFill: [0.66, 0.74], // type wght 500 -> 900, red floods in
  release: [0.92, 1.0], // stage eases up into the marquee handoff
};

export const PIN_END = "+=240%";

/** Band duration. */
export const bd = (band) => band[1] - band[0];

/** Which chapter (0|1|2) a scroll progress value falls in. */
export function chapterAt(progress) {
  if (progress < CHAPTERS.build.enter[0]) return 0;
  if (progress < CHAPTERS.ship.enter[0]) return 1;
  return 2;
}
```

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test`
Expected: all `chapters` tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add app/components/hero-story/chapters.js app/components/hero-story/__tests__/chapters.test.js
git commit -m "feat(hero): chapter timing model with plateau choreography"
```

---

### Task 4: Live Spec Annotations (TDD on the pure part)

Spec §3 truth constraint: labels like `H1 · 96px · –2.0% · Archivo 120` must be computed from real computed styles and re-measured on resize.

**Files:**
- Create: `app/components/hero-story/specFormat.js`
- Create: `app/components/hero-story/useLiveSpecs.js`
- Test: `app/components/hero-story/__tests__/specFormat.test.js`

**Interfaces:**
- Produces: `formatSpec({tag, fontSizePx, letterSpacingPx, fontFamily, weight}) => string`; `useLiveSpecs(refsMap) => {[key]: string}` where `refsMap` is `{key: React ref}`.

- [ ] **Step 1: Write the failing test**

Create `app/components/hero-story/__tests__/specFormat.test.js`:

```js
import { describe, it, expect } from "vitest";
import { formatSpec } from "../specFormat.js";

describe("formatSpec", () => {
  it("formats tag, size, tracking percent, family and weight", () => {
    expect(
      formatSpec({
        tag: "H1",
        fontSizePx: 96,
        letterSpacingPx: -1.92,
        fontFamily: '"Archivo", sans-serif',
        weight: 120,
      })
    ).toBe("H1 · 96px · -2% · Archivo 120");
  });

  it("handles letter-spacing 'normal' (0px)", () => {
    expect(
      formatSpec({
        tag: "P",
        fontSizePx: 18,
        letterSpacingPx: 0,
        fontFamily: "Manrope, sans-serif",
        weight: 400,
      })
    ).toBe("P · 18px · 0% · Manrope 400");
  });

  it("rounds size to whole px and tracking to one decimal", () => {
    expect(
      formatSpec({
        tag: "H1",
        fontSizePx: 95.6,
        letterSpacingPx: -1.434, // -1.5% of 95.6
        fontFamily: "Archivo",
        weight: 900,
      })
    ).toBe("H1 · 96px · -1.5% · Archivo 900");
  });

  it("strips quotes and CSS var fallbacks from family", () => {
    expect(
      formatSpec({
        tag: "H1",
        fontSizePx: 64,
        letterSpacingPx: 0,
        fontFamily: "__Archivo_abc123, Archivo, sans-serif",
        weight: 500,
      })
    ).toBe("H1 · 64px · 0% · Archivo 500");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../specFormat.js`.

- [ ] **Step 3: Implement specFormat.js**

Create `app/components/hero-story/specFormat.js`:

```js
/**
 * Pure formatter for live design-spec annotations. Values must come from
 * getComputedStyle so the labels are true — the meta-honesty is the design.
 */
export function formatSpec({ tag, fontSizePx, letterSpacingPx, fontFamily, weight }) {
  const trackingPct =
    fontSizePx > 0 ? Math.round((letterSpacingPx / fontSizePx) * 1000) / 10 : 0;
  // "-2" not "-2.0" — drop trailing .0
  const tracking = Number.isInteger(trackingPct) ? String(trackingPct) : String(trackingPct);
  const family = cleanFamily(fontFamily);
  return `${tag} · ${Math.round(fontSizePx)}px · ${tracking}% · ${family} ${Math.round(weight)}`;
}

/** First readable family name: strips quotes and next/font internal names. */
function cleanFamily(fontFamily) {
  const parts = String(fontFamily)
    .split(",")
    .map((p) => p.trim().replace(/^["']|["']$/g, ""))
    .filter((p) => p && !p.startsWith("__") && !p.startsWith("var("));
  return parts[0] || "sans-serif";
}
```

Note: `Number.isInteger(-2)` is true and `String(-2)` is `"-2"`; `String(-1.5)` is `"-1.5"` — the test's expectations hold without special casing. Simplify to `const tracking = String(trackingPct);` if the intermediate variable bothers you.

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test`
Expected: all `specFormat` tests PASS.

- [ ] **Step 5: Implement the hook (no unit test — DOM-bound, verified in Task 8 visually)**

Create `app/components/hero-story/useLiveSpecs.js`:

```js
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
    document.fonts?.ready?.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // refsMap is expected to be a stable object created once by the caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return specs;
}
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: passes.

- [ ] **Step 7: Commit**

```powershell
git add app/components/hero-story/specFormat.js app/components/hero-story/useLiveSpecs.js app/components/hero-story/__tests__/specFormat.test.js
git commit -m "feat(hero): live-true spec annotation formatting"
```

---

### Task 5: Particle Target Geometry (TDD)

Pure math that turns the stage's DOM rects into three per-particle target states: `scattered` (noise dust), `exploded` (axonometric wireframe of the UI planes), `settled` (calm ambient band). The vertex shader mixes between them.

**Files:**
- Create: `app/components/hero-story/pointTargets.js`
- Test: `app/components/hero-story/__tests__/pointTargets.test.js`

**Interfaces:**
- Consumes: nothing from other tasks (pure module).
- Produces: `buildTargets({count, rects, viewport, seed}) => {scattered, exploded, settled: Float32Array(count*3)}`; `mulberry32(seed) => () => number`. `rects` is an array of `{x, y, width, height, z}` in CSS pixels (z = world-space plane depth, e.g. headline 0, CTAs -60, badge -120). World mapping: `wx = x - viewport.w/2`, `wy = -(y - viewport.h/2)` (Y flips; Three.js Y-up), 1 CSS px = 1 world unit.

- [ ] **Step 1: Write the failing test**

Create `app/components/hero-story/__tests__/pointTargets.test.js`:

```js
import { describe, it, expect } from "vitest";
import { buildTargets, mulberry32 } from "../pointTargets.js";

const viewport = { w: 1000, h: 800 };
const rects = [
  { x: 300, y: 200, width: 400, height: 120, z: 0 }, // headline
  { x: 380, y: 500, width: 240, height: 48, z: -60 }, // CTA row
];

describe("mulberry32", () => {
  it("is deterministic for a seed and outputs [0,1)", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 100; i++) {
      const va = a();
      expect(va).toBe(b());
      expect(va).toBeGreaterThanOrEqual(0);
      expect(va).toBeLessThan(1);
    }
  });
});

describe("buildTargets", () => {
  const count = 3000;
  const t = buildTargets({ count, rects, viewport, seed: 7 });

  it("returns three Float32Arrays of count*3", () => {
    for (const key of ["scattered", "exploded", "settled"]) {
      expect(t[key]).toBeInstanceOf(Float32Array);
      expect(t[key].length).toBe(count * 3);
    }
  });

  it("scattered points stay inside 1.2x the viewport volume", () => {
    for (let i = 0; i < count; i++) {
      expect(Math.abs(t.scattered[i * 3])).toBeLessThanOrEqual(viewport.w * 0.6 * 1.2);
      expect(Math.abs(t.scattered[i * 3 + 1])).toBeLessThanOrEqual(viewport.h * 0.6 * 1.2);
    }
  });

  it("exploded points lie on a rect perimeter at that rect's plane depth", () => {
    for (let i = 0; i < count; i++) {
      const x = t.exploded[i * 3];
      const y = t.exploded[i * 3 + 1];
      const z = t.exploded[i * 3 + 2];
      const rect = rects.find((r) => Math.abs(z - r.z) < 1e-3);
      expect(rect).toBeDefined();
      // back to CSS space
      const cx = x + viewport.w / 2;
      const cy = -y + viewport.h / 2;
      const onVertEdge =
        (Math.abs(cx - rect.x) < 1e-3 || Math.abs(cx - (rect.x + rect.width)) < 1e-3) &&
        cy >= rect.y - 1e-3 && cy <= rect.y + rect.height + 1e-3;
      const onHorizEdge =
        (Math.abs(cy - rect.y) < 1e-3 || Math.abs(cy - (rect.y + rect.height)) < 1e-3) &&
        cx >= rect.x - 1e-3 && cx <= rect.x + rect.width + 1e-3;
      expect(onVertEdge || onHorizEdge).toBe(true);
    }
  });

  it("distributes exploded points across all rects", () => {
    const zs = new Set();
    for (let i = 0; i < count; i++) zs.add(t.exploded[i * 3 + 2]);
    expect(zs.size).toBe(rects.length);
  });

  it("settled points form a low horizontal band below center", () => {
    for (let i = 0; i < count; i++) {
      const y = t.settled[i * 3 + 1];
      expect(y).toBeLessThanOrEqual(0); // lower half only
      expect(y).toBeGreaterThanOrEqual(-viewport.h * 0.6);
    }
  });

  it("is deterministic for the same seed", () => {
    const t2 = buildTargets({ count, rects, viewport, seed: 7 });
    expect(t2.scattered[123]).toBe(t.scattered[123]);
    expect(t2.exploded[456]).toBe(t.exploded[456]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../pointTargets.js`.

- [ ] **Step 3: Implement pointTargets.js**

Create `app/components/hero-story/pointTargets.js`:

```js
/**
 * Pure geometry for the hero point cloud. Three target states per particle:
 *   scattered — loose dust in a shallow volume around the stage
 *   exploded  — points on the perimeters of the real UI rects, each rect on
 *               its own z-plane (the "exploded axonometric wireframe")
 *   settled   — a calm horizontal drift band in the lower half
 * DOM -> world: wx = x - w/2, wy = -(y - h/2), 1 CSS px = 1 world unit.
 */

/** Small deterministic PRNG so targets are stable across renders/tests. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildTargets({ count, rects, viewport, seed = 1 }) {
  const rand = mulberry32(seed);
  const scattered = new Float32Array(count * 3);
  const exploded = new Float32Array(count * 3);
  const settled = new Float32Array(count * 3);
  const halfW = viewport.w / 2;
  const halfH = viewport.h / 2;

  for (let i = 0; i < count; i++) {
    // --- scattered: shallow noise volume, slightly wider than the viewport
    scattered[i * 3] = (rand() * 2 - 1) * halfW * 1.15;
    scattered[i * 3 + 1] = (rand() * 2 - 1) * halfH * 1.15;
    scattered[i * 3 + 2] = (rand() * 2 - 1) * 160;

    // --- exploded: pick a rect (weighted by perimeter), pick a point on it
    const rect = pickByPerimeter(rects, rand());
    const [px, py] = pointOnPerimeter(rect, rand());
    exploded[i * 3] = px - halfW;
    exploded[i * 3 + 1] = -(py - halfH);
    exploded[i * 3 + 2] = rect.z;

    // --- settled: lower-half drift band
    settled[i * 3] = (rand() * 2 - 1) * halfW * 1.1;
    settled[i * 3 + 1] = -rand() * halfH * 1.2 * 0.5 - 0; // 0..-0.6h
    settled[i * 3 + 2] = (rand() * 2 - 1) * 120;
  }

  return { scattered, exploded, settled };
}

function pickByPerimeter(rects, r) {
  const perims = rects.map((rc) => 2 * (rc.width + rc.height));
  const total = perims.reduce((a, b) => a + b, 0);
  let acc = 0;
  const target = r * total;
  for (let i = 0; i < rects.length; i++) {
    acc += perims[i];
    if (target <= acc) return rects[i];
  }
  return rects[rects.length - 1];
}

/** Walk the rect perimeter: t in [0,1) mapped along top->right->bottom->left. */
function pointOnPerimeter(rect, t) {
  const w = rect.width;
  const h = rect.height;
  const p = t * 2 * (w + h);
  if (p < w) return [rect.x + p, rect.y];
  if (p < w + h) return [rect.x + w, rect.y + (p - w)];
  if (p < 2 * w + h) return [rect.x + w - (p - w - h), rect.y + h];
  return [rect.x, rect.y + h - (p - 2 * w - h)];
}
```

Note on the settled test bound: `-rand() * halfH * 1.2 * 0.5` yields `0..-0.6*halfH`, within `-viewport.h * 0.6` since `halfH * 0.6 = viewport.h * 0.3`. Bounds hold.

- [ ] **Step 4: Run tests to verify pass**

Run: `npm test`
Expected: all `pointTargets` tests PASS (plus prior suites).

- [ ] **Step 5: Commit**

```powershell
git add app/components/hero-story/pointTargets.js app/components/hero-story/__tests__/pointTargets.test.js
git commit -m "feat(hero): deterministic particle target geometry"
```

---

### Task 6: Lenis Singleton

The chapter rail needs programmatic smooth scroll (`lenis.scrollTo`); the Lenis instance currently lives in a `useEffect` closure in `page.js`.

**Files:**
- Create: `app/libs/lenis.js`
- Modify: `app/page.js` (lines ~54–70, the Lenis setup block)

**Interfaces:**
- Produces: `setLenis(instance)`, `getLenis() => Lenis|null` from `app/libs/lenis.js`.

- [ ] **Step 1: Create the singleton module**

Create `app/libs/lenis.js`:

```js
// Module-level handle to the page's Lenis instance so deep components
// (chapter rail) can drive programmatic smooth scroll without prop drilling.
let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}
```

- [ ] **Step 2: Register the instance in page.js**

In `app/page.js`, add the import at the top:

```js
import { setLenis } from "./libs/lenis";
```

Inside the existing `if (!isMobile) { ... }` Lenis block, after `const lenis = new Lenis({...});` add `setLenis(lenis);`, and in the cleanup add `setLenis(null);`:

```js
if (!isMobile) {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });
  setLenis(lenis);

  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    setLenis(null);
  };
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: passes.

- [ ] **Step 4: Commit**

```powershell
git add app/libs/lenis.js app/page.js
git commit -m "feat: expose lenis instance via singleton for programmatic scroll"
```

---

### Task 7: HeroStage — Persistent Interactive Core

The stage holds everything real: headline, subline, kicker, badge, CTAs. Server-rendered (LCP element), clickable at every scroll position. Chapter treatments only change styles on these nodes. GSAP-only magnetic effect (no Framer Motion).

**Files:**
- Create: `app/components/hero-story/HeroStage.jsx`
- Modify: `app/globals.css` (dashed CTA + annotation styles)

**Interfaces:**
- Consumes: `Button` from `../ui/Button` (renders `next/link` for `href` — no framer-motion path).
- Produces: `<HeroStage kickerRef={ref} />` — a `forwardRef` div. Inner nodes are addressable by data attributes consumed by Tasks 8–12: `[data-hero="headline"]`, `[data-hero="subline"]`, `[data-hero="kicker"]`, `[data-hero="badge"]`, `[data-hero="ctas"]`, `[data-hero="cta-primary"]`, `[data-hero="cta-secondary"]`. Headline weight is driven by the `--wght` CSS custom property (initial 120 set inline). CSS class `hero-cta--wire` marks the wireframe state (applied initially, removed by timeline in Task 12 via class-independent style tweens — see note there).

- [ ] **Step 1: Add hero stage styles to globals.css**

Append to `app/globals.css`:

```css
/* --- Hero story stage ------------------------------------------------- */
/* Wireframe (Ch.1/2) vs shipped (Ch.3) CTA treatment. Both states are the
   same clickable element; only custom properties change, and the GSAP
   timeline tweens these properties directly. */
.hero-cta {
  border: 1px dashed rgba(255, 255, 255, var(--cta-border-alpha, 0.35));
  border-style: var(--cta-border-style, dashed);
  background-color: rgba(176, 34, 34, var(--cta-bg-alpha, 0));
  color: rgba(255, 255, 255, var(--cta-text-alpha, 0.55));
  transition: none; /* the timeline owns these transitions */
}
.hero-annotation {
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
}
.hero-hairline {
  background: rgba(255, 255, 255, 0.14);
}
```

- [ ] **Step 2: Implement HeroStage.jsx**

Create `app/components/hero-story/HeroStage.jsx`:

```jsx
"use client";

import React, { forwardRef, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../libs/gsap";

/**
 * The persistent hero core. Everything here is real, server-rendered, and
 * interactive from frame one — chapter treatments only restyle these nodes.
 * GSAP-only magnetic CTAs (no framer-motion in hero-story/).
 */
const HeroStage = forwardRef(function HeroStage(props, ref) {
  const ctasRef = useRef(null);

  // Magnetic pull on CTAs — desktop fine pointers only.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const links = gsap.utils.toArray("[data-magnetic]", ctasRef.current);
          const cleanups = links.map((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
            const onMove = (e) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
              yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
            };
            const onLeave = () => {
              xTo(0);
              yTo(0);
            };
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseleave", onLeave);
            return () => {
              el.removeEventListener("mousemove", onMove);
              el.removeEventListener("mouseleave", onLeave);
            };
          });
          return () => cleanups.forEach((fn) => fn());
        }
      );
    },
    { scope: ctasRef }
  );

  return (
    <div
      ref={ref}
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
    >
      {/* Badge — real from frame one */}
      <div
        data-hero="badge"
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-8 backdrop-blur-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#b02222] animate-pulse" />
        Available for new projects
      </div>

      {/* Headline — the LCP element. Weight animates 120 -> 900 via --wght. */}
      <h1
        data-hero="headline"
        className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight text-white leading-[0.95] mb-4 select-none"
        style={{ "--wght": 120, "--wdth": 110 }}
      >
        OWEN
      </h1>
      <p
        data-hero="subline"
        className="font-display text-lg md:text-2xl text-white/70 tracking-[0.18em] uppercase mb-8"
        style={{ "--wght": 120 }}
      >
        Full Stack Design Engineer
      </p>

      {/* Kicker — one line, rewritten per chapter by the timeline */}
      <p
        data-hero="kicker"
        aria-live="off"
        className="hero-annotation mb-10 min-h-[1.5em]"
      >
        Every product starts as a sketch.
      </p>

      {/* CTAs — clickable and focusable at every scroll position */}
      <div
        ref={ctasRef}
        data-hero="ctas"
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      >
        <Link
          href="/contact"
          data-hero="cta-primary"
          data-magnetic
          className="hero-cta inline-flex items-center justify-center h-12 px-6 text-sm md:text-base rounded-sm will-change-transform"
        >
          Start a Project <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
        <Link
          href="/cv.pdf"
          data-hero="cta-secondary"
          data-magnetic
          className="hero-cta inline-flex items-center justify-center h-12 px-6 text-sm md:text-base rounded-sm will-change-transform"
        >
          Download CV <Download className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
});

export default HeroStage;
```

(Note: `Button` from `ui/Button.jsx` imports framer-motion at module level; using plain `next/link` here keeps the hero bundle framer-free per Global Constraints.)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: passes.

- [ ] **Step 4: Commit**

```powershell
git add app/components/hero-story/HeroStage.jsx app/globals.css
git commit -m "feat(hero): persistent interactive stage with GSAP magnetic CTAs"
```

---

### Task 8: BlueprintLayer — Ch.1 Decorations

Grid, dashed selection frames around the real stage elements, live spec annotations, measurement hairlines. Pure decoration: `aria-hidden`, `pointer-events-none`.

**Files:**
- Create: `app/components/hero-story/BlueprintLayer.jsx`

**Interfaces:**
- Consumes: `useLiveSpecs` (Task 4). Positions frames by reading `[data-hero]` rects from a `stageRef` prop; resolves the headline/subline elements itself from `stageRef` (no element refs passed in).
- Produces: `<BlueprintLayer stageRef={ref} />` — a `forwardRef` div (root opacity animated by Task 12). Class hooks for the timeline: `.bp-grid`, `.bp-frame`, `.bp-spec`.

- [ ] **Step 1: Implement BlueprintLayer.jsx**

Create `app/components/hero-story/BlueprintLayer.jsx`:

```jsx
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
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const stageBox = stage.closest("[data-hero-root]").getBoundingClientRect();
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
    document.fonts?.ready?.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
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
```

- [ ] **Step 2: Visual verification (dev server)**

Temporarily render the stage + layer together to check composition. In `app/page.js`, above `<HeroSectionRevamped />`, nothing changes yet — instead run the dev server and verify via Task 12's integration later. For an immediate smoke check, run:

Run: `npm run build`
Expected: passes (full visual QA happens in Task 12/15; this layer has no standalone route).

- [ ] **Step 3: Commit**

```powershell
git add app/components/hero-story/BlueprintLayer.jsx
git commit -m "feat(hero): blueprint decoration layer with live spec frames"
```

---

### Task 9: Self-Referential Source Panel + BuildLayer

The Ch.2 surprise beat: an annotation panel showing the *actual* first ~44 lines of `HeroStory.jsx` with real line numbers, generated at build time so it is always true. Plus SVG hairlines that draw themselves.

**Files:**
- Create: `scripts/generate-hero-source.mjs`
- Create: `app/components/hero-story/heroSource.generated.js` (via the script; committed so CI builds work)
- Create: `app/components/hero-story/BuildLayer.jsx`
- Modify: `package.json` (predev/prebuild hooks)

**Interfaces:**
- Consumes: `app/components/hero-story/HeroStory.jsx` must exist for generation — until Task 12 lands, the script writes a placeholder module exporting `[]` and BuildLayer renders nothing for an empty array. Rerun the script after Task 12.
- Produces: `heroSourceLines: string[]` from `heroSource.generated.js`; `<BuildLayer ref />` with class hooks `.hero-draw` (SVG lines, stroke-dashoffset pre-set) and `.build-source` (the code panel).

- [ ] **Step 1: Write the generator script**

Create `scripts/generate-hero-source.mjs`:

```js
// Regenerates the self-referential source panel content. Runs predev and
// prebuild so the panel can never drift from the real component.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SRC = "app/components/hero-story/HeroStory.jsx";
const OUT = "app/components/hero-story/heroSource.generated.js";
const LINE_COUNT = 44;

const lines = existsSync(SRC)
  ? readFileSync(SRC, "utf8").split("\n").slice(0, LINE_COUNT)
  : [];

writeFileSync(
  OUT,
  "// AUTO-GENERATED by scripts/generate-hero-source.mjs — do not edit.\n" +
    `export const heroSourceLines = ${JSON.stringify(lines, null, 2)};\n`
);
console.log(`hero source panel: ${lines.length} lines -> ${OUT}`);
```

- [ ] **Step 2: Wire predev/prebuild and run it once**

In `package.json` scripts, add:

```json
"predev": "node scripts/generate-hero-source.mjs",
"prebuild": "node scripts/generate-hero-source.mjs"
```

Run: `node scripts/generate-hero-source.mjs`
Expected output: `hero source panel: 0 lines -> app/components/hero-story/heroSource.generated.js` (HeroStory.jsx doesn't exist yet — that's expected; Task 12 Step 6 regenerates).

- [ ] **Step 3: Implement BuildLayer.jsx**

Create `app/components/hero-story/BuildLayer.jsx`:

```jsx
"use client";

import React, { forwardRef } from "react";
import { heroSourceLines } from "./heroSource.generated.js";

/**
 * Ch.2 decoration: engineering. SVG hairlines that draw in on scroll
 * (.hero-draw — the timeline tweens strokeDashoffset to 0) and the
 * self-referential source panel: the real first lines of HeroStory.jsx,
 * the very component rendering these pixels.
 */
const BuildLayer = forwardRef(function BuildLayer(props, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-[6] pointer-events-none overflow-hidden"
    >
      {/* Structural hairlines that draw themselves */}
      <svg
        className="absolute inset-0 w-full h-full"
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

      {/* Self-referential source panel */}
      {heroSourceLines.length > 0 && (
        <div className="build-source absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden lg:block w-[380px] max-h-[52vh] overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <span className="hero-annotation">hero-story/HeroStory.jsx</span>
            <span className="hero-annotation text-[#b02222]">
              ← the component you are looking at
            </span>
          </div>
          <pre className="p-3 text-[10px] leading-[1.7] font-mono text-white/45 overflow-hidden">
            {heroSourceLines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                <span className="inline-block w-7 text-right mr-3 text-white/20 select-none">
                  {i + 1}
                </span>
                {line}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
});

export default BuildLayer;
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: passes (prebuild regenerates the file first).

- [ ] **Step 5: Commit**

```powershell
git add scripts/generate-hero-source.mjs app/components/hero-story/heroSource.generated.js app/components/hero-story/BuildLayer.jsx package.json
git commit -m "feat(hero): build layer with self-referential source panel"
```

---

### Task 10: ShipLayer — Ch.3 Decorations

Background image fade-up, red atmosphere, and proof-content annotations.

**Files:**
- Create: `app/components/hero-story/ShipLayer.jsx`

**Interfaces:**
- Produces: `<ShipLayer ref />` with class hooks `.ship-bg` (image, opacity 0 initially), `.ship-glow`, `.ship-proof` (stat annotations, opacity 0 initially). Proof stats live in an exported `PROOF_STATS` array — **values must be confirmed with Owen at the Task 15 checkpoint before launch.**

- [ ] **Step 1: Implement ShipLayer.jsx**

Create `app/components/hero-story/ShipLayer.jsx`:

```jsx
"use client";

import React, { forwardRef } from "react";

// CONFIRM WITH OWEN before launch (Task 15 checkpoint) — must be real.
export const PROOF_STATS = [
  { label: "projects shipped", value: "20+" },
  { label: "years building", value: "5" },
  { label: "currently", value: "Two Lions" },
];

/**
 * Ch.3 decoration: the shipped product. Graded background image, red
 * atmosphere, and proof stats as mono annotations. All revealed by the
 * master timeline; initial opacities are 0 via GSAP set() in HeroStory.
 */
const ShipLayer = forwardRef(function ShipLayer(props, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
    >
      {/* Graded backdrop — same treatment as the old hero, now earned */}
      <div
        className="ship-bg absolute inset-0 opacity-0"
        style={{
          backgroundImage: "url('/hero3.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* Red atmosphere */}
      <div className="ship-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-[#b02222]/20 rounded-full blur-[130px] opacity-0" />

      {/* Proof — real numbers, mono annotations along the bottom */}
      <div className="absolute bottom-16 left-0 right-0 hidden md:flex items-center justify-center gap-12">
        {PROOF_STATS.map((s) => (
          <div key={s.label} className="ship-proof flex items-baseline gap-2 opacity-0">
            <span className="font-display text-white text-xl" style={{ "--wght": 700 }}>
              {s.value}
            </span>
            <span className="hero-annotation">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ShipLayer;
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: passes.

- [ ] **Step 3: Commit**

```powershell
git add app/components/hero-story/ShipLayer.jsx
git commit -m "feat(hero): ship layer with proof stats and graded backdrop"
```

---

### Task 11: HeroParticles — Three.js Point Cloud

One `THREE.Points`, one draw call, custom shaders. Vertex shader mixes scattered→exploded→settled via `uMorph1`/`uMorph2` with per-particle stagger and overshoot baked in; mouse repulsion; interleaved-gradient-noise dithering in the fragment shader (kills dark-on-dark banding under the grain overlay).

**Files:**
- Create: `app/components/hero-story/HeroParticles.jsx`

**Interfaces:**
- Consumes: `buildTargets` (Task 5).
- Produces: default export `HeroParticles({ glState, stageRef, onFail })`. `glState` is a React ref whose `.current` is `{ morph1: 0, morph2: 0, accent: 0 }` — Task 12's timeline tweens it; this component reads it every frame. `onFail()` is called if WebGL is unavailable. The component renders `<canvas>` absolutely positioned, z-index 1 (behind the stage z-10, above the ship backdrop z-... note: ShipLayer is z-[2]; canvas uses z-[3]).

- [ ] **Step 1: Implement HeroParticles.jsx**

Create `app/components/hero-story/HeroParticles.jsx`:

```jsx
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildTargets } from "./pointTargets.js";

const COUNT = 20000;

const VERT = /* glsl */ `
  attribute vec3 aScattered;
  attribute vec3 aExploded;
  attribute vec3 aSettled;
  attribute float aRand;
  uniform float uMorph1;   // scattered -> exploded
  uniform float uMorph2;   // exploded -> settled
  uniform float uTime;
  uniform vec2 uMouse;     // world-space px
  uniform float uMouseActive;

  // Per-particle staggered, overshooting progress: each particle starts at a
  // slightly different time and pops past its target before settling.
  float staggered(float p, float r) {
    float local = clamp((p - r * 0.35) / 0.65, 0.0, 1.0);
    float back = 1.70158;
    float t = local - 1.0;
    return t * t * ((back + 1.0) * t + back) + 1.0; // back.out
  }

  void main() {
    float p1 = staggered(uMorph1, aRand);
    float p2 = staggered(uMorph2, fract(aRand * 7.31));
    vec3 pos = mix(aScattered, aExploded, p1);
    pos = mix(pos, aSettled, p2);

    // ambient drift so the cloud is never a still
    pos.x += sin(uTime * 0.25 + aRand * 6.2831) * 6.0;
    pos.y += cos(uTime * 0.21 + aRand * 12.566) * 6.0;

    // local mouse repulsion
    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float push = smoothstep(140.0, 0.0, dist) * 46.0 * uMouseActive;
    pos.xy += normalize(d + 0.0001) * push;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + aRand * 1.8) * (600.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform float uAccent; // 0 = white dust, 1 = red-tinted ship state
  uniform vec2 uResolution;

  // Interleaved gradient noise — cheap dithering to prevent banding on the
  // dark canvas (spec: dark-on-dark over #0a0a0a bands without it).
  float ign(vec2 v) {
    return fract(52.9829189 * fract(dot(v, vec2(0.06711056, 0.00583715))));
  }

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d) * 0.55;
    alpha -= ign(gl_FragCoord.xy) * 0.04; // dither
    vec3 white = vec3(0.92);
    vec3 red = vec3(0.69, 0.13, 0.13);
    gl_FragColor = vec4(mix(white, red, uAccent * 0.65), max(alpha, 0.0));
  }
`;

export default function HeroParticles({ glState, stageRef, onFail }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch {
      onFail?.();
      return;
    }
    if (!renderer.getContext()) {
      onFail?.();
      return;
    }

    const parent = canvas.parentElement;
    const vw = parent.clientWidth;
    const vh = parent.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(vw, vh, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, vw / vh, 1, 5000);
    // camera distance such that 1 world unit ~ 1 CSS px at z=0
    camera.position.z = vh / (2 * Math.tan((camera.fov * Math.PI) / 360));

    // Sample the real UI rects for the exploded wireframe
    const stage = stageRef.current;
    const stageBox = stage.getBoundingClientRect();
    const parentBox = parent.getBoundingClientRect();
    const planeZ = { headline: 0, subline: -40, ctas: -90, badge: -140 };
    const rects = Object.entries(planeZ)
      .map(([key, z]) => {
        const el = stage.querySelector(`[data-hero="${key}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - parentBox.left,
          y: r.top - parentBox.top,
          width: r.width,
          height: r.height,
          z,
        };
      })
      .filter(Boolean);

    const targets = buildTargets({
      count: COUNT,
      rects,
      viewport: { w: vw, h: vh },
      seed: 20260705,
    });

    const geo = new THREE.BufferGeometry();
    // position attr is required by three but unused (vertex shader computes pos)
    geo.setAttribute("position", new THREE.BufferAttribute(targets.scattered.slice(), 3));
    geo.setAttribute("aScattered", new THREE.BufferAttribute(targets.scattered, 3));
    geo.setAttribute("aExploded", new THREE.BufferAttribute(targets.exploded, 3));
    geo.setAttribute("aSettled", new THREE.BufferAttribute(targets.settled, 3));
    const rands = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) rands[i] = Math.random();
    geo.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMorph1: { value: 0 },
        uMorph2: { value: 0 },
        uAccent: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(9999, 9999) },
        uMouseActive: { value: 0 },
        uResolution: { value: new THREE.Vector2(vw, vh) },
      },
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // mouse -> world px (same mapping as pointTargets)
    const onPointer = (e) => {
      const r = parent.getBoundingClientRect();
      mat.uniforms.uMouse.value.set(
        e.clientX - r.left - vw / 2,
        -(e.clientY - r.top - vh / 2)
      );
      mat.uniforms.uMouseActive.value = 1;
    };
    const onPointerLeave = () => {
      mat.uniforms.uMouseActive.value = 0;
    };
    parent.addEventListener("pointermove", onPointer, { passive: true });
    parent.addEventListener("pointerleave", onPointerLeave);

    // Render only while the hero is on screen and the tab is visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(parent);

    let raf;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const s = glState.current;
      mat.uniforms.uMorph1.value = s.morph1;
      mat.uniforms.uMorph2.value = s.morph2;
      mat.uniforms.uAccent.value = s.accent;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = h / (2 * Math.tan((camera.fov * Math.PI) / 360));
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("pointermove", onPointer);
      parent.removeEventListener("pointerleave", onPointerLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-[3] pointer-events-none"
    />
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: passes; `three` appears only in a lazily-loadable chunk (verified for real in Task 15).

- [ ] **Step 3: Commit**

```powershell
git add app/components/hero-story/HeroParticles.jsx
git commit -m "feat(hero): three.js point cloud with staggered morph and IGN dithering"
```

---

### Task 12: HeroStory Orchestrator + ChapterRail

The conductor: pin, master timeline (all DOM tweens + glState tweens), Act 0 entrance, chapter rail with jump links, cursor mode broadcasting, lazy particle loading, reduced-motion path.

**Files:**
- Create: `app/components/hero-story/ChapterRail.jsx`
- Create: `app/components/hero-story/HeroStory.jsx`

**Interfaces:**
- Consumes: `CHAPTERS/EVENTS/PIN_END/bd/chapterAt` (Task 3), `HeroStage` (7), `BlueprintLayer` (8), `BuildLayer` (9), `ShipLayer` (10), `HeroParticles` via `next/dynamic` (11), `getLenis` (6).
- Produces: default export `HeroStory` (used by Task 15). Dispatches `window` CustomEvent `"hero-cursor"` with `detail.mode` ∈ `"crosshair" | "caret" | "default"` (consumed by Task 13). Root element carries `data-hero-root` (consumed by BlueprintLayer).

- [ ] **Step 1: Implement ChapterRail.jsx**

Create `app/components/hero-story/ChapterRail.jsx`:

```jsx
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
      className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-6"
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
```

- [ ] **Step 2: Implement HeroStory.jsx**

Create `app/components/hero-story/HeroStory.jsx`. **The first 44 lines feed the Ch.2 source panel — keep the header comment meaningful.**

```jsx
"use client";

/**
 * HeroStory — "Blueprint to Reality"
 *
 * You are reading the component you are looking at. This hero pins for
 * 240vh and builds itself in three chapters:
 *
 *   01 THE IDEA   outlined type, live spec annotations, drifting dust
 *   02 THE BUILD  hairlines draw, particles assemble the UI wireframe,
 *                 and this very file renders in the source panel
 *   03 THE SHIP   weight floods to 900, color arrives, buttons go live
 *
 * One GSAP timeline drives the DOM and the WebGL uniforms so they can
 * never drift apart. The CTAs are real links from frame one — the
 * story never gates the action.
 */

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../libs/gsap";
import { getLenis } from "../../libs/lenis";
import { CHAPTERS, EVENTS, PIN_END, bd, chapterAt } from "./chapters.js";
import HeroStage from "./HeroStage.jsx";
import BlueprintLayer from "./BlueprintLayer.jsx";
import BuildLayer from "./BuildLayer.jsx";
import ShipLayer from "./ShipLayer.jsx";
import ChapterRail from "./ChapterRail.jsx";

const HeroParticles = dynamic(() => import("./HeroParticles.jsx"), {
  ssr: false,
});

const KICKERS = [
  "Every product starts as a sketch.",
  "Then it gets engineered.",
  "And shipped. I'm Owen — I do all three.",
];

const setCursor = (mode) =>
  window.dispatchEvent(new CustomEvent("hero-cursor", { detail: { mode } }));

export default function HeroStory() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const blueprintRef = useRef(null);
  const buildRef = useRef(null);
  const shipRef = useRef(null);
  const cueRef = useRef(null);
  const glState = useRef({ morph1: 0, morph2: 0, accent: 0 });
  const stRef = useRef(null);
  const [chapter, setChapter] = useState(0);
  const [particlesOn, setParticlesOn] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ---------- Desktop: the full pinned story ----------
      mm.add(
        "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          setParticlesOn(true);

          const root = rootRef.current;
          const stage = stageRef.current;
          const headline = stage.querySelector("[data-hero='headline']");
          const subline = stage.querySelector("[data-hero='subline']");
          const kicker = stage.querySelector("[data-hero='kicker']");
          const ctas = gsap.utils.toArray("[data-hero^='cta-']", stage);
          const primary = stage.querySelector("[data-hero='cta-primary']");

          // ----- Act 0: entrance (time-based, once per session) -----
          const seen = sessionStorage.getItem("introShown");
          const entrance = gsap.timeline({ paused: !!seen });
          entrance
            .from(blueprintRef.current.querySelector(".bp-grid"), {
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
            })
            .from(
              blueprintRef.current.querySelectorAll(".bp-frame"),
              { scale: 0.96, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" },
              "-=0.2"
            )
            .from(
              [headline, subline, kicker, ...ctas],
              { opacity: 0, y: 16, stagger: 0.06, duration: 0.5, ease: "power3.out" },
              "-=0.3"
            )
            .add(() => sessionStorage.setItem("introShown", "true"));
          if (seen) entrance.progress(1);

          // Idle-state life: one spec annotation gently pulses forever so a
          // paused hero is never a freeze-frame (time-based, not scrubbed).
          gsap.to(blueprintRef.current.querySelectorAll(".bp-spec"), {
            opacity: 0.5,
            repeat: -1,
            yoyo: true,
            duration: 1.6,
            ease: "sine.inOut",
            stagger: 0.4,
          });

          // ----- Master scrubbed timeline -----
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: PIN_END,
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
              onUpdate: (self) => setChapter(chapterAt(self.progress)),
              onRefresh: (self) => {
                stRef.current = self;
              },
            },
          });

          // Kicker copy swaps at chapter boundaries (snap, not fade-drag)
          const swapKicker = (text) => () => {
            kicker.textContent = text;
          };
          tl.call(swapKicker(KICKERS[1]), [], CHAPTERS.build.enter[0]);
          tl.call(swapKicker(KICKERS[2]), [], CHAPTERS.ship.enter[0]);
          // calls fire in both directions; restore on scroll-back
          tl.call(swapKicker(KICKERS[0]), [], CHAPTERS.build.enter[0] - 0.001);
          tl.call(swapKicker(KICKERS[1]), [], CHAPTERS.ship.enter[0] - 0.001);

          // Cursor modes per chapter
          tl.call(() => setCursor("crosshair"), [], 0.001);
          tl.call(() => setCursor("caret"), [], CHAPTERS.build.enter[0]);
          tl.call(() => setCursor("default"), [], CHAPTERS.ship.enter[0]);

          // --- Ch.1 exit: blueprint decorations dissolve
          tl.to(
            blueprintRef.current,
            { opacity: 0, duration: bd(CHAPTERS.idea.exit) },
            CHAPTERS.idea.exit[0]
          );
          tl.to(
            cueRef.current,
            { opacity: 0, duration: 0.05 },
            0.1
          );

          // --- Ch.2 enter: build layer in, hairlines draw, particles assemble
          gsap.set(buildRef.current, { opacity: 0 });
          tl.to(
            buildRef.current,
            { opacity: 1, duration: bd(CHAPTERS.build.enter) },
            CHAPTERS.build.enter[0]
          );
          tl.to(
            buildRef.current.querySelectorAll(".hero-draw"),
            {
              strokeDashoffset: 0,
              duration: bd(CHAPTERS.build.enter) + 0.06,
              stagger: 0.015,
              ease: "power1.inOut",
            },
            CHAPTERS.build.enter[0]
          );
          tl.to(
            glState.current,
            { morph1: 1, duration: bd(EVENTS.assemble), ease: "power2.inOut" },
            EVENTS.assemble[0]
          );
          // type gains working weight through the build
          tl.to(
            [headline, subline],
            { "--wght": 500, duration: bd(CHAPTERS.build.hold) },
            CHAPTERS.build.enter[0]
          );

          // --- Ch.2 exit / Ch.3 enter: THE weight-fill event
          tl.to(
            buildRef.current,
            { opacity: 0, duration: bd(CHAPTERS.build.exit) },
            CHAPTERS.build.exit[0]
          );
          tl.to(
            [headline, subline],
            { "--wght": 900, duration: bd(EVENTS.weightFill), ease: "power3.inOut" },
            EVENTS.weightFill[0]
          );
          tl.to(
            headline,
            { "--wdth": 100, duration: bd(EVENTS.weightFill) },
            EVENTS.weightFill[0]
          );
          tl.to(
            glState.current,
            { morph2: 1, accent: 1, duration: bd(CHAPTERS.ship.enter) },
            CHAPTERS.ship.enter[0]
          );

          // CTAs materialize — style-only; the elements were clickable all along
          tl.to(
            ctas,
            {
              "--cta-border-alpha": 0,
              "--cta-text-alpha": 1,
              duration: bd(CHAPTERS.ship.enter),
            },
            CHAPTERS.ship.enter[0]
          );
          tl.to(
            primary,
            { "--cta-bg-alpha": 1, duration: bd(CHAPTERS.ship.enter) },
            CHAPTERS.ship.enter[0]
          );
          tl.call(
            () => {
              ctas.forEach((el) => (el.style.borderStyle = "solid"));
            },
            [],
            CHAPTERS.ship.enter[0] + bd(CHAPTERS.ship.enter) / 2
          );
          tl.call(
            () => {
              ctas.forEach((el) => (el.style.borderStyle = "dashed"));
            },
            [],
            CHAPTERS.ship.enter[0] + bd(CHAPTERS.ship.enter) / 2 - 0.002
          );

          // Ship decorations flood in
          tl.to(
            shipRef.current.querySelector(".ship-bg"),
            { opacity: 1, duration: bd(CHAPTERS.ship.enter) },
            CHAPTERS.ship.enter[0]
          );
          tl.to(
            shipRef.current.querySelector(".ship-glow"),
            { opacity: 1, duration: bd(CHAPTERS.ship.enter) },
            CHAPTERS.ship.enter[0]
          );
          tl.to(
            shipRef.current.querySelectorAll(".ship-proof"),
            { opacity: 1, stagger: 0.02, duration: bd(CHAPTERS.ship.hold) / 3 },
            CHAPTERS.ship.hold[0]
          );

          // --- Release: stage eases up so the marquee handoff overlaps
          tl.to(
            stage,
            { yPercent: -6, duration: bd(EVENTS.release), ease: "power1.in" },
            EVENTS.release[0]
          );

          return () => {
            setCursor("default");
            setParticlesOn(false);
          };
        }
      );

      // ---------- Reduced motion (any width): static Ch.3 frame ----------
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const stage = stageRef.current;
        gsap.set(stage.querySelectorAll("[data-hero='headline'], [data-hero='subline']"), {
          "--wght": 900,
        });
        gsap.set(blueprintRef.current, { opacity: 0 });
        gsap.set(buildRef.current, { opacity: 0 });
        gsap.set(shipRef.current.querySelector(".ship-bg"), { opacity: 1 });
        gsap.set(shipRef.current.querySelectorAll(".ship-proof"), { opacity: 1 });
        const ctas = gsap.utils.toArray("[data-hero^='cta-']", stage);
        ctas.forEach((el) => {
          el.style.borderStyle = "solid";
          el.style.setProperty("--cta-border-alpha", "0");
          el.style.setProperty("--cta-text-alpha", "1");
        });
        stage
          .querySelector("[data-hero='cta-primary']")
          .style.setProperty("--cta-bg-alpha", "1");
        // one annotation stays so the concept still reads (spec §4)
        const kicker = stage.querySelector("[data-hero='kicker']");
        kicker.textContent = KICKERS[2];
      });
    },
    { scope: rootRef }
  );

  const jumpTo = (i) => {
    const st = stRef.current;
    if (!st) return;
    const band = Object.values(CHAPTERS)[i].hold;
    const y = st.start + band[0] * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      data-hero-root
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      <ShipLayer ref={shipRef} />
      {particlesOn && (
        <HeroParticles glState={glState} stageRef={stageRef} onFail={() => setParticlesOn(false)} />
      )}
      <BlueprintLayer ref={blueprintRef} stageRef={stageRef} />
      <BuildLayer ref={buildRef} />
      <HeroStage ref={stageRef} />
      <ChapterRail active={chapter} onJump={jumpTo} />

      {/* Scroll cue — carried over from the old hero */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3"
      >
        <span className="hero-annotation">Scroll</span>
        <span className="block w-px h-12 bg-white/10 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#b02222] to-transparent animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
}
```

**Implementation note (idle life):** the spec (§2, persistent layer) requires an idle blink so a paused hero is never a still. The particle `uTime` drift covers the cloud; for the DOM, this timeline includes the annotation pulse added right after `entrance` above — it runs independent of scroll.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: passes.

- [ ] **Step 4: Regenerate the source panel from the real component**

Run: `node scripts/generate-hero-source.mjs`
Expected: `hero source panel: 44 lines -> app/components/hero-story/heroSource.generated.js`

- [ ] **Step 5: Commit**

```powershell
git add app/components/hero-story/HeroStory.jsx app/components/hero-story/ChapterRail.jsx app/components/hero-story/BlueprintLayer.jsx app/components/hero-story/heroSource.generated.js
git commit -m "feat(hero): master timeline orchestrator with pinned three-chapter story"
```

---

### Task 13: CustomCursor Chapter Modes

Crosshair with live x/y readout (Ch.1), terminal caret (Ch.2), default magnetic (Ch.3). Driven by the `hero-cursor` CustomEvent from Task 12.

**Files:**
- Modify: `app/components/gsap/CustomCursor.jsx`

**Interfaces:**
- Consumes: `window` CustomEvent `"hero-cursor"`, `detail.mode` ∈ `"crosshair" | "caret" | "default"`.

- [ ] **Step 1: Add mode elements to the JSX**

In `CustomCursor.jsx`, inside the wrap div (after the dot div), add:

```jsx
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
```

And declare the refs at the top with the others:

```js
const coordsRef = useRef(null);
const caretRef = useRef(null);
```

- [ ] **Step 2: Wire the mode switch inside the matchMedia context**

Inside the existing `mm.add(...)` callback (after `setState` is defined), add:

```js
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
```

Extend `onMove` to position the extras and feed the live coordinates:

```js
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
```

And in the context cleanup, add:

```js
window.removeEventListener("hero-cursor", onHeroCursor);
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: passes.

- [ ] **Step 4: Commit**

```powershell
git add app/components/gsap/CustomCursor.jsx
git commit -m "feat(cursor): chapter-aware modes with live coordinate readout"
```

---

### Task 14: HeroStoryMobile — Designed Mobile Sequence

Not a fallback: a complete, auto-playing 3-beat sequence (tap to advance) in CSS/SVG + GSAP time-based tweens. No pin, no Three.js. Rendered *instead of* the desktop decorations, over the same HeroStage.

**Files:**
- Create: `app/components/hero-story/HeroStoryMobile.jsx`
- Modify: `app/components/hero-story/HeroStory.jsx` (mount it; gate desktop-only pieces)

**Interfaces:**
- Consumes: `HeroStage` nodes via `stageRef` (`[data-hero]` selectors), `KICKERS` (export it from HeroStory or duplicate the array locally — export from `chapters.js` is cleaner: **move `KICKERS` into `chapters.js`** and import in both).
- Produces: `<HeroStoryMobile stageRef={stageRef} />`.

- [ ] **Step 1: Move KICKERS into chapters.js**

Add to `app/components/hero-story/chapters.js`:

```js
export const KICKERS = [
  "Every product starts as a sketch.",
  "Then it gets engineered.",
  "And shipped. I'm Owen — I do all three.",
];
```

Update `HeroStory.jsx` to `import { ..., KICKERS } from "./chapters.js"` and delete its local copy.

- [ ] **Step 2: Implement HeroStoryMobile.jsx**

Create `app/components/hero-story/HeroStoryMobile.jsx`:

```jsx
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
          const frame = wrapRef.current.querySelector(".m-frame");

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
            wrapRef.current.querySelectorAll(".m-draw"),
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
          wrapRef.current.addEventListener("pointerup", advance);
          return () => {
            wrapRef.current?.removeEventListener("pointerup", advance);
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
```

- [ ] **Step 3: Mount it in HeroStory.jsx**

In `HeroStory.jsx`, import and render it after `<ChapterRail ... />`:

```jsx
import HeroStoryMobile from "./HeroStoryMobile.jsx";
// ...
<HeroStoryMobile stageRef={stageRef} />
```

Also hide desktop decoration layers on mobile — add `hidden md:block` to the root divs of `BlueprintLayer`, `BuildLayer`, `ShipLayer` (change their root className from `absolute inset-0 ...` to `hidden md:block absolute inset-0 ...`).

**Mobile CTA note:** HeroStage CTAs start in wireframe style; on mobile the ship beat arrives ~4.4s in (or on tap). That is acceptable because the CTAs are still real and tappable from 0s — only their *styling* is draft-state. The Task 15 checkpoint reviews whether Owen wants mobile CTAs to start solid instead (one-line change: run beat 3's CTA tweens from `gsap.set` when `matchMedia("(max-width: 767px)")`).

- [ ] **Step 4: Verify build + tests**

Run: `npm test`, then `npm run build`
Expected: all tests pass; build passes.

- [ ] **Step 5: Commit**

```powershell
git add app/components/hero-story/HeroStoryMobile.jsx app/components/hero-story/HeroStory.jsx app/components/hero-story/chapters.js app/components/hero-story/BlueprintLayer.jsx app/components/hero-story/BuildLayer.jsx app/components/hero-story/ShipLayer.jsx
git commit -m "feat(hero): designed mobile three-beat sequence"
```

---

### Task 15: Page Integration + Marquee Handoff

Swap the hero into the page, delete IntroOverlay, verify Three.js stays out of the mobile bundle, and run the full visual QA with Owen.

**Files:**
- Modify: `app/page.js`

**Interfaces:**
- Consumes: `HeroStory` (Task 12).

- [ ] **Step 1: Swap components in page.js**

In `app/page.js`:

1. Remove imports: `HeroSection`, `HeroSectionRevamped`, `IntroOverlay`, `AnimatePresence` (AnimatePresence is only used for the intro — verify with a grep before removing), and the commented `HeroSectionGSAP` line.
2. Add: `import HeroStory from "./components/hero-story/HeroStory.jsx";`
3. Delete the `showIntro` state, the intro branch of the first `useEffect` (keep the Lenis part and the `isLoaded` mount gate), `handleIntroComplete`, and the `<AnimatePresence>{showIntro && <IntroOverlay .../>}</AnimatePresence>` block.
4. Replace `<HeroSectionRevamped />` with `<HeroStory />`.

The `sessionStorage("introShown")` key stays — HeroStory's Act 0 uses the same key, so returning visitors skip the entrance (spec §2).

Resulting top of the component (for reference):

```jsx
const HomePage = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    }
  }, []);
  // ...
```

- [ ] **Step 2: Verify the mobile bundle excludes three**

Run: `npm run build`
Expected: build passes. Then inspect: the route `/` first-load JS should NOT grow by ~150kb — `three` must sit in a separate async chunk (dynamic import). Check `.next/static/chunks` for a chunk containing "three" and confirm it is not referenced in the page's initial script list (view `.next/server/app/page.html` is not available — instead run the dev server, open DevTools Network with mobile emulation, confirm no chunk containing three.js is fetched).

- [ ] **Step 3: Full desktop visual QA (dev server)**

Run: `npm run dev` (with the Node 25 flag if needed)

Walk the story at `http://localhost:3000` and verify each item:

- Act 0 plays once; hard-refresh in same session skips it.
- Ch.1: grid + dashed frames + live spec labels visible; spec label matches DevTools computed font-size when you change viewport width.
- CTAs clickable at 0% scroll (click "Start a Project" → `/contact` navigates). Tab order reaches both CTAs and the chapter rail.
- Fast-flick scroll: chapters remain legible; no annotation lag detaching from frames.
- Ch.2: hairlines draw; source panel shows real `HeroStory.jsx` lines with the header comment; particles snap into the exploded UI wireframe (visible as layered rect outlines in depth); mouse repels particles locally.
- Weight-fill event (66–74%): type visibly floods 500→900; feels like an event, not a fade.
- Ch.3: bg image + glow + proof stats appear; CTAs solid; primary is red.
- Chapter rail: numbers jump to each chapter's hold plateau smoothly (Lenis).
- Cursor: crosshair+coords in Ch.1, caret in Ch.2, normal in Ch.3.
- Pin release into MarqueeBand: stage eases up during the last 8%; the band surges on arrival (velocity reaction); no visual pop.
- Scroll all the way back up: everything reverses cleanly (kickers restore, cursor returns to crosshair).
- Idle 5s at any chapter: particles keep drifting (never a freeze-frame).

- [ ] **Step 4: Reduced-motion + WebGL-failure QA**

- DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → reload: static Ch.3 frame, no pin (page scrolls straight through), one annotation visible, CTAs solid.
- DevTools → Rendering is not enough for WebGL; instead temporarily launch Chrome with `--disable-webgl` (or set `about:flags` WebGL off) → reload: hero renders and the full DOM story plays without particles, no console errors.

- [ ] **Step 5: Mobile QA**

DevTools mobile emulation (iPhone-class, 390px) + a real phone if available:
- Three beats auto-play; tap advances; beat indicator tracks.
- No three.js chunk in the Network tab.
- CTAs tappable at all times; no pin; page scrolls normally into the marquee.

- [ ] **Step 6: Lighthouse before/after**

Run Lighthouse (mobile + desktop) on `/` in an incognito window against the production build (`npm run build; npm run start`).
Expected: LCP ≤ previous hero (headline is SSR text now — likely better), CLS < 0.05, no new console errors. Record numbers in the PR/commit message.

- [ ] **Step 7: CHECKPOINT — review with Owen**

Show Owen the running story. Confirm together:
1. `PROOF_STATS` values in `ShipLayer.jsx` (must be real).
2. Kicker copy (three lines in `chapters.js`).
3. Archivo as the display face (swap candidates live by editing Task 2's font import if wanted).
4. Mobile CTA start-state (wireframe vs solid).

Apply any content edits, re-run `npm test` + `npm run build`.

- [ ] **Step 8: Commit**

```powershell
git add app/page.js app/components/hero-story/ShipLayer.jsx app/components/hero-story/chapters.js
git commit -m "feat: replace hero with Blueprint to Reality scrollytelling story"
```

---

### Task 16: Cleanup & Post-Launch Notes

**Files:**
- Modify: `app/page.js` (only if stale imports remain)
- Delete: nothing yet — `HeroSectionRevamped.jsx`, `HeroSection.jsx`, `HeroSectionGSAP.jsx`, `IntroOverlay.jsx` stay in-repo unreferenced during rollout (spec §4 degradation ladder). Schedule deletion after production verification.

- [ ] **Step 1: Confirm no dangling references**

Run: `npx next lint`
Expected: no unused-import errors in `app/page.js`. Then search the codebase for `HeroSectionRevamped|IntroOverlay` (Grep tool or `Select-String`): any match outside the unreferenced component files themselves is a stale reference — fix it.

- [ ] **Step 2: Full test + build gate**

Run: `npm test; npm run build`
Expected: all tests pass, build clean.

- [ ] **Step 3: Commit (if anything changed) and summarize**

```powershell
git add -A
git commit -m "chore(hero): post-integration cleanup"
```

Post-launch backlog (do NOT do now): sound toggle (spec §8), deletion of the three legacy hero components, real-device Android QA, Awwwards submission 2–4 weeks after production launch.
