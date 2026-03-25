// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/assets/logo.png' },
        { rel: 'apple-touch-icon', href: '/assets/logo.png' },
      ],
    },
  },
})