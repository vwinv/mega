<template>
  <section class="w-full bg-white">
    <div
      ref="headerSectionRef"
      class="relative left-1/2 mb-10 flex w-screen max-w-[100vw] -translate-x-1/2 -mt-8 min-h-[340px] items-center overflow-hidden border-b border-neutral-200 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 p-6 transition-all duration-700 ease-out md:mb-12 md:min-h-[420px] md:p-10 lg:min-h-[500px] lg:p-12"
      :class="headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      :style="{ backgroundImage: `url('/assets/headerprojet.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
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

    <div class="mx-auto w-full max-w-6xl px-2 py-8 md:px-4 md:py-10">
      <nav class="mb-8 md:mb-10" aria-label="Fil d'ariane">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-2xl font-semibold text-[#d84c4c] no-underline transition-opacity hover:opacity-80 md:text-3xl"
        >
          <span aria-hidden="true">&lt;</span>
          <span>{{ t.breadcrumb }}</span>
        </NuxtLink>
      </nav>

      <div
        ref="cardsSectionRef"
        class="space-y-6 md:space-y-7"
      >
        <article
          v-for="(project, i) in projects"
          :key="project.title"
          class="rounded-3xl border border-neutral-300 bg-white p-5 transition-all duration-700 ease-out md:p-7"
          :class="cardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          :style="{ transitionDelay: cardsVisible ? `${i * 140}ms` : '0ms' }"
        >
          <div class="grid grid-cols-1 items-center gap-6 md:grid-cols-[220px_1fr] md:gap-8">
            <div class="overflow-hidden rounded-2xl bg-white p-2">
              <img
                :src="project.image"
                :alt="project.title"
                class="h-40 w-full object-contain md:h-44"
                loading="lazy"
                width="440"
                height="280"
              />
            </div>

            <div>
              <h2 class="text-2xl font-bold text-neutral-900 md:text-3xl">
                {{ project.title }}
              </h2>
              <p class="mt-4 text-[15px] leading-7 text-neutral-700 md:max-w-4xl md:text-[20px]">
                {{ project.description }}
              </p>

              <div class="mt-6 flex flex-wrap gap-4">
                <NuxtLink
                  v-for="action in project.actions"
                  :key="action.label"
                  :to="action.to"
                  class="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#d84c4c] px-6 py-3 text-base font-bold text-white no-underline transition-opacity hover:opacity-90 md:text-[15px]"
                >
                  {{ action.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
  <div class="mt-20">
    <ServicesSection />
  </div>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')

const projectsByLocale = {
  fr: [
  {
    title: 'Yohride',
    image: '/assets/yohrideapp.png',
    description:
      'Yohride est une plateforme de location de voitures qui permet de réserver facilement un véhicule adapté à ses besoins. Elle offre une solution simple, rapide et fiable pour les déplacements personnels, professionnels ou touristiques.',
    actions: [
      { label: "Télécharger sur Playstore", to: 'https://play.google.com/store/apps/details?id=com.yohride.app' },
      { label: "Télécharger sur Appstore", to: 'https://apps.apple.com/us/app/yohride/id6752221198' },
    ],
  },
  {
    title: 'Mille Services',
    image: '/assets/milleserviceapp.png',
    description:
      "Mille Services est une plateforme de mise en relation entre particuliers et prestataires (plomberie, électricité, ménage, etc.). Le projet comprend une application mobile permettant aux utilisateurs de trouver et réserver facilement un professionnel, ainsi qu’un dashboard d’administration pour la gestion des services, des utilisateurs et des demandes.",
    actions: [{ label: "Télécharger l'application", to: '/contact' }],
  },
  {
    title: 'The Lightbulb Agency',
    image: '/assets/lightbulbsite.png',
    description:
      'Site vitrine réalisé pour The Lightbulb Agency, présentant ses services, son expertise et ses réalisations. Conçu pour offrir une navigation fluide et valoriser l’image de l’agence, il met en avant son identité et facilite la prise de contact.',
    actions: [{ label: 'Voir le site', to: 'https://lightbulb-agency.com/' }],
  },
  {
    title: 'Theta Ingénierie',
    image: '/assets/thetasite.png',
    description:
      'Site vitrine conçu pour Theta Ingénierie, mettant en avant ses services, son expertise et ses projets. L’objectif est de valoriser son savoir-faire, renforcer sa présence en ligne et faciliter la mise en relation avec ses clients.',
    actions: [{ label: 'Voir le site', to: 'https://theta-ingenierie.com/' }],
  },
  {
    title: 'Al Madinah boutique',
    image: '/assets/almadinasite.png',
    description:
      'Site vitrine réalisé pour Al Madinah Boutique, mettant en avant ses produits et son univers. Conçu pour valoriser la marque, renforcer sa présence en ligne et faciliter le contact avec les clients.',
    actions: [{ label: 'Voir le site', to: 'https://almadinahboutique.com/boutique/' }],
  },
  ],
  en: [
    {
      title: 'Yohride',
      image: '/assets/yohrideapp.png',
      description:
        'Yohride is a car rental platform that lets you book the right vehicle quickly. It delivers a straightforward, dependable experience for personal trips, business travel, or holidays.',
      actions: [
        { label: 'Get it on Google Play', to: 'https://play.google.com/store/apps/details?id=com.yohride.app' },
        { label: 'Download on the App Store', to: 'https://apps.apple.com/us/app/yohride/id6752221198' },
      ],
    },
    {
      title: 'Mille Services',
      image: '/assets/milleserviceapp.png',
      description:
        'Mille Services connects people with local professionals (plumbing, electrical, housekeeping, and similar trades). The scope covers a consumer mobile app to discover and book a provider, and an administration dashboard to run services, users, and incoming requests.',
      actions: [{ label: 'Download the app', to: '/contact' }],
    },
    {
      title: 'The Lightbulb Agency',
      image: '/assets/lightbulbsite.png',
      description:
        'Marketing site for The Lightbulb Agency presenting its offer, expertise, and selected projects. The interface favors fluid navigation, a polished brand image, and quick ways to start a conversation.',
      actions: [{ label: 'Visit the website', to: 'https://lightbulb-agency.com/' }],
    },
    {
      title: 'Theta Ingénierie',
      image: '/assets/thetasite.png',
      description:
        'Corporate site for Theta Ingénierie showcasing its services, technical expertise, and project track record—aimed at highlighting its capabilities, growing visibility, and simplifying how prospects and clients connect.',
      actions: [{ label: 'Visit the website', to: 'https://theta-ingenierie.com/' }],
    },
    {
      title: 'Al Madinah boutique',
      image: '/assets/almadinasite.png',
      description:
        'Brochure site for Al Madinah Boutique, putting products and brand story in focus—designed to elevate the label, strengthen its web presence, and make it easy for customers to get in touch.',
      actions: [{ label: 'Visit the website', to: 'https://almadinahboutique.com/boutique/' }],
    },
  ],
} as const

const translations = {
  fr: {
    heroTitle: 'Des projets concrets. Des résultats mesurables.',
    heroSubtitle: 'Découvrez comment nous transformons les ambitions en succès durables.',
    breadcrumb: 'Projet',
  },
  en: {
    heroTitle: 'Concrete projects. Measurable results.',
    heroSubtitle: 'Discover how we turn ambitions into sustainable success.',
    breadcrumb: 'Projects',
  },
} as const

const projects = computed(() => projectsByLocale[locale.value])
const t = computed(() => translations[locale.value])

const headerSectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const cardsSectionRef = ref<HTMLElement | null>(null)
const cardsVisible = ref(false)

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
