<template>
  <div class="careers" :class="theme === 'dark' && 'is-dark'">
    <section class="careers-hero px-6 pb-12 sm:px-10 lg:px-14">
      <p class="reveal flex w-fit items-center gap-2 rounded-full border border-[#f0d2d0] bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#e44545]">
        <span class="h-1.5 w-1.5 rounded-full bg-[#e44545]" aria-hidden="true"></span>
        {{ t.badge }}
      </p>

      <div class="mt-6 grid items-center gap-8 lg:grid-cols-[1.55fr_0.7fr] lg:gap-12">
        <h1
          class="careers-title reveal max-w-4xl whitespace-pre-line text-5xl font-extrabold tracking-tight text-[#111] sm:text-6xl lg:text-7xl"
          style="transition-delay: 80ms"
        >
          {{ t.title }}
        </h1>
        <div class="reveal max-w-sm lg:justify-self-end" style="transition-delay: 160ms">
          <p class="text-sm leading-7 text-[#6f6a67] sm:text-[15px]">{{ t.lead }}</p>
        </div>
      </div>
    </section>

    <section class="careers-offers relative px-6 pb-20 pt-16 sm:px-10 sm:pt-20 lg:px-14 lg:pt-24">
      <div class="offers-glow offers-glow--left" aria-hidden="true"></div>
      <div class="offers-glow offers-glow--right" aria-hidden="true"></div>

      <div class="relative reveal mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <h2 class="text-4xl font-extrabold tracking-tight text-[#111] sm:text-5xl">
          {{ t.offers }}
          <span class="ml-1 inline-block rounded-[0.85rem] bg-[#e44545] px-3 py-1 text-white">{{ t.open }}</span>
        </h2>
        <p class="shrink-0 pb-1 text-sm font-medium text-[#8a8582]">{{ offersCountLabel }}</p>
      </div>

      <article
        v-for="(job, i) in t.jobs"
        :key="job.slug"
        class="job-card relative reveal rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:p-8 lg:p-9"
        :style="{ transitionDelay: `${i * 80}ms` }"
      >
        <div class="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:justify-between lg:gap-14">
          <div class="min-w-0 max-w-xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex rounded-full bg-[#e44545] px-3 py-1 text-[11px] font-bold text-white">
                {{ job.kind }}
              </span>
              <span class="inline-flex items-center gap-2 rounded-full border border-[#ece7e4] bg-white px-3 py-1 text-[11px] font-semibold text-[#111]">
                <span class="h-1.5 w-1.5 rounded-full bg-[#22c55e]" aria-hidden="true"></span>
                {{ job.status }}
              </span>
            </div>

            <h3 class="mt-5 text-[2rem] font-extrabold leading-none tracking-tight text-[#111] sm:text-[2.5rem]">
              {{ job.title }}<span class="text-[#e44545]">.</span>
            </h3>
            <p class="mt-4 text-sm leading-7 text-[#6f6a67] sm:text-[15px]">{{ job.summary }}</p>
          </div>

          <div class="flex min-w-0 flex-col gap-3 lg:items-start">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in job.tags"
                :key="tag"
                class="job-tag inline-flex rounded-full border border-[#f0d2d0]/70 px-3.5 py-1.5 text-[12px] font-medium text-[#111]"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <NuxtLink
                :to="`/carriere/${job.slug}#postuler`"
                class="inline-flex h-11 min-w-[13.5rem] items-center justify-between gap-4 rounded-full bg-[#e44545] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white no-underline hover:brightness-110 sm:min-w-[16rem]"
              >
                {{ t.apply }}
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white" aria-hidden="true">→</span>
              </NuxtLink>
              <NuxtLink
                :to="`/carriere/${job.slug}`"
                class="inline-flex h-11 items-center rounded-full border border-[#e4dfdb] bg-white px-5 text-sm font-semibold text-[#111] no-underline hover:border-[#e44545]"
              >
                {{ t.view }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const theme = useState<'light' | 'dark'>('mega-theme', () => 'light')

const copy = {
  fr: {
    badge: 'CARRIÈRE',
    title: "Construisons\nensemble\nl'avenir\ndu digital.",
    lead: 'Vous voulez grandir au sein d’une équipe ambitieuse ? Découvrez ci-dessous nos offres ouvertes.',
    offers: 'Nos offres',
    open: 'ouvertes',
    offerOne: '1 offre',
    offerMany: '{n} offres',
    apply: 'Postuler maintenant',
    view: "Voir l'offre",
    jobs: [
      {
        slug: 'apporteurs-daffaires',
        kind: 'Appel à candidatures',
        status: 'Ouvert',
        title: "Apporteurs d'affaires",
        summary: 'Vous avez du réseau ? Transformez vos relations en opportunités.',
        tags: ['Freelance', 'Rémunération à la commission', 'Dakar', 'Ouvert à tous les profils'],
      },
    ],
  },
  en: {
    badge: 'CAREERS',
    title: "Let's build\nthe future\nof digital\ntogether.",
    lead: 'Want to grow with an ambitious team? Discover our open roles below.',
    offers: 'Our',
    open: 'open roles',
    offerOne: '1 role',
    offerMany: '{n} roles',
    apply: 'Apply now',
    view: 'View role',
    jobs: [
      {
        slug: 'apporteurs-daffaires',
        kind: 'Call for applications',
        status: 'Open',
        title: 'Business introducers',
        summary: 'Got a network? Turn your relationships into opportunities.',
        tags: ['Freelance', 'Commission-based pay', 'Dakar', 'Open to all profiles'],
      },
    ],
  },
} as const

const t = computed(() => copy[locale.value])
const offersCountLabel = computed(() => {
  const n = t.value.jobs.length
  return n === 1 ? t.value.offerOne : t.value.offerMany.replace('{n}', String(n))
})

usePageSeo({
  title: computed(() => (locale.value === 'en' ? 'Careers' : 'Carrière')),
  description: computed(() =>
    locale.value === 'en'
      ? 'Join MEGA in Dakar. Discover our open roles and apply.'
      : 'Rejoignez MEGA à Dakar. Découvrez nos offres ouvertes et postulez.',
  ),
  path: '/carriere',
})
</script>

<style scoped>
.careers {
  background: #f3f1ef;
  min-height: 70vh;
}

.careers-hero {
  padding-top: 7.5rem;
  background-color: #fff;
  background-image: radial-gradient(rgba(190, 182, 178, 0.55) 1.15px, transparent 1.15px);
  background-size: 22px 22px;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}

.careers-title {
  line-height: 1.08;
}

.job-tag {
  background: rgba(228, 69, 69, 0.03);
}

.offers-glow {
  pointer-events: none;
  position: absolute;
  width: 22rem;
  height: 18rem;
  border-radius: 999px;
  filter: blur(8px);
}

.offers-glow--left {
  left: -4rem;
  top: 2rem;
  background: radial-gradient(ellipse at center, rgba(248, 180, 180, 0.55) 0%, rgba(243, 241, 239, 0) 70%);
}

.offers-glow--right {
  right: -3rem;
  bottom: 4rem;
  background: radial-gradient(ellipse at center, rgba(248, 196, 196, 0.5) 0%, rgba(243, 241, 239, 0) 70%);
}

.careers.is-dark {
  background: #070707;
}

.careers.is-dark .careers-hero {
  background-color: #0f0f0f;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.15px, transparent 1.15px);
}

.careers.is-dark h1,
.careers.is-dark h2,
.careers.is-dark h3 {
  color: #f7f7f7;
}

.careers.is-dark .job-card {
  background: #141414;
  box-shadow: none;
  border: 1px solid #262626;
}

.careers.is-dark .job-card span,
.careers.is-dark .job-card a {
  border-color: #333;
}

.careers.is-dark .job-card .bg-white,
.careers.is-dark .border-\[\#f0d2d0\] {
  background: #101010;
}

.careers.is-dark p,
.careers.is-dark .text-\[\#6f6a67\],
.careers.is-dark .text-\[\#8a8582\] {
  color: #9a9592;
}

.careers.is-dark .offers-glow {
  opacity: 0.25;
}
</style>
