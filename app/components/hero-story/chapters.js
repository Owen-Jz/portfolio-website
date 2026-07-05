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

export const KICKERS = [
  "Every product starts as a sketch.",
  "Then it gets engineered.",
  "And shipped. I'm Owen — I do all three.",
];
