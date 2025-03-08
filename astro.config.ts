// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  markdown: {
    shikiConfig: {
      wrap: true,
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
});