<template>
  <div class="fixed bottom-5 right-5 z-[80]">
    <Transition name="teaser-fade">
      <button
        v-if="!isOpen && showTeaser"
        type="button"
        class="teaser-bubble absolute -top-16 right-0 max-w-[240px] rounded-2xl px-4 py-2 text-left text-xs font-medium text-white shadow-md transition-opacity hover:opacity-95"
        @click="isOpen = true"
      >
        {{ t.teaser }}
      </button>
    </Transition>

    <button
      v-if="!isOpen"
      type="button"
      class="floating-bot inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#d84c4c] text-white shadow-lg transition-transform hover:scale-105"
      :aria-label="t.open"
      @click="isOpen = true"
    >
      <img
        src="/assets/bot.png"
        alt="Bot"
        class="h-8 w-8 object-contain"
      />
    </button>

    <div
      v-else
      class="flex h-[70vh] w-[92vw] max-w-md flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
      role="dialog"
      aria-modal="false"
      :aria-label="t.title"
    >
      <header class="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <div>
          <p class="text-sm font-semibold text-neutral-900">{{ t.title }}</p>
          <p class="text-xs text-neutral-500">{{ t.subtitle }}</p>
        </div>
        <button
          type="button"
          class="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800"
          :aria-label="t.close"
          @click="isOpen = false"
        >
          ✕
        </button>
      </header>

      <div ref="messagesRef" class="flex-1 space-y-3 overflow-y-auto p-4">
        <div
          v-for="(message, index) in messages"
          :key="`${message.role}-${index}`"
          class="max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-6"
          :class="
            message.role === 'user'
              ? 'ml-auto bg-[#d84c4c] text-white'
              : 'bg-neutral-100 text-neutral-800'
          "
        >
          {{ message.content }}
        </div>
      </div>

      <div class="border-t border-neutral-200 p-3">
        <form class="flex gap-2" @submit.prevent="submitMessage">
          <input
            v-model="draft"
            type="text"
            class="h-11 flex-1 rounded-xl border border-neutral-300 px-3 text-sm text-neutral-900 outline-none focus:border-[#d84c4c]"
            :placeholder="t.placeholder"
          />
          <button
            type="submit"
            class="inline-flex h-11 items-center justify-center rounded-xl bg-[#d84c4c] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isLoading || !draft.trim()"
          >
            {{ isLoading ? t.sending : t.send }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type AssistantState = {
  profile: {
    goal: string
    target: string
    features: string
    budget: string
    timeline: string
  }
  contact: {
    fullName: string
    email: string
    phone: string
  }
  brief: string
  isBriefReady: boolean
  isSent: boolean
}

const locale = useState<'fr' | 'en'>('locale', () => 'fr')

const i18n = {
  fr: {
    open: 'Ouvrir assistant IA',
    close: 'Fermer assistant IA',
    title: 'Assistant IA',
    subtitle: 'Orientation + cahier de charges',
    placeholder: 'Expliquez votre besoin...',
    send: 'Envoyer',
    sending: 'Envoi...',
    teaser: 'Besoin d aide ?',
    welcome:
      'Bonjour, je suis l assistant IA de MEGA. Je vais vous poser quelques questions precises pour vous orienter. D abord, quel est votre objectif principal ?',
    error: 'Desole, une erreur est survenue. Reessayez dans quelques instants.',
  },
  en: {
    open: 'Open AI assistant',
    close: 'Close AI assistant',
    title: 'AI assistant',
    subtitle: 'Guidance + project brief',
    placeholder: 'Describe your project...',
    send: 'Send',
    sending: 'Sending...',
    teaser: 'Need help?',
    welcome:
      'Hi, I am MEGA AI assistant. I will ask you a few precise questions to guide you. First, what is your main project goal?',
    error: 'Sorry, an error occurred. Please try again in a moment.',
  },
} as const

const t = computed(() => i18n[locale.value])
const isOpen = ref(false)
const showTeaser = ref(false)
const isLoading = ref(false)
const draft = ref('')
const messagesRef = ref<HTMLElement | null>(null)
const assistantState = ref<AssistantState>({
  profile: { goal: '', target: '', features: '', budget: '', timeline: '' },
  contact: { fullName: '', email: '', phone: '' },
  brief: '',
  isBriefReady: false,
  isSent: false,
})
const messages = ref<ChatMessage[]>([{ role: 'assistant', content: t.value.welcome }])
let teaserInterval: ReturnType<typeof setInterval> | null = null
let teaserTimeout: ReturnType<typeof setTimeout> | null = null

watch(
  () => locale.value,
  () => {
    if (messages.value.length <= 1) {
      messages.value = [{ role: 'assistant', content: t.value.welcome }]
    }
  }
)

watch(
  () => messages.value.length,
  async () => {
    await nextTick()
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  }
)

function hideTeaserSoon() {
  if (teaserTimeout) clearTimeout(teaserTimeout)
  teaserTimeout = setTimeout(() => {
    showTeaser.value = false
  }, 2800)
}

onMounted(() => {
  teaserInterval = setInterval(() => {
    if (isOpen.value) return
    showTeaser.value = true
    hideTeaserSoon()
  }, 10000)
})

onUnmounted(() => {
  if (teaserInterval) clearInterval(teaserInterval)
  if (teaserTimeout) clearTimeout(teaserTimeout)
})

watch(
  () => isOpen.value,
  (open) => {
    if (open) {
      showTeaser.value = false
      if (teaserTimeout) clearTimeout(teaserTimeout)
    }
  }
)

async function submitMessage() {
  const content = draft.value.trim()
  if (!content || isLoading.value) return

  const nextMessages = [...messages.value, { role: 'user' as const, content }]
  messages.value = nextMessages
  draft.value = ''
  isLoading.value = true

  try {
    const response = await $fetch<{ reply: string; state: AssistantState }>('/api/assistant/chat', {
      method: 'POST',
      body: {
        locale: locale.value,
        message: content,
        state: assistantState.value,
        messages: nextMessages.slice(-14),
      },
    })

    assistantState.value = response.state
    messages.value = [...messages.value, { role: 'assistant', content: response.reply }]
  } catch {
    messages.value = [...messages.value, { role: 'assistant', content: t.value.error }]
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.floating-bot {
  animation: float-bot 2.8s ease-in-out infinite;
}

@keyframes float-bot {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.teaser-fade-enter-active,
.teaser-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.teaser-fade-enter-from,
.teaser-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.teaser-bubble {
  background-color: #d84c4c;
  position: relative;
}

.teaser-bubble::after {
  content: '';
  position: absolute;
  right: 14px;
  bottom: -6px;
  width: 12px;
  height: 12px;
  background-color: #d84c4c;
  transform: rotate(45deg);
}
</style>
