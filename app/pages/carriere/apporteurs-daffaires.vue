<template>
  <div class="offer" :class="theme === 'dark' && 'is-dark'">
    <section class="offer-hero px-6 pb-10 sm:px-10 lg:px-14">
      <NuxtLink
        to="/carriere"
        class="reveal inline-flex items-center gap-2 text-sm font-semibold text-[#e44545] no-underline hover:brightness-110"
      >
        <span aria-hidden="true">←</span>
        {{ t.back }}
      </NuxtLink>

      <p class="reveal mt-6 flex w-fit items-center gap-2 rounded-full border border-[#f0d2d0] bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#e44545]">
        <span class="h-1.5 w-1.5 rounded-full bg-[#e44545]" aria-hidden="true"></span>
        {{ t.badge }}
      </p>

      <div class="mt-6 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <h1
          class="reveal max-w-3xl whitespace-pre-line text-5xl font-extrabold leading-[1.05] tracking-tight text-[#111] sm:text-6xl lg:text-7xl"
          style="transition-delay: 80ms"
        >
          {{ t.title }}
        </h1>
        <div class="reveal max-w-md" style="transition-delay: 140ms">
          <p class="text-sm leading-7 text-[#6f6a67] sm:text-[15px]">{{ t.lead }}</p>
          <a
            href="#postuler"
            class="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#e44545] px-5 text-sm font-semibold text-white no-underline hover:brightness-110"
          >
            {{ t.apply }}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div class="reveal mt-10 flex flex-wrap gap-2">
        <span
          v-for="tag in t.tags"
          :key="tag"
          class="offer-tag inline-flex rounded-full border border-[#f0d2d0]/70 px-3.5 py-1.5 text-[12px] font-medium text-[#111]"
        >
          {{ tag }}
        </span>
      </div>
    </section>

    <section class="relative px-6 pb-16 pt-10 sm:px-10 lg:px-14">
      <div class="offers-glow" aria-hidden="true"></div>

      <div class="relative reveal grid gap-4 lg:grid-cols-3">
        <article
          v-for="(block, i) in t.blocks"
          :key="block.title"
          class="offer-card rounded-[1.7rem] border border-[#ece7e4] bg-white p-6 sm:p-7"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <p class="text-[11px] font-bold tracking-[0.14em] text-[#e44545]">
            {{ String(i + 1).padStart(2, '0') }}
          </p>
          <h2 class="mt-3 text-xl font-extrabold tracking-tight text-[#111] sm:text-2xl">{{ block.title }}</h2>
          <ul class="mt-5 space-y-3 text-sm leading-6 text-[#6f6a67]">
            <li v-for="point in block.points" :key="point" class="flex gap-2.5">
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e44545]" aria-hidden="true"></span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="relative px-6 pb-16 sm:px-10 lg:px-14">
      <div class="offers-glow offers-glow--soft" aria-hidden="true"></div>

      <h2 class="reveal relative text-4xl font-extrabold tracking-tight text-[#111] sm:text-5xl">
        {{ t.howTitle }}
      </h2>

      <div class="relative mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(step, i) in t.how"
          :key="step.title"
          class="how-card reveal flex min-h-[15rem] flex-col rounded-[1.6rem] p-6 sm:p-7"
          :class="`how-card--${i + 1}`"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <p class="text-[12px] font-bold tracking-[0.08em]" :class="step.tone === 'light' ? 'text-[#e44545]' : 'text-white/70'">
            {{ String(i + 1).padStart(2, '0') }}
          </p>
          <h3
            class="mt-8 text-xl font-extrabold tracking-tight sm:text-[1.35rem]"
            :class="step.tone === 'light' ? 'text-[#111]' : 'text-white'"
          >
            {{ step.title }}
          </h3>
          <p
            class="mt-3 text-sm leading-6"
            :class="step.tone === 'light' ? 'text-[#6f6a67]' : 'text-white/80'"
          >
            {{ step.body }}
          </p>
        </article>
      </div>
    </section>

    <section class="px-6 pb-20 sm:px-10 lg:px-14">
      <CareerApplyForm />
    </section>
  </div>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const theme = useState<'light' | 'dark'>('mega-theme', () => 'light')

