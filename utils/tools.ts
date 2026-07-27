export interface Tool {
  name: string
  to: string
  icon: string
  description: string
}

export const tools: Tool[] = [
  {
    name: 'LNURL Web Wallet',
    to: '/wallet',
    icon: 'i-ph-wallet-duotone',
    description: 'Generate a seed and sign LNURL-auth logins — entirely client-side.',
  },
  {
    name: 'QR Code Generator',
    to: '/qr-code-generator',
    icon: 'i-ph-qr-code-duotone',
    description: 'Turn any text or URL into a scannable SVG QR code.',
  },
  {
    name: 'Password Generator',
    to: '/password-generator',
    icon: 'i-ph-key-duotone',
    description: 'Build strong passwords with fine-grained character rules.',
  },
  {
    name: 'NanoID Generator',
    to: '/nanoid-generator',
    icon: 'i-ph-fingerprint-duotone',
    description: 'Create compact, URL-safe unique IDs at any length.',
  },
  {
    name: 'LND Seed Checker',
    to: '/lndseed-word-checker',
    icon: 'i-ph-seal-check-duotone',
    description: 'Validate aezeed mnemonic words for Lightning LND wallets.',
  },
  {
    name: 'LNURL Decoder',
    to: '/lnurl-decoder',
    icon: 'i-ph-lightning-duotone',
    description: 'Decode a bech32 LNURL string back into its target URL.',
  },
]
