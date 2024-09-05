import { defineConfig } from "astro/config"
import vercelStatic from "@astrojs/vercel/static"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
    site: "https://dishansachin.vercel.app",
    output: "static",
    adapter: vercelStatic({
        webAnalytics: {
            enabled: true,
        },
    }),
    markdown: {
        shikiConfig: {
            theme: "github",
            wrap: false,
            themes: {
                dark: "github-dark",
                light: "github-light",
            },
        },
    },
    integrations: [tailwind(), sitemap()],
})
