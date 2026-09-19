// Production bundle accounting; optional Lighthouse uses tools installed outside the app.
import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { pathToFileURL } from "node:url";
const out = process.env.PORTFOLIO_REPORT_DIR || "/tmp/portfolio-lab";
fs.mkdirSync(out, { recursive: true });
const files = fs.readdirSync("dist/_astro");
const html = fs.readFileSync("dist/index.html", "utf8");
const inline = [...html.matchAll(/<script[^>]*>(.*?)<\/script>/gs)]
  .map((m) => m[1])
  .join("");
const resources = files
  .filter((f) => /\.(js|css)$/.test(f))
  .map((file) => {
    const data = fs.readFileSync(path.join("dist/_astro", file));
    return { file, bytes: data.length, gzip: gzipSync(data).length };
  });
const bundle = {
  resources,
  homepage: {
    htmlBytes: Buffer.byteLength(html),
    gzipBytes: gzipSync(html).length,
    inlineScriptBytes: Buffer.byteLength(inline),
    inlineScriptGzip: gzipSync(inline).length,
  },
  fontBytes: fs.statSync("public/fonts/space-grotesk-latin.ttf").size,
  hydratedComponents: 0,
  newDependencies: 0,
};
fs.writeFileSync(`${out}/bundle.json`, JSON.stringify(bundle, null, 2));
console.log(JSON.stringify(bundle, null, 2));
if (process.argv.includes("--lighthouse")) {
  const root = process.env.PORTFOLIO_TEST_TOOLS || "/tmp/portfolio-tools";
  const { default: lighthouse } = await import(
    pathToFileURL(`${root}/node_modules/lighthouse/core/index.js`).href
  );
  const { default: desktopConfig } = await import(
    pathToFileURL(
      `${root}/node_modules/lighthouse/core/config/desktop-config.js`,
    ).href
  );
  const { launch } = await import(
    pathToFileURL(`${root}/node_modules/chrome-launcher/dist/index.js`).href
  );
  const chrome = await launch({
    chromePath:
      process.env.CHROME_PATH ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    chromeFlags: ["--headless", "--no-sandbox"],
  });
  try {
    for (const mode of ["mobile", "desktop"]) {
      const result = await lighthouse(
        process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:4321",
        {
          port: chrome.port,
          output: "json",
          logLevel: "error",
          onlyCategories: [
            "performance",
            "accessibility",
            "best-practices",
            "seo",
          ],
        },
        mode === "desktop" ? desktopConfig : undefined,
      );
      fs.writeFileSync(
        `${out}/lighthouse-${mode}.json`,
        JSON.stringify(result.lhr, null, 2),
      );
      console.log(
        mode,
        JSON.stringify({
          scores: Object.fromEntries(
            Object.entries(result.lhr.categories).map(([key, value]) => [
              key,
              value.score,
            ]),
          ),
          metrics: Object.fromEntries(
            [
              "first-contentful-paint",
              "largest-contentful-paint",
              "cumulative-layout-shift",
              "total-blocking-time",
              "speed-index",
            ].map((key) => [key, result.lhr.audits[key].displayValue]),
          ),
        }),
      );
    }
  } finally {
    await chrome.kill();
  }
}
