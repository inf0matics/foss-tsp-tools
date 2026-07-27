<template>
  <UApp>
    <NuxtLayout />
  </UApp>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  titleTemplate: title => (title ? `${title} · tsp.tools` : 'tsp.tools — free & open source tools'),
})

useSeoMeta({
  ogType: 'website',
  ogSiteName: 'tsp.tools',
  description: 'Free and open source, privacy-first browser tools: password and NanoID generators, QR codes, an LNURL wallet and decoder, and an LND seed checker. Everything runs locally in your browser.',
})
</script>
