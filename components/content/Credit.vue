<template>
    <div class="bg-gray-100 p-4 text-center text-sm dark:bg-gray-900">
        This component was inspired by
        <NuxtLink
            :to="link"
            external
            target="_blank"
            class="font-medium underline"
        >
            {{ label }}</NuxtLink
        >.
    </div>
</template>

<script setup>
defineProps({
    label: String,
    link: String,
})
</script>
