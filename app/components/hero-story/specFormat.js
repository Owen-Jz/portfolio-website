/**
 * Pure formatter for live design-spec annotations. Values must come from
 * getComputedStyle so the labels are true — the meta-honesty is the design.
 */
export function formatSpec({ tag, fontSizePx, letterSpacingPx, fontFamily, weight }) {
  const trackingPct =
    fontSizePx > 0 ? Math.round((letterSpacingPx / fontSizePx) * 1000) / 10 : 0;
  // "-2" not "-2.0" — drop trailing .0
  const tracking = String(trackingPct);
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
