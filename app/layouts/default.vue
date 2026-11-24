<template>
  <div class="layout" :class="{ 'layout--home': isHome, 'layout--dark': isDarkHome }">
    <AppHeader />
    <main class="main" :class="isHome && 'main--home'">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const theme = useState<'light' | 'dark'>('mega-theme', () => 'light')
const isHome = computed(() => route.path === '/' || route.path === '/projet' || route.path === '/a-propos' || route.path === '/contact' || route.path === '/carriere' || route.path.startsWith('/carriere/') || route.path === '/services' || route.path.startsWith('/services/'))
const isDarkHome = computed(() => theme.value === 'dark' && (route.path === '/' || route.path === '/projet' || route.path === '/a-propos' || route.path === '/carriere' || route.path.startsWith('/carriere/') || route.path === '/services' || route.path.startsWith('/services/')))

let revealObserver: IntersectionObserver | null = null
let revealMutations: MutationObserver | null = null
let revealFrame = 0

function bindReveals(root: ParentNode) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  root.querySelectorAll<HTMLElement>('.reveal:not([data-reveal]), .reveal-in:not([data-reveal])').forEach((node) => {
    node.dataset.reveal = '1'
    if (reduce || !revealObserver) {
      node.classList.add('is-in')
      return
    }
    revealObserver.observe(node)
  })
}

function scheduleReveals() {
  if (revealFrame) return
  revealFrame = requestAnimationFrame(() => {
    revealFrame = 0
    bindReveals(document)
  })
}

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          revealObserver?.unobserve(entry.target)
        }
      },
      { threshold: 0 },
    )
  }
  scheduleReveals()
  revealMutations = new MutationObserver(() => scheduleReveals())
  revealMutations.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  revealObserver?.disconnect()
  revealMutations?.disconnect()
  if (revealFrame) cancelAnimationFrame(revealFrame)
})
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
        logo: `${siteUrl}/assets/logo-square.png`,
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

.layout--home {
  background: #f3f1ef;
}

.layout--dark {
  background: #070707;
}

.main {
  flex: 1;
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
  padding: 2rem 1.75rem 0;
}

@media (min-width: 640px) {
  .main {
    padding-inline: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .main {
    padding-inline: 3.5rem;
  }
}

.main--home {
  max-width: none;
  margin: 0;
  padding: 0;
}
</style>
