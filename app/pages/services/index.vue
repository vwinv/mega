<template>
  <div class="hub" :class="theme === 'dark' && 'is-dark'">
    <section class="hub-hero px-6 pb-16 sm:px-10 lg:px-14">
      <p class="reveal flex w-fit items-center gap-2 rounded-full border border-[#f0d2d0] bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#e44545]">
        <span class="h-1.5 w-1.5 rounded-full bg-[#e44545]" aria-hidden="true"></span>
        {{ t.badge }}
      </p>
      <div class="mt-6 grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <h1 class="reveal max-w-3xl whitespace-pre-line text-5xl font-extrabold leading-[0.95] tracking-tight text-[#111] sm:text-6xl lg:text-7xl" style="transition-delay: 80ms">
          {{ t.title }}
        </h1>
        <div class="reveal max-w-md pb-2" style="transition-delay: 160ms">
          <p class="text-sm leading-7 text-[#6f6a67] sm:text-[15px]">{{ t.lead }}</p>
          <NuxtLink to="/contact" class="mt-6 inline-flex items-center rounded-full bg-[#e44545] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-110">
            {{ t.quote }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="px-6 py-8 sm:px-10 lg:px-14">
      <div class="grid gap-5 lg:grid-cols-3">
        <article v-for="(item, i) in t.expertises" :key="item.title" class="expertise-card reveal flex flex-col rounded-[1.7rem] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] sm:p-7" :style="{ transitionDelay: `${i * 120}ms` }">
          <div class="flex items-start justify-between">
            <p class="text-4xl font-extrabold tracking-tight text-[#e44545]">{{ item.num }}</p>
            <NuxtLink :to="item.to" class="expertise-plus inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#ece7e4] text-lg leading-none text-[#111] no-underline hover:border-[#e44545]" :aria-label="t.more">
              +
            </NuxtLink>
          </div>
          <h2 class="mt-8 whitespace-pre-line text-[1.65rem] font-extrabold leading-tight tracking-tight text-[#111]">{{ item.title }}</h2>
          <p class="expertise-lead mt-3 text-sm leading-6 text-[#6f6a67]">{{ item.lead }}</p>
          <ul class="mt-5 flex flex-wrap gap-2">
            <li v-for="point in item.points" :key="point" class="expertise-tag rounded-full border border-[#ece7e4] px-3 py-1.5 text-xs font-medium text-[#3a3a3a]">
              {{ point }}
            </li>
          </ul>
          <div class="mt-auto flex flex-wrap gap-3 pt-8">
            <NuxtLink :to="item.to" class="inline-flex items-center rounded-full bg-[#e44545] px-4 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-110">
              {{ t.more }}
            </NuxtLink>
            <NuxtLink to="/contact" class="expertise-quote inline-flex items-center rounded-full border border-[#ece7e4] bg-white px-4 py-2.5 text-sm font-semibold text-[#111] no-underline hover:border-[#e44545]">
              {{ t.quoteShort }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <section id="solutions" class="solutions-wrap px-6 pb-6 pt-10 sm:px-10 lg:px-14">
      <div class="solutions-glow" aria-hidden="true"></div>
      <div class="solutions-panel relative rounded-[2rem] bg-white px-6 py-10 shadow-[0_16px_50px_rgba(0,0,0,0.04)] sm:px-10 sm:py-12">
        <h2 class="reveal text-4xl font-extrabold tracking-tight text-[#111] sm:text-5xl">
          {{ t.our }}
          <span class="ml-2 inline-block rounded-xl bg-[#e44545] px-3 py-1 text-white">{{ t.solutionsWord }}</span>
        </h2>
        <p class="solutions-lead reveal mt-4 max-w-xl text-sm leading-6 text-[#8a8582]" style="transition-delay: 80ms">{{ t.solutionsLead }}</p>
        <div class="mt-8 grid gap-4 lg:grid-cols-3">
          <article v-for="(item, i) in t.solutions" :key="item.title" class="solution-card reveal flex flex-col rounded-[1.4rem] bg-[#111] p-6 text-white" :style="{ transitionDelay: `${i * 90}ms` }">
            <h3 class="text-2xl font-extrabold">{{ item.title }}</h3>
            <p class="solution-body mt-3 text-sm leading-6 text-white/70">{{ item.body }}</p>
            <div class="mt-auto flex flex-wrap gap-2 pt-8 empty:hidden">
              <!--
              <NuxtLink to="/nos-solutions" class="inline-flex w-fit items-center rounded-full bg-[#e44545] px-4 py-2 text-sm font-semibold text-white no-underline hover:brightness-110">
                {{ t.demo }}
              </NuxtLink>
              -->
              <a
                v-if="item.site"
                :href="item.site"
                target="_blank"
                rel="noopener noreferrer"
                class="solution-visit inline-flex w-fit items-center rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white no-underline hover:border-white"
              >
                {{ t.visit }}
              </a>
            </div>
          </article>
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
            <label class="sr-only" for="hub-email">{{ t.email }}</label>
            <input
              id="hub-email"
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

const copy = {
  fr: {
    badge: 'SERVICES',
    title: 'Des expertises\nau service de\nvotre croissance.',
    lead: 'Audit, conseil et stratégie pour vous aider à prendre les bonnes décisions.',
    quote: 'Demander un devis →',
    quoteShort: 'Demander un devis',
    more: 'En savoir plus →',
    our: 'Notre',
    solutionsWord: 'solutions',
    solutionsLead: 'Nous concevons des outils performants, pensés pour vos enjeux métiers.',
    demo: 'Démo →',
    visit: 'Voir le site →',
    ctaTitle: 'Un projet en tête ?',
    ctaBody: 'Dites quelque chose pour démarrer une discussion en direct !',
    email: 'Votre adresse e-mail',
    contactCta: 'Contactez-nous',
    expertises: [
      {
        num: '01',
        title: 'Conception de solutions\ndigitales',
        lead: "Conception d'expériences utilisateurs modernes et performantes.",
        points: ['UX/UI design', 'Architecture technique', 'Conception de solutions adaptées au métier du client'],
        to: '/services/conception-de-solutions-digitales',
      },
      {
        num: '02',
        title: 'Développement &\ninfrastructure',
        lead: 'Nous concevons et déployons des solutions technologiques robustes et évolutives pour soutenir la croissance et la performance de votre entreprise.',
        points: [
          'Digitalisation des processus',
          'Développement de plateformes web/mobile',
          'Migration cloud',
          "Mise en place d'infrastructure cloud (par exemple sur Amazon Web Services)",
        ],
        to: '/services/developpement-infrastructure',
      },
      {
        num: '03',
        title: 'Solutions intelligentes (IA)',
        lead: "Mettre l'intelligence artificielle au service de votre performance et de votre innovation.",
        points: ['Automatisation avec IA', 'Analyse de données', 'Assistants intelligents pour entreprises'],
        to: '/services/solutions-intelligentes-ia',
      },
    ],
    solutions: [
      { title: 'Drop One', body: 'Développez votre réseau, partagez votre identité professionnelle et saisissez de nouvelles opportunités avec DropOne, votre carte de visite numérique en un instant.', site: 'https://www.dropone.pro/' },
      { title: 'CRM', body: 'Pilotez vos relations clients et vos ventes depuis un seul outil.', site: '' },
      { title: 'Boutique', body: 'Une boutique en ligne prête à vendre, pensée pour le mobile.', site: '' },
      { title: 'Pourpre', body: 'Description à fournir.', site: '' },
    ],
  },
  en: {
    badge: 'SERVICES',
    title: 'Expertise\nto support\nyour growth.',
    lead: 'Audit, advisory, and strategy to help you make the right decisions.',
    quote: 'Request a quote →',
    quoteShort: 'Request a quote',
    more: 'Learn more →',
    our: 'Our',
    solutionsWord: 'solutions',
    solutionsLead: 'We design high-performing tools, shaped around your business needs.',
    demo: 'Demo →',
    visit: 'Visit the site →',
    ctaTitle: 'A project in mind?',
    ctaBody: 'Say something to start a conversation right away.',
    email: 'Your email address',
    contactCta: 'Contact us',
    expertises: [
      {
        num: '01',
        title: 'Digital solution\ndesign',
        lead: 'Design of modern, high-performing user experiences.',
        points: ['UX/UI design', 'Technical architecture', 'Solutions shaped around your business'],
        to: '/services/conception-de-solutions-digitales',
      },
      {
        num: '02',
        title: 'Development &\ninfrastructure',
        lead: 'We design and deploy robust, scalable technology solutions to support your company’s growth and performance.',
        points: [
          'Process digitalization',
          'Web and mobile platform development',
          'Cloud migration',
          'Cloud infrastructure setup (for example on Amazon Web Services)',
        ],
        to: '/services/developpement-infrastructure',
      },
      {
        num: '03',
        title: 'Smart solutions (AI)',
        lead: 'Use artificial intelligence to drive your performance and innovation.',
        points: ['AI automation', 'Data analysis', 'Intelligent business assistants'],
        to: '/services/solutions-intelligentes-ia',
      },
    ],
    solutions: [
      { title: 'Drop One', body: 'Grow your network, share your professional identity and seize new opportunities with DropOne, your digital business card in an instant.', site: 'https://www.dropone.pro/' },
      { title: 'CRM', body: 'Run customer relationships and sales from a single tool.', site: '' },
      { title: 'Boutique', body: 'An online store ready to sell, designed for mobile.', site: '' },
      { title: 'Pourpre', body: 'Description to be provided.', site: '' },
    ],
  },
} as const

const t = computed(() => copy[locale.value])

function goContact() {
  router.push({ path: '/contact', query: { email: email.value } })
}

usePageSeo({
  title: computed(() => (locale.value === 'fr' ? 'Services' : 'Services')),
  description: computed(() => t.value.lead),
  path: '/services',
  image: '/assets/headerservices.png',
})
</script>

<style scoped>
.hub {
  background: #f3f1ef;
  color: #111;
}

.hub-hero {
  margin-top: -4.25rem;
  padding-top: 7.5rem;
  background-color: #fff;
  background-image: radial-gradient(rgba(190, 182, 178, 0.45) 1.1px, transparent 1.1px);
  background-size: 22px 22px;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}

.solutions-wrap {
  position: relative;
  scroll-margin-top: 6rem;
}

.solutions-glow {
  position: absolute;
  left: 50%;
  top: 0;
  width: 36rem;
  height: 10rem;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(248, 196, 196, 0.85) 0%, rgba(248, 203, 203, 0) 70%);
  pointer-events: none;
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
</style>
