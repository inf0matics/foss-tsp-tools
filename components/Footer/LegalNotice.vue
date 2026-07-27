<template>
  <UButton
    :to="legalNoticeUrl"
    target="_blank"
    variant="link"
    color="footer"
    class="hover:underline"
  >
    Legal Notice
  </UButton>
  <slot />
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const legalNoticeUrl = useRuntimeConfig().public.legalNoticeUrl
</script>
