<template>
  <header class="border-b border-default sticky top-0 z-10 bg-default/80 backdrop-blur">
    <UContainer class="flex items-center justify-between h-14 gap-4">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-semibold tracking-tight text-highlighted hover:text-primary transition-colors"
      >
        <UIcon
          name="i-ph-shield-check-duotone"
          class="text-primary size-6"
        />
        <span class="text-base">tsp<span class="text-muted">.tools</span></span>
      </NuxtLink>

      <nav class="flex items-center gap-1">
        <UButton
          v-if="githubLink"
          :to="githubLink"
          target="_blank"
          icon="i-ph-github-logo"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="GitHub repository"
        />
        <ColorModeToggle />
      </nav>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const githubLink = useRuntimeConfig().public.devBase.githubLink
</script>
