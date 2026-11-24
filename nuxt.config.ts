// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],
  runtimeConfig: {
    mailHost: process.env.MAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com',
    mailPort: process.env.MAIL_PORT || process.env.SMTP_PORT || '587',
    mailSecure: process.env.MAIL_SECURE || process.env.SMTP_SECURE || 'false',
    mailUser: process.env.MAIL_USER || process.env.SMTP_USER || '',
    mailPass: process.env.MAIL_PASS || process.env.SMTP_PASSWORD || process.env.SMTP_PASS || '',
    mailFrom: process.env.MAIL_FROM || process.env.SMTP_FROM || process.env.MAIL_USER || process.env.SMTP_USER || '',
    mailTo: process.env.MAIL_TO || 'aminasow98@gmail.com',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://mega-sn.com',
      statExpertises: process.env.NUXT_PUBLIC_STAT_EXPERTISES || '03',
      statProjets: process.env.NUXT_PUBLIC_STAT_PROJETS || '07',
      statSolutions: process.env.NUXT_PUBLIC_STAT_SOLUTIONS || '03',
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
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Great+Vibes&family=Nunito:wght@700;800&family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600;700;800&display=swap',
        },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/icon-48.png', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/icon-192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
  },
})