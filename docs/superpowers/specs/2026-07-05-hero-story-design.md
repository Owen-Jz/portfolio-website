# Hero Story — "Blueprint to Reality" Design Spec

**Date:** 2026-07-05
**Status:** Approved for planning
**Replaces:** `HeroSectionRevamped.jsx` (hero) and `IntroOverlay.jsx` (intro) on the landing page

## 1. Purpose

The current hero is a one-shot entrance animation: everything plays on load, scroll only fades it away. It claims craft without demonstrating it. This redesign turns the hero into a pinned scrollytelling narrative in which the hero *builds itself* in front of the visitor — idea → build → ship — so the medium itself proves Owen is a designer-engineer who does all three.

Target bar: Awwwards SOTD contender (adversarial review of this spec scored the v1 concept 6.15/Honorable Mention; the v2 decisions below were made specifically to close those gaps toward 7.3+).

## 2. Narrative Structure

Pinned hero, **~240vh total scroll** (`end: "+=240%"`), `scrub: 0.5` (Lenis at lerp 0.1 already smooths; higher scrub values create double-smoothing mush).

Each chapter follows **plateau choreography**: entrance band → hold band (nothing animates; a screenshot-able "frame") → exit band. Major events (assembly snap, weight-fill) are compressed into narrow scroll windows (~6–8% of total scroll) with overshoot so they read as events, not linear lerps.

### Act 0 — Entrance (time-based, ~1.2s, once per session)
- Fine grid fades up over `#0a0a0a`.
- A dashed selection-rectangle draws itself around the headline area with a mono spec label.
- Plays on load, gated by the existing `sessionStorage("introShown")` key. `IntroOverlay` is deleted from `page.js`; this replaces it. No overlay + entrance + story stacking — Act 0 *is* the intro.

### Chapter 1 — The Idea (scroll 0–33%)
- Headline exists as **thin-weight variable type** (wght ≈ 100) with measurement lines and annotation tags, like a Figma frame.
- Badge and CTA buttons render in "wireframe style": dashed borders, transparent fill — **but they are real, clickable, focusable elements from frame one** (style-only treatment, never DOM-gated).
- WebGL point cloud: loose drifting dust, faint.
- Kicker (specific, not aphoristic): "Every product starts as a sketch."
- Cursor state: crosshair with live x/y coordinate readout.

### Chapter 2 — The Build (33–66%)
- SVG wireframe lines draw in via stroke-dashoffset.
- **Surprise beat:** an annotation panel renders the *actual source code of the hero component itself* (real lines from `HeroStory.jsx`, real line numbers). No Matrix code-rain.
- WebGL event: the point cloud **assembles into an exploded axonometric wireframe of the hero UI itself** — headline plane, CTA planes, badge plane as separate 3D depth layers. Assembly snap occupies a narrow scroll band with per-particle stagger and overshoot.
- Variable font animates wght 100 → ~500.
- Kicker: "Then it gets engineered."
- Cursor state: terminal caret.

### Chapter 3 — The Ship (66–100%)
- The exploded 3D wireframe layers **flatten and settle into place** behind the real DOM; particles dissolve to calm ambient drift.
- Variable font completes wght → 900. No `bg-clip-text` shimmer anywhere (the current shimmer is an AI-template tell and does not survive the rebuild).
- Dashed wireframe buttons materialize into the solid magnetic CTAs; badge blinks on; graded background image (`hero3.jpeg` treatment) fades up.
- **Proof content** as mono annotations: real project count, years of experience, a client name.
- Kicker resolves: "And shipped. I'm Owen — I do all three."
- Cursor state: default magnetic.
- Pin release **overlaps** the MarqueeBand: the band is alive behind the final 10% of the pin and slides up as the pin releases — a handoff, not a cut.

### Persistent layer
- Chapter rail (01 / 02 / 03 + labels) on the left edge tracking progress; **each number is a scroll-jump link** (skip affordance via `scrollTo`).
- Existing scroll-cue pulse survives at the bottom, fades by 20% scroll.
- Idle-state life: if the visitor pauses, particles keep drifting, one annotation blinks through alternate specs — the hero is never a still.

## 3. Visual Language

- Palette: unchanged site palette — `#0a0a0a` canvas, white hairlines at low opacity for blueprint language, `#b02222` red floods in during Ch.3. Mono font for all annotations.
- **Typography is the animation:** a variable display grotesque with a usable wght axis (candidates: Clash Display, General Sans, Archivo — final pick made during implementation with in-browser comparison). The type gaining weight across chapters *is* the stroke-to-fill story, done honestly.
- **Truth constraint:** spec labels (e.g., `H1 · 96px · –2% tracking`) are computed live via `getComputedStyle` and re-measured on resize. If inspected, they must be correct — the meta-honesty is the design.
- Copy is specific throughout; no fortune-cookie aphorisms, no "Hello, I am."

## 4. Technical Architecture

