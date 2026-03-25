<template>
  <section class="w-full bg-white">
    <div
      ref="headerSectionRef"
      class="relative left-1/2 mb-10 flex w-screen max-w-[100vw] -translate-x-1/2 -mt-8 min-h-[340px] items-center overflow-hidden border-b border-neutral-200 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 p-6 transition-all duration-700 ease-out md:mb-12 md:min-h-[420px] md:p-10 lg:min-h-[500px] lg:p-12"
      :class="headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      :style="{ backgroundImage: `url('/assets/headersolution.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    >
      <div class="relative z-10 max-w-2xl">
        <h1 class="text-xl font-bold leading-tight text-neutral-900 md:text-2xl lg:text-3xl">
          {{ t.heroTitle }}
        </h1>
        <p class="mt-4 text-base leading-7 text-neutral-700 md:text-lg">
          {{ t.heroSubtitle }}
        </p>
      </div>
    </div>

    <div class="mx-auto w-full max-w-7xl px-2 py-8 md:px-4 md:py-10">
      <nav class="mb-8 md:mb-10" aria-label="Fil d'ariane">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-2xl font-semibold text-[#d84c4c] no-underline transition-opacity hover:opacity-80 md:text-4xl"
        >
          <span aria-hidden="true">&lt;</span>
          <span>{{ t.breadcrumb }}</span>
        </NuxtLink>
      </nav>

      <div
        ref="cardsSectionRef"
        class="grid grid-cols-1 gap-7 md:grid-cols-3"
      >
      <article
        v-for="(item, i) in solutions"
        :key="item.title"
        class="rounded-3xl border border-neutral-300 bg-white p-5 transition-all duration-700 ease-out md:p-6"
        :class="cardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        :style="{ transitionDelay: cardsVisible ? `${i * 140}ms` : '0ms' }"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="h-52 w-full rounded-2xl object-cover md:h-56"
          loading="lazy"
          width="420"
          height="280"
        />

        <div class="mt-6 h-1 w-24 rounded-full bg-[#d84c4c]" />

        <h2 class="mt-6 text-2xl font-semibold tracking-wide text-neutral-900">
          {{ item.title }}
        </h2>

        <p class="mt-4 text-[16px] leading-8 text-neutral-700">
          {{ item.description }}
        </p>

        <button
          type="button"
          class="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#d84c4c] py-3 text-[15px] font-bold uppercase tracking-wide text-white no-underline transition-opacity hover:opacity-90"
          @click="showComingSoon()"
        >
          {{ t.demo }}
        </button>
      </article>
      </div>

    </div>

    <div
      v-if="isPopupOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Information solution"
      @click.self="closePopup"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl md:p-7">
        <h3 class="text-2xl font-bold text-[#d84c4c]">{{ t.infoTitle }}</h3>
        <p class="mt-3 text-base leading-7 text-neutral-700">
          {{ t.infoBody }}
        </p>
        <div class="mt-6 flex justify-end">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-[#d84c4c] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            @click="closePopup"
          >
            {{ t.close }}
          </button>
        </div>
      </div>
    </div>
  </section>
   <div class="mt-20">
    <ServicesSection />
  </div>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')

const solutions = [
  {
    title: 'CRM',
    image: '/assets/valeur1.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
  },
  {
    title: 'BOUTIQUE',
    image: '/assets/valeur2.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
  },
  {
    title: 'POURPRE',
    image: '/assets/valeur3.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
  },
] as const

const translations = {
  fr: {
    heroTitle: 'Des solutions digitales qui creent de la valeur.',
    heroSubtitle: 'Nous concevons des outils performants, penses pour vos enjeux metiers.',
    breadcrumb: 'Nos solutions',
    demo: 'Demo',
    infoTitle: 'Information',
    infoBody: 'Solution bientot disponible',
    close: 'Fermer',
  },
  en: {
    heroTitle: 'Digital solutions that create value.',
    heroSubtitle: 'We design high-performing tools tailored to your business challenges.',
    breadcrumb: 'Our solutions',
    demo: 'Demo',
    infoTitle: 'Information',
    infoBody: 'Solution coming soon',
    close: 'Close',
  },
} as const

const t = computed(() => translations[locale.value])

const isPopupOpen = ref(false)
const headerSectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const cardsSectionRef = ref<HTMLElement | null>(null)
const cardsVisible = ref(false)

function showComingSoon() {
  isPopupOpen.value = true
}

function closePopup() {
  isPopupOpen.value = false
}

onMounted(() => {
  const headerEl = headerSectionRef.value
  if (headerEl) {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          headerVisible.value = entry.isIntersecting
        })
      },
      { threshold: 0.2 }
    )
    headerObserver.observe(headerEl)
    onUnmounted(() => headerObserver.disconnect())
  }

  const el = cardsSectionRef.value
  if (!el) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        cardsVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})

useSeoMeta({ title: computed(() => t.value.breadcrumb) })
</script>
