<template>
  <UButton
    :to="legalNoticeUrl"
    variant="link"
    color="neutral"
    size="sm"
    class="text-muted hover:text-default"
  >
    Legal Notice
  </UButton>
  <slot />
</template>

<script setup lang="ts">
const legalNoticeUrl = useRuntimeConfig().public.legalNoticeUrl
</script>
