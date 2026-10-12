<template>
  <div ref="barRef" class="fixed inset-x-0 top-0 z-50 bg-transparent px-3 pt-4 sm:px-5 lg:px-8" @mouseleave="servicesOpen = false">
    <header class="mx-auto flex max-w-6xl items-center gap-2 rounded-full bg-[#161616] py-2 pl-4 pr-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:gap-3 sm:pl-5">
      <NuxtLink to="/" class="mr-1 flex shrink-0 items-center no-underline" aria-label="MEGA">
        <img src="/assets/logo.png" alt="MEGA" class="header-logo h-5 w-auto min-[380px]:h-6 sm:h-7" />
      </NuxtLink>

      <nav class="mx-auto hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
        <NuxtLink
          to="/"
          class="rounded-full px-4 py-2 text-sm font-semibold no-underline transition-colors"
          :class="isActive('/') ? 'bg-[#e44545] text-white' : 'text-white/90 hover:text-white'"
        >
          {{ t.home }}
        </NuxtLink>

        <div ref="menuRef" class="relative" @mouseenter="servicesOpen = true">
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors"
            :class="servicesActive ? 'bg-[#e44545] text-white' : 'text-white/90 hover:text-white'"
            :aria-expanded="servicesOpen"
            @click="servicesOpen = !servicesOpen"
          >
            {{ t.servicesMenu }}
            <svg class="h-3.5 w-3.5 transition-transform" :class="servicesOpen && 'rotate-180'" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <NuxtLink
          to="/projet"
          class="rounded-full px-3 py-2 text-sm font-medium no-underline"
          :class="isActive('/projet') ? 'bg-[#e44545] text-white' : 'text-white/90 hover:text-white'"
        >
          {{ t.projects }}
        </NuxtLink>
        <NuxtLink
          to="/a-propos"
          class="rounded-full px-3 py-2 text-sm font-medium no-underline"
          :class="isActive('/a-propos') ? 'bg-[#e44545] text-white' : 'text-white/90 hover:text-white'"
        >
          {{ t.about }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
          :aria-label="t.theme"
          :aria-pressed="theme === 'dark'"
          @click="toggleTheme"
        >
          <svg v-if="theme === 'light'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path stroke-linecap="round" d="M21 14.5A8.5 8.5 0 1110.5 3 7 7 0 0021 14.5z" />
          </svg>
          <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path stroke-linecap="round" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>

        <div class="hidden items-center text-sm font-semibold sm:flex">
          <button type="button" class="px-1" :class="locale === 'fr' ? 'text-white' : 'text-white/45'" @click="setLocale('fr')">FR</button>
          <span class="text-white/35">·</span>
          <button type="button" class="px-1 lowercase" :class="locale === 'en' ? 'text-white' : 'text-white/45'" @click="setLocale('en')">en</button>
        </div>

        <NuxtLink
          to="/contact"
          class="inline-flex items-center whitespace-nowrap rounded-full bg-[#e44545] px-2.5 py-2 text-xs font-semibold text-white no-underline hover:brightness-110 min-[380px]:px-3 sm:px-4 sm:text-sm"
        >
          <span class="min-[380px]:hidden">{{ t.contactShort }}</span>
          <span class="hidden min-[380px]:inline">{{ t.contact }}</span>
        </NuxtLink>

        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full text-white lg:hidden"
          :aria-label="t.menu"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path v-if="!mobileOpen" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </header>

    <div v-if="servicesOpen" class="mega mx-auto hidden max-w-6xl pt-3 lg:block">
      <div class="grid gap-3 rounded-[1.6rem] bg-[#141414] p-3 text-white shadow-[0_24px_60px_rgba(0,0,0,0.28)] lg:grid-cols-[1.2fr_0.95fr_0.82fr]">
        <div class="p-2">
          <p class="px-2 text-[11px] font-medium text-white/45">{{ t.expertisesLabel }}</p>
          <ul class="mt-3 space-y-2">
            <li v-for="(item, i) in t.expertises" :key="item">
              <NuxtLink
                to="/services"
                class="flex items-center justify-between rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white no-underline transition-colors hover:border-white/40 hover:bg-white/5"
                @click="servicesOpen = false"
              >
                <span><span class="mr-3 text-white/40">0{{ i + 1 }}</span>{{ item }}</span>
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="px-3 py-2">
          <p class="text-[11px] font-medium text-white/45">{{ t.solutionsLabel }}</p>
          <ul class="mt-4 space-y-4">
            <li v-for="item in t.solutionItems" :key="item.title">
              <NuxtLink to="/services#solutions" class="block text-white no-underline" @click="servicesOpen = false">
                <span class="block text-sm font-bold">{{ item.title }}</span>
                <span class="mt-1 block text-xs leading-5 text-white/55">{{ item.body }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <NuxtLink
          to="/contact"
          class="flex min-h-full flex-col justify-between rounded-[1.25rem] bg-[#e44545] p-5 text-white no-underline hover:brightness-110"
          @click="servicesOpen = false"
        >
          <p class="max-w-[10rem] text-2xl font-extrabold leading-tight">{{ t.idea }}</p>
          <span class="mt-8 flex items-center justify-between text-sm font-semibold">
            {{ t.talk }}
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white" aria-hidden="true">↗</span>
          </span>
        </NuxtLink>
      </div>
    </div>

    <div v-if="mobileOpen" class="mx-auto mt-2 max-w-6xl rounded-3xl bg-[#161616] p-3 text-white lg:hidden">
      <nav class="flex flex-col gap-1" aria-label="Navigation principale">
        <NuxtLink v-for="item in mobileLinks" :key="item.to" :to="item.to" class="rounded-2xl px-4 py-3 text-sm font-semibold text-white no-underline" :class="isActive(item.to) ? 'bg-[#e44545]' : 'hover:bg-white/10'" @click="mobileOpen = false">
          {{ item.label }}
        </NuxtLink>
        <div class="flex items-center gap-3 px-4 py-2 text-sm font-semibold">
          <button type="button" :class="locale === 'fr' ? 'text-white' : 'text-white/45'" @click="setLocale('fr')">FR</button>
          <span class="text-white/35">·</span>
          <button type="button" class="lowercase" :class="locale === 'en' ? 'text-white' : 'text-white/45'" @click="setLocale('en')">en</button>
        </div>
      </nav>
    </div>
  </div>
  <div class="header-space" aria-hidden="true"></div>
</template>

<script setup lang="ts">
const route = useRoute()
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const theme = useState<'light' | 'dark'>('mega-theme', () => 'light')
const servicesOpen = ref(false)
const mobileOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const copy = {
  fr: {
    home: 'Accueil',
    servicesMenu: 'Services / Solutions',
    services: 'Services',
    solutions: 'Solutions',
    projects: 'Projets',
    about: 'À propos',
    contact: 'Contactez-nous',
    contactShort: 'Contact',
    theme: 'Changer le thème',
    menu: 'Menu',
    expertisesLabel: 'Nos expertises',
    solutionsLabel: 'Nos solutions',
    idea: 'Un projet en tête ?',
    talk: 'Parlons-en',
    expertises: [
      'Conception de solutions digitales',
      'Développement & infrastructure',
      'Solutions intelligentes (IA)',
    ],
    solutionItems: [
      { title: 'Drop One', body: 'Votre carte de visite numérique, à partager en un instant.' },
      { title: 'CRM', body: 'Pilotez vos relations clients et vos ventes depuis un seul outil.' },
      { title: 'Boutique', body: 'Une boutique en ligne prête à vendre, pensée pour le mobile.' },
      { title: 'Pourpre', body: 'Suivi du cycle et du bien-être, pensé pour les femmes africaines.' },
    ],
  },
  en: {
    home: 'Home',
    servicesMenu: 'Services / Solutions',
    services: 'Services',
    solutions: 'Solutions',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact us',
    contactShort: 'Contact',
    theme: 'Toggle theme',
    menu: 'Menu',
    expertisesLabel: 'Our expertise',
    solutionsLabel: 'Our solutions',
    idea: 'A project in mind?',
    talk: "Let's talk",
    expertises: [
      'Digital solution design',
      'Development & infrastructure',
      'Intelligent solutions (AI)',
    ],
    solutionItems: [
      { title: 'Drop One', body: 'Your digital business card, ready to share in an instant.' },
      { title: 'CRM', body: 'Run customer relationships and sales from a single tool.' },
      { title: 'Boutique', body: 'An online store ready to sell, designed for mobile.' },
      { title: 'Pourpre', body: 'Cycle and wellbeing tracking, designed for African women.' },
    ],
  },
} as const

const t = computed(() => copy[locale.value])
const servicesActive = computed(() => route.path === '/services' || route.path.startsWith('/services/') || route.path.startsWith('/nos-solutions'))
const mobileLinks = computed(() => [
  { label: t.value.home, to: '/' },
  { label: t.value.services, to: '/services' },
  { label: t.value.solutions, to: '/services#solutions' },
  { label: t.value.projects, to: '/projet' },
  { label: t.value.about, to: '/a-propos' },
])

function setLocale(next: 'fr' | 'en') {
  locale.value = next
  if (import.meta.client) {
    localStorage.setItem('mega-locale', next)
    document.documentElement.lang = next
  }
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  if (import.meta.client) localStorage.setItem('mega-theme', theme.value)
}

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}

const barRef = ref<HTMLElement | null>(null)

function onPointerDown(event: PointerEvent) {
  if (!barRef.value?.contains(event.target as Node)) servicesOpen.value = false
}

onMounted(() => {
  const savedLocale = localStorage.getItem('mega-locale')
  if (savedLocale === 'fr' || savedLocale === 'en') locale.value = savedLocale
  const savedTheme = localStorage.getItem('mega-theme')
  if (savedTheme === 'light' || savedTheme === 'dark') theme.value = savedTheme
  document.documentElement.lang = locale.value
  window.addEventListener('pointerdown', onPointerDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', onPointerDown)
})

watch(() => route.path, () => {
  servicesOpen.value = false
  mobileOpen.value = false
})
</script>

<style scoped>
.header-space {
  height: 4.25rem;
  background: #fff;
}

.header-logo {
  mix-blend-mode: screen;
}

.mega {
  animation: mega-in 0.22s ease;
}

@keyframes mega-in {
  from { opacity: 0; transform: translateY(0.4rem); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .mega { animation: none; }
}
</style>
