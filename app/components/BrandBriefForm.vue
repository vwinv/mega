<template>
  <div class="brief" :class="theme === 'dark' && 'is-dark'">
    <div class="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 text-sm font-semibold text-[#e44545] hover:brightness-110"
          @click="emit('close')"
        >
          <span aria-hidden="true">←</span>
          {{ ui.back }}
        </button>
        <p class="text-[11px] font-bold tracking-[0.16em] text-[#e44545]">{{ ui.kicker }}</p>
      </div>

      <div v-if="done" class="brief-shell rounded-[1.6rem] p-8 sm:p-10">
        <p class="text-[11px] font-bold tracking-[0.16em] text-[#e44545]">{{ ui.done }}</p>
        <h2 class="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{{ ui.okTitle }}</h2>
        <p class="mt-3 max-w-xl text-sm leading-6 text-[#9a9592]">{{ ui.okBody }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            class="inline-flex items-center rounded-full bg-[#e44545] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110"
            @click="emit('close')"
          >
            {{ ui.backService }}
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-full border border-current/15 px-5 py-2.5 text-sm font-semibold hover:border-[#e44545]"
            @click="resetForm"
          >
            {{ ui.newForm }}
          </button>
        </div>
      </div>

      <template v-else>
        <div class="brief-shell rounded-[1.75rem] px-5 py-4 sm:px-7 sm:py-5">
          <div class="flex items-center justify-between gap-3 text-[13px]">
            <h2 class="font-bold">{{ ui.title }}</h2>
            <p class="text-[#8a8582]">
              <span class="font-bold text-[#e44545]">{{ progress }} %</span>
              {{ ui.filled }}
            </p>
          </div>

          <ol class="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-2">
            <li v-for="(step, i) in steps" :key="step.s" class="min-w-0">
              <button
                type="button"
                class="brief-step flex w-full flex-col gap-2.5 text-left"
                :class="i === stepIndex ? 'is-active' : i < maxReached ? 'is-done' : 'is-locked'"
                :disabled="i > maxReached"
                @click="jumpToStep(i)"
              >
                <span class="brief-bar block h-1 overflow-hidden rounded-full">
                  <span class="brief-bar-fill block h-full rounded-full" :style="{ width: stepFill(i) }" />
                </span>
                <span class="hidden items-center gap-2 truncate text-[12px] sm:flex" :class="i === stepIndex ? 'font-bold' : 'font-medium'">
                  <span class="font-extrabold text-[#e44545]" :class="i > maxReached && '!text-[#8a8582]'">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span class="truncate">{{ step.s }}</span>
                </span>
              </button>
            </li>
          </ol>
        </div>

        <div class="brief-card relative mt-4 flex min-h-[28rem] flex-col overflow-hidden rounded-[1.75rem] p-6 sm:min-h-[34rem] sm:p-10 lg:p-14">
          <div class="brief-orb" aria-hidden="true"></div>
          <div class="brief-orb brief-orb--inner" aria-hidden="true"></div>
          <div class="relative flex flex-1 flex-col">
            <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[#8a8582]">
              <span class="inline-flex items-center gap-2 font-bold text-[#e44545]">
                <span class="h-1.5 w-1.5 rounded-full bg-[#e44545]" aria-hidden="true"></span>
                {{ String(stepIndex + 1).padStart(2, '0') }} · {{ currentStep.s }}
              </span>
              <span>{{ ui.question }} {{ screenIndex + 1 }} {{ ui.of }} {{ screens.length }}</span>
            </div>

            <h3 class="mt-4 max-w-2xl text-[1.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {{ screenTitle }}
            </h3>
            <p v-if="screenHint" class="mt-3 max-w-xl text-[15px] leading-6 text-[#9a9592]">
              {{ screenHint }}
            </p>
            <p v-else-if="pickHint" class="mt-2 text-[13px] text-[#8a8582]">
              {{ pickHint }}
            </p>

            <div class="mt-8 space-y-5">
              <div v-for="q in currentScreen.items" :key="q.id" class="space-y-2.5">
                <label
                  v-if="currentScreen.items.length > 1 || (q.ty !== 'pick' && q.ty !== 'files')"
                  class="block text-[13px] font-medium text-[#8a8582]"
                >
                  {{ q.l }}
                  <span v-if="isQuestionRequired(q)" class="text-[#e44545]"> *</span>
                </label>

                <input
                  v-if="q.ty === 'text'"
                  v-model="answers[q.id]"
                  type="text"
                  :placeholder="q.ph"
                  class="brief-input w-full px-0 py-3 text-[15px] outline-none"
                  :class="showError && !fieldOk(q) && 'is-error'"
                />

                <textarea
                  v-else-if="q.ty === 'area'"
                  v-model="answers[q.id]"
                  rows="4"
                  :placeholder="q.ph"
                  class="brief-input w-full rounded-2xl px-4 py-3.5 text-[15px] outline-none"
                />

                <div v-else-if="q.ty === 'files'" class="space-y-3">
                  <label
                    class="brief-upload flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-dashed px-6 py-10 text-center transition hover:border-[#e44545]"
                  >
                    <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e44545] text-2xl font-light leading-none text-white" aria-hidden="true">+</span>
                    <span class="text-[15px] font-semibold">{{ ui.uploadTitle }}</span>
                    <span class="text-[13px] text-[#8a8582]">{{ ui.uploadHint }}</span>
                    <input
                      type="file"
                      class="sr-only"
                      multiple
                      :accept="q.accept || 'image/*,.pdf,application/pdf'"
                      @change="onFilesSelected(q, $event)"
                    />
                  </label>
                  <ul v-if="logoFiles(q).length" class="space-y-2">
                    <li
                      v-for="(file, fileIndex) in logoFiles(q)"
                      :key="`${file.name}-${file.size}-${fileIndex}`"
                      class="brief-file flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm"
                    >
                      <span class="min-w-0 truncate font-medium">{{ file.name }}</span>
                      <button
                        type="button"
                        class="shrink-0 text-[#e44545] hover:brightness-110"
                        @click="removeFile(q, fileIndex)"
                      >
                        {{ ui.removeFile }}
                      </button>
                    </li>
                  </ul>
                </div>

                <div v-else-if="q.ui === 'seg'" class="flex flex-wrap gap-2.5 sm:flex-nowrap">
                  <button
                    v-for="opt in q.o || []"
                    :key="optionValue(opt)"
                    type="button"
                    class="brief-chip rounded-full px-5 py-3.5 text-sm font-medium sm:flex-1 sm:justify-center"
                    :class="[
                      isSelected(q, optionValue(opt)) && 'is-on',
                      isPickDisabled(q, optionValue(opt)) && 'is-disabled',
                    ]"
                    :disabled="isPickDisabled(q, optionValue(opt))"
                    @click="togglePick(q, optionValue(opt))"
                  >
                    {{ optionValue(opt) }}
                  </button>
                </div>

                <div v-else-if="usesCardLayout(q)" class="grid gap-3 sm:grid-cols-2">
                  <button
                    v-for="opt in q.o || []"
                    :key="optionValue(opt)"
                    type="button"
                    class="brief-option rounded-[1.35rem] px-5 py-4 text-left sm:px-6 sm:py-5"
                    :class="[
                      isSelected(q, optionValue(opt)) && 'is-on',
                      isPickDisabled(q, optionValue(opt)) && 'is-disabled',
                    ]"
                    :disabled="isPickDisabled(q, optionValue(opt))"
                    @click="togglePick(q, optionValue(opt))"
                  >
                    <span class="block text-[15px] font-semibold leading-snug tracking-tight">{{ optionValue(opt) }}</span>
                    <span v-if="optionDesc(opt)" class="mt-2 block text-[13px] leading-6 text-[#8a8582]">{{ optionDesc(opt) }}</span>
                  </button>
                </div>

                <div v-else-if="q.ui === 'swatches'" class="flex flex-wrap gap-3 sm:gap-4">
                  <button
                    v-for="opt in q.o || []"
                    :key="optionValue(opt)"
                    type="button"
                    class="brief-swatch group flex w-[4.75rem] flex-col items-center gap-2 sm:w-[5.25rem]"
                    :class="[
                      isSelected(q, optionValue(opt)) && 'is-on',
                      isPickDisabled(q, optionValue(opt)) && 'is-disabled',
                    ]"
                    :disabled="isPickDisabled(q, optionValue(opt))"
                    :aria-pressed="isSelected(q, optionValue(opt))"
                    @click="togglePick(q, optionValue(opt))"
                  >
                    <span
                      class="brief-swatch-dot relative block h-12 w-12 rounded-full sm:h-14 sm:w-14"
                      :class="isLightSwatch(opt) && 'is-light'"
                      :style="{ background: optionColor(opt) || '#ccc' }"
                    >
                      <span
                        v-if="isSelected(q, optionValue(opt))"
                        class="brief-swatch-check absolute inset-0 flex items-center justify-center text-sm font-bold"
                        aria-hidden="true"
                      >✓</span>
                    </span>
                    <span class="text-center text-[11px] font-medium leading-tight sm:text-[12px]">{{ optionValue(opt) }}</span>
                  </button>
                </div>

                <div v-else-if="q.ui === 'typecards'" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    v-for="opt in q.o || []"
                    :key="optionValue(opt)"
                    type="button"
                    class="brief-typecard flex flex-col items-center justify-between gap-4 rounded-[1.25rem] px-4 py-5 text-center sm:min-h-[11.5rem] sm:px-5 sm:py-6"
                    :class="[
                      isSelected(q, optionValue(opt)) && 'is-on',
                      isPickDisabled(q, optionValue(opt)) && 'is-disabled',
                    ]"
                    :disabled="isPickDisabled(q, optionValue(opt))"
                    :aria-pressed="isSelected(q, optionValue(opt))"
                    @click="togglePick(q, optionValue(opt))"
                  >
                    <span
                      class="brief-typecard-preview block text-[2.75rem] leading-none sm:text-[3.25rem]"
                      :style="{ fontFamily: optionFont(opt) || 'inherit' }"
                      aria-hidden="true"
                    >Aa</span>
                    <span class="text-[12px] font-medium leading-snug sm:text-[13px]">{{ optionValue(opt) }}</span>
                  </button>
                </div>

                <div v-else class="flex flex-wrap gap-2.5">
                  <button
                    v-for="opt in q.o || []"
                    :key="optionValue(opt)"
                    type="button"
                    class="brief-chip rounded-full px-5 py-3.5 text-sm font-medium"
                    :class="[
                      isSelected(q, optionValue(opt)) && 'is-on',
                      isPickDisabled(q, optionValue(opt)) && 'is-disabled',
                    ]"
                    :disabled="isPickDisabled(q, optionValue(opt))"
                    @click="togglePick(q, optionValue(opt))"
                  >
                    {{ optionValue(opt) }}
                  </button>
                </div>

                <input
                  v-if="q.other && needsOther(q)"
                  v-model="answers[`${q.id}_other`]"
                  type="text"
                  :placeholder="ui.otherPh"
                  class="brief-input w-full px-0 py-3 text-[15px] outline-none"
                />
              </div>
            </div>

            <p v-if="showError" class="mt-4 text-sm text-[#e44545]">{{ ui.error }}</p>
            <p v-if="submitError" class="mt-4 text-sm text-[#e44545]">{{ submitError }}</p>

            <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-10">
              <button
                type="button"
                class="brief-prev inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[15px] font-semibold disabled:opacity-35"
                :disabled="stepIndex === 0 && screenIndex === 0"
                @click="goPrev"
              >
                <span aria-hidden="true">←</span>
                {{ ui.prev }}
              </button>
              <button
                type="button"
                class="brief-next inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[15px] font-semibold text-white disabled:opacity-60"
                :disabled="submitting"
                @click="goNext()"
              >
                {{ isLastScreen ? (submitting ? ui.sending : ui.send) : ui.next }}
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getBriefSteps,
  isFilled,
  isQuestionRequired,
  LOGO_KEEP,
  optionColor,
  optionDesc,
  optionFont,
  optionValue,
  screenComplete,
  screensOf,
  type BriefOption,
  type BriefQuestion,
} from '~/utils/branding-brief'

