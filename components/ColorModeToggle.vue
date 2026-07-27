<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-ph-moon-stars' : 'i-ph-sun-dim'"
      color="neutral"
      variant="ghost"
      size="sm"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggle"
    />
    <template #fallback>
      <UButton
        icon="i-ph-circle-half"
        color="neutral"
        variant="ghost"
        size="sm"
        disabled
        aria-label="Toggle color mode"
      />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggle = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
