// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],
  css: ['~/assets/css/style.css'],
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ],
      meta: [
        { name: 'theme-color', content: '#059669' }
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Baitulmall Bangun Rakyat Sejahtera',
      short_name: 'Baitulmall',
      description: 'Aplikasi Donasi Zakat, Infaq, dan Sedekah',
      theme_color: '#059669',
      background_color: '#f8fafc',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      scope: '/',
      icons: [
        { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}']
    }
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || '',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    sessionSecret: process.env.SESSION_SECRET || 'amil-zakat-secret',
    public: {
      appUrl: process.env.APP_URL || 'http://localhost:3000',
    }
  }
})
