<template>
    <main class="min-h-screen">
        <AppHeader
            class="mb-12"
            title="What I use"
            :description="description"
        />
        <div class="space-y-24">
            <ul class="space-y-8">
                <AppUsesHeader title="Software" />
                <AppUsesItem
                    v-for="(item, id) in software"
                    :key="id"
                    :item="item"
                />
            </ul>
        </div>
    </main>
</template>

<script setup>
const description =
    "Software I use, gadgets I love, and other things I recommend. Here’s a list of all of my favorite stuff."
useSeoMeta({
    title: "Things I use | Dishan Sachin",
    description,
})
const { data: items } = await useAsyncData("uses", () =>
    queryContent("/uses").find()
)
const software = items.value.filter((item) => item.category === "software")
</script>
