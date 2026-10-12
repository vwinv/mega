<template>
  <div class="projects">
    <section class="projects-hero px-6 pb-12 sm:px-10 lg:px-14">
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

    <section class="px-6 py-10 sm:px-10 lg:px-14">
      <div class="space-y-4">
        <article v-for="(project, i) in projects" :key="project.title" class="work-card reveal rounded-[1.7rem] bg-white p-4 sm:p-5" :style="{ transitionDelay: `${(i % 2) * 90}ms` }">
          <div class="grid items-center gap-5 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-8">
            <div class="flex h-48 items-center justify-center rounded-[1.3rem] bg-[#f6f1ee] p-5 sm:h-52">
              <img :src="project.image" :alt="project.title" class="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
            <div class="px-1 py-1 md:py-3 md:pr-4">
              <p class="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.16em] text-[#e44545]">
                <span class="rounded-md bg-[#e44545] px-1.5 py-0.5 text-[10px] font-extrabold tracking-normal text-white">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ project.kind === 'app' ? t.kindApp : t.kindSite }}
              </p>
              <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-[#111]">{{ project.title }}</h2>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-[#5e5956]">{{ project.description }}</p>
              <div class="mt-5 flex flex-wrap gap-2">
                <a
                  v-for="link in project.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center rounded-full bg-[#e44545] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-110"
                >
                  {{ linkLabel(project.kind, link.store) }}
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="cta relative px-6 pt-16 sm:px-10 lg:px-14">
      <div class="cta-glow" aria-hidden="true"></div>
      <div class="relative grid items-end gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="reveal pb-14 lg:pb-20">
          <h2 class="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[#111] sm:text-5xl lg:text-[3.35rem]">{{ t.ctaTitle }}</h2>
          <p class="mt-4 text-sm text-[#9a9592] sm:text-[15px]">{{ t.ctaBody }}</p>
          <form class="mt-7 flex max-w-md items-center rounded-full border border-[#ece7e4] bg-white p-1.5 shadow-[0_10px_30px_rgba(180,80,80,0.06)]" @submit.prevent="goContact">
            <label class="sr-only" for="projects-email">{{ t.email }}</label>
            <input
              id="projects-email"
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
const email = ref('')
const router = useRouter()

const illustrations = ['/assets/code.svg', '/assets/loupe.svg', '/assets/chart.svg']

const projectsByLocale = {
  fr: [
    {
      title: 'Yohride',
      image: '/assets/yohrideapp.png',
      kind: 'app',
      description:
        'Yohride est une plateforme de location de voitures qui permet de réserver facilement un véhicule adapté à ses besoins. Elle offre une solution simple, rapide et fiable pour les déplacements personnels, professionnels ou touristiques.',
      links: [
        { store: 'play', href: 'https://play.google.com/store/apps/details?id=com.yohride.app' },
        { store: 'apple', href: 'https://apps.apple.com/us/app/yohride/id6752221198' },
      ],
    },
    {
      title: 'Mille Services',
      image: '/assets/milleserviceapp.png',
      kind: 'app',
      description:
        'Mille Services est une plateforme de mise en relation entre particuliers et prestataires (plomberie, électricité, ménage, etc.). Le projet comprend une application mobile permettant aux utilisateurs de trouver et réserver facilement un professionnel, ainsi qu’un dashboard d’administration pour la gestion des services, des utilisateurs et des demandes.',
      links: [
        { store: 'play', href: 'https://play.google.com/store/apps/details?id=com.mille.services' },
        { store: 'apple', href: 'https://apps.apple.com/us/app/mille-services/id6760831174' },
      ],
    },
    {
      title: 'Tooky Consulting',
      image: '/assets/tooky.png',
      kind: 'site',
      description:
        "Tooky Consulting est un cabinet de conseil spécialisé dans l'accompagnement des entreprises dans leur transformation et leur développement. Il propose des services de conseil stratégique, de digitalisation, de gestion de projets et d'optimisation des processus afin d'améliorer la performance et la compétitivité de ses clients. Le cabinet intervient auprès d'organisations de différents secteurs en apportant des solutions adaptées à leurs enjeux de croissance et d'innovation.",
      links: [{ store: 'web', href: 'https://tookyconsulting.com' }],
    },
    {
      title: 'Commonwealth School',
      image: '/assets/commonwalthsite.png',
      kind: 'site',
      description:
        'Site conçu pour Commonwealth Preschool of Abidjan, une école inspirée de la pédagogie finlandaise. Au-delà de la vitrine, le projet comprend un espace parent pour suivre la scolarité, les inscriptions et les échanges avec l’établissement, ainsi qu’un espace administration permettant à l’équipe de gérer les classes, les dossiers et le quotidien de l’école.',
      links: [{ store: 'web', href: 'https://www.commonwealth-school.com/' }],
    },
    {
      title: 'The Lightbulb Agency',
      image: '/assets/lightbulbsite.png',
      kind: 'site',
      description:
        'Site vitrine réalisé pour The Lightbulb Agency, présentant ses services, son expertise et ses réalisations. Conçu pour offrir une navigation fluide et valoriser l’image de l’agence, il met en avant son identité et facilite la prise de contact.',
      links: [{ store: 'web', href: 'https://lightbulb-agency.com/' }],
    },
    {
      title: 'Theta Ingénierie',
      image: '/assets/thetasite.png',
      kind: 'site',
      description:
        'Site vitrine conçu pour Theta Ingénierie, mettant en avant ses services, son expertise et ses projets. L’objectif est de valoriser son savoir-faire, renforcer sa présence en ligne et faciliter la mise en relation avec ses clients.',
      links: [{ store: 'web', href: 'https://theta-ingenierie.com/' }],
    },
    {
      title: 'Al Madinah boutique',
      image: '/assets/almadinasite.png',
      kind: 'site',
      description:
        'Site vitrine réalisé pour Al Madinah Boutique, mettant en avant ses produits et son univers. Conçu pour valoriser la marque, renforcer sa présence en ligne et faciliter le contact avec les clients.',
      links: [{ store: 'web', href: 'https://almadinahboutique.com/boutique/' }],
    },
  ],
  en: [
    {
      title: 'Yohride',
      image: '/assets/yohrideapp.png',
      kind: 'app',
      description:
        'Yohride is a car rental platform that lets you book the right vehicle quickly. It delivers a straightforward, dependable experience for personal trips, business travel, or holidays.',
      links: [
        { store: 'play', href: 'https://play.google.com/store/apps/details?id=com.yohride.app' },
        { store: 'apple', href: 'https://apps.apple.com/us/app/yohride/id6752221198' },
      ],
    },
    {
      title: 'Mille Services',
      image: '/assets/milleserviceapp.png',
      kind: 'app',
      description:
        'Mille Services connects people with local professionals (plumbing, electrical, housekeeping, and similar trades). The scope covers a consumer mobile app to discover and book a provider, and an administration dashboard to run services, users, and incoming requests.',
      links: [
        { store: 'play', href: 'https://play.google.com/store/apps/details?id=com.mille.services' },
        { store: 'apple', href: 'https://apps.apple.com/us/app/mille-services/id6760831174' },
      ],
    },
    {
      title: 'Tooky Consulting',
      image: '/assets/tooky.png',
      kind: 'site',
      description:
        'Tooky Consulting is a consulting firm specialized in supporting companies through transformation and growth. It offers strategic consulting, digitalization, project management, and process optimization to improve clients’ performance and competitiveness. The firm works with organizations across sectors, delivering solutions tailored to their growth and innovation challenges.',
      links: [{ store: 'web', href: 'https://tookyconsulting.com' }],
    },
    {
      title: 'Commonwealth School',
      image: '/assets/commonwalthsite.png',
      kind: 'site',
      description:
        'Website for Commonwealth Preschool of Abidjan, a school inspired by Finnish pedagogy. Beyond the public site, the project includes a parent space to follow schooling, registrations, and communication with the school, plus an administration space for staff to manage classes, records, and day-to-day operations.',
      links: [{ store: 'web', href: 'https://www.commonwealth-school.com/' }],
    },
    {
      title: 'The Lightbulb Agency',
      image: '/assets/lightbulbsite.png',
      kind: 'site',
      description:
        'Marketing site for The Lightbulb Agency presenting its offer, expertise, and selected projects. The interface favors fluid navigation, a polished brand image, and quick ways to start a conversation.',
      links: [{ store: 'web', href: 'https://lightbulb-agency.com/' }],
    },
    {
      title: 'Theta Ingénierie',
      image: '/assets/thetasite.png',
      kind: 'site',
      description:
        'Corporate site for Theta Ingénierie showcasing its services, technical expertise, and project track record—aimed at highlighting its capabilities, growing visibility, and simplifying how prospects and clients connect.',
      links: [{ store: 'web', href: 'https://theta-ingenierie.com/' }],
    },
    {
      title: 'Al Madinah boutique',
      image: '/assets/almadinasite.png',
      kind: 'site',
      description:
        'Brochure site for Al Madinah Boutique, putting products and brand story in focus—designed to elevate the label, strengthen its web presence, and make it easy for customers to get in touch.',
      links: [{ store: 'web', href: 'https://almadinahboutique.com/boutique/' }],
    },
  ],
} as const

const translations = {
  fr: {
    badge: 'PROJETS',
    title: 'Des projets\nconcrets.\nDes résultats\nmesurables.',
    lead: 'Découvrez comment nous transformons les ambitions en succès durables.',
    start: 'Démarrer un projet →',
    kindApp: 'APPLICATION MOBILE',
    kindSite: 'SITE WEB',
    download: 'Play Store',
    appStore: 'App Store',
    visit: 'Voir le site',
    ctaTitle: 'Un projet en tête ?',
    ctaBody: 'Dites quelque chose pour démarrer une discussion en direct !',
    email: 'Votre adresse e-mail',
    contactCta: 'Contactez-nous',
  },
  en: {
    badge: 'PROJECTS',
    title: 'Concrete\nprojects.\nMeasurable\nresults.',
    lead: 'Discover how we turn ambitions into lasting success.',
    start: 'Start a project →',
    kindApp: 'MOBILE APP',
    kindSite: 'WEBSITE',
    download: 'Play Store',
    appStore: 'App Store',
    visit: 'Visit the site',
    ctaTitle: 'A project in mind?',
    ctaBody: 'Say something to start a conversation right away.',
    email: 'Your email address',
    contactCta: 'Contact us',
  },
} as const

const projects = computed(() => projectsByLocale[locale.value])
const t = computed(() => translations[locale.value])

function linkLabel(kind: 'app' | 'site', store: 'play' | 'apple' | 'web') {
  if (store === 'apple') return t.value.appStore
  if (kind === 'app') return t.value.download
  return t.value.visit
}

function goContact() {
  router.push({ path: '/contact', query: { email: email.value } })
}

const seoByLocale = {
  fr: {
    title: 'Projets et realisations',
    description:
      'Decouvrez les projets MEGA : applications web, mobile et solutions digitales livrees pour des entreprises au Senegal et en Afrique.',
  },
  en: {
    title: 'Projects and case studies',
    description:
      'Explore MEGA projects: web apps, mobile apps and digital solutions delivered for companies in Senegal and Africa.',
  },
} as const

const seo = computed(() => seoByLocale[locale.value])

usePageSeo({
  title: computed(() => seo.value.title),
  description: computed(() => seo.value.description),
  path: '/projet',
  image: '/assets/headerprojet.png',
})
</script>

<style scoped>
.projects-hero {
  margin-top: -4.25rem;
  padding-top: 7.5rem;
  background-color: #fff;
  background-image: radial-gradient(rgba(190, 182, 178, 0.45) 1.1px, transparent 1.1px);
  background-size: 22px 22px;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}

.work-card {
  border: 1.5px solid transparent;
  transition:
    opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.work-card:hover {
  border-color: #e44545;
  box-shadow: 0 12px 32px rgba(228, 69, 69, 0.08);
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