```
app/components/hero-story/
├── HeroStory.jsx          # Orchestrator: pin container, master GSAP timeline
├── HeroStoryMobile.jsx    # Designed mobile sequence (no pin, no WebGL)
├── HeroParticles.jsx      # Three.js layer (dynamic import, desktop only)
├── BlueprintLayer.jsx     # Ch.1 DOM: grid, dashed frames, live spec annotations
├── BuildLayer.jsx         # Ch.2 DOM: SVG line-draws, self-referential source panel
├── ShipLayer.jsx          # Ch.3 DOM: final headline, CTAs, badge, bg image, proof stats
├── ChapterRail.jsx        # 01/02/03 progress rail + scroll-jump links
├── useLiveSpecs.js        # getComputedStyle → annotation values, resize-aware
└── useUiPointTargets.js   # Samples hero UI layout → exploded-wireframe particle targets
```

### Master timeline
One `ScrollTrigger` owns everything:

```js
{ trigger, start: "top top", end: "+=240%", pin: true, scrub: 0.5, anticipatePin: 1 }
```

A single GSAP timeline with labeled segments (`idea`, `build`, `ship`). All DOM tweens live on it, and it tweens a proxy object whose values feed Three.js shader uniforms — one timeline means DOM and WebGL cannot drift. Plugs into the existing Lenis↔ScrollTrigger wiring in `page.js` unchanged.

**The hero is GSAP-only.** No Framer Motion inside `hero-story/` — springs fighting a scrubbed timeline on the same transforms cause jitter. (Framer Motion remains in use elsewhere on the page.)

### WebGL layer
- Plain `three` (new dependency — the only one). No react-three-fiber.
- One `THREE.Points` cloud (~20k particles desktop), custom `ShaderMaterial`.
- Per-particle target-position attributes for three states: scattered noise (Ch.1) → exploded axonometric UI wireframe (Ch.2) → settled ambient drift (Ch.3). Vertex shader mixes via `uProgress`; morphing is GPU-side, zero per-frame JS.
- UI wireframe targets sampled once from the actual DOM layout geometry (headline/CTA/badge bounding boxes → edge points in 3D planes).
- **Mouse interaction:** depth parallax on pointer move + local particle repulsion around the cursor (mouse uniform).
- **Blue-noise dithering in the fragment shader** — dark-on-dark gradients over `#0a0a0a` band visibly without it.
- Grain overlay decision: the existing `.grain-overlay` stays above everything, but particle luminance is tuned with it ON — verified visually, not assumed.
- Loaded via `next/dynamic` (`ssr: false`), import requested only on ≥768px + fine-pointer + no reduced-motion. Mobile never downloads Three.js.
- Renderer: DPR clamped to 1.5, RAF paused when hero is off-screen or tab hidden, full dispose on unmount.

### Mobile (<768px or coarse pointer)
`HeroStoryMobile` is **its own designed piece, not a fallback**: the three narrative beats as an auto-playing (with tap-to-advance) sequence in pure CSS/SVG — line-draw and variable-weight-fill moments carry it. No pin, no canvas, no Three.js download. Real CTAs visible within the first beat.

### Degradation ladder
1. `prefers-reduced-motion`: no pin, no particles; static Ch.3 composition **with one annotation visible** so the concept still reads.
2. WebGL context creation fails: particles skipped; the DOM story plays fully.
3. Old `HeroSectionRevamped.jsx` kept in-repo (unreferenced) during rollout; deleted after verification.

## 5. Content Requirements

- Real proof stats for Ch.3 (project count, years, client name) — sourced from Owen, no placeholders at ship time.
- Final kicker copy (three lines) — drafted in spec, finalized in implementation review.
- Variable font license check for the chosen face (Fontshare faces are free for commercial use).

## 6. Performance & Accessibility Budget

- LCP: Ch.1 headline is the LCP element, server-rendered, visible immediately — target no regression vs. current hero (<1.5s on fast 4G).
- CLS < 0.05 (pin spacer sized before paint; font loaded with `next/font` to avoid FOUT shift).
- Sustained 60fps during scrub on a mid-tier laptop; single draw call for the particle system.
- Keyboard: CTAs focusable from frame one in natural tab order; chapter rail links keyboard-operable; pin does not trap focus.
- Screen readers: narrative kickers exist as real text in DOM order; decorative layers `aria-hidden`.

## 7. Testing

- Manual scroll QA at 3 breakpoints (mobile / tablet / desktop), including fast-flick scrubbing.
- Reduced-motion emulation run.
- WebGL-disabled run (context-failure path).
- Lighthouse on `/` before/after (LCP, CLS, TBT compared).
- Session-storage intro gating verified (first visit vs. return visit).
- Dev note: run with `--no-experimental-webstorage` on Node 25.

## 8. Out of Scope

- Sound design (noted as optional SOTD garnish; revisit post-launch).
- Route/page transitions beyond the hero (separate project).
- Changes to sections below the MarqueeBand.
