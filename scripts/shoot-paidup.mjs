// Captures live screenshots of PaidUp (https://paidup.site) for the portfolio
// case study. Signs into the seeded demo workspace, dismisses the guided tour,
// and lets the GSAP scroll story settle before each landing frame.
// Usage: node scripts/shoot-paidup.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "https://paidup.site";
const OUT = "public/projects/paidup-case-study";
const VP = { width: 1600, height: 1000 };

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader"] });
const ctx = await browser.newContext({ viewport: VP, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("[pageerror]", e.message));

const shot = async (p, name) => {
  await p.screenshot({ path: `${OUT}/${name}.png` });
  console.log("shot:", name);
};

// ---- Landing: settle on each anchored section ---------------------------
await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(4000);
await shot(page, "01-landing-hero");

for (const [name, sel] of [
  ["02-landing-problem", "The problem"],
  ["03-landing-how", "How it works"],
  ["04-landing-why", "Why PaidUp"],
]) {
  try {
    await page.click(`nav >> text=${sel}`, { timeout: 10000 });
    await page.waitForTimeout(3500); // let GSAP/Lenis settle, no mid-tween frames
    await shot(page, name);
  } catch (e) { console.log(`[${name}]`, e.message); }
}

// ---- Sign in to the demo workspace --------------------------------------
await page.goto(`${BASE}/login`, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
await page.fill('input[type="email"], input[name="email"]', "demo@paidup.app");
await page.fill('input[type="password"], input[name="password"]', "LedgerDemo2026");
await Promise.all([
  page.waitForURL(/\/app/, { timeout: 45000 }).catch(() => {}),
  page.click('button[type="submit"]'),
]);
await page.waitForTimeout(4000);

// Dismiss the first-run guided tour so it doesn't sit over every dashboard shot
for (const label of ["Skip", "Skip tour", "Close"]) {
  const b = page.locator(`button:has-text("${label}")`).first();
  if (await b.count().catch(() => 0)) {
    await b.click({ timeout: 5000 }).catch(() => {});
    console.log("dismissed tour via:", label);
    break;
  }
}
await page.waitForTimeout(2500);

// ---- App views -----------------------------------------------------------
const views = [
  ["05-live-feed", "/app"],
  ["06-invoices", "/app/invoices"],
  ["07-withdraw", "/app/withdraw"],
  ["08-reports-ledger", "/app/reports/ledger"],
];
for (const [name, path] of views) {
  try {
    await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(3500);
    const skip = page.locator('button:has-text("Skip")').first();
    if (await skip.count().catch(() => 0)) await skip.click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(1200);
    await shot(page, name);
  } catch (e) { console.log(`[${name}]`, e.message); }
}

// ---- Mobile ---------------------------------------------------------------
const m = await ctx.newPage();
await m.setViewportSize({ width: 430, height: 932 });
for (const [name, path] of [["09-mobile-landing", "/"], ["10-mobile-invoices", "/app/invoices"]]) {
  try {
    await m.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
    await m.waitForTimeout(3500);
    const skip = m.locator('button:has-text("Skip")').first();
    if (await skip.count().catch(() => 0)) await skip.click({ timeout: 3000 }).catch(() => {});
    await m.waitForTimeout(1200);
    await shot(m, name);
  } catch (e) { console.log(`[${name}]`, e.message); }
}

await browser.close();
console.log("done");
