export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/ui",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/content",
        "@vueuse/nuxt",
        "@nuxt/fonts",
        "@nuxtjs/tailwindcss",
        "nuxt-security",
    ],
    runtimeConfig: {
        public: {
            appUrl: process.env.NUXT_PUBLIC_APP_URL,
        },
    },
    app: {
        pageTransition: { name: "page", mode: "out-in" },
        head: {
            htmlAttrs: {
                lang: "en",
                class: "h-full",
            },
            bodyAttrs: {
                class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
            },
        },
    },
    content: {
        highlight: {
            theme: "github-dark",
        },
    },
    tailwindcss: {
        configPath: "tailwind.config",
        viewer: false,
    },
    compatibilityDate: "2024-09-26",
})
