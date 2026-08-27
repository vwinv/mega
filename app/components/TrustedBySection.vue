<template>
  <section
    ref="sectionRef"
    class="relative left-1/2 flex w-screen max-w-[100vw] -translate-x-1/2 flex-col justify-center min-h-[280px] px-0 pt-4 pb-8 md:min-h-[340px] md:pt-6 md:pb-10 lg:min-h-[400px] lg:pt-8"
    :style="{ backgroundColor: 'white' }"
    id="partenaires"
  >
    <h2
      class="mb-10 px-4 text-center text-2xl font-bold text-[#d84c4c] transition-all duration-700 ease-out md:mb-14 md:px-8 md:text-3xl lg:px-14"
      :class="logosVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
    >
      {{ t.title }}
    </h2>

    <div
      class="partners-marquee relative overflow-hidden"
      :class="logosVisible ? 'opacity-100' : 'opacity-0'"
      style="transition: opacity 700ms ease-out"
    >
      <div class="partners-marquee__fade partners-marquee__fade--left" aria-hidden="true" />
      <div class="partners-marquee__fade partners-marquee__fade--right" aria-hidden="true" />

      <div class="partners-marquee__track">
        <div
          v-for="(src, i) in loopLogos"
          :key="src + i"
          class="flex h-20 w-44 shrink-0 items-center justify-center px-3 py-2 sm:h-24 sm:w-52 md:h-28 md:w-60 lg:h-32"
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
      '/assets/commonwealth.png',
    ],
  }
)

const displayLogos = computed(() => props.logos.filter(Boolean))
const loopLogos = computed(() => [...displayLogos.value, ...displayLogos.value])
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const translations = {
  fr: { title: 'Ils nous ont fait confiance' },
  en: { title: 'They trusted us' },
} as const
const t = computed(() => translations[locale.value])
const { el: sectionRef, visible: logosVisible } = useOnceReveal({ threshold: 0.2 })
</script>

<style scoped>
.partners-marquee {
  --partners-duration: 32s;
}

.partners-marquee__track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: 2.5rem;
  animation: partners-marquee var(--partners-duration) linear infinite;
}

.partners-marquee:hover .partners-marquee__track {
  animation-play-state: paused;
}

.partners-marquee__fade {
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100%;
  width: 4rem;
}

.partners-marquee__fade--left {
  left: 0;
  background: linear-gradient(to right, #fff, transparent);
}

.partners-marquee__fade--right {
  right: 0;
  background: linear-gradient(to left, #fff, transparent);
}

@keyframes partners-marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (min-width: 768px) {
  .partners-marquee__track {
    gap: 3.5rem;
  }

  .partners-marquee__fade {
    width: 6rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .partners-marquee__track {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    padding-inline: 1.5rem;
  }

  .partners-marquee__fade {
    display: none;
  }
}
</style>
