<template>
  <UButton
    :icon="copied ? 'i-ph-check' : 'i-ph-copy'"
    :color="copied ? 'success' : 'neutral'"
    variant="subtle"
    size="sm"
    :disabled="!text"
    @click="copy"
  >
    {{ copied ? 'Copied' : 'Copy' }}
  </UButton>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>()
const toast = useToast()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const copy = async () => {
  if (!props.text) return
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 1500)
  } catch {
    toast.add({ title: 'Could not copy to clipboard', color: 'error' })
  }
}
</script>
