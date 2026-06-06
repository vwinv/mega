type PageSeoOptions = {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  path?: string
  image?: string
  noindex?: boolean
}

export function usePageSeo(options: PageSeoOptions) {
  const locale = useState<'fr' | 'en'>('locale', () => 'fr')
  const config = useRuntimeConfig()
  const route = useRoute()

  const siteUrl = String(config.public.siteUrl || 'https://mega-sn.com').replace(/\/$/, '')
  const path = options.path ?? route.path

  const title = computed(() => toValue(options.title))
  const description = computed(() => toValue(options.description))
  const fullTitle = computed(() => `${title.value} | MEGA`)
  const canonical = computed(() => `${siteUrl}${path}`)
  const ogImage = computed(() => {
    const imagePath = options.image ?? '/assets/logo.png'
    return `${siteUrl}${imagePath}`
  })

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogImage: ogImage,
    ogSiteName: 'MEGA',
    ogLocale: computed(() => (locale.value === 'fr' ? 'fr_SN' : 'en_US')),
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow',
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    htmlAttrs: {
      lang: computed(() => locale.value),
    },
  })
}
