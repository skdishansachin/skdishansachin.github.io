<template>
    <div ref="headerRef" :style="styles" class="fixed top-0 z-50 w-full">
        <nav class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <ul
                class="my-4 flex items-center rounded-full bg-white/90 px-3 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/20"
            >
                <li v-for="item in items" :key="item.path">
                    <UTooltip
                        :text="item.name"
                        :ui="{ popper: { strategy: 'absolute' } }"
                    >
                        <ULink
                            :to="item.path"
                            class="hover:text-primary-500 dark:hover:text-primary-400 relative flex items-center justify-center px-3 py-4 transition"
                            active-class="text-primary-600 dark:text-primary-400"
                        >
                            <Icon
                                aria-hidden="true"
                                :name="item.icon"
                                class="z-10 size-5"
                            />
                            <span
                                v-if="$route.path === item.path"
                                class="from-primary-500/0 via-primary-500/70 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0 absolute inset-x-1 -bottom-px h-px bg-gradient-to-r"
                            ></span>
                            <span
                                v-if="$route.path === item.path"
                                class="absolute left-1/2 top-1/2 z-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 dark:bg-white/10"
                            ></span>
                            <span class="sr-only">{{ item.name }}</span>
                        </ULink>
                    </UTooltip>
                </li>
                <li class="flex-1"></li>
                <li>
                    <AppThemeToggle />
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { useFixedHeader } from "vue-use-fixed-header"
const headerRef = ref(null)
const { styles } = useFixedHeader(headerRef)

const items = [
    {
        name: "Home",
        path: "/",
        icon: "lucide:house",
    },
    {
        name: "Articles",
        path: "/articles",
        icon: "lucide:library",
    },
    {
        name: "Thoughts",
        path: "/thoughts",
        icon: "lucide:cloud",
    },
]
</script>
