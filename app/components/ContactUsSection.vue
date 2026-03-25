<template>
  <section
    class="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-0 pt-8 pb-0 md:pt-10 md:pb-0 lg:pt-12"
  >
    <div
      ref="sectionRef"
      class="relative overflow-hidden rounded-2xl"
      aria-label="Contact"
      :class="sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      style="transition: opacity 700ms ease-out, transform 700ms ease-out"
    >
      <img
        src="/assets/imgcontact.jpeg"
        alt="Contact"
        class="h-[320px] w-full object-cover md:h-[380px]"
        loading="lazy"
      />

      <div class="absolute inset-0 flex items-center">
        <div class="absolute top-0 h-full w-full flex items-center">
          <div class="pl-6 pr-6 py-8 md:pl-10 md:pr-6 md:py-10 lg:pl-12 max-w-xl translate-x-14 md:translate-x-18 lg:translate-x-20">
            <h2 class="text-[#d84c4c] text-3xl md:text-4xl lg:text-5xl font-bold">
              {{ t.title }}
            </h2>
            <p class="mt-3 text-[#d84c4c] font-normal text-base md:text-lg lg:text-xl leading-relaxed">
              {{ t.subtitle }}
            </p>

            <NuxtLink
              :to="contactHref"
              class="mt-6 inline-flex items-center justify-center rounded-full bg-[#d84c4c] px-7 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
            >
              {{ t.cta }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const contactHref = '/contact'

const translations = {
  fr: {
    title: 'Contact-nous',
    subtitle:
      'Parlez-nous de votre projet. Nous vous répondons rapidement.',
    cta: 'contactez nous',
  },
  en: {
    title: 'Contact us',
    subtitle: 'Tell us about your project. We will get back to you soon.',
    cta: 'Contact us',
  },
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
    { threshold: 0.15 }
  )

  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})
</script>

