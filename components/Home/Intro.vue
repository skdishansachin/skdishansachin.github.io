<template>
    <div class="space-y-6">
        <NuxtImg
            src="/avatar.png"
            alt="Dishan Sachin"
            class="h-12 w-12 rounded-full border border-gray-300 bg-gray-200 ring-2 ring-gray-200 transition-all duration-300 hover:ring-4 sm:h-16 sm:w-16 dark:border-gray-800 dark:bg-gray-900 dark:ring-white/10"
            sizes="48px sm:64px"
            placeholder
            format="webp"
        />
        <h1
            class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100"
        >
            Dishan Sachin
        </h1>
        <p class="text-gray-900 dark:text-gray-400">
            I'm Fayaz, I work as a software, product engineer and designer from
            Bengaluru, India. I specialize in building web applications and
            sites using Javascript, React, Vue &amp; Node. I've procrastinated
            building this website for years but finally it's here, I've carved
            out my own little nook on the internet to share my silly
            experiments, nifty projects, and thoughts (mostly about tech and
            design).
        </p>
        <p class="text-gray-900 dark:text-gray-400">
            By day, I'm a Fullstack Developer at
            <a href="https://headshotpro.com" target="_blank" class="underline"
                >Headshotpro</a
            >, and by night (and weekends), I'm busy tinkering with some random
            tool or app that I am building.
        </p>
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Dishan Sachin",
    description:
        "I'm Fayaz, your friendly neighborhood software, product engineer and designer from Bengaluru, India. I specialize in building web applications and sites using Javascript, React, Vue & Node.",
})
</script>
