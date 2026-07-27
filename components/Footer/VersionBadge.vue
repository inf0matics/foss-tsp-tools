<template>
  <UButton
    v-if="tagLink"
    :to="tagLink"
    target="_blank"
    variant="ghost"
    color="neutral"
    size="sm"
    class="px-0"
  >
    <UBadge
      variant="soft"
      color="neutral"
      class="rounded-full tabular-nums"
    >
      {{ version }}
    </UBadge>
  </UButton>
  <UBadge
    v-else
    variant="soft"
    color="neutral"
    class="rounded-full tabular-nums"
  >
    {{ version }}
  </UBadge>
</template>

<script setup lang="ts">
const { public: { devBase } } = useRuntimeConfig()

const version = devBase.version ? `v${devBase.version}` : 'dev'
const releasedVersion = devBase.releasedVersion ? `v${devBase.releasedVersion}` : ''
const tagLink = devBase.githubLink && releasedVersion
  ? `${devBase.githubLink}/releases/tag/${releasedVersion}`
  : ''
</script>
