<template>
  <section
    ref="sectionRef"
    class="relative left-1/2 flex w-screen max-w-[100vw] -translate-x-1/2 flex-col justify-center min-h-[360px] px-4 pt-4 pb-0 md:min-h-[440px] md:px-8 md:pt-6 lg:min-h-[520px] lg:px-14 lg:pt-8"
    :style="{ backgroundColor: 'white' }"
    id="partenaires"
  >
    <h2 class="text-2xl md:text-3xl font-bold text-[#d84c4c] mb-10 md:mb-14 text-center">
      {{ t.title }}
    </h2>

    <div
      class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14 md:gap-y-10"
    >
      <div
        v-for="(src, i) in displayLogos"
        :key="src + i"
        class="flex h-20 w-44 items-center justify-center rounded-lg bg-white/80 px-3 py-2 transition-all duration-700 ease-out sm:h-24 sm:w-52 md:h-28 md:w-60 lg:h-32"
        :class="logosVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'"
        :style="{ transitionDelay: logosVisible ? `${120 + i * 120}ms` : '0ms' }"
      >
        <img
          :src="src"
          alt=""
          class="max-h-full max-w-full object-contain"
          loading="lazy"
          width="200"
          height="80"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Chemins publics vers les logos (dossier public/assets).
 */
const props = withDefaults(
  defineProps<{
    logos?: string[]
  }>(),
  {
    logos: () => [
      '/assets/almadinalogo.png',
      '/assets/lightbulblogo.png',
      '/assets/thetalogo.png',
      '/assets/yohridelogo.jpg.png',
    ],
  }
)

const displayLogos = computed(() => props.logos.filter(Boolean))
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const translations = {
  fr: { title: 'Ils nous ont fait confiance' },
  en: { title: 'They trusted us' },
} as const
const t = computed(() => translations[locale.value])
const sectionRef = ref<HTMLElement | null>(null)
const logosVisible = ref(false)

onMounted(() => {
  const el = sectionRef.value
  if (!el) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        logosVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})
</script>
