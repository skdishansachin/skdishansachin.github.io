import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';
import rss from "@astrojs/rss";

// https://astro.build/config
export default defineConfig({
    site: 'https://dishansachin.vercel.app',
    output: 'static',
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
    markdown: {
        shikiConfig: {
            theme: 'github',
            // Enable word wrap to prevent horizontal scrolling
            wrap: false,
            themes: {
                dark: 'github-dark',
                light: 'github-light',
            },
        },
    },
    integrations: [tailwind(), rss()],
});
