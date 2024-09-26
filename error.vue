<script setup lang="ts">
const error = useError()
</script>

<template>
    <NuxtLoadingIndicator color="#14b8a6" />
    <AppNavbar />
    <div class="h-32"></div>
    <UContainer>
        <h1
            class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
        >
            Oops! {{ error.statusCode }}
        </h1>
        <p class="mt-6 text-base text-gray-600 dark:text-gray-400">
            {{ error.message }}. Go back to the
            <span class="underline"><NuxtLink to="/">home page</NuxtLink></span>
        </p>
    </UContainer>
</template>
