<template>
  <div class="apply mx-auto w-full max-w-4xl" :class="theme === 'dark' && 'is-dark'" id="postuler">
    <div v-if="done" class="apply-shell rounded-[1.75rem] p-8 sm:p-10">
      <p class="text-[11px] font-bold tracking-[0.16em] text-[#e44545]">{{ ui.done }}</p>
      <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-[#111] sm:text-4xl">{{ ui.okTitle }}</h2>
      <p class="mt-3 max-w-xl text-sm leading-6 text-[#9a9592]">{{ ui.okBody }}</p>
      <button
        type="button"
        class="mt-8 inline-flex items-center rounded-full bg-[#e44545] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110"
        @click="resetForm"
      >
        {{ ui.newForm }}
      </button>
    </div>

    <template v-else>
      <div class="apply-shell rounded-[1.75rem] px-5 py-4 sm:px-7 sm:py-5">
        <div class="flex items-center justify-between gap-3 text-[13px]">
          <h2 class="font-bold text-[#111]">{{ ui.title }}</h2>
          <p class="text-[#8a8582]">
            <span class="font-bold text-[#e44545]">{{ progress }} %</span>
            {{ ui.filled }}
          </p>
        </div>

        <ol class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <li v-for="(step, i) in steps" :key="step.s" class="min-w-0">
            <button
              type="button"
              class="apply-step flex w-full flex-col gap-2.5 text-left"
              :class="i === stepIndex ? 'is-active' : i < maxReached ? 'is-done' : 'is-locked'"
              :disabled="i > maxReached"
              @click="jumpToStep(i)"
            >
              <span class="apply-bar block h-1 overflow-hidden rounded-full">
                <span class="apply-bar-fill block h-full rounded-full" :style="{ width: stepFill(i) }" />
              </span>
              <span
                class="flex items-center gap-2 truncate text-[12px]"
                :class="i === stepIndex ? 'font-bold text-[#111]' : 'font-medium text-[#8a8582]'"
              >
                <span class="font-extrabold text-[#e44545]" :class="i > maxReached && '!text-[#8a8582]'">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <span class="truncate">{{ step.s }}</span>
              </span>
            </button>
          </li>
        </ol>
      </div>

      <div class="apply-card relative mt-4 flex flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-8 lg:p-10">
        <div class="apply-orb" aria-hidden="true"></div>
        <div class="apply-orb apply-orb--inner" aria-hidden="true"></div>

        <div class="relative flex flex-1 flex-col">
          <p class="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-[#8a8582]">
            <span class="inline-flex items-center gap-2 font-bold text-[#e44545]">
              <span class="h-1.5 w-1.5 rounded-full bg-[#e44545]" aria-hidden="true"></span>
              {{ String(stepIndex + 1).padStart(2, '0') }} · {{ currentStep.s }}
            </span>
            <span>·</span>
            <span>{{ ui.offerLabel }}</span>
          </p>

          <h3 class="mt-4 max-w-2xl text-[1.75rem] font-extrabold leading-[1.05] tracking-tight text-[#111] sm:text-4xl lg:text-[2.75rem]">
            {{ currentStep.t }}
          </h3>
          <p class="mt-3 max-w-xl text-[15px] leading-6 text-[#9a9592]">{{ currentStep.p }}</p>

          <div
            class="mt-8 gap-x-8 gap-y-6"
            :class="isContactStep ? 'grid sm:grid-cols-2' : 'space-y-6'"
          >
            <div v-for="q in currentStep.q" :key="q.id" class="space-y-2.5">
              <label class="block text-[12px] font-bold text-[#8a8582]">
                {{ q.l }}
                <span v-if="q.req" class="text-[#e44545]"> *</span>
              </label>

              <input
                v-if="q.ty === 'text'"
                v-model="answers[q.id]"
                type="text"
                :placeholder="q.ph"
                class="apply-input w-full px-0 py-3 text-[15px] outline-none"
                :class="showError && !fieldOk(q) && 'is-error'"
              />

              <textarea
                v-else-if="q.ty === 'area'"
                v-model="answers[q.id]"
                rows="4"
                :placeholder="q.ph"
                class="apply-input w-full resize-y px-0 py-3 text-[15px] outline-none"
                :class="showError && !fieldOk(q) && 'is-error'"
              />

              <div v-else-if="q.ty === 'files'" class="space-y-3">
                <label class="apply-upload flex cursor-pointer items-center gap-4 rounded-[1.35rem] border border-dashed px-5 py-5 transition hover:border-[#e44545]">
                  <span
                    class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e44545] text-2xl font-light leading-none text-white"
                    aria-hidden="true"
                  >+</span>
                  <span class="min-w-0">
                    <span class="block text-[15px] font-semibold text-[#111]">{{ ui.uploadTitle }}</span>
                    <span class="mt-0.5 block text-[13px] text-[#8a8582]">{{ ui.uploadHint }}</span>
                  </span>
                  <input
                    type="file"
                    class="sr-only"
                    :accept="q.accept || 'image/*,.pdf,.doc,.docx'"
                    @change="onFilesSelected(q, $event)"
                  />
                </label>
                <ul v-if="fileList(q).length" class="space-y-2">
                  <li
                    v-for="(file, fileIndex) in fileList(q)"
                    :key="`${file.name}-${file.size}-${fileIndex}`"
                    class="apply-file flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm"
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

              <div v-else-if="q.ui === 'cards'" class="grid gap-3 sm:grid-cols-2">
                <button
                  v-for="opt in q.o || []"
                  :key="optionValue(opt)"
                  type="button"
                  class="apply-option rounded-[1.35rem] px-5 py-4 text-left"
                  :class="isSelected(q, optionValue(opt)) && 'is-on'"
                  @click="togglePick(q, optionValue(opt))"
                >
                  <span class="block text-[15px] font-semibold leading-snug tracking-tight">{{ optionValue(opt) }}</span>
                  <span v-if="optionDesc(opt)" class="mt-2 block text-[13px] leading-6 text-[#8a8582]">{{ optionDesc(opt) }}</span>
                </button>
              </div>

              <div v-else class="flex flex-wrap gap-2.5">
                <button
                  v-for="opt in q.o || []"
                  :key="optionValue(opt)"
                  type="button"
                  class="apply-chip rounded-full px-5 py-3.5 text-sm font-medium"
                  :class="isSelected(q, optionValue(opt)) && 'is-on'"
                  @click="togglePick(q, optionValue(opt))"
                >
                  {{ optionValue(opt) }}
                </button>
              </div>
            </div>
          </div>

          <p v-if="showError" class="mt-4 text-sm text-[#e44545]">{{ ui.error }}</p>
          <p v-if="submitError" class="mt-4 text-sm text-[#e44545]">{{ submitError }}</p>

          <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-10">
            <p v-if="stepIndex === 0" class="text-sm text-[#8a8582]">{{ currentStep.time }}</p>
            <button
              v-else
              type="button"
              class="apply-prev inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[15px] font-semibold"
              @click="goPrev"
            >
              <span aria-hidden="true">←</span>
              {{ ui.prev }}
            </button>

            <button
              type="button"
              class="apply-next inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[15px] font-semibold text-white disabled:opacity-60"
              :disabled="submitting"
              @click="goNext"
            >
              {{ isLast ? (submitting ? ui.sending : ui.send) : ui.next }}
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  getApplySteps,
  isFilled,
  optionDesc,
  optionValue,
  type ApplyQuestion,
} from '~/utils/career-apply'

