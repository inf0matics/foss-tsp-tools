<template>
  <div>
    <ToolHeader
      title="QR Code Generator"
      description="Turn any text or URL into a scannable SVG QR code. Generated locally in your browser."
    />

    <UTextarea
      v-model="text"
      class="w-full"
      placeholder="Enter text or a URL to encode…"
      :rows="6"
      autofocus
    />

    <div class="mt-8 flex justify-center">
      <div
        v-if="text.trim()"
        class="rounded-xl bg-white p-4 ring-1 ring-default shadow-sm"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="qrCode" />
      </div>
      <p
        v-else
        class="py-10 text-sm text-muted"
      >
        Your QR code will appear here.
      </p>
    </div>

    <div
      v-if="qrCode"
      class="mt-6 flex flex-wrap justify-center gap-2"
    >
      <UButton
        icon="i-ph-download-simple"
        color="neutral"
        variant="subtle"
        @click="downloadPng"
      >
        Download PNG
      </UButton>
      <UButton
        icon="i-ph-download-simple"
        color="neutral"
        variant="subtle"
        @click="downloadSvg"
      >
        Download SVG
      </UButton>
      <UButton
        :icon="copied ? 'i-ph-check' : 'i-ph-copy'"
        :color="copied ? 'success' : 'neutral'"
        variant="subtle"
        @click="copyImage"
      >
        {{ copied ? 'Copied' : 'Copy image' }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode-svg'

useSeoMeta({
  title: 'QR Code Generator',
  description: 'Turn any text or URL into a scannable SVG QR code, generated entirely in your browser.',
})

const toast = useToast()

const SIZE = 220
const EXPORT_SCALE = 4

const qrCode = ref('')
const text = ref('')
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

watch(text, (newValue) => {
  updateQrCode(newValue)
})

const updateQrCode = (value: string) => {
  if (value.trim() === '') {
    qrCode.value = ''
    return
  }
  qrCode.value = new QRCode({
    content: value,
    padding: 2,
    width: SIZE,
    height: SIZE,
    color: '#1c1917',
    background: '#FFFFFF',
  }).svg()
}

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

// Rasterise the QR SVG to a high-resolution PNG blob via a canvas.
const svgToPngBlob = (svg: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const size = SIZE * EXPORT_SCALE
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(svgUrl)
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas is not supported'))
        return
      }
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, size, size)
      ctx.drawImage(img, 0, 0, size, size)
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Could not encode PNG'))
      }, 'image/png')
    }
    img.onerror = () => {
      URL.revokeObjectURL(svgUrl)
      reject(new Error('Could not render the QR code'))
    }
    img.src = svgUrl
  })
}

const downloadSvg = () => {
  if (!qrCode.value) return
  downloadBlob(new Blob([qrCode.value], { type: 'image/svg+xml' }), 'qr-code.svg')
}

const downloadPng = async () => {
  if (!qrCode.value) return
  try {
    downloadBlob(await svgToPngBlob(qrCode.value), 'qr-code.png')
  } catch {
    toast.add({ title: 'Could not create the PNG', color: 'error' })
  }
}

const copyImage = async () => {
  if (!qrCode.value) return
  try {
    const blob = await svgToPngBlob(qrCode.value)
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 1500)
  } catch {
    toast.add({ title: 'Could not copy the image to the clipboard', color: 'error' })
  }
}
</script>
