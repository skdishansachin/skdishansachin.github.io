<template>
    <NuxtLink
        class="group -m-2 flex items-end gap-4 rounded-lg p-2"
        :to="project.url"
        target="_blank"
        external
    >
        <div class="max-w-sm">
            <h3 class="group-hover:text-primary-600 text-sm font-medium">
                {{ project.name }}
            </h3>
            <p class="text-sm text-gray-400">{{ project.description }}</p>
        </div>
        <div
            class="flex-1 border-b border-dashed border-gray-300 group-hover:border-gray-700 dark:border-gray-800"
        ></div>
        <UAvatar
            :src="project.thumbnail"
            :ui="{ rounded: 'rounded z-10 relative' }"
            size="md"
            :alt="project.name"
        />
    </NuxtLink>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true,
    },
})
</script>
