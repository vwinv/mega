<template>
  <div class="layout">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://mega-sn.com').replace(/\/$/, '')

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MEGA',
        url: siteUrl,
        logo: `${siteUrl}/assets/logo.png`,
        email: 'contact@mega-sn.com',
        telephone: '+221784504052',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Sacre coeur 2, pres de OBV',
          addressLocality: 'Dakar',
          addressCountry: 'SN',
        },
        sameAs: [],
      }),
    },
  ],
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
  padding: 2rem 1.5rem 0;
}
</style>
