<script setup lang="ts">
import { z } from "zod"
import { ref } from "vue"
import type { Form, FormError, FormSubmitEvent } from "#ui/types"

const schema = z.object({
    email: z
        .string({
            message: "Email address is required.",
        })
        .email("Invalid email address."),
})

type Schema = z.output<typeof schema>

const state = reactive({
    email: undefined,
})

const form = ref<Form<typeof state>>()

const isLoading: Ref<boolean> = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
    isLoading.value = true
    try {
    } catch (error: any) {
        console.error(error)
    } finally {
        form.value?.clear()
        state.email = undefined
        isLoading.value = false
    }
}
</script>

<template>
    <div>
        <div class="mb-6 flex items-center gap-3">
            <div
                class="text-primary-500 bg-primary-500/10 flex-none rounded-full p-1"
            >
                <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
            </div>
            <h2 class="text-xs font-semibold uppercase text-gray-400">
                STAY IN TOUCH
            </h2>
        </div>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Get notified when I publish something new, and unsubscribe at any
            time.
        </p>
        <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit">
            <div class="mt-6 flex items-start gap-3">
                <UFormGroup name="email" size="lg" class="flex-1">
                    <UInput
                        v-model="state.email"
                        placeholder="Email Address"
                        icon="i-heroicons-envelope"
                        size="lg"
                    />
                </UFormGroup>
                <UButton
                    type="submit"
                    label="Join"
                    size="lg"
                    color="black"
                    :loading="isLoading"
                />
            </div>
        </UForm>
    </div>
</template>