const LOGO_DESIGN_FIELDS = [
  'type_logo',
  'couleurs',
  'style',
  'typo',
  'couleurs_eviter',
  'inspi',
] as const

const emit = defineEmits<{ close: [] }>()

const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const theme = useState<'light' | 'dark'>('mega-theme', () => 'light')

const steps = computed(() => getBriefSteps(locale.value))
const stepIndex = ref(0)
const screenIndex = ref(0)
const maxReached = ref(0)
const answers = reactive<Record<string, any>>({})
const showError = ref(false)
const submitError = ref('')
const submitting = ref(false)
const done = ref(false)
let advanceTimer: ReturnType<typeof setTimeout> | null = null

const copy = {
  fr: {
    back: 'Retour aux détails',
    kicker: 'BRANDING · DEMANDE DE DEVIS',
    title: 'Formulaire de découverte',
    filled: 'complété',
    question: 'Question',
    of: 'sur',
    many: 'Plusieurs choix possibles',
    one: 'Un seul choix',
    selected: 'sélectionnée(s)',
    otherPh: 'Précisez…',
    error: 'Merci de renseigner les champs obligatoires pour continuer.',
    prev: 'Précédent',
    next: 'Continuer',
    send: 'Envoyer le formulaire',
    sending: 'Envoi…',
    done: 'FORMULAIRE ENVOYÉ',
    okTitle: 'Merci pour vos réponses !',
    okBody: 'Votre formulaire a bien été envoyé à notre équipe. Nous revenons vers vous sous 48 h pour en discuter et vous proposer une offre adaptée.',
    backService: 'Retour aux détails',
    newForm: 'Remplir un nouveau formulaire',
    uploadTitle: 'Cliquez pour joindre vos fichiers',
    uploadHint: 'Images ou PDF — plusieurs fichiers possibles',
    removeFile: 'Retirer',
  },
  en: {
    back: 'Back to details',
    kicker: 'BRANDING · QUOTE REQUEST',
    title: 'Discovery form',
    filled: 'complete',
    question: 'Question',
    of: 'of',
    many: 'Multiple choices allowed',
    one: 'Single choice',
    selected: 'selected',
    otherPh: 'Please specify…',
    error: 'Please fill in the required fields to continue.',
    prev: 'Back',
    next: 'Continue',
    send: 'Send the form',
    sending: 'Sending…',
    done: 'FORM SENT',
    okTitle: 'Thank you for your answers!',
    okBody: 'Your form has been sent to our team. We will get back to you within 48 hours to discuss and propose a suitable offer.',
    backService: 'Back to details',
    newForm: 'Fill a new form',
    uploadTitle: 'Click to attach your files',
    uploadHint: 'Images or PDF — multiple files allowed',
    removeFile: 'Remove',
  },
} as const

