<template>
  <div class="space-y-8">
    <ToolHeader
      title="LNURL Web Wallet"
      description="Generate a seed and sign LNURL-auth logins. Everything happens client-side — your seed never leaves this device."
    />

    <section>
      <h2 class="mb-2 text-sm font-medium uppercase tracking-wide text-muted">
        Seed
      </h2>
      <UTextarea
        v-if="seedVisible"
        v-model="wallet"
        placeholder="seed"
        class="w-full font-mono"
        :rows="3"
      />
      <UTextarea
        v-else
        class="w-full font-mono blur-sm select-none"
        :rows="3"
        :model-value="replaceCharacters(wallet, '#')"
        readonly
      />
      <div class="mt-3 flex flex-wrap gap-2">
        <UButton
          icon="i-ph-plus-circle"
          @click="generateNewWallet"
        >
          New
        </UButton>
        <UButton
          :icon="seedVisible ? 'i-ph-eye-slash' : 'i-ph-eye'"
          color="neutral"
          variant="subtle"
          @click="toggleSeedVisibility"
        >
          {{ seedVisible ? 'Hide seed' : 'Show seed' }}
        </UButton>
        <UButton
          :icon="autoSave ? 'i-ph-floppy-disk-back' : 'i-ph-floppy-disk'"
          :color="autoSave ? 'primary' : 'neutral'"
          :variant="autoSave ? 'solid' : 'subtle'"
          @click="toggleAutoSave"
        >
          Autosave: {{ autoSave ? 'on' : 'off' }}
        </UButton>
      </div>
    </section>

    <section>
      <h2 class="mb-2 text-sm font-medium uppercase tracking-wide text-muted">
        LNURL
      </h2>
      <UTextarea
        v-model="lnurl"
        class="w-full font-mono"
        :rows="3"
        placeholder="Paste your lnurl here"
      />
      <p
        v-if="lnurl.trim()"
        class="mt-2 text-sm text-muted"
      >
        Type: <span class="font-medium text-default">{{ lnurlType || '…' }}</span>
      </p>
    </section>

    <section
      v-if="lnurlType == 'auth'"
      class="space-y-3"
    >
      <p class="text-sm text-muted">
        Derivation path: <span class="font-mono text-default">{{ derivationPath }}</span>
      </p>
      <div class="flex flex-wrap gap-2">
        <UButton
          icon="i-ph-arrow-square-out"
          color="neutral"
          variant="subtle"
          @click="authLoginViaNewTab"
        >
          Login via new tab
        </UButton>
        <UButton
          icon="i-ph-sign-in"
          @click="authLoginViaBackend"
        >
          Login via backend
        </UButton>
      </div>
    </section>

    <UAlert
      v-if="loginResult != null"
      :color="loginResult ? 'success' : 'error'"
      variant="soft"
      :icon="loginResult ? 'i-ph-check-circle' : 'i-ph-x-circle'"
      :title="loginResult ? 'Login succeeded' : 'Login failed'"
    />
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'LNURL Web Wallet',
  description: 'Generate a seed and sign LNURL-auth logins entirely client-side. Your seed never leaves your device.',
})

const toast = useToast()

const LOCALSTORAG_KEY_MNEMONIC = 'mnemonic'

const wallet = ref('')
const lnurl = ref('')
const lnurlType = ref('')
const derivationPath = ref('m/0\'')
const loginResult = ref<null | boolean>(null)
const autoSave = ref(false)
const seedVisible = ref(false)

const { $localStorage } = useNuxtApp()

const generateNewWallet = async () => {
  const data = await $fetch('/api/hd-wallet/generateRandomMnemonic')
  if (data) {
    wallet.value = data
    if (autoSave.value) {
      $localStorage.setItem(LOCALSTORAG_KEY_MNEMONIC, wallet.value)
    }
  }
}

onMounted(() => {
  nextTick(async () => {
    const mnemonic = $localStorage.getItem(LOCALSTORAG_KEY_MNEMONIC)
    if (mnemonic) {
      wallet.value = mnemonic
      autoSave.value = true
      toast.add({ title: 'Seed loaded from local storage', color: 'info' })
    } else {
      await generateNewWallet()
      toast.add({ title: 'New seed generated', color: 'info' })
    }
  })
})

const toggleAutoSave = () => {
  autoSave.value = !autoSave.value

  if (autoSave.value) {
    $localStorage.setItem(LOCALSTORAG_KEY_MNEMONIC, wallet.value)
  } else {
    $localStorage.removeItem(LOCALSTORAG_KEY_MNEMONIC)
  }
}

const toggleSeedVisibility = () => {
  seedVisible.value = !seedVisible.value
}

let nextPrepareRequest: string | null = null

watch(lnurl, async (newValue) => {
  loginResult.value = null
  lnurlType.value = ''

  if (nextPrepareRequest == null) {
    await prepareLnurl(newValue)
  } else {
    nextPrepareRequest = newValue
  }
})

watch(wallet, async (newValue) => {
  if (autoSave.value) {
    $localStorage.setItem(LOCALSTORAG_KEY_MNEMONIC, newValue)
  }
})

const prepareLnurl = async (lnurl: string) => {
  let lnurlObject
  try {
    const data = await $fetch('/api/lnurl/decode', {
      query: { lnurl },
    })
    lnurlObject = data
  } catch {
    lnurlType.value = 'Could not decode lnurl or type not implemented yet'
  }

  if (nextPrepareRequest != null) {
    const nextLnurl = nextPrepareRequest
    nextPrepareRequest = null
    await prepareLnurl(nextLnurl)
    return
  }

  if (!lnurlObject) return

  lnurlType.value = getLnurlType(lnurlObject) || ''
}

const authLoginViaBackend = async () => {
  loginResult.value = null

  try {
    const login = await $fetch('/api/lnurl-auth/login', {
      method: 'POST',
      body: {
        lnurl: lnurl.value,
        derivationPath: derivationPath.value,
        mnemonic: wallet.value,
      },
    })
    loginResult.value = login
  } catch (error) {
    console.error(error)
    loginResult.value = false
  }
}

const authLoginViaNewTab = async () => {
  loginResult.value = null

  try {
    const callbackUrl = await $fetch<string>('/api/lnurl-auth/prepareForFrontend', {
      method: 'POST',
      body: {
        lnurl: lnurl.value,
        derivationPath: derivationPath.value,
        mnemonic: wallet.value,
      },
    })
    window.open(callbackUrl, '_blank')
  } catch (error) {
    console.error(error)
    loginResult.value = false
  }
}
</script>
