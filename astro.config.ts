import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";
import { remarkReadingTime } from "./integrations/reading-time.mjs";

export default defineConfig({
  site: "https://example.com",
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  vite: {
      plugins: [tailwindcss()],
	},
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
});