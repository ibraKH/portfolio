import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://www.ibra.ws",
  output: "static",
  trailingSlash: "always",
  redirects: { "/blog": "/#work" },
});
