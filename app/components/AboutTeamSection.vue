<template>
  <div
    ref="sectionRef"
    class="mx-auto w-full max-w-6xl px-2 py-10 transition-all duration-700 md:px-4 md:py-12"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
  >
    <h2 class="mb-8 text-3xl font-bold text-[#d84c4c] md:mb-10 md:text-4xl lg:text-5xl">
      {{ t.title }}
    </h2>

    <div
      class="team-grid grid grid-cols-1 gap-6 md:gap-5 lg:gap-8"
      :class="expandedKey ? 'md:grid-cols-1' : 'md:grid-cols-3'"
    >
      <article
        v-for="member in members"
        v-show="isCardVisible(member)"
        :key="member.nameKey"
        :ref="(el) => setTeamCardRef(member.nameKey, el)"
        class="team-card isolate flex min-h-0 flex-col overflow-hidden rounded-2xl bg-[#fce9e9] shadow-sm"
        :class="[
          cardPaddingClass(member),
          isExpanded(member) ? 'rounded-[1.75rem] md:rounded-3xl' : '',
          peerHiddenDuringCloseFlip(member)
            ? 'pointer-events-none opacity-0 select-none'
            : '',
        ]"
        :aria-hidden="peerHiddenDuringCloseFlip(member) ? true : undefined"
      >
        <!-- Mode compact -->
        <div
          v-show="!isExpanded(member)"
          class="flex flex-col"
        >
          <div
            class="mx-auto h-36 w-36 shrink-0 rounded-full border-[3px] border-[#d84c4c] bg-[#f5e0e0] bg-no-repeat shadow-inner md:h-40 md:w-40"
            :style="avatarStyleForMember(member)"
            role="img"
            :aria-label="member.name"
          />

          <h3 class="mt-6 text-center text-lg font-bold leading-snug text-[#d84c4c] md:text-xl">
            {{ member.name }}
          </h3>
          <p class="mt-1 text-center text-base font-bold text-[#d84c4c]/95">
            {{ member.role }}
          </p>
          <p class="mt-4 text-center text-sm leading-relaxed text-[#d84c4c]/85 md:text-[15px]">
            {{ member.bio }}
          </p>

          <button
            type="button"
            class="mx-auto mt-6 inline-flex items-center justify-center rounded-full bg-[#d84c4c] px-7 py-2.5 text-sm font-semibold text-white transition-[transform] hover:brightness-110 active:scale-[0.98]"
            @click="expand(member.nameKey)"
          >
            {{ t.ctaMore }}
          </button>
        </div>

        <!-- Mode agrandi -->
        <div
          v-show="isExpanded(member)"
          class="flex flex-col"
        >
          <div class="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
            <div class="flex shrink-0 flex-col md:w-48">
              <div
                class="mx-auto h-36 w-36 rounded-full border-[3px] border-[#d84c4c] bg-[#f5e0e0] bg-no-repeat shadow-inner md:mx-0 md:h-44 md:w-44"
                :style="avatarStyleForMember(member)"
                role="img"
                :aria-label="member.name"
              />
              <h3 class="mt-6 text-center text-xl font-bold leading-snug text-[#d84c4c] md:text-left md:text-2xl">
                {{ member.name }}
              </h3>
              <p class="mt-1 text-center text-base font-bold text-[#d84c4c]/95 md:text-left md:text-lg">
                {{ member.role }}
              </p>
            </div>

            <div class="min-w-0 flex-1 space-y-5">
              <p
                v-for="(para, pi) in member.bioFull"
                :key="pi"
                class="text-sm leading-[1.75] text-[#d84c4c]/90 md:text-[15px] lg:text-base"
              >
                {{ para }}
              </p>
            </div>
          </div>

          <div class="mt-10 flex justify-center md:mt-12">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-[#d84c4c] px-8 py-3 text-sm font-semibold text-white transition-[transform] hover:brightness-110 active:scale-[0.98]"
              @click="collapse"
            >
              {{ t.ctaLess }}
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')

const translations = {
  fr: {
    title: 'Le Génie Derrières MEGA',
    ctaMore: 'Voir plus',
    ctaLess: 'Voir moins',
  },
  en: {
    title: 'The minds behind MEGA',
    ctaMore: 'See more',
    ctaLess: 'See less',
  },
} as const

type Member = {
  nameKey: string
  name: string
  role: string
  bio: string
  bioFull: string[]
  /** Photo dédiée (ex. `/assets/aminata.png`), sinon sprite partagé. */
  avatarSrc?: string
}

const membersByLocale: Record<'fr' | 'en', Member[]> = {
  fr: [
    {
      nameKey: 'aminata',
      name: 'Aminata Sow',
      role: 'CEO - CTO',
      avatarSrc: '/assets/aminata.png',
      bio: "Co‑fondatrice et développeuse, je crée des solutions digitales performantes qui transforment les idées en applications concrètes, en alliant expertise technique et vision stratégique.",
      bioFull: [
        'En tant que co‑fondatrice et développeuse principale, je conçois et développe des solutions digitales qui transforment les idées en applications performantes et concrètes.',
        'Depuis décembre 2024, je dirige également des projets informatiques chez INTECH GROUP, où je supervise la planification et l’exécution de projets complexes, rédige les cahiers des charges, organise les tâches sur Jira et manage les équipes pour assurer la livraison de solutions digitales fiables et efficaces.',
        'Mon parcours inclut le développement d’applications desktop, web et mobiles, l’intégration d’API REST et le déploiement multiplateforme (Android, iOS, Web), notamment chez WBCC ASSISTANCE où j’ai également assuré la rédaction de documentation technique et l’assistance aux utilisateurs. J’ai aussi dirigé le développement de sites web et d’applications mobiles en tant qu’IT Manager chez MORY SD, et acquis des bases solides en cybersécurité et pentesting chez CCDOC.',
        'Parmi mes réalisations marquantes figurent l’application Njeeg yi pour MORY SD et le projet Smart Parking pour Al Jaber à Conakry, tous deux conçus et présentés avec succès. J’applique systématiquement les méthodes agiles SCRUM pour garantir des livrables rapides et alignés sur les besoins des utilisateurs.',
        'Diplômée d’un Master en Management de Projets et Innovations Numériques à SUPDECO Dakar et d’une Licence en Génie Logiciels et Réseaux & Systèmes à l’ISM Dakar, je combine expertise technique, sens de l’organisation et vision stratégique pour transformer des idées en solutions digitales impactantes.',
      ],
    },
    {
      nameKey: 'nielle',
      name: 'Nielle Pascale OWENDE OGOWET',
      role: 'CMO - UX/UI Designer',
      avatarSrc: '/assets/nielle.jpeg',
      bio: "Image de marque et expérience utilisateur : elle donne vie à l'identité MEGA et conçoit des interfaces utiles, lisibles et mémorables.",
      bioFull: [
        "Nielle Pascale Owende Ogowet est graphic designer, avec une forte orientation en communication digitale. Elle évolue à l’intersection du design et de la stratégie, en créant des expériences visuelles cohérentes, engageantes et centrées sur l’utilisateur.",
        "Au fil de ses expériences, elle a développé des compétences solides en conception d’interfaces, en branding, en création de contenus et en gestion de communication digitale, notamment à travers le pilotage de campagnes et la valorisation de projets sur les plateformes numériques. Elle se distingue par sa capacité à allier esthétique et message, en concevant des supports qui ne sont pas seulement beaux, mais aussi pertinents et efficaces.",
        "Elle fait partie de l’équipe de MEGA afin de mettre sa créativité, sa vision stratégique et sa maîtrise du digital au service de solutions innovantes, tout en contribuant activement au rayonnement et à la croissance de l’entreprise dans une logique d’impact, de cohérence et de performance.",
      ],
    },
    {
      nameKey: 'meserigne',
      name: 'Meserigne Ndiaye',
      role: 'CTO',
      avatarSrc: '/assets/mes.jpeg',
      bio: "Architecture et delivery technique : il sécurise la scalabilité, la qualité du code et la mise en production des solutions digitales.",
      bioFull: [
        "Meserigne Ndiaye est un professionnel des Technologies de l’Information et de la Communication avec plus de 15 ans d’expérience, acquise au sein d’organisations humanitaires et internationales, notamment en collaboration avec le système des Nations Unies.",
        "Son parcours lui a permis de développer une expertise pointue en transformation digitale, en structuration de processus et en conduite du changement, dans des environnements complexes et multiculturels. Il se distingue par sa capacité à concevoir et piloter des solutions digitales à fort impact, adaptées aux réalités du terrain, tout en assurant une coordination efficace entre les différents acteurs.",
        "Il fait partie de l’équipe de MEGA afin d’apporter une vision stratégique et opérationnelle, contribuer au développement de solutions digitales innovantes, et accompagner la croissance de l’entreprise avec une approche orientée impact, performance et excellence.",
      ],
    },
  ],
  en: [
    {
      nameKey: 'aminata',
      name: 'Aminata Sow',
      role: 'CEO - CTO',
      avatarSrc: '/assets/aminata.png',
      bio: 'Co-founder and developer: I deliver high-performing digital solutions that turn ideas into real applications, combining technical depth with strategic direction.',
      bioFull: [
        'As co-founder and lead developer, I design and build digital solutions that turn ideas into robust, concrete applications.',
        'Since December 2024, I also lead IT projects at INTECH GROUP, where I oversee planning and delivery of complex initiatives, write specifications, organize work in Jira, and manage teams to ship reliable, effective digital products.',
        'My experience spans desktop, web, and mobile applications, REST API integration, and multi-platform rollout (Android, iOS, Web), including at WBCC ASSISTANCE, where I produced technical documentation and end-user support. As IT Manager at MORY SD, I led website and mobile app development, and I built a solid foundation in cybersecurity and pentesting at CCDOC.',
        'Notable deliveries include the Njeeg yi app for MORY SD and the Smart Parking project for Al Jaber in Conakry—both designed and presented successfully. I apply agile SCRUM practices consistently to deliver quickly and stay aligned with user needs.',
        'I hold a Master’s in Digital Project and Innovation Management from SUPDECO Dakar and a BSc in Software Engineering and Networks & Systems from ISM Dakar. I combine technical expertise, organization, and strategic vision to turn ideas into impactful digital solutions.',
      ],
    },
    {
      nameKey: 'nielle',
      name: 'Nielle Pascale OWENDE OGOWET',
      role: 'CMO - UX/UI Designer',
      avatarSrc: '/assets/nielle.jpeg',
      bio: 'Graphic designer with a strong focus on digital communication: she works at the intersection of design and strategy to create coherent, engaging, user-centered visual experiences.',
      bioFull: [
        'Nielle is a graphic designer with a strong focus on digital communication. She operates at the intersection of design and strategy, creating coherent, engaging, user-centered visual experiences.',
        'Through her experience, she has built solid skills in interface design, branding, content creation, and digital communication management—especially by leading campaigns and showcasing projects on digital platforms. She stands out for her ability to align aesthetics and message, producing assets that are not only beautiful, but also relevant and effective.',
        'She is part of MEGA’s team to put her creativity, strategic vision, and digital expertise at the service of innovative solutions—while actively contributing to the company’s visibility and growth with an impact-driven, coherent, performance-minded approach.',
      ],
    },
    {
      nameKey: 'meserigne',
      name: 'Meserigne Ndiaye',
      role: 'CTO',
      avatarSrc: '/assets/mes.jpeg',
      bio: 'IT and digital transformation: he brings over 15 years of experience and leads high-impact delivery in complex, multicultural environments.',
      bioFull: [
        'Meserigne Ndiaye is an Information and Communication Technology professional with over 15 years of experience gained within humanitarian and international organizations, including in collaboration with the United Nations system.',
        'His journey has built deep expertise in digital transformation, process structuring, and change management in complex, multicultural environments. He stands out for his ability to design and lead high-impact digital solutions adapted to field realities, while ensuring effective coordination between stakeholders.',
        'He is part of MEGA’s team to bring strategic and operational leadership, contribute to the development of innovative digital solutions, and support the company’s growth with an approach focused on impact, performance, and excellence.',
      ],
    },
  ],
}

const t = computed(() => translations[locale.value])
const members = computed(() => membersByLocale[locale.value])

const expandedKey = ref<string | null>(null)
/** Carte qui se referme ; les deux autres restent dans le flux mais invisibles jusqu’à la fin du FLIP. */
const closingCardKey = ref<string | null>(null)
const hidePeersDuringCloseFlip = ref(false)

/** Durée FLIP ouverture / repli (ms) */
const FLIP_DURATION_MS = 1400

/** Réfs DOM des cartes (stable : même nœud du compact → détail pour FLIP) */
const teamCardRefs = shallowRef(new Map<string, HTMLElement>())
let activeFlip: Animation | null = null

function domArticleEl(el: unknown): HTMLElement | null {
  if (el instanceof HTMLElement) return el
  return null
}

function setTeamCardRef(nameKey: string, el: unknown) {
  const node = domArticleEl(el)
  const map = teamCardRefs.value
  const prev = map.get(nameKey)

  if (node) {
    if (prev === node) return
    const next = new Map(map)
    next.set(nameKey, node)
    teamCardRefs.value = next
    return
  }
  if (!map.has(nameKey)) return
  const next = new Map(map)
  next.delete(nameKey)
  teamCardRefs.value = next
}

function isExpanded(member: Member) {
  return expandedKey.value === member.nameKey
}

function isCardVisible(member: Member) {
  return expandedKey.value === null || expandedKey.value === member.nameKey
}

function cardPaddingClass(member: Member) {
  if (isExpanded(member)) return 'p-6 md:p-10 lg:p-12'
  return 'p-6 md:p-7'
}

function peerHiddenDuringCloseFlip(member: Member) {
  if (!hidePeersDuringCloseFlip.value) return false
  const c = closingCardKey.value
  return c !== null && member.nameKey !== c
}

function prefersReducedMotion() {
  return import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function waitTwoFrames(): Promise<void> {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  )
}

type FlipArticleOptions = { onDone?: () => void }

/** FLIP symétrique : « Voir plus » et « Voir moins » (même `el.animate` qu’avant). */
async function flipArticle(
  el: HTMLElement,
  applyLayoutChange: () => void,
  options?: FlipArticleOptions
) {
  let finished = false
  const done = () => {
    if (finished) return
    finished = true
    options?.onDone?.()
  }

  activeFlip?.cancel()
  activeFlip = null

  const first = el.getBoundingClientRect()
  applyLayoutChange()

  await nextTick()
  await waitTwoFrames()

  const last = el.getBoundingClientRect()
  if (last.width < 2 || last.height < 2) {
    done()
    return
  }

  const dx = first.left - last.left
  const dy = first.top - last.top
  const sx = first.width / last.width
  const sy = first.height / last.height
  if (!Number.isFinite(sx) || !Number.isFinite(sy) || sx <= 0 || sy <= 0) {
    done()
    return
  }

  if (typeof el.animate !== 'function') {
    done()
    return
  }

  try {
    const anim = el.animate(
      [
        {
          transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
          transformOrigin: '0 0',
        },
        {
          transform: 'translate(0, 0) scale(1, 1)',
          transformOrigin: '0 0',
        },
      ],
      {
        duration: FLIP_DURATION_MS,
        easing: 'cubic-bezier(0.25, 0.9, 0.3, 1)',
        fill: 'none',
      }
    )
    if (!anim) {
      done()
      return
    }
    activeFlip = anim
    anim.onfinish = () => {
      if (activeFlip === anim) activeFlip = null
      done()
    }
  }
  catch {
    done()
  }
}

async function expand(nameKey: string) {
  hidePeersDuringCloseFlip.value = false
  closingCardKey.value = null

  if (prefersReducedMotion()) {
    expandedKey.value = nameKey
    return
  }

  const el = teamCardRefs.value.get(nameKey)
  if (!el) {
    expandedKey.value = nameKey
    return
  }

  await flipArticle(el, () => {
    expandedKey.value = nameKey
  })
}

async function collapse() {
  if (prefersReducedMotion()) {
    expandedKey.value = null
    hidePeersDuringCloseFlip.value = false
    closingCardKey.value = null
    return
  }

  const key = expandedKey.value
  if (!key) return

  const el = teamCardRefs.value.get(key)
  if (!el) {
    expandedKey.value = null
    hidePeersDuringCloseFlip.value = false
    closingCardKey.value = null
    return
  }

  closingCardKey.value = key

  await flipArticle(
    el,
    () => {
      expandedKey.value = null
      hidePeersDuringCloseFlip.value = true
    },
    {
      onDone: () => {
        hidePeersDuringCloseFlip.value = false
        closingCardKey.value = null
      },
    }
  )
}

function memberIndex(nameKey: string) {
  const i = members.value.findIndex((m) => m.nameKey === nameKey)
  return i >= 0 ? i : 0
}

const SPRITE = '/assets/about-team-mockup.png'

function avatarStyle(index: number) {
  const xPos = ['0%', '50%', '100%'][index] ?? '50%'
  return {
    backgroundImage: `url('${SPRITE}')`,
    backgroundSize: '300% auto',
    backgroundPosition: `${xPos} 36%`,
  }
}

function avatarStyleForMember(member: Member) {
  if (member.avatarSrc) {
    return {
      backgroundImage: `url('${member.avatarSrc}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  return avatarStyle(memberIndex(member.nameKey))
}

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

onMounted(() => {
  const el = sectionRef.value
  if (!el) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.value = true
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})

onBeforeUnmount(() => {
  activeFlip?.cancel()
  activeFlip = null
  expandedKey.value = null
  hidePeersDuringCloseFlip.value = false
  closingCardKey.value = null
})
</script>
