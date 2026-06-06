// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://mega-sn.com',
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://mega-sn.com',
    name: 'MEGA',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      titleTemplate: '%s',
      meta: [
        { name: 'author', content: 'MEGA' },
        { name: 'theme-color', content: '#d84c4c' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/assets/logo.png' },
        { rel: 'apple-touch-icon', href: '/assets/logo.png' },
      ],
    },
  },
})