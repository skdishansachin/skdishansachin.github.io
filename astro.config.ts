import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
	markdown: {
		shikiConfig: {
			wrap: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