const ui = computed(() => copy[locale.value])
const currentStep = computed(() => steps.value[stepIndex.value])
const screens = computed(() => {
  const list = screensOf(currentStep.value, answers)
  // Option 2 « Oui, à garder tel quel » : uniquement logo + upload, pas de création/refonte.
  if (answers.logo !== LOGO_KEEP) return list
  if (currentStep.value.s !== 'Identité visuelle') return list
  return list.filter((screen) =>
    screen.items.every((q) => q.id === 'logo' || q.id === 'logo_files'),
  )
})
const currentScreen = computed(() => screens.value[Math.min(screenIndex.value, screens.value.length - 1)] || { items: [] })
const isLastScreen = computed(
  () => stepIndex.value === steps.value.length - 1 && screenIndex.value >= screens.value.length - 1,
)

const screenTitle = computed(() => {
  if (currentScreen.value.gt) return currentScreen.value.gt
  const first = currentScreen.value.items[0]
  return first?.l || currentStep.value.t
})

const screenHint = computed(() => currentScreen.value.gh || '')

const EXCLUSIVE_PICKS = new Set(["Nulle part pour l'instant", 'Les trois'])

const pickHint = computed(() => {
  if (currentScreen.value.items.length !== 1) return ''
  const q = currentScreen.value.items[0]
  if (q.ty !== 'pick') return ''
  if (q.many) {
    const selected = Array.isArray(answers[q.id]) ? answers[q.id] : []
    if (q.id === 'cible') {
      if (selected.includes('Les trois')) return 'Les trois audiences sélectionnées'
      if (q.max) return `${selected.length} / ${q.max} ${ui.value.selected} (parmi les 3 premières)`
    }
    if (q.max) {
      return `${selected.length} / ${q.max} ${ui.value.selected}`
    }
    return ui.value.many
  }
  return ui.value.one
})

