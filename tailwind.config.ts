import defaultTheme from "tailwindcss/defaultTheme"
import type { Config } from "tailwindcss"

export default {
    darkMode: "selector",
    content: ["./src/**/*.{astro,html,js,md,mdx,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Geist Sans", ...defaultTheme.fontFamily.sans],
                mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
} satisfies Config
