import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts";

export default defineConfig({
  site: SITE_URL,
  markdown: {
    shikiConfig: {
      theme: "dracula-soft",
    },
  },
  integrations: [sitemap()],
});