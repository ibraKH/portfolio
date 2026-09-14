// Browser regression checks: every page at 375/768/1440px, axe WCAG A/AA,
// key journeys, reduced motion, no-JS touch controls, internal links, CV download.
// Test tools stay out of the site's dependencies. Build and preview first:
//   npm run build && npm run preview -- --host 127.0.0.1 --port 4321
//   npm install --prefix /tmp/portfolio-tools playwright @axe-core/playwright
//   PORTFOLIO_TEST_TOOLS=/tmp/portfolio-tools node scripts/browser-check.mjs
// Optional: CHROME_PATH, PORTFOLIO_BASE_URL, PORTFOLIO_REPORT_DIR.
import { createRequire } from "node:module";
import path from "node:path";
import os from "node:os";
const require = createRequire(
  process.env.PORTFOLIO_TEST_TOOLS
    ? path.join(process.env.PORTFOLIO_TEST_TOOLS, "package.json")
    : import.meta.url,
);
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
import assert from "node:assert/strict";
import fs from "node:fs";
const reportDir =
  process.env.PORTFOLIO_REPORT_DIR ||
  path.join(os.tmpdir(), "portfolio-review");
fs.mkdirSync(reportDir, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const context = await browser.newContext();
const page = await context.newPage();
const report = {
  environment: {
    browser: browser.version(),
    widths: [375, 768, 1440],
    base: process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:4321",
  },
  pages: [],
  journeys: [],
  errors: [],
};
page.on("pageerror", (e) => report.errors.push(e.message));
page.on("console", (e) => {
  if (e.type() === "error") report.errors.push(e.text());
});
const routes = [
  "/",
  "/work/roya/",
  "/work/clip/",
  "/work/techlauncher/",
  "/work/nanogpt/",
  "/map/",
  "/404.html",
];
for (const route of routes) {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(report.environment.base + route, {
      waitUntil: "networkidle",
    });
    assert.ok((await page.locator("h1").count()) === 1, route + " has one h1");
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      route + " overflow",
    );
    // Scroll to load all below-fold images and exercise one-time section reveals.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 35));
      }
      window.scrollTo(0, 0);
    });
    await page.locator("img").evaluateAll(async (imgs) => {
      imgs.forEach((img) => (img.loading = "eager"));
      await Promise.all(imgs.map((img) => img.decode()));
    });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    assert.deepEqual(
      result.violations.map((v) => v.id),
      [],
      route + " accessibility",
    );
    report.pages.push({ route, width, overflow: false, axeViolations: 0 });
    console.log("PASS", route, width);
    if (route === "/" || width === 375)
      await page.screenshot({
        path: `${reportDir}/final-${route.replaceAll("/", "_")}-${width}.png`,
        fullPage: true,
      });
  }
}
await page.goto(report.environment.base);
for (const slug of ["roya", "clip", "techlauncher", "nanogpt"]) {
  await page.locator(`.project-link[href="/work/${slug}/"]`).click();
  await page.waitForURL(`**/work/${slug}/`);
  await page.getByRole("link", { name: "All work", exact: true }).click();
  await page.waitForURL("**/#work");
}
report.journeys.push("All four preview → case study → all work journeys");
await page.locator("#depth").uncheck();
assert.equal(await page.locator("#depth").isChecked(), false);
await page.locator("#depth").focus();
await page.keyboard.press("Space");
assert.equal(await page.locator("#depth").isChecked(), true);
report.journeys.push("3D / flat view control works with pointer and keyboard");
await page.locator('label[for="regions"]').click();
await page.waitForFunction(
  () =>
    getComputedStyle(document.querySelector(".region-layer")).opacity === "1",
);
await page.locator("#regions").focus();
await page.keyboard.press("ArrowRight");
assert.ok(await page.locator("#meaning").isChecked());
await page.waitForFunction(
  () =>
    getComputedStyle(document.querySelector(".interpretation")).opacity === "1",
);
report.journeys.push(
  "Region overlay visible after transition; arrow-key stage selection",
);
await page.locator(".visual-notes summary").first().click();
assert.ok(
  (await page.locator(".visual-notes").first().getAttribute("open")) !== null,
);
report.journeys.push("Native diagram disclosure");
const dp = page.waitForEvent("download");
await page
  .getByRole("link", { name: "Download CV", exact: true })
  .first()
  .click();
await (await dp).saveAs(path.join(reportDir, "final-cv.pdf"));
assert.ok(
  fs
    .readFileSync(path.join(reportDir, "final-cv.pdf"))
    .equals(
      fs.readFileSync(
        new URL("../public/Ibrahim-Alharthi-CV.pdf", import.meta.url),
      ),
    ),
);
report.journeys.push("Downloaded CV byte-for-byte match");
const touchContext = await browser.newContext({
  hasTouch: true,
  isMobile: true,
  viewport: { width: 375, height: 812 },
  javaScriptEnabled: false,
});
const touch = await touchContext.newPage();
await touch.emulateMedia({ reducedMotion: "reduce" });
await touch.goto(report.environment.base, { waitUntil: "networkidle" });
await touch.locator("#depth").uncheck({ force: true });
assert.equal(await touch.locator("#depth").isChecked(), false);
await touch.locator('label[for="regions"]').tap({ force: true });
assert.ok(await touch.locator("#regions").isChecked());
await touch.locator('label[for="meaning"]').tap({ force: true });
assert.ok(await touch.locator("#meaning").isChecked());
assert.equal(await touch.locator(".project").count(), 4);
await touch.locator(".visual-notes summary").first().tap({ force: true });
assert.ok(
  (await touch.locator(".visual-notes").first().getAttribute("open")) !== null,
);
report.journeys.push(
  "Touch, signature controls, diagram notes and content with JavaScript disabled and reduced motion",
);
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(report.environment.base);
assert.equal(
  await page
    .locator(".hero-copy")
    .evaluate((el) => getComputedStyle(el).animationName),
  "none",
);
await page.keyboard.press("Tab");
assert.equal(
  await page.evaluate(() => document.activeElement.textContent),
  "Skip to content",
);
await page.keyboard.press("Enter");
report.journeys.push("Reduced motion disables entrances; keyboard skip link");
const hrefs = new Set();
for (const route of routes) {
  await page.goto(report.environment.base + route);
  for (const href of await page
    .locator("a[href]")
    .evaluateAll((els) => els.map((e) => e.getAttribute("href"))))
    hrefs.add(href);
}
report.links = [];
for (const href of hrefs) {
  if (href.startsWith("/") || href.startsWith("#")) {
    const target = new URL(href, report.environment.base);
    const res = await page.request.get(target.href);
    assert.equal(res.status(), 200, "link " + href);
    if (target.hash) {
      await page.goto(target.href);
      assert.ok(
        await page.locator(`[id="${target.hash.slice(1)}"]`).count(),
        "anchor " + href,
      );
    }
    report.links.push({ href, status: 200 });
  }
}
assert.deepEqual(report.errors, []);
fs.writeFileSync(
  path.join(reportDir, "browser-report.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
await browser.close();
