<template>
  <div class="mb-8">
    <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight text-highlighted text-balance">
      {{ title }}
    </h1>
    <p
      v-if="description"
      class="mt-2 max-w-2xl text-muted text-pretty"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>