const locale = useState<'fr' | 'en'>('locale', () => 'fr')
const theme = useState<'light' | 'dark'>('mega-theme', () => 'light')
const route = useRoute()

onMounted(() => {
  if (route.hash !== '#postuler') return
  nextTick(() => {
    document.getElementById('postuler')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})

const steps = computed(() => getApplySteps(locale.value))
const stepIndex = ref(0)
const maxReached = ref(0)
const answers = reactive<Record<string, any>>({})
const showError = ref(false)
const submitError = ref('')
const submitting = ref(false)
const done = ref(false)

const copy = {
  fr: {
    title: "Postuler · Apporteurs d'affaires",
    filled: 'complété',
    offerLabel: "Apporteurs d'affaires",
    error: 'Merci de renseigner les champs obligatoires pour continuer.',
    prev: 'Précédent',
    next: 'Continuer',
    send: 'Envoyer ma candidature',
    sending: 'Envoi…',
    done: 'CANDIDATURE ENVOYÉE',
    okTitle: 'Merci pour votre candidature !',
    okBody: 'Nous avons bien reçu vos informations. Notre équipe revient vers vous sous 48 h pour un premier échange.',
    newForm: 'Remplir une nouvelle candidature',
    uploadTitle: 'Joindre votre CV ou une présentation',
    uploadHint: 'PDF, Word ou image — facultatif',
    removeFile: 'Retirer',
  },
  en: {
    title: 'Apply · Business introducers',
    filled: 'complete',
    offerLabel: 'Business introducers',
    error: 'Please fill in the required fields to continue.',
    prev: 'Back',
    next: 'Continue',
    send: 'Send my application',
    sending: 'Sending…',
    done: 'APPLICATION SENT',
    okTitle: 'Thank you for applying!',
    okBody: 'We received your details. Our team will get back to you within 48 hours for a first conversation.',
    newForm: 'Submit another application',
    uploadTitle: 'Attach your CV or a presentation',
    uploadHint: 'PDF, Word or image — optional',
    removeFile: 'Remove',
  },
} as const

const ui = computed(() => copy[locale.value])
const currentStep = computed(() => steps.value[stepIndex.value])
const isLast = computed(() => stepIndex.value === steps.value.length - 1)
const isContactStep = computed(() => stepIndex.value === 0)

const progress = computed(() => {
  const all = steps.value.flatMap((step) => step.q.filter((q) => q.req))
  if (!all.length) return 0
  const answered = all.filter((q) => isFilled(answers[q.id])).length
  return Math.round((answered / all.length) * 100)
})

function fieldOk(q: ApplyQuestion) {
  if (!q.req) return true
  if (q.ty === 'files') return isFilled(answers[q.id])
  return isFilled(answers[q.id])
}

function fileList(q: ApplyQuestion): File[] {
  return Array.isArray(answers[q.id]) ? answers[q.id] : []
}

function onFilesSelected(q: ApplyQuestion, event: Event) {
  const input = event.target as HTMLInputElement
  const selected = Array.from(input.files || [])
  if (!selected.length) return
  answers[q.id] = [...fileList(q), ...selected].slice(0, 3)
  input.value = ''
  showError.value = false
}

function removeFile(q: ApplyQuestion, index: number) {
  const next = [...fileList(q)]
  next.splice(index, 1)
  answers[q.id] = next
}

function stepComplete(index: number) {
  return steps.value[index].q.every((q) => fieldOk(q))
}

function stepFill(index: number) {
  if (index < stepIndex.value) return '100%'
  if (index > stepIndex.value) return '0%'
  const qs = steps.value[index].q.filter((q) => q.req)
  if (!qs.length) return stepComplete(index) ? '100%' : '0%'
  const n = qs.filter((q) => isFilled(answers[q.id])).length
  return `${Math.round((n / qs.length) * 100)}%`
}

function isSelected(q: ApplyQuestion, value: string) {
  const current = answers[q.id]
  if (q.many) return Array.isArray(current) && current.includes(value)
  return current === value
}

function togglePick(q: ApplyQuestion, value: string) {
  if (q.many) {
    const current = Array.isArray(answers[q.id]) ? [...answers[q.id]] : []
    const idx = current.indexOf(value)
    if (idx >= 0) current.splice(idx, 1)
    else current.push(value)
    answers[q.id] = current
  } else {
    answers[q.id] = value
  }
  showError.value = false
}

function jumpToStep(i: number) {
  if (i > maxReached.value) return
  stepIndex.value = i
  showError.value = false
}

function goPrev() {
  if (stepIndex.value === 0) return
  stepIndex.value -= 1
  showError.value = false
}

async function goNext() {
  if (!stepComplete(stepIndex.value)) {
    showError.value = true
    return
  }
  showError.value = false
  if (isLast.value) {
    await submitForm()
    return
  }
  stepIndex.value += 1
  maxReached.value = Math.max(maxReached.value, stepIndex.value)
}

function formatAnswers() {
  const lines: string[] = []
  for (const step of steps.value) {
    lines.push(`## ${step.s}`)
    for (const q of step.q) {
      if (q.ty === 'files') {
        const names = fileList(q).map((file) => file.name)
        lines.push(`${q.l}: ${names.length ? names.join(', ') : '(aucun fichier)'}`)
        continue
      }
      const raw = answers[q.id]
      const value = Array.isArray(raw) ? raw.join(', ') : String(raw || '').trim()
      lines.push(`${q.l}: ${value || '(non renseigné)'}`)
    }
    lines.push('')
  }
  return lines.join('\n')
}

async function submitForm() {
  submitting.value = true
  submitError.value = ''
  try {
    const fullName = String(answers.nom || '').trim()
    const parts = fullName.split(/\s+/)
    const firstName = parts[0] || 'Candidat'
    const lastName = parts.slice(1).join(' ') || '-'
    const cvFiles = Array.isArray(answers.cv) ? (answers.cv as File[]) : []
    const form = new FormData()
    form.append('firstName', firstName)
    form.append('lastName', lastName)
    form.append('email', String(answers.email || '').trim())
    form.append('phone', String(answers.tel || '').trim())
    form.append('offerTitle', "Apporteurs d'affaires")
    form.append(
      'answersText',
      formatAnswers() || "Candidature Apporteurs d'affaires (sans détail supplémentaire).",
    )
    for (const file of cvFiles) {
      if (file instanceof File && file.size > 0) {
        form.append('cv', file, file.name)
      }
    }
    await $fetch('/api/mailing/career', {
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
  maxReached.value = 0
  showError.value = false
  submitError.value = ''
  done.value = false
}
</script>

<style scoped>
.apply-shell,
.apply-card {
  background: #fff;
  border: 1px solid #ece7e4;
  color: #111;
}

.apply-bar {
  background: #ece7e4;
}

.apply-bar-fill {
  width: 0;
  background: #e44545;
  transition: width 0.25s ease;
}

.apply-step.is-active .apply-bar-fill,
.apply-step.is-done .apply-bar-fill {
  background: #e44545;
}

.apply-orb {
  pointer-events: none;
  position: absolute;
  right: -4rem;
  top: -5rem;
  width: 18rem;
  height: 18rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.apply-orb--inner {
  right: -1.5rem;
  top: -2.5rem;
  width: 12rem;
  height: 12rem;
}

.apply-input {
  border: 0;
  border-bottom: 1px solid #ece7e4;
  background: transparent;
  color: #111;
}

.apply-input::placeholder {
  color: #b0aaa6;
}

.apply-input:focus {
  border-bottom-color: #e44545;
}

.apply-input.is-error {
  border-bottom-color: #e44545;
}

.apply-upload,
.apply-file {
  border-color: #ece7e4;
  background: #fff;
}

.apply-chip,
.apply-option,
.apply-prev {
  border: 1px solid #ece7e4;
  background: #fff;
  color: #111;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.apply-chip.is-on,
.apply-option.is-on {
  border-color: #e44545;
  background: rgba(228, 69, 69, 0.06);
}

.apply-next {
  background: #e44545;
}

.apply.is-dark .apply-shell,
.apply.is-dark .apply-card {
  background: #141414;
  border-color: #262626;
  color: #f7f7f7;
}

.apply.is-dark h2,
.apply.is-dark h3,
.apply.is-dark .text-\[\#111\] {
  color: #f7f7f7;
}

.apply.is-dark .apply-bar {
  background: #2a2a2a;
}

.apply.is-dark .apply-input,
.apply.is-dark .apply-chip,
.apply.is-dark .apply-option,
.apply.is-dark .apply-prev,
.apply.is-dark .apply-upload,
.apply.is-dark .apply-file {
  border-color: #333;
  background: transparent;
  color: #f7f7f7;
}

.apply.is-dark .apply-chip.is-on,
.apply.is-dark .apply-option.is-on {
  background: rgba(228, 69, 69, 0.12);
  border-color: #e44545;
}

.apply.is-dark .apply-orb {
  border-color: rgba(255, 255, 255, 0.08);
}
</style>
