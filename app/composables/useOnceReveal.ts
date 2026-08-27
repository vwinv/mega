export function useOnceReveal(options?: { threshold?: number; rootMargin?: string }) {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  function revealNow() {
    visible.value = true
    observer?.disconnect()
    observer = null
  }

  onMounted(() => {
    const node = el.value
    if (!node) {
      revealNow()
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealNow()
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          revealNow()
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px',
      },
    )

    observer.observe(node)
    onUnmounted(() => observer?.disconnect())
  })

  return { el, visible }
}
