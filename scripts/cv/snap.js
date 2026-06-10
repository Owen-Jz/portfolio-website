const path = require("path");
const { chromium } = require(path.resolve(__dirname, "..", "..", "html-templates", "node_modules", "playwright"));
(async () => {
  const htmlPath = path.resolve(__dirname, "cv.html").replace(/\\/g, "/");
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  // A4 at 96dpi ~ 794 x 1123 px
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const h = await page.evaluate(() => document.querySelector('.page').getBoundingClientRect().height);
  console.log("rendered .page height(px):", Math.round(h), " A4 max ~1123");
  await page.screenshot({ path: path.resolve(__dirname, "preview.png"), fullPage: true });
  await browser.close();
})();
