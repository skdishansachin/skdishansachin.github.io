import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

export default defineConfig({
	markdown: {
		shikiConfig: {
			wrap: true,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	output: "server",
	adapter: vercel(),
});
