<template>
    <main class="min-h-screen">
        <AppHeader class="mb-10" title="Articles" :description="description" />
        <ul class="space-y-8">
            <li v-for="(article, id) in articles" :key="id">
                <AppArticleCard :article="article" />
            </li>
        </ul>
    </main>
</template>

<script setup>
const description = "I like sharing things that every developer should know. It takes time and research to put it all together, but I hope you find it helpful!"
useSeoMeta({
    title: "Articles | Dishan Sachin",
    description,
})

const { data: articles } = await useAsyncData("all-articles", () =>
    queryContent("/articles").sort({ published: -1 }).find()
)
</script>
