<template>
  <div class="pt-20">
    <div class="text-2xl font-black">
      Privacy Policy
    </div>

    <div class="pt-10 space-y-6 max-w-2xl">
      <p>
        These tools are designed to run entirely in your browser. We do not
        collect, store, or transmit any personal data to a server.
      </p>

      <div>
        <div class="text-lg font-bold pb-1">
          No data collection
        </div>
        <p>
          All generation and decoding (passwords, mnemonics, seeds, IDs, LNURL,
          etc.) happens locally on your device. The values you enter or generate
          are never sent to us or to any third party.
        </p>
      </div>

      <div>
        <div class="text-lg font-bold pb-1">
          No cookies, no tracking
        </div>
        <p>
          We do not use cookies, analytics, advertising, or any tracking
          technology.
        </p>
      </div>

      <div>
        <div class="text-lg font-bold pb-1">
          Local storage
        </div>
        <p>
          Some tools use your browser's local storage to remember your
          preferences, and the wallet tool can optionally store a mnemonic. This
          data stays on your device, is never transmitted, and can be cleared at
          any time through your browser.
        </p>
      </div>

      <div>
        <div class="text-lg font-bold pb-1">
          No third parties &amp; no accounts
        </div>
        <p>
          There are no user accounts and no third-party services involved in
          operating these tools.
        </p>
      </div>

      <p>
        For contact details and the responsible entity, please see our
        <a
          :href="legalNoticeUrl"
          class="underline"
        >Legal Notice</a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const legalNoticeUrl = useRuntimeConfig().public.legalNoticeUrl
</script>
