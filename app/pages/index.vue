<template>
  <div ref="homeRef" class="home" :class="theme === 'dark' && 'is-dark'">
    <section class="hero relative px-6 pb-16 pt-6 sm:px-10 lg:px-14">
      <span class="spark hero-rise" aria-hidden="true">
        <svg viewBox="0 0 24 24" class="h-8 w-8 text-[#e44545]">
          <path fill="currentColor" d="M12 0l1.6 8.2L22 12l-8.4 1.8L12 24l-1.6-10.2L2 12l8.4-1.8z" />
        </svg>
      </span>

      <h1 class="hero-rise hero-rise-2 mx-auto max-w-4xl text-center text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-[var(--ink)] sm:text-6xl lg:text-[5.35rem]">
        {{ t.heroLead }}<br />
        {{ t.heroMid }}<br />
        <span class="text-[#e44545]">{{ t.heroEnd }}</span>
      </h1>

      <div class="mx-auto mt-8 grid items-center gap-8 lg:mt-4 lg:grid-cols-[0.85fr_1.15fr_0.9fr] lg:items-start">
        <div class="hero-rise hero-rise-3 max-w-xs lg:pt-10">
          <p class="text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]">
            {{ t.heroBody }}
          </p>
          <NuxtLink
            to="/services"
            class="mt-5 inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline shadow-sm hover:border-[#e44545]"
          >
            {{ t.ourServices }}
          </NuxtLink>
        </div>

        <div class="hero-visual hero-rise hero-rise-4">
          <div class="hero-halo" aria-hidden="true"></div>
          <div class="hero-dash" aria-hidden="true"></div>
          <img
            src="/assets/accueil.svg?v=2"
            alt=""
            class="hero-illu"
            width="360"
            height="440"
          />
          <div class="hero-actions">
            <NuxtLink to="/contact" class="rounded-full bg-[#e44545] px-4 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-110 sm:px-5">
              {{ t.start }}
            </NuxtLink>
            <NuxtLink to="/projet" class="rounded-full px-4 py-2.5 text-sm font-semibold text-white no-underline hover:text-white/80 sm:px-5">
              {{ t.seeProjects }}
            </NuxtLink>
          </div>
        </div>

        <div class="hero-rise hero-rise-5 text-left lg:pt-10 lg:text-right">
          <p class="text-[11px] font-semibold tracking-[0.16em] text-[#e44545]">IA · DATA · CLOUD</p>
          <p class="mt-2 text-xl font-extrabold leading-tight tracking-tight text-[var(--ink)] sm:text-2xl">
            {{ t.vision }}
          </p>
        </div>
      </div>

    </section>

    <section class="relative z-[1] px-6 pt-10 sm:px-10 lg:px-14">
      <div class="stats-bar mx-auto grid grid-cols-3 gap-2 rounded-[1.6rem] bg-[var(--card)] px-4 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:px-8 sm:py-7">
        <div v-for="(stat, i) in t.stats" :key="stat.label" class="reveal text-center" :style="{ transitionDelay: `${i * 110}ms` }">
          <p class="text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
            {{ stat.value }}<span class="text-[#e44545]">+</span>
          </p>
          <p class="mt-1 text-xs text-[var(--muted)] sm:text-sm">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
      <div class="reveal grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <h2 class="text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">{{ t.talkTitle }}</h2>
        <div class="max-w-xl text-[15px] leading-7 text-[var(--muted)]">
          <p>{{ t.talkBody }}</p>
          <p class="mt-4 font-bold text-[var(--ink)]">{{ t.talkQuote }}</p>
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <article class="talk-card reveal relative min-h-[240px] overflow-hidden rounded-[1.6rem] bg-[var(--card)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)]" style="transition-delay: 120ms">
          <img src="/assets/loupe.svg" alt="" class="mx-auto h-52 w-auto object-contain" />
          <span class="absolute bottom-5 left-5 rounded-full bg-[#e44545] px-3 py-1.5 text-xs font-semibold text-white">
            {{ t.vision }}
          </span>
        </article>
        <article class="talk-card reveal relative min-h-[240px] overflow-hidden rounded-[1.6rem] bg-[var(--card)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)]" style="transition-delay: 240ms">
          <img src="/assets/chat.svg" alt="" class="mx-auto h-52 w-auto object-contain" />
          <NuxtLink to="/a-propos" class="talk-link absolute bottom-5 right-5 text-sm font-semibold text-[var(--ink)] no-underline hover:text-[#e44545]">
            {{ t.discover }}
          </NuxtLink>
        </article>
      </div>
    </section>

    <section class="px-6 pb-8 sm:px-10 lg:px-14">
      <div class="services-card reveal relative mx-auto grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[var(--card)] shadow-[0_16px_50px_rgba(0,0,0,0.04)] lg:grid-cols-[1.15fr_0.9fr_0.85fr]">
        <span class="services-tab">{{ t.whatWeDo }}</span>

        <div class="lg:pl-8">
          <h2 class="text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            {{ t.servicesLead }}
            <span class="ml-1 inline-block rounded-xl bg-[#e44545] px-2.5 py-0.5 text-white">{{ t.servicesWord }}</span>
          </h2>
          <p class="mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">{{ t.servicesBody }}</p>
          <ul class="mt-6 space-y-3">
            <li v-for="(item, i) in t.serviceItems" :key="item">
              <NuxtLink
                to="/services"
                class="service-row reveal-in flex items-center justify-between rounded-full border px-4 py-3.5 text-sm font-semibold text-[var(--ink)] no-underline"
                :style="{ transitionDelay: `${160 + i * 120}ms` }"
              >
                <span><span class="mr-3 text-[var(--muted)]">0{{ i + 1 }}</span>{{ item }}</span>
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="code-stage reveal-in mx-auto w-full max-w-sm" style="transition-delay: 180ms">
          <div class="code-glow" aria-hidden="true"></div>
          <img src="/assets/code.svg" alt="" class="code-float relative w-full" />
        </div>

        <div class="flex flex-col gap-4">
          <div class="results-card reveal-in rounded-[1.4rem] bg-[var(--soft)] p-5" style="transition-delay: 80ms">
            <p class="text-sm leading-6 text-[var(--muted)]">{{ t.results }}</p>
            <NuxtLink to="/projet" class="mt-6 flex items-center justify-between text-lg font-extrabold text-[var(--ink)] no-underline">
              {{ t.seeWork }}
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-sm" aria-hidden="true">↗</span>
            </NuxtLink>
          </div>
          <NuxtLink to="/contact" class="reveal-in rounded-[1.4rem] bg-[#e44545] p-5 text-white no-underline hover:brightness-110" style="transition-delay: 200ms">
            <p class="text-lg font-extrabold">{{ t.idea }}</p>
            <span class="mt-8 flex items-center justify-between text-sm font-semibold">
              {{ t.talkExpert }}
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white" aria-hidden="true">→</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <div class="reveal overflow-hidden py-8" aria-hidden="true">
      <div class="marquee flex w-max items-center gap-8">
        <template v-for="copyIndex in 2" :key="copyIndex">
          <span v-for="word in t.marquee" :key="`${copyIndex}-${word}`" class="flex items-center gap-8 text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-6xl">
            {{ word }}
            <svg class="h-4 w-4 text-[#e44545] sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0l2.2 9.8L24 12l-9.8 2.2L12 24l-2.2-9.8L0 12l9.8-2.2z" />
            </svg>
          </span>
        </template>
      </div>
    </div>

    <div class="px-6 sm:px-10 lg:px-14" aria-hidden="true">
      <div class="band-rule h-px bg-[#e8e4e1]"></div>
    </div>

    <section class="mx-auto px-6 py-8 sm:px-10 lg:px-14">
      <div class="reveal mb-6 flex items-end justify-between gap-4">
        <h2 class="text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
          {{ t.projectsLead }}
          <span class="ml-1 inline-block rounded-xl bg-[#e44545] px-2.5 py-0.5 text-white">{{ t.projectsWord }}</span>
        </h2>
        <NuxtLink to="/projet" class="all-projects shrink-0 text-sm font-semibold text-[var(--muted)] no-underline hover:text-[var(--ink)]">
          {{ t.allProjects }}
        </NuxtLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article v-for="(project, i) in projects" :key="project.title" class="project-card reveal rounded-[1.5rem] bg-[var(--card)] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.03)]" :style="{ transitionDelay: `${i * 120}ms` }">
          <div class="project-shot flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-[var(--soft)] p-3">
            <img :src="project.image" :alt="project.title" class="max-h-full max-w-full object-contain" />
          </div>
          <div class="flex items-end justify-between gap-3 px-1 pb-1 pt-4">
            <div>
              <p class="text-[10px] font-bold tracking-[0.12em] text-[#e44545]">{{ project.kind }}</p>
              <h3 class="mt-1 text-sm font-bold text-[var(--ink)]">{{ project.title }}</h3>
            </div>
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="project-arrow inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] no-underline"
              :aria-label="project.title"
            >
              ↗
            </a>
          </div>
        </article>
      </div>
    </section>

    <section class="mx-auto px-6 py-10 sm:px-10 lg:px-14">
      <div class="team-shell rounded-[1.75rem] bg-[var(--card)] px-6 py-8 sm:px-10 sm:py-9">
        <h2 class="reveal text-left text-[1.7rem] font-extrabold leading-none tracking-tight text-[var(--ink)] sm:text-[2rem]">
          {{ t.teamLead }}
          <span class="ml-2 inline-flex translate-y-[-0.08em] items-center rounded-lg bg-[#e44545] px-2.5 py-1 align-middle text-[0.62em] font-extrabold leading-none text-white">MEGA</span>
        </h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <NuxtLink
            v-for="(member, i) in team"
            :key="member.name"
            to="/a-propos"
            class="team-pill reveal flex items-center gap-3 rounded-full bg-[#111] py-2 pl-2 pr-5 text-white no-underline"
            :style="{ transitionDelay: `${120 + i * 140}ms` }"
          >
            <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e44545] text-[11px] font-extrabold tracking-wide">
              {{ member.initials }}
            </span>
            <span class="min-w-0">
              <span class="block truncate text-sm font-semibold leading-tight">{{ member.name }}</span>
              <span class="mt-0.5 block truncate text-[11px] font-semibold leading-tight text-[#e44545]">{{ member.role }}</span>
            </span>
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
            <label class="sr-only" for="home-email">{{ t.email }}</label>
            <input
              id="home-email"
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
const homeRef = ref<HTMLElement | null>(null)
let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  const root = homeRef.value
  if (!root) return
  const nodes = [...root.querySelectorAll<HTMLElement>('.reveal, .reveal-in')]
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((node) => node.classList.add('is-in'))
    return
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        revealObserver?.unobserve(entry.target)
      }
    },
    { threshold: 0.22, rootMargin: '0px 0px -8% 0px' },
  )
  nodes.forEach((node) => revealObserver?.observe(node))
})

