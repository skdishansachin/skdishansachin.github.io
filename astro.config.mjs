import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';

import markdown from './integrations/markdown';

// https://astro.build/config
export default defineConfig({
    site: 'https://dishansachin.vercel.app',
    output: 'static',
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    }),
    integrations: [tailwind(), markdown()],
});
