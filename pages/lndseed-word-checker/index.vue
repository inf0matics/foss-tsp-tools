<template>
  <div>
    <ToolHeader
      title="LND Seed Checker"
      description="Validate aezeed mnemonic words for Lightning LND wallets. Your words are checked locally and never sent anywhere."
    />

    <UAlert
      color="warning"
      variant="soft"
      icon="i-ph-warning-duotone"
      title="Only use this if you know why you need it"
      description="This tool is for people who understand aezeed seeds. If that isn't you, please don't paste a real seed here."
      class="mb-6"
    />

    <UTextarea
      v-model="text"
      class="w-full font-mono"
      placeholder="Enter seed words, separated by spaces, commas or new lines…"
      :rows="6"
      autofocus
    />

    <div class="mt-8">
      <p
        v-if="!text.trim()"
        class="text-center text-sm text-muted"
      >
        Validation results will appear here.
      </p>

      <UAlert
        v-else-if="unknownWords.length === 0"
        color="success"
        variant="soft"
        icon="i-ph-seal-check-duotone"
        :title="`All ${wordCount} words are valid`"
      />

      <UAlert
        v-else
        color="error"
        variant="soft"
        icon="i-ph-x-circle"
        :title="`${unknownWords.length} unknown word${unknownWords.length === 1 ? '' : 's'}`"
      >
        <template #description>
          <div class="mt-1 flex flex-wrap gap-1.5">
            <UBadge
              v-for="word in unknownWords"
              :key="word"
              color="error"
              variant="soft"
              class="font-mono"
            >
              {{ word }}
            </UBadge>
          </div>
        </template>
      </UAlert>
    </div>

    <p class="mt-8 text-sm text-muted">
      Word list reference:
      <a
        href="https://github.com/lightningnetwork/lnd/tree/master/aezeed"
        target="_blank"
        rel="noopener"
        class="underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
      >aezeed</a>
    </p>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'LND Seed Checker',
  description: 'Validate aezeed mnemonic words for Lightning LND wallets, entirely in your browser.',
})

const text = ref('')

const inputWords = computed(() =>
  text.value
    .split(/[\s,]+/)
    .map(w => w.trim())
    .filter(w => w !== ''),
)

const wordCount = computed(() => inputWords.value.length)

const unknownWords = computed(() =>
  inputWords.value.filter(word => !englishWordList.includes(word)),
)
</script>