onUnmounted(() => revealObserver?.disconnect())

const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const theme = useState<'light' | 'dark'>('mega-theme', () => 'light')
const config = useRuntimeConfig()
const email = ref('')
const router = useRouter()

const content = {
  fr: {
    heroLead: 'Accélérer votre',
    heroMid: 'transformation',
    heroEnd: 'digitale.',
    heroBody: 'Nous accompagnons les entreprises avec une vision stratégique claire et des solutions durables.',
    ourServices: 'Nos services →',
    vision: 'Deux visions. Une excellence.',
    start: 'Démarrer un projet',
    seeProjects: 'Voir nos projets',
    stats: [
      { label: 'Expertises' },
      { label: 'Projets réalisés' },
      { label: 'Solutions' },
    ],
    talkTitle: 'Parlons de MEGA',
    talkBody: "MEGA est une entreprise innovante spécialisée dans la transformation digitale, avec l'ambition de devenir un acteur de référence en Afrique et à l'international.",
    talkQuote: 'Notre ambition : comprendre, orienter et construire des solutions qui créent de la valeur.',
    discover: 'Découvrir MEGA →',
    whatWeDo: 'CE QUE NOUS FAISONS',
    servicesLead: 'Nos',
    servicesWord: 'Services',
    servicesBody: 'Audit, conseil et stratégie pour vous aider à prendre les bonnes décisions.',
    serviceItems: [
      'Conception de solutions digitales',
      'Développement & infrastructure',
      'Solutions intelligentes (IA)',
    ],
    results: 'Des projets concrets. Des résultats mesurables.',
    seeWork: 'Voir nos réalisations',
    idea: 'Un projet en tête ?',
    talkExpert: 'Parler à un expert',
    marquee: ['Orienter', 'Construire', 'Comprendre'],
    projectsLead: 'Nos',
    projectsWord: 'Projets',
    allProjects: 'Tous les projets →',
    teamLead: 'Le génie derrière',
    ctaTitle: 'Un projet en tête ?',
    ctaBody: 'Dites quelque chose pour démarrer une discussion en direct !',
    email: 'Votre adresse e-mail',
    contactCta: 'Contactez-nous',
  },
  en: {
    heroLead: 'Accelerate your',
    heroMid: 'digital',
    heroEnd: 'transformation.',
    heroBody: 'We support companies with a clear strategic vision and lasting solutions.',
    ourServices: 'Our services →',
    vision: 'Two visions. One standard.',
    start: 'Start a project',
    seeProjects: 'See our projects',
    stats: [
      { label: 'Expertises' },
      { label: 'Projects delivered' },
      { label: 'Solutions' },
    ],
    talkTitle: 'Let’s talk about MEGA',
    talkBody: 'MEGA is an innovative company specialized in digital transformation, with the ambition to become a reference player in Africa and internationally.',
    talkQuote: 'Our ambition: understand, guide, and build solutions that create value.',
    discover: 'Discover MEGA →',
    whatWeDo: 'WHAT WE DO',
    servicesLead: 'Our',
    servicesWord: 'Services',
    servicesBody: 'Audit, advisory, and strategy to help you make the right decisions.',
    serviceItems: [
      'Digital solution design',
      'Development & infrastructure',
      'Intelligent solutions (AI)',
    ],
    results: 'Concrete projects. Measurable results.',
    seeWork: 'See our work',
    idea: 'A project in mind?',
    talkExpert: 'Talk to an expert',
    marquee: ['Guide', 'Build', 'Understand'],
    projectsLead: 'Our',
    projectsWord: 'Projects',
    allProjects: 'All projects →',
    teamLead: 'The minds behind',
    ctaTitle: 'A project in mind?',
    ctaBody: 'Say something to start a conversation right away.',
    email: 'Your email address',
    contactCta: 'Contact us',
  },
} as const

