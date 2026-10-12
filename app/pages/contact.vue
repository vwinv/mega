<template>
  <div>
    <section class="contact-hero px-6 pb-16 sm:px-10 lg:px-14">
      <p class="reveal flex w-fit items-center gap-2 rounded-full border border-[#f0d2d0] bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#e44545]">
        <span class="h-1.5 w-1.5 rounded-full bg-[#e44545]" aria-hidden="true"></span>
        {{ t.badge }}
      </p>
      <div class="mt-6 grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <h1 class="reveal max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight text-[#111] sm:text-6xl lg:text-7xl" style="transition-delay: 80ms">
          {{ t.title }}
        </h1>
        <div class="reveal max-w-sm pb-2" style="transition-delay: 160ms">
          <p class="text-sm leading-7 text-[#6f6a67] sm:text-[15px]">{{ t.lead }}</p>
          <NuxtLink to="/projet" class="mt-6 inline-flex items-center rounded-full bg-[#e44545] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:brightness-110">
            {{ t.projects }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="px-6 py-10 sm:px-10 lg:px-14">
      <div class="grid min-w-0 items-stretch gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <aside class="reveal flex min-w-0 flex-col rounded-[1.7rem] bg-[#e44545] p-6 text-white sm:p-8">
          <h2 class="text-2xl font-extrabold sm:text-3xl">{{ t.infoTitle }}</h2>
          <p class="mt-2 max-w-xs text-sm text-white/90">{{ t.infoLead }}</p>
          <ul class="mt-8 space-y-3 text-[13px]">
            <li>
              <a href="tel:+221784504052" class="flex items-center gap-2 rounded-full bg-[#c43333] px-3 py-2.5 text-white no-underline hover:bg-[#b82e2e]">
                <span class="shrink-0 text-[10px] font-bold tracking-[0.14em]">TEL</span>
                <span class="whitespace-nowrap">(+221) 78 450 40 52</span>
              </a>
            </li>
            <li>
              <a href="mailto:contact@mega-sn.com" class="flex items-center gap-2 rounded-full bg-[#c43333] px-3 py-2.5 text-white no-underline hover:bg-[#b82e2e]">
                <span class="shrink-0 text-[10px] font-bold tracking-[0.14em]">MAIL</span>
                <span class="whitespace-nowrap">contact@mega-sn.com</span>
              </a>
            </li>
            <li>
              <p class="flex items-center gap-2 rounded-full bg-[#c43333] px-3 py-2.5">
                <span class="shrink-0 text-[10px] font-bold tracking-[0.14em]">ADR</span>
                <span class="min-w-0 leading-snug">{{ t.address }}</span>
              </p>
            </li>
          </ul>
          <div class="mt-8 flex flex-1 items-end justify-end">
            <div class="flex h-36 w-[11.5rem] max-w-full items-center justify-center rounded-[1.4rem] bg-white p-3 sm:h-44 sm:w-[16rem]">
              <img src="/assets/cta-mail.svg?v=3" alt="" class="max-h-full w-auto" />
            </div>
          </div>
        </aside>

        <form class="reveal min-w-0 rounded-[1.7rem] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] sm:p-8" style="transition-delay: 120ms" @submit.prevent="onSubmit">
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="block">
              <span class="text-xs font-medium text-[#8a8582]">{{ t.lastName }} <span class="text-[#e44545]">*</span></span>
              <input v-model="lastName" type="text" required class="mt-2 w-full rounded-full bg-[#f6f1ee] px-4 py-3 text-sm text-[#111] outline-none placeholder:text-[#b7b1ad]" />
            </label>
            <label class="block">
              <span class="text-xs font-medium text-[#8a8582]">{{ t.firstName }}</span>
              <input v-model="firstName" type="text" class="mt-2 w-full rounded-full bg-[#f6f1ee] px-4 py-3 text-sm text-[#111] outline-none placeholder:text-[#b7b1ad]" />
            </label>
            <label class="block">
              <span class="text-xs font-medium text-[#8a8582]">{{ t.email }} <span class="text-[#e44545]">*</span></span>
              <input v-model="email" type="email" required class="mt-2 w-full rounded-full bg-[#f6f1ee] px-4 py-3 text-sm text-[#111] outline-none placeholder:text-[#b7b1ad]" />
            </label>
            <label class="block">
              <span class="text-xs font-medium text-[#8a8582]">{{ t.phone }}</span>
              <input v-model="phone" type="tel" class="mt-2 w-full rounded-full bg-[#f6f1ee] px-4 py-3 text-sm text-[#111] outline-none placeholder:text-[#b7b1ad]" />
            </label>
          </div>

          <fieldset class="mt-6">
            <legend class="text-xs font-medium text-[#8a8582]">{{ t.selectSubject }}</legend>
            <div class="mt-3 flex flex-wrap gap-2">
              <label
                v-for="item in subjects"
                :key="item.key"
                class="inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-semibold"
                :class="subjectKey === item.key ? 'bg-[#e44545] text-white' : 'border border-[#ece7e4] bg-white text-[#111]'"
              >
                <input v-model="subjectKey" class="sr-only" type="radio" name="sujet" :value="item.key" />
                {{ item.label }}
              </label>
            </div>
          </fieldset>

          <label class="mt-6 block">
            <span class="text-xs font-medium text-[#8a8582]">{{ t.message }} <span class="text-[#e44545]">*</span></span>
            <textarea
              v-model="message"
              required
              minlength="5"
              rows="4"
              :placeholder="t.messagePlaceholder"
              class="mt-2 w-full resize-none rounded-2xl bg-[#f6f1ee] px-4 py-3 text-sm text-[#111] outline-none placeholder:text-[#b7b1ad]"
            />
          </label>

          <div class="mt-6 flex justify-end">
            <button type="submit" :disabled="sending" class="inline-flex items-center gap-3 rounded-full bg-[#e44545] py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70">
              {{ sending ? t.sending : t.send }}
              <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#111] text-white" aria-hidden="true">→</span>
            </button>
          </div>

          <p v-if="successMessage" class="mt-4 text-sm font-semibold text-green-700">{{ successMessage }}</p>
          <p v-if="errorMessage" class="mt-4 text-sm font-semibold text-red-600">{{ errorMessage }}</p>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const route = useRoute()

const translations = {
  fr: {
    badge: 'CONTACT',
    title: 'Contactez-nous',
    lead: "Des questions ou des remarques ? N'hésitez pas à nous écrire !",
    projects: 'Voir nos projets →',
    infoTitle: 'Informations contact',
    infoLead: 'Dites quelque chose pour démarrer une discussion en direct !',
    address: 'Sacré-Cœur 2, près de OBV, Dakar',
    lastName: 'Nom',
    firstName: 'Prénom',
    email: 'E-mail',
    phone: 'Numéro de téléphone',
    selectSubject: 'Sélectionner le sujet',
    subject1: 'Partenariat',
    subject2: 'Demande de devis',
    subject3: "Rejoindre l'équipe",
    subject4: 'Demande générale',
    message: 'Message',
    messagePlaceholder: 'Rédigez votre message...',
    send: 'Envoyer le message',
    sending: 'Envoi...',
    sent: 'Message envoyé !',
    errorSending: "Une erreur est survenue lors de l'envoi.",
  },
  en: {
    badge: 'CONTACT',
    title: 'Contact us',
    lead: 'Questions or comments? Feel free to write to us.',
    projects: 'See our projects →',
    infoTitle: 'Contact information',
    infoLead: 'Say something to start a conversation right away.',
    address: 'Sacré-Cœur 2, near OBV, Dakar',
    lastName: 'Last name',
    firstName: 'First name',
    email: 'Email',
    phone: 'Phone number',
    selectSubject: 'Select a subject',
    subject1: 'Partnership',
    subject2: 'Quote request',
    subject3: 'Join the team',
    subject4: 'General request',
    message: 'Message',
    messagePlaceholder: 'Write your message...',
    send: 'Send the message',
    sending: 'Sending...',
    sent: 'Message sent!',
    errorSending: 'Something went wrong while sending your message.',
  },
} as const

const t = computed(() => translations[locale.value])

type SubjectKey = 'partenariat' | 'avis' | 'rejoindre' | 'general'

const queryEmail = typeof route.query.email === 'string' ? route.query.email : ''
const lastName = ref('')
const firstName = ref('')
const email = ref(queryEmail)
const phone = ref('')
const subjectKey = ref<SubjectKey>('partenariat')
const message = ref('')

const sending = ref(false)
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

const subjects = computed(() => [
  { key: 'partenariat' as const, label: t.value.subject1 },
  { key: 'avis' as const, label: t.value.subject2 },
  { key: 'rejoindre' as const, label: t.value.subject3 },
  { key: 'general' as const, label: t.value.subject4 },
])

const subjectLabel = computed(() => subjects.value.find((item) => item.key === subjectKey.value)?.label ?? t.value.subject1)

async function onSubmit() {
  sending.value = true
  successMessage.value = null
  errorMessage.value = null

  try {
    await $fetch('/api/mailing/contact', {
      method: 'POST',
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
    lastName.value = ''
    firstName.value = ''
    email.value = ''
    phone.value = ''
    subjectKey.value = 'partenariat'
    message.value = ''
  } catch (e) {
    const err = e as { data?: { message?: string; statusMessage?: string }; statusMessage?: string; message?: string }
    const serverMessage = err?.data?.message || err?.data?.statusMessage || err?.statusMessage || err?.message || ''
    errorMessage.value = typeof serverMessage === 'string' && serverMessage.trim().length ? serverMessage : t.value.errorSending
    console.error('[contact] send failed:', err)
  } finally {
    sending.value = false
  }
}

const seoByLocale = {
  fr: {
    title: 'Contactez MEGA',
    description: 'Contactez l equipe MEGA a Dakar pour votre projet digital. Demandez un devis ou un accompagnement personnalise.',
  },
  en: {
    title: 'Contact MEGA',
    description: 'Contact the MEGA team in Dakar for your digital project. Request a quote or personalized support.',
  },
} as const

const seo = computed(() => seoByLocale[locale.value])

usePageSeo({
  title: computed(() => seo.value.title),
  description: computed(() => seo.value.description),
  path: '/contact',
})
</script>

<style scoped>
.contact-hero {
  margin-top: -4.25rem;
  padding-top: 7.5rem;
  background-color: #fff;
  background-image: radial-gradient(rgba(190, 182, 178, 0.45) 1.1px, transparent 1.1px);
  background-size: 22px 22px;
  border-bottom-left-radius: 2.5rem;
  border-bottom-right-radius: 2.5rem;
}
</style>
