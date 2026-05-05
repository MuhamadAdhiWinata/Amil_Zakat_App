// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],
  css: ['~/assets/css/style.css'],
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
