<template>
  <section class="mx-auto w-full max-w-7xl py-8 md:py-12">
    <nav class="mb-8 md:mb-10" aria-label="Fil d'ariane">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-2xl font-semibold text-[#d84c4c] no-underline transition-opacity hover:opacity-80 md:text-3xl"
      >
        <span aria-hidden="true">&lt;</span>
        <span>{{ t.pageTitle }}</span>
      </NuxtLink>
    </nav>

    <div class="overflow-hidden rounded-2xl border border-neutral-200 bg-[#f5f5f5]">
      <div class="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr]">
        <aside class="relative overflow-hidden bg-[#d84c4c] p-8 text-white md:p-10">
          <h1 class="text-3xl font-bold leading-tight">{{ t.contactInfoTitle }}</h1>
          <p class="mt-4 max-w-xs text-lg text-white/95">
            {{ t.contactInfoSubtitle }}
          </p>

          <ul class="mt-16 space-y-8 text-lg">
            <li class="flex items-center gap-4">
              <span class="inline-flex h-8 w-8 items-center justify-center">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <a href="tel:+221784504052" class="text-white no-underline hover:underline">(+221) 78 450 40 52</a>
            </li>
            <li class="flex items-center gap-4">
              <span class="inline-flex h-8 w-8 items-center justify-center">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <a href="mailto:contact@mega-sn.com" class="text-white no-underline hover:underline">contact@mega-sn.com</a>
            </li>
            <li class="flex items-center gap-4">
              <span class="inline-flex h-8 w-8 items-center justify-center">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span>{{ t.address }}</span>
            </li>
          </ul>

          <div class="mt-12 flex gap-3">
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/10 text-sm">ig</span>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/10 text-sm">ig</span>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/10 text-sm">ig</span>
          </div>

          <div class="pointer-events-none absolute -bottom-4 -right-5 h-32 w-32 rounded-full bg-[#f46c73]/70" />
          <div class="pointer-events-none absolute bottom-12 right-10 h-24 w-24 rounded-full bg-[#f46c73]" />
        </aside>

        <form class="p-8 md:p-10" @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <label class="block">
              <span class="text-sm font-medium text-neutral-500">{{ t.lastName }}</span>
              <input
                v-model="lastName"
                type="text"
                class="mt-2 w-full border-0 border-b border-neutral-400 bg-transparent px-0 pb-2 focus:border-[#d84c4c] focus:outline-none"
              />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-neutral-900">{{ t.firstName }}</span>
              <input
                v-model="firstName"
                type="text"
                class="mt-2 w-full border-0 border-b border-neutral-400 bg-transparent px-0 pb-2 focus:border-[#d84c4c] focus:outline-none"
              />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-neutral-500">{{ t.email }}</span>
              <input
                v-model="email"
                type="email"
                class="mt-2 w-full border-0 border-b border-neutral-400 bg-transparent px-0 pb-2 focus:border-[#d84c4c] focus:outline-none"
              />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-neutral-900">{{ t.phone }}</span>
              <input
                v-model="phone"
                type="tel"
                class="mt-2 w-full border-0 border-b border-neutral-900 bg-transparent px-0 pb-2 focus:border-[#d84c4c] focus:outline-none"
              />
            </label>
          </div>

          <fieldset class="mt-10">
            <legend class="text-xl font-semibold text-neutral-900">{{ t.selectSubject }}</legend>
            <div class="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-neutral-700">
              <label class="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="sujet"
                  value="partenariat"
                  v-model="subjectKey"
                  class="h-4 w-4 accent-[#d84c4c]"
                />
                <span>{{ t.subject1 }}</span>
              </label>
              <label class="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="sujet"
                  value="avis"
                  v-model="subjectKey"
                  class="h-4 w-4 accent-[#d84c4c]"
                />
                <span>{{ t.subject2 }}</span>
              </label>
              <label class="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="sujet"
                  value="rejoindre"
                  v-model="subjectKey"
                  class="h-4 w-4 accent-[#d84c4c]"
                />
                <span>{{ t.subject3 }}</span>
              </label>
              <label class="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="sujet"
                  value="general"
                  v-model="subjectKey"
                  class="h-4 w-4 accent-[#d84c4c]"
                />
                <span>{{ t.subject4 }}</span>
              </label>
            </div>
          </fieldset>

          <label class="mt-10 block">
            <span class="text-sm font-medium text-neutral-500">{{ t.message }}</span>
            <textarea
              v-model="message"
              rows="2"
              :placeholder="t.messagePlaceholder"
              class="mt-2 w-full resize-none border-0 border-b border-neutral-400 bg-transparent px-0 pb-2 text-lg placeholder:text-neutral-500 focus:border-[#d84c4c] focus:outline-none"
            />
          </label>

          <div class="mt-10 flex justify-end">
            <button
              type="submit"
              :disabled="sending"
              class="inline-flex items-center justify-center rounded-full bg-[#d84c4c] px-12 py-4 text-lg font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {{ sending ? t.sending : t.send }}
            </button>
          </div>

          <p v-if="successMessage" class="mt-4 text-sm font-semibold text-green-700">
            {{ successMessage }}
          </p>
          <p v-if="errorMessage" class="mt-4 text-sm font-semibold text-red-600">
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </div>
  </section>
  <div class="mt-10">
    <ServicesSection />
  </div>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const translations = {
  fr: {
    pageTitle: 'Contact',
    contactInfoTitle: 'Informations contact',
    contactInfoSubtitle: 'Dites quelque chose pour demarrer une discussion en direct !',
    address: 'Sacre coeur 2, pres de OBV',
    lastName: 'Noms',
    firstName: 'Prenoms',
    email: 'E-mail',
    phone: 'Numero de telephone',
    selectSubject: 'Selectionner le sujet ?',
    subject1: 'Partenariat',
    subject2: 'Avis',
    subject3: "Rejoindre l'equipe",
    subject4: 'Demande generale',
    message: 'Message',
    messagePlaceholder: 'Redigez votre message...',
    send: 'Envoyer le message',
    sending: "Envoi...",
    sent: "Message envoyé !",
    errorSending: "Une erreur est survenue lors de l'envoi.",
  },
  en: {
    pageTitle: 'Contact',
    contactInfoTitle: 'Contact information',
    contactInfoSubtitle: 'Say something to start a live conversation!',
    address: 'Sacre coeur 2, near OBV',
    lastName: 'Last name',
    firstName: 'First name',
    email: 'Email',
    phone: 'Phone number',
    selectSubject: 'Select a subject?',
    subject1: 'Partnership',
    subject2: 'Feedback',
    subject3: 'Join the team',
    subject4: 'General inquiry',
    message: 'Message',
    messagePlaceholder: 'Write your message...',
    send: 'Send message',
    sending: "Sending...",
    sent: "Message sent!",
    errorSending: "Something went wrong while sending your message.",
  },
} as const
const t = computed(() => translations[locale.value])

type SubjectKey = "partenariat" | "avis" | "rejoindre" | "general"

const lastName = ref("")
const firstName = ref("")
const email = ref("")
const phone = ref("")
const subjectKey = ref<SubjectKey>("partenariat")
const message = ref("")

const sending = ref(false)
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

const subjectLabel = computed(() => {
  const labels: Record<SubjectKey, string> = {
    partenariat: t.value.subject1,
    avis: t.value.subject2,
    rejoindre: t.value.subject3,
    general: t.value.subject4,
  }
  return labels[subjectKey.value]
})

async function onSubmit() {
  sending.value = true
  successMessage.value = null
  errorMessage.value = null

  try {
    await $fetch("/api/mailing/contact", {
      method: "POST",
      body: {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        subject: subjectKey.value,
        subjectLabel: subjectLabel.value,
        message: message.value.trim(),
      },
    })

    successMessage.value = t.value.sent
    lastName.value = ""
    firstName.value = ""
    email.value = ""
    phone.value = ""
    subjectKey.value = "partenariat"
    message.value = ""
  } catch (e) {
    const err = e as any
    const serverMessage =
      err?.data?.message ||
      err?.data?.statusMessage ||
      err?.statusMessage ||
      err?.message ||
      ""

    // Affiche un message utile renvoyé par l'API (sans exposer de secrets).
    errorMessage.value =
      typeof serverMessage === "string" && serverMessage.trim().length
        ? serverMessage
        : t.value.errorSending

    console.error("[contact] send failed:", err)
  } finally {
    sending.value = false
  }
}

useSeoMeta({ title: computed(() => t.value.pageTitle) })
</script>