const copy = {
  fr: {
    back: 'Toutes les offres',
    badge: 'APPEL À CANDIDATURES · FREELANCE',
    title: "Apporteurs\nd’affaires",
    lead:
      'MEGA recherche des apporteurs d’affaires pour présenter nos solutions digitales (sites, apps, IA, cloud, branding) à leur réseau et générer des opportunités business.',
    apply: 'Postuler',
    tags: ['Freelance', 'Rémunération à la commission', 'Dakar', 'Ouvert à tous les profils'],
    blocks: [
      {
        title: 'Votre mission',
        points: [
          'Repérer des entreprises qui ont un besoin digital',
          'Présenter MEGA et ses services à votre réseau',
          'Mettre les prospects en relation avec notre équipe',
          'Suivre la relation jusqu’à la signature',
        ],
      },
      {
        title: 'Votre profil',
        points: [
          'Un bon réseau professionnel (PME, grands comptes, institutions…)',
          'Aisance relationnelle et sens de la négociation',
          'Intérêt pour le digital et les nouvelles technologies',
          'Une expérience commerciale est un plus, pas une obligation',
        ],
      },
      {
        title: 'Ce que nous offrons',
        points: [
          'Une commission attractive sur chaque contrat signé',
          'Une liberté totale d’organisation',
          'Des supports de présentation et un accompagnement',
          'Une collaboration durable avec une équipe engagée',
        ],
      },
    ],
    howTitle: 'Comment ça marche',
    how: [
      {
        title: 'Vous repérez',
        body: 'Un contact a un projet de site, d’application ou de digitalisation.',
        tone: 'light' as const,
      },
      {
        title: 'Vous nous présentez',
        body: 'Vous nous mettez en relation, nous préparons l’offre ensemble.',
        tone: 'light' as const,
      },
      {
        title: 'Le contrat est signé',
        body: 'MEGA finalise la proposition avec le client et signe le contrat.',
        tone: 'dark' as const,
      },
      {
        title: 'Vous êtes rémunéré',
        body: 'Vous touchez votre commission une fois le contrat signé.',
        tone: 'dark' as const,
      },
    ],
  },
  en: {
    back: 'All roles',
    badge: 'CALL FOR APPLICATIONS · FREELANCE',
    title: 'Business\nintroducers',
    lead:
      'MEGA is looking for business introducers to present our digital solutions (websites, apps, AI, cloud, branding) to their network and generate business opportunities.',
    apply: 'Apply',
    tags: ['Freelance', 'Commission-based pay', 'Dakar', 'Open to all profiles'],
    blocks: [
      {
        title: 'Your mission',
        points: [
          'Identify companies with a digital need',
          'Present MEGA and its services to your network',
          'Connect prospects with our team',
          'Follow the relationship through to signing',
        ],
      },
      {
        title: 'Your profile',
        points: [
          'A strong professional network (SMEs, large accounts, institutions…)',
          'Comfortable with relationships and negotiation',
          'Interest in digital and new technologies',
          'Sales experience is a plus, not a requirement',
        ],
      },
      {
        title: 'What we offer',
        points: [
          'An attractive commission on every signed contract',
          'Full freedom of organization',
          'Presentation materials and support',
          'A lasting collaboration with a committed team',
        ],
      },
    ],
    howTitle: 'How it works',
    how: [
      {
        title: 'You spot the need',
        body: 'A contact has a website, app, or digitalization project.',
        tone: 'light' as const,
      },
      {
        title: 'You introduce us',
        body: 'You connect us, we prepare the offer together.',
        tone: 'light' as const,
      },
      {
        title: 'The contract is signed',
        body: 'MEGA finalizes the proposal with the client and signs the contract.',
        tone: 'dark' as const,
      },
      {
        title: 'You get paid',
        body: 'You receive your commission once the contract is signed.',
        tone: 'dark' as const,
      },
    ],
  },
} as const

const t = computed(() => copy[locale.value])

usePageSeo({
  title: computed(() => (locale.value === 'en' ? 'Business introducers' : "Apporteurs d'affaires")),
  description: computed(() => t.value.lead),
  path: '/carriere/apporteurs-daffaires',
})
</script>

<style scoped>
.offer {
  background: #f3f1ef;
  min-height: 70vh;
}

.offer-hero {
  padding-top: 7.5rem;
  background-color: #fff;
  background-image: radial-gradient(rgba(190, 182, 178, 0.55) 1.15px, transparent 1.15px);
  background-size: 22px 22px;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}

.offer-tag {
  background: rgba(228, 69, 69, 0.03);
}

.offers-glow {
  pointer-events: none;
  position: absolute;
  left: -8%;
  top: 10%;
  width: min(42vw, 28rem);
  height: min(42vw, 28rem);
  border-radius: 999px;
  background: radial-gradient(circle, rgba(228, 69, 69, 0.14) 0%, rgba(228, 69, 69, 0) 70%);
  filter: blur(8px);
}

.offers-glow--soft {
  top: 20%;
  left: -4%;
  background: radial-gradient(circle, rgba(255, 180, 170, 0.35) 0%, rgba(255, 180, 170, 0) 70%);
}

.how-card--1 {
  background: #fff;
  border: 1px solid #ece7e4;
}

.how-card--2 {
  background: #f7e6e4;
}

.how-card--3 {
  background: #111;
}

.how-card--4 {
  background: #e44545;
}

.offer.is-dark {
  background: #070707;
}

.offer.is-dark .offer-hero {
  background-color: #0f0f0f;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.15px, transparent 1.15px);
}

.offer.is-dark h1,
.offer.is-dark h2,
.offer.is-dark h3 {
  color: #f7f7f7;
}

.offer.is-dark .offer-card,
.offer.is-dark .how-card--1 {
  background: #141414;
  border-color: #262626;
}

.offer.is-dark .how-card--2 {
  background: #2a1818;
}

.offer.is-dark p,
.offer.is-dark li,
.offer.is-dark .text-\[\#6f6a67\] {
  color: #9a9592;
}

.offer.is-dark .offer-tag,
.offer.is-dark .border-\[\#f0d2d0\] {
  border-color: #333;
  background: rgba(255, 255, 255, 0.04);
  color: #f7f7f7;
}
</style>
