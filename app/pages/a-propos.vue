<template>
  <div class="about" :class="theme === 'dark' && 'is-dark'">
    <section class="about-hero px-6 pb-12 sm:px-10 lg:px-14">
      <p class="reveal flex w-fit items-center gap-2 rounded-full border border-[#f0d2d0] bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#e44545]">
        <span class="h-1.5 w-1.5 rounded-full bg-[#e44545]" aria-hidden="true"></span>
        {{ t.badge }}
      </p>

      <div class="mt-6 grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <h1 class="reveal max-w-3xl whitespace-pre-line text-5xl font-extrabold leading-[0.95] tracking-tight text-[#111] sm:text-6xl lg:text-7xl" style="transition-delay: 80ms">
          {{ t.title }}
        </h1>
        <div class="reveal max-w-sm pb-2" style="transition-delay: 160ms">
          <p class="text-sm leading-7 text-[#6f6a67] sm:text-[15px]">{{ t.lead }}</p>
          <NuxtLink to="/contact" class="mt-6 inline-flex items-center rounded-full bg-[#e44545] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-110">
            {{ t.start }}
          </NuxtLink>
        </div>
      </div>

      <div class="mt-12 grid gap-4 sm:grid-cols-3">
        <div v-for="(src, i) in illustrations" :key="src" class="reveal flex h-52 items-center justify-center rounded-[1.6rem] bg-[#f7f2f0] p-4 sm:h-56" :style="{ transitionDelay: `${i * 100}ms` }">
          <img :src="src" alt="" class="max-h-full w-auto object-contain" />
        </div>
      </div>
    </section>

    <section class="talk relative px-6 py-12 sm:px-10 lg:px-14">
      <div class="talk-glow" aria-hidden="true"></div>
      <div class="reveal relative grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <h2 class="text-4xl font-extrabold tracking-tight text-[#111] sm:text-5xl">{{ t.talkTitle }}</h2>
        <div class="talk-copy max-w-xl text-sm leading-7 text-[#6f6a67] sm:text-[15px]">
          <p>{{ t.aboutP1 }}</p>
          <p class="mt-4">{{ t.aboutP2 }}</p>
          <p class="mt-4">{{ t.aboutP3 }}</p>
          <p class="about-quote mt-6 rounded-2xl border border-[#e7b4b2] px-5 py-4 font-semibold text-[#111]">{{ t.aboutQuote }}</p>
        </div>
      </div>
    </section>

    <section class="px-6 sm:px-10 lg:px-14">
      <div class="vision reveal grid items-stretch overflow-hidden rounded-[1.8rem] bg-white lg:grid-cols-[1.1fr_0.9fr]">
        <div class="vision-copy px-6 py-8 sm:px-10 sm:py-10">
          <h2 class="text-4xl font-extrabold tracking-tight text-[#111] sm:text-5xl">
            {{ t.our }}
            <span class="ml-1 inline-block rounded-xl bg-[#e44545] px-3 py-1 text-white">{{ t.visionWord }}</span>
          </h2>
          <p class="mt-4 max-w-xl text-sm leading-7 text-[#6f6a67] sm:text-[15px]">{{ t.visionText }}</p>
        </div>
        <div class="vision-art flex items-center justify-center px-6 py-8">
          <img src="/assets/globe.svg" alt="" class="mx-auto h-56 w-auto sm:h-64" />
        </div>
      </div>
    </section>

    <div class="reveal overflow-hidden py-10" aria-hidden="true">
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

    <section class="px-6 pb-6 sm:px-10 lg:px-14">
      <h2 class="values-title reveal text-4xl font-extrabold tracking-tight text-[#111] sm:text-5xl">
        {{ t.our }}
        <span class="ml-1 inline-block rounded-xl bg-[#e44545] px-3 py-1 text-white">{{ t.valuesWord }}</span>
      </h2>
      <div class="mt-8 grid gap-4 lg:grid-cols-3">
        <article v-for="(item, i) in values" :key="item.title" class="value-card reveal rounded-[1.6rem] bg-white p-5" :style="{ transitionDelay: `${i * 100}ms` }">
          <div class="value-shot flex h-52 items-center justify-center">
            <img :src="item.image" alt="" class="max-h-full w-auto object-contain" />
          </div>
          <p class="mt-4 text-[11px] font-bold tracking-[0.14em] text-[#e44545]">0{{ i + 1 }}</p>
          <h3 class="mt-1 text-xl font-extrabold text-[#111]">{{ item.title }}</h3>
          <p class="value-text mt-2 text-sm leading-6 text-[#6f6a67]">{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="px-6 py-8 sm:px-10 lg:px-14">
      <div class="team-shell rounded-[1.75rem] bg-white px-6 py-8 sm:px-10 sm:py-9">
        <h2 class="reveal text-left text-[1.7rem] font-extrabold leading-none tracking-tight text-[#111] sm:text-[2rem]">
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
            <label class="sr-only" for="about-email">{{ t.email }}</label>
            <input
              id="about-email"
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

const illustrations = ['/assets/ampoule.svg', '/assets/equipe.svg', '/assets/globe.svg']

const copy = {
  fr: {
    badge: 'À PROPOS',
    title: 'Accélérer votre\ntransformation\ndigitale.',
    lead: 'Nous accompagnons les entreprises avec une vision stratégique claire et des solutions durables.',
    start: 'Démarrer un projet →',
    talkTitle: 'Parlons de MEGA',
    aboutP1: "MEGA est une entreprise innovante spécialisée dans la transformation digitale, avec l'ambition de devenir un acteur de référence en Afrique et à l'international.",
    aboutP2: "Dès sa création, MEGA se positionne comme un partenaire stratégique en plaçant l'audit et le conseil au cœur de son approche. Nous accompagnons les entreprises dans l'analyse de leur environnement, l'identification des risques et la définition de stratégies digitales efficaces et durables.",
    aboutP3: "Au-delà du conseil, nous concevons et développons des solutions digitales sur mesure, en combinant technologie, data et intelligence artificielle, pour répondre concrètement aux enjeux métiers.",
    aboutQuote: 'Notre ambition : comprendre, orienter et construire des solutions qui créent de la valeur.',
    our: 'Notre',
    visionWord: 'vision',
    visionText: "Devenir un acteur de référence dans la transformation digitale en Afrique et à l'international, en contribuant à bâtir un écosystème numérique où la technologie, la sécurité et l'innovation sont au service de la performance durable des organisations.",
    marquee: ['Orienter', 'Construire', 'Comprendre'],
    valuesWord: 'valeurs',
    values: [
      { title: 'Innovation', text: 'Explorer de nouvelles approches pour créer des solutions utiles.', image: '/assets/ampoule.svg' },
      { title: "Esprit d'analyse", text: 'Comprendre avant de construire, décider sur des faits.', image: '/assets/chart.svg' },
      { title: 'Collaboration', text: 'Avancer avec nos clients, à chaque étape du projet.', image: '/assets/equipe.svg' },
    ],
    teamLead: 'Le génie derrière',
    team: [
      { initials: 'AS', name: 'Aminata Sow', role: 'CEO' },
      { initials: 'NP', name: 'Nielle Pascale Owende Ogowet', role: 'CMO · UX/UI Designer' },
    ],
    ctaTitle: 'Un projet en tête ?',
    ctaBody: 'Dites quelque chose pour démarrer une discussion en direct !',
    email: 'Votre adresse e-mail',
    contactCta: 'Contactez-nous',
  },
  en: {
    badge: 'ABOUT',
    title: 'Accelerate your\ndigital\ntransformation.',
    lead: 'We support companies with a clear strategic vision and lasting solutions.',
    start: 'Start a project →',
    talkTitle: 'Let’s talk about MEGA',
    aboutP1: 'MEGA is an innovative company specialized in digital transformation, with the ambition to become a reference player in Africa and internationally.',
    aboutP2: 'From the start, MEGA positions itself as a strategic partner by placing audit and advisory at the heart of its approach. We support companies in analyzing their environment, identifying risks and defining effective, lasting digital strategies.',
    aboutP3: 'Beyond advisory, we design and build tailor-made digital solutions, combining technology, data and artificial intelligence, to answer real business challenges.',
    aboutQuote: 'Our ambition: understand, guide and build solutions that create value.',
    our: 'Our',
    visionWord: 'vision',
    visionText: 'Become a reference player in digital transformation in Africa and internationally, helping build a digital ecosystem where technology, security and innovation serve the lasting performance of organizations.',
    marquee: ['Guide', 'Build', 'Understand'],
    valuesWord: 'values',
    values: [
      { title: 'Innovation', text: 'Explore new approaches to create useful solutions.', image: '/assets/ampoule.svg' },
      { title: 'Analytical mindset', text: 'Understand before building, and decide on facts.', image: '/assets/chart.svg' },
      { title: 'Collaboration', text: 'Move forward with our clients at every step of the project.', image: '/assets/equipe.svg' },
    ],
    teamLead: 'The minds behind',
    team: [
      { initials: 'AS', name: 'Aminata Sow', role: 'CEO' },
      { initials: 'NP', name: 'Nielle Pascale Owende Ogowet', role: 'CMO · UX/UI Designer' },
    ],
    ctaTitle: 'A project in mind?',
    ctaBody: 'Say something to start a conversation right away.',
    email: 'Your email address',
    contactCta: 'Contact us',
  },
} as const

const t = computed(() => copy[locale.value])
const values = computed(() => t.value.values)
const team = computed(() => t.value.team)

function goContact() {
  router.push({ path: '/contact', query: { email: email.value } })
}

const seoByLocale = {
  fr: {
    title: 'A propos de MEGA',
    description:
      'MEGA est une agence digitale senegalaise specialisee en transformation digitale, developpement web/mobile et innovation technologique a Dakar.',
  },
  en: {
    title: 'About MEGA',
    description:
      'MEGA is a Senegalese digital agency specialized in digital transformation, web/mobile development and technology innovation in Dakar.',
  },
} as const

const seo = computed(() => seoByLocale[locale.value])

usePageSeo({
  title: computed(() => seo.value.title),
  description: computed(() => seo.value.description),
  path: '/a-propos',
  image: '/assets/headerpropos.png',
})
</script>

<style scoped>
.about {
  overflow-x: clip;
}

.about.is-dark {
  background: #070707;
  color: #f7f7f7;
}

.talk-glow {
  display: none;
}

.about.is-dark .talk-glow {
  display: block;
  position: absolute;
  left: 4%;
  top: 42%;
  width: 32rem;
  height: 24rem;
  transform: translateY(-50%);
  background: radial-gradient(ellipse at center, rgba(150, 18, 24, 0.72) 0%, rgba(90, 10, 14, 0.28) 46%, rgba(7, 7, 7, 0) 72%);
  pointer-events: none;
}

.about.is-dark .talk h2,
.about.is-dark .vision h2,
.about.is-dark .marquee span,
.about.is-dark .values-title,
.about.is-dark .team-shell h2,
.about.is-dark .cta h2 {
  color: #fff;
}

.about.is-dark .talk-copy {
  color: #e4e0dd;
}

.about.is-dark .about-quote {
  border-color: #e44545;
  background: transparent;
  color: #fff;
}

.about.is-dark .vision {
  background: #141414;
}

.about.is-dark .vision-copy p {
  color: #c8c3c0;
}

.about.is-dark .vision-art {
  background: #fff;
}

.about.is-dark .value-card {
  border: 1px solid #2a2a2a;
  background: #141414;
}

.about.is-dark .value-shot {
  border-radius: 1.2rem;
  background: #fff;
}

.about.is-dark .value-card h3 {
  color: #fff;
}

.about.is-dark .value-text {
  color: #a8a3a0;
}

.about.is-dark .team-shell {
  border: 1px solid #2a2a2a;
  background: #141414;
}

.about.is-dark .team-pill {
  background: #fff;
  color: #111;
}

.about.is-dark .cta-glow {
  background: radial-gradient(ellipse at center, rgba(176, 24, 28, 0.85) 0%, rgba(110, 12, 16, 0.42) 40%, rgba(7, 7, 7, 0) 72%);
}

.about.is-dark .cta-form {
  border-color: #2a2a2a;
  background: #101010;
  box-shadow: none;
}

.about.is-dark .cta-form input {
  color: #fff;
}

.about-hero {
  margin-top: -4.25rem;
  padding-top: 7.5rem;
  background-color: #fff;
  background-image: radial-gradient(rgba(190, 182, 178, 0.45) 1.1px, transparent 1.1px);
  background-size: 22px 22px;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}

.marquee {
  animation: about-marquee 22s linear infinite;
}

@keyframes about-marquee {
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
}
</style>
