# Design Process Animations — Spec Addendum

## Overview

Enhance the `/process` page PhaseCards with abstract motion graphic animations per phase. Replace the current static icon + text cards with cards that include an animated visual element unique to each phase.

---

## Phase Animations

Each phase card gets a small (approx 80x80px) animated visual element rendered as a standalone component using CSS/Tailwind animations. No external assets — all procedural via HTML/CSS.

| Phase | Animation |
|-------|-----------|
| **Discovery** | Concentric circles that pulse outward (radar/research) |
| **Strategy** | Branching lines that draw themselves (flowchart forming) |
| **Design** | Color swatches that shift and blend (palette) |
| **Prototype** | Phone frame with UI elements that slide in (device preview) |
| **Handoff** | Code brackets that open/close with typing dots (spec doc) |
| **Launch & Iterate** | Dots ascending with a trailing path (growth/rocket) |

---

## Technical Approach

- Pure CSS/Tailwind animations — no extra libraries
- Each animation is a small React component inside the GlassCard, rendered alongside the text content
- Animations loop infinitely and start on mount
- Scale: ~80x80px visual area, positioned above the phase name or beside description on md+
- Colors: white/white-20 with `#b02222` accents, matching the existing palette

---

## Files to Modify

- `app/(pages)/process/page.jsx` — add animation components, update PhaseCard layout, replace CTA with ContactSection
