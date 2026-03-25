<template>
  <section
    ref="sectionRef"
    class="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 pt-0 pb-12 md:pb-16 px-4 md:px-8 lg:px-14"
    :class="sectionVisible ? 'opacity-100' : 'opacity-0'"
    :style="{ backgroundColor: 'white' }"
    id="projets"
  >
    <div class="w-full p-2 sm:px-4 ">
      <h2
        class="mt-5 text-left text-2xl font-bold text-[#d84c4c] transition-all duration-700 ease-out md:mb-10 md:text-3xl"
        :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
      >
        {{ t.title }}
      </h2>

      <div class="flex w-full justify-center">
        <div
          class="grid w-full max-w-5xl grid-cols-1 justify-items-stretch gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
      <article
        v-for="(project, i) in displayProjects"
        :key="i"
        class="flex w-full flex-col overflow-hidden rounded-2xl border border-[#d84c4c]/20 p-4 transition-all duration-700 ease-out md:p-5"
        :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        :style="{ backgroundColor: 'rgba(216, 76, 76, 0.05)', transitionDelay: sectionVisible ? `${120 + i * 140}ms` : '0ms' }"
      >
        <div
          class="h-44 w-full overflow-hidden rounded-xl border-2 border-[#d84c4c] bg-neutral-200 sm:h-48 md:h-52 lg:h-56"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="h-full w-full object-cover"
            width="640"
            height="360"
            loading="lazy"
          />
        </div>
        <h3 class="mt-4 text-lg md:text-xl font-semibold text-[#d84c4c]">
          {{ project.title }}
        </h3>
        <div class="mt-4">
          <a
            :href="project.url"
            class="inline-flex items-center justify-center rounded-full bg-[#d84c4c] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
            v-bind="linkAttrs(project.url)"
          >
            {{ t.visitSite }}
          </a>
        </div>
      </article>
        </div>
      </div>

      <div class="mt-10 flex w-full justify-center md:mt-12">
      <NuxtLink
        :to="seeMoreUrl"
        class="inline-flex items-center justify-center rounded-full bg-[#d84c4c] px-8 py-3 text-sm font-semibold text-white no-underline transition-all duration-700 ease-out hover:opacity-90"
        :class="sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        :style="{ transitionDelay: sectionVisible ? '520ms' : '0ms' }"
      >
        {{ t.seeMore }}
      </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Project {
  title: string
  image: string
  url: string
}

const props = withDefaults(
  defineProps<{
    projects?: Project[]
    /** Lien du bouton « Voir plus + » */
    seeMoreUrl?: string
  }>(),
  {
    seeMoreUrl: '/projet',
    projects: () => [
      {
        title: 'Al Madinah Boutique',
        image: '/assets/almadinasite.png',
        url: '#',
      },
      {
        title: 'Theta Ingénierie',
        image: '/assets/thetasite.png',
        url: '#',
      },
      {
        title: 'Mountazar Deco',
        image: '/assets/mountazarsite.png',
        url: '#',
      },
    ],
  }
)

const displayProjects = computed(() => props.projects.slice(0, 3))
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const translations = {
  fr: { title: 'Recents projets', visitSite: 'Visiter le site', seeMore: 'Voir plus +' },
  en: { title: 'Recent projects', visitSite: 'Visit website', seeMore: 'See more +' },
} as const
const t = computed(() => translations[locale.value])
const sectionRef = ref<HTMLElement | null>(null)
const sectionVisible = ref(false)

onMounted(() => {
  const el = sectionRef.value
  if (!el) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        sectionVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})

function linkAttrs(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return { target: '_blank' as const, rel: 'noopener noreferrer' }
  }
  return {}
}
</script>
