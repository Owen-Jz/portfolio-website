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
    // --- scattered: deep starfield volume, slightly wider than the viewport;
    // the z spread gives the Ch.1 mouse parallax real depth to play with
    scattered[i * 3] = (rand() * 2 - 1) * halfW * 1.15;
    scattered[i * 3 + 1] = (rand() * 2 - 1) * halfH * 1.15;
    scattered[i * 3 + 2] = (rand() * 2 - 1) * 420;

    // --- exploded: pick a rect (weighted by perimeter), pick a point on it
    const rect = pickByPerimeter(rects, rand());
    const [px, py] = pointOnPerimeter(rect, rand());
    exploded[i * 3] = px - halfW;
    exploded[i * 3 + 1] = -(py - halfH);
    exploded[i * 3 + 2] = rect.z;

    // --- settled: lower-half drift band
    settled[i * 3] = (rand() * 2 - 1) * halfW * 1.1;
    settled[i * 3 + 1] = -rand() * halfH * 1.2 * 0.5; // 0..-0.6*halfH (lower-half drift band)
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
