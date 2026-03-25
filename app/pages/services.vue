<template>
  <section class="w-full bg-white">
    <div
      ref="headerSectionRef"
      class="relative left-1/2 mb-10 flex w-screen max-w-[100vw] -translate-x-1/2 -mt-8 min-h-[340px] items-center overflow-hidden border-b border-neutral-200 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 p-6 transition-all duration-700 ease-out md:mb-12 md:min-h-[420px] md:p-10 lg:min-h-[500px] lg:p-12"
      :class="headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      :style="{ backgroundImage: `url('/assets/headerservice.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
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

      <div ref="cardsSectionRef" class="flex flex-col gap-7">
        <div
          v-for="(pair, rowIndex) in servicePairs.pairs"
          :key="`pair-${rowIndex}`"
          class="grid grid-cols-1 gap-7 md:grid-cols-2"
        >
          <article
            v-for="(service, sideIdx) in [pair.left, pair.right]"
            :key="service.title"
            class="rounded-3xl border border-neutral-300 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-700 ease-out"
            :class="
              cardsVisible
                ? 'translate-x-0 opacity-100'
                : sideIdx === 0
                  ? '-translate-x-8 opacity-0'
                  : 'translate-x-8 opacity-0'
            "
            :style="{
              transitionDelay: cardsVisible
                ? `${120 + rowIndex * 180 + sideIdx * 100}ms`
                : '0ms',
            }"
          >
            <div class="grid gap-6">
              <div class="overflow-hidden rounded-2xl bg-white/50 p-2">
                <img
                  :src="service.image"
                  :alt="service.title"
                  class="h-44 w-full object-contain md:h-48"
                  loading="lazy"
                  width="480"
                  height="260"
                />
              </div>

              <div>
                <h2 class="text-xl font-semibold text-neutral-900">
                  {{ service.title }}
                </h2>
                <p class="mt-3 text-[15px] leading-7 text-neutral-700">
                  {{ service.description }}
                </p>

                <ul class="mt-4 list-disc space-y-1 pl-5 text-[14px] leading-6 text-neutral-800">
                  <li v-for="item in service.points" :key="item">{{ item }}</li>
                </ul>

                <button
                  type="button"
                  class="mt-6 inline-flex rounded-full bg-[#d84c4c] px-8 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                  @click="openQuote(service.title)"
                >
                  {{ t.quoteCta }}
                </button>
              </div>
            </div>
          </article>
        </div>

        <article
          v-if="servicePairs.featured"
          class="rounded-3xl border border-neutral-300 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-700 ease-out"
          :class="cardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'"
          :style="{
            transitionDelay: cardsVisible
              ? `${120 + servicePairs.pairs.length * 180 + 220}ms`
              : '0ms',
          }"
        >
          <div
            class="grid gap-6 md:grid-cols-[0.45fr_0.55fr] md:items-center"
          >
            <div class="overflow-hidden rounded-2xl bg-white/50 p-2">
              <img
                :src="servicePairs.featured.image"
                :alt="servicePairs.featured.title"
                class="h-44 w-full object-contain md:h-48"
                loading="lazy"
                width="480"
                height="260"
              />
            </div>

            <div>
              <h2 class="text-xl font-semibold text-neutral-900">
                {{ servicePairs.featured.title }}
              </h2>
              <p class="mt-3 text-[15px] leading-7 text-neutral-700">
                {{ servicePairs.featured.description }}
              </p>

              <ul class="mt-4 list-disc space-y-1 pl-5 text-[14px] leading-6 text-neutral-800">
                <li v-for="item in servicePairs.featured.points" :key="item">{{ item }}</li>
              </ul>

              <button
                type="button"
                class="mt-6 inline-flex rounded-full bg-[#d84c4c] px-8 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                @click="openQuote(servicePairs.featured.title)"
              >
                {{ t.quoteCta }}
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Popup demande de devis -->
  <div
    v-if="quoteModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-[#d84c4c]">
            {{ t.quoteModalTitle }}
          </h2>
          <p v-if="selectedServiceTitle" class="mt-2 text-sm text-neutral-700">
            {{ t.quoteFor }}: <span class="font-semibold">{{ selectedServiceTitle }}</span>
          </p>
        </div>

        <button
          type="button"
          class="text-neutral-500 hover:text-neutral-900"
          aria-label="Fermer"
          @click="closeQuote"
        >
          ✕
        </button>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="submitQuote">
        <div class="space-y-2">
          <label class="block">
            <span class="text-sm font-medium text-neutral-500">{{ t.lastName }}</span>
            <input
              v-model="quoteLastName"
              type="text"
              class="mt-2 w-full border-0 border-b border-neutral-400 bg-transparent px-0 pb-2 focus:border-[#d84c4c] focus:outline-none"
            />
          </label>
        </div>

        <div class="space-y-2">
          <label class="block">
            <span class="text-sm font-medium text-neutral-900">{{ t.firstName }}</span>
            <input
              v-model="quoteFirstName"
              type="text"
              class="mt-2 w-full border-0 border-b border-neutral-400 bg-transparent px-0 pb-2 focus:border-[#d84c4c] focus:outline-none"
            />
          </label>
        </div>

        <div class="space-y-2">
          <label class="block">
            <span class="text-sm font-medium text-neutral-500">{{ t.phone }}</span>
            <input
              v-model="quotePhone"
              type="tel"
              class="mt-2 w-full border-0 border-b border-neutral-900 bg-transparent px-0 pb-2 focus:border-[#d84c4c] focus:outline-none"
            />
          </label>
        </div>

        <div class="space-y-2">
          <label class="block">
            <span class="text-sm font-medium text-neutral-900">{{ t.email }}</span>
            <input
              v-model="quoteEmail"
              type="email"
              class="mt-2 w-full border-0 border-b border-neutral-400 bg-transparent px-0 pb-2 focus:border-[#d84c4c] focus:outline-none"
            />
          </label>
        </div>

        <div class="space-y-2">
          <label class="block">
            <span class="text-sm font-medium text-neutral-500">
              {{ t.projectDescriptionLabel }}
            </span>
            <textarea
              v-model="quoteProjectDescription"
              rows="3"
              :placeholder="t.projectDescriptionPlaceholder"
              class="mt-2 w-full resize-none border-0 border-b border-neutral-400 bg-transparent pb-2 text-base placeholder:text-neutral-500 focus:border-[#d84c4c] focus:outline-none"
            />
          </label>
        </div>

        <p v-if="quoteError" class="text-sm font-semibold text-red-600">
          {{ quoteError }}
        </p>
        <p v-if="quoteSuccess" class="text-sm font-semibold text-green-700">
          {{ quoteSuccess }}
        </p>

        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            class="rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-200"
            @click="closeQuote"
          >
            {{ t.close }}
          </button>
          <button
            type="submit"
            :disabled="quoteSending"
            class="rounded-full bg-[#d84c4c] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {{ quoteSending ? t.sending : t.submit }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="mt-20">
    <ServicesSection />
  </div>
</template>

<script setup lang="ts">
interface ServiceCard {
  title: string
  image: string
  description: string
  points: string[]
  featured?: boolean
}

const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const content = {
  fr: {
    heroTitle: 'Des expertises au service de votre croissance.',
    heroSubtitle: 'Audit, conseil et strategie pour vous aider a prendre les bonnes decisions.',
    breadcrumb: 'Services',
    quoteCta: 'Demander un devis',
    quoteModalTitle: 'Demander un devis',
    quoteFor: 'Service',
    lastName: 'Nom',
    firstName: 'Prenom',
    phone: 'Numero de telephone',
    email: 'E-mail',
    close: 'Fermer',
    submit: 'Envoyer',
    sending: 'Envoi...',
    quoteSuccess: 'Demande envoyee !',
    quoteError: "Une erreur est survenue lors de l'envoi.",
    projectDescriptionLabel: 'Description du projet',
    projectDescriptionPlaceholder: 'Décrivez votre projet...',
    services: [
      {
        title: 'Audit & Conseils',
        image: '/assets/audit.png',
        description: 'Nous aidons les entreprises a renforcer leur gouvernance IT et leur securite.',
        points: [
          'Audit des processus metiers',
          "Audit securite des systemes d'information",
          'Audit securite des plateformes web et mobiles',
          'Analyse des vulnerabilites',
          'Mise en place de politique securite',
        ],
      },
      {
        title: 'Formation',
        image: '/assets/formation.png',
        description: 'Nous aidons les entreprises a renforcer leur gouvernance IT et leur securite.',
        points: ['Formation des equipes sur la digitalisation', 'Securite et bonnes pratiques IT'],
      },
      {
        title: 'Conception de solutions digitales',
        image: '/assets/digital.png',
        description: "Conception d'experiences utilisateurs modernes et performantes.",
        points: ['UX/UI design', 'Architecture technique', 'Solutions adaptees a votre metier'],
      },
      {
        title: 'Developpement & infrastructure',
        image: '/assets/dev.png',
        description: 'Nous concevons et deployons des solutions technologiques robustes et evolutives.',
        points: [
          'Digitalisation des processus',
          'Developpement plateformes web/mobile',
          'Migration cloud',
          'Mise en place infrastructure cloud',
        ],
      },
      {
        title: 'Solutions intelligentes (IA)',
        image: '/assets/ia.png',
        description: "Mettre l'intelligence artificielle au service de votre performance et de votre innovation.",
        points: ['Automatisation avec IA', 'Analyse de donnees', 'Assistants intelligents pour entreprises'],
        featured: true,
      },
    ] as ServiceCard[],
  },
  en: {
    heroTitle: 'Expertise to accelerate your growth.',
    heroSubtitle: 'Audit, advisory, and strategy to help you make the right decisions.',
    breadcrumb: 'Services',
    quoteCta: 'Request a quote',
    quoteModalTitle: 'Request a quote',
    quoteFor: 'Service',
    lastName: 'Last name',
    firstName: 'First name',
    phone: 'Phone number',
    email: 'Email',
    close: 'Close',
    submit: 'Send',
    sending: 'Sending...',
    quoteSuccess: 'Request sent!',
    quoteError: 'Something went wrong while sending your request.',
    projectDescriptionLabel: 'Project description',
    projectDescriptionPlaceholder: 'Describe your project...',
    services: [
      {
        title: 'Audit & Consulting',
        image: '/assets/audit.png',
        description: 'We help companies strengthen their IT governance and security.',
        points: [
          'Business process audit',
          'Information systems security audit',
          'Web and mobile platform security audit',
          'Vulnerability analysis',
          'Security policy implementation',
        ],
      },
      {
        title: 'Training',
        image: '/assets/formation.png',
        description: 'We help companies strengthen their IT governance and security.',
        points: ['Team training on digitalization', 'Security and IT best practices'],
      },
      {
        title: 'Digital Solution Design',
        image: '/assets/digital.png',
        description: 'Design of modern and high-performing user experiences.',
        points: ['UX/UI design', 'Technical architecture', 'Solutions tailored to your business'],
      },
      {
        title: 'Development & Infrastructure',
        image: '/assets/dev.png',
        description: 'We design and deploy robust, scalable technology solutions.',
        points: [
          'Process digitalization',
          'Web/mobile platform development',
          'Cloud migration',
          'Cloud infrastructure setup',
        ],
      },
      {
        title: 'Smart Solutions (AI)',
        image: '/assets/ia.png',
        description: 'Use artificial intelligence to drive performance and innovation.',
        points: ['AI automation', 'Data analysis', 'Intelligent business assistants'],
        featured: true,
      },
    ] as ServiceCard[],
  },
} as const

const t = computed(() => content[locale.value])
const services = computed(() => t.value.services)

const servicePairs = computed(() => {
  const list = services.value
  const featured = list.find((s) => s.featured) ?? null
  const others = list.filter((s) => !s.featured)
  const pairs: { left: ServiceCard; right: ServiceCard }[] = []
  for (let i = 0; i + 1 < others.length; i += 2) {
    pairs.push({ left: others[i]!, right: others[i + 1]! })
  }
  return { pairs, featured }
})

const headerSectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)
const cardsSectionRef = ref<HTMLElement | null>(null)
const cardsVisible = ref(false)

const quoteModalOpen = ref(false)
const selectedServiceTitle = ref<string | null>(null)

const quoteLastName = ref("")
const quoteFirstName = ref("")
const quotePhone = ref("")
const quoteEmail = ref("")

const quoteSending = ref(false)
const quoteSuccess = ref<string | null>(null)
const quoteError = ref<string | null>(null)
const quoteProjectDescription = ref("")

function openQuote(serviceTitle: string) {
  selectedServiceTitle.value = serviceTitle
  quoteModalOpen.value = true

  // Reset state for a clean experience
  quoteLastName.value = ""
  quoteFirstName.value = ""
  quotePhone.value = ""
  quoteEmail.value = ""
  quoteProjectDescription.value = ""
  quoteSending.value = false
  quoteSuccess.value = null
  quoteError.value = null
}

function closeQuote() {
  quoteModalOpen.value = false
  selectedServiceTitle.value = null
}

async function submitQuote() {
  if (!selectedServiceTitle.value) return

  quoteSending.value = true
  quoteSuccess.value = null
  quoteError.value = null

  try {
    await $fetch("/api/mailing/quote", {
      method: "POST",
      body: {
        firstName: quoteFirstName.value.trim(),
        lastName: quoteLastName.value.trim(),
        phone: quotePhone.value.trim(),
        email: quoteEmail.value.trim(),
        serviceTitle: selectedServiceTitle.value,
        projectDescription: quoteProjectDescription.value.trim(),
      },
    })

    quoteSuccess.value = t.value.quoteSuccess
    setTimeout(() => closeQuote(), 1200)
  } catch (e) {
    const err = e as any
    const serverMessage =
      err?.data?.message || err?.data?.statusMessage || err?.message || ""

    quoteError.value =
      typeof serverMessage === "string" && serverMessage.trim().length
        ? serverMessage
        : t.value.quoteError

    console.error("[quote] send failed:", err)
  } finally {
    quoteSending.value = false
  }
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

  const cardsEl = cardsSectionRef.value
  if (!cardsEl) return

  const cardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        cardsVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.15 }
  )
  cardsObserver.observe(cardsEl)
  onUnmounted(() => cardsObserver.disconnect())
})

useSeoMeta({ title: computed(() => t.value.breadcrumb) })
</script>
