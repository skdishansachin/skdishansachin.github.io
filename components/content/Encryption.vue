<template>
    <div
        class="relative h-40 overflow-hidden bg-gray-100 text-sm dark:bg-gray-900"
        @mousemove="handleOnMove"
        @touchmove="handleOnMove"
        ref="card"
    >
        <div
            ref="letters"
            class="absolute left-0 top-0 h-full w-full text-center text-gray-700 [--x:0] [--y:0] dark:text-gray-300"
            style="word-wrap: break-word"
        >
            <p
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
                Hover/Touch
            </p>
        </div>
    </div>
</template>

<script setup>
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const charsLength = chars.length
const randomChar = () => chars[Math.floor(Math.random() * charsLength)]
const randomString = (length) => Array.from({ length }, randomChar).join("")

const card = ref(null)
const letters = ref(null)

const updateLetters = (x, y) => {
    requestAnimationFrame(() => {
        letters.value.style.setProperty("--x", `${x}px`)
        letters.value.style.setProperty("--y", `${y}px`)
        letters.value.innerText = randomString(600)
    })
}

const handleOnMove = (e) => {
    const rect = card.value.getBoundingClientRect()
    updateLetters(e.clientX - rect.left, e.clientY - rect.top)
}
</script>
