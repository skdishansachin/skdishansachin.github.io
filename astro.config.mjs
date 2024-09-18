import { defineConfig } from "astro/config"
import vercelStatic from "@astrojs/vercel/static"
import tailwind from "@astrojs/tailwind"

export default defineConfig({
    site: "https://dishansachin.vercel.app",
    output: "static",
    adapter: vercelStatic({
        webAnalytics: {
            enabled: true,
        },
    }),
    integrations: [tailwind()],
})