const statValues = [
  config.public.statExpertises,
  config.public.statProjets,
  config.public.statSolutions,
]

const t = computed(() => {
  const copy = content[locale.value]
  return {
    ...copy,
    stats: copy.stats.map((stat, index) => ({
      label: stat.label,
      value: statValues[index],
    })),
  }
})

const projects = computed(() => {
  const fr = locale.value === 'fr'
  return [
    {
      kind: fr ? 'SITE WEB · PLATEFORME' : 'WEBSITE · PLATFORM',
      title: 'Commonwealth School',
      image: '/assets/commonwalthsite.png',
      url: 'https://www.commonwealth-school.com/',
    },
    {
      kind: fr ? 'APPLICATION MOBILE' : 'MOBILE APP',
      title: 'Yohride',
      image: '/assets/yohrideapp.png',
      url: 'https://play.google.com/store/apps/details?id=com.yohride.app',
    },
    {
      kind: fr ? 'SITE WEB' : 'WEBSITE',
      title: 'Theta Ingénierie',
      image: '/assets/thetasite.png',
      url: 'https://theta-ingenierie.com/',
    },
    {
      kind: fr ? 'SITE WEB' : 'WEBSITE',
      title: 'Al Madinah boutique',
      image: '/assets/almadinasite.png',
      url: 'https://almadinahboutique.com/boutique/',
    },
  ]
})

