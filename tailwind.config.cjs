const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: ['./src/**/*.{astro,html,js,md,mdx,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Geist Sans', ...defaultTheme.fontFamily.sans],
                mono: ['Geist Mono', ...defaultTheme.fontFamily.mono]
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
