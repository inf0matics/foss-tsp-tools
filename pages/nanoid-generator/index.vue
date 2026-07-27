<template>
  <div>
    <ToolHeader
      title="NanoID Generator"
      description="A tiny, secure, URL-friendly unique ID generator. Create IDs at any length, entirely in your browser."
    />

    <div class="mb-8 rounded-lg border border-default bg-elevated/40 p-4">
      <h2 class="mb-2 text-sm font-medium text-highlighted">
        How it compares to UUID
      </h2>
      <ul class="space-y-1 text-sm text-muted">
        <li>Entropy: NanoID has 126 random bits, UUID has 122.</li>
        <li>Collision odds: comparable — roughly one in 103 trillion at scale.</li>
        <li>Length: 21 characters instead of UUID's 36.</li>
        <li>Footprint: 130 bytes instead of UUID's 423 bytes.</li>
      </ul>
    </div>

    <UFormField label="Length">
      <UInputNumber
        v-model="nanoidLength"
        :min="1"
        class="w-full sm:w-48"
      />
    </UFormField>

    <UButton
      class="mt-6"
      icon="i-ph-arrows-clockwise"
      @click="generatePassword"
    >
      Generate
    </UButton>

    <UFormField
      class="mt-6"
      label="NanoID"
    >
      <div class="flex flex-col gap-2 sm:flex-row sm:items-start">
        <UInput
          v-model="nanoIds"
          class="w-full font-mono"
          readonly
          placeholder="Click Generate to create an ID"
        />
        <CopyButton :text="nanoIds" />
      </div>
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'

useSeoMeta({
  title: 'NanoID Generator',
  description: 'Create compact, URL-safe unique NanoIDs at any length, entirely in your browser.',
})

const LOCALSTORAGE_PREFIX = 'nanoid-config'
const { $localStorage } = useNuxtApp()
const localStorage = $localStorage.create(LOCALSTORAGE_PREFIX)
const nanoidLength = ref(21)

const nanoIds = ref('')

onMounted(async () => {
  nanoidLength.value = Number(localStorage.getItem('nanoidLength') || 21)
})

watch(nanoidLength, newValue => localStorage.setItem('nanoidLength', newValue.toString()))

const generatePassword = () => {
  nanoIds.value = nanoid(nanoidLength.value)
}
</script>
