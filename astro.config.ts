import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://site-854.pages.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: passthroughImageService()
  }
});