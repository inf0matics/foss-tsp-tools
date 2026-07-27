<template>
  <div>
    <ToolHeader
      title="LNURL Decoder"
      description="Decode a bech32 LNURL string back into its target URL. Runs entirely in your browser."
    />

    <UTextarea
      v-model="text"
      class="w-full font-mono"
      placeholder="Paste an lnurl… string here"
      :rows="6"
      autofocus
    />

    <div class="mt-8">
      <p
        v-if="!text.trim()"
        class="text-center text-sm text-muted"
      >
        The decoded URL will appear here.
      </p>

      <UAlert
        v-else-if="isError"
        color="error"
        variant="soft"
        icon="i-ph-x-circle"
        title="Could not decode"
        :description="result"
      />

      <div
        v-else
        class="rounded-lg border border-default bg-elevated/40 p-4"
      >
        <div class="mb-2 flex items-center justify-between gap-2">
          <span class="text-xs font-medium uppercase tracking-wide text-muted">Decoded URL</span>
          <CopyButton :text="result" />
        </div>
        <p class="font-mono text-sm break-all text-highlighted">
          {{ result }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { bech32 } from '@scure/base'

useSeoMeta({
  title: 'LNURL Decoder',
  description: 'Decode a bech32 LNURL string back into its target URL, entirely in your browser.',
})

const result = ref('')
const isError = ref(false)
const text = ref('')

watch(text, (newValue) => {
  updateResult(newValue)
})

const updateResult = (value: string) => {
  const trimmed = value.trim()
  if (trimmed === '') {
    result.value = ''
    isError.value = false
    return
  }

  const lower = trimmed.toLowerCase()

  try {
    const { words } = bech32.decode(lower as `${string}1${string}`, 2000)
    const data = bech32.fromWords(words)
    result.value = new TextDecoder().decode(Uint8Array.from(data))
    isError.value = false
  } catch (error) {
    result.value = `${error}`
    isError.value = true
  }
}
</script>