const team = computed(() =>
  locale.value === 'fr'
    ? [
        { initials: 'AS', name: 'Aminata Sow', role: 'CEO' },
        { initials: 'NP', name: 'Nielle Pascale Owende Ogowet', role: 'CMO · UX/UI Designer' },
      ]
    : [
        { initials: 'AS', name: 'Aminata Sow', role: 'CEO' },
        { initials: 'NP', name: 'Nielle Pascale Owende Ogowet', role: 'CMO · UX/UI Designer' },
      ],
)

function goContact() {
  router.push({ path: '/contact', query: { email: email.value } })
}

const seoByLocale = {
  fr: {
    title: 'Transformation digitale au Senegal',
    description:
      'MEGA accompagne les entreprises au Senegal dans leur transformation digitale : developpement web, mobile, IA et solutions sur mesure a Dakar.',
  },
  en: {
    title: 'Digital transformation in Senegal',
    description:
      'MEGA supports companies in Senegal with digital transformation: web, mobile, AI and custom software solutions in Dakar.',
  },
} as const

const seo = computed(() => seoByLocale[locale.value])

usePageSeo({
  title: computed(() => seo.value.title),
  description: computed(() => seo.value.description),
  path: '/',
  image: '/assets/accueil.svg',
})
</script>

<style scoped>
.home {
  --ink: #111111;
  --muted: #8a8582;
  --card: #ffffff;
  --soft: #f6f1ee;
  --line: #ece7e4;
  color: var(--ink);
  background: #f3f1ef;
}

