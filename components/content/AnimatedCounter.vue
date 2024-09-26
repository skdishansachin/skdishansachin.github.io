<template>
    <div class="flex flex-col items-center justify-center px-4 py-8">
        <span
            ref="target"
            class="animate-counter mb-2 flex text-5xl font-extrabold tabular-nums text-slate-900 [counter-set:_num_var(--num)] before:content-[counter(num)] dark:text-white"
        >
            <span class="sr-only">{{ targetNumber }}</span
            >+
        </span>
        <UButton color="white" @click="startCounter" class="mt-4" size="xs">
            Start Counter
        </UButton>
        <p class="mt-2 text-xs text-gray-500">
            or start the counter when this component is in the viewport
        </p>
    </div>
</template>

<script setup>
const target = ref(null)
const targetIsVisible = useElementVisibility(target)

const props = defineProps({
    targetNumber: {
        type: Number,
        required: true,
        default: 1234,
    },
})

const startCounter = () => {
    const counter = document.querySelector(".animate-counter")
    counter.animate([{ "--num": 0 }, { "--num": props.targetNumber }], {
        duration: 1000,
        easing: "ease-out",
        fill: "forwards",
    })
}

watchOnce(targetIsVisible, () => {
    startCounter()
})
</script>

<style scoped>
@property --num {
    syntax: "<integer>";
    initial-value: 0;
    inherits: false;
}

@keyframes counter {
    from {
        --num: 0;
    }
    to {
        --num: v-bind(props.targetNumber);
    }
}
</style>
