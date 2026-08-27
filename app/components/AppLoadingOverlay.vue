<template>
  <Teleport to="body">
    <Transition name="mega-loader">
      <div
        v-if="loading"
        class="mega-loader"
        role="status"
        aria-live="polite"
        :aria-label="label"
      >
        <svg class="mega-loader__ring" viewBox="0 0 48 48" aria-hidden="true">
          <circle class="mega-loader__track" cx="24" cy="24" r="18" />
          <circle class="mega-loader__bar" cx="24" cy="24" r="18" />
        </svg>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const loading = ref(false)
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const label = computed(() => (locale.value === 'en' ? 'Loading' : 'Chargement'))

let hideTimer: number | null = null
let shownAt = 0

function show() {
  if (hideTimer) {
    window.clearTimeout(hideTimer)
    hideTimer = null
  }
  shownAt = Date.now()
  loading.value = true
}

function hide() {
  const elapsed = Date.now() - shownAt
  const wait = Math.max(0, 280 - elapsed)
  if (hideTimer) window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    loading.value = false
    hideTimer = null
  }, wait)
}

onMounted(() => {
  show()
  const nuxtApp = useNuxtApp()

  nuxtApp.hook('page:start', () => {
    show()
  })
  nuxtApp.hook('page:finish', () => {
    hide()
  })
  nuxtApp.hook('vue:error', () => {
    hide()
  })

  onNuxtReady(() => {
    hide()
  })
})

onBeforeUnmount(() => {
  if (hideTimer) window.clearTimeout(hideTimer)
})
</script>

<style scoped>
.mega-loader {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  background: rgb(255 255 255 / 35%);
  pointer-events: all;
}

.mega-loader__ring {
  width: 52px;
  height: 52px;
  transform: rotate(-90deg);
  animation: mega-loader-spin 0.9s linear infinite;
}

.mega-loader__track,
.mega-loader__bar {
  fill: none;
  stroke-width: 3.5;
}

.mega-loader__track {
  stroke: rgb(216 76 76 / 18%);
}

.mega-loader__bar {
  stroke: #d84c4c;
  stroke-linecap: round;
  stroke-dasharray: 72 113;
}

.mega-loader-enter-active,
.mega-loader-leave-active {
  transition: opacity 0.2s ease;
}

.mega-loader-enter-from,
.mega-loader-leave-to {
  opacity: 0;
}

@keyframes mega-loader-spin {
  to {
    transform: rotate(270deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mega-loader__ring {
    animation: none;
  }
}
</style>
