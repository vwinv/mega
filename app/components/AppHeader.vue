<template>
  <div class="border-b border-neutral-200 bg-white">
    <header
      class="relative flex h-16 items-center px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo à gauche -->
      <div class="flex min-w-0 flex-1 justify-start">
        <NuxtLink
          to="/"
          class="flex shrink-0 items-center text-lg font-semibold tracking-tight text-neutral-900 no-underline hover:opacity-80"
        >
          <img src="/assets/logo.png" alt="Logo" />
        </NuxtLink>
      </div>

      <!-- Navigation centrée (desktop) -->
      <nav
        class="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:items-center md:gap-8"
        aria-label="Navigation principale"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium no-underline transition-colors"
          :class="linkClass(item.to)"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- CTA à droite -->
      <div class="flex min-w-0 flex-1 items-center justify-end gap-3">
        <div class="hidden items-center text-sm font-semibold text-neutral-500 md:inline-flex">
          <button
            type="button"
            class="transition-colors"
            :class="locale === 'fr' ? 'text-[#d84c4c]' : 'hover:text-neutral-800'"
            @click="setLocale('fr')"
          >
            FR
          </button>
          <span class="px-2 text-neutral-300">|</span>
          <button
            type="button"
            class="transition-colors"
            :class="locale === 'en' ? 'text-[#d84c4c]' : 'hover:text-neutral-800'"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>
        <NuxtLink
          to="/contact"
          class="inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition-opacity hover:opacity-90"
          style="background-color: #d84c4c"
        >
          {{ t.contactCta }}
        </NuxtLink>
      </div>
    </header>

    <!-- Navigation mobile -->
    <nav
      class="flex gap-4 overflow-x-auto border-t border-neutral-100 px-4 py-3 md:hidden"
      aria-label="Navigation principale"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="`m-${item.to}`"
        :to="item.to"
        class="shrink-0 text-sm font-medium no-underline whitespace-nowrap transition-colors"
        :class="linkClass(item.to)"
      >
        {{ item.label }}
      </NuxtLink>
      <div class="ml-auto inline-flex items-center text-sm font-semibold text-neutral-500">
        <button
          type="button"
          class="transition-colors"
          :class="locale === 'fr' ? 'text-[#d84c4c]' : 'hover:text-neutral-800'"
          @click="setLocale('fr')"
        >
          FR
        </button>
        <span class="px-2 text-neutral-300">|</span>
        <button
          type="button"
          class="transition-colors"
          :class="locale === 'en' ? 'text-[#d84c4c]' : 'hover:text-neutral-800'"
          @click="setLocale('en')"
        >
          EN
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const locale = useState<'fr' | 'en'>('locale', () => 'fr')

const i18n = {
  fr: {
    nav: [
      { label: 'Accueil', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Projet', to: '/projet' },
      { label: 'Nos solutions', to: '/nos-solutions' },
      { label: 'A propos', to: '/a-propos' },
    ],
    contactCta: 'Contactez nous',
  },
  en: {
    nav: [
      { label: 'Home', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Projects', to: '/projet' },
      { label: 'Our solutions', to: '/nos-solutions' },
      { label: 'About', to: '/a-propos' },
    ],
    contactCta: 'Contact us',
  },
} as const

const t = computed(() => i18n[locale.value])
const navItems = computed(() => t.value.nav)

function setLocale(nextLocale: 'fr' | 'en') {
  locale.value = nextLocale
  if (import.meta.client) {
    localStorage.setItem('mega-locale', nextLocale)
    document.documentElement.lang = nextLocale
  }
}

onMounted(() => {
  const saved = localStorage.getItem('mega-locale')
  if (saved === 'fr' || saved === 'en') {
    locale.value = saved
  }
  document.documentElement.lang = locale.value
})

function linkClass(path: string) {
  const active = isActive(path)
  return active
    ? 'text-[#d84c4c] font-semibold'
    : 'text-neutral-600 font-medium hover:text-neutral-900'
}

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>
