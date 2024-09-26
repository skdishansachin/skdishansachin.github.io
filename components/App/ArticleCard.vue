<template>
    <NuxtLink :to="article._path" class="group">
        <article>
            <h2
                class="font-display group-hover:text-primary-600 text-base font-semibold tracking-tight text-gray-800 dark:text-gray-100"
            >
                {{ article.title }}
            </h2>
            <p
                class="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400"
            >
                {{ article.description }}
            </p>
        </article>
    </NuxtLink>
</template>

<script setup>
defineProps({
    article: {
        type: Object,
        required: true,
    },
})
</script>
