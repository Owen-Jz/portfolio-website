# Design Process Section — Spec

## Overview

Add a **Design Process** section to the portfolio with two manifestations:
1. A **standalone `/process` page** showing the full design process
2. A **condensed teaser** integrated into the existing About page

---

## Design Process Page (`/process`)

### Layout: Vertical Timeline

- Left-aligned vertical line (2px, `#b02222` with glow) connecting 6 phase cards
- Each phase card: numbered badge (circle with phase number), phase name, description, and deliverable tag
- Cards animate in on scroll using `framer-motion` (fade + slide from left)
- Max-width container centered on page with `pt-32` top padding (matches About page)
- Background: same atmospheric glow effects as About page

### Phases

| # | Phase | Description | Deliverable |
|---|-------|-------------|-------------|
| 1 | **Discovery** | Research, stakeholder interviews, competitive analysis | Project Brief |
| 2 | **Strategy** | Define goals, user personas, information architecture | Roadmap |
| 3 | **Design** | Wireframes → high-fidelity mockups in Figma | Design System & Mockups |
| 4 | **Prototype** | Interactive prototypes for user testing | Clickable Prototype |
| 5 | **Handoff** | Developer collaboration, specs, and documentation | Annotated Designs |
| 6 | **Launch & Iterate** | QA, deployment, post-launch monitoring | Live Product |

### Components

- **PhaseCard**: GlassCard-wrapped card with:
  - Left: numbered circle badge (bg `#b02222]`)
  - Right: phase name (bold, large), description (white/60), deliverable chip (outlined pill with arrow icon)
- **TimelineConnector**: 2px vertical line with gradient glow, positioned left of cards

### Page Structure

```
NavbarDemo
Background glows (fixed, atmospheric)
max-w-7xl mx-auto
  Header: "My Design Process" + subtitle
  Timeline container
    PhaseCard × 6 (staggered animation)
  CTA: "Interested in working together?" → links to /contact
FooterSection
```

---

## About Page Integration

### Condensed "My Process" Teaser Section

- **Location**: Between Achievements section and Skills section
- **Layout**: Horizontal scrollable row of phase name pills
- **Each pill**: Phase number + name (e.g., "1. Discovery"), outlined style matching existing skill pills
- **Link**: "View Full Process →" text link in `#b02222]` below the row
- **Animation**: Pills fade in on scroll

### Placement in About Page (page.jsx)

```
Achievements Section
  ↓
[New] My Process Teaser Section
  ↓
Skills Section (Technical Arsenal)
  ↓
```

---

## Dependencies

- Reuse existing `GlassCard` component
- Reuse `NavbarDemo`, `FooterSection`, `ContactSection`
- Use `framer-motion` for animations (already in use)
- Use `lucide-react` icons for any new icons (plus, arrow-right)
- No new dependencies required

---

## Files to Create/Modify

### New Files
- `app/(pages)/process/page.jsx` — standalone process page

### Modified Files
- `app/(pages)/about/page.jsx` — add process teaser section between achievements and skills

---

## Reuse Strategy

The `PhaseCard` component should be defined in the process page itself (not extracted) since it is only used on that page. The teaser on About uses simple pills, not phase cards — no shared component needed unless the teaser also needs the same card treatment, in which case extract a `ProcessTeaser` component.
