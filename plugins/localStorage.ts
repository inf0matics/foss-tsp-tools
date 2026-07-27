import { defineNuxtPlugin } from '#imports'

const exists = (key: string) => localStorage.getItem(key) != null
const getItem = (key: string) => localStorage.getItem(key)
const setItem = (key: string, value: string) => localStorage.setItem(key, value)
const removeItem = (key: string) => localStorage.removeItem(key)

const create = (prefix?: string) => {
  const usedPrefix = prefix ? `${prefix}-` : ''
  return {
    exists: (key: string) => exists(`${usedPrefix}${key}`),
    getItem: (key: string) => getItem(`${usedPrefix}${key}`),
    setItem: (key: string, value: string) => setItem(`${usedPrefix}${key}`, value),
    removeItem: (key: string) => removeItem(`${usedPrefix}${key}`),
  }
}

const localStoragePlugin = {
  ...create(),
  create,
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      localStorage: localStoragePlugin,
    },
  }
})
