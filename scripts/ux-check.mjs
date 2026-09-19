// Focused checks for the shortened homepage and native disclosures.
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";
import assert from "node:assert/strict";
const require = createRequire(
  path.join(
    process.env.PORTFOLIO_TEST_TOOLS || "/tmp/portfolio-tools",
    "package.json",
  ),
);
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const base = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:4321";
const out = process.env.PORTFOLIO_REPORT_DIR || "/tmp/portfolio-ux";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const desktopContext = await browser.newContext();
const page = await desktopContext.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const metrics = [];
for (const width of [375, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(base, { waitUntil: "networkidle" });
  metrics.push(
    await page.evaluate(() => ({
      width: innerWidth,
      height: document.body.scrollHeight,
      workTop:
        document.querySelector("#work").getBoundingClientRect().top + scrollY,
      visibleWords: document.querySelector("main").innerText.split(/\s+/)
        .length,
    })),
  );
  assert.ok(
    await page.evaluate(
      () =>
        document
          .querySelector(".tech-field")
          .compareDocumentPosition(document.querySelector("#work")) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ),
    "Projects follow the hero",
  );
  // On phones the Work link sits inside the closed menu, so follow it directly.
  await page.evaluate(() => document.querySelector('a[href="/#work"]').click());
  await page.waitForTimeout(700);
  const workTop = await page
    .locator("#work")
    .evaluate((el) => el.getBoundingClientRect().top);
  assert.ok(
    workTop >= 75 && workTop <= 120,
    "Work anchor clears the sticky navigation",
  );
  await page.screenshot({
    path: `${out}/work-${width}.png`,
    animations: "disabled",
  });
  await page.locator(".experience-more summary").click();
  assert.ok(await page.getByText("Nortal", { exact: true }).isVisible());
  await page.locator(".background-details summary").focus();
  await page.keyboard.press("Enter");
  assert.ok(
    await page
      .getByRole("heading", { name: /Master of Machine Learning/ })
      .isVisible(),
  );
  await page.locator(".skills-details summary").click();
  assert.ok(
    await page
      .getByText("PyTorch, CLIP, YOLO, OpenCV", { exact: true })
      .isVisible(),
  );
  await page.locator(".archive-more summary").click();
  assert.ok(
    await page.getByRole("link", { name: "Full-stack commerce" }).isVisible(),
  );
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  assert.deepEqual(
    result.violations.map((v) => v.id),
    [],
    "Expanded content accessibility",
  );
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
}
await page.goto(`${base}/work/roya/`);
await page
  .getByRole("link", { name: "Evidence & lessons", exact: true })
  .click();
await page.waitForTimeout(700);
assert.ok(
  await page
    .locator("#evidence")
    .evaluate((el) => el.getBoundingClientRect().top >= 75),
  "Case study anchor clears header",
);
const context = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 375, height: 812 },
  hasTouch: true,
  isMobile: true,
});
const touch = await context.newPage();
await touch.goto(base);
for (const selector of [
  ".experience-more",
  ".background-details",
  ".skills-details",
  ".archive-more",
]) {
  await touch.locator(`${selector} summary`).tap();
  assert.notEqual(
    await touch.locator(selector).getAttribute("open"),
    null,
    `${selector} works without JS`,
  );
}
assert.deepEqual(errors, []);
fs.writeFileSync(`${out}/metrics.json`, JSON.stringify(metrics, null, 2));
console.log(
  "PASS: hero then projects, sticky anchors, keyboard/touch disclosures, expanded accessibility, case-study shortcuts.",
);
console.log(metrics);
await browser.close();