.home.is-dark {
  --ink: #f7f7f7;
  --muted: #a8a3a0;
  --card: #141414;
  --soft: #1c1c1c;
  --line: #2e2e2e;
  background: #070707;
}

.home.is-dark .band-rule {
  background: #2a2a2a;
}

.home.is-dark .stats-bar {
  border: 1px solid #2a2a2a;
  background: #121212;
  box-shadow: none;
}

.home.is-dark .talk-card {
  background: #fff;
  box-shadow: none;
}

.home.is-dark .talk-link {
  color: #111;
}

.home.is-dark .services-card {
  border: 1px solid #242424;
  background: #121212;
  box-shadow: none;
}

.home.is-dark .service-row {
  border-color: #3a3a3a;
  background: transparent;
  color: #f7f7f7;
}

.home.is-dark .service-row:hover {
  border-color: #e44545;
  background: transparent;
  color: #fff;
}

.home.is-dark .code-float {
  border-radius: 1.5rem;
  background: #fff;
  padding: 0.65rem;
}

.home.is-dark .code-glow {
  bottom: -8%;
  background: radial-gradient(ellipse at center, rgba(228, 69, 69, 0.75) 0%, rgba(228, 69, 69, 0.28) 46%, rgba(7, 7, 7, 0) 74%);
}

.home.is-dark .results-card {
  border: 1px solid #2a2a2a;
  background: #1a1a1a;
}

.home.is-dark .all-projects {
  border: 1px solid #3a3a3a;
  border-radius: 999px;
  padding: 0.55rem 1rem;
  color: #f7f7f7;
}

.home.is-dark .all-projects:hover {
  border-color: #e44545;
  color: #fff;
}

.home.is-dark .project-card {
  border-color: #242424;
  background: #141414;
  box-shadow: none;
}

.home.is-dark .project-shot {
  background: #f4f1ef;
}

.home.is-dark .project-arrow {
  border-color: #3a3a3a;
  color: #f7f7f7;
}

.home.is-dark .team-shell {
  border: 1px solid #242424;
  background: #121212;
}

.home.is-dark .team-pill {
  background: #fff;
  color: #111;
}

.home.is-dark .cta {
  background: transparent;
}

.home.is-dark .cta-glow {
  background: radial-gradient(ellipse at center, rgba(176, 24, 28, 0.85) 0%, rgba(110, 12, 16, 0.42) 40%, rgba(7, 7, 7, 0) 72%);
}

.home.is-dark .cta h2 {
  color: #fff;
}

.home.is-dark .cta-form {
  border-color: #2a2a2a;
  background: #101010;
  box-shadow: none;
}

.home.is-dark .cta-form input {
  color: #fff;
}

.cta {
  background: #f3f1ef;
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

.hero {
  --ink: #111111;
  --muted: #8a8582;
  --card: #ffffff;
  --soft: #f6f1ee;
  --line: #ece7e4;
  margin-top: -4.25rem;
  padding-top: calc(4.25rem + 1.5rem);
  color: #111111;
  background-color: #fff;
  background-image: radial-gradient(rgba(190, 182, 178, 0.45) 1.1px, transparent 1.1px);
  background-size: 22px 22px;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}

.hero-visual {
  position: relative;
  width: min(100%, 34rem);
  aspect-ratio: 1;
  margin: 0 auto;
}

.hero-halo {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 86%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #f8cbcb 0%,
    rgba(248, 203, 203, 0.82) 42%,
    rgba(253, 226, 223, 0.45) 68%,
    rgba(255, 255, 255, 0) 78%
  );
  animation: halo-pulse 7s ease-in-out infinite;
}

