const path = require("path");
const { chromium } = require(path.resolve(__dirname, "..", "..", "html-templates", "node_modules", "playwright"));

(async () => {
  const htmlPath = path.resolve(__dirname, "cv.html");
  const outPath = path.resolve(__dirname, "..", "..", "public", "cv.pdf");

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + htmlPath.replace(/\\/g, "/"), { waitUntil: "networkidle" });
  // Ensure web fonts are fully loaded before printing
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: outPath,
    width: "210mm",
    height: "297mm",
    printBackground: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log("Generated " + outPath);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
