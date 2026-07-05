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
