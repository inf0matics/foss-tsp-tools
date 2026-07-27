<template>
  <UButton
    v-if="githubLink"
    variant="link"
    :to="githubLink"
    target="_blank"
    class="flex items-center gap-1 hover:underline"
    color="footer"
  >
    <UIcon name="i-grommet-icons-github" /> Github
  </UButton>
  <slot v-if="githubLink" />
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const githubLink = useRuntimeConfig().public.devBase.githubLink
</script>
