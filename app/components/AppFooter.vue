<template>
  <footer class="pt-6">
    <div class="overflow-hidden rounded-t-[2rem] bg-[#111] px-6 py-10 text-white sm:px-10 lg:px-14 md:py-12">
      <div class="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div class="reveal">
          <div class="footer-logo">
            <img src="/assets/logowhite.png" alt="MEGA" />
          </div>
          <p class="mt-5 max-w-[12rem] whitespace-pre-line text-lg font-extrabold leading-tight">
            {{ t.tagline }}
          </p>
        </div>

        <div class="reveal" style="transition-delay: 80ms">
          <h2 class="text-sm font-semibold">{{ t.contactTitle }}</h2>
          <ul class="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href="tel:+221784504052" class="text-white/80 no-underline hover:text-white">(+221) 78 450 40 52</a>
            </li>
            <li>
              <a href="mailto:contact@mega-sn.com" class="text-white/80 no-underline hover:text-white">contact@mega-sn.com</a>
            </li>
            <li>Sacré-Cœur 2, Dakar</li>
          </ul>
        </div>

        <div class="reveal" style="transition-delay: 160ms">
          <h2 class="text-sm font-semibold">MEGA</h2>
          <nav class="mt-4 flex flex-col gap-2 text-sm text-white/80" aria-label="MEGA">
            <NuxtLink to="/a-propos" class="text-white/80 no-underline hover:text-white">{{ t.about }}</NuxtLink>
            <NuxtLink to="/services" class="text-white/80 no-underline hover:text-white">{{ t.services }}</NuxtLink>
            <NuxtLink to="/projet" class="text-white/80 no-underline hover:text-white">{{ t.projects }}</NuxtLink>
            <NuxtLink to="/contact" class="text-white/80 no-underline hover:text-white">{{ t.contact }}</NuxtLink>
          </nav>
        </div>

        <div class="reveal" style="transition-delay: 240ms">
          <h2 class="text-sm font-semibold">{{ t.legal }}</h2>
          <nav class="mt-4 flex flex-col gap-2 text-sm text-white/80" aria-label="Légal">
            <NuxtLink to="/politique-confidentialite" class="text-white/80 no-underline hover:text-white">{{ t.privacy }}</NuxtLink>
            <NuxtLink to="/conditions-services" class="text-white/80 no-underline hover:text-white">{{ t.terms }}</NuxtLink>
          </nav>
        </div>
      </div>

      <div class="reveal mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} MEGA</p>
        <p>DAKAR · SN</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const year = new Date().getFullYear()

const translations = {
  fr: {
    tagline: 'Deux visions.\nUne excellence.',
    contactTitle: 'Contact Infos',
    about: 'À propos',
    services: 'Services',
    projects: 'Projets',
    contact: 'Contact',
    legal: 'Légale',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions et services',
  },
  en: {
    tagline: 'Two visions.\nOne standard.',
    contactTitle: 'Contact info',
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    legal: 'Legal',
    privacy: 'Privacy policy',
    terms: 'Terms and services',
  },
} as const

const t = computed(() => translations[locale.value])
</script>

<style scoped>
.footer-logo {
  position: relative;
  width: 9.15rem;
  height: 2rem;
}

.footer-logo img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 9.15rem;
  width: auto;
  max-width: none;
  transform: translate(-50%, -50%) rotate(-90deg);
}
</style>
