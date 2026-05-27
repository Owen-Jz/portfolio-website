# Testimonials Section Redesign

**Date:** 2026-05-27  
**Status:** Approved

## Summary

Redesign the existing testimonials carousel to feel dramatically more premium — larger cards, oversized decorative quote marks, bigger profile photos with a red glow ring, and 5-star ratings. No layout change (keep the infinite horizontal carousel), just a significantly elevated visual treatment.

---

## Current State

- `app/components/TestimonialsSection.jsx` — section wrapper + hardcoded testimonials array
- `app/components/ui/InfiniteMovingCards.jsx` — carousel engine
- Cards: `w-[350px] md:w-[450px]`, 48px circular avatar, small Lucide `Quote` icon, no ratings
- Background: single centered red glow blob
- Speed: "slow"

---

## Design

### Card Dimensions

- Width: `w-[500px]` on mobile, `w-[560px]` on md+
- Padding: `p-10` (increased from `p-8`)
- Height: `min-h-[320px]` to ensure consistent tall cards

### Decorative Quote Mark

- Replace the `<Quote />` Lucide icon with the typographic left double quotation mark `"` (U+201C)
- Size: `text-[96px]` or `text-[120px]`, font-family Manrope, line-height 1
- Color: `text-[#b02222]` at 60% opacity
- Position: `-mt-4 -mb-4` so it overlaps into the card's top space, feeling oversized and anchored
- This becomes the dominant visual element at the top of the card

### Star Rating

- 5 filled gold stars rendered as Unicode `★★★★★` — `text-[#f5a623]`, `text-sm`, `tracking-wide`
- Placed directly below the quote mark, before the quote text
- Tight spacing: `mb-3` between stars and quote text

### Quote Text

- Increase from `text-lg md:text-xl` to `text-xl md:text-2xl`
- Line height: `leading-relaxed`
- Color: `text-white/85` (slightly brighter than current `text-white/80`)
- Remove the surrounding `"..."` wrapping from the displayed text — the decorative quote mark handles that visually

### Profile Photo

- Increase avatar from `w-12 h-12` (48px) to `w-16 h-16` (64px)
- Replace plain `border border-white/10` with a subtle red glow ring: `ring-2 ring-[#b02222]/40 ring-offset-2 ring-offset-[#151515]`
- Keep the flag badge (bottom-right corner), scale slightly: `w-5 h-3.5`

### Card Glass Effect

- Background: `bg-[#0f0f0f]/60` (slightly darker than current `#151515/50`)
- Red glow blob inside card: increase from `bg-[#b02222]/10` to `bg-[#b02222]/15`, size from `150px` to `200px`
- Hover glow: `hover:shadow-[0_0_40px_rgba(176,34,34,0.2)]` (stronger than current `0_0_30px_...0.15`)

### Attribution Row

- Avatar + name/role layout unchanged — just larger avatar
- Name: `text-base font-bold` (unchanged)
- Role: `text-white/50 text-sm` (unchanged)
- Border separator: `border-t border-white/5 pt-6` (unchanged)

### Carousel Speed

- Change `speed="slow"` to `speed="slow"` — keep as-is; the wider cards naturally feel slower

### Section Background

- Increase background glow from `w-[600px] h-[600px]` to `w-[800px] h-[800px]` to match the elevated card drama
- Opacity: stay at `bg-[#b02222]/5`

---

## Files to Modify

1. `app/components/TestimonialsSection.jsx` — all card markup and glow changes live here (self-contained)

No changes needed to `InfiniteMovingCards.jsx` or `GlassCard.jsx`.

---

## Out of Scope

- Adding/editing testimonial content
- Layout change (no grid, no hero card)
- Carousel engine changes
