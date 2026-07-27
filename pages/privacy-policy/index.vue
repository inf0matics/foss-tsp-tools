<template>
  <div>
    <ToolHeader
      title="Privacy Policy"
      description="These tools are designed to run entirely in your browser. We do not collect, store, or transmit any personal data to a server."
    />

    <div class="max-w-2xl space-y-6">
      <section>
        <h2 class="mb-1 text-lg font-semibold text-highlighted">
          No data collection
        </h2>
        <p class="text-muted text-pretty">
          All generation and decoding (passwords, mnemonics, seeds, IDs, LNURL,
          etc.) happens locally on your device. The values you enter or generate
          are never sent to us or to any third party.
        </p>
      </section>

      <section>
        <h2 class="mb-1 text-lg font-semibold text-highlighted">
          No cookies, no tracking
        </h2>
        <p class="text-muted text-pretty">
          We do not use cookies, analytics, advertising, or any tracking
          technology.
        </p>
      </section>

      <section>
        <h2 class="mb-1 text-lg font-semibold text-highlighted">
          Local storage
        </h2>
        <p class="text-muted text-pretty">
          Some tools use your browser's local storage to remember your
          preferences, and the wallet tool can optionally store a mnemonic. This
          data stays on your device, is never transmitted, and can be cleared at
          any time through your browser.
        </p>
      </section>

      <section>
        <h2 class="mb-1 text-lg font-semibold text-highlighted">
          No third parties &amp; no accounts
        </h2>
        <p class="text-muted text-pretty">
          There are no user accounts and no third-party services involved in
          operating these tools.
        </p>
      </section>

      <p class="text-muted text-pretty">
        For contact details and the responsible entity, please see our
        <a
          :href="legalNoticeUrl"
          class="underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
        >Legal Notice</a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy',
  description: 'These tools run entirely in your browser. No data collection, no cookies, no tracking.',
})

const legalNoticeUrl = useRuntimeConfig().public.legalNoticeUrl
</script>
