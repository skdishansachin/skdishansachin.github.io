<template>
    <main class="min-h-screen">
        <div
            class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10"
        >
            <ContentDoc v-slot="{ doc }" tag="article">
                <article>
                    <h1 class="text-2xl font-semibold">{{ doc.title }}</h1>
                    <ContentRenderer :value="doc" />
                </article>
            </ContentDoc>
        </div>
        <div class="h-16"></div>
        <UDivider />
        <div class="h-16"></div>
        <HomeNewsletter />
    </main>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const { slug } = route.params
useSeoMeta({
    ogImage: `${config.public.appUrl}/articles/${slug}.png`,
    twitterCard: "summary_large_image",
    articleAuthor: "Dishan Sachin",
})
</script>

<style>
.prose h2 a,
.prose h3 a {
    @apply no-underline;
}
</style>
