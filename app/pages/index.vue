<template>
  <section
    ref="headerSectionRef"
    class="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 -mt-8 flex min-h-[95vh] items-end justify-start overflow-hidden px-6 py-8 transition-all duration-700 ease-out md:py-12 lg:py-16"
    :class="headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
  >
    <div class="absolute inset-0" aria-hidden="true">
      <div
        class="absolute -top-[15%] -left-[15%] w-[130%] h-[130%] bg-cover bg-center animate-hero-zoom"
        :style="{ backgroundImage: `url('/assets/header.png')` }"
      />
    </div>
    <div class="relative z-10 text-left max-w-3xl">
      <h1 class="m-0 font-bold leading-[1.05] tracking-tight text-[#d84c4c]" :class="['text-[clamp(2.75rem,10vw,6rem)]', 'tracking-[-0.03em]']">
        {{ hero.title }}
      </h1>
      <p
        class="mt-4 md:mt-6 text-[clamp(1.5rem,4vw,2.75rem)] font-semibold leading-tight text-[#d84c4c] tracking-[-0.02em] whitespace-pre-line"
      >
        {{ hero.subtitle }}
      </p>
      <p class="mt-4 text-base font-normal leading-relaxed text-[#d84c4c]">
        {{ hero.body }}
      </p>
    </div>
  </section>

  <ServicesSection />
  <RecentProjectsSection />
  <ContactUsSection />
  <TrustedBySection />
</template>

<script setup lang="ts">
import TrustedBySection from '~/components/TrustedBySection.vue'

const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const heroByLocale = {
  fr: {
    title: 'MEGA,',
    subtitle: "Construisons ensemble\nvotre avenir digital.",
    body: "Chez Mega, nous accompagnons les entreprises dans leur transformation digitale en concevant des solutions innovantes, performantes et adaptees a leurs besoins. De l'analyse a la mise en oeuvre, nous travaillons a vos cotes pour batir des outils durables qui soutiennent votre croissance et optimisent vos processus.",
  },
  en: {
    title: 'MEGA,',
    subtitle: 'Let us build together\nyour digital future.',
    body: 'At Mega, we support companies in their digital transformation by designing innovative, high-performing solutions tailored to their needs. From analysis to implementation, we work alongside you to build sustainable tools that drive growth and optimize your processes.',
  },
} as const
const hero = computed(() => heroByLocale[locale.value])

const headerSectionRef = ref<HTMLElement | null>(null)
const headerVisible = ref(false)

onMounted(() => {
  const el = headerSectionRef.value
  if (!el) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        headerVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})

useSeoMeta({
  title: 'MEGA',
  description: 'Digital showcase website.',
})
</script>

<style scoped>
@keyframes zoom-dezoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

.animate-hero-zoom {
  animation: zoom-dezoom 20s ease-in-out infinite;
}
</style>
