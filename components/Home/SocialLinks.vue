<template>
    <div>
        <h2 class="mb-4 text-xs font-semibold uppercase text-gray-400">
            FIND ME ON
        </h2>
        <div class="space-y-5">
            <NuxtLink
                v-for="link in links"
                :key="link.icon"
                :to="link.url"
                target="_blank"
                external
                class="group flex items-end gap-4 dark:hover:text-gray-300"
            >
                <span class="text-sm">
                    {{ link.name }}
                </span>
                <div
                    class="flex-1 border-b border-dashed border-gray-300 group-hover:border-gray-700 dark:border-gray-800"
                ></div>
                <Icon :name="link.icon" class="h-6 w-6"></Icon>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
const links = [
    {
        name: "Twitter",
        url: "https://twitter.com/skdishansachin",
        icon: "mdi:twitter",
    },
    {
        name: "GitHub",
        url: "https://github.com/skdishansachin",
        icon: "mdi:github",
    },
    {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/skdishansachin/",
        icon: "mdi:linkedin",
    },
]
</script>