function usesCardLayout(q: BriefQuestion) {
  if (q.ui !== 'cards') return false
  return (q.o || []).some((opt) => !!optionDesc(opt))
}

function isLightSwatch(opt: BriefOption) {
  const value = optionValue(opt).toLowerCase()
  return value.includes('blanc') || value.includes('beige') || value.includes('jaune')
}

const progress = computed(() => {
  const all = steps.value.flatMap((step) =>
    step.q.filter((q) => !q.when || q.when(answers)),
  )
  if (!all.length) return 0
  const answered = all.filter((q) => isFilled(answers[q.id])).length
  return Math.round((answered / all.length) * 100)
})

function stepFill(i: number) {
  if (i > maxReached.value) return '0%'
  if (i < stepIndex.value) return '100%'
  if (!screens.value.length) return '0%'
  return `${Math.round(((screenIndex.value + 1) / screens.value.length) * 100)}%`
}

function jumpToStep(i: number) {
  if (i > maxReached.value || i === stepIndex.value) return
  showError.value = false
  stepIndex.value = i
  screenIndex.value = 0
}

function fieldOk(q: BriefQuestion) {
  if (!isQuestionRequired(q)) return true
  if (q.id === 'email' && isFilled(answers.email)) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(answers.email).trim())
  }
  return isFilled(answers[q.id])
}

