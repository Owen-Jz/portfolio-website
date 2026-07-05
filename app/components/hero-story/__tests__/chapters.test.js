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

  it("keeps events inside their intended windows", () => {
    // assemble is deliberately wide (a watchable condensation), capped at 20%
    expect(bd(EVENTS.assemble)).toBeLessThanOrEqual(0.2);
    expect(bd(EVENTS.weightFill)).toBeLessThanOrEqual(0.1);
    expect(bd(EVENTS.release)).toBeLessThanOrEqual(0.1);
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
