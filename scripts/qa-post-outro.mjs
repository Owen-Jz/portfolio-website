// One-off QA: open the first blog post and screenshot the end-of-post
// outro (like prompt + subscribe) in both un-liked and liked states.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = ".superpowers/qa";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 950 } });
page.on("pageerror", (e) => console.log("[pageerror]", e.message));

await page.goto("http://localhost:3003/blog", { waitUntil: "networkidle" });
const href = await page
  .locator("a[href^='/blog/']")
  .first()
  .getAttribute("href");
console.log("post:", href);
await page.goto(`http://localhost:3003${href}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const outro = page.locator("text=End of post");
await outro.scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/post-outro-unliked.png` });

await page.locator("button", { hasText: "Drop a like" }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/post-outro-liked.png` });

await browser.close();
console.log("done");
