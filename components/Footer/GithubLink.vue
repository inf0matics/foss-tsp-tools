<template>
  <UButton
    v-if="githubLink"
    :to="githubLink"
    target="_blank"
    variant="link"
    color="neutral"
    size="sm"
    icon="i-ph-github-logo"
    class="text-muted hover:text-default"
  >
    GitHub
  </UButton>
  <slot v-if="githubLink" />
</template>

<script setup lang="ts">
const githubLink = useRuntimeConfig().public.devBase.githubLink
</script>
