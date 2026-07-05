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
