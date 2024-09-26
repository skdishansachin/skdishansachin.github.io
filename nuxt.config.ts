export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: [
        "@nuxt/ui",
        "nuxt-icon",
        "@nuxt/image",
        "@nuxt/content",
        "@vueuse/nuxt",
        '@nuxt/fonts',
    ],
    ui: {
        icons: ["heroicons", "lucide"],
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
})