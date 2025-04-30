import { defineConfig } from "astro/config";
import markdown from "./integrations/markdown";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
	integrations: [tailwind(), markdown()],
});