function isSelected(q: BriefQuestion, value: string) {
  const current = answers[q.id]
  if (q.many) return Array.isArray(current) && current.includes(value)
  return current === value
}

function needsOther(q: BriefQuestion) {
  const current = answers[q.id]
  const values = Array.isArray(current) ? current : current ? [current] : []
  return values.some((v) => String(v).toLowerCase().includes('autre'))
}

function canAutoAdvance(q: BriefQuestion, selected: string) {
  // Les choix multiples (ex. valeurs) exigent un clic sur Continuer.
  if (q.many) return false
  if (currentScreen.value.items.length !== 1) return false
  if (q.other && selected.toLowerCase().includes('autre')) return false
  return true
}

function isPickDisabled(q: BriefQuestion, value: string) {
  if (!q.many) return false
  if (isSelected(q, value)) return false
  const current = Array.isArray(answers[q.id]) ? answers[q.id] : []
  if (current.some((v) => EXCLUSIVE_PICKS.has(String(v))) && !EXCLUSIVE_PICKS.has(value)) {
    return true
  }
  if (EXCLUSIVE_PICKS.has(value)) return false
  if (q.max && current.length >= q.max) return true
  return false
}

function togglePick(q: BriefQuestion, value: string) {
  showError.value = false
  if (advanceTimer) {
    clearTimeout(advanceTimer)
    advanceTimer = null
  }
  if (q.many) {
    if (isPickDisabled(q, value)) return
    const current = Array.isArray(answers[q.id]) ? [...answers[q.id]] : []
    const idx = current.indexOf(value)
    if (idx >= 0) {
      current.splice(idx, 1)
      answers[q.id] = current
      return
    }
    if (EXCLUSIVE_PICKS.has(value)) {
      answers[q.id] = [value]
      return
    }
    const withoutExclusive = current.filter((v) => !EXCLUSIVE_PICKS.has(String(v)))
    if (q.max && withoutExclusive.length >= q.max) return
    withoutExclusive.push(value)
    answers[q.id] = withoutExclusive
    return
  }
  answers[q.id] = value
  if (q.id === 'logo' && value === LOGO_KEEP) {
    for (const field of LOGO_DESIGN_FIELDS) {
      delete answers[field]
      delete answers[`${field}_other`]
    }
    // Repart de la question logo pour enchaîner uniquement sur l’upload.
    screenIndex.value = 0
  }
  if (!canAutoAdvance(q, value)) return
  advanceTimer = setTimeout(() => {
    void goNext(true)
  }, 280)
}

function goPrev() {
  showError.value = false
  submitError.value = ''
  if (screenIndex.value > 0) {
    screenIndex.value -= 1
    return
  }
  if (stepIndex.value > 0) {
    stepIndex.value -= 1
    const prevScreens = screensOf(steps.value[stepIndex.value], answers)
    screenIndex.value = Math.max(0, prevScreens.length - 1)
  }
}

