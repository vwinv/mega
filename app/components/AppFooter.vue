<template>
  <footer class="w-full bg-[#d84c4c] text-white">
    <div
      class="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 px-6 py-10 md:grid-cols-2 md:gap-x-10 md:gap-y-10 md:px-10 md:py-16 lg:grid-cols-4 lg:gap-8"
    >
      <!-- Mobile : logo + Contact Infos sur une seule ligne (flex). md+ : children dans la grille via contents -->
      <div class="flex flex-row items-start gap-3 md:contents">
        <div class="flex shrink-0 items-start justify-start md:justify-start">
          <img
            src="/assets/logowhite.png"
            alt="MEGA"
            class="h-auto w-auto max-h-9 object-contain sm:max-h-11 md:max-h-44 lg:max-h-52"
          />
        </div>

        <div class="min-w-0 flex-1 md:min-w-0">
          <h3 class="mb-4 text-base font-bold leading-tight sm:mb-5 sm:text-lg md:mb-5">
            {{ t.contactInfos }}
          </h3>
        <ul class="flex flex-col gap-4 text-sm font-normal sm:text-base">
          <li class="flex gap-3">
            <svg
              class="mt-0.5 h-5 w-5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a href="tel:+221784504052" class="text-white underline-offset-2 hover:underline">
              (+221) 78 450 40 52
            </a>
          </li>
          <li class="flex gap-3">
            <svg
              class="mt-0.5 h-5 w-5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href="mailto:contact@mega-sn.com"
              class="break-all text-white underline-offset-2 hover:underline"
            >
              contact@mega-sn.com
            </a>
          </li>
          <li class="flex gap-3">
            <svg
              class="mt-0.5 h-5 w-5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="leading-snug">
              PG9P+3FM 2 en face, Dakar
            </span>
          </li>
        </ul>
        </div>
      </div>

      <!-- Colonne 3 : MEGA -->
      <div class="min-w-0">
        <h3 class="mb-5 text-base font-bold sm:text-lg">MEGA</h3>
        <nav class="flex flex-col gap-3 text-sm font-normal sm:text-base" aria-label="Liens MEGA">
          <NuxtLink
            to="/a-propos"
            class="text-white underline-offset-2 hover:underline"
          >
            À Propos
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="text-white underline-offset-2 hover:underline"
          >
            Contact
          </NuxtLink>
        </nav>
      </div>

      <!-- Colonne 4 : Legale -->
      <div class="min-w-0">
        <h3 class="mb-5 text-base font-bold sm:text-lg">{{ t.legal }}</h3>
        <nav class="flex flex-col gap-3 text-sm font-normal sm:text-base" aria-label="Liens légaux">
          <NuxtLink
            to="/politique-confidentialite"
            class="text-white underline-offset-2 hover:underline"
          >
            {{ t.privacy }}
          </NuxtLink>
          <NuxtLink
            to="/conditions-services"
            class="text-white underline-offset-2 hover:underline"
          >
            {{ t.terms }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const translations = {
  fr: {
    contactInfos: 'Contact Infos',
    legal: 'Legale',
    privacy: 'Politique de confidentialite',
    terms: 'Conditions et services',
  },
  en: {
    contactInfos: 'Contact Info',
    legal: 'Legal',
    privacy: 'Privacy policy',
    terms: 'Terms and services',
  },
} as const
const t = computed(() => translations[locale.value])
</script>

