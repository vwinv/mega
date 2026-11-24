<template>
  <div class="service-page" :class="theme === 'dark' && 'is-dark'">
    <section class="service-hero px-6 pb-16 pt-8 sm:px-10 lg:px-14">
      <NuxtLink to="/services" class="reveal inline-flex items-center gap-2 text-sm font-semibold text-[#e44545] no-underline hover:brightness-110">
        <span aria-hidden="true">←</span>
        {{ t.back }}
      </NuxtLink>
      <p class="reveal mt-8 flex w-fit items-center gap-2 rounded-full border border-[#f0d2d0] bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#e44545]" style="transition-delay: 70ms">
        <span class="h-1.5 w-1.5 rounded-full bg-[#e44545]" aria-hidden="true"></span>
        {{ t.badge }}
      </p>
      <div class="mt-6 grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <h1 class="reveal max-w-3xl whitespace-pre-line text-5xl font-extrabold leading-[0.95] tracking-tight text-[#111] sm:text-6xl lg:text-7xl" style="transition-delay: 120ms">
          {{ t.title }}
        </h1>
        <div class="reveal max-w-md pb-2" style="transition-delay: 180ms">
          <p class="text-sm leading-7 text-[#6f6a67] sm:text-[15px]">{{ t.lead }}</p>
          <NuxtLink to="/contact" class="mt-6 inline-flex items-center rounded-full bg-[#e44545] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-110">
            {{ t.quote }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section ref="workRef" class="work relative px-6 py-16 sm:px-10 lg:px-14" :class="workVisible && 'is-in'">
      <div class="work-glow" aria-hidden="true"></div>
      <div class="relative grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div class="rise">
          <p class="work-num font-extrabold leading-none tracking-tight text-[#e44545]">03</p>
          <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-[#111] sm:text-4xl">{{ t.what }}</h2>
        </div>
        <ul class="rise space-y-3" style="transition-delay: 120ms">
          <li v-for="(item, i) in t.tasks" :key="item" class="work-item flex items-center gap-4 rounded-full bg-white px-5 py-4 text-sm font-semibold text-[#111] shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <span class="shrink-0 text-[#b0aaa6]">0{{ i + 1 }}</span>
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <div class="reveal overflow-hidden py-6" aria-hidden="true">
      <div class="marquee flex w-max items-center gap-8">
        <template v-for="copyIndex in 2" :key="copyIndex">
          <span v-for="word in t.marquee" :key="`${copyIndex}-${word}`" class="flex items-center gap-8 text-4xl font-extrabold tracking-tight text-[#111] sm:text-6xl">
            {{ word }}
            <svg class="h-4 w-4 text-[#e44545] sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l2.2 9.8L24 12l-9.8 2.2L12 24l-2.2-9.8L0 12l9.8-2.2z" />
            </svg>
          </span>
        </template>
      </div>
    </div>

    <section ref="approachRef" class="approach px-6 py-12 sm:px-10 lg:px-14" :class="approachVisible && 'is-in'">
      <h2 class="rise text-3xl font-extrabold tracking-tight text-[#111] sm:text-4xl">{{ t.approach }}</h2>
      <div class="mt-8 grid gap-4 lg:grid-cols-3">
        <article
          v-for="(step, i) in t.steps"
          :key="step.title"
          class="rise rounded-[1.4rem] p-6"
          :class="step.tone"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <p class="text-xs font-bold" :class="step.num">0{{ i + 1 }}</p>
          <h3 class="mt-8 text-xl font-extrabold">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-6" :class="step.body">{{ step.text }}</p>
        </article>
      </div>

      <div class="rise mt-10" style="transition-delay: 180ms">
        <p class="text-xs font-medium text-[#9a9592]">{{ t.others }}</p>
        <div class="mt-3 flex flex-wrap gap-3">
          <NuxtLink
            v-for="item in t.otherItems"
            :key="item.label"
            :to="item.to"
            class="other-link inline-flex items-center rounded-full border border-[#e6e1de] bg-white px-4 py-2.5 text-sm font-semibold text-[#111] no-underline hover:border-[#e44545]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="cta relative px-6 pt-16 sm:px-10 lg:px-14">
      <div class="cta-glow" aria-hidden="true"></div>
      <div class="relative grid items-end gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="reveal pb-14 lg:pb-20">
          <h2 class="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111] sm:text-5xl lg:text-[3.35rem]">{{ t.ctaTitle }}</h2>
          <p class="mt-4 text-sm text-[#9a9592] sm:text-[15px]">{{ t.ctaBody }}</p>
          <form class="cta-form mt-7 flex max-w-md items-center rounded-full border border-[#ece7e4] bg-white p-1.5 shadow-[0_10px_30px_rgba(180,80,80,0.06)]" @submit.prevent="goContact">
            <label class="sr-only" for="ia-email">{{ t.email }}</label>
            <input
              id="ia-email"
              v-model="email"
              type="email"
              required
              :placeholder="t.email"
              class="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-[#111] outline-none placeholder:text-[#b7b1ad]"
            />
            <button type="submit" class="shrink-0 rounded-full bg-[#e44545] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110">
              {{ t.contactCta }}
            </button>
          </form>
        </div>
        <div class="reveal flex justify-center lg:justify-end" style="transition-delay: 160ms">
          <div class="cta-arch">
            <img src="/assets/cta-mail.svg?v=3" alt="" class="cta-mail" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const theme = useState<'light' | 'dark'>('mega-theme', () => 'light')
const email = ref('')
const router = useRouter()
const { el: workRef, visible: workVisible } = useOnceReveal({ threshold: 0.2 })
const { el: approachRef, visible: approachVisible } = useOnceReveal({ threshold: 0.15 })

const copy = {
  fr: {
    back: 'Tous les services',
    badge: 'EXPERTISE 03',
    title: 'Solutions\nintelligentes (IA)',
    lead: "Mettre l'intelligence artificielle au service de votre performance et de votre innovation.",
    quote: 'Demander un devis →',
    what: 'Ce que nous faisons',
    tasks: [
      'Automatisation avec IA',
      'Analyse de données',
      'Assistants intelligents pour entreprises',
    ],
    marquee: ['Comprendre', 'Orienter', 'Construire'],
    approach: 'Notre approche',
    steps: [
      { title: 'Comprendre', text: 'Analyse de votre environnement et identification des risques.', tone: 'bg-white text-[#111]', num: 'text-[#c4bfbb]', body: 'text-[#6f6a67]' },
      { title: 'Orienter', text: "Définition d'une stratégie digitale efficace et durable.", tone: 'bg-[#f6cfcb] text-[#111]', num: 'text-[#c48884]', body: 'text-[#5c403e]' },
      { title: 'Construire', text: 'Conception et déploiement de solutions sur mesure.', tone: 'bg-[#e44545] text-white', num: 'text-white/70', body: 'text-white/90' },
    ],
    others: 'Autres expertises',
    otherItems: [
      { label: '01 · Conception de solutions digitales ↗', to: '/services/conception-de-solutions-digitales' },
      { label: '02 · Développement & infrastructure ↗', to: '/services/developpement-infrastructure' },
      { label: '04 · Branding ↗', to: '/services/branding' },
    ],
    ctaTitle: 'Un projet en tête ?',
    ctaBody: 'Dites quelque chose pour démarrer une discussion en direct !',
    email: 'Votre adresse e-mail',
    contactCta: 'Contactez-nous',
  },
  en: {
    back: 'All services',
    badge: 'EXPERTISE 03',
    title: 'Smart\nsolutions (AI)',
    lead: 'Use artificial intelligence to drive your performance and innovation.',
    quote: 'Request a quote →',
    what: 'What we do',
    tasks: [
      'AI automation',
      'Data analysis',
      'Intelligent business assistants',
    ],
    marquee: ['Understand', 'Guide', 'Build'],
    approach: 'Our approach',
    steps: [
      { title: 'Understand', text: 'Analysis of your environment and identification of the risks.', tone: 'bg-white text-[#111]', num: 'text-[#c4bfbb]', body: 'text-[#6f6a67]' },
      { title: 'Guide', text: 'Definition of an effective and lasting digital strategy.', tone: 'bg-[#f6cfcb] text-[#111]', num: 'text-[#c48884]', body: 'text-[#5c403e]' },
      { title: 'Build', text: 'Design and rollout of tailor-made solutions.', tone: 'bg-[#e44545] text-white', num: 'text-white/70', body: 'text-white/90' },
    ],
    others: 'Other expertise',
    otherItems: [
      { label: '01 · Digital solution design ↗', to: '/services/conception-de-solutions-digitales' },
      { label: '02 · Development & infrastructure ↗', to: '/services/developpement-infrastructure' },
      { label: '04 · Branding ↗', to: '/services/branding' },
    ],
    ctaTitle: 'A project in mind?',
    ctaBody: 'Say something to start a conversation right away.',
    email: 'Your email address',
    contactCta: 'Contact us',
  },
} as const

const t = computed(() => copy[locale.value])

function goContact() {
  router.push({ path: '/contact', query: { email: email.value } })
}

usePageSeo({
  title: computed(() => (locale.value === 'fr' ? 'Solutions intelligentes (IA)' : 'Smart solutions (AI)')),
  description: computed(() => t.value.lead),
  path: '/services/solutions-intelligentes-ia',
  image: '/assets/ia.png',
})
</script>

<style scoped>
.service-page {
  background: #f3f1ef;
  color: #111;
}

.service-hero {
  background-color: #fff;
  background-image: radial-gradient(rgba(190, 182, 178, 0.45) 1.1px, transparent 1.1px);
  background-size: 22px 22px;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}

.work-num {
  font-size: 6.5rem;
}

@media (min-width: 640px) {
  .work-num { font-size: 8.5rem; }
}

.work-glow {
  position: absolute;
  left: 0;
  top: 30%;
  width: 28rem;
  height: 24rem;
  background: radial-gradient(ellipse at center, rgba(248, 196, 196, 0.95) 0%, rgba(248, 203, 203, 0.4) 42%, rgba(243, 241, 239, 0) 72%);
  pointer-events: none;
}

.rise {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-in .rise {
  opacity: 1;
  transform: none;
}

.marquee {
  animation: service-marquee 22s linear infinite;
}

@keyframes service-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.cta-glow {
  position: absolute;
  left: 34%;
  top: 46%;
  width: 46rem;
  height: 28rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(ellipse at center, rgba(248, 196, 196, 0.95) 0%, rgba(248, 203, 203, 0.55) 38%, rgba(243, 241, 239, 0) 72%);
  pointer-events: none;
}

.cta-arch {
  display: flex;
  width: min(100%, 30rem);
  height: 24rem;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  margin-bottom: -1.5rem;
  border-radius: 15rem 15rem 0 0;
  background: #fff;
}

.cta-mail {
  width: 88%;
  margin-bottom: 0.35rem;
}

@media (prefers-reduced-motion: reduce) {
  .marquee { animation: none; }
  .rise {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
