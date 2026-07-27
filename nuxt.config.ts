// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
  ],
  devtools: {
    enabled: true,
  },
  css: [
    '~/assets/css/main.css',
  ],
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'footer'],
    },
  },
  runtimeConfig: {
    public: {
      // Override with NUXT_PUBLIC_LEGAL_NOTICE_URL
      legalNoticeUrl: 'https://tsp.tools/imprint',
      devBase: {
        releasedVersion: pkg.version || '',
        version: pkg.meta?.['special-version'] || pkg.version || '',
        githubLink: pkg.homepage || '',
      },
    },
  },
  experimental: {
    appManifest: false,
  },
  compatibilityDate: '2024-04-03',
  typescript: {
    typeCheck: true,
  },
})
