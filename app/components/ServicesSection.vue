<template>
  <section
    ref="sectionRef"
    class="pt-0 pb-0 -mt-8 md:-mt-12 lg:-mt-16"
  >
    <div
      class="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 mx-auto rounded-none min-h-[520px] md:min-h-[580px] pt-14 pb-10 md:pt-20 md:pb-12 px-6 md:px-10 lg:px-14 flex flex-col w-full"
      :style="{ backgroundColor: 'rgba(216, 76, 76, 0.05)' }"
    >
      <h2
        class="text-lg md:text-xl font-semibold text-[#d84c4c] mb-10 md:mb-14 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        {{ t.title }}
      </h2>

      <div
        class="relative flex-1 w-full flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-14 md:gap-y-10 lg:gap-x-16 lg:gap-y-12"
      >
        <span
          v-for="(item, i) in displayServices"
          :key="item.label"
          class="font-bold text-[#d84c4c] leading-tight whitespace-pre-line transition-all duration-700 ease-out"
          :class="[
            item.sizeClass,
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95',
          ]"
          :style="{
            ...item.offset,
            transitionDelay: isVisible ? `${150 + i * 120}ms` : '0ms',
          }"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Service {
  label: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(
  defineProps<{
    services?: Service[]
  }>(),
  {
    services: () => [
      { label: 'AI', size: 'xl' },
      { label: 'Conception de\nsolutions digitales', size: 'xl' },
      { label: 'Formation', size: 'lg' },
      { label: 'Audit & Conseils', size: 'md' },
      { label: 'Développement &\ninfrastructure', size: 'md' },
    ],
  }
)
const locale = useState<'fr' | 'en'>('locale', () => 'fr')

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const sizeClasses: Record<string, string> = {
  xs: 'text-xl md:text-2xl',
  sm: 'text-2xl md:text-3xl lg:text-4xl',
  md: 'text-3xl md:text-4xl lg:text-5xl',
  lg: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
  xl: 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
}

const offsets = [
  { marginRight: '2.5rem', marginBottom: '0.5rem' },
  { marginLeft: '1.5rem', marginTop: '-1rem', marginRight: '1.5rem' },
  { marginLeft: '4rem', marginTop: '-0.5rem' },
  { marginRight: '3rem', marginTop: '0.5rem' },
  { marginTop: '2rem', marginLeft: '1.5rem' },
]

const translatedLabels = {
  fr: {
    'AI': 'AI',
    'Conception de\nsolutions digitales': 'Conception de\nsolutions digitales',
    'Formation': 'Formation',
    'Audit & Conseils': 'Audit & Conseils',
    'Développement &\ninfrastructure': 'Developpement &\ninfrastructure',
  },
  en: {
    'AI': 'AI',
    'Conception de\nsolutions digitales': 'Digital solution\ndesign',
    'Formation': 'Training',
    'Audit & Conseils': 'Audit & Consulting',
    'Développement &\ninfrastructure': 'Development &\ninfrastructure',
  },
} as const

const translations = {
  fr: { title: '< Services' },
  en: { title: '< Services' },
} as const

const t = computed(() => translations[locale.value])

const displayServices = computed(() =>
  props.services.map((s, i) => ({
    label: translatedLabels[locale.value][s.label as keyof typeof translatedLabels.fr] ?? s.label,
    sizeClass: sizeClasses[s.size ?? 'md'],
    offset: offsets[i % offsets.length],
  }))
)

onMounted(() => {
  const el = sectionRef.value
  if (!el) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )
  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})
</script>
