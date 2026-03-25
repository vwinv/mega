<template>
  <section class="w-full bg-white">
    <div
      ref="headerSectionRef"
      class="relative left-1/2 mb-10 flex w-screen max-w-[100vw] -translate-x-1/2 -mt-8 min-h-[340px] items-center overflow-hidden border-b border-neutral-200 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 p-6 transition-all duration-700 ease-out md:mb-12 md:min-h-[420px] md:p-10 lg:min-h-[500px] lg:p-12"
      :class="headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      :style="{ backgroundImage: `url('/assets/headerpropos.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    >
      <div class="relative z-10 max-w-2xl">
        <h1 class="text-xl font-bold leading-tight text-white md:text-2xl lg:text-3xl">
          {{ t.heroTitle }}
        </h1>
        <p class="mt-4 text-base leading-7 text-white md:text-lg">
          {{ t.heroSubtitle }}
        </p>
      </div>
    </div>

    <div
      ref="aboutSectionRef"
      class="mx-auto w-full max-w-6xl px-2 py-8 transition-all duration-700 md:px-4 md:py-10"
      :class="aboutVisible ? 'opacity-100' : 'opacity-0'"
    >
      <nav class="mb-6 md:mb-8" aria-label="Fil d'ariane">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-2xl font-semibold text-[#d84c4c] no-underline transition-opacity hover:opacity-80 md:text-3xl"
        >
          <span aria-hidden="true">&lt;</span>
          <span>{{ t.breadcrumb }}</span>
        </NuxtLink>
      </nav>

      <div class="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
        <div
          class="transition-all duration-700 ease-out"
          :class="aboutVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'"
        >
          <h2 class="text-3xl font-bold text-[#d84c4c] md:text-4xl">{{ t.aboutTitle }}</h2>

          <p class="mt-6 text-base leading-8 text-neutral-700 md:text-lg">
            {{ t.aboutP1 }}
          </p>

          <p class="mt-5 text-base leading-8 text-neutral-700 md:text-lg">
            {{ t.aboutP2 }}
          </p>

          <p class="mt-5 text-base leading-8 text-neutral-700 md:text-lg">
            {{ t.aboutP3 }}
          </p>

          <p class="mt-7 text-lg font-bold leading-8 text-neutral-900 md:text-xl">
            {{ t.aboutQuote }}
          </p>
        </div>

        <div
          class="flex justify-center transition-all duration-700 ease-out md:justify-end"
          :class="aboutVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'"
        >
          <img
            src="/assets/imagevertical.png"
            alt="Logo MEGA"
            class="h-auto w-24 object-contain md:w-28 lg:w-32"
          />
        </div>
      </div>
    </div>

    <div
      ref="visionSectionRef"
      class="relative mx-auto mt-6 w-full max-w-6xl overflow-hidden bg-[#efefef] transition-all duration-700"
      :class="visionVisible ? 'opacity-100' : 'opacity-0'"
    >
      <img
        src="/assets/imgVision.png"
        alt="Notre vision"
        class="ml-auto h-auto w-full max-w-none object-cover transition-all duration-700 ease-out"
        :class="visionVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'"
      />
      <div
        class="absolute bottom-6 left-0 z-10 max-w-2xl px-6 transition-all duration-700 ease-out md:bottom-10 md:px-10 lg:px-14"
        :class="visionVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'"
      >
        <h2 class="text-4xl font-bold text-[#d84c4c] md:text-5xl">{{ t.visionTitle }}</h2>
        <p class="mt-4 text-lg leading-8 text-neutral-900 md:text-xl">
          {{ t.visionText }}
        </p>
      </div>
    </div>

    <div
      ref="valuesSectionRef"
      class="mx-auto mt-10 w-full max-w-6xl px-2 pb-10 transition-all duration-700 md:px-4 md:pb-14"
      :class="valuesVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    >
      <h2 class="mb-6 text-4xl font-bold text-[#d84c4c] md:mb-8 md:text-5xl">{{ t.valuesTitle }}</h2>

      <div class="overflow-hidden rounded-3xl p-4 md:p-6">
        <div class="hidden items-stretch gap-6 md:flex lg:gap-8">
          <article
            v-for="card in desktopCards"
            :key="card.title"
            class="basis-1/3 rounded-3xl border border-[#d84c4c]/15 bg-[rgba(216,76,76,0.05)] p-4 transition-all duration-1000 ease-in-out"
            :class="card.offset === 0 ? 'scale-100 opacity-100' : 'scale-95 opacity-90'"
          >
            <img
              :src="card.image"
              :alt="card.title"
              class="w-full rounded-2xl border border-[#d84c4c] object-cover transition-all duration-1000 ease-in-out"
              :class="card.offset === 0 ? 'h-64 lg:h-72' : 'h-52 lg:h-64'"
              loading="lazy"
              width="360"
              height="320"
            />
            <h3 class="mt-4 text-xl font-semibold text-[#d84c4c]">
              {{ card.title }}
            </h3>
            <p class="mt-3 text-[15px] leading-7 text-[#d84c4c]">
              {{ card.description }}
            </p>
          </article>
        </div>

        <div class="md:hidden">
          <div
            class="flex transition-transform duration-700 ease-out"
            :style="{ transform: `translateX(-${currentValueSlide * 100}%)` }"
          >
            <article
              v-for="value in valuesList"
              :key="`mobile-${value.title}`"
              class="min-w-full px-1"
            >
              <div class="rounded-3xl border border-[#d84c4c]/15 bg-[#f3e5e8] p-4">
                <img
                  :src="value.image"
                  :alt="value.title"
                  class="h-52 w-full rounded-2xl border border-[#d84c4c] object-cover"
                  loading="lazy"
                  width="360"
                  height="320"
                />
                <h3 class="mt-4 text-xl font-semibold text-[#d84c4c]">{{ value.title }}</h3>
                <p class="mt-3 text-[15px] leading-7 text-[#d84c4c]">
                  {{ value.description }}
                </p>
              </div>
            </article>
          </div>
          <div class="mt-6 flex items-center justify-center gap-3">
            <button
              v-for="(_, i) in valuesList"
              :key="`dot-${i}`"
              type="button"
              class="h-3.5 w-3.5 rounded-full transition-all"
              :class="i === currentValueSlide ? 'bg-[#d84c4c] scale-110' : 'bg-neutral-300'"
              :aria-label="`${t.goToSlide} ${i + 1}`"
              @click="currentValueSlide = i"
            />
          </div>
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

const valuesByLocale = {
  fr: [
  {
    title: 'Innovation',
    image: '/assets/valeur1.png',
    description:
      'Nous plaçons l’innovation au cœur de nos solutions afin de répondre aux défis actuels des entreprises. Chez Mega, nous concevons des produits technologiques modernes, évolutifs et adaptés aux besoins réels de nos clients.',
  },
  {
    title: "Esprit d'analyse",
    image: '/assets/valeur2.png',
    description:
      'Nous adoptons une approche réfléchie et structurée pour comprendre chaque problématique. Grâce à notre esprit d’analyse, nous identifions les enjeux clés et proposons des solutions pertinentes et efficaces.',
  },
  {
    title: 'Collaboration',
    image: '/assets/valeur3.png',
    description:
      'Nous croyons en la force du travail d’équipe, aussi bien en interne qu’avec nos clients. La collaboration nous permet de co-construire des solutions durables, alignées avec les objectifs et la vision de chacun.',
  },
  ],
  en: [
    {
      title: 'Innovation',
      image: '/assets/valeur1.png',
      description:
        'We place innovation at the heart of our solutions to address today’s business challenges. At Mega, we design modern, scalable technologies tailored to real client needs.',
    },
    {
      title: 'Analytical mindset',
      image: '/assets/valeur2.png',
      description:
        'We use a structured and thoughtful approach to understand each problem. With a strong analytical mindset, we identify key issues and deliver relevant, effective solutions.',
    },
    {
      title: 'Collaboration',
      image: '/assets/valeur3.png',
      description:
        'We believe in teamwork, both internally and with our clients. Collaboration helps us co-build sustainable solutions aligned with each stakeholder’s goals and vision.',
    },
  ],
} as const

const translations = {
  fr: {
    heroTitle: 'A propos de MEGA',
    heroSubtitle: 'Nous accompagnons les organisations avec des solutions digitales utiles, durables et adaptees a leurs objectifs.',
    breadcrumb: 'A propos',
    aboutTitle: 'Parlons de MEGA',
    aboutP1:
      "MEGA est une entreprise innovante specialisee dans la transformation digitale, avec l'ambition de devenir un acteur de reference en Afrique et a l'international.",
    aboutP2:
      "Des sa creation, MEGA se positionne comme un partenaire strategique en placant l'audit et le conseil au coeur de son approche. Nous accompagnons les entreprises dans l'analyse de leur environnement, l'identification des risques et la definition de strategies digitales efficaces et durables.",
    aboutP3:
      'Au-dela du conseil, nous concevons et developpons des solutions digitales sur mesure, en combinant technologie, data et intelligence artificielle, pour repondre concretement aux enjeux metiers.',
    aboutQuote: 'Notre ambition : comprendre, orienter et construire des solutions qui creent de la valeur.',
    visionTitle: 'Notre Vision',
    visionText:
      "Devenir un acteur de reference dans la transformation digitale en Afrique et a l'international, en contribuant a batir un ecosysteme numerique ou la technologie, la securite et l'innovation sont au service de la performance durable des organisations.",
    valuesTitle: 'Nos Valeurs',
    goToSlide: 'Aller au slide',
  },
  en: {
    heroTitle: 'About MEGA',
    heroSubtitle: 'We support organizations with useful, sustainable digital solutions aligned with their goals.',
    breadcrumb: 'About',
    aboutTitle: 'Let us talk about MEGA',
    aboutP1:
      'MEGA is an innovative company specialized in digital transformation, with the ambition to become a leading player in Africa and internationally.',
    aboutP2:
      'From day one, MEGA has positioned itself as a strategic partner by placing audit and consulting at the core of its approach. We help companies analyze their environment, identify risks, and define effective, sustainable digital strategies.',
    aboutP3:
      'Beyond consulting, we design and develop tailor-made digital solutions by combining technology, data, and artificial intelligence to address real business challenges.',
    aboutQuote: 'Our ambition: understand, guide, and build solutions that create value.',
    visionTitle: 'Our Vision',
    visionText:
      'To become a reference player in digital transformation in Africa and internationally by helping build a digital ecosystem where technology, security, and innovation drive sustainable organizational performance.',
    valuesTitle: 'Our Values',
    goToSlide: 'Go to slide',
  },
} as const

const valuesList = computed(() => valuesByLocale[locale.value])
const t = computed(() => translations[locale.value])

const headerSectionRef = ref<HTMLElement | null>(null)
const aboutSectionRef = ref<HTMLElement | null>(null)
const visionSectionRef = ref<HTMLElement | null>(null)
const valuesSectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const aboutVisible = ref(false)
const visionVisible = ref(false)
const valuesVisible = ref(false)
const currentValueSlide = ref(0)
let valuesTimer: ReturnType<typeof setInterval> | null = null
const desktopOffsets = [-1, 0, 1] as const

function valueAtOffset(offset: number) {
  const len = valuesList.value.length
  const idx = (currentValueSlide.value + offset + len) % len
  return valuesList.value[idx] ?? valuesList.value[0]
}

const desktopCards = computed(() =>
  desktopOffsets.map((offset) => {
    const value = valueAtOffset(offset)
    return {
      ...value,
      offset,
    }
  })
)

function startValuesSlider() {
  if (valuesTimer || valuesList.value.length <= 1) return
  valuesTimer = setInterval(() => {
    currentValueSlide.value = (currentValueSlide.value + 1) % valuesList.value.length
  }, 3400)
}

function stopValuesSlider() {
  if (!valuesTimer) return
  clearInterval(valuesTimer)
  valuesTimer = null
}

onMounted(() => {
  const entries = [
    { el: headerSectionRef.value, set: (v: boolean) => (headerVisible.value = v) },
    { el: aboutSectionRef.value, set: (v: boolean) => (aboutVisible.value = v) },
    { el: visionSectionRef.value, set: (v: boolean) => (visionVisible.value = v) },
    { el: valuesSectionRef.value, set: (v: boolean) => (valuesVisible.value = v), isValues: true },
  ].filter((item) => item.el)

  if (!entries.length) return

  const observer = new IntersectionObserver(
    (obsEntries) => {
      obsEntries.forEach((entry) => {
        const target = entries.find((item) => item.el === entry.target)
        if (!target) return
        target.set(entry.isIntersecting)
        if (target.isValues && entry.isIntersecting) {
          startValuesSlider()
        } else if (target.isValues && !entry.isIntersecting) {
          stopValuesSlider()
        }
      })
    },
    { threshold: 0.25 }
  )

  entries.forEach((item) => observer.observe(item.el as Element))
  onUnmounted(() => {
    observer.disconnect()
    stopValuesSlider()
  })
})

useSeoMeta({ title: 'A propos' })
</script>

<style scoped>
</style>