async function goNext(fromAuto = false) {
  showError.value = false
  submitError.value = ''
  if (!screenComplete(currentScreen.value, answers)) {
    if (!fromAuto) showError.value = true
    return
  }

  if (screenIndex.value < screens.value.length - 1) {
    screenIndex.value += 1
    return
  }

  if (stepIndex.value < steps.value.length - 1) {
    stepIndex.value += 1
    maxReached.value = Math.max(maxReached.value, stepIndex.value)
    screenIndex.value = 0
    return
  }

  if (fromAuto) return
  await submit()
}

function logoFiles(q: BriefQuestion): File[] {
  const value = answers[q.id]
  return Array.isArray(value) ? value.filter((file): file is File => file instanceof File) : []
}

function onFilesSelected(q: BriefQuestion, event: Event) {
  const input = event.target as HTMLInputElement
  const picked = Array.from(input.files || [])
  if (!picked.length) return
  const current = logoFiles(q)
  const merged = [...current]
  for (const file of picked) {
    const duplicate = merged.some((f) => f.name === file.name && f.size === file.size)
    if (!duplicate) merged.push(file)
  }
  answers[q.id] = merged.slice(0, 8)
  input.value = ''
}

function removeFile(q: BriefQuestion, index: number) {
  const current = logoFiles(q)
  current.splice(index, 1)
  answers[q.id] = [...current]
}

function formatAnswers() {
  const lines: string[] = []
  for (const step of steps.value) {
    lines.push(`## ${step.s}`)
    for (const q of step.q) {
      if (q.when && !q.when(answers)) continue
      const value = answers[q.id]
      if (!isFilled(value) && !isFilled(answers[`${q.id}_other`])) continue
      let text = ''
      if (q.ty === 'files') {
        text = logoFiles(q).map((file) => file.name).join(', ') || '(aucun fichier)'
      } else if (Array.isArray(value)) {
        text = value.join(', ')
      } else {
        text = String(value || '')
      }
      if (needsOther(q) && isFilled(answers[`${q.id}_other`])) {
        text = `${text}${text ? ' — ' : ''}${answers[`${q.id}_other`]}`
      }
      lines.push(`${q.l}: ${text}`)
    }
    lines.push('')
  }
  return lines.join('\n').trim()
}

function collectLogoAttachments() {
  const files = Array.isArray(answers.logo_files)
    ? answers.logo_files.filter((file: unknown): file is File => file instanceof File)
    : []
  return files
}

