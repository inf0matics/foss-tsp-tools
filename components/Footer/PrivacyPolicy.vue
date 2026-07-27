<template>
  <UModal title="Privacy Policy">
    <UButton
      variant="link"
      color="footer"
      class="hover:underline"
    >
      Privacy Policy
    </UButton>
    <template #body>
      <div class="space-y-4 text-sm leading-relaxed">
        <p>
          These tools are designed to run entirely in your browser. We do not
          collect, store, or transmit any personal data to a server.
        </p>

        <div>
          <h3 class="font-semibold mb-1">
            No data collection
          </h3>
          <p>
            All generation and decoding (passwords, mnemonics, seeds, IDs, LNURL,
            etc.) happens locally on your device. The values you enter or generate
            are never sent to us or to any third party.
          </p>
        </div>

        <div>
          <h3 class="font-semibold mb-1">
            No cookies, no tracking
          </h3>
          <p>
            We do not use cookies, analytics, advertising, or any tracking
            technology.
          </p>
        </div>

        <div>
          <h3 class="font-semibold mb-1">
            Local storage
          </h3>
          <p>
            Some tools use your browser's local storage to remember your
            preferences, and the wallet tool can optionally store a mnemonic. This
            data stays on your device, is never transmitted, and can be cleared at
            any time through your browser.
          </p>
        </div>

        <div>
          <h3 class="font-semibold mb-1">
            No third parties &amp; no accounts
          </h3>
          <p>
            There are no user accounts and no third-party services involved in
            operating these tools.
          </p>
        </div>

        <p>
          For contact details and the responsible entity, please see our
          <a
            :href="legalNoticeUrl"
            target="_blank"
            class="underline"
          >Legal Notice</a>.
        </p>
      </div>
    </template>
  </UModal>
  <slot />
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const legalNoticeUrl = useRuntimeConfig().public.legalNoticeUrl
</script>
