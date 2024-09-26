<template>
    <div class="flex items-center justify-center px-4 py-8">
        <button
            type="button"
            class="relative rounded-md bg-white px-3 py-2 font-mono text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-950"
            @click="submit"
            @mouseenter="startScrambling"
        >
            {{ displayText }}
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    label: String,
})

const displayText = ref(props.label)
const charset = "abcdefghijklmnopqrstuvwxyz"

function randomChars(length) {
    return Array.from(
        { length },
        () => charset[Math.floor(Math.random() * charset.length)]
    ).join("")
}

async function scramble(input) {
    let prefix = ""
    for (let index = 0; index < input.length; index++) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        prefix += input.charAt(index)
        displayText.value = prefix + randomChars(input.length - prefix.length)
    }
}

function startScrambling() {
    scramble(props.label)
}

const submit = () => {
    startScrambling()
    setTimeout(() => console.log("Submitted"), props.label.length * 50)
}

watch(
    () => props.label,
    (newValue) => {
        displayText.value = newValue
    }
)
</script>
