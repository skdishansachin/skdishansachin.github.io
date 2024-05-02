import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';

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
            theme: 'dracula',
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
        },
    },
    integrations: [tailwind()],
});
