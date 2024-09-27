<script setup lang="ts">
import { z } from "zod"
import { ref } from "vue"
import type { Form, FormError, FormSubmitEvent } from "#ui/types"

type Schema = z.output<typeof schema>

const schema = z.object({
    email: z.string().email("Please provide a valid email address."),
})

const state = reactive({
    email: "",
})

type FormData = z.infer<typeof schema>

const form = ref<Form<FormData>>()

const isLoading: Ref<boolean> = ref(false)

async function formSubmition(event: FormSubmitEvent<Schema>) {
    event.preventDefault()
    form.value?.clear()

    isLoading.value = true

    const response = await $fetch("/api/v1/newsletter/subscribe", {
        method: "POST",
        body: {
            email: event.data.email,
        },
    })

    console.log(response)
    
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
        <UForm
            ref="form"
            :state="state"
            :schema="schema"
            @submit="formSubmition"
        >
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
