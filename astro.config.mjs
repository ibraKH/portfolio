import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://ibra.ws",
  output: "static",
  trailingSlash: "always",
  // Keep Astro's dev-only toolbar out of the page so local audits match production.
  devToolbar: { enabled: false },
  redirects: { "/blog": "/#work" },
});
