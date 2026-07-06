// Visual QA for the hero story — captures the intro hand-off, each chapter
// beat (with the pointer parked so the constellation shows), and a
// best-effort scroll-fling for the velocity warp.
// Usage: node scripts/qa-hero-shots.mjs   (dev server must be on :3003)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3003";
const OUT = ".superpowers/qa";
const VH = 900;
const PIN = 2.4 * VH; // ScrollTrigger end: "+=240%"

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  args: ["--enable-unsafe-swiftshader"],
});

// ---- Run 1: the intro overlay + starry hand-off --------------------------
{
  const page = await browser.newPage({ viewport: { width: 1600, height: VH } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/00-intro-word.png` });
  await page.waitForTimeout(5800); // overlay done, starfield fading up
  await page.screenshot({ path: `${OUT}/00-intro-handoff.png` });
  await page.close();
}

// ---- Run 2: chapter beats (intro skipped) ---------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1600, height: VH } });
  await ctx.addInitScript(() => sessionStorage.setItem("introShown", "true"));
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") console.log("[console.error]", m.text());
  });
  page.on("pageerror", (e) => console.log("[pageerror]", e.message));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // fonts, canvas, entrance

  const shots = [
    { name: "01-idea", p: 0.05, mouse: [1050, 320] },
    { name: "01-idea-constellation", p: 0.05, mouse: [560, 520] },
    { name: "02-build-enter", p: 0.33, mouse: [800, 450] },
    { name: "02-build-hold", p: 0.5, mouse: [800, 450] },
    { name: "03-slam", p: 0.71, mouse: [800, 450] },
    { name: "03-ship-hold", p: 0.87, mouse: [800, 450] },
  ];

  for (const s of shots) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(s.p * PIN));
    // glide the pointer so pointermove fires and the uniforms settle
    for (let i = 1; i <= 6; i++) {
      await page.mouse.move(
        800 + ((s.mouse[0] - 800) * i) / 6,
        450 + ((s.mouse[1] - 450) * i) / 6
      );
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(1400); // scrub 0.5 + eased uniforms settle
    await page.screenshot({ path: `${OUT}/${s.name}.png` });
    console.log("shot:", s.name);
  }

  // ---- warp: fling the wheel hard and shoot immediately
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  for (let i = 0; i < 10; i++) await page.mouse.wheel(0, 260);
  await page.waitForTimeout(120);
  await page.screenshot({ path: `${OUT}/04-warp-fling.png` });
  console.log("shot: 04-warp-fling");

  await ctx.close();
}

await browser.close();
console.log("done ->", OUT);
