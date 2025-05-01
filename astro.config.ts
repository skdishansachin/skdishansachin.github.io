import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from "./integrations/reading-time.mjs";

export default defineConfig({
  site: "https://site-854.pages.dev",
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: passthroughImageService()
  }
});