.hero-dash {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 96%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1.5px dashed #e8b0ac;
  animation: dash-spin 56s linear infinite;
}

.hero-illu {
  position: absolute;
  left: 50%;
  top: 43%;
  z-index: 1;
  width: 84%;
  height: auto;
  animation: hero-illu-float 6.2s ease-in-out infinite;
}

.hero-actions {
  position: absolute;
  left: 50%;
  bottom: 4%;
  z-index: 2;
  display: flex;
  width: max-content;
  max-width: calc(100% - 1.5rem);
  transform: translateX(-50%);
  align-items: center;
  border-radius: 999px;
  background: #3a3a3a;
  padding: 0.25rem;
  box-shadow: 0 10px 24px rgba(58, 42, 42, 0.16);
}

.hero-actions a {
  white-space: nowrap;
}

.services-card {
  padding: 2.75rem 1.25rem;
}

.services-tab {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;
  display: none;
  height: 13.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0 1rem 1rem 0;
  background: #e44545;
  padding: 0.85rem 0.4rem;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #fff;
  writing-mode: vertical-rl;
  transform: translateY(-50%) rotate(180deg);
}

.service-row {
  border-color: #f3c9c6;
  background: #fff;
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.service-row:hover {
  border-color: #e44545;
  background: #fde8e6;
  color: #e44545;
}

.project-card.reveal {
  border: 1.5px solid transparent;
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.45s ease;
}

.project-card img {
  transition: transform 0.45s ease;
}

.project-arrow {
  transition: border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease;
}

.project-card.reveal.is-in:hover {
  border-color: #e44545;
  transform: translateY(-8px);
  box-shadow: 0 16px 36px rgba(228, 69, 69, 0.14);
}

.project-card:hover img {
  transform: scale(1.06);
}

.project-card:hover .project-arrow {
  border-color: #e44545;
  background: #fde8e6;
  color: #e44545;
}

.code-stage {
  position: relative;
}

.code-glow {
  position: absolute;
  left: 50%;
  bottom: 6%;
  z-index: 0;
  width: 82%;
  height: 42%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(ellipse at center, #f8cbcb 0%, rgba(248, 203, 203, 0.55) 46%, rgba(255, 255, 255, 0) 74%);
  filter: blur(6px);
}

.code-float {
  animation: code-float 5.2s ease-in-out infinite;
}

@media (min-width: 768px) {
  .services-card {
    padding: 3.5rem 2rem;
  }
}

@media (min-width: 1024px) {
  .services-card {
    padding: 4.25rem 2.5rem 4.25rem 3.25rem;
  }

  .services-tab {
    display: flex;
  }
}

.spark {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

@media (min-width: 1024px) {
  .spark {
    left: 3.5rem;
  }
}

.hero-rise {
  animation: hero-rise 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-rise-2 { animation-delay: 0.12s; }
.hero-rise-3 { animation-delay: 0.24s; }
.hero-rise-4 { animation-delay: 0.36s; }
.hero-rise-5 { animation-delay: 0.48s; }

.reveal,
.reveal-in {
  opacity: 0;
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal {
  transform: translateY(3.25rem);
}

.reveal.is-in,
.reveal-in.is-in {
  opacity: 1;
  transform: none;
}

.marquee {
  animation: home-marquee 22s linear infinite;
}

@keyframes home-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes halo-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.035); }
}

@keyframes dash-spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes hero-rise {
  from { opacity: 0; transform: translateY(2.75rem); }
  to { opacity: 1; transform: none; }
}

@keyframes code-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}

@keyframes hero-illu-float {
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, calc(-50% - 16px)); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee,
  .hero-halo,
  .hero-dash,
  .hero-rise,
  .hero-illu,
  .code-float { animation: none; }

  .hero-illu { transform: translate(-50%, -50%); }

  .hero-rise,
  .reveal,
  .reveal-in,
  .project-card,
  .project-card img {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .project-card.reveal.is-in:hover,
  .project-card:hover img {
    transform: none;
  }
}
</style>
