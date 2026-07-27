<template>
  <UApp>
    <div class="flex flex-col min-h-dvh bg-default text-default">
      <AppHeader />

      <main class="grid flex-grow w-full place-items-center">
        <UContainer class="py-16 text-center">
          <p class="font-mono text-sm text-primary tabular-nums">
            {{ error?.statusCode || 500 }}
          </p>
          <h1 class="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-highlighted text-balance">
            {{ isNotFound ? 'Page not found' : 'Something went wrong' }}
          </h1>
          <p class="mx-auto mt-3 max-w-md text-muted text-pretty">
            {{ isNotFound
              ? "The page you're looking for doesn't exist or has moved."
              : 'An unexpected error occurred. Please try again.' }}
          </p>
          <div class="mt-8 flex justify-center">
            <UButton
              icon="i-ph-house-duotone"
              size="lg"
              @click="handleError"
            >
              Back to tools
            </UButton>
          </div>
        </UContainer>
      </main>

      <FooterMain />
    </div>
  </UApp>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useSeoMeta({
  title: props.error?.statusCode === 404 ? 'Page not found' : 'Error',
})

const isNotFound = computed(() => props.error?.statusCode === 404)
const handleError = () => clearError({ redirect: '/' })
</script>
