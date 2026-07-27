<template>
  <div>
    <ToolHeader
      title="Password Generator"
      description="Build strong passwords with fine-grained control over character sets. Generated locally, never sent anywhere."
    />

    <div class="grid gap-6 sm:grid-cols-2">
      <div class="flex flex-col gap-3">
        <UFormField label="Length">
          <UInputNumber
            v-model="passwordLength"
            :min="1"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Include symbols">
          <UInput
            v-model="symbols"
            class="w-full font-mono"
          />
        </UFormField>
      </div>
      <div class="flex flex-col justify-center gap-2">
        <UCheckbox
          v-model="allowLowercase"
          label="Allow lowercase (abc)"
        />
        <UCheckbox
          v-model="allowUppercase"
          label="Allow uppercase (ABC)"
        />
        <UCheckbox
          v-model="allowNumbers"
          label="Allow numbers (0-9)"
        />
        <UCheckbox
          v-model="excludeSimilar"
          label="Exclude similar (iI1loO0)"
        />
        <UCheckbox
          v-model="excludeDuplicate"
          label="Exclude duplicate characters"
        />
      </div>
    </div>

    <UButton
      class="mt-6"
      icon="i-ph-arrows-clockwise"
      @click="generatePassword"
    >
      Generate
    </UButton>

    <UFormField
      class="mt-6"
      :label="generatedPassword ? `Password · ${generatedPassword.length} chars` : 'Password'"
    >
      <div class="flex flex-col gap-2 sm:flex-row sm:items-start">
        <UTextarea
          v-model="generatedPassword"
          class="w-full font-mono"
          :rows="2"
          readonly
          placeholder="Click Generate to create a password"
        />
        <CopyButton :text="generatedPassword" />
      </div>
    </UFormField>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Password Generator',
  description: 'Build strong passwords with fine-grained character rules, generated entirely in your browser.',
})

const LOCALSTORAGE_PREFIX = 'password-generator-config'
const KEY_LENGTH = 'length'
const { $localStorage } = useNuxtApp()
const localStorage = $localStorage.create(LOCALSTORAGE_PREFIX)

const passwordLength = ref(12)
const allowLowercase = ref(true)
const allowUppercase = ref(true)
const allowNumbers = ref(true)
const excludeSimilar = ref(true)
const excludeDuplicate = ref(true)
const symbols = ref('!@#$%^&*()_+')
const generatedPassword = ref('')

onMounted(async () => {
  passwordLength.value = Number.parseInt(localStorage.getItem(KEY_LENGTH) || '12')
  allowLowercase.value = localStorage.exists('allowLowerCase') ? localStorage.getItem('allowLowercase') === 'true' : true
  allowUppercase.value = localStorage.exists('allowUppercase') ? localStorage.getItem('allowUppercase') === 'true' : true
  allowNumbers.value = localStorage.exists('allowNumbers') ? localStorage.getItem('allowNumbers') === 'true' : true
  excludeSimilar.value = localStorage.exists('excludeSimilar') ? localStorage.getItem('excludeSimilar') === 'true' : true
  excludeDuplicate.value = localStorage.exists('excludeDuplicate') ? localStorage.getItem('excludeDuplicate') === 'true' : true
  symbols.value = localStorage.getItem('symbols') || '!@#$%^&*()_+'
})

watch(passwordLength, newValue => localStorage.setItem(KEY_LENGTH, newValue.toString()))
watch(allowLowercase, newValue => localStorage.setItem('allowLowercase', newValue.toString()))
watch(allowUppercase, newValue => localStorage.setItem('allowUppercase', newValue.toString()))
watch(allowNumbers, newValue => localStorage.setItem('allowNumbers', newValue.toString()))
watch(excludeSimilar, newValue => localStorage.setItem('excludeSimilar', newValue.toString()))
watch(excludeDuplicate, newValue => localStorage.setItem('excludeDuplicate', newValue.toString()))
watch(symbols, newValue => localStorage.setItem('symbols', newValue))

const generatePassword = () => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'
  const similarChars = 'iI1loO0'
  let characterPool = ''

  if (allowLowercase.value) characterPool += lowercaseChars
  if (allowUppercase.value) characterPool += uppercaseChars
  if (allowNumbers.value) characterPool += numberChars
  characterPool += symbols.value

  if (excludeSimilar.value) {
    characterPool = characterPool.split('').filter(char => !similarChars.includes(char)).join('')
  }

  if (!characterPool) {
    generatedPassword.value = 'Error: No characters available for password generation.'
    return
  }

  let password = ''
  for (let i = 0; i < passwordLength.value * 2; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length)
    password += characterPool[randomIndex]
  }

  if (excludeDuplicate.value) {
    password = [...new Set(password)].join('')
  }

  password = password.slice(0, passwordLength.value)

  generatedPassword.value = password
}
</script>
