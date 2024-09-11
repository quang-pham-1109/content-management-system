import * as path from 'path'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  primevue: {
    options: { unstyled: true },
    importPT: { from: path.resolve(__dirname, './presets/aura/') },
  },
  tailwindcss: {
    config: {
      plugins: [require('tailwindcss-primeui')],
      content: ['./presets/**/*.{js,vue,ts}'],
    },
  },
  pages: true,
  runtimeConfig: {
    public: {
      publicPath:
        process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
    },
  },
  compatibilityDate: '2024-09-01',
})
