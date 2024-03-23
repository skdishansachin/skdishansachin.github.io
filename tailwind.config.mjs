const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                dark: '#111',
            },
            fontFamily: {
                sans: ['Figtree Variable', ...defaultTheme.fontFamily.sans],
                mono: ['Fira Mono', ...defaultTheme.fontFamily.mono],
            },
            typography: {
                DEFAULT: {
                    css: {
                        a: {
                            color: '#3182ce',
                            '&:hover': {
                                color: '#2c5282',
                            },
                        },
                        h1: {
                            fontFamily: 'Newsreader Variable',
                        },
                        h2: {
                            fontFamily: 'Newsreader Variable',
                        },
                        h3: {
                            fontFamily: 'Newsreader Variable',
                        },
                        h4: {
                            fontFamily: 'Newsreader Variable',
                        },
                        h5: {
                            fontFamily: 'Newsreader Variable',
                        },
                        h6: {
                            fontFamily: 'Newsreader Variable',
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
