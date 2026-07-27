<template>
  <UButton
    v-if="tagLink"
    :to="tagLink"
    target="_blank"
    variant="link"
  >
    <UBadge
      variant="outline"
      color="footer"
      class="px-2 rounded-full bg-transparent hover:text-[var(--ui-footer-hover)]"
    >
      {{ version }}
    </UBadge>
  </UButton>
  <UBadge
    v-else
    class="px-2"
  >
    {{ version }}
  </UBadge>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const { public: { devBase } } = useRuntimeConfig()

const version = devBase.version ? `v${devBase.version}` : 'undefined'
const releasedVersion = devBase.releasedVersion ? `v${devBase.releasedVersion}` : 'undefined'
const tagLink = devBase.githubLink ? `${devBase.githubLink}/releases/tag/${releasedVersion}` : ''
</script>