async function submit() {
  submitting.value = true
  try {
    const fullName = String(answers.nom || '').trim()
    const [firstName, ...rest] = fullName.split(/\s+/)
    const lastName = rest.join(' ') || '-'
    const files = collectLogoAttachments()
    const form = new FormData()
    form.append('firstName', firstName || 'Client')
    form.append('lastName', lastName)
    form.append('email', String(answers.email || '').trim())
    form.append('phone', String(answers.tel || '').trim())
    form.append('serviceTitle', 'Branding')
    form.append(
      'projectDescription',
      formatAnswers() || 'Formulaire de découverte Branding (sans détail supplémentaire).',
    )
    for (const file of files) {
      form.append('files', file, file.name)
    }
    await $fetch('/api/mailing/quote', {
      method: 'POST',
      body: form,
    })
    done.value = true
  } catch (err: any) {
    submitError.value = err?.data?.message || err?.message || ui.value.error
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  Object.keys(answers).forEach((key) => delete answers[key])
  stepIndex.value = 0
  screenIndex.value = 0
  maxReached.value = 0
  showError.value = false
  submitError.value = ''
  done.value = false
}

watch(screens, (list) => {
  if (screenIndex.value > list.length - 1) screenIndex.value = Math.max(0, list.length - 1)
})
</script>

<style scoped>
.brief {
  color: inherit;
}

.brief-shell,
.brief-card {
  background: #141414;
  border: 1px solid #262626;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.28);
  color: #f7f7f7;
}

.brief-step {
  color: #9a9592;
}

.brief-step.is-active {
  color: #fff;
}

.brief-step.is-done {
  color: #d0cbc7;
}

.brief-step.is-locked {
  color: #6f6a67;
  cursor: default;
}

.brief-bar {
  background: #2a2a2a;
}

.brief-bar-fill {
  width: 0;
  background: #e44545;
  transition: width 0.55s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.brief-orb {
  position: absolute;
  right: -10rem;
  top: -10rem;
  width: 26rem;
  height: 26rem;
  border-radius: 999px;
  border: 1px solid #2a2a2a;
  pointer-events: none;
}

.brief-orb--inner {
  right: -4.5rem;
  top: -4.5rem;
  width: 15rem;
  height: 15rem;
  border-color: rgba(228, 69, 69, 0.25);
}

.brief-input {
  border: none;
  border-bottom: 1px solid #333;
  border-radius: 0;
  background: transparent;
  color: #fff;
}

.brief-input::placeholder {
  color: #6f6a67;
}

.brief-input.is-error {
  border-bottom-color: #e44545;
}

textarea.brief-input {
  border: 1px solid #333;
  border-radius: 1.25rem;
  background: #0f0f0f;
}

.brief-chip,
.brief-option {
  display: inline-flex;
  align-items: center;
  border: 1px solid #333;
  background: #101010;
  color: #f7f7f7;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}

.brief-upload,
.brief-file {
  border-color: #333;
  background: #101010;
  color: #f7f7f7;
}

.brief-swatch {
  color: inherit;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.brief-swatch-dot {
  border: 2px solid transparent;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.brief-swatch-dot.is-light {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.14);
}

.brief-swatch.is-on .brief-swatch-dot {
  box-shadow: 0 0 0 2px #e44545, 0 0 0 5px rgba(228, 69, 69, 0.18);
  transform: scale(1.04);
}

.brief-swatch-check {
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.brief-swatch-dot.is-light .brief-swatch-check {
  color: #111;
  text-shadow: none;
}

.brief-swatch.is-disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.brief-typecard {
  border: 1px solid #333;
  background: #101010;
  color: #f7f7f7;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
}

.brief-typecard.is-on {
  border-color: #e44545;
  box-shadow: 0 0 0 1px #e44545;
}

.brief-typecard.is-disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.brief-option {
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.15rem;
}

.brief-prev {
  border-color: #333;
  color: #f7f7f7;
  background: transparent;
}

.brief-chip.is-on {
  border-color: #e44545;
  background: rgba(228, 69, 69, 0.08);
  color: #fff;
  box-shadow: 0 0 0 1px #e44545;
}

.brief-chip.is-disabled,
.brief-option.is-disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.brief-option.is-on {
  border-color: #e44545;
  background: #e44545;
  color: #fff;
  box-shadow: 0 10px 24px rgba(228, 69, 69, 0.25);
}

.brief-option.is-on span:last-child {
  color: rgba(255, 255, 255, 0.88);
}

.brief-next {
  background: #e44545;
  background-image: linear-gradient(#000, #000);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  transition: background-size 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.brief-next:hover {
  background-size: 100% 100%;
}

.brief:not(.is-dark) .brief-shell,
.brief:not(.is-dark) .brief-card {
  background: #fff;
  border-color: #ece7e4;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  color: #111;
}

.brief:not(.is-dark) .brief-step.is-active {
  color: #111;
}

.brief:not(.is-dark) .brief-bar {
  background: #e8e4e1;
}

.brief:not(.is-dark) .brief-orb {
  border-color: #e8e4e1;
}

.brief:not(.is-dark) .brief-input {
  color: #111;
  border-bottom-color: #ddd7d2;
}

.brief:not(.is-dark) .brief-prev {
  border-color: #e4dfdb;
  background: #fff;
  color: #111;
}

.brief:not(.is-dark) textarea.brief-input,
.brief:not(.is-dark) .brief-chip,
.brief:not(.is-dark) .brief-option,
.brief:not(.is-dark) .brief-upload,
.brief:not(.is-dark) .brief-file,
.brief:not(.is-dark) .brief-typecard {
  background: #fff;
  border-color: #e4dfdb;
  color: #111;
}

.brief:not(.is-dark) .brief-typecard.is-on {
  border-color: #e44545;
  background: #fff;
  color: #111;
  box-shadow: 0 0 0 1px #e44545;
}

.brief:not(.is-dark) .brief-option.is-on span:last-child {
  color: rgba(255, 255, 255, 0.88);
}

.brief:not(.is-dark) .brief-chip.is-on {
  background: rgba(228, 69, 69, 0.08);
  border-color: #e44545;
  color: #111;
  box-shadow: 0 0 0 1px #e44545;
}

.brief:not(.is-dark) .brief-option.is-on {
  background: #e44545;
  border-color: #e44545;
  color: #fff;
}
</style>